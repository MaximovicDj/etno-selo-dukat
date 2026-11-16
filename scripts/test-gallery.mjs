import assert from 'node:assert/strict';
import { test } from 'node:test';
import { createServer } from 'vite';

// Load the production modules through Vite, including their JSON manifest import.
const server = await createServer({
  configFile: false, appType: 'custom',
  optimizeDeps: { noDiscovery: true, include: [] },
  server: { middlewareMode: true, watch: null },
});
const deferred = () => {
  let resolve, reject;
  const promise = new Promise((yes, no) => { resolve = yes; reject = no; });
  return { promise, resolve, reject };
};
try {
  const { createImageNavigation, prepareImage } = await server.ssrLoadModule('/src/imagePreloader.js');
  const { responsiveImageAttributes } = await server.ssrLoadModule('/src/imageSources.js');
  const { lightboxSizesFor } = await server.ssrLoadModule('/src/imageLayouts.js');

  function setup() {
    const images = ['a', 'b', 'c', 'd'].map(src => ({ src }));
    const pending = new Map(images.map(image => [image.src, deferred()]));
    const calls = [];
    const state = { shown: 0, loading: false, failed: false };
    const navigation = createImageNavigation({
      getImages: () => images, getSizes: () => '320px',
      onReady: index => { state.shown = index; },
      onLoading: value => { state.loading = value; },
      onError: value => { state.failed = value; },
      load: (source, sizes, priority) => {
        calls.push({ source, sizes, priority });
        return pending.get(source).promise;
      },
    });
    return { navigation, state, calls, pending };
  }

  await test('keeps the displayed image until ready and warms both neighbors', async () => {
    const { navigation, state, calls, pending } = setup();
    const result = navigation.select(1);
    assert.equal(state.shown, 0);
    assert.deepEqual(calls, [
      { source: 'b', sizes: '320px', priority: 'high' },
      { source: 'a', sizes: '320px', priority: 'low' },
      { source: 'c', sizes: '320px', priority: 'low' },
    ]);
    pending.get('b').resolve();
    assert.equal(await result, true);
    assert.equal(state.shown, 1);
    assert.equal(state.loading, false);
    navigation.cancel();
  });

  await test('rapid forward/back clicks and closing cannot commit stale requests', async () => {
    const { navigation, state, pending } = setup();
    const first = navigation.move(1);
    const second = navigation.move(1);
    pending.get('c').resolve();
    await second;
    assert.equal(state.shown, 2);
    pending.get('b').resolve();
    assert.equal(await first, false);
    assert.equal(state.shown, 2);
    await navigation.move(-1);
    assert.equal(state.shown, 1);
    const closing = navigation.select(3);
    navigation.cancel();
    pending.get('d').resolve();
    assert.equal(await closing, false);
    assert.equal(state.shown, 1);
  });

  await test('indicator waits 250ms and an error preserves the old image', async context => {
    context.mock.timers.enable({ apis: ['setTimeout'] });
    const { navigation, state, pending } = setup();
    const result = navigation.select(1);
    context.mock.timers.tick(249);
    assert.equal(state.loading, false);
    context.mock.timers.tick(1);
    assert.equal(state.loading, true);
    pending.get('b').reject(new Error('Offline'));
    assert.equal(await result, false);
    assert.equal(state.loading, false);
    assert.equal(state.shown, 0);
    assert.equal(state.failed, true);
    navigation.cancel();
  });

  await test('single-image galleries do not issue duplicate neighbor requests', async () => {
    const calls = [];
    const navigation = createImageNavigation({
      getImages: () => [{ src: 'only' }], getSizes: () => '320px',
      onReady: () => {}, onLoading: () => {},
      load: async source => { calls.push(source); },
    });
    await navigation.select(0);
    assert.deepEqual(calls, ['only']);
  });

  await test('responsive preloader waits for decode, reuses work, and retries failures', async () => {
    const instances = [];
    class FakeImage {
      constructor() { this.decoded = deferred(); instances.push(this); }
      set src(value) {
        assert(this.sizes, 'sizes must be set before src');
        this.url = value;
      }
      decode() { return this.decoded.promise; }
    }
    globalThis.window = { innerWidth: 390, innerHeight: 844, devicePixelRatio: 3 };
    globalThis.Image = FakeImage;
    const source = 'images/magaza-2.png';
    const sizes = lightboxSizesFor(1024, 1536);
    const first = prepareImage(source, sizes);
    const again = prepareImage(source, sizes, 'high');
    assert.equal(first, again);
    const image = instances[0];
    assert.equal(image.fetchPriority, 'high');
    const expected = responsiveImageAttributes(source, sizes);
    assert.equal(image.url, expected.src);
    assert.equal(image.srcset, expected.srcset);
    assert.equal(image.sizes, expected.sizes);
    let ready = false;
    void first.then(() => { ready = true; });
    void image.onload();
    await Promise.resolve();
    assert.equal(ready, false, 'load alone does not mean the image is decoded');
    image.decoded.resolve();
    await first;
    assert.equal(ready, true);

    window.innerWidth = 844;
    const rotated = prepareImage(source, sizes);
    assert.notEqual(rotated, first, 'rotation must reconsider the responsive candidate');
    instances[1].onerror();
    await assert.rejects(rotated);
    const retry = prepareImage(source, sizes);
    assert.notEqual(retry, rotated);
    void instances[2].onload();
    instances[2].decoded.resolve();
    await retry;
    delete globalThis.window;
    delete globalThis.Image;
  });
} finally { await server.close(); }
