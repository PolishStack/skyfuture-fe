import { Center } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { IoClose } from "react-icons/io5";

const Header = ({ title }: { title: string }) => {
  const navigate = useNavigate();
  return (
    <Center
      bg="#87f3d9"
      style={{ padding: "8px", fontSize: "18px", position: "relative" }}
    >
      <b>{title}</b>
      <IoClose
        onClick={() => navigate(-1)}
        size="20px"
        style={{
          position: "absolute",
          right: "10px",
        }}
        className="clickable"
      />
    </Center>
  );
};

export default Header;
