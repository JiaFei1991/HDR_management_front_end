import { useGetAllUsersQuery } from '../../features/users/userSlice';
import { Usercard } from '../../features/users/userCard';

const StudentPage = () => {
  const {
    data: users,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetAllUsersQuery();

  let displayContent;
  if (isLoading) {
    displayContent = <p>...is loading for the first time</p>;
  } else if (isSuccess) {
    // console.log(users);
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
  } else if (isError) {
    displayContent = <p>{JSON.stringify(error)}</p>;
  }

  return <div>{displayContent}</div>;
};

export default StudentPage;
