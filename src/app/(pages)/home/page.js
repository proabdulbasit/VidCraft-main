"use client"
import React, { Suspense } from 'react'
import HeroSegment from '@/components/home/HeroSegment'
import UniqueSellingPointSegment from '@/components/home/UniqueSellingPointSegment'
import KeyFeaturesSegment from '@/components/home/KeyFeaturesSegment'
import HowToSegment from '@/components/home/HowToSegment'
import VoiceLibrarySegment from "@/components/home/VoiceLibrarySegment"
import BackgroundsSegment from '@/components/home/BackgroundsSegment'
import LoadingBackgroundsSegment from "@/components/home/loading/BackgroundsSegment"
import NewsSegment from '@/components/home/NewsSegment'
import SlideshowSegment from '@/components/home/SlideshowSegment'
import EthicsAndTrustSegment from '@/components/home/EthicsAndTrustSegment'
import CallToActionSegment from '@/components/home/CallToActionSegment'
import { BsSoundwave } from "react-icons/bs";
import { RiVoiceprintFill } from "react-icons/ri";


import { LuTimer } from "react-icons/lu";
import { CgWebsite } from "react-icons/cg";
export default function Home() {


  const toolDescription = {
    title: "Engage Audiences with AI-Enhanced Video Narration.",
    description: "Transform text into lifelike speech with our AI-powered avatars. Engage your audience with animated talking avatars that bring your content to life."
  }

  const sellingPoints = {
    sellingPoints: [{
      title: "No Need for Audio Recording",
      description: "Our service generates high-quality audio from text, eliminating the need for voice actors or dedicated recording equipment.",
      icon: <RiVoiceprintFill />
    }, {
      title: "Efficiency and Speed",
      description: "Our platform allows you to produce videos quickly and efficiently, saving you time and resources while maintaining high-quality results.",
      icon: <LuTimer />
    }, {
      title: "User-Friendly Interface",
      description: "Our user-friendly interface is designed to simplify your experience, making it accessible and intuitive for users of all skill levels.",
      icon: <CgWebsite />
    }]
  }

  const keyFeatures = {
    title: 'How can AI-generated virtual avatars help you engage your audience?',
    description: 'AI-generated virtual avatars revolutionize viewer engagement. They offer a personalized, interactive, and visually captivating experience that holds viewers\' attention. These avatars create a sense of connection and interaction, making content more memorable and enjoyable for the audience.',
    bulletPoints: [
      'Diverse Avatar Selection.',
      'Multilingual Capabilities.',
      'Natural Speech Patterns.',
      'Lifelike Expressions.',
    ],
    avatars: [
      '/assets/avatars/Alex.png',
      '/assets/avatars/Jack.png',
      '/assets/avatars/Natalie.png',
    ]
  }

  const news = {
    title: "24/7 News Content",
    description: "Our platform offers a up-to-date news content generation feature. We provide a constant stream of up-to-date news articles, ensuring your content remains fresh and relevant. This feature simplifies the process of integrating timely news into your videos, enhancing your content's value and relevance."
  }

  const voiceLibrary = {
    title: "Unlock the Power of Global Communication.",
    description: "Access a vast voice library with a wide range of profiles, languages, and accents to personalize your content. Our multilingual capabilities ensure your message reaches a global audience effortlessly.",
    voices: [
      {
        "id": 16,
        "created_at": "2023-08-08T16:56:48.964935+00:00",
        "updated_at": "2023-08-08T16:56:48.964935+00:00",
        "voice": {
          "id": "1364e02b-bdae-4d39-bc2d-6c4a34814968",
          "url": "./assets/voices/en-US-female.mp3",
          "name": "English [US] - Professional",
          "language": "English",
          "countryCode": "US",
          "mood": "Professional",
          "gender": "female",
        }
      },
      {
        "id": 10,
        "created_at": "2023-08-08T16:46:55.291269+00:00",
        "updated_at": "2023-08-08T16:46:55.291269+00:00",
        "voice": {
          "id": "3aa6b52d-d26f-41b5-9249-9901eb159831",
          "url": "./assets/voices/en-IN-female.mp3",
          "name": "English [IN] - Original",
          "language": "English",
          "countryCode": "IN",
          "mood": "Original",
          "gender": "female",
        }
      },
      {
        "id": 19,
        "created_at": "2023-09-10T08:23:04.930095+00:00",
        "updated_at": "2023-09-10T08:23:04.930095+00:00",
        "voice": {
          "id": "9ebb4661-3b6c-4761-a898-881993629f06",
          "url": "./assets/voices/en-AU-male.mp3",
          "name": "English [AU] - Natural (Male)",
          "language": "English",
          "countryCode": "AU",
          "mood": "Natural",
          "gender": "male"
        }
      },
      {
        "id": 3,
        "created_at": "2023-08-03T16:47:30+00:00",
        "updated_at": "2023-08-03T16:47:30+00:00",
        "voice": {
          "url": "./assets/voices/fr-CA-female.mp3",
          "name": "French [CA] - Natural",
          "language": "French",
          "countryCode": "CA",
          "mood": "Natural",
          "gender": "female",
          "id": "f70af44b-9505-4864-969e-e9b7a4c43389",
        }
      },
      {
        "id": 22,
        "created_at": "2023-09-10T08:29:53.808583+00:00",
        "updated_at": "2023-09-10T08:29:53.808583+00:00",
        "voice": {
          "id": "38e9bc95-46cc-4014-b220-839af2e11baf",
          "url": "./assets/voices/fr-FR-male.mp3",
          "name": "French [FR] - Natural (Male)",
          "language": "French",
          "countryCode": "FR",
          "mood": "Natural",
          "gender": "male"
        }
      },
      {
        "id": 4,
        "created_at": "2023-08-03T16:55:30+00:00",
        "updated_at": "2023-08-03T16:55:30+00:00",
        "voice": {
          "url": "./assets/voices/fr-CH-female.mp3",
          "name": "French [CH] - Natural",
          "language": "French",
          "countryCode": "CH",
          "mood": "Natural",
          "gender": "female",
          "id": "ebbe74d9-a01e-4f6b-9356-728d358bb3d8",
        }
      },
    ]
  }

  const backgrounds = {
    title: "4K Animated Backgrounds",
    description: "AI-generated virtual avatars revolutionize viewer engagement. They offer a personalized, interactive, and visually captivating experience that holds viewers' attention. These avatars create a sense of connection and interaction, making content more memorable and enjoyable for the audience.",
    host: "/assets/gif/Jason.gif",
    backgrounds: [
      {
        video: '/assets/videos/background1.mp4',
        thumbnail: '/assets/videos/background1-thumbnail.png'
      },
      {
        video: '/assets/videos/background2.mp4',
        thumbnail: '/assets/videos/background2-thumbnail.png'
      },
      {
        video: '/assets/videos/background3.mp4',
        thumbnail: '/assets/videos/background3-thumbnail.png'
      }
    ]
  }

  const slideshow = {
    title: "Transform Text into Stunning Slideshows Automatically.",
    description: "Enhance your videos with stunning 4K animated backgrounds. Elevate the visual quality of your content, making it more engaging and visually appealing.",
    background: "/assets/videos/background3.mp4",
    host: "/assets/gif/Jason.gif",
    slides: [
      '/assets/videos/background1.mp4',
      '/assets/videos/background2.mp4',
      '/assets/videos/background3.mp4'
    ]
  }

  const ethicsAndTrust = {
    title: "Leading the Way in Ethical Content Creation.",
    description: "We take ethical content creation seriously. Our internal screening process ensures responsible use of our technology. Rest assured that your content upholds ethical standards, and re-enacting someone without consent is impossible.",
    commitments: [{
      title: "Ethical Content",
      description: "We uphold ethical standards by ensuring that all content generated using AI avatars aligns with our content guidelines, preventing misuse or harmful applications."
    }, {
      title: "Consent and Privacy",
      description: "We prioritize user privacy and consent, respecting individual rights and ensuring that avatars are used only with proper authorization."
    }, {
      title: "Internal Screening",
      description: "All content undergoes rigorous internal screening processes to maintain ethical standards and to prevent any unauthorized or harmful content from being generated."
    }]
  }



  return (
    <main>

      <HeroSegment {...toolDescription} />
      <UniqueSellingPointSegment {...sellingPoints} />
      <KeyFeaturesSegment {...keyFeatures} />
      {/* <HowToSegment /> */}
      {/* <NewsSegment {...news} /> */}
      <VoiceLibrarySegment {...voiceLibrary} />
      <Suspense fallback={<LoadingBackgroundsSegment />}>
        <BackgroundsSegment {...backgrounds} />
      </Suspense>
      <SlideshowSegment {...slideshow} />
      <EthicsAndTrustSegment {...ethicsAndTrust} />
      <CallToActionSegment />
    </main>

  )
}
