import React, { useEffect, useState } from 'react'
import SideBar from '../components/SideBar'
import { Flowbite } from 'flowbite-react'
import { Table } from 'flowbite-react';
import Modal from '../components/Modal'
import SubscriptionForm from '../components/SubscriptionForm';
import AddFeatureForm from '../components/AddFeatureForm';
import axios from '../axiosConfig'
import { FaPlus, FaMinus, FaEdit , FaCheck} from 'react-icons/fa';
import Confirm from '../components/Confirm';

const Subscription = () => {
    const [subscription,setSubscription] = useState([]);
    const [id,setId] = useState();
    async function getData(){
        axios.get('/subscription/get_subscriptions').then(res=>{
            setSubscription(res.data.result);
        })
    }
    useEffect(()=>{
        getData();
    },[])
    const remove =async ()=>{
        try {
          await axios.delete(`/subscription/delete/${id}`)
          getData();
        } catch (error) {
            console.log(error);
        }
    }
    
  return (
    <div>
       <Flowbite>
  <div className='sm:block lg:flex h-screen dark:bg-gradient-to-br from-zinc-900 via-gray-700 to-zinc-900'>
    <div>
    <SideBar/>
   
    </div>
    <div className="overflow-x-auto scrollNone lg:m-16">
       <div className='flex justify-between'>
       <div className='m-4 text-lg flex'>
            <FaPlus className='dark:text-gray-300'/><Modal button={'Add Subscription'} updatePost={getData} title={'Create new Subscription'} body={SubscriptionForm}/>
        </div>
        <div className='m-4 text-lg flex'>
            <FaPlus className='dark:text-gray-300'/><Modal button={'Add Feature'} title={'Add New Feature'} body={AddFeatureForm}/>
        </div>
       </div>
      <Table hoverable>
        <Table.Head>
          <Table.HeadCell>No.</Table.HeadCell>
          <Table.HeadCell>Subscription name</Table.HeadCell>
          <Table.HeadCell>Duration</Table.HeadCell>
          <Table.HeadCell>Features</Table.HeadCell>
          <Table.HeadCell>Fees</Table.HeadCell>
          <Table.HeadCell>
            <span className="sr-only">Edit</span>
          </Table.HeadCell>
          <Table.HeadCell>
            <span className="sr-only">Delete</span>
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {subscription.map((subscription,i)=>
          
            <Table.Row key={i} className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
              {i+1}
            </Table.Cell>
            <Table.Cell>{subscription.name}</Table.Cell>
            <Table.Cell>{subscription.duration + ' ' + subscription.durationIn}</Table.Cell>
            <Table.Cell><ul>{subscription?.features?.map(i=>(<li className=' flex'><FaCheck className='m-1'/>{i}</li>))}</ul></Table.Cell>
            <Table.Cell>{subscription.fees }</Table.Cell>
            <Table.Cell>
                <Modal  updatePost={getData} title={'Edit Subscription'} body={SubscriptionForm} user={subscription}
                button={(<FaEdit onClick={()=>{setId(subscription._id)}} className="font-medium text-cyan-600 hover:underline dark:text-cyan-500" size={24} />)}/>  
            </Table.Cell>
            <Table.Cell>
            <Modal updatePost={remove} button={(<FaMinus onClick={()=>{setId(subscription._id)}} className="font-medium text-cyan-600 hover:underline dark:text-cyan-500" size={24} />)} confirmation='Are you sure you want to delete this subscription ?' body={Confirm}/>
                 
             
            </Table.Cell>
          </Table.Row>
          )}
         
        </Table.Body>
      </Table>
    </div>
  </div>
   </Flowbite>
    </div>
  )
}

export default Subscription
