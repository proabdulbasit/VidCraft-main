'use client';

import React, { useState, useEffect, useMemo, useContext } from 'react';
import supabase from '@/services/supabase/client';
import getFavicon from 'get-website-favicon';
import { AiOutlineSend, AiOutlineEdit, AiOutlineClear } from 'react-icons/ai';
import { SubscriptionContext } from '@/providers/SubscriptionProvider';
import { VideoDataContext } from '@/providers/VideoDataProvider';
import { wordsPerMinute } from '@/common/videoprops';

import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function News({ selectedValue, setSelectedValue }) {
  const [selectedArticleIndex, setSelectedArticleIndex] = useState(-1);
  const [articles, setArticles] = useState(null);
  const [exceedsLimit, setExceedsLimit] = useState(false);

  const subscriptionData = useContext(SubscriptionContext);

  const videoData = useContext(VideoDataContext);

  const notify = () =>
    toast.warn('Your video time limit has been exceeded!', {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'dark',
      transition: Bounce,
    });

  const availableLanguages = [
    {
      language: 'English',
      code: 'eng',
    },
    {
      language: 'French',
      code: 'fra',
    },
  ];

  const availableTopics = [
    {
      topic: 'Social',
    },
    {
      topic: 'Politics',
    },
    {
      topic: 'Economy',
    },
    {
      topic: 'Tech',
    },
  ];

  const [selectedLanguage, setSelectedLanguage] = useState(
    availableLanguages[0].code
  );
  const [selectedTopic, setSelectedTopic] = useState(availableTopics[0].topic);

  const [isTextAreaEditable, setTextAreaEditable] = useState(false);

  const getArticles = async () => {
    try {
      const response = await fetch(
        'https://eventregistry.org/api/v1/article/getArticles',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            action: 'getArticles',
            keyword: selectedTopic,
            lang: selectedLanguage,
            articlesPage: 1,
            articlesCount: 10,
            articlesSortBy: 'date',
            articlesSortByAsc: false,
            articlesArticleBodyLen: -1,
            resultType: 'articles',
            dataType: ['news', 'pr'],
            apiKey: process.env.NEXT_PUBLIC_NEWS_API_KEY,
            forceMaxDataTimeWindow: 31,
          }),
        }
      );
      const data = await response.json();
      console.log('data', data.articles.results);

      setArticles(data.articles.results);
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    checkSession();
    if (selectedValue) {
      validateVideoLength(selectedValue);
    }
  }, [articles]);

  const checkSession = () => {
    // check session
    const storedSession = sessionStorage.getItem('selection');

    if (storedSession != undefined || storedSession) {
      const storedData = JSON.parse(storedSession);

      // get selected index from session and show
      if (storedData.article) {
        console.log('storedData.article.title', storedData.article.title);
        const index = articles?.findIndex(
          (item) => item.title === storedData.article.title
        );
        console.log('s art i', index);
        setSelectedArticleIndex(index);
        // if (storedData.article.title === storedData.article.desc) {
        setSelectedValue(storedData.article.desc);
        // }
      }
    }
  };

  const validateVideoLength = (text) => {
    const estimatedVideoLength = estimateVideoLength(text);
    const videoLengthLimit = parseInt(
      subscriptionData.packageLimits.time.split(' ')[0]
    );
    const predictedUsage =
      estimatedVideoLength + subscriptionData.subscription.usage;
    if (videoLengthLimit <= predictedUsage) {
      if (!exceedsLimit) {
        notify();
      }
      setExceedsLimit(true);
      videoData?.handleExeededLimitChange(true);
    } else {
      setExceedsLimit(false);
      videoData?.handleExeededLimitChange(false);
    }
  };

  useEffect(() => {
    getArticles();
  }, [selectedLanguage, selectedTopic]);

  const handleSelect = (index) => {
    setSelectedArticleIndex(index);
    const text = articles[index].title + '\n\n' + articles[index].body;
    setSelectedValue(text);
    validateVideoLength(text);
    setTextAreaEditable(false);
  };

  const handleEditText = () => {
    setTextAreaEditable(!isTextAreaEditable);
  };

  const handleClearText = () => {
    setTextAreaEditable(true);
    setSelectedArticleIndex(-1);
    setSelectedValue('');
  };

  const handleTextChange = (e) => {
    validateVideoLength(e.target.value);
    setSelectedValue(e.target.value);
  };

  function estimateVideoLength(text) {
    // Split the text into words
    const words = text.split(/\s+/);

    // Calculate the estimated time in minutes
    const estimatedMinutes = words.length / wordsPerMinute;

    // Convert minutes to seconds
    const estimatedSeconds = estimatedMinutes * 60;

    return estimatedSeconds;
  }

  const setSession = (index) => {
    // set session
    const storedSession = sessionStorage.getItem('selection');
    let newSelection;
    if (storedSession) {
      console.log('session available', storedSession);
      const storedData = JSON.parse(storedSession);

      let articleObj;

      if (selectedValue) {
        articleObj = {
          title: selectedValue,
          desc: selectedValue,
        };
      } else {
        articleObj = {
          title: articles[index].title,
          desc: articles[index].body,
        };
      }

      storedData.article = articleObj;

      console.log('fix', storedData);
      // // Convert JSON object to a string
      const dataString = JSON.stringify(storedData);
      sessionStorage.setItem('selection', dataString);
    } else {
      console.log('no session');
      // create new session

      if (selectedValue) {
        newSelection = {
          article: {
            name: selectedValue,
          },
        };
      } else {
        newSelection = {
          article: {
            name: articles[selectedArticleIndex].title,
          },
        };
      }

      console.log(newSelection);

      // Convert JSON object to a string
      const dataString = JSON.stringify(newSelection);
      sessionStorage.setItem('selection', dataString);
    }
  };

  function formatDate(inputDateTime) {
    const currentDate = new Date();
    const dateTime = new Date(inputDateTime);

    const timeDifference = currentDate.getTime() - dateTime.getTime();
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hoursDifference = Math.floor(timeDifference / (1000 * 60 * 60));
    const minutesDifference = Math.floor(timeDifference / (1000 * 60));

    const yearOptions = { day: 'numeric', month: 'long' };
    const monthOptions = { day: 'numeric', month: 'long' };
    const weekOptions = { weekday: 'long' };

    if (daysDifference === 0) {
      if (hoursDifference === 0) {
        return `${minutesDifference} ${
          minutesDifference > 1 ? 'minutes' : 'minute'
        } ago`;
      } else {
        return `${hoursDifference} ${
          hoursDifference > 1 ? 'hours' : 'hour'
        } ago`;
      }
    } else if (daysDifference === 1) {
      return 'Yesterday';
    } else if (daysDifference < 7) {
      return `Last ${dateTime.toLocaleDateString('en-US', weekOptions)}`;
    } else if (dateTime.getFullYear() === currentDate.getFullYear()) {
      return dateTime.toLocaleDateString('en-US', monthOptions);
    } else {
      return dateTime.toLocaleDateString('en-US', yearOptions);
    }
  }

  // if (subscriptionData) {
  //   return <div>{subscriptionData.packageLimits.time}</div>;
  // }

  return (
    <section className='max-w-screen-xl flex-1 flex mt-5'>
      <ToastContainer />
      <div className='flex flex-1 gap-5'>
        <div className='grow basis-1/2 flex flex-col'>
          <div className='flex justify-between'>
            <h2 className='text-4xl mx-4 '>News</h2>
            <div className='flex items-center'>
              <div className='mx-2'>
                <select
                  className='bg-custom-300 py-1 px-2 rounded border-none outline-none cursor-pointer'
                  onChange={(e) => {
                    setSelectedTopic(e.target.value);
                  }}
                >
                  {availableTopics.map((obj, index) => (
                    <option
                      className='hover:bg-custom-400'
                      key={index}
                      value={obj.topic}
                    >
                      {obj.topic}
                    </option>
                  ))}
                </select>
              </div>

              <div className='mx-2'>
                <select
                  className='bg-custom-300 py-1 px-2 rounded border-none outline-none cursor-pointer'
                  onChange={(e) => {
                    setSelectedLanguage(e.target.value);
                  }}
                >
                  {availableLanguages.map((obj, index) => (
                    <option
                      className='hover:bg-custom-400'
                      key={index}
                      value={obj.code}
                    >
                      {obj.language}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div
            className={`grow ${
              articles ? 'overflow-y-auto' : 'overflow-y-hidden'
            } snap-y snap-mandatory mt-2 scrollbar-stylize`}
          >
            <div className='h-6 sticky top-0 bg-gradient-to-b from-custom-100'></div>
            {articles ? (
              <div className='flex flex-col justify-center'>
                {articles.map((article, index) => (
                  <div
                    onClick={() => handleSelect(index)}
                    key={index}
                    className={`bg-custom-300 py-3 rounded-lg mx-4 snap-start scroll-mt-6 cursor-pointer outline outline-offset-2 outline-primary-500 transition-all duration-150 ease-out
                    ${
                      index === 0
                        ? 'mb-2'
                        : index === articles.length - 1
                        ? 'mt-2'
                        : 'my-2'
                    }
                        ${
                          selectedArticleIndex === index
                            ? 'bg-custom-400 outline-4'
                            : 'outline-0'
                        }  transition-all duration-150 ease-out`}
                  >
                    <div className='h-44 flex'>
                      <div className='mx-3 flex flex-col justify-between'>
                        <div className='max-h-36 w-full flex flex-col'>
                          <h3 className='text-xl font-semibold break-words'>
                            {article.title ?? ''}
                          </h3>
                          <p className=' mt-1 text-sm text-gray-300 flex-1 overflow-hidden text-ellipsis whitespace-normal max-w-full break-words'>
                            {article.body ?? ''}
                          </p>
                        </div>

                        <small className='flex justify-between text-gray-300 '>
                          <div>
                            {`${article?.authors?.[0]?.name ?? ''}`}
                            {article?.authors?.[0]?.name &&
                            article?.source?.title
                              ? ' · '
                              : ''}
                            {`${article?.source?.title ?? ''}`}
                          </div>
                          <div>{formatDate(article.dateTime)}</div>
                        </small>
                      </div>
                      {article.image ? (
                        <img
                          className='aspect-square object-cover h-full rounded-lg mr-3 bg-custom-400'
                          src={article.image}
                          alt={article.title}
                          onError={(e) =>
                            (e.currentTarget.style.display = 'none')
                          }
                        />
                      ) : null}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <LoadingNews />
            )}
            <div className='h-6 sticky bottom-0 bg-gradient-to-t from-custom-100'></div>
          </div>
        </div>

        <div className='grow basis-1/2'>
          {/* ... (existing code) */}
          <div className='flex flex-col items-center h-full overflow-auto relative'>
            {selectedArticleIndex !== -1 && !isTextAreaEditable && (
              <div className='absolute bottom-0 right-0 flex m-3 shadow-md opacity-90 hover:opacity-100  transition-all duration-150 ease-out'>
                <button
                  className='flex items-center space-x-5 bg-primary-100 hover:bg-custom-400 shadow-sm rounded-l-md py-2 px-4  transition-all duration-150 ease-out'
                  onClick={handleEditText}
                >
                  <AiOutlineEdit className='mr-3' />
                  Edit Text
                </button>
                <button
                  className='flex items-center space-x-5 bg-primary-100 hover:bg-custom-400 shadow-sm rounded-r-md py-2 px-4  transition-all duration-150 ease-out'
                  onClick={handleClearText}
                >
                  <AiOutlineClear className='mr-3' />
                  Clear Text
                </button>
              </div>
            )}
            {selectedArticleIndex !== -1 && !isTextAreaEditable ? (
              <div className='p-4 rounded-lg bg-custom-300 min-h-full overflow-y-scroll scrollbar-stylize'>
                <h3 className='text-2xl font-semibold mb-2'>
                  {articles[selectedArticleIndex]?.title ?? ''}
                </h3>
                <small className='flex justify-between text-gray-300 '>
                  <div>
                    {`${
                      articles[selectedArticleIndex]?.authors?.[0]?.name ?? ''
                    }`}
                    {articles[selectedArticleIndex]?.authors?.[0]?.name &&
                    articles[selectedArticleIndex]?.source?.title
                      ? ' · '
                      : ''}
                    {`${articles[selectedArticleIndex]?.source?.title ?? ''}`}
                  </div>
                  <div>
                    {formatDate(articles[selectedArticleIndex]?.dateTime ?? '')}
                  </div>
                </small>
                <hr className='mt-1 mb-4' />
                <p className='text-sm text-gray-300 whitespace-pre-line mb-12'>
                  {articles[selectedArticleIndex]?.body ?? ''}
                </p>
              </div>
            ) : (
              <textarea
                className={`w-full h-full text-sm p-4 shadow-sm rounded-md dark:ring-0 outline-none bg-custom-300 scrollbar-stylize placeholder:text-gray-300 resize-none`}
                placeholder='Enter your script here...'
                value={
                  selectedArticleIndex !== -1 && !isTextAreaEditable
                    ? ''
                    : selectedValue
                }
                onChange={(e) => handleTextChange(e)}
                // readOnly={!isTextAreaEditable}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
// className='border rounded-md p-2 focus:outline-none focus:border-blue-400 w-full'
// className='flex items-center justify-center bg-blue-500 text-white rounded-md p-2 shadow hover:bg-blue-600 w-36 mb-4'

function LoadingNews() {
  return (
    <div className='flex flex-col justify-center overflow-hidden px-4'>
      <div className='bg-custom-300  w-full py-2 rounded-lg snap-start scroll-mt-6 cursor-pointer transition-all duration-150 ease-out mb-2'>
        <div className='h-44  w-full flex animate-pulse'>
          <div className=' w-full mx-3 flex flex-col justify-between'>
            <div className='max-h-36 w-full flex flex-col'>
              <div className='mb-2 h-5 w-full bg-custom-400 rounded-full'></div>
              <div className='mb-2 h-5 w-2/3 bg-custom-400 rounded-full'></div>
              <div className='mb-2 h-3 w-full bg-custom-400 rounded-full'></div>
              <div className='mb-2 h-3 w-full bg-custom-400 rounded-full'></div>
              <div className='mb-2 h-3 w-full bg-custom-400 rounded-full'></div>
              <div className='mb-2 h-3 w-2/5 bg-custom-400 rounded-full'></div>
            </div>

            <small className='flex justify-between text-gray-300 '>
              <div className='mb-2 h-3 w-1/3 bg-custom-400 rounded-full'></div>
              <div className='mb-2 h-3 w-1/5 bg-custom-400 rounded-full'></div>
            </small>
          </div>
          <div className='aspect-square object-cover h-full rounded-lg mr-3 bg-custom-400'></div>
        </div>
      </div>

      <div className='bg-custom-300  w-full py-2 rounded-lg snap-start scroll-mt-6 cursor-pointer transition-all duration-150 ease-out my-4'>
        <div className='h-44  w-full flex animate-pulse'>
          <div className=' w-full mx-3 flex flex-col justify-between'>
            <div className='max-h-36 w-full flex flex-col'>
              <div className='mb-2 h-5 w-full bg-custom-400 rounded-full'></div>
              <div className='mb-2 h-5 w-1/3 bg-custom-400 rounded-full'></div>
              <div className='mb-2 h-3 w-full bg-custom-400 rounded-full'></div>
              <div className='mb-2 h-3 w-full bg-custom-400 rounded-full'></div>
              <div className='mb-2 h-3 w-full bg-custom-400 rounded-full'></div>
              <div className='mb-2 h-3 w-3/5 bg-custom-400 rounded-full'></div>
            </div>

            <small className='flex justify-between text-gray-300 '>
              <div className='mb-2 h-3 w-1/4 bg-custom-400 rounded-full'></div>
              <div className='mb-2 h-3 w-2/5 bg-custom-400 rounded-full'></div>
            </small>
          </div>
          <div className='aspect-square object-cover h-full rounded-lg mr-3 bg-custom-400'></div>
        </div>
      </div>

      <div className='bg-custom-300  w-full py-2 rounded-lg snap-start scroll-mt-6 cursor-pointer transition-all duration-150 ease-out mb-2'>
        <div className='h-44  w-full flex animate-pulse'>
          <div className=' w-full mx-3 flex flex-col justify-between'>
            <div className='max-h-36 w-full flex flex-col'>
              <div className='mb-2 h-5 w-full bg-custom-400 rounded-full'></div>
              <div className='mb-2 h-5 w-2/3 bg-custom-400 rounded-full'></div>
              <div className='mb-2 h-3 w-full bg-custom-400 rounded-full'></div>
              <div className='mb-2 h-3 w-full bg-custom-400 rounded-full'></div>
              <div className='mb-2 h-3 w-full bg-custom-400 rounded-full'></div>
              <div className='mb-2 h-3 w-2/5 bg-custom-400 rounded-full'></div>
            </div>

            <small className='flex justify-between text-gray-300 '>
              <div className='mb-2 h-3 w-1/3 bg-custom-400 rounded-full'></div>
              <div className='mb-2 h-3 w-1/5 bg-custom-400 rounded-full'></div>
            </small>
          </div>
          <div className='aspect-square object-cover h-full rounded-lg mr-3 bg-custom-400'></div>
        </div>
      </div>

      <div className='bg-custom-300  w-full py-2 rounded-lg snap-start scroll-mt-6 cursor-pointer transition-all duration-150 ease-out my-4'>
        <div className='h-44  w-full flex animate-pulse'>
          <div className=' w-full mx-3 flex flex-col justify-between'>
            <div className='max-h-36 w-full flex flex-col'>
              <div className='mb-2 h-5 w-full bg-custom-400 rounded-full'></div>
              <div className='mb-2 h-5 w-1/3 bg-custom-400 rounded-full'></div>
              <div className='mb-2 h-3 w-full bg-custom-400 rounded-full'></div>
              <div className='mb-2 h-3 w-full bg-custom-400 rounded-full'></div>
              <div className='mb-2 h-3 w-full bg-custom-400 rounded-full'></div>
              <div className='mb-2 h-3 w-3/5 bg-custom-400 rounded-full'></div>
            </div>

            <small className='flex justify-between text-gray-300 '>
              <div className='mb-2 h-3 w-1/4 bg-custom-400 rounded-full'></div>
              <div className='mb-2 h-3 w-2/5 bg-custom-400 rounded-full'></div>
            </small>
          </div>
          <div className='aspect-square object-cover h-full rounded-lg mr-3 bg-custom-400'></div>
        </div>
      </div>

      <div className='bg-custom-300  w-full py-2 rounded-lg snap-start scroll-mt-6 cursor-pointer transition-all duration-150 ease-out mb-2'>
        <div className='h-44  w-full flex animate-pulse'>
          <div className=' w-full mx-3 flex flex-col justify-between'>
            <div className='max-h-36 w-full flex flex-col'>
              <div className='mb-2 h-5 w-full bg-custom-400 rounded-full'></div>
              <div className='mb-2 h-5 w-2/3 bg-custom-400 rounded-full'></div>
              <div className='mb-2 h-3 w-full bg-custom-400 rounded-full'></div>
              <div className='mb-2 h-3 w-full bg-custom-400 rounded-full'></div>
              <div className='mb-2 h-3 w-full bg-custom-400 rounded-full'></div>
              <div className='mb-2 h-3 w-2/5 bg-custom-400 rounded-full'></div>
            </div>

            <small className='flex justify-between text-gray-300 '>
              <div className='mb-2 h-3 w-1/3 bg-custom-400 rounded-full'></div>
              <div className='mb-2 h-3 w-1/5 bg-custom-400 rounded-full'></div>
            </small>
          </div>
          <div className='aspect-square object-cover h-full rounded-lg mr-3 bg-custom-400'></div>
        </div>
      </div>

      <div className='bg-custom-300  w-full py-2 rounded-lg snap-start scroll-mt-6 cursor-pointer transition-all duration-150 ease-out my-4'>
        <div className='h-44  w-full flex animate-pulse'>
          <div className=' w-full mx-3 flex flex-col justify-between'>
            <div className='max-h-36 w-full flex flex-col'>
              <div className='mb-2 h-5 w-full bg-custom-400 rounded-full'></div>
              <div className='mb-2 h-5 w-1/3 bg-custom-400 rounded-full'></div>
              <div className='mb-2 h-3 w-full bg-custom-400 rounded-full'></div>
              <div className='mb-2 h-3 w-full bg-custom-400 rounded-full'></div>
              <div className='mb-2 h-3 w-full bg-custom-400 rounded-full'></div>
              <div className='mb-2 h-3 w-3/5 bg-custom-400 rounded-full'></div>
            </div>

            <small className='flex justify-between text-gray-300 '>
              <div className='mb-2 h-3 w-1/4 bg-custom-400 rounded-full'></div>
              <div className='mb-2 h-3 w-2/5 bg-custom-400 rounded-full'></div>
            </small>
          </div>
          <div className='aspect-square object-cover h-full rounded-lg mr-3 bg-custom-400'></div>
        </div>
      </div>

      <div className='h-6 sticky bottom-0 bg-gradient-to-t from-custom-100'></div>
    </div>
  );
}
