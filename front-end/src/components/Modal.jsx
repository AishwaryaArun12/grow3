
'use client';

import { Modal } from 'flowbite-react';
import { useState } from 'react';

export default function Component({post,confirmation,button,title,updatePost, body : PostModalBody,profileIcon,user,userData}) {
  const [openModal, setOpenModal] = useState(false);

  function onCloseModal() {
    setOpenModal(false);
    
  }

  return (
    <>
      <div  onClick={() => setOpenModal(true)}>{button}</div>
      <Modal show={openModal} size="xl" onClose={onCloseModal} popup>
        <Modal.Header><div className='flex'>{profileIcon} <div className='m-2'>{title}</div></div></Modal.Header>
        <Modal.Body>
          <PostModalBody ePost={post} confirmation={confirmation} updatePost={updatePost} user={user} close={onCloseModal} userData={userData}/>
        </Modal.Body>
      </Modal>
    </>
  );
}
