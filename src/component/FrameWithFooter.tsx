import { AppShell } from "@mantine/core";

import { Outlet } from "react-router-dom";

export const FrameWithFooter = () => {
  return (
    <AppShell footer={{ height: 60 }} padding="md">
      <AppShell.Main pt="60">
        <Outlet />
      </AppShell.Main>
      <AppShell.Footer p="md">Footer</AppShell.Footer>
    </AppShell>
  );
};

export default FrameWithFooter;
