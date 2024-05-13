import {
  Button,
  Center,
  Flex,
  Grid,
  GridCol,
  Modal,
  Stack,
  Text,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { AiFillBank, AiOutlinePartition } from "react-icons/ai";
import { IoIosLogOut, IoIosArrowForward } from "react-icons/io";
import { PiHandDeposit, PiHandWithdraw } from "react-icons/pi";
import { RiLockPasswordLine } from "react-icons/ri";
import { SlPresent } from "react-icons/sl";
import { Link, useNavigate } from "react-router-dom";
import { useAppSelector } from "../hooks/store";
import { MdAddCard } from "react-icons/md";
import { BiMoneyWithdraw } from "react-icons/bi";
import Swal from "sweetalert2";
// import { useEffect } from "react";

const IndividualPage = () => {
  const navigate = useNavigate();
  const { user, point: userPoint } = useAppSelector((state) => state.user);
  const [opened, { open, close }] = useDisclosure(false);

  const handleUserLogout = async () => {
    try {
      localStorage.removeItem("token")
      
      navigate("/");

      Swal.fire({
        icon: "success",
        text: "Đăng xuất thành công",
        confirmButtonColor: "#6EE3A5",
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        text: "Không thể đăng xuất",
      });
      console.log(err);
    }
  };

  const menuList = [
    {
      title: "Lịch sử tham gia",
      href: "/app/participation_history",
      icon: <AiOutlinePartition />,
    },
    {
      title: "Lịch sử nhận thưởng",
      href: "/app/reward_history",
      icon: <SlPresent />,
    },
    {
      title: "Lịch sử nạp",
      href: "/app/deposit_history",
      icon: <PiHandDeposit />,
    },
    {
      title: "Lịch sử rút",
      href: "/app/withdrawal_history",
      icon: <PiHandWithdraw />,
    },
    {
      title: "Thêm tài khoản ngân hàng",
      href: "/app/bank_account",
      icon: <AiFillBank />,
    },
    {
      title: "Đổi mật khẩu",
      href: "/app/change_password",
      icon: <RiLockPasswordLine />,
    },
    {
      title: "Đăng xuất",
      href: "/",
      icon: <IoIosLogOut />,
    },
  ];

  return (
    <>
      <Stack
        gap={1}
        style={{
          height: "216px",
          borderEndStartRadius: "28px",
          borderEndEndRadius: "28px",
        }}
        bg="linear-gradient(180deg,#71d2a7,#94e3ce)"
      >
        <Center style={{ padding: "8px" }}>
          <b>Trung Tâm Thành Viên</b>
        </Center>
        <Flex justify="space-between" style={{ padding: "0px 30px 0px 30px" }}>
          <p>ID: {user?.id ?? "None"}</p>
          <p>{user?.phone ?? "None"}</p>
        </Flex>
        <Center>
          <div>
            <p style={{ margin: "0px" }}>Số điểm tài khoản</p>
            <h1 style={{ margin: "0px", textAlign: "center" }}>{userPoint}</h1>
          </div>
        </Center>

        <Grid
          style={{
            margin: "auto",
            marginTop: "10px",
            padding: "10px 20px",
            borderRadius: "32px",
            border: "solid 1px white",
            width: "340px",
          }}
          bg="linear-gradient(#86d3c3,#e8fcfb)"
          className="center-line"
        >
          <GridCol onClick={open} span={6} className="clickable">
            <Flex direction="column" align="center">
              <MdAddCard size="24px" />
              <Text style={{ fontSize: "14px" }}>Nạp điểm</Text>
            </Flex>
          </GridCol>
          <GridCol span={6}>
            <Link to="/app/withdraw_point">
              <Flex direction="column" align="center">
                <BiMoneyWithdraw size="24px" />
                <Text style={{ fontSize: "14px" }}>Rút điểm</Text>
              </Flex>
            </Link>
          </GridCol>
        </Grid>
      </Stack>
      <Stack
        style={{
          fontSize: "18px",
          height: "100%",
          marginTop: "60px",
        }}
        gap={3}
      >
        {menuList.map(
          (menu: { title: string; href: string; icon: React.ReactNode }) => (
            <Link
              to={menu.title !== "Log out" ? menu.href : ""}
              style={{ textDecorationLine: "none" }}
              key={menu.href}
            >
              <Button
                onClick={menu.title === "Log out" ? handleUserLogout : () => {}}
                fullWidth
                leftSection={menu.icon}
                variant="transparent"
                justify="flex-start"
                size="lg"
                color="#444"
                style={{
                  fontWeight: "normal",
                  position: "relative",
                }}
              >
                {menu.title}
                <IoIosArrowForward
                  style={{ position: "absolute", right: "26px" }}
                />
              </Button>
            </Link>
          )
        )}
      </Stack>

      {/* Modal */}
      <Modal opened={opened} onClose={close} centered withCloseButton={false}>
        <Center>
          <Stack style={{ textAlign: "center" }}>
            <h3 style={{ margin: "0px" }}>NẠP ĐIỂM</h3>
            <p>
              Vui lòng liên hệ với CSKH để được hướng dẫn nạp điểm
            </p>
          </Stack>
        </Center>
        <Flex justify="center">
          <Button
            onClick={close}
            variant="filled"
            bg="#ddd"
            style={{ color: "black" }}
          >
            Đồng ý
          </Button>
        </Flex>
      </Modal>
    </>
  );
};

export default IndividualPage;
