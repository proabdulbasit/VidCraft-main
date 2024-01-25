import React, { useEffect, useRef } from 'react';
import useIsVisible from '@/hooks/useIsVisible';
import { titleAnimation, descriptionAnimation, staggerDelay } from '@/animations';
import gsap, { Power3 } from 'gsap';

export default function KeyFeaturesSegment({ title, description, bulletPoints, avatars }) {
  const titleRef = useRef([]);
  const descriptionRef = useRef();
  const bulletPointsRef = useRef([]);
  const avatarsRef = useRef([]);
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

      bulletPointsRef.current.forEach((point, index) => {
        animation.fromTo(
          point,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.5, ease: Power3.easeOut },
          `-=${staggerDelay}`
        );
      });

      avatarsRef.current.forEach((avatar, index) => {
        animation.fromTo(
          avatar,
          {
            opacity: 0,
            x: 0,
            scale: 0.5,
          },
          {
            opacity: 1,
            x: index === 1 ? -125 : index === 2 ? 125 : 0,
            zIndex: index === 1 ? 10 : index === 2 ? 20 : 40,
            scale: index === 1 ? 0.9 : index === 2 ? 0.9 : 1,
            duration: 1,
            ease: Power3.easeOut,
          },
          staggerDelay * index
        );
      });

      animation.play();
    }
  }, [isVisible, title, description, bulletPoints]);

  return (
    <section className={`max-w-screen-xl mt-8 mb-6 sm:mt-14 sm:mb-14 px-6 sm:px-8 lg:px-16 lg:mt-32 mx-auto transition-all duration-200 ease-out  ${isVisible? "" : "opacity-0" }`} ref={sectionRef}>
      <div className="grid grid-flow-row lg:grid-flow-col grid-cols-1 lg:grid-cols-2 gap-8 py-8 my-12">
        <div>
          <div className="hidden lg:block relative h-full overflow-hidden">
            {avatars.map((avatar, index) => (
              <img
                key={index}
                ref={(ref) => (avatarsRef.current[index] = ref)}
                src={avatar}
                alt={`Avatar ${index + 1}`}
                className="w-full absolute bottom-0"
              />
            ))}
            <div className='absolute bottom-0 w-full h-1/4 z-20 bg-gradient-to-t from-35% from-custom-100'></div>
            <div className='absolute bottom-0 w-full h-1/4 z-50 bg-gradient-to-t from-20% from-custom-100'></div>
          </div>
        </div>
        <div>
          <div className="flex flex-col justify-center w-full">
            <h3 className="text-3xl lg:text-4xl font-medium leading-relaxed text-black-600" >
              {titleWords.map((word, index) => (
                <span key={index} className="inline" ref={(ref) => (titleRef.current[index] = ref)}>
                  {word + " "}
                </span>
              ))}
            </h3>
            <p className="mt-4 text-black-500" ref={descriptionRef}>
              {description}
            </p>
            <ul className="text-black-500 self-start list-outside ml-5 list-image-[url(/assets/img/circle-check.svg)]">
              {bulletPoints.map((point, index) => (
                <li key={index} ref={(ref) => (bulletPointsRef.current[index] = ref)}>
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

// function avatarAnimation({ avatars }) {
//   

//   useEffect(() => {
//     const avatarAnimation = gsap.timeline({ paused: true });
//     const staggerDelay = 0.2;

    

//   }, [avatars]);

//   return (

//   );
// }