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
import { useAppDispatch, useAppSelector } from "../hooks/store";
import { setUser } from "../features/user/userSlice";
import { User } from "../features/user/type";
import { TransactionType } from "../services/api/type";
import Confetti from "react-confetti";
import useWindowSize from "react-use/lib/useWindowSize";

const LoginGuard = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const [visible, { close }] = useDisclosure(true);
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);
  const [rewardOpened, { open: openReward, close: closeReward }] =
    useDisclosure(false);

  const [rewardList, setRewardList] = useState<TransactionType[] | null>(null);
  const [currentRewardIndex, setCurrentRewardIndex] = useState(0);

  useEffect(() => {
    let ws: WebSocket | undefined;
    const auth = async () => {
      try {
        const token = getToken();
        const { id } = jwtDecode<User>(token);

        await axios.get("/auth", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!user) {
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
              bankName: result.bankName,
              accountNumber: result.accountNumber,
              accountHolder: result.accountHolder,
            })
          );
        }

        const {
          data: { result: transactionList },
        } = (await axios.get(`/users/${id}/transactions`, {
          params: { method: "reward", status: "pending" },
          headers: { Authorization: `Bearer ${token}` },
        })) as { data: { result: TransactionType[] } };

        setRewardList(transactionList);

        // Initialize WebSocket connection
        const wsURL = import.meta.env.VITE_WS_SERVER_URL + "/ws?userId=" + id;

        if (wsURL) {
          let retryCount = 0;
          ws = new WebSocket(wsURL);
          ws.onmessage = (event) => {
            const message = JSON.parse(event.data) as TransactionType;
            setRewardList((prevRewardList) => {
              if (prevRewardList) {
                return [...prevRewardList, message];
              } else {
                return [message];
              }
            });
          };
          ws.onclose = (event: CloseEvent) => {
            console.log("WebSocket connection closed:", event);
            // Optionally, log specific close reason and code
            console.log(`Close reason: ${event.reason} (code: ${event.code})`);
          };

          ws.onerror = (error) => {
            console.error("WebSocket error:", error);
            if (retryCount < 5) {
              setTimeout(() => {
                if (ws) {
                  ws.close();
                  ws = new WebSocket(wsURL);
                }
                retryCount++;
              }, 600);
            } else {
              console.error("Maximum retry attempts reached. Giving up.");
              Swal.fire({
                icon: "error",
                text: "EN: Failed to persist connection to server. reward may not display instantly",
                confirmButtonColor: "#6EE3A5",
                timer: 2000,
              });
            }
          };
        }

        close();
      } catch (err) {
        Swal.fire({
          icon: "error",
          text: "Hết thời gian chờ, đăng nhập lại",
          confirmButtonColor: "#6EE3A5",
          timer: 2000,
        });
        navigate("/");
        console.log(err);
      }
    };
    auth();

    return () => {
      if (ws) ws.close();
    };
  }, []);

  useEffect(() => {
    if (!rewardOpened && rewardList && rewardList.length > currentRewardIndex) {
      openReward();
    }
  }, [rewardList, currentRewardIndex]);
  const { width, height } = useWindowSize();

  const onCloseReward = () => {
    if (rewardList && user) {
      (async () => {
        try {
          const token = getToken();
          const { id } = jwtDecode<User>(token);

          await axios.put(
            `/users/${id}/transactions/${rewardList[currentRewardIndex].id}`,
            {
              status: "success",
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          dispatch(
            setUser({
              id: user.id,
              phone: user.phone,
              point: user.point + rewardList[currentRewardIndex].amount,
              role: user.role,
              bankName: user.bankName,
              accountNumber: user.accountNumber,
              accountHolder: user.accountHolder,
            })
          );
        } catch (err) {
          Swal.fire({
            icon: "error",
            text: "Thông báo không thể được đánh dấu là đã đọc",
            confirmButtonColor: "#6EE3A5",
            timer: 2000,
          });

          console.log(err);
        }
      })();

      setCurrentRewardIndex((cri) => cri + 1);
      closeReward();
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
        {rewardList && rewardList.length >= currentRewardIndex + 1 && (
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
                    {rewardList[currentRewardIndex].description}
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
