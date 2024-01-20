import React from 'react'

const Msg = ({own,msg}) => {
    const createdAtDate = new Date(msg.createdAt);

    // Get the hours, minutes, and seconds
    let hours = createdAtDate.getHours();
    const minutes = createdAtDate.getMinutes();
    const seconds = createdAtDate.getSeconds();
    
    // Determine AM or PM
    const amOrPm = hours >= 12 ? "pm" : "am";
    
    // Convert to 12-hour format
    hours = hours % 12 || 12;
    
    // Format the time as a string
    const formattedTime = `${hours}:${minutes} ${amOrPm}`;

    if(own){

        return (
            <div className="col-start-8 col-end-13 p-3 rounded-lg">
            <div className="flex items-center justify-start ">
              <div className="flex items-center justify-center m-2 h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">A</div>
              <div className="relative mr-3 pr-16 text-sm bg-indigo-100 pb-6 py-2 px-4   shadow rounded-xl">
                <div>{msg.text}</div>
                <div className='absolute right-1 p-1 text-xs'>{formattedTime}</div>
                <div className="absolute text-xs bottom-0 right-0 -mb-5 mr-2 text-gray-500">Seen</div>
              </div>
            </div>
          </div>
        )
    }else{
        return(
            <div className={`col-start-1 col-end-10 p-3 rounded-lg`}>
            <div className="flex flex-row items-center">
            <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">A</div>
            <div className="relative ml-3 text-sm bg-white py-2 pb-6 px-4 pr-16 shadow rounded-xl">
                <div>{msg?.text}</div>
                <div className='absolute right-1 p-1 text-xs'>{formattedTime}</div>
            </div>
            </div>
        </div>
        )
    }
}

export default Msg
