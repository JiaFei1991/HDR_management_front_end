import { getAllUsers } from '../../features/users/userSlice';
import { Usercard } from '../../features/users/userCard';
import { Space } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

const StudentPage = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.allUsers);

  useEffect(() => {
    async function loadStudents() {
      await dispatch(getAllUsers());
    }
    loadStudents();
  }, [dispatch]);

  let displayContent;
  if (users) {
    displayContent = users.map((oneUser) => {
      return (
        <Usercard
          key={oneUser.id}
          title={oneUser.name}
          description={oneUser.role}
          avatar={oneUser.avatar}
        />
      );
    });
  }

  return <Space wrap="true">{displayContent}</Space>;
};

export default StudentPage;
