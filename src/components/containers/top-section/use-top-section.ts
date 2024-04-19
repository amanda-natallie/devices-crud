import { useState } from 'react';

const useTopSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOpenModal = () => setIsModalOpen(true);
  return {
    isModalOpen,
    setIsModalOpen,
    handleOpenModal,
  };
};

export default useTopSection;
