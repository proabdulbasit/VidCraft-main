'use client';

import React, { useEffect, useState, useRef, useContext } from 'react';
import Carousel from 'react-material-ui-carousel';
import CarouselTvItem from './carouselTvItem';
import { Card, Text, Row, Grid, Button, Loading } from '@nextui-org/react';
import { FaRegCheckCircle, FaCheckCircle } from 'react-icons/fa';
import supabase from '@/services/supabase/client';
import { SubscriptionContext } from '@/providers/SubscriptionProvider';

export default function Tv({ selectedValue, setSelectedValue }) {
  const tvs = [
    {
      url: 'https://mnaguxyvcgwbzuykozfh.supabase.co/storage/v1/object/sign/tv/fond-vert-pliable_preview_rev_1.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJ0di9mb25kLXZlcnQtcGxpYWJsZV9wcmV2aWV3X3Jldl8xLnBuZyIsImlhdCI6MTY5NTQ0NTAwNCwiZXhwIjoxNzI2OTgxMDA0fQ.m71CgaR8oeeg73gMeBNrFLPqkI1lZ6h46n-51D7_Zv0&t=2023-09-23T04%3A56%3A42.182Z',
      name: 'one',
    },
    {
      url: 'https://mnaguxyvcgwbzuykozfh.supabase.co/storage/v1/object/sign/tv/virtual-tv-studio-with-panoramic-city-free-video_preview_rev_1.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJ0di92aXJ0dWFsLXR2LXN0dWRpby13aXRoLXBhbm9yYW1pYy1jaXR5LWZyZWUtdmlkZW9fcHJldmlld19yZXZfMS5wbmciLCJpYXQiOjE2OTU0NDUwMTksImV4cCI6MTcyNjk4MTAxOX0.M7kqES5FKm1D_nH6Tf0akDx6goqlcnwdWv-Dwuihz9Q&t=2023-09-23T04%3A56%3A57.130Z',
      name: 'two',
    },
  ];

  const subscription = useContext(SubscriptionContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, error } = await supabase.from('tv').select('*');

        if (error) {
          console.error('Error fetching TV data:', error);
        } else {
          setTvs(data);
        }
      } catch (error) {
        console.error('Error fetching TV data:', error.message);
      }
    };

    // if (subscription.packageLimits.imageGenOnTv) {
    fetchData();
    // }
  }, []);

  const handleIndex = (index) => {
    setSelectedValue(tvs[index].url);

    const storedSession = sessionStorage.getItem('selection');

    if (storedSession) {
      try {
        const storedData = JSON.parse(storedSession);
        storedData.tvs.url = tvs[index].url;
        sessionStorage.setItem('selection', JSON.stringify(storedData));
      } catch (error) {
        console.error('Error updating session:', error.message);
      }
    } else {
      const newSelection = {
        tvs: {
          url: tvs[index].url,
        },
      };
      sessionStorage.setItem('selection', JSON.stringify(newSelection));
    }

    sessionStorage.setItem('selectedValue', tvs[index].name);
  };

  return (
    <div className='max-w-screen-xl mt-5 px-8 xl:px-16 mx-auto overflow-y-auto scrollbar-stylize'>
      <div className='h-6 sticky top-0 bg-gradient-to-b from-custom-100 z-50'></div>
      {tvs ? (
        <div className='h-[90%] flex justify-center content-center flex-wrap'>
          {tvs.map((tv, index) => (
            <div className='w-1/3 max-h-fit'>
              <div
                key={index}
                className={`h-full w-full p-6`}
                onClick={() => handleIndex(index)}
              >
                <div
                  className={`h-full relative flex flex-col items-center  rounded-lg shadow-sm overflow-hidden cursor-pointer outline outline-primary-500 outline-offset-2 transition-all duration-150 ease-out ${
                    selectedValue === tv.url
                      ? 'bg-custom-400  outline-4'
                      : 'bg-custom-300 outline-0'
                  }`}
                >
                  <div className='h-full aspect-square flex items-center'>
                    <img
                      src={tv.url}
                      alt={tv.name}
                      className='w-full object-cover'
                    />
                  </div>
                  <div className='p-4 bg-slate-800/80 w-full '>
                    <h2 className='text-lg font-semibold text-center '>
                      {tv.name}
                    </h2>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <LoadingTv />
      )}
      <div className='h-6 sticky bottom-0 bg-gradient-to-t from-custom-100 z-50'></div>
    </div>
  );
}

function LoadingTv() {
  return (
    <div className='flex-1 grid grid-cols-3 gap-4 items-stretch'>
      <div className='h-full w-full p-4'>
        <div className='h-full w-full relative flex flex-col items-center  rounded-lg shadow-sm overflow-hidden cursor-pointer transition-all duration-150 ease-out'>
          <div className='w-full aspect-square flex items-center'>
            <div className='w-80 h-80 bg-custom-400 animate-pulse'></div>
          </div>
          <div className='p-4 bg-slate-800/80 w-full '>
            <h2 className='text-lg font-semibold text-center h-10'></h2>
          </div>
        </div>
      </div>

      <div className='h-full w-full p-4'>
        <div className='h-full w-full relative flex flex-col items-center  rounded-lg shadow-sm overflow-hidden cursor-pointer transition-all duration-150 ease-out'>
          <div className='w-full aspect-square flex items-center'>
            <div className='w-80 h-80 bg-custom-400 animate-pulse'></div>
          </div>
          <div className='p-4 bg-slate-800/80 w-full '>
            <h2 className='text-lg font-semibold text-center h-10'></h2>
          </div>
        </div>
      </div>

      <div className='h-full w-full p-4'>
        <div className='h-full w-full relative flex flex-col items-center  rounded-lg shadow-sm overflow-hidden cursor-pointer transition-all duration-150 ease-out'>
          <div className='w-full aspect-square flex items-center'>
            <div className='w-80 h-80 bg-custom-400 animate-pulse'></div>
          </div>
          <div className='p-4 bg-slate-800/80 w-full '>
            <h2 className='text-lg font-semibold text-center h-10'></h2>
          </div>
        </div>
      </div>
    </div>
  );
}
