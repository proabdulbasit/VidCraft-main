'use client';

import React, { useContext, useEffect, useState } from 'react';
import { Card, Row, Grid, Text, Button, Loading } from '@nextui-org/react';
import { FiVideo } from 'react-icons/fi';
import axios from 'axios';
import supabase from '@/services/supabase/client';
import VideoPlayer from '../videoPlayer/VideoPlayer';
import { VideoDataContext } from '@/providers/VideoDataProvider';
import { SubscriptionContext } from '@/providers/SubscriptionProvider';
import { postData } from '@/utils/helpers';
import { wordsPerMinute } from '@/common/videoprops';

const VideoProcessingSteps = {
  step1: 'Creating Video 1',
  step2: '1st video created',
  step3: 'You are getting closer to get final video',
  step4: 'Final Video Created',
  step5: 'You are getting closer to get final video',
  step6: 'Merging Completed',
};

export default function Finalise() {
  const [loading, setLoading] = useState(false);
  const [videoId, setVideoId] = useState();
  // '06f51250-72f6-42bb-a923-9db7960db4ac'

  const [videoURL, setVideoURL] = useState();

  const [secondVideoUrl, setSecondVideoUrl] = useState('');

  const [finalVideoUrl, setFinalVideoUrl] = useState('');

  const [videoProcessingStep, setVideoProcessingStep] = useState(null);

  const [intervalIds, setIntervalIds] = useState([]);
  // 'https://synthesia-ttv-data.s3.amazonaws.com/video_data/06f51250-72f6-42bb-a923-9db7960db4ac/transfers/rendered_video.mp4?response-content-disposition=attachment%3Bfilename%3D%22Synthesia%20video%20-%2006f51250-72f6-42bb-a923-9db7960db4ac.mp4%22&AWSAccessKeyId=ASIA32NGJ5TSTNBU742M&Signature=WB8%2F3B3LsEz5cAztlwH47gY6Z5Q%3D&x-amz-security-token=IQoJb3JpZ2luX2VjELb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCWV1LXdlc3QtMSJHMEUCIDmYjNcBHwTSLcJvnMdracc6Df1%2B1WVxEaPKtqJBSLr9AiEAvP0YfR1zAKm11eMY49W%2FuYz5q20gikd646qhvJu8K50qjQMIXxADGgw4MTI2MzQ0Njc1NTciDCwhtZHYmHPsG6xnUirqAvQOz9tYPx5M31lfO49URqr%2Bq8fOuoUeG0HIKoy1m9u%2BsqXbZJhqIhUI5HSWcUlGKjPg5IkTC5b%2BD3ahH%2F10Ifi8mpH%2Btc2pmMR4njwrmHVUuQBfLZytpxqzqqTu9cNz4YfA4is6isI6XyYOPhvFHQmT%2FRmDoPHTtw4OtIPcIyeJPshZlZyTjtbInPTSPII%2F9%2ByBXUSVEtW65IUbj6PkCj1F83UcTPfIEeZm1aLlC9lfFJ8fVcx5GOcQuqtSklV4IYu%2BhuQZNlBxH8dGjas67tEiQHjAURi5UgWrsUlW1vRR3GL3Z0oZGsiKKAM6Us1H0XWTQGR%2BqKsh41hQV%2B8Bp0B%2BogFNA78KkYWk9EBNfBG%2BpIj9eqsiK%2Ft5kpEljLiVwEaJE6F1bsdsCcogrUh4nvIlHzE6D4L7d8smIY1FDnsYCqUs0x6AnruLpWaAiCMUCZKEoVzl7Idk%2B%2FnOxTatWBtfF1OG9ztEDQXxMJ%2FBvqYGOp0BUty7RGzsK9QLIkNiKSfEW6r%2BvFpnZNyDH6r74sIkqeqT0E1h8aO5PDBjKJJu4zZ57NKtzC2ciZ0ZLHnoCTaGQ%2BL9F0aekqKLUCXbqrDDHUzsIRACjhfwB49t%2BnPYAje8lE%2FwKRFXHpx3AG8a8cYwzW1rlxRsDyrMsvrO3bGD%2BoH2cTJXb2uihtLiQJE2irAf74LnvnblMq7Ju9KC%2BQ%3D%3D&Expires=1691350700'

  const videoData = useContext(VideoDataContext);

  const subscriptionData = useContext(SubscriptionContext);

  const list = [
    {
      title: 'Video 1',
      link: '',
    },
    {
      title: 'Video 2',
      link: '',
    },
    {
      title: 'Video 3',
      link: '',
    },
    {
      title: 'Video 4',
      link: '',
    },
    {
      title: 'Video 5',
      link: '',
    },
    {
      title: 'Video 6',
      link: '',
    },
  ];

  useEffect(() => {
    startFirstVideoGeneration();
    // updateUsage();
  }, []);

  const startNextVideoGeneration = () => {
    console.log('download', videoURL);
    // const downloadLink = document.createElement('a');
    // downloadLink.href = videoURL;
    // downloadLink.target = '_blank';
    // downloadLink.download = `Synthesia_video_${videoId}.mp4`; // Specify the download filename
    // downloadLink.click();
    const storedSession = sessionStorage.getItem('selection');
    const storedData = JSON.parse(storedSession);
    generateTvContent(videoData.selectedScript, videoURL);
    setVideoProcessingStep(VideoProcessingSteps.step3);
    if (intervalIds.length > 0) {
      for (let i = 0; i < intervalIds.length; i++) {
        clearInterval(intervalIds[i]);
      }
    }
    setLoading(true);
  };

  const downloadFinalVideo = () => {
    console.log('download', finalVideoUrl);
    const downloadLink = document.createElement('a');
    downloadLink.href = finalVideoUrl;
    downloadLink.target = '_blank';
    downloadLink.download = `mediacraft_video_${videoId}.mp4`; // Specify the download filename
    downloadLink.click();
  };

  const testVideoMerge = () => {
    const selectedTv = sessionStorage.getItem('selectedTv');
    axios
      .post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/merge_videos`, {
        // overlayVideo: overlayVideo,
        // mainVidUrl: mainVidUrl,
        selectedTv: selectedTv,
      })
      .then((mergeRes) => {
        console.log(mergeRes);
      });
  };

  const startFirstVideoGeneration = () => {
    const storedSession = sessionStorage.getItem('selection');
    const storedData = JSON.parse(storedSession);
    console.log('storedData', storedData);
    setVideoProcessingStep(VideoProcessingSteps.step1);
    setLoading(true);
    generateVideo(storedData);
  };

  const saveVideoURL = async (url) => {
    let userId = sessionStorage.getItem('UID');

    console.log('user id', userId);
    console.log('url', url);

    // save url to supabase
    const { data, error } = await supabase
      .from('generatedVideos')
      .insert([{ user_id: userId, url: url }])
      .select();

    if (error) {
      console.log('error', error);
    } else {
      console.log('Saved in DB: ', data);
    }
  };

  const generateVideo = async (storedData) => {
    // Create the payload for Synthesia API request
    const synthesiaPayload = {
      input: [
        {
          scriptText: videoData.selectedScript, // Use the article content as the script text
          avatar: videoData.selectedAvatar,
          background: videoData.selectedBackground,
          avatarSettings: {
            voice: videoData.selectedVoice,
            horizontalAlign: 'left',
            scale: 0.6,
            style: 'rectangular',
          },
        },
      ],
    };

    // Make a POST request to Synthesia API
    const synthesiaResponse = await axios.post(
      'https://api.synthesia.io/v2/videos',
      synthesiaPayload,
      {
        headers: {
          Authorization: process.env.NEXT_PUBLIC_SYNTHESIA_KEY,
          'Content-Type': 'application/json',
        },
      }
    );

    // Extract the video ID from the Synthesia API response
    const videoId = synthesiaResponse.data.id;

    console.log('Video generated:', videoId);

    // save vid id in state
    setVideoId(videoId);

    const storedSession = sessionStorage.getItem('selection');
    const parsedSession = JSON.parse(storedSession);

    parsedSession.videoId = { id: videoId };

    // save again
    const dataString = JSON.stringify(parsedSession);
    sessionStorage.setItem('selection', dataString);
    const intervalId = setInterval(checkVideoStatus, 60000 * 2); // 1 minute in milliseconds
    setIntervalIds([...intervalIds, intervalId]);
  };

  // runs every 1 min
  const checkVideoStatus = async () => {
    const storedSession = sessionStorage.getItem('selection');
    const parsedSession = JSON.parse(storedSession);

    let id = parsedSession.videoId?.id;

    console.log('Running every 2 minutes...', id);
    if (id) {
      const url = `https://api.synthesia.io/v2/videos/${id}`;
      const headers = new Headers({
        Authorization: process.env.NEXT_PUBLIC_SYNTHESIA_KEY,
        'Content-Type': 'application/json',
      });

      try {
        const response = await fetch(url, {
          method: 'GET',
          headers: headers,
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const synthesiaResponse = await response.json();
        console.log('synthesiaResponse', synthesiaResponse);
        if (synthesiaResponse.download) {
          console.log('video is available');
          setVideoURL(synthesiaResponse.download);
          updateUsage();
          if (!subscriptionData.packageLimits.imageGenOnTv) {
            setFinalVideoUrl(synthesiaResponse.download);
          }
          setVideoProcessingStep(VideoProcessingSteps.step2);
          // saveVideoURL(synthesiaResponse.download);
          setLoading(false);
          for (let i = 0; i < intervalIds.length; i++) {
            clearInterval(intervalIds[i]);
          }
        }
        // Handle synthesiaResponse data here
      } catch (error) {
        console.error('Error fetching data from Synthesia:', error);
      }
    }
  };

  function estimateVideoLength(text) {
    // Split the text into words
    const words = text.split(/\s+/);

    // Calculate the estimated time in minutes
    const estimatedMinutes = words.length / wordsPerMinute;

    // Convert minutes to seconds
    const estimatedSeconds = estimatedMinutes * 60;
    console.log('estimatedSeconds', estimatedSeconds);
    return estimatedSeconds;
  }

  const updateUsage = async () => {
    let userId = sessionStorage.getItem('UID');
    const estimatedVideoLength = estimateVideoLength(videoData.selectedScript);
    console.log('estimatedVideoLength', subscriptionData.subscription.usage);
    const updatedUsage =
      parseInt(estimatedVideoLength) +
      (subscriptionData.subscription.usage || 0);
    console.log('updatedUsage', updatedUsage);
    if (
      updatedUsage &&
      !(
        updatedUsage >
        parseInt(subscriptionData.packageLimits.time.split(' ')[0])
      )
    ) {
      // save url to supabase
      // const { data, error } = await supabase
      //   .from('subscriptionUsage')
      //   .update({
      //     subscription_id: subscriptionData.subscription.id,
      //     usage: updatedUsage,
      //   })
      //   .select();

      try {
        const res = await postData({
          url: '/api/update-usage',
          data: {
            subscriptionId: subscriptionData.subscription.id,
            usage: updatedUsage,
          },
        });
        console.log('res', res);
        subscriptionData.handleUpdateSubscription({
          ...subscriptionData.subscription,
          usage: updatedUsage,
        });
      } catch (error) {
        return alert(error?.message);
      }
    }
  };

  const generateTvContent = (text, mainVidUrl) => {
    const pictoryAccessToken = localStorage.getItem('pictoryAccessToken');
    const pictoryAccessTokenExpireTime = localStorage.getItem(
      'pictoryAccessTokenExpireTime'
    );
    const isTokenValid =
      parseInt(pictoryAccessTokenExpireTime) > new Date().getTime();
    if (!pictoryAccessToken || !isTokenValid) {
      axios
        .post('https://api.pictory.ai/pictoryapis/v1/oauth2/token', {
          client_id: process.env.NEXT_PUBLIC_PICTORY_CLIENT_ID,
          client_secret: process.env.NEXT_PUBLIC_PICTORY_CLIENT_SECRET,
        })
        .then((authRes) => {
          localStorage.setItem('pictoryAccessToken', authRes.data.access_token);
          const expireTime =
            new Date().getTime() + authRes.data.expires_in * 1000;
          localStorage.setItem('pictoryAccessTokenExpireTime', expireTime);
          requestTvContent(authRes.data.access_token, text, mainVidUrl);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      requestTvContent(pictoryAccessToken, text, mainVidUrl);
    }
  };

  const requestTvContent = (access_token, text, mainVidUrl) => {
    console.log('requestTvContent');
    setVideoProcessingStep(VideoProcessingSteps.step3);

    axios
      .post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/generate-pictory-video`,
        {
          access_token,
          text: text,
        }
      )
      .then((res) => {
        const overlayVideo = res.data.data.videoURL;
        const selectedTv = sessionStorage.getItem('selectedTv');
        setSecondVideoUrl(res.data.data.videoURL);
        setVideoProcessingStep(VideoProcessingSteps.step5);

        const endpointUrl = subscriptionData?.packageLimits.imageGenOnTv
          ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/merge_videos`
          : `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/merge-videos-without-tv`;

        axios
          .post(endpointUrl, {
            overlayVideo: overlayVideo,
            mainVidUrl: mainVidUrl,
            selectedTv: selectedTv,
          })
          .then((mergeRes) => {
            console.log(mergeRes);
            setVideoProcessingStep('');

            setFinalVideoUrl(
              'https://mnaguxyvcgwbzuykozfh.supabase.co/storage/v1/object/public/final_videos/' +
                mergeRes.data.data.path
            );
            saveVideoURL(
              'https://mnaguxyvcgwbzuykozfh.supabase.co/storage/v1/object/public/final_videos/' +
                mergeRes.data.data.path
            );
            setLoading(false);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className='mt-10 mb-10'>
      <div className='flex flex-col items-center'>
        {!loading && !finalVideoUrl && !videoURL && (
          <div className='flex flex-col items-center mb-6'>
            <button
              className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
              onClick={() => startFirstVideoGeneration()}
            >
              Process First Video
            </button>
          </div>
        )}

        {!loading &&
          !finalVideoUrl &&
          videoURL &&
          subscriptionData.packageLimits.imageGenOnTv && (
            <div className='flex flex-col items-center mb-6'>
              <button
                className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                onClick={() => startNextVideoGeneration()}
              >
                Continue processing TV set
              </button>
            </div>
          )}
        {loading ? (
          <div className='flex flex-col items-center mb-6'>
            <div className='mb-10 text-white text-xl'>
              {videoProcessingStep}
            </div>
            {videoProcessingStep && <Loading className='-mt-6' />}
          </div>
        ) : (
          <div className='flex flex-col justify-center items-center mb-5'>
            {finalVideoUrl && (
              <Text size={24} b css={{ marginBottom: '40px' }} className='mr-6'>
                Your Video is Ready!
              </Text>
            )}
            <div>{finalVideoUrl && <VideoPlayer url={finalVideoUrl} />}</div>
            {finalVideoUrl && (
              <button
                className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 w-fit mt-3 rounded'
                onClick={() => downloadFinalVideo()}
              >
                Download Video
              </button>
            )}
          </div>
        )}

        {/* <button onClick={() => testVideoMerge()}>Test Merge</button> */}
      </div>
    </div>
  );
}
