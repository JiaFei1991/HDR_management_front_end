import { Avatar } from 'antd';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import '../../style.css';

const AvatarButton = () => {
  const user = useSelector((state) => state.auth.loggedinUser);
  if (!user) return;

  return (
    <>
      <Link to="/home/schedule" className="link">{`${user.name}`}</Link>
      <Avatar src={`http://localhost:8000/profiles/${user.avatar}`} />
    </>
  );
};

export default AvatarButton;
