'use client';

import React, { useEffect, useState, useRef, useContext } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

import { EffectCoverflow, Mousewheel, Keyboard } from 'swiper/modules';

import supabase from '@/services/supabase/client';
import { SubscriptionContext } from '@/providers/SubscriptionProvider';

export default function Avatar({ selectedValue, setSelectedValue }) {
  // const [selectedValue, setSelectedValue] = useState(null);
  const swiperRef = useRef(null);

  const [avatars, setAvatars] = useState([]);

  const subscription = useContext(SubscriptionContext);

  useEffect(() => {
    getAvatars();
  }, []);

  const getAvatars = async () => {
    const { data, error } = await supabase
      .from('avatars')
      .select()
      .limit(subscription.packageLimits.avatars);

    if (!error) {
      setAvatars(data);
      console.log('avatars', data);
      // check session
      const storedSession = sessionStorage.getItem('selection');

      if (storedSession != undefined || storedSession) {
        const storedData = JSON.parse(storedSession);

        // get selected index from session and show
        const index = data?.findIndex(
          (item) => item.image?.id === storedData.avatar?.id
        );

        setSelectedValue(
          avatars && index ? avatars[index]?.image?.id : avatars[0]?.image?.id
        );
      }
    } else {
      console.log('eror', error);
    }
  };

  const handleIndex = (index) => {
    console.log(index);
    setSelectedValue(avatars[index].image?.id);

    const storedSession = sessionStorage.getItem('selection');
    let newSelection;
    if (storedSession) {
      console.log('session available', storedSession);
      let storedData = JSON.parse(storedSession);
      storedData = { ...storedData, avatar: { id: avatars[index].image?.id } };

      console.log('update', storedData);
      const dataString = JSON.stringify(storedData);
      sessionStorage.setItem('selection', dataString);
    } else {
      console.log('no session', avatars[index].image.id);
      newSelection = {
        avatar: {
          id: avatars[index].image.id,
        },
      };

      console.log(newSelection);

      const dataString = JSON.stringify(newSelection);
      sessionStorage.setItem('selection', dataString);
    }
  };

  return (
    <div className='grow w-full flex items-center'>
      {avatars ? (
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
          modules={[EffectCoverflow, Mousewheel, Keyboard]}
          className='w-full max-h-fit my-auto'
          keyboard={{
            enabled: true,
            onlyInViewport: false,
          }}
        >
          {avatars.map((avatar, index) => (
            <SwiperSlide className='w-64  bg-cover bg-center' key={index}>
              <div className='w-full h-full aspect-square sm:aspect-video rounded-xl relative'>
                <img
                  src={avatar.image.url}
                  className='h-full object-cover rounded-lg bg-gradient-to-t from-custom-100 to-custom-200'
                />
                <div className='flex justify-between items-center px-4 h-16 w-full bg-slate-800/80 backdrop-blur-sm  rounded-b-lg sm:text-2xl absolute bottom-0 '>
                  <h2 className=''>{avatar.image.name}</h2>
                  <button
                    className={` transition-all duration-150 ease-out py-1 px-4 rounded-lg text-lg ${
                      avatar.image.id == selectedValue
                        ? 'bg-primary-300'
                        : 'bg-slate-500 hover:bg-slate-600'
                    } `}
                    onClick={() => {
                      handleIndex(index);
                    }}
                  >
                    {avatar.image.id == selectedValue ? 'Selected' : 'Select'}{' '}
                  </button>
                </div>
              </div>
            </SwiperSlide>
          ))}
          {avatars.length > 1 &&
            avatars.length < 4 &&
            avatars.map((avatar, index) => (
              <SwiperSlide className='w-64  bg-cover bg-center' key={index}>
                <div className='w-full h-full aspect-square sm:aspect-video rounded-xl relative'>
                  <img
                    src={avatar.image.url}
                    className='h-full object-cover rounded-lg bg-gradient-to-t from-custom-100 to-custom-200'
                  />
                  <div className='flex justify-between items-center px-4 h-16 w-full bg-slate-800/80 backdrop-blur-sm  rounded-b-lg sm:text-2xl absolute bottom-0 '>
                    <h2 className=''>{avatar.image.name}</h2>
                    <button
                      className={` transition-all duration-150 ease-out py-1 px-4 rounded-lg text-lg ${
                        avatar.image.id == selectedValue
                          ? 'bg-primary-300'
                          : 'bg-slate-500 hover:bg-slate-600'
                      } `}
                      onClick={() => {
                        handleIndex(index);
                      }}
                    >
                      {avatar.image.id == selectedValue ? 'Selected' : 'Select'}{' '}
                    </button>
                  </div>
                </div>
              </SwiperSlide>
            ))}
        </Swiper>
      ) : (
        <div className='flex justify-center mt-60'>
          <LoadingAvatars />
        </div>
      )}
    </div>
  );
}

const LoadingAvatars = () => {
  return (
    <div className='swiper swiper-coverflow swiper-3d swiper-initialized swiper-horizontal swiper-watch-progress w-full max-h-fit my-auto'>
      <div
        className='swiper-wrapper'
        style={{
          cursor: 'grab',
          transitionDuration: '0ms',
          transform: 'translate3d(-341.5px, 0px, 0px)',
          transitionDelay: '0ms',
        }}
      >
        {/* Slide 1 */}
        <div
          className='swiper-slide w-64 bg-cover bg-center swiper-slide-visible swiper-slide-prev'
          style={{
            width: '683px',
            transitionDuration: '0ms',
            transform:
              'translate3d(0px, 0px, -200px) rotateX(0deg) rotateY(0deg) scale(1)',
            zIndex: 0,
          }}
          data-swiper-slide-index='1'
        >
          <div className='w-full h-full aspect-square sm:aspect-video rounded-xl relative animate-pulse'>
            <div className='h-full w-full object-cover rounded-lg bg-gradient-to-t from-custom-100 to-custom-200'></div>
          </div>
          <div
            className='swiper-slide-shadow-left swiper-slide-shadow-coverflow'
            style={{ opacity: 1, transitionDuration: '0ms' }}
          ></div>
          <div
            className='swiper-slide-shadow-right swiper-slide-shadow-coverflow'
            style={{ opacity: 0, transitionDuration: '0ms' }}
          ></div>
        </div>

        {/* Slide 2 */}
        <div
          className='swiper-slide w-64 bg-cover bg-center swiper-slide-visible swiper-slide-active'
          style={{
            width: '683px',
            transitionDuration: '0ms',
            transform:
              'translate3d(0px, 0px, 0px) rotateX(0deg) rotateY(0deg) scale(1)',
            zIndex: 1,
          }}
          data-swiper-slide-index='2'
        >
          <div className='w-full h-full aspect-square sm:aspect-video rounded-xl relative animate-pulse'>
            <div className='h-full w-full object-cover rounded-lg bg-gradient-to-t from-custom-100 to-custom-200'></div>
          </div>
          <div
            className='swiper-slide-shadow-left swiper-slide-shadow-coverflow'
            style={{ opacity: 0, transitionDuration: '0ms' }}
          ></div>
          <div
            className='swiper-slide-shadow-right swiper-slide-shadow-coverflow'
            style={{ opacity: 0, transitionDuration: '0ms' }}
          ></div>
        </div>

        {/* Slide 3 */}
        <div
          className='swiper-slide w-64 bg-cover bg-center swiper-slide-visible swiper-slide-next'
          style={{
            width: '683px',
            transitionDuration: '0ms',
            transform:
              'translate3d(0px, 0px, -200px) rotateX(0deg) rotateY(0deg) scale(1)',
            zIndex: 0,
          }}
          data-swiper-slide-index='0'
        >
          <div className='w-full h-full aspect-square sm:aspect-video rounded-xl relative animate-pulse'>
            <div className='h-full w-full object-cover rounded-lg bg-gradient-to-t from-custom-100 to-custom-200'></div>
          </div>
          <div
            className='swiper-slide-shadow-left swiper-slide-shadow-coverflow'
            style={{ opacity: 0, transitionDuration: '0ms' }}
          ></div>
          <div
            className='swiper-slide-shadow-right swiper-slide-shadow-coverflow'
            style={{ opacity: 1, transitionDuration: '0ms' }}
          ></div>
        </div>
      </div>
    </div>
  );
};
