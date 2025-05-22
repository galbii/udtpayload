'use client';

import React, { useState } from 'react';
import FreeLessonFormController from './FreeLessonFormController';

interface FreeLessonTriggerProps {
  buttonText?: string;
  buttonClassName?: string;
}

const FreeLessonTrigger: React.FC<FreeLessonTriggerProps> = ({
  buttonText = 'BOOK FREE CLASS',
  buttonClassName = ''
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const openModal = () => {
    setIsModalOpen(true);
  };
  
  const closeModal = () => {
    setIsModalOpen(false);
  };
  
  return (
    <>
      {/* Hidden button that can be triggered programmatically */}
      <button 
        id="open-free-class-modal" 
        onClick={openModal} 
        style={{ display: 'none' }}
      >
        Open Free Class Form
      </button>
      
      {/* The visible button that can be styled via props */}
      {buttonClassName ? (
        <button 
          className={buttonClassName} 
          onClick={openModal}
        >
          {buttonText}
        </button>
      ) : null}
      
      {/* Form Controller that manages the modal */}
      <FreeLessonFormController 
        isOpen={isModalOpen} 
        onClose={closeModal}
        formSource="hero_section"
      />
    </>
  );
};

export default FreeLessonTrigger; 