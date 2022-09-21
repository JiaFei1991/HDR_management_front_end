import { Avatar, Space } from 'antd';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import './index.css';

const AvatarButton = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.loggedinUser);
  if (!user) return;
  //   console.log('avatarbutton rendered.');

  return (
    <>
      <Link to="/home" className="link">{`${user.name}`}</Link>
      {/* <h3>{`${user.name}`}</h3> */}
      <Avatar src={`http://localhost:8000/profiles/${user.avatar}`} />
    </>
  );
};

export default AvatarButton;
