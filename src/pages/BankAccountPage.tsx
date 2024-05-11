import { useState } from "react";
import FrameWithCenter from "../component/FrameWithCenter";
import { Button, Center, Stack, TextInput } from "@mantine/core";

const BankAccountPage = () => {
  const [bankName, setBankName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [accountHolder, setAccountHolder] = useState("");

  return (
    <>
      <FrameWithCenter title="Add a bank account">
        <Stack style={{ height: "100vh", padding: "0px 25px 0px 25px" }}>
          <TextInput
            label="Bank name"
            placeholder="Enter bank name"
            value={bankName}
            onChange={(e) => setBankName(e.target.value)}
          />
          <TextInput
            label="Account number"
            placeholder="Enter your account number"
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
          />
          <TextInput
            label="Account holder"
            placeholder="Enter the recipient's full name"
            value={accountHolder}
            onChange={(e) => setAccountHolder(e.target.value)}
          />
          <Center>
            <Button
              variant="gradient"
              style={{ paddingLeft: "25px", paddingRight: "25px"}}
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

export default BankAccountPage;
