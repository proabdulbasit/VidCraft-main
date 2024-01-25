'use client';

import Navbar from '@/components/navbar/Navbar';

export default function PagesLayout({
  children, // will be a page or nested layout
}) {
  return (
    <section className='flex-1 flex flex-col min-h-screen'>
      <Navbar />
      <div className='bg-custom-100 text-white flex-1 flex flex-col overflow-hidden'>
        {children}
      </div>
    </section>
  );
}
