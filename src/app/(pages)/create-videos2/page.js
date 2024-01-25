'use client';
import React, { useState, useEffect } from 'react';
import Avatar from '@/components/avatar/avatar';
import News from '@/components/news/news';
import Voice from '@/components/voice/voice';
import Background from '@/components/background/background';
import Finalise from '@/components/finalise/finalise';
import Tv from '@/components/tv/tv';
import supabase from '@/services/supabase/client';
import { FaCheck } from 'react-icons/fa';

const steps = [
  'Select Avatar',
  'Select News',
  'Select Voice',
  'Select Background',
  'Select TV',
];

export default function CreateVideos() {
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());
  const [session, setSession] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then((savedSession) => {
      if (savedSession && !savedSession.error && savedSession.data.session) {
        setSession(savedSession.data.session);
        console.log(savedSession.data.session);
        setUser(savedSession.data.session.user);
        console.log(savedSession.data.session.user);
      }
    });
  }, []);

  if (!user) {
    return <div>Login</div>;
  }

  const isStepOptional = (step) => {
    return step === 10;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <div className='pt-3 flex-1 flex flex-col justify-between overflow-hidden'>
      <ol className='flex items-center w-full text-sm font-medium text-center text-gray-500 dark:text-gray-400 sm:text-base'>
        {steps.map((label, index) => (
          <li
            key={label}
            className={`${
              activeStep > index
                ? 'text-violet-600 dark:text-violet-500'
                : activeStep === index
                ? 'text-blue-600 dark:text-blue-500'
                : 'text-gray-500 dark:text-gray-400'
            } ${
              index !== steps.length - 1
                ? 'after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:inline-block'
                : 'after:hidden'
            } ${
              activeStep > index
                ? 'after:text-violet-500 dark:after:text-violet-500'
                : 'after:text-gray-200 dark:after:text-gray-500'
            } flex ${
              index !== steps.length - 1 ? 'md:w-full' : ''
            } items-center after:mx-3`}
            onClick={() => {
              setActiveStep(index);
            }}
          >
            <span className='flex items-center after:mx-2 cursor-pointer'>
              <span className='mx-2.5'>
                {activeStep > index ? (
                  <FaCheck className='text-violet-500 dark:text-violet-500' />
                ) : (
                  index + 1
                )}
              </span>
              <span className='w-42 overflow-hidden whitespace-nowrap overflow-ellipsis'>
                {label}
              </span>
            </span>
          </li>
        ))}
      </ol>
      {activeStep === steps.length ? (
        <Finalise />
      ) : (
        <div className='grow overflow-hidden flex h-full justify-center'>
          {activeStep + 1 === 1 && <Avatar />}
          {activeStep + 1 === 2 && <News />}
          {activeStep + 1 === 3 && <Voice />}
          {activeStep + 1 === 4 && <Background />}
          {activeStep + 1 === 5 && <Tv />}
        </div>
      )}

      <div className='justify-self-end w-full'>
        <div className='flex justify-between pt-2 mt-2'>
          <div>
            <button
              className='bg-violet-600 w-24 px-auto p-2 mb-4 ml-8 text-white rounded-full'
              disabled={activeStep === 0}
              onClick={handleBack}
            >
              Back
            </button>
          </div>

          <div>
            {isStepOptional(activeStep) && (
              <button
                className='text-blue-500 dark:text-blue-500 p-2'
                onClick={handleSkip}
              >
                Skip
              </button>
            )}

            <button
              className='bg-violet-600 w-24 px-auto p-2 mb-4 mr-8 text-white rounded-full'
              onClick={handleNext}
            >
              {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
