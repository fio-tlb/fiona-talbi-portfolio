// IntersectionObserver minimal pour jsdom : les tests déclenchent eux-mêmes les intersections.
const observers = new Set<MockIntersectionObserver>();

export class MockIntersectionObserver implements IntersectionObserver {
  readonly root = null;
  readonly rootMargin = "0px";
  readonly scrollMargin = "0px";
  readonly thresholds = [0];
  private readonly targets = new Set<Element>();

  constructor(private readonly callback: IntersectionObserverCallback) {
    observers.add(this);
  }
  observe(target: Element) {
    this.targets.add(target);
  }
  unobserve(target: Element) {
    this.targets.delete(target);
  }
  disconnect() {
    this.targets.clear();
    observers.delete(this);
  }
  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }
  notify(target: Element, isIntersecting: boolean) {
    if (!this.targets.has(target)) return;
    const rect = target.getBoundingClientRect();
    const entry = {
      target,
      isIntersecting,
      intersectionRatio: isIntersecting ? 1 : 0,
      boundingClientRect: rect,
      intersectionRect: rect,
      rootBounds: null,
      time: 0,
    } as IntersectionObserverEntry;
    this.callback([entry], this);
  }
}

/** Simule l'entrée ou la sortie d'un élément observé (ex. le hero qui quitte l'écran). */
export function triggerIntersection(target: Element, isIntersecting: boolean) {
  for (const observer of [...observers]) observer.notify(target, isIntersecting);
}
