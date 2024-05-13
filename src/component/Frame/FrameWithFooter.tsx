import { AppShell, Box, Flex, Grid, ScrollArea, Text } from "@mantine/core";
import { Outlet } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { IoHomeOutline, IoPersonOutline } from "react-icons/io5";
import { TbHeadset } from "react-icons/tb";

export const FrameWithFooter = () => {
  return (
    <AppShell
      footer={{ height: 60 }}
      padding="md"
      styles={{ root: { position: "relative" } }}
    >
      <AppShell.Main p="0">
        <ScrollArea h="calc(100vh - 60px)">
          <Outlet />
        </ScrollArea>
        <Box h={60} />
      </AppShell.Main>
      <AppShell.Footer
        p="0"
        style={{
          border: "none",
          position: "absolute",
          left: "0",
          width: "100%",
        }}
        bg="linear-gradient(180deg,#71d2a7,#94e3ce)"
      >
        <Grid
          grow
          styles={{
            inner: { margin: "0", height: "100%", width: "100%" },
            root: { height: "100%" },
          }}
          align="center"
        >
          <Grid.Col span={3} p="0">
            <NavLink to="/app/home">
              <Flex direction="column" align="center">
                <IoHomeOutline size="20px" />
                <Text style={{ fontSize: "14px" }}>Trang chủ</Text>
              </Flex>
            </NavLink>
          </Grid.Col>
          <Grid.Col span={3} p="0">
            <NavLink to="/app/individual">
              <Flex direction="column" align="center">
                <IoPersonOutline size="20px" />
                <Text style={{ fontSize: "14px" }}>Cá nhân</Text>
              </Flex>
            </NavLink>
          </Grid.Col>
          <Grid.Col span={3} p="0">
            <NavLink to="/app/customer_service">
              <Flex direction="column" align="center">
                <TbHeadset size="20px" />
                <Text style={{ fontSize: "14px" }}>CSKH</Text>
              </Flex>
            </NavLink>
          </Grid.Col>
        </Grid>
      </AppShell.Footer>
    </AppShell>
  );
};

export default FrameWithFooter;
