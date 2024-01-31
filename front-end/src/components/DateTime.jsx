import React,{useEffect} from 'react'
import {
    Datetimepicker,
    Input,
    initTE,
  } from "tw-elements";
  initTE({ Datetimepicker, Input });

const DateTime = ({label,set,dateTime,form,reg}) => {
    useEffect(()=>{
        const pickerDateOptions = document.querySelector(`#${label}`);
        const date = new Datetimepicker(pickerDateOptions, {
          datepicker: { format: 'dd-mm-yyyy'},
        });
        if(dateTime){
            const arr = dateTime?.split(',');
            date._dateValue = arr[0];
            date._timeValue = arr[1];
        }
        set(date);
    },[])
    
  return (
    <div
    className="relative -mb-1 col-span-3"
    data-te-input-wrapper-init
    data-te-disable-past="true"
    id={label}>
        <label
        for="form7"
        className="block text-sm font-medium leading-6 text-gray-900"
        >{label}</label>
        {label == 'Start' ? 
        <input
        {...reg('startTime')}
        type="text"
        className="peer block min-h-[auto] w-full rounded border border-gray-300 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
        id="form7"  /> : 
        <input
        {...reg('endTime')}
        type="text"
        className="peer block min-h-[auto] w-full rounded border border-gray-300 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
        id="form7"  /> }
    
        
    </div>
  )
}

export default DateTime
