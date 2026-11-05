import { useEffect, useState } from "react";

// Returns a callback ref and whether that element has entered the viewport.
// It flips to true once and stays true, so entry animations play only once.
// A callback ref (not useRef) lets it pick up elements that mount later.
export default function useInView<T extends Element>(threshold = 0.3) {
  const [node, setNode] = useState<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!node || inView) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [node, inView, threshold]);

  return [setNode, inView] as const;
}
