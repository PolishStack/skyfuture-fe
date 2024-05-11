import { Button, Center, Container, Flex, NavLink, Stack } from "@mantine/core";
import { AiFillBank, AiOutlinePartition } from "react-icons/ai";
import { CiCreditCard1 } from "react-icons/ci";
import { IoIosLogOut, IoMdDownload } from "react-icons/io";
import { PiHandDeposit, PiHandWithdraw } from "react-icons/pi";
import { RiLockPasswordLine } from "react-icons/ri";
import { SlPresent } from "react-icons/sl";
import { Link, NavLink as RouterNavLink } from "react-router-dom";

const IndividualPage = () => {
  const menuList = [
    {
      title: "Participation history",
      href: "/participation_history",
      icon: <AiOutlinePartition />,
    },
    { title: "Reward history", href: "/reward_history", icon: <SlPresent /> },
    {
      title: "Deposit history",
      href: "/deposit_history",
      icon: <PiHandDeposit />,
    },
    {
      title: "Withdrawal history",
      href: "/withdrawal_history",
      icon: <PiHandWithdraw />,
    },
    { title: "Add a bank account", href: "/bank_account", icon: <AiFillBank /> },
    {
      title: "Change password",
      href: "/change_password",
      icon: <RiLockPasswordLine />,
    },
    { title: "Log out", href: "/", icon: <IoIosLogOut /> },
  ];

  return (
    <>
      <Center style={{ width: "100%", height: "100%" }} bg={"#f2f2f2"}>
        <Stack
          style={{
            height: "100vh",
            boxShadow:
              "0 4px 2px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
          }}
          bg={"#ffffff"}
        >
          <Stack
            gap={1}
            style={{
              width: "540px",
              height: "216px",
              borderEndStartRadius: "28px",
              borderEndEndRadius: "28px",
            }}
            bg={"linear-gradient(180deg,#71d2a7,#94e3ce)"}
          >
            <Center style={{ padding: "8px" }}>
              <b>Member Center</b>
            </Center>
            <Flex
              justify={"space-between"}
              style={{ padding: "0px 30px 0px 30px" }}
            >
              <p>ID: user_id</p>
              <p>user_phoneNumber</p>
            </Flex>
            <Center>
              <div>
                <p style={{ margin: "0px" }}>Account points</p>
                <h1 style={{ margin: "0px", textAlign: "center" }}>0</h1>
              </div>
            </Center>
            <Center>
              <Container
                style={{
                  marginTop: "10px",
                  padding: "5px 30px",
                  borderRadius: "32px",
                  border: "solid 1px white",
                }}
                bg={"linear-gradient(#86d3c3,#e8fcfb)"}
              >
                <Flex style={{ alignItems: "center", gap: "20px" }}>
                  <Flex style={{ alignItems: "center", gap: "5px" }}>
                    <p>Deposit points </p>
                    <CiCreditCard1 style={{ fontSize: "24px" }} />
                  </Flex>
                  <p>|</p>
                  <Flex style={{ alignItems: "center", gap: "5px" }}>
                    <p>Draw points </p>
                    <CiCreditCard1 style={{ fontSize: "24px" }} />
                  </Flex>
                </Flex>
              </Container>
            </Center>
          </Stack>
          <Stack
            style={{
              fontSize: "18px",
              height: "100%",
              marginTop: "30px",
            }}
            gap={4}
          >
            {menuList.map(
              (menu: {
                title: string;
                href: string;
                icon: React.ReactNode;
              }) => (
                <Link to={menu.href} style={{ textDecorationLine: "none" }}>
                  <Button
                    fullWidth
                    leftSection={menu.icon}
                    variant="transparent"
                    justify="flex-start"
                    size="lg"
                    color="black"
                  >
                    {menu.title}
                  </Button>
                </Link>
              )
            )}
          </Stack>
          <NavLink
            bg={"linear-gradient(180deg,#71d2a7,#94e3ce)"}
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            renderRoot={({ _, ...others }) => (
              <RouterNavLink to={`/video/123`} {...others} />
            )}
            label={"ข้อความที่โชว์"}
            leftSection={<IoMdDownload />}
          />
        </Stack>
      </Center>
    </>
  );
};

export default IndividualPage;
