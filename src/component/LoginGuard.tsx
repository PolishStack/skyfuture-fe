import { useEffect, ReactNode } from "react";
import axios from "axios";
import { apiUrl } from "../config";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { Box, LoadingOverlay } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

const LoginGuard = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const [visible, { close }] = useDisclosure(true);

  useEffect(() => {
    const auth = async () => {
      try {
        await axios.get(`${apiUrl}/auth`, { withCredentials: true });
      } catch (err) {
        Swal.fire({
          icon: "error",
          text: "Time out login again",
          confirmButtonColor: "#6EE3A5",
          timer: 2000,
        });
        navigate("/");
        console.log(err);
        close();
      }
    };
    auth();
  }, [navigate, close]);

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
