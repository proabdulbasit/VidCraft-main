import React, { useEffect, useRef } from 'react';
import useIsVisible from '@/hooks/useIsVisible';
import { titleAnimation, descriptionAnimation, staggerDelay } from '@/animations';
import gsap, { Power3 } from 'gsap';

export default function ToolDescriptionSegment({ title, description }) {
  // const headlineRef = useRef();
  // const contentRef = useRef();
  const titleRef = useRef([]);
  const descriptionRef = useRef();
  const buttonRef = useRef();
  const sectionRef = useRef();
  const isVisible = useIsVisible(sectionRef, '0px 0px -200px 0px');
  const animation = gsap.timeline({ paused: true });

  const titleWords = title.split(' ');


  useEffect(() => {
    if (isVisible) {

      // animation.fromTo(
      //   headlineRef.current,
      //   { skewX: -20, xPercent: -50 },
      //   { skewX: 0, xPercent: 0, duration: 1, ease: 'power2.out' }
      // );

      // animation.fromTo(
      //   contentRef.current,
      //   { skewX: 20, xPercent: 50 },
      //   { skewX: 0, xPercent: 0, duration: 1, ease: 'power2.out' }
      // );

      titleRef.current.forEach((title, index) => {
        animation.fromTo(
          title,
          ...titleAnimation,
          staggerDelay * index
        );
      });

      animation.fromTo(
        descriptionRef.current,
        ...descriptionAnimation,
        `-=${staggerDelay}`
      );

      animation.fromTo(
        buttonRef.current,
        ...descriptionAnimation,
        `-=${staggerDelay}`
      );

      animation.play();

    }
  }, [isVisible, title, description]);

  return (
    <section className={`max-w-screen-xl px-8 xl:px-16 mx-auto transition-all duration-200 ease-out ${isVisible ? "" : "opacity-0"}`} ref={sectionRef}>
      <div>
        <div className="grid grid-flow-row lg:grid-flow-col grid-rows-2 md:grid-rows-1 lg:grid-cols-4 gap-8 py-6 sm:py-16">
          <div className="flex flex-col justify-center items-start row-start-2 sm:row-start-1 col-start-1 col-end-3 py-4 z-50">
            <h1 className="text-3xl lg:text-4xl xl:text-5xl font-medium text-black-600 leading-normal">
              {titleWords.map((word, index) => (
                <div key={index} className="inline" ref={(ref) => (titleRef.current[index] = ref)}>
                  {word + ' '}
                </div>
              ))}
            </h1>

            <p className="text-black-500 mt-4 mb-6" ref={descriptionRef}>
              {description}
            </p>
            <button className="py-3 lg:py-4 px-12 lg:px-16 text-white-500 text-xl rounded-full bg-violet-700 hover:bg-violet-800 text-white hover:shadow-orange-md transition-all outline-none undefined " ref={buttonRef}>
              Get Started
            </button>
          </div>
          <div className='aspect-video col-start-2 col-end-5 row-start-1 row-end-3 relative overflow-hidden'>
            <div className='absolute left-0 z-30 h-full w-1/3 bg-gradient-to-r from-custom-100'></div>
            <div className='absolute left-0 z-30 h-full w-2/3 bg-gradient-to-r from-custom-100'></div>
            <div className="absolute w-full h-full z-10 ">
              <div className="relative w-full h-full bg-custom-200 rounded-xl">

                <video
                  src={"/assets/voices/en-CA-female.mp4"}
                  autoPlay
                  loop
                  muted
                  playsInline
                  controls={false}
                  className="object-cover h-full w-full rounded-xl "
                />
              </div>
            </div>
          </div>

          {/* ... (rest of your component remains the same) */}
        </div>
      </div>
    </section>
  );
}