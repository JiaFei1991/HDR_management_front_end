import { Button, Modal } from 'antd';
import React, { useState } from 'react';
import RegisterForm from './registerForm';
import { useDispatch, useSelector } from 'react-redux';
import { openModal } from './userSlice';

const RegisterModal = () => {
  const dispatch = useDispatch();
  const open = useSelector((state) => state.user.registerModalOpen);
  // const [open, setOpen] = useState(false);
  // const [confirmLoading, setConfirmLoading] = useState(false);

  // const showModal = () => {
  //   setOpen(true);
  // };

  const handleOk = (values) => {
    console.log(values);
    dispatch(openModal(false));
    // setConfirmLoading(true);
    // setTimeout(() => {
    //   setOpen(false);
    //   setConfirmLoading(false);
    // }, 2000);
  };

  const handleCancel = () => {
    dispatch(openModal(false));
    // setOpen(false);
  };

  return (
    <>
      <Modal
        title="User account creation"
        open={open}
        // onOk={handleOk}
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
