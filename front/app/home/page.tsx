import React from 'react'

const Home = () => {
  return (
    <div className='w-4/5 mx-auto mt-32'>
      <div className='w-1/2 ml-8 font-semibold min-w-[500px]'>
        <div className='flex items-end'>
          <p className='text-9xl'>Easy.</p>
          <div className='px-10 ml-12 h-12 flex justify-center items-center rounded-3xl text-xl bg-[#A7FA66]'>
            Use
          </div>
        </div>
        <div className='flex mt-6 items-end'>
          <p className='text-9xl'>Clean.</p> 
          <div className='px-10 ml-12 h-12 flex justify-center items-center rounded-3xl text-xl bg-[#FBF222]'>
            Move
          </div>
        </div>
        <div className='flex mt-6 items-end'>
          <p className='text-9xl'>Zero.</p>
          <div className='px-10 ml-12 h-12 flex justify-center items-center rounded-3xl text-xl bg-[#FC44DE]'>
            Fee
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home