import { useState } from 'react';

const useActionsMenu = () => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const openEditModal = () => setIsEditModalOpen(true);
  const openDeleteModal = () => setIsDeleteModalOpen(true);
  return {
    isEditModalOpen,
    isDeleteModalOpen,
    openEditModal,
    openDeleteModal,
    setIsEditModalOpen,
    setIsDeleteModalOpen,
  };
};

export default useActionsMenu;
