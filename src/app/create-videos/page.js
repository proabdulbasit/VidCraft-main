'use client';
import React, { useState, useEffect } from 'react';
import { redirect } from 'next/navigation';
import Avatar from '@/components/avatar/avatar';
import News from '@/components/news/news';
import Voice from '@/components/voice/voice';
import Background from '@/components/background/background';
import Tv from '@/components/tv/tv';
import Finalise from '@/components/finalise/finalise';
import supabase from '@/services/supabase/client';
import { Loading } from '@nextui-org/react';
import { FaCheck } from 'react-icons/fa';
import { getSubscription } from '@/app/supabase-server';
import { SubscriptionContext } from '@/providers/SubscriptionProvider';
import { VideoDataContext } from '@/providers/VideoDataProvider';
import { useRouter } from 'next/navigation';
import { getDescriptionObj } from '@/common/parseJsonObj';

export default function CreateVideos() {
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());
  const [session, setSession] = useState(null);
  const [user, setUser] = useState(null);

  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [selectedScript, setSelectedScript] = useState(null);
  const [selectedVoice, setSelectedVoice] = useState(null);
  const [selectedBackground, setSelectedBackground] = useState(null);
  const [selectedTv, setSelectedTv] = useState(null);

  const [subscription, setSubscription] = useState(null);

  const [limitExceeded, setLimitExceeded] = useState(false);

  const router = useRouter();

  const steps =
    subscription &&
    JSON.parse(subscription?.prices?.products?.description)?.imageGenOnTv
      ? [
          {
            label: 'Select Avatar',
            state: selectedAvatar,
            setter: setSelectedAvatar,
            component: Avatar,
          },
          {
            label: 'Select News',
            state: selectedScript,
            setter: setSelectedScript,
            component: News,
          },
          {
            label: 'Select Voice',
            state: selectedVoice,
            setter: setSelectedVoice,
            component: Voice,
          },
          {
            label: 'Select Background',
            state: selectedBackground,
            setter: setSelectedBackground,
            component: Background,
          },
          {
            label: 'Select TV',
            state: selectedTv,
            setter: setSelectedTv,
            component: Tv,
          },
        ]
      : [
          {
            label: 'Select Avatar',
            state: selectedAvatar,
            setter: setSelectedAvatar,
            component: Avatar,
          },
          {
            label: 'Select News',
            state: selectedScript,
            setter: setSelectedScript,
            component: News,
          },
          {
            label: 'Select Voice',
            state: selectedVoice,
            setter: setSelectedVoice,
            component: Voice,
          },
          {
            label: 'Select Background',
            state: selectedBackground,
            setter: setSelectedBackground,
            component: Background,
          },
        ];

  useEffect(() => {
    supabase.auth.getSession().then((savedSession) => {
      if (savedSession && !savedSession.error && savedSession.data.session) {
        setSession(savedSession.data.session);
        setUser(savedSession.data.session.user);
        getData(savedSession.data.session.user.id);
      } else {
        redirect('/login');
      }
    });
  }, []);

  const handleExeededLimitChange = (state) => {
    setLimitExceeded(state);
  };

  const currentStep = steps[activeStep];
  const CurrentStepComponent = currentStep ? currentStep.component : null;
  const isNextButtonDisabled =
    currentStep &&
    (currentStep.state === null ||
      currentStep.state === undefined ||
      currentStep.state === '');

  const isLastStep = activeStep === steps.length - 1;
  const isFinalize = activeStep >= steps.length;

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    if (isStepSkipped(activeStep)) {
    }

    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setLimitExceeded(false);
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

  const isStepOptional = (step) => {
    return step === 10;
  };

  const getData = async (userId) => {
    // const userDetailsRes = await getUserDetails();
    const sub = await getSubscription(userId);
    console.log(sub);
    // setUserDetails(userDetailsRes);
    if (!sub) {
      router.push('/pricing');
    }
    setSubscription(sub);
  };

  const handleUpdateSubscription = async (subscription) => {
    setSubscription(subscription);
  };

  useEffect(() => {
    // getData();
  }, []);

  if (!user || !subscription) {
    return <LoadingCreateVideo />;
  }

  if (
    parseInt(
      getDescriptionObj(subscription?.prices?.products?.description).time.split(
        ' '
      )[0]
    ) <= subscription.usage
  ) {
    return (
      <div className='w-screen h-screen flex flex-col items-center justify-center font-bold'>
        The package limit is exceeded
        <button
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-5'
          onClick={() => router.push('/')}
        >
          Back To Home
        </button>
      </div>
    );
  }

  return (
    <SubscriptionContext.Provider
      value={{
        subscription: subscription,
        packageLimits: getDescriptionObj(
          subscription?.prices?.products?.description
        ),
        handleUpdateSubscription: handleUpdateSubscription,
      }}
    >
      <VideoDataContext.Provider
        value={{
          selectedScript,
          selectedAvatar,
          selectedBackground,
          selectedTv,
          selectedVoice,
          handleExeededLimitChange,
        }}
      >
        <div className='pt-3 flex-1 flex flex-col justify-between overflow-hidden'>
          <ol className='flex items-center w-full text-sm font-medium text-center text-gray-500 dark:text-gray-400 sm:text-base'>
            {steps.map((step, index) => (
              <li
                key={step.label}
                className={`${
                  activeStep > index
                    ? 'text-green-600 dark:text-green-500'
                    : activeStep === index
                    ? 'text-blue-600 dark:text-blue-500'
                    : 'text-gray-500 dark:text-gray-400'
                } ${
                  index !== steps.length - 1
                    ? 'after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:inline-block'
                    : 'after:hidden'
                } ${
                  activeStep > index
                    ? 'after:text-green-500 dark:after:text-green-500'
                    : 'after:text-gray-200 dark:after:text-gray-500'
                } flex ${
                  index !== steps.length - 1 ? 'md:w-full' : ''
                } items-center after:mx-3 transition-all duration-300 ease-out`}
                onClick={() => {
                  if (
                    (!isNextButtonDisabled || index < activeStep) &&
                    !isFinalize
                  ) {
                    // setActiveStep(index);
                  }
                }}
              >
                <span className='flex items-center after:mx-2 cursor-pointer'>
                  <span className='mx-2.5'>
                    {activeStep > index ? (
                      <FaCheck className='text-green-500 dark:text-green-500' />
                    ) : (
                      index + 1
                    )}
                  </span>
                  <span className='w-42 overflow-hidden whitespace-nowrap overflow-ellipsis'>
                    {step.label}
                  </span>
                </span>
              </li>
            ))}
          </ol>
          {isFinalize ? (
            <Finalise />
          ) : (
            <div className='grow overflow-hidden flex h-full justify-center'>
              <CurrentStepComponent
                {...{
                  selectedValue: currentStep.state,
                  setSelectedValue: currentStep.setter,
                }}
              />
            </div>
          )}

          <div className='justify-self-end w-full'>
            <div className='flex justify-between pt-2 mt-2'>
              <div>
                <button
                  className='bg-primary-200 hover:bg-primary-100 disabled:bg-custom-200 disabled:text-gray-400 w-24 px-auto p-2 mb-4 ml-8 text-white rounded-full transition-all duration-150 ease-out'
                  disabled={activeStep === 0 || isFinalize}
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
                {isNextButtonDisabled && (
                  <span className='text-gray-400 mr-4'>Select an option</span>
                )}

                <button
                  className={`bg-primary-200 hover:bg-primary-100 transition-all duration-150 ease-out ${
                    isNextButtonDisabled || isFinalize || limitExceeded
                      ? 'disabled:bg-custom-200 disabled:text-gray-400'
                      : ''
                  } w-24 px-auto p-2 mb-4 mr-8 text-white rounded-full`}
                  onClick={handleNext}
                  disabled={isNextButtonDisabled || isFinalize || limitExceeded}
                >
                  {isLastStep ? 'Finish' : 'Next'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </VideoDataContext.Provider>
    </SubscriptionContext.Provider>
  );
}

function LoadingCreateVideo() {
  return (
    <div className='pt-3 flex-1 flex flex-col justify-between overflow-hidden'>
      <ol className='flex items-center w-full text-sm font-medium text-center text-gray-500 dark:text-gray-400 sm:text-base px-4'>
        <li className='text-gray-500 dark:text-gray-400 after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:inline-block after:text-gray-200 dark:after:text-gray-500 flex md:w-full items-center after:mx-3 transition-all duration-300 ease-out'>
          <span className='flex items-center w-44 h-5 cursor-pointer'>
            <span className='w-full h-full overflow-hidden whitespace-nowrap overflow-ellipsis bg-custom-400 rounded-full animate-pulse'></span>
          </span>
        </li>
        <li className='text-gray-500 dark:text-gray-400 after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:inline-block after:text-gray-200 dark:after:text-gray-500 flex md:w-full items-center after:mx-3 transition-all duration-300 ease-out'>
          <span className='flex items-center w-44 h-5 cursor-pointer'>
            <span className='w-full h-full overflow-hidden whitespace-nowrap overflow-ellipsis bg-custom-400 rounded-full animate-pulse'></span>
          </span>
        </li>
        <li className='text-gray-500 dark:text-gray-400 after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:inline-block after:text-gray-200 dark:after:text-gray-500 flex md:w-full items-center after:mx-3 transition-all duration-300 ease-out'>
          <span className='flex items-center w-44 h-5 cursor-pointer'>
            <span className='w-full h-full overflow-hidden whitespace-nowrap overflow-ellipsis bg-custom-400 rounded-full animate-pulse'></span>
          </span>
        </li>
        <li className='text-gray-500 dark:text-gray-400 after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:inline-block after:text-gray-200 dark:after:text-gray-500 flex md:w-full items-center after:mx-3 transition-all duration-300 ease-out'>
          <span className='flex items-center w-44 h-5 cursor-pointer'>
            <span className='w-full h-full overflow-hidden whitespace-nowrap overflow-ellipsis bg-custom-400 rounded-full animate-pulse'></span>
          </span>
        </li>
        <li className='text-gray-500 dark:text-gray-400 after:hidden after:text-gray-200 dark:after:text-gray-500 flex  items-center after:mx-3 transition-all duration-300 ease-out'>
          <span className='flex items-center w-44 h-5 cursor-pointer'>
            <span className='w-full h-full overflow-hidden whitespace-nowrap overflow-ellipsis bg-custom-400 rounded-full animate-pulse'></span>
          </span>
        </li>
      </ol>

      <div className='grow w-full flex items-center'>
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
            <div
              className='swiper-slide w-64 bg-cover bg-center swiper-slide-visible swiper-slide-prev'
              style={{
                width: '683px',
                transitionDuration: '0ms',
                transform:
                  'translate3d(0px, 0px, -200px) rotateX(0deg) rotateY(0deg) scale(1)',
                zIndex: 0,
              }}
            >
              <div className='w-full h-full aspect-square sm:aspect-video rounded-xl relative'>
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

            <div
              className='swiper-slide w-64 bg-cover bg-center swiper-slide-visible swiper-slide-active'
              style={{
                width: '683px',
                transitionDuration: '0ms',
                transform:
                  'translate3d(0px, 0px, 0px) rotateX(0deg) rotateY(0deg) scale(1)',
                zIndex: 1,
              }}
            >
              <div className='w-full h-full aspect-square sm:aspect-video rounded-xl relative'>
                <div className='h-full w-full object-cover rounded-lg bg-gradient-to-t from-custom-100 to-custom-200 flex justify-center items-center'>
                  <Loading />
                </div>
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

            <div
              className='swiper-slide w-64 bg-cover bg-center swiper-slide-visible swiper-slide-next'
              style={{
                width: '683px',
                transitionDuration: '0ms',
                transform:
                  'translate3d(0px, 0px, -200px) rotateX(0deg) rotateY(0deg) scale(1)',
                zIndex: 0,
              }}
            >
              <div className='w-full h-full aspect-square sm:aspect-video rounded-xl relative'>
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
      </div>

      <div className='flex justify-between pt-2 mt-2'>
        <div className='animate-pulse'>
          <button
            className='bg-custom-200 w-24 h-10 px-auto p-2 mb-4 ml-8 text-white rounded-full transition-all duration-150 ease-out'
            disabled=''
          ></button>
        </div>
        <div className='animate-pulse'>
          <button
            className='bg-custom-200 w-24 h-10 px-auto p-2 mb-4 mr-8 text-white rounded-full transition-all duration-150 ease-out'
            disabled=''
          ></button>
        </div>
      </div>
    </div>
  );
}
