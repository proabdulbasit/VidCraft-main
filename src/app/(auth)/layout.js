"use client";


export default function AuthLayout({
    children, // will be a page or nested layout
  }) {
    return (
      <section className="px-">
        <nav></nav>
   
        {children}
      </section>
    )
  }