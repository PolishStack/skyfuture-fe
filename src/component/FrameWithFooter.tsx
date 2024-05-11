import { AppShell } from "@mantine/core";
import { Outlet } from "react-router-dom";
import { NavLink } from "@mantine/core";
import { NavLink as RouterNavLink } from "react-router-dom";
import { IoHomeOutline } from "react-icons/io5";

export const FrameWithFooter = () => {
  return (
    <AppShell footer={{ height: 60 }} padding="md">
      <AppShell.Main pt="60">
        <Outlet />
      </AppShell.Main>
      <AppShell.Footer p="md">
        <NavLink
          bg={"linear-gradient(180deg,#71d2a7,#94e3ce)"}
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          renderRoot={({ _, ...others }) => (
            <RouterNavLink to={`/video/123`} {...others} />
          )}
          label={"ข้อความที่โชว์"}
          leftSection={<IoHomeOutline />}
        />
      </AppShell.Footer>
    </AppShell>
  );
};

export default FrameWithFooter;
