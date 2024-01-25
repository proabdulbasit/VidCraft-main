import React, { useEffect, useState, useRef } from 'react';
import { CircleFlag } from 'react-circle-flags';
import { BsFillPlayFill } from 'react-icons/bs';

const VoicePlayer = ({
  url,
  language,
  countryCode,
  gender,
  mood,
  handleSelect,
  selectedValue,
  index,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const audioContext = useRef(null);
  const analyser = useRef(null);
  const canvasRef = useRef(null);

  const [source, setSource] = useState(null);

  const play = () => {
    if (audioRef.current) {
      if (!isPlaying) {
        audioRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  useEffect(() => {
    if (audioRef.current) {
      audioContext.current = new (window.AudioContext ||
        window.webkitAudioContext)();
      analyser.current = audioContext.current.createAnalyser();
      if (source) {
        const sourceData = audioContext.current.createMediaElementSource(
          audioRef.current
        );
        setSource(sourceData);
      }

      // Disconnect existing connections before creating new ones
      if (source && source.mediaElement !== null) {
        source.disconnect();
      }

      source?.connect(analyser.current);
      analyser.current.connect(audioContext.current.destination);

      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      analyser.current.fftSize = 256;
      const bufferLength = analyser.current.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      const draw = () => {
        analyser.current.getByteFrequencyData(dataArray);
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const barWidth = 50; // Width of each bar
        const barSpacing = 20; // Spacing between bars
        const totalWidth = (barWidth + barSpacing) * 3;
        const halfHeight = canvas.height / 2;

        let x = (canvas.width - totalWidth) / 2;

        for (let i = 0; i < 3; i++) {
          // Apply non-linear scaling to emphasize higher volumes
          const volume = (dataArray[i] / 255) ** 2.5; // You can adjust the exponent for the desired effect
          const barHeight = volume * halfHeight;
          ctx.fillStyle = `rgb(203 213 225)`;
          ctx.fillRect(x, halfHeight - barHeight, barWidth, barHeight);
          ctx.fillRect(x, halfHeight, barWidth, barHeight);
          x += barWidth + barSpacing;
        }

        requestAnimationFrame(draw);
      };

      draw();

      // Event listener to set isPlaying to false when the audio ends
      audioRef.current.addEventListener('ended', () => {
        setIsPlaying(false);
      });
    }

    return () => {
      if (audioContext.current) {
        // Disconnect existing connections before closing the context
        analyser.current.disconnect();
        audioContext.current.close();
      }
    };
  }, []); // Add url as a dependency to recreate the effect when the URL changes

  return (
    <div
      className={`p-1 rounded-full bg-custom-400 overflow-hidden outline outline-offset-1 outline-primary-500 cursor-pointer ${
        index === selectedValue ? 'outline-3' : ' outline-0'
      } transition-all ease-out duration-150`}
    >
      <audio ref={audioRef} src={url} crossOrigin='anonymous'></audio>

      <div className='flex items-center justify-between'>
        <div
          className='flex items-center grow'
          onClick={() => {
            handleSelect(index);
          }}
        >
          <div className='w-12 h-12'>
            <CircleFlag countryCode={countryCode.toLowerCase()} />
          </div>
          <div className='ml-3'>
            <p className='whitespace-nowrap leading-4 text-md'>{language}</p>
            <small className='text-sm leading-3 text-gray-500'>{mood}</small>
          </div>
        </div>

        <div className='flex items-center'>
          <button
            onClick={play}
            className='w-12 h-12 bg-slate-500 rounded-full cursor-pointer relative'
          >
            {/* <div className='w-full h-full  absolute top-0 left-0'>
              <CircleFlag countryCode={countryCode.toLowerCase()} />
            </div> */}
            <div className='w-10 h-10 m-2'>
              {!isPlaying ? (
                <BsFillPlayFill className='w-full h-full mr-px absolute top-0 left-0 shadow-md  fill-white opacity-90 drop-shadow-xl ' />
              ) : null}
            </div>
            <div className='w-7 h-7 absolute top-2.5 left-2.5  z-50'>
              <canvas ref={canvasRef} className='w-full h-full' />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default VoicePlayer;
