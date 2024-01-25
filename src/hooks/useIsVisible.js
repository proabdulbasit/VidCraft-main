import { useState, useEffect } from 'react';

const useIsVisible = (element, rootMargin) => {
    const [isVisible, setState] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if(entry.isIntersecting){
                    setState(true);
                }
            }, { rootMargin }
        );

        const currentElement = element.current;

        if (!currentElement) {
            console.error("IntersectionObserver: Element is null or undefined.");
            return;
        }

        observer.observe(currentElement);

        return () => {
            observer.unobserve(currentElement);
        };
    }, [element, rootMargin]);

    return isVisible;
};

export default useIsVisible;