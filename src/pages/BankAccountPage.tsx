import { useState } from "react";
import Header from "../component/Header";
import { Button, Center, Stack, TextInput } from "@mantine/core";

const BankAccountPage = () => {
  const [bankName, setBankName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [accountHolder, setAccountHolder] = useState("");

  return (
    <>
      <Header title="Add a bank account" />
      <Stack gap="16px" style={{ padding: "16px 24px 0px 24px" }}>
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

export default BankAccountPage;
