import { useEffect, ReactNode, useState } from "react";
import axios from "../services/api";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import {
  BackgroundImage,
  Box,
  Button,
  Center,
  LoadingOverlay,
  Modal,
  Text,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { getToken } from "../utils/helpers";
import { jwtDecode } from "jwt-decode";
import { useAppDispatch } from "../hooks/store";
import { setUser } from "../features/user/userSlice";
import { User } from "../features/user/type";
import { TransactionType } from "../services/api/type";
import Confetti from "react-confetti";
import useWindowSize from "react-use/lib/useWindowSize";

const LoginGuard = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const [visible, { close }] = useDisclosure(true);
  const dispatch = useAppDispatch();

  const [rewardList, setRewardList] = useState<TransactionType[] | null>(null);
  const [rewardOpened, { open: openReward, close: closeReward }] =
    useDisclosure(false);

  useEffect(() => {
    const auth = async () => {
      try {
        const token = getToken();
        const { id } = jwtDecode<User>(token);

        await axios.get("/auth", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const res = await axios.get(`/users/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const { result } = res.data;

        dispatch(
          setUser({
            id: result.id,
            phone: result.phone,
            point: result.point,
            role: result.role,
          })
        );

        close();

        const {
          data: { result: transactionList },
        } = (await axios.get(`/users/${id}/transactions`, {
          params: { method: "reward", status: "pending" },
          headers: { Authorization: `Bearer ${token}` },
        })) as { data: { result: TransactionType[] } };

        setRewardList(transactionList);
      } catch (err) {
        Swal.fire({
          icon: "error",
          text: "EN: Time out login again",
          confirmButtonColor: "#6EE3A5",
          timer: 2000,
        });
        navigate("/");
        console.log(err);
      }
    };
    auth();
  }, []);

  useEffect(() => {
    if (rewardList && rewardList.length > 0 && !rewardOpened) {
      openReward();
    }
  }, [rewardList]);

  const { width, height } = useWindowSize();

  const onCloseReward = () => {
    if (rewardList) {
      (async () => {
        try {
          const token = getToken();
          const { id } = jwtDecode<User>(token);

          await axios.put(
            `/users/${id}/transactions/${rewardList[0].id}`,
            {
              status: "success",
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
        } catch (err) {
          Swal.fire({
            icon: "error",
            text: "EN: failed to mark notify as read",
            confirmButtonColor: "#6EE3A5",
            timer: 2000,
          });

          console.log(err);
        }
      })();

      closeReward();
      setRewardList((rl) => {
        if (rl && rl.length > 0) {
          return [...rl?.slice(1, -1)];
        } else return [];
      });
    }
  };

  return (
    <>
      {rewardList && rewardList.length > 0 && (
        <Confetti
          width={width}
          height={height}
          recycle={rewardOpened}
          style={{ zIndex: "201" }}
          numberOfPieces={width * 0.2}
        />
      )}
      <Box pos="relative">
        {rewardList && rewardList.length > 0 && (
          <Modal.Root
            opened={rewardOpened}
            onClose={onCloseReward}
            centered
            w="80px"
            c="white"
          >
            <Modal.Overlay />
            <Modal.Content style={{ borderRadius: "16px" }}>
              <BackgroundImage src="/reward-background.png" bgsz="cover">
                <Modal.Header bg="none" c="#ffe858" pt={40}>
                  <Modal.Title
                    mx="auto"
                    style={{ fontSize: "24px", fontWeight: "600" }}
                  >
                    Xin chúc mừng !!!
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Text px={8} mt={8}>
                    {rewardList[0].description}
                  </Text>
                  <Center>
                    <Button
                      onClick={() => onCloseReward()}
                      mt={20}
                      c="black"
                      bg="linear-gradient(#fff,#f7f8fd 19%,#fcfdff 69%,#fcfdff)"
                    >
                      Đồng ý
                    </Button>
                  </Center>
                </Modal.Body>
              </BackgroundImage>
            </Modal.Content>
          </Modal.Root>
        )}
        <LoadingOverlay
          visible={visible}
          zIndex={1000}
          overlayProps={{ radius: "sm", blur: 2 }}
          loaderProps={{ color: "lime", type: "bars" }}
        />
        {children}
      </Box>
    </>
  );
};

export default LoginGuard;
