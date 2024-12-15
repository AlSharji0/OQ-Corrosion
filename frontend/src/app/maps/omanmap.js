'use client'
import { useState, useEffect, useRef } from "react";

export default function OmanMap() {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleWheel = (e) => {
    e.preventDefault();
    const delta = e.deltaY * -0.001;
    const newScale = Math.min(Math.max(scale + delta, 1), 3);
    setScale(newScale);
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartPosition({ x: e.clientX - position.x, y: e.clientY - position.y });
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;

    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const newX = e.clientX - startPosition.x;
    const newY = e.clientY - startPosition.y;

    // Calculate boundaries based on scale
    const maxX = (scale - 1) * rect.width / 2;
    const maxY = (scale - 1) * rect.height / 2;

    // Constrain the position within boundaries
    const constrainedX = Math.min(Math.max(newX, -maxX), maxX);
    const constrainedY = Math.min(Math.max(newY, -maxY), maxY);

    setPosition({ 
      x: constrainedX,
      y: constrainedY
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: false });
    }
    return () => {
      if (container) {
        container.removeEventListener('wheel', handleWheel);
      }
    };
  }, [handleWheel, scale]);

  useEffect(() => {
    if (scale === 1) {
      setPosition({ x: 0, y: 0 });
    }
  }, [scale]);

  return (
    <div 
      ref={containerRef}
      className="h-[400px] w-full rounded-xl border-2 relative overflow-hidden cursor-grab active:cursor-grabbing"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <div
        style={{
          backgroundImage: "url(OmanmapHakA.png)",
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          transform: `scale(${scale}) translate(${position.x / scale}px, ${position.y / scale}px)`,
          transition: 'transform 0.1s ease-out',
          width: '100%',
          height: '100%'
        }}
      />
    </div>
  );
}