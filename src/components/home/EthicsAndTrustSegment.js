import React, { useEffect, useRef } from 'react';
import useIsVisible from '@/hooks/useIsVisible';
import { titleAnimation, descriptionAnimation, staggerDelay } from '@/animations';
import gsap, { Power3 } from 'gsap';

export default function EthicsAndTrustSegment({ title, description, commitments }) {
  const titleRef = useRef([]);
  const descriptionRef = useRef();
  const commitmentsRef = useRef([]);
  const sectionRef = useRef();
  const isVisible = useIsVisible(sectionRef, '0px 0px -200px 0px'); // Adjust rootMargin as needed
  const animation = gsap.timeline({ paused: true });

  const titleWords = title.split(' ');

  useEffect(() => {
    if (isVisible) {

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

      commitmentsRef.current.forEach((commitment, index) => {
        animation.fromTo(
          commitment,
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
          index * staggerDelay
        );
      });

      animation.play();
    }
  }, [isVisible, title, description, commitments]);

  return (
    <section className={`max-w-screen-xl mt-8 mb-6 sm:mt-14 sm:mb-14 px-6 sm:px-8 lg:px-16 lg:mt-32 mx-auto transition-all duration-200 ease-out ${isVisible? "" : "opacity-0" }`} ref={sectionRef}>
      <div>
        <div className="flex flex-col justify-center w-full ">
          <h3 className="text-3xl lg:text-4xl font-medium leading-relaxed text-black-600">
            {titleWords.map((word, index) => (
              <span key={index} className="inline" ref={(ref) => (titleRef.current[index] = ref)}>
                {word + " "}
              </span>
            ))}
          </h3>
          <p className="mt-4 text-black-500" ref={descriptionRef}>
            {description}
          </p>
        </div>
      </div>
      <div>
        <div className="relative w-full flex">
          <div className="rounded-xl w-full grid grid-flow-row lg:grid-flow-row grid-cols-1 lg:grid-cols-3 py-9 bg-white-500 z-10">
            {commitments.map((commitment, index) => (
              <div
                key={index}
                ref={(ref) => (commitmentsRef.current[index] = ref)}
                className="flex justify-start sm:justify-center py-4 sm:py-6 w-8/12 px-4 sm:w-auto mx-auto sm:mx-0"
              >
                <div className="mx-auto w-40 sm:w-auto">
                  <div className="flex flex-col">
                    <p className="text-xl text-black-600 font-bold">{commitment.title}</p>
                    <p className="text-lg text-black-500">{commitment.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="absolute bg-black-600 opacity-5 w-11/12 rounded-xl h-64 sm:h-48 top-0 mt-8 mx-auto left-0 right-0 blur-[114px]"></div>
        </div>
      </div>
    </section>
  );
}