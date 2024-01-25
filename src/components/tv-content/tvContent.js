'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { Dropdown, Card, Text, Button, Row, Loading } from '@nextui-org/react';
import supabase from '@/services/supabase/client';
import { AiOutlineSend } from 'react-icons/ai';
import axios from 'axios';

export default function TvContent() {
  const menuItems = [
    { key: 'social', name: 'Social' },
    { key: 'economy', name: 'Economy' },
    { key: 'technology', name: 'Technology' },
  ];

  const [selected, setSelected] = useState(new Set(['Social']));
  // const [selected, setSelected] = useState({ anchorKey: "Social", currentKey: "Social" });
  const selectedValue = useMemo(
    () => Array.from(selected).join(', ').replaceAll('_', ' '),
    [selected]
  );
  const [selectedArticleIndex, setSelectedArticleIndex] = useState(-1);
  const [articles, setArticles] = useState();
  const [textValue, setTextValue] = useState('');

  const handleTextChange = (event) => {
    setTextValue(event.target.value);
  };

  const handleButtonClick = () => {
    // Use the 'textValue' state here or perform any desired action
    setSession();
  };

  const getArticles = async (selected) => {
    // calling edge func
    console.log('running edge...', selected);
    const { data, error } = await supabase.functions.invoke('aylien', {
      body: { selected: selected },
    });

    if (data) {
      console.log('edge', data);
      setArticles(data.stories);
      console.log('articles', articles);
    }
  };

  useEffect(() => {
    checkSession();
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
        if (storedData.article.title === storedData.article.desc)
          setTextValue(storedData.article.desc);
      }
    }
  };

  useEffect(() => {
    console.log('change select', selectedValue);
    getArticles(selectedValue);
  }, [selected]);

  const setSession = (index) => {
    // set session
    const storedSession = sessionStorage.getItem('selection');
    let newSelection;
    if (storedSession) {
      console.log('session available', storedSession);
      const storedData = JSON.parse(storedSession);

      let articleObj;

      if (textValue) {
        articleObj = {
          title: textValue,
          desc: textValue,
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

      if (textValue) {
        newSelection = {
          article: {
            name: textValue,
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

  const generateTvContent = () => {
    const pictoryAccessToken = localStorage.getItem('pictoryAccessToken');
    const pictoryAccessTokenExpireTime = localStorage.getItem(
      'pictoryAccessTokenExpireTime'
    );
    console.log(pictoryAccessToken);
    console.log(parseInt(pictoryAccessTokenExpireTime), new Date().getTime());
    const isTokenValid =
      parseInt(pictoryAccessTokenExpireTime) > new Date().getTime();
    console.log(isTokenValid);
    if (!pictoryAccessToken || !isTokenValid) {
      axios
        .post('https://api.pictory.ai/pictoryapis/v1/oauth2/token', {
          client_id: process.env.NEXT_PUBLIC_PICTORY_CLIENT_ID,
          client_secret: process.env.NEXT_PUBLIC_PICTORY_CLIENT_SECRET,
        })
        .then((authRes) => {
          console.log(authRes.data);
          localStorage.setItem('pictoryAccessToken', authRes.data.access_token);
          const expireTime =
            new Date().getTime() + authRes.data.expires_in * 1000;
          localStorage.setItem('pictoryAccessTokenExpireTime', expireTime);
          // generateVideoPreviewFromText(authRes.data.access_token);
          requestTvContent(authRes.data.access_token);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      // generateVideoPreviewFromText(pictoryAccessToken);
      requestTvContent(pictoryAccessToken);
    }
  };

  const requestTvContent = (access_token) => {
    axios
      .post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/generate-pictory-video`,
        {
          access_token,
          text: textValue,
        }
      )
      .then((res) => {
        console.log(res);
        const overlayVideo = res.data.data.videoURL;
        axios
          .post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/merge_videos`, {
            overlayVideo: overlayVideo,
          })
          .then((mergeRes) => {
            console.log(mergeRes);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const testSelectedImage = () => {
    const storedSession = sessionStorage.getItem('selection');
    console.log(storedSession);
  };

  return (
    <div className='mx-20 mt-10'>
      <div className='flex flex-col items-center space-y-4 mx-auto max-w'>
        <textarea
          rows='4'
          placeholder='Enter your custom article here...'
          style={{
            minWidth: '500px',
            marginLeft: '5%',
            width: '90%',
            marginRight: '5%',
          }}
          className='border rounded-md p-2 focus:outline-none focus:border-blue-400 w-full'
          value={textValue}
          onChange={handleTextChange}
        ></textarea>
        <button
          className='flex items-center justify-center bg-blue-500 text-white rounded-md p-2 shadow hover:bg-blue-600 w-36 mb-4'
          onClick={testSelectedImage}
        >
          <AiOutlineSend className='mr-2' />
          Submit
        </button>
      </div>
    </div>
  );
}
