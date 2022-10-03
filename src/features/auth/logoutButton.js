import { Button } from 'antd';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';

import { logout } from './authSlice';
import { persistor } from '../../index';

const LogoutButton = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onClickHandler = async () => {
    try {
      const response = await dispatch(logout()).unwrap();
      console.log(response);
      persistor.purge();
      navigate('/');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Button type="primary" onClick={onClickHandler}>
        Log out
      </Button>
    </>
  );
};

export default LogoutButton;
