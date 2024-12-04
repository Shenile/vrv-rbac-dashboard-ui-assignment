import React from 'react';

function LandingPage() {
  return (
    <div className='h-full flex flex-col lg:flex-row gap-12 justify-center items-center p-4'>
      <div className='text-center lg:text-left'>
        <h1 className='text-3xl sm:text-4xl lg:text-5xl lg:w-[500px] font-bold text-gray-900 dark:text-gray-100'>
          College Event Management System
        </h1>
        
        <p className='text-sm sm:text-base lg:text-lg text-gray-700 dark:text-gray-500 mt-4'>
          A seamless platform to organize, manage, and track college events effortlessly.
        </p>
      </div>
      
      <img 
        src="/Main_Thumbnail.jpeg" 
        alt="Event Management" 
        className='w-full sm:w-[400px] lg:w-[500px] rounded-lg shadow-lg mt-6 lg:mt-0'
      />
    </div>
  );
}

export default LandingPage;
