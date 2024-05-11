import { useState } from "react";
import FrameWithCenter from "../component/FrameWithCenter";
import { Button, Center, PasswordInput, Stack } from "@mantine/core";

const ChangePasswordPage = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  return (
    <>
      <FrameWithCenter title="Change password">
        <Stack style={{ height: "100vh", padding: "0px 20px 0px 20px" }}>
          <PasswordInput
            placeholder="Old password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
          <PasswordInput
            placeholder="New password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <PasswordInput
            placeholder="Re-enter password"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
          />
          <Center>
            <Button
              variant="gradient"
              style={{ paddingLeft: "25px", paddingRight: "25px" }}
              gradient={{
                from: "teal",
                to: "rgba(240, 240, 240, 1)",
                deg: 180,
              }}
            >
              Confirm
            </Button>
          </Center>
        </Stack>
      </FrameWithCenter>
    </>
  );
};

export default ChangePasswordPage;
