import { Modal } from 'antd';
import React from 'react';
import RegisterForm from './registerForm';
import { useDispatch, useSelector } from 'react-redux';
import { openModal } from './userSlice';

const RegisterModal = () => {
  const dispatch = useDispatch();
  const open = useSelector((state) => state.user.registerModalOpen);
  // const [confirmLoading, setConfirmLoading] = useState(false);

  const handleCancel = () => {
    dispatch(openModal(false));
  };

  return (
    <>
      <Modal
        title="User account creation"
        open={open}
        // confirmLoading={confirmLoading}
        onCancel={handleCancel}
        width={1000}
        footer={null}
        maskClosable={false}
      >
        <RegisterForm />
      </Modal>
    </>
  );
};

export default RegisterModal;
