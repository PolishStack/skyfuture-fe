import { Center, Container, Flex, Image, Stack } from "@mantine/core";
import { NavLink } from "@mantine/core";
import { NavLink as RouterNavLink } from "react-router-dom";
import { IoMdDownload } from "react-icons/io";
import { useAppSelector } from "../hooks/store";

const HomePage = () => {
  const { user, point: userPoint } = useAppSelector((state) => state.user);
  return (
    <>
      <Center style={{ width: "100%", height: "100%" }} bg={"#f2f2f2"}>
        <Stack
          style={{
            width: "540px",
            height: "100vh",
            boxShadow:
              "0 4px 2px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
          }}
          bg={"#77d5ae"}
        >
          <Center bg={"#88ffce"} style={{ padding: "8px" }}>
            <b>DREAMS</b>
          </Center>
          <Container style={{ width: "100%" }}>
            <Flex justify={"space-between"}>
              <Flex>
                <p>ID: {user?.id}</p>
              </Flex>
              <Flex>
                <p>Number of points: {userPoint}</p>
              </Flex>
            </Flex>
          </Container>
          <Flex justify={"center"} style={{ margin: "0px"}}>
            <h3 style={{ margin: "0px"}}>COORDINATION CENTER</h3>
          </Flex>
          <Container bg={"white"} style={{ padding: "20px", height: "100vh" }}>
            <Stack>
              <Image src="/banner1.png" />
              <Image src="/banner2.png" />
              <Center>
                <Image src={"/heart.png"} width={"200px"} height={"32px"} />
              </Center>
            </Stack>
          </Container>
          <Flex>
            <NavLink
              bg={"linear-gradient(180deg,#71d2a7,#94e3ce)"}
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              renderRoot={({ _, ...others }) => (
                <RouterNavLink to={`/home`} {...others} />
              )}
              label={"Homepage"}
              leftSection={<IoMdDownload />}
            />
            <NavLink
              bg={"linear-gradient(180deg,#71d2a7,#94e3ce)"}
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              renderRoot={({ _, ...others }) => (
                <RouterNavLink to={`/individual`} {...others} />
              )}
              label={"individual"}
              leftSection={<IoMdDownload />}
            />
            <NavLink
              bg={"linear-gradient(180deg,#71d2a7,#94e3ce)"}
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              renderRoot={({ _, ...others }) => (
                <RouterNavLink to={`/customer_service`} {...others} />
              )}
              label={"Customer Service"}
              leftSection={<IoMdDownload />}
            />
          </Flex>
        </Stack>
      </Center>
    </>
  );
};

export default HomePage;
