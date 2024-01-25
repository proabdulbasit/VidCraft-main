import React, { useEffect, useRef, useState } from 'react';
import TitleDescription from '@/components/home/TitleDescription'
import Content from '@/components/home/Content'
import useOnView from '@/hooks/useIsVisible';

const SegmentComponent = ({title, description, content}) => {
  const sectionRef = useRef();
  const isVisible = useOnView(sectionRef, "200px");

  return (
    <section className="max-w-screen-xl mt-8 mb-6 sm:mt-14 sm:mb-14 px-6 sm:px-8 lg:px-16 lg:mt-32 mx-auto" ref={sectionRef}>
      <div className="grid grid-flow-row sm:grid-flow-col grid-cols-1 sm:grid-cols-2 gap-8 py-8 my-12">
        <div>
          <TitleDescription title={title} description={description} isVisible={isVisible}>
            {title}
          </TitleDescription>
        </div>
        <div className="flex w-full justify-end">
          <Content isVisible={isVisible}>
            {content}
          </Content>
        </div>
      </div>
    </section>
  );
};

export default SegmentComponent;