// Shared by HTML preloads and the corresponding initial Vue image. The fallback
// covers the entire object-fit surface, not just a cropped frame's CSS width.
export const heroSizes = '(max-width: 599px) max(100vw, 640px), 100vw';
export function gallerySizesFor(width = 1536, height = 1024) {
  const ratio = width / height;
  return `(max-width: 699px) min(88vw, calc(clamp(285px, 84vw, 380px) * ${ratio}), ${width}px), min(60vw, calc(clamp(320px, 34vw, 500px) * ${ratio}), ${width}px)`;
}
export const stayHeroSizes = '(max-width: 460px) calc(100vw - 30px), (max-width: 699px) min(620px, calc(100vw - 40px)), (max-width: 1040px) calc((min(940px, calc(100vw - 56px)) - 40px) / 2), calc((min(1500px, calc(100vw - 64px)) - 32px) * 0.56)';
export const menuSizes = '(max-width: 599px) calc(100vw - 46px), (max-width: 799px) min(676px, calc(100vw - 44px)), min(696px, calc((min(1560px, calc(100vw - 96px)) - clamp(40px, 3.2vw, 60px)) * 0.607843 - 4px), calc(min(1560px, calc(100vw - 96px)) - clamp(40px, 3.2vw, 60px) - 424px))';
