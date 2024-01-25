
import React, { useEffect, useRef } from 'react';
import useIsVisible from '@/hooks/useIsVisible';
import { titleAnimation, descriptionAnimation, staggerDelay } from '@/animations';
import gsap, { Power3 } from 'gsap';

export default function NewsSegment({ title, description }) {
  const titleRef = useRef([]);
  const descriptionRef = useRef();
  const sectionRef = useRef();
  const isVisible = useIsVisible(sectionRef, '0px 0px -200px 0px');
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

      animation.play();

    }
  }, [isVisible, title, description]);


  return (
    <section className={`max-w-screen-xl mt-8 mb-6 sm:mt-14 sm:mb-14 px-6 sm:px-8 lg:px-16 lg:mt-32 mx-auto  transition-all duration-200 ease-out  ${isVisible? "" : "opacity-0" }`}ref={sectionRef}>
      <div className="grid grid-flow-row sm:grid-flow-col grid-cols-1 sm:grid-cols-3 gap-8 py-8 my-12">
        <div className="lg:col-span-1">
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
        <div className="lg:col-span-2">
          <NewsCard />
        </div>
      </div>
    </section>
  );
}





const NewsCard = () => {
  const cardRef = useRef(null);
  const titleSegments1 = getRandomSegmentLengths(12);
  const titleSegments2 = getRandomSegmentLengths(getRandomNumber(5, 12));
  const descriptionSegments1 = getRandomSegmentLengths(12);
  const descriptionSegments2 = getRandomSegmentLengths(12);
  const descriptionSegments3 = getRandomSegmentLengths(getRandomNumber(5, 12));

  function getRandomSegmentLengths(targetSum) {
    let numbers = [];
    let sum = 0;
  
    while (sum < targetSum) {
      let randomNum = Math.floor(Math.random() * (12 - sum + 1));
      if (randomNum !== 0) {
        numbers.push(randomNum);
        sum += randomNum;
      }
    }
  
    for (let i = numbers.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
    }
  
    return numbers;
  }
  
  function getRandomNumber(min, max) {
    const randomNumber = Math.random() * (max - min) + min;
    return Math.ceil(randomNumber);
  }

  useEffect(() => {
    gsap.from(cardRef.current, {
      y: -100, // initial position off-screen
      opacity: 0,
      duration: 1,
      ease: 'power2.out',
    });


  }, []);

  return (
    <div
      ref={cardRef}
      className="overflow-hidden bg-white rounded-xl shadow-md p-4 m-4"
    >
      <div className="grid grid-cols-4">
        <div className="col-span-1">
          {/* Square image placeholder */}
          <div className="bg-gray-300 h-20 w-20 mb-4"></div>
        </div>
        <div className="col-span-3">
          
          {/* Fake title */}
          <div className='w-full mb-2 grid grid-cols-12 gap-2'>
            {titleSegments1.map((num, index) => (
              <div key={index} className={`bg-gray-300 h-4 rounded-full col-span-0`}></div>
            ))}
          </div>

          <div className='w-full mb-2 grid grid-cols-12 gap-2'>
            {titleSegments2.map((num, index) => (
              <div key={index} className={`bg-gray-300 h-4 rounded-full col-span-0`}></div>
            ))}
          </div>
          <div className='w-full mb-2 grid grid-cols-12 gap-2'>
            {descriptionSegments1.map((num, index) => (
              <div key={index} className={`bg-gray-300 h-2 rounded-full col-span-0`}></div>
            ))}
          </div>
          <div className='w-full mb-2 grid grid-cols-12 gap-2'>
            {descriptionSegments2.map((num, index) => (
              <div key={index} className={`bg-gray-300 h-2 rounded-full col-span-0`}></div>
            ))}
          </div>
          <div className='w-full mb-2 grid grid-cols-12 gap-2'>
            {descriptionSegments3.map((num, index) => (
              <div key={index} className={`bg-gray-300 h-2 rounded-full col-span-0`}></div>
            ))}
          </div>
        </div>
      </div>
      <div className='hidden'>
            <div className='col-span-0'></div>
            <div className='col-span-1'></div>
            <div className='col-span-2'></div>
            <div className='col-span-3'></div>
            <div className='col-span-4'></div>
            <div className='col-span-5'></div>
            <div className='col-span-6'></div>
            <div className='col-span-7'></div>
            <div className='col-span-8'></div>
            <div className='col-span-9'></div>
            <div className='col-span-10'></div>
            <div className='col-span-11'></div>
            <div className='col-span-12'></div>
          </div>
    </div>
  );
};