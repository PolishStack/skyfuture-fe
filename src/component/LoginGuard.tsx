import { useEffect, ReactNode } from "react";
import axios from "../services/api";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { Box, LoadingOverlay } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { getToken } from "../utils/helpers";
import { jwtDecode } from "jwt-decode";
import { useAppDispatch } from "../hooks/store";
import { setUser } from "../features/user/userSlice";
import { User } from "../features/user/type";

const LoginGuard = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const [visible, { close }] = useDisclosure(true);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const auth = async () => {
      try {
        const token = getToken();
        await axios.get("/auth", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const { id, phone, point, role } = jwtDecode<User>(token);
        dispatch(
          setUser({
            id: id,
            phone: phone,
            point: point,
            role: role,
          })
        );
        close();
      } catch (err) {
        Swal.fire({
          icon: "error",
          text: "Time out login again",
          confirmButtonColor: "#6EE3A5",
          timer: 2000,
        });
        navigate("/");
        console.log(err);
      }
    };
    auth();
  }, []);

  return (
    <Box pos="relative">
      <LoadingOverlay
        visible={visible}
        zIndex={1000}
        overlayProps={{ radius: "sm", blur: 2 }}
        loaderProps={{ color: "lime", type: "bars" }}
      />
      {children}
    </Box>
  );
};

export default LoginGuard;
