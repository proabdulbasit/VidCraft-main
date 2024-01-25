import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';


// import required modules
import { EffectCoverflow, Mousewheel } from 'swiper/modules';

export default function Carousel({ avatars }) {
  const swiperRef = useRef(null);

  const avatars2 = [
    {
      image: {
        url: "https://mnaguxyvcgwbzuykozfh.supabase.co/storage/v1/object/public/avatars/63d3ee5adc541c30262a3190_6399f72ae8f94f1b0a8f5165_jack_b%20(1).png",
        name: "Jack",
      }
    }, {
      image: {
        url: "https://mnaguxyvcgwbzuykozfh.supabase.co/storage/v1/object/public/avatars/63d3ee5adc541c30262a3190_6399f72ae8f94f1b0a8f5165_jack_b%20(1).png",
        name: "Jack",
      }
    }, {
      image: {
        url: "https://mnaguxyvcgwbzuykozfh.supabase.co/storage/v1/object/public/avatars/63d3ee5adc541c30262a3190_6399f72ae8f94f1b0a8f5165_jack_b%20(1).png",
        name: "Jack",
      }
    }, {
      image: {
        url: "https://mnaguxyvcgwbzuykozfh.supabase.co/storage/v1/object/public/avatars/63d3ee5adc541c30262a3190_6399f72ae8f94f1b0a8f5165_jack_b%20(1).png",
        name: "Jack",
      }
    }, {
      image: {
        url: "https://mnaguxyvcgwbzuykozfh.supabase.co/storage/v1/object/public/avatars/63d3ee5adc541c30262a3190_6399f72ae8f94f1b0a8f5165_jack_b%20(1).png",
        name: "Jack",
      }
    },

  ]


  return (
    <>
      <Swiper
        ref={swiperRef}
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={2}
        mousewheel={true}
        slideToClickedSlide={true}
        loop={true}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 200,
          modifier: 1,
          slideShadows: true,
        }}
        modules={[EffectCoverflow, Mousewheel]}
        className="w-full py-12"
      >
        {avatars2.map((avatar, index) => (
          <SwiperSlide className="w-64  bg-cover bg-center" key={index}>
            <div className='w-full h-full aspect-square sm:aspect-video rounded-lg relative'>
              <img src={avatar.image.url} className="h-full object-cover rounded-lg bg-slate-900" />
              <h2 className='w-full bg-black/50 backdrop-blur-sm p-4  rounded-b-lg sm:text-2xl absolute bottom-0 '>{avatar.image.name}</h2>
            </div>
          </SwiperSlide>
        ))}


      </Swiper>
    </>
  );
}
