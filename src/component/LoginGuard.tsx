import { useEffect, ReactNode, useState } from "react";
import axios from "axios";
import { apiUrl } from "../config";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router-dom";
import { Box, LoadingOverlay } from "@mantine/core";

const LoginGuard = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState<boolean>(true);

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
        setLoading(false);
      }
    };
    auth();
  }, [navigate, location]);

  return (
    <Box pos="relative">
      <LoadingOverlay
        visible={loading}
        zIndex={1000}
        overlayProps={{ radius: "sm", blur: 2 }}
        loaderProps={{ color: "lime", type: "bars" }}
      />
      {children}
    </Box>
  );
};

export default LoginGuard;
