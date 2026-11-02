import { onMounted, onUnmounted } from "vue";

// Progressive enhancement: content stays visible without JavaScript/observer support.
export function useScrollReveal() {
  let observer;
  let media;
  let targets = [];
  const show = (element) => {
    element.classList.remove("reveal-pending");
    observer?.unobserve(element);
  };
  const showAll = () => targets.forEach(show);
  const preference = () => {
    if (media.matches) showAll();
  };
  const focus = (event) => {
    const target = event.target.closest(".reveal-target");
    if (target) show(target);
  };
  const anchor = () => {
    let id;
    try {
      id = decodeURIComponent(location.hash.slice(1));
    } catch {
      return;
    }
    const element = document.getElementById(id);
    if (!element) return;
    targets
      .filter((target) => element.contains(target) || target.contains(element))
      .forEach(show);
  };
  onMounted(() => {
    media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!("IntersectionObserver" in window) || media.matches) return;
    targets = Array.from(
      document.querySelectorAll(
        "main > section:not(.hero):not(.magaza-list) > .wrap, .magaza-card",
      ),
    );
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) show(entry.target);
        });
      },
      { threshold: 0.04, rootMargin: "0px 0px -24px 0px" },
    );
    targets.forEach((target) => {
      target.classList.add("reveal-target");
      if (target.getBoundingClientRect().top >= window.innerHeight) {
        target.classList.add("reveal-pending");
        observer.observe(target);
      }
    });
    anchor();
    media.addEventListener("change", preference);
    document.addEventListener("focusin", focus);
    window.addEventListener("hashchange", anchor);
  });
  onUnmounted(() => {
    observer?.disconnect();
    media?.removeEventListener("change", preference);
    document.removeEventListener("focusin", focus);
    window.removeEventListener("hashchange", anchor);
    showAll();
  });
}
