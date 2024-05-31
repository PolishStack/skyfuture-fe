import { useParams } from "react-router-dom";
import UserHistoryList from "../../component/ManageUser/UserHistoryList";
import EditUserForm from "../../component/ManageUser/EditUserForm";
import Header from "../../component/Header";
import { Skeleton } from "@mantine/core";

const EditUserPage = () => {
  const { id: userId } = useParams();
  return (
    <>
      {userId ? (
        <>
          <Header title={`EN: Edit user ${userId}`} />
          <EditUserForm />
          <UserHistoryList userId={parseInt(userId)} />
        </>
      ) : (
        <Skeleton height="100vh" width="100%" pos="absolute" />
      )}
    </>
  );
};

export default EditUserPage;
