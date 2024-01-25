import gsap, { Power3 } from "gsap";


export const staggerDelay = 0.2

export const titleAnimation = [
    {
        opacity: 0,
        y: 40,
        transform: 'scale(0.95) skew(10deg)',
    },
    {
        opacity: 1,
        y: 0,
        transform: 'scale(1) skew(0deg)',
        duration: 0.5,
        ease: Power3.easeOut,
    }
]


export const descriptionAnimation = [
    {
        opacity: 0,
        y: 40,
        transform: 'scale(0.95) skew(10deg)',
    },
    {
        opacity: 1,
        y: 0,
        transform: 'scale(1) skew(0deg)',
        duration: 0.5,
        ease: Power3.easeOut,
    }
]

export const someAnimation = [
    {
        opacity: 0,
        y: 40,
        transform: 'scale(0.95) skew(10deg)',
    },
    {
        opacity: 1,
        y: 0,
        transform: 'scale(1) skew(0deg)',
        duration: 0.5,
        ease: Power3.easeOut,
    }
]