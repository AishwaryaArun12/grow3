import { ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline';
import React, { useEffect, useState } from 'react'

const ReportConfirm = ( {updatePost,close}) => {
    const reasons = ["It's spam",'Hate speach or symbols','Violence or dangerous organization','Sale of illeagal or regulated goods',
    'Nudity or sexual activity','Suicide or self injury']
    const [toast, setToast] = useState();
    useEffect(()=>{
        setTimeout(() => {
            setToast();
            close();
        }, 6000);
    },[toast])
    const report = (index)=>{
        updatePost(reasons[index]).then(res=>{
            if(res == 'Reported already'){
                setToast((<div id="toast-simple" class="flex items-center w-full max-w-md p-4 space-x-4 rtl:space-x-reverse text-gray-500 bg-white divide-x rtl:divide-x-reverse divide-gray-200 rounded-lg shadow dark:text-gray-400 dark:divide-gray-700 space-x dark:bg-gray-800" role="alert">
           <svg class="w-5 h-5 text-red-600 dark:text-blue-500 rotate-45" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
               <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m9 17 8 2L9 1 1 19l8-2Zm0 0V9"/>
           </svg>
           <div class="ps-4 text-base font-normal">You already reported this post.</div>
       </div>)); 
            }else{
                setToast((<div id="toast-simple" class="flex items-center w-full max-w-md p-4 space-x-4 rtl:space-x-reverse text-gray-500 bg-white divide-x rtl:divide-x-reverse divide-gray-200 rounded-lg shadow dark:text-gray-400 dark:divide-gray-700 space-x dark:bg-gray-800" role="alert">
           <svg class="w-5 h-5 text-red-600 dark:text-blue-500 rotate-45" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
               <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m9 17 8 2L9 1 1 19l8-2Zm0 0V9"/>
           </svg>
           <div class="ps-4 text-base font-normal">Reported the Post successfully.</div>
       </div>)); 
            }
        }).catch(err=>{console.log(err)})
        
    }
  return (
    <div>
      <h3 className=' font-bold text-lg m-2 p-2'>Why are you reporting this post?</h3>
      <hr/>
      <div>
        {toast && <p>{toast}</p>}
        {reasons.map((i,index)=>{
           return (<div className='flex justify-between hover:bg-gray-200' onClick={()=>{report(index)}}>
            <p className='m-2 p-2 mr-auto'>{i}</p>
            <svg className="m-2 mt-4 h-4 w-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path
            fillRule="evenodd"
            d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
            <hr/>
            </div>)
        })}
      </div>
    </div>
  )
}

export default ReportConfirm
