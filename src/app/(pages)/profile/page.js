'use client';

import React, { useEffect, useState } from 'react';
import supabase from '@/services/supabase/client';
import { Card, Row, Grid, Text, Button, Loading } from '@nextui-org/react';
import { FiVideo } from 'react-icons/fi';
import { getSubscription } from '@/app/supabase-server';
import { getDescriptionObj } from '@/common/parseJsonObj';

export default function Profile() {
  const [videos, setVideos] = useState();

  const [userDetails, setUserDetails] = useState(null);
  const [subscription, setSubscription] = useState(null);

  const [session, setSession] = useState(null);

  const [user, setUser] = useState(null);

  const handleDownload = (video) => {
    console.log('download', video);
    const downloadLink = document.createElement('a');
    downloadLink.href = video.url;
    downloadLink.target = '_blank';
    downloadLink.download = `Synthesia_video_${video.id}.mp4`; // Specify the download filename
    downloadLink.click();
  };

  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('event', event);
        console.log('session', session);
        console.log('supabase.auth.user()', session?.user);
        if (!session) {
          return redirect('/login');
        }
        setSession(session);
        setUser(session?.user);
        getData(session?.user?.id);
      }
    );

    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  const getData = async (userId) => {
    // const userDetailsRes = await getUserDetails(userId);
    const sub = await getSubscription(userId);
    // setUserDetails(userDetailsRes);
    console.log(sub);
    setSubscription(sub);
  };

  const subscriptionPrice =
    subscription &&
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: subscription?.prices?.currency,
      minimumFractionDigits: 0,
    }).format((subscription?.prices?.unit_amount || 0) / 100);

  const getVideos = async (userId) => {
    const { data, error } = await supabase
      .from('generatedVideos')
      .select('*')
      .eq('user_id', userId)
      .order('id', { ascending: true });
    if (data) {
      console.log('videos', data);
      setVideos(data);
    }
  };

  useEffect(() => {
    let userId = sessionStorage.getItem('UID');
    // get generated videos from supabase table - filter by user id
    getVideos(userId);
  }, []);

  return (
    <div>
      <Text size={24} b css={{ marginBottom: '40px' }}>
        Profile
      </Text>
      <br></br>
      <div className='p-4'>
        <SubscriptionDetailsCard
          title='Your Plan'
          description={
            subscription
              ? `You are currently on the ${subscription?.prices?.products?.name} plan.`
              : 'You are not currently subscribed to any plan.'
          }
          footer={
            subscription ? (
              <div>
                Available seconds for this month:{' '}
                {parseInt(
                  getDescriptionObj(
                    subscription?.prices?.products?.description
                  ).time.split(' ')[0]
                ) - subscription?.usage}
                s
              </div>
            ) : (
              <div></div>
            )
          }
        >
          <div className='mt-8 mb-4 text-xl font-semibold'>
            {subscription ? (
              `${subscriptionPrice}/${subscription?.prices?.interval}`
            ) : (
              // <Link href="/">Choose your plan</Link>
              <div></div>
            )}
          </div>
        </SubscriptionDetailsCard>
      </div>

      <Text size={18} css={{ marginBottom: '30px', marginTop: '20px' }}>
        Your Videos
      </Text>
      {videos ? (
        <div className='flex flex-wrap justify-center'>
          {videos?.map((obj, i) => (
            <div
              key={obj.id}
              className={`w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 ${
                i === 0 ? 'ml-0' : 'ml-2 sm:ml-2 md:ml-2 lg:ml-2 xl:ml-2'
              }`}
            >
              <Card
                isPressable
                isHoverable
                css={{ w: '250px', marginBottom: '30px' }}
                onClick={() => handleSelect(i)}
                className='flex items-center justify-center'
              >
                <Card.Body css={{ paddingTop: '10px' }}>
                  <div className='flex items-center mb-2'>
                    <FiVideo className='mr-2 text-blue-600' />{' '}
                    <Text className='pl-4'>Mediacraft Video : {obj.id}</Text>
                  </div>

                  <Button
                    size='sm'
                    css={{ w: '50px', marginTop: '5px' }}
                    onClick={() => handleDownload(obj)}
                  >
                    Download
                  </Button>
                </Card.Body>

                <Card.Divider />
              </Card>
            </div>
          ))}
        </div>
      ) : (
        <div className='flex justify-center mt-30'>
          {' '}
          <div className='flex justify-center'>
            <div className='mx-auto text-center flex'>
              Currently, you have no videos
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function SubscriptionDetailsCard({ title, description, footer, children }) {
  return (
    <div className='w-full max-w-3xl m-auto my-8 border rounded-md p border-zinc-700'>
      <div className='px-5 py-4'>
        <h3 className='mb-1 text-2xl font-medium'>{title}</h3>
        <p className='text-zinc-300'>{description}</p>
        {children}
      </div>
      <div className='p-4 border-t rounded-b-md text-zinc-300 border-zinc-700 bg-zinc-900'>
        {footer}
      </div>
    </div>
  );
}
