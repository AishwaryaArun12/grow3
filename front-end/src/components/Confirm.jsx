import React from 'react'
import { Button, Card } from 'flowbite-react';

const Confirm = ({close,updatePost,confirmation,user}) => {
       
  return (
    <Card >
      <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
      {confirmation}
      </h5>
      
      <div className='flex justify-around mt-4'>
      <Button  className='bg-red-700 hover:bg-red-600' onClick={close}>
        Cancel
      </Button>
      <div onClick={close}>
      <Button className='bg-blue-900 hover:bg-blue-400' onClick={()=>{console.log(user),updatePost(user)}}>
        Remove
      </Button>
      </div>
      </div>
    </Card>
   
  )
}

export default Confirm
