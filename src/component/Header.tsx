import { Center } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { IoClose } from "react-icons/io5";

interface HeaderProps {
  title: string;
  position?: "fixed";
}
const Header = ({ title, position }: HeaderProps) => {
  const navigate = useNavigate();
  return (
    <Center
      h={44}
      bg="#87f3d9"
      style={{
        padding: "8px",
        fontSize: "18px",
        position: position ? "fixed" : "relative",
        top: position ? "0" : "",
        width: position ? "100%" : "",
        maxWidth: position ? "540px" : "",
      }}
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
