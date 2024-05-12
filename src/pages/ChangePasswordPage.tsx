import { useState } from "react";
import Header from "../component/Header";
import { Button, Center, PasswordInput, Stack } from "@mantine/core";

const ChangePasswordPage = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  return (
    <>
      <Header title="Change password" />
      <Stack gap="16px" style={{ padding: "16px 24px 0px 24px" }}>
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
    </>
  );
};

export default ChangePasswordPage;
