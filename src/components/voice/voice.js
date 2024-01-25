import React, { useContext, useEffect, useState } from 'react';
import VoicePlayer from './voicePlayer';
import { GiFemale, GiMale } from 'react-icons/gi';
import supabase from '@/services/supabase/client';
import { SubscriptionContext } from '@/providers/SubscriptionProvider';

export default function Voice({ selectedValue, setSelectedValue }) {
  const [voices, setVoices] = useState([]);
  const [selectedGender, setSelectedGender] = useState('female');

  const subscription = useContext(SubscriptionContext);

  const getVoices = async () => {  
    const { data, error } = await supabase.from('voices').select();

    console.log(data);
    if (!error) setVoices(data);
    console.log('error', error);
  };

  const handleSelect = (index) => {
    setSelectedValue(index);
    setSession(index);
  };

  const handleGender = (gender) => {
    setSelectedGender(gender);
    setSelectedValue(null);
  };

  useEffect(() => {
    getVoices();
  }, []);

  useEffect(() => {
    checkSession();
  }, [voices]);

  const setSession = (index) => {
    // set session
    const storedSession = sessionStorage.getItem('selection');
    let newSelection;

    if (storedSession) {
      console.log('session available', storedSession);

      const storedData = JSON.parse(storedSession);

      // console.log('articles[index].title', voices[index].voice.id);

      let obj = {
        id: index,
      };
      storedData.voice = obj;

      console.log('fix', storedData);
      // Convert JSON object to a string
      const dataString = JSON.stringify(storedData);
      sessionStorage.setItem('selection', dataString);
    } else {
      console.log('no session', index);
      // create new session
      newSelection = {
        voice: {
          id: index,
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
      if (storedData.voice) {
        const index = voices?.findIndex(
          (item) => item.voice.id === storedData.voice.id
        );
        console.log('s art i', index);
        setSelectedValue(storedData.voice.id);
      }
    }
  };

  return (
    <section className='max-w-screen-lg flex-1 flex flex-col items-center mt-5'>
      <div className='flex m-3 shadow-md opacity-90 ease-out'>
        <button
          className={`sm:w-40 flex items-center justify-center space-x-5  ${
            selectedGender === 'female'
              ? 'bg-primary-400 hover:bg-primary-400'
              : 'bg-primary-100 hover:bg-primary-200'
          } shadow-sm rounded-l-md py-2 px-4  transition-all duration-150 ease-out`}
          onClick={() => {
            handleGender('female');
          }}
        >
          <GiFemale className='mr-3' />
          Female Voices
        </button>
        <button
          className={`sm:w-40 flex items-center justify-center space-x-5   ${
            selectedGender === 'male'
              ? 'bg-primary-400 hover:bg-primary-400'
              : 'bg-primary-100 hover:bg-primary-200'
          } shadow-sm rounded-r-md py-2 px-4  transition-all duration-150 ease-out`}
          onClick={() => {
            handleGender('male');
          }}
        >
          <GiMale className='mr-3' />
          Male Voices
        </button>
      </div>
      {voices ? (
        <div className='flex-1 w-full grid grid-cols-1 lg:grid-cols-4 auto-rows-min gap-5 overflow-y-auto scrollbar-stylize p-4'>
          {voices
            .filter((obj) => obj.voice.gender === selectedGender)
            .map((obj, i) => (
              <div key={i} className='max-h-fit'>
                <VoicePlayer
                  key={selectedGender + i}
                  {...obj.voice}
                  {...{ handleSelect, selectedValue, index: obj.voice.id }}
                />
              </div>
            ))}
        </div>
      ) : (
        <div className='w-full h-full rounded-lg bg-custom-400 animate-pulse mt-5'></div>
      )}
    </section>
  );
}
