import { Button, Modal, Form, Input, message } from 'antd';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { openForgotPassModal, resetPassword } from './authSlice';

const RegisterModal = () => {
  const dispatch = useDispatch();
  const [spin, setSpin] = useState(false);
  const [formDisable, setFormDisable] = useState(false);
  const open = useSelector((state) => state.auth.forgotPassModalOpen);

  const onClickSubmitButton = (value) => {
    setFormDisable(value);
    setSpin(value);
  };

  const submitForm = async (formValues) => {
    onClickSubmitButton(true);

    console.log(formValues);

    const response = await dispatch(resetPassword(formValues));

    // TODO: handle the failed case by extracting failure message from the payload
    if (response.payload.status === 'success') {
      message.success(
        'The password reset email has been sent to the provided account!',
        5
      );
      onClickSubmitButton(false);
      dispatch(openForgotPassModal(false));
    }
  };

  const onCancelForm = () => {
    dispatch(openForgotPassModal(false));
  };

  const handleCancel = () => {
    dispatch(openForgotPassModal(false));
  };

  const formRules = (fieldName) => [
    {
      required: true,
      message: `Please enter your ${fieldName}!`
    }
  ];

  return (
    <>
      <Modal
        title="Password reset: Input your email to reset your password."
        open={open}
        onCancel={handleCancel}
        width={1000}
        footer={null}
        maskClosable={false}
      >
        <Form
          labelCol={{
            span: 4
          }}
          wrapperCol={{
            span: 14
          }}
          layout="horizontal"
          disabled={formDisable}
          onFinish={submitForm}
        >
          <Form.Item label="Email" name="email" rules={formRules('email')}>
            <Input name="email-input" />
          </Form.Item>

          <div
            className="ant-modal-footer"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end'
            }}
          >
            <Button onClick={onCancelForm}>Cancel</Button>
            <Button
              type="primary"
              htmlType="submit"
              name="submit-button"
              loading={spin}
            >
              Reset Password
            </Button>
          </div>
        </Form>
      </Modal>
    </>
  );
};

export default RegisterModal;
