import React, { useEffect, useRef } from 'react';
import useIsVisible from '@/hooks/useIsVisible';
import gsap, { Power3 } from 'gsap';

export default function UniqueSellingPointSegment({ sellingPoints }) {
  const sectionRef = useRef();
  const sellingPointsRef = useRef([]);
  const isVisible = useIsVisible(sectionRef, '0px 0px -200px 0px');
  const animation = gsap.timeline({ paused: true });

  useEffect(() => {
    if (isVisible) {

      sellingPointsRef.current.forEach((sellingPoint, index) => {
        animation.fromTo(
          sellingPoint,
          {
            opacity: 0,
            y: 40,
            transform: 'scale(0.95) skew(10deg)',
          },
          {
            opacity: 1,
            y: 0,
            transform: 'scale(1) skew(0deg)',
            duration: 0.5,
            ease: Power3.easeOut,
          },
          index * 0.2
        );
      });
      animation.play();

    }
  }, [isVisible, sellingPoints]);

  return (
    <section className={`max-w-screen-xl mt-24 px-8 xl:px-16 mx-auto transition-all duration-200 ease-out  ${isVisible ? "" : "opacity-0"}`} ref={sectionRef}>
      <div className="relative w-full flex">
        <div className="rounded-xl w-full grid grid-flow-row lg:grid-flow-row grid-cols-1 lg:grid-cols-3 py-9 bg-white-500 z-10 gap-6">
          {sellingPoints.map((sellingPoint, index) => (
            <div
              key={index}
              ref={(ref) => (sellingPointsRef.current[index] = ref)}
              className="flex justify-start sm:justify-center py-4 px-6 w-8/12 rounded-xl sm:w-auto mx-auto sm:mx-0 bg-custom-200"
            >
              <div className="mx-auto w-40 sm:w-auto">
                <div className="flex flex-col">
                  <div className='flex align-center'>
                    <div className="text-xl pt-1 mr-2 text-violet-500">{sellingPoint.icon}</div>
                    <p className="text-xl text-black-600">{sellingPoint.title}</p>
                  </div>
                  <p className="text-lg text-custom-200 mt-1">{sellingPoint.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="absolute bg-black-600 opacity-5 w-11/12 rounded-xl h-64 sm:h-48 top-0 mt-8 mx-auto left-0 right-0 blur-[114px]"></div>
      </div>
    </section>
  );
}
