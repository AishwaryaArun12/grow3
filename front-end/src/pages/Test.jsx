import React, { useState } from 'react'

const Test = () => {
    const [text,setText] = useState('Please Login');
    const [button,setButton] = useState('Login');
    const [flag ,setFlag] = useState(true);
    const handleClick = ()=>{
        if(flag){
            setText('Welcome');
            setButton('Logout');
            setFlag(false);
        }else{
            setText('Please Login');
            setButton('Login');
            setFlag(true);
        }
    }
  return (
    <div>
        <p>{text}</p>
        <button onClick={handleClick}>{button}</button>
      
    </div>
  )
}

export default Test
