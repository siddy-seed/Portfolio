import { useEffect, useState } from 'react';
import './CustomCursor.css';

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [hovering, setHovering] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const move = (e) => setPos({ x: e.clientX, y: e.clientY });
    const over = () => setHidden(false);
    const out = () => setHidden(true);

    window.addEventListener('mousemove', move);
    document.addEventListener('mouseenter', over);
    document.addEventListener('mouseleave', out);

    const handleHoverables = () => {
      document.querySelectorAll('a, button, [data-hover]').forEach(el => {
        el.addEventListener('mouseenter', () => setHovering(true));
        el.addEventListener('mouseleave', () => setHovering(false));
      });
    };
    handleHoverables();
    const observer = new MutationObserver(handleHoverables);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', move);
      document.removeEventListener('mouseenter', over);
      document.removeEventListener('mouseleave', out);
      observer.disconnect();
    };
  }, []);

  if (typeof window !== 'undefined' && window.innerWidth < 768) return null;

  return (
    <>
      <div
        className={`cursor-dot ${hovering ? 'hover' : ''} ${hidden ? 'hidden' : ''}`}
        style={{ left: pos.x, top: pos.y }}
      />
      <div
        className={`cursor-ring ${hovering ? 'hover' : ''} ${hidden ? 'hidden' : ''}`}
        style={{ left: pos.x, top: pos.y }}
      />
    </>
  );
}
