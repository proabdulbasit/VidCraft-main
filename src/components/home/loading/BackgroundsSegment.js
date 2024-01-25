import React from 'react';

export default function LoadingBackgroundsSegment() {
  return (
    <section className="max-w-screen-xl mt-8 mb-6 sm:mt-14 sm:mb-14 px-6 sm:px-8 lg:px-16 lg:mt-32 mx-auto transition-all duration-200 ease-out opacity-0">
      <div className="grid grid-flow-row lg:grid-flow-col grid-cols-1 lg:grid-cols-3 gap-8 py-8 my-12">
        <div className="lg:col-span-1">
          <div className="flex flex-col justify-center w-full">
            <h3 className="text-3xl lg:text-4xl font-medium leading-relaxed text-black-600 text-white">
              <span className="inline animate-pulse h-4 w-24 rounded-md bg-gray-200" />
              <span className="inline animate-pulse h-4 w-20 rounded-md bg-gray-200" />
              <span className="inline animate-pulse h-4 w-16 rounded-md bg-gray-200" />
            </h3>
            <p className="mt-4 text-black-500 text-white">
              <span className="inline animate-pulse h-6 w-32 rounded-md bg-gray-200" />
              <span className="inline animate-pulse h-6 w-24 rounded-md bg-gray-200" />
            </p>
          </div>
        </div>
        <div className="lg:col-span-2">
          <div className="animate-pulse h-48 rounded-md bg-gray-200" />
        </div>
      </div>
    </section>
  );
};

function CustomCarousel({ backgrounds, host }) {
  return (
    <div className="h-full w-full">
      <div className="w-full aspect-[22/9] lg:h-72 overflow-hidden relative">
        <div className="h-full flex flex-col justify-evenly absolute top-0 left-0 z-40 p-1 sm:p-2">
          {backgrounds.map((background, index) => (
            <div className="flex-grow m-1 sm:m-2" key={index}>
              <div className="animate-pulse h-full aspect-video bg-gray-200 rounded-md" />
            </div>
          ))}
        </div>
        <div className="absolute left-0 z-30 h-full w-1/3 animate-pulse bg-gray-200" />
        <div className="absolute left-0 z-30 h-full w-1/3 animate-pulse bg-gray-200" />
        <div className="absolute bottom-0 right-0 z-20 w-2/3">
          <div className="animate-pulse h-48 rounded-md bg-gray-200" />
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

