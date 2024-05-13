import { useEffect, ReactNode } from "react";
import axios from "axios";
import { apiUrl } from "../config";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router-dom";
import { Box, LoadingOverlay } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

const LoginGuard = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [visible, { close }] = useDisclosure(true);

  useEffect(() => {
    const auth = async () => {
      try {
        const token = localStorage.getItem("token") ?? "";
        if (token == "") {
          throw new Error("Not found token");
        }

        await axios.get(`${apiUrl}/auth`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });
        
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
  }, [navigate, close, location]);

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
