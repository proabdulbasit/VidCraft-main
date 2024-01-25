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
    <section className={`max-w-screen-xl relative px-8 xl:px-16 mx-auto transition-all duration-200 ease-out ${isVisible ? "" : "opacity-0"}`} ref={sectionRef}>
      <div className="relative">
        <div className="absolute top-0 left-0 w-full h-full z-50 flex">
          <div className="w-1/4 h-full bg-custom-100 z-50"></div>
          <div className='relative w-1/4 h-full'>
            <div className="absolute left-0 top-0 h-full w-full bg-gradient-to-r from-custom-100"></div>
            <div className="absolute left-0 top-0 h-full w-full bg-gradient-to-r from-custom-100"></div>

          </div>
        </div>


        <div className="grid grid-flow-row lg:grid-flow-col grid-rows-2 md:grid-rows-1 lg:grid-cols-4 gap-8 py-6 sm:py-20">
          <div className="flex flex-col justify-center items-start h-full row-start-1 row-end-3 sm:row-start-1 col-start-1 col-end-3 py-4 z-50 rounded-r-xl">
            <h1 className="text-3xl lg:text-4xl xl:text-5xl font-medium text-black-600 leading-normal">
              {titleWords.map((word, index) => (
                <div key={index} className="inline" ref={(ref) => (titleRef.current[index] = ref)}>
                  {word + ' '}
                </div>
              ))}
            </h1>

            <p className="mt-4 mb-6 max-w-sm" ref={descriptionRef}>
              {description}
            </p>
            <button className="py-3 lg:py-4 px-12 lg:px-16 text-white-500 text-xl rounded-full bg-primary-100 hover:bg-violet-800 text-white hover:shadow-orange-md transition-all outline-none undefined " ref={buttonRef}>
              Get Started
            </button>
          </div>
          <div className='aspect-video col-start-2 col-end-5 row-start-1 row-end-3 relative'>

            <div className="absolute w-full h-full">
              <div className="relative w-full h-full bg-custom-200 pulse-animation rounded-xl">
                <img src={"/assets/hero/hero_thumbnail.png"} className='absolute top-0 left-0 z-10 object-cover rounded-xl h-full w-full' />
                <img src={"/assets/hero/hero_thumbnail.png"} className='blur-2xl absolute top-0 left-0 z-10 object-cover h-full w-full' />
                <video
                  src={"/assets/hero/hero_video.mp4"}
                  autoPlay
                  loop
                  muted
                  playsInline
                  controls={false}
                  className="absolute z-20 top-0 left-0 object-cover h-full w-full rounded-xl "
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