'use client';
import React, { useEffect, useState, useRef, useContext } from 'react';
import { Card, Text, Loading, Grid } from '@nextui-org/react';
import supabase from '@/services/supabase/client';
import { BsChevronCompactDown, BsChevronCompactUp } from 'react-icons/bs';
import { GoVideo } from 'react-icons/go';
import ReactPlayer from 'react-player';
import { SubscriptionContext } from '@/providers/SubscriptionProvider';

export default function Background({ selectedValue, setSelectedValue }) {
  const [backgrounds, setBackgrounds] = useState();
  // const [selectedValue, setSelectedValue] = useState(0);
  const carouselRef = useRef();
  const listRef = useRef();

  const subscription = useContext(SubscriptionContext);

  const getBackgrounds = async () => {
    const { data, error } = await supabase
      .from('backgrounds')
      .select()
      .limit(subscription.packageLimits.backgrounds);

    console.log(data);
    if (!error) setBackgrounds(data);
    console.log('eror', error);
  };

  useEffect(() => {
    getBackgrounds();
  }, []);

  const handleSelect = (index) => {
    setSelectedValue(backgrounds[index].background.url);

    console.log('selectedValue', selectedValue);
    setSession(index);
  };

  useEffect(() => {
    // setSelectedValue(0)
    // checkSession();
  }, [backgrounds]);

  const setSession = (index) => {
    // set session
    const storedSession = sessionStorage.getItem('selection');
    let newSelection;
    if (storedSession) {
      console.log('session available', storedSession);

      const storedData = JSON.parse(storedSession);

      let obj = {
        // id: backgrounds[index].background.url,
      };
      storedData.background = obj;

      console.log('fix', storedData);
      // // Convert JSON object to a string
      const dataString = JSON.stringify(storedData);
      sessionStorage.setItem('selection', dataString);
    } else {
      // console.log('no session', backgrounds[index].background.id);
      // create new session
      newSelection = {
        background: {
          // id: backgrounds[index].types.id,
        },
      };

      console.log(newSelection);

      // Convert JSON object to a string
      const dataString = JSON.stringify(newSelection);
      sessionStorage.setItem('selection', dataString);
    }
  };

  const checkSession = () => {
    // check session
    const storedSession = sessionStorage.getItem('selection');

    if (storedSession != undefined || storedSession) {
      const storedData = JSON.parse(storedSession);

      // get selected index from session and show
      if (storedData.background) {
        const index = backgrounds?.findIndex(
          (item) => item.id === storedData.background.id
        );

        console.log(selectedValue);
        if (index !== -1) {
          console.log('s art i', index);
          setSelectedValue(backgrounds[index].id);
        }
      }
    }
  };

  const scrollUp = () => {
    const elements = listRef.current.children;
    let scrolled = false;

    for (let i = elements.length - 1; i >= 0; i--) {
      if (elements[i].offsetTop < listRef.current.scrollTop) {
        listRef.current.scrollTo({
          top: elements[i].offsetTop,
          behavior: 'smooth',
        });
        scrolled = true;
        break;
      }
    }

    if (!scrolled && listRef.current.scrollTop > 0) {
      listRef.current.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  };

  const scrollDown = () => {
    const elements = listRef.current.children;
    for (let i = 0; i < elements.length; i++) {
      const bottomOfElement = elements[i].offsetTop + elements[i].offsetHeight;
      if (
        bottomOfElement >
        listRef.current.scrollTop + listRef.current.offsetHeight
      ) {
        listRef.current.scrollTo({
          top: bottomOfElement - listRef.current.offsetHeight,
          behavior: 'smooth',
        });
        break;
      }
    }
  };

  return (
    <section className='max-w-screen-xl flex-1 flex justify-center mt-5'>
      {backgrounds ? (
        <div className='grow flex flex-col lg:flex-row justify-center mt-5'>
          <div className='max-h-full flex flex-col mx-4 bg-custom-300 rounded-lg'>
            <div
              className='py-1 w-full flex justify-center items-center text-3xl cursor-pointer'
              onClick={scrollUp}
            >
              <BsChevronCompactUp />
            </div>
            <div
              className='grow overflow-y-auto snap-y snap-mandatory scrollbar-hide'
              ref={listRef}
            >
              <div className='h-2 sticky top-0 bg-gradient-to-b from-custom-300'></div>
              {backgrounds.map((obj, index) => (
                <div
                  className={`${
                    index === 0
                      ? 'mb-3'
                      : index === obj.length - 1
                      ? 'mt-3'
                      : 'my-3'
                  } mx-4`}
                >
                  <button
                    key={index}
                    onClick={() => handleSelect(index)}
                    className={`w-48 aspect-video bg-cover bg-center rounded outline bg-custom-400 outline-offset-1 outline-primary-500 transition-all duration-150 ease-out ${
                      obj.background.url === selectedValue
                        ? 'outline-4'
                        : ' outline-0'
                    }`}
                    style={{
                      backgroundImage: `url(${obj.background.thumbnail})`,
                    }}
                  />
                </div>
              ))}
              <div className='h-2 sticky bottom-0 bg-gradient-to-t from-custom-300'></div>
            </div>
            <div
              className='py-1 w-full flex justify-center items-center text-3xl cursor-pointer'
              onClick={scrollDown}
            >
              <BsChevronCompactDown />
            </div>
          </div>

          <div className='aspect-video'>
            <div
              className='relative h-full aspect-video object-cover rounded-lg bg-custom-300'
              ref={carouselRef}
            >
              {!selectedValue && (
                <div className='absolute w-full h-full flex justify-center items-center'>
                  <div className='flex items-center'>
                    <GoVideo className='text-3xl mr-4' />
                    <h3 className='text-2xl pb-1'>Select a Video Background</h3>
                  </div>
                </div>
              )}
              {backgrounds.map((obj, index) => (
                <div
                  key={index}
                  className={`opacity-0 absolute inset-0 ${
                    obj.background.url === selectedValue ? 'opacity-100' : ''
                  } transition ease-out duration-300`}
                >
                  <video
                    src={obj.background.url}
                    autoPlay
                    loop
                    muted
                    playsInline
                    controls={false}
                    className='object-cover h-full w-full rounded-lg '
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <LoadingBackgrounds />
      )}
    </section>
  );
}

function LoadingBackgrounds() {
  return (
    <div className='grow flex flex-col lg:flex-row justify-center mt-5'>
      <div className='max-h-full flex flex-col mx-4 bg-custom-300 rounded-lg'>
        <div className='py-1 w-full flex justify-center items-center text-3xl cursor-pointer'>
          <BsChevronCompactUp />
        </div>
        <div className='grow overflow-y-hidden animate-pulse'>
          {/* <div className='h-2 sticky top-0 bg-gradient-to-b from-custom-300'></div> */}
          <div className='w-48 aspect-video mb-3 mx-4 rounded bg-custom-400 '></div>
          <div className='w-48 aspect-video my-3 mx-4 rounded bg-custom-400 '></div>
          <div className='w-48 aspect-video my-3 mx-4 rounded bg-custom-400 '></div>
          <div className='w-48 aspect-video my-3 mx-4 rounded bg-custom-400 '></div>
          <div className='w-48 aspect-video my-3 mx-4 rounded bg-custom-400 '></div>

          {/* <div className='h-2 sticky bottom-0 bg-gradient-to-t from-custom-300'></div> */}
        </div>
        <div className='py-1 w-full flex justify-center items-center text-3xl cursor-pointer'>
          <BsChevronCompactDown />
        </div>
      </div>

      <div className='aspect-video animate-pulse'>
        <div className='relative h-full aspect-video object-cover rounded-lg bg-custom-300'></div>
      </div>
    </div>
  );
}
