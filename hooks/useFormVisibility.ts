import { useState } from 'react';

const useFormVisibility = () => {
  const [isFormVisible, setIsFormVisible] = useState(false);

  const showForm = () => {
    setIsFormVisible(true);
  };

  const hideForm = () => {
    setIsFormVisible(false);
  };

  return {
    isFormVisible,
    showForm,
    hideForm,
  };
};

export default useFormVisibility;
