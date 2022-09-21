import React, { useState } from 'react';
import { Switch } from 'antd';
import StudentRegForm from './studentRegForm';
import SupervisorRegForm from './supervisorRegForm';

const RegisterForm = () => {
  const [switchForm, setSwitchForm] = useState('student');

  const RenderedForm = () => {
    let myForm;
    if (switchForm === 'student') {
      myForm = <StudentRegForm role="student" />;
    } else {
      myForm = <SupervisorRegForm role="supervisor" />;
    }
    return myForm;
  };

  const onSwitchChange = (checked) => {
    checked ? setSwitchForm('supervisor') : setSwitchForm('student');
  };

  return (
    <>
      <Switch
        checkedChildren={switchForm}
        unCheckedChildren={switchForm}
        onChange={onSwitchChange}
      />
      <RenderedForm />
    </>
  );
};

export default RegisterForm;
