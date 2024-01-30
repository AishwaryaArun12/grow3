import React from 'react'
import { Button } from 'flowbite-react'
import Nav from '../components/Nav'

const NotFound = () => {
  return (
    <>
    <div className='h-16'>
        <Nav/>
    </div>
    <div class="flex justify-center min-h-screen bg-white py-24">
    <div class="flex flex-col">
       
        <div class="flex flex-col items-center">
            <div class="text-indigo-950 font-bold text-7xl">
                404
            </div>

            <div class="font-bold text-3xl xl:text-7xl lg:text-6xl md:text-5xl mt-10">
                This page does not exist
            </div>

            <div class="text-gray-400 font-medium text-sm md:text-xl lg:text-2xl mt-8">
                The page you are looking for could not be found.
            </div>
        </div>

        <a className='flex justify-center my-10' href="/"><Button className='bg-blue-950' >Go to home</Button></a>
        
    </div>
</div>
    </>
  )
}

export default NotFound
