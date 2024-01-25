import React, { useState, useEffect, useRef } from 'react';
import useIsVisible from '@/hooks/useIsVisible';
import { titleAnimation, descriptionAnimation, staggerDelay } from '@/animations';
import gsap, { Power3 } from 'gsap';

export default function BackgroundsSegment({ title, description, backgrounds, host }) {
  const titleRef = useRef([]);
  const descriptionRef = useRef(null);
  const sectionRef = useRef(null);
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
    <section className={`max-w-screen-xl mt-8 mb-6 sm:mt-14 sm:mb-14 px-6 sm:px-8 lg:px-16 lg:mt-32 mx-auto  transition-all duration-200 ease-out  ${isVisible ? "" : "opacity-0"}`} ref={sectionRef}>
      <div className="relative">
        <div></div>
        <div className="grid grid-flow-row lg:grid-flow-col grid-cols-1 lg:grid-cols-3 gap-8 py-8 z-50 sm:py-20">
          <div className="lg:col-span-1">
            <div className="flex flex-col justify-center w-full z-50">
              <h3 className="text-3xl lg:text-4xl font-medium leading-relaxed text-black-600 text-white">
                {titleWords.map((word, index) => (
                  <span key={index} className="inline" ref={(ref) => (titleRef.current[index] = ref)}>
                    {word + " "}
                  </span>
                ))}
              </h3>
              <p className="mt-4 text-black-500 text-white" ref={descriptionRef}>
                {description}
              </p>
            </div>
          </div>
          <div className="lg:col-span-2">
            <CustomCarousel {...{ backgrounds, host, isVisible }} />
          </div>
        </div>

        <div className="absolute top-0 left-0 w-full h-full z-40 flex">
          <div className="w-1/3 h-full bg-custom-100"></div>
          <div className='relative w-1/3 h-full'>
            <div className="absolute left-0 top-0 h-full w-full bg-gradient-to-r from-custom-100"></div>
            <div className="absolute left-0 top-0 h-full w-full bg-gradient-to-r from-custom-100"></div>

          </div>
        </div>

      </div>
    </section >
  );
}

function CustomCarousel({ backgrounds, host, isVisible }) {
  const carouselRef = useRef();
  const currentSlide = useRef(0);
  const intervalRef = useRef(null);


  const [isPaused, setIsPaused] = useState(false);
  const [activeButton, setActiveButton] = useState(0); // Added activeButton state

  useEffect(() => {
    const carouselItems = carouselRef.current.children;
    const totalSlides = backgrounds.length;

    const slideAnimation = () => {
      if (!isPaused) {
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

        setActiveButton(currentSlide.current); // Update the active button
      }
    };

    intervalRef.current = setInterval(slideAnimation, 5000);

    return () => {
      clearInterval(intervalRef.current);
    };
  }, [backgrounds, isPaused]);

  const handleSlideClick = (index) => {
    clearInterval(intervalRef.current);

    gsap.fromTo(
      carouselRef.current.children[currentSlide.current],
      { opacity: 1 },
      { opacity: 0, duration: 1, ease: 'power3.inOut' }
    );

    gsap.fromTo(
      carouselRef.current.children[index],
      { opacity: 0 },
      { opacity: 1, duration: 1, ease: 'power3.inOut' }
    );

    currentSlide.current = index;
    setActiveButton(index); // Update the active button

    setIsPaused(true);

    setTimeout(() => {
      setIsPaused(false);
    }, 10000);
  };

  const containerRef = useRef(null);
  const observerRef = useRef(null);
  const animation = gsap.timeline({ paused: true });

  const [containerOnView, setContainerOnView] = useState(false)


  useEffect(() => {

    if (isVisible) {
      animation.fromTo(
        containerRef.current,
        {
          opacity: 0,
          x: 50,
        },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          delay: 0.5
        }
      );

    }

    animation.play();

  }, [isVisible, backgrounds]);

  return (
    <div className="h-full w-full" ref={containerRef}>


      <div className='w-full aspect-[22/9] lg:h-72 relative'>
        <div className='h-full flex flex-col justify-evenly absolute top-0 left-0 z-40 p-1 sm:p-2'>
          {backgrounds.map((background, index) => (
            <div className='flex-grow m-1 sm:m-2 z-30' key={index}>
              <button
                onClick={() => handleSlideClick(index)}
                className={`h-full aspect-video bg-cover bg-center rounded outline transition-all duration-200 ease-out ${index === activeButton ? 'outline-3 outline-offset-1 outline-violet-600' : ' outline-0'}`}
                style={{ backgroundImage: `url(${background.thumbnail})` }}
              />
            </div>

          ))}
        </div>
        <div className='absolute left-0 z-30 h-full w-1/3 bg-gradient-to-r from-20% from-custom-100'></div>
        <div className='absolute left-0 z-30 h-full w-1/3 bg-gradient-to-r from-20% from-custom-100'></div>
        <div className='absolute bottom-0 right-0 z-20 w-2/3'><img className='' src={host} alt="Image" /></div>
        <div className="absolute w-full h-full z-10 ">
          <div className="relative w-full h-full" ref={carouselRef}>
            {backgrounds.map((background, index) => (
              <div
                key={index}
                className={`opacity-0 absolute inset-0 ${index === 0 ? 'opacity-100' : ''}`}
              >
                <div className='relative h-full w-full'>
                  <img src={background.thumbnail} className='absolute top-0 left-0 object-cover h-full w-full blur-xl' />
                  <video
                    src={background.video}
                    autoPlay
                    loop
                    muted
                    playsInline
                    controls={false}
                    className="absolute top-0 left-0 object-cover h-full w-full rounded-xl "
                  />
                </div>

              </div>
            ))}
          </div>
        </div>
      </div>


    </div>
  );
}






// import React, {useRef, useEffect, useState} from 'react';
// import useIsomorphicLayoutEffect from '@/hooks/useIsomorphicLayoutEffect';
// import gsap, { Power3 } from 'gsap';
// import useIsVisible from '@/hooks/useIsVisible';

// export default function BackgrundsSegment({ title, description, backgrounds }) {
// import textAnimation from '@/animations/defaultTextAnimation';
//   const titleRef = useRef([]);
//   const descriptionRef = useRef();
//   const sectionRef = useRef();
//   const observerRef = useRef(null);
//   const isVisible = useIsVisible(sectionRef, "200px");


//   const titleWords = title.split(' ');
//   const animation = gsap.timeline({ paused: true });


//   useEffect(() => {
//     titleWords.forEach((word, index) => {
//       textAnimation(animation, {target:titleRef.current.children[index], delay: (0.2*index) })
//     });

//     textAnimation(animation,{target:descriptionRef.current})
//   }, []);

//   useEffect(() => {
//     if (isVisible) {
//       animation.play();
//     }
//   }, [isVisible]);

//   return (
//     <section className="max-w-screen-xl mt-8 mb-6 sm:mt-14 sm:mb-14 px-6 sm:px-8 lg:px-16 lg:mt-32 mx-auto" ref={sectionRef}>
//       <div className="grid grid-flow-row lg:grid-flow-col grid-cols-1 lg:grid-cols-3 gap-8 py-8 my-12">
//         <div className="lg:col-span-1">
//           <div className="flex flex-col justify-center w-full">
//             <h3 className="text-3xl lg:text-4xl font-medium leading-relaxed text-black-600">
//               {titleWords.map((word, index) => (
//                 <div key={index}>
//                   {word + ' '}
//                 </div>
//               ))}
//             </h3>
//             <p className="mt-4 text-black-500" ref={descriptionRef}>
//               {description}
//             </p>
//           </div>
//         </div>
//         <div className="lg:col-span-2">
//           <CustomCarousel backgrounds={backgrounds} />
//         </div>
//       </div>
//     </section >
//   );
// }





//   return (
//     <div className="h-full w-full relative aspect-video lg:aspect-auto">
//       <div className='hidden lg:block absolute left-0 z-40 h-full w-64 bg-gradient-to-r from-white'></div>
//       <div className='absolute bottom-0 right-0 z-30 w-3/4'><img className='' src='/assets/gif/Jason.gif'></img></div>
//       <div className="absolute w-full h-full z-20">
//         <div className="relative w-full h-full" ref={carouselRef}> {/* Use 'relative' for custom-carousel */}
//           {backgrounds.map((background, index) => (
//             <div key={index} className={`opacity-0 transition-opacity absolute inset-0 ${index === 0 ? 'opacity-100' : ''}`}>
//               <video src={background} autoPlay loop muted playsInline controls={false} className="object-cover h-full w-full" />
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>


//   );
// }

