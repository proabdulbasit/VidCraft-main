import React, { useEffect, useRef } from 'react';
import useIsVisible from '@/hooks/useIsVisible';
import { titleAnimation, descriptionAnimation, staggerDelay } from '@/animations';
import gsap, { Power3 } from 'gsap';

export default function SlideshowSegment({ title, description, background, host, slides }) {
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
    <section className={`max-w-screen-xl mt-8 mb-6 sm:mt-14 sm:mb-14 px-6 sm:px-8 lg:px-16 lg:mt-32 mx-auto  transition-all duration-200 ease-out ${isVisible? "" : "opacity-0" }`} ref={sectionRef}>
      <div className="grid grid-flow-row sm:grid-flow-col grid-cols-1 sm:grid-cols-3 gap-8 py-8 my-12">

        <div className="lg:col-span-2">
          <div className="h-full w-full">
            <SlideshowMedia {...{ background, host, slides }} />
          </div>
        </div>

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

      </div>
    </section>
  );
}

function SlideshowMedia({ background, host, slides }) {
  const carouselRef = useRef();
  const currentSlide = useRef(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    const carouselItems = carouselRef.current.children;
    const totalSlides = slides.length;

    const slideAnimation = () => {
      const prevSlide = currentSlide.current;
      currentSlide.current = (currentSlide.current + 1) % totalSlides;

      gsap.fromTo(
        carouselItems[prevSlide],
        { opacity: 1 },
        { opacity: 0, duration: 1, ease: 'power3.inOut' }
      );

      gsap.fromTo(
        carouselItems[currentSlide.current],
        { opacity: 0 },
        { opacity: 1, duration: 1, ease: 'power3.inOut' }
      );

    };

    intervalRef.current = setInterval(slideAnimation, 5000);

    return () => {
      clearInterval(intervalRef.current);
    };
  }, [slides]);


  const containerRef = useRef(null);
  const observerRef = useRef(null);

  useEffect(() => {
    const carouselAnimation = gsap.timeline({ paused: true });
    const elements = containerRef.current
    carouselAnimation.fromTo(
      elements,
      {
        opacity: 0,
        x: -50,
      },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        delay: 0.5
      }
    );

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            carouselAnimation.play();
            observerRef.current.unobserve(containerRef.current);
          }
        });
      },
      { rootMargin: '0px 0px -200px 0px' }
    );

    observerRef.current.observe(containerRef.current);
  }, [slides]);


  return (
    <div className={`h-full w-full`} ref={containerRef}>


      <div className='w-full aspect-video lg:h-72 relative overflow-hidden'>
        {/* <div className='h-full w-full absolute top-0 left-0 z-40'>
          <div className='w-full h-full relative '> */}
        <div className='w-2/5 aspect-video overflow-hidden absolute left-0 top-0 z-50 translate-x-[10%] translate-y-[10%] rounded-xl shadow-lg border-4 border-black' >
          <div className='relative w-full h-full' ref={carouselRef} >
            {slides.map((slide, index) => (

              <video
                key={index}
                src={slide}
                autoPlay
                loop
                muted
                playsInline
                controls={false}
                className={`opacity-0 absolute top-0 right-0 w-full ${index === 0 ? 'opacity-100' : ''}`}
              />
            ))}
          </div>

          {/* 
            </div>
          </div> */}

        </div>
        <div className='absolute right-0 z-30 h-full w-1/3 bg-gradient-to-l  from-custom-100'></div>
        <div className='absolute right-0 z-30 h-full w-1/3 bg-gradient-to-l  from-custom-100'></div>

        <div className='absolute bottom-0 right-0 z-20 w-2/3'><img className='' src={host} alt="Image" /></div>
        <div className="absolute w-full h-full z-10 ">
          <div className="relative w-full h-full bg-custom-200 rounded-xl">

            <video
              src={background}
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


    </div>
  );
}