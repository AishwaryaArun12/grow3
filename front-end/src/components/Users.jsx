import { Table } from 'flowbite-react';
import { useEffect, useState } from 'react';
import axios from '../axiosConfig';
import { HiBan, HiCheck } from 'react-icons/hi';

export default function Component() {

  const [value ,setValue] = useState()
  const [names,setNames ] = useState([]);

  const [users,setUsers] = useState([]);

  const getUsers = async ()=>{
      try {
         const res = await axios.get('/admin/getAllUsers')
         setUsers(res.data.users);
         setNames(res.data.users);
      } catch (error) {
          console.log(error,'error');
      }
  }
 useEffect(()=>{
  getUsers();
 },[])

 
    const handleChange = (e)=>{
      setValue(e.target.value);
     if(e.target.value == ''){
      setUsers(names);
     }else{
      const filterFunction = (user) => user.name.toLowerCase().startsWith(e.target.value.toLowerCase());
      const filteredUserData = names?.filter(filterFunction);
      setUsers(filteredUserData)
     }
    }
 
   async function block (id){
    try {
        await axios.get(`/admin/block/?id=${id}`)
        getUsers();
    } catch (error) {
        console.log(error);
    }
   }
   async function unblock (id){
    try {
        await axios.get(`/admin/unblock/?id=${id}`)
        getUsers();
    } catch (error) {
        console.log(error);
    }
   }
  return (
    <>
    <div  className='mx-20 w-52 z-50 m-3 lg:mt-10  relative'>
                  <input  value={value} onChange={handleChange}  placeholder='Find User....' className='h-10 dark:placeholder:text-gray-200 dark:bg-transparent  placeholder:text-gray-700 bg-gray:200 rounded-full  text-black dark:text-white w-full ml-1 p-2 shadow-md border-gray-500 border-2 ' />
                 
                </div>
    <div className="overflow-x-auto lg:mx-16 lg:mt-8 overflow-y-auto scrollNone h-[520px]">
      <Table hoverable >
        <Table.Head>
          <Table.HeadCell>No.</Table.HeadCell>
          <Table.HeadCell>User name</Table.HeadCell>
          <Table.HeadCell>Email</Table.HeadCell>
          <Table.HeadCell>Usertype</Table.HeadCell>
          <Table.HeadCell>status</Table.HeadCell>
          <Table.HeadCell>
            <span className="sr-only">Edit</span>
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {users.map((user,i)=>
          
            <Table.Row key={i} className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
              {i+1}
            </Table.Cell>
            <a href={`/admin/user/${user._id}`}><Table.Cell>{user.name}</Table.Cell></a>
            <Table.Cell>{user.email}</Table.Cell>
            <Table.Cell>{user.userType}</Table.Cell>
            <Table.Cell>{user.premium ? 'Premium' : 'Ordinary'}</Table.Cell>
            <Table.Cell>
                {user.active ?  <button onClick={()=>{block(user._id)} } className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                {<HiBan size={24} /> }
              </button> :  <button onClick={()=>{unblock(user._id)}} className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                {<HiCheck size={24}  /> }
              </button>}
             
            </Table.Cell>
          </Table.Row>
          )}
         
        </Table.Body>
      </Table>
    </div>
    </>
  );
}
