import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

interface SmoothScrollProps {
  children: React.ReactNode;
}

export const SmoothScroll: React.FC<SmoothScrollProps> = ({ children }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffect(() => {
    let locomotiveScrollInstance: any = null;

    const initScroll = async () => {
      try {
        const LocomotiveScrollModule = await import('locomotive-scroll');
        const LocomotiveScroll = LocomotiveScrollModule.default;
        
        locomotiveScrollInstance = new LocomotiveScroll({
          lenisOptions: {
            wrapper: window,
            content: document.documentElement,
            lerp: 0.1,
            duration: 1.2,
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
            wheelMultiplier: 1,
            touchMultiplier: 2,
          }
        });
      } catch (err) {
        console.warn('Locomotive scroll fallback initialized:', err);
      }
    };

    initScroll();

    // Scroll to top on route change
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });

    return () => {
      if (locomotiveScrollInstance && typeof locomotiveScrollInstance.destroy === 'function') {
        locomotiveScrollInstance.destroy();
      }
    };
  }, [location.pathname]);

  return <div ref={scrollRef} className="w-full min-h-screen bg-[#FAF8F5] text-[#1A1C20]">{children}</div>;
};
