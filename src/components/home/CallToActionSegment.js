import React from 'react'

export default function CallToActionSegment() {
  return (
    <section className="relative w-full mt-16">
      <div>
        <div className="absolute rounded-xl  py-8 sm:py-14 px-6 sm:px-12 lg:px-16 w-full flex flex-col sm:flex-row justify-between items-center z-10 bg-white-500">
          <div className="flex flex-col text-left w-10/12 sm:w-7/12 lg:w-5/12 mb-6 sm:mb-0">
            <h5 className="text-black-600 text-xl sm:text-2xl lg:text-3xl leading-relaxed font-medium">Subscribe Now for <br></br> Get Special Features!</h5>
            <p>Let's subscribe with us and find the fun.</p>
          </div>
          <button className="py-3 lg:py-4 px-12 lg:px-16 text-white-500 font-semibold rounded-xl text-white bg-violet-800 hover:shadow-orange-md transition-all outline-none undefined">Get Started</button>
        </div>
        <div className="absolute bg-black-600 opacity-5 w-11/12 roudned-lg h-60 sm:h-56 top-0 mt-8 mx-auto left-0 right-0">
        </div>
      </div>
    </section>
  )
}
