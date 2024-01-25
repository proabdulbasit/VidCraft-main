import React, { useState, useEffect, useRef } from 'react';
import useIsVisible from '@/hooks/useIsVisible';
import { titleAnimation, descriptionAnimation, staggerDelay } from '@/animations';
import gsap, { Power3 } from 'gsap';
import VoicePlayer from "@/components/voice/voicePlayer"


export default function VoiceLibrarySegment({ title, description, voices }) {
  const titleRef = useRef([]);
  const descriptionRef = useRef();
  const sectionRef = useRef();
  const musicPlayerRefs = useRef([]);
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


      musicPlayerRefs.current.forEach((musicPlayer, index) => {
        animation.fromTo(
          musicPlayer,
          {
            opacity: 0,
            y: 20,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: Power3.easeOut,
          },
          staggerDelay * index
        );
      })


      animation.fromTo(
        descriptionRef.current,
        ...descriptionAnimation,
        `-=${staggerDelay}`
      );
      animation.play();

    }
  }, [isVisible, title, description]);

  

  return (
    <section className={`max-w-screen-xl mt-8 mb-6 sm:mt-14 sm:mb-14 px-6 sm:px-8 lg:px-16 lg:mt-32 mx-auto  transition-all duration-200 ease-out ${isVisible? "" : "opacity-0" } `} ref={sectionRef}>
      <div className="grid grid-flow-row lg:grid-flow-col grid-cols-1 lg:grid-cols-2 gap-8 py-8 my-12">
        <div className="grid grid-cols-2 gap-3">
          {voices.map((obj, index) => (
            <div key={index} ref={(ref) => (musicPlayerRefs.current[index] = ref)}>
              <VoicePlayer {...obj.voice} />
            </div>
          ))}
        </div>

        <div className="">
          <div className="flex flex-col justify-center w-full">
            <h3 className="text-3xl lg:text-4xl font-medium leading-relaxed text-black-600">
              {titleWords.map((word, index) => (
                <span key={index} className="inline" ref={(ref) => (titleRef.current[index] = ref)}>
                  {word + ' '}
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


// const VoicePlayer = ({ audioUrl, text }) => {
//   const [isPlaying, setIsPlaying] = useState(false);
//   const audioRef = useRef(null);
//   const audioContext = useRef(null);
//   const analyser = useRef(null);
//   const canvasRef = useRef(null);

//   const play = () => {
//     if (audioRef.current) {
//       if (!isPlaying) {
//         audioRef.current.play();
//         setIsPlaying(true);

//       }
//     }
//   };

//   useEffect(() => {
//     if (audioRef.current) {
//       audioContext.current = new (window.AudioContext || window.webkitAudioContext)();
//       analyser.current = audioContext.current.createAnalyser();
//       const source = audioContext.current.createMediaElementSource(audioRef.current);
//       source.connect(analyser.current);
//       analyser.current.connect(audioContext.current.destination);

//       const canvas = canvasRef.current;
//       const ctx = canvas.getContext('2d');
//       analyser.current.fftSize = 256;
//       const bufferLength = analyser.current.frequencyBinCount;
//       const dataArray = new Uint8Array(bufferLength);

//       const draw = () => {
//         analyser.current.getByteFrequencyData(dataArray);
//         ctx.clearRect(0, 0, canvas.width, canvas.height);

//         const barWidth = 50; // Width of each bar
//         const barSpacing = 20; // Spacing between bars
//         const totalWidth = (barWidth + barSpacing) * 3;
//         const halfHeight = canvas.height / 2;

//         let x = (canvas.width - totalWidth) / 2;

//         for (let i = 0; i < 3; i++) {
//           // Apply non-linear scaling to emphasize higher volumes
//           const volume = (dataArray[i] / 255) ** 1.5; // You can adjust the exponent for the desired effect
//           const barHeight = volume * halfHeight;
//           ctx.fillStyle = `rgb(76 29 149)`;
//           ctx.fillRect(x, halfHeight - barHeight, barWidth, barHeight);
//           ctx.fillRect(x, halfHeight, barWidth, barHeight);
//           x += barWidth + barSpacing;
//         }

//         requestAnimationFrame(draw);
//       };

//       draw();

//       // Event listener to set isPlaying to false when the audio ends
//       audioRef.current.addEventListener('ended', () => {
//         setIsPlaying(false);
//       });
//     }

//     return () => {
//       if (audioContext.current) {
//         audioContext.current.close();
//       }
//     };
//   }, []);

//   return (
//     <div className="music-player-container p-1 rounded-full bg-gray-800 overflow-hidden">
//       <audio ref={audioRef} src={audioUrl}></audio>

//       <div className="flex items-center">
//         <button
//           onClick={play}
//           className="w-10 h-10 bg-custom-200 rounded-full cursor-pointer relative"
//         >
//           <div className="w-8 h-8 m-1">
//             {!isPlaying ? (
//               <img src="/assets/img/play.svg" className='w-full h-full' />
//             ) : null}
//           </div>
//           <div className="w-7 h-7  absolute top-1.5 left-1.5">
//             <canvas ref={canvasRef} className="w-full h-full z-50" />
//           </div>

//         </button>

//         <p className="ml-2 whitespace-nowrap">{text}</p>
//       </div>
//     </div>
//   );
// };


// const VoicePlayer = ({ audioUrl }) => {
//   const [isPlaying, setIsPlaying] = useState(false);
//   const audioRef = useRef(null);
//   const audioContext = useRef(null);
//   const analyser = useRef(null);
//   const canvasRef = useRef(null);

//   const play = () => {
//     if (audioRef.current) {
//       if (!isPlaying) {
//         audioRef.current.play();
//         setIsPlaying(true);
//       }
//     }
//   };

//   useEffect(() => {
//     if (audioRef.current) {
//       audioContext.current = new (window.AudioContext || window.webkitAudioContext)();
//       analyser.current = audioContext.current.createAnalyser();
//       const source = audioContext.current.createMediaElementSource(audioRef.current);
//       source.connect(analyser.current);
//       analyser.current.connect(audioContext.current.destination);

//       const canvas = canvasRef.current;
//       const ctx = canvas.getContext('2d');
//       analyser.current.fftSize = 256;
//       const bufferLength = analyser.current.frequencyBinCount;
//       const dataArray = new Uint8Array(bufferLength);

//       const draw = () => {
//         analyser.current.getByteFrequencyData(dataArray);
//         ctx.clearRect(0, 0, canvas.width, canvas.height);

//         const barWidth = 50; // Width of each bar
//         const barSpacing = 10; // Spacing between bars
//         const totalWidth = (barWidth + barSpacing) * 3;
//         const halfHeight = canvas.height / 2;

//         let x = (canvas.width - totalWidth) / 2;

//         for (let i = 0; i < 3; i++) {
//           // Apply non-linear scaling to emphasize higher volumes
//           const volume = (dataArray[i] / 255) ** 2; // You can adjust the exponent for the desired effect
//           const barHeight = volume * halfHeight;
//           ctx.fillStyle = `rgb(50, 50, ${i * 50})`;
//           ctx.fillRect(x, halfHeight - barHeight, barWidth, barHeight);
//           ctx.fillRect(x, halfHeight, barWidth, barHeight);
//           x += barWidth + barSpacing;
//         }

//         requestAnimationFrame(draw);
//       };

//       draw();

//       // Event listener to set isPlaying to false when the audio ends
//       audioRef.current.addEventListener('ended', () => {
//         setIsPlaying(false);
//       });
//     }

//     return () => {
//       if (audioContext.current) {
//         audioContext.current.close();
//       }
//     };
//   }, []);

//   return (
//     <div className="music-player-container p-4 bg-gray-200 rounded-md">
//       <audio ref={audioRef} src={audioUrl}></audio>
//       <div className="flex items-center">
//         <button
//           onClick={play}
//           className="p-2 bg-blue-500 text-white rounded-full cursor-pointer relative"
//         >
//           {isPlaying ? (
//             <canvas
//               ref={canvasRef}
//               width={160}
//               height={100}
//               className="equalizer absolute top-0 left-0"
//             />
//           ) : null}
//           {isPlaying ? 'Pause' : 'Play'}
//         </button>
//         <p className="ml-4">{isPlaying ? 'Playing...' : 'Paused'}</p>
//       </div>
//     </div>
//   );
// };