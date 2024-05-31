import { useParams } from "react-router-dom";
import UserHistoryList from "../../component/ManageUser/UserHistoryList";

const EditUserPage = () => {
  const { id: userId } = useParams();
  return <>{userId && <UserHistoryList userId={parseInt(userId)} />}</>;
};

export default EditUserPage;
