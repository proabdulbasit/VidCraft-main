import React from 'react'

export default function CarouselLayout({
    children, // will be a page or nested layout
  }) {
    return (
      <section className="px-200">
        {children}
      </section>
    )
  }