import { useState } from "react";
import Header from "../component/Header";
import { Button, Center, Stack, TextInput } from "@mantine/core";

const BankAccountPage = () => {
  const [bankName, setBankName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [accountHolder, setAccountHolder] = useState("");

  return (
    <>
      <Header title="Thêm tài khoản ngân hàng" />
      <Stack gap="16px" style={{ padding: "16px 24px 0px 24px" }}>
        <TextInput
          label="Tên ngân hàng"
          placeholder="Nhập tên ngân hàng"
          value={bankName}
          onChange={(e) => setBankName(e.target.value)}
        />
        <TextInput
          label="Số tài khoản"
          placeholder="Nhập số tài khoản"
          value={accountNumber}
          onChange={(e) => setAccountNumber(e.target.value)}
        />
        <TextInput
          label="Chủ tài khoản"
          placeholder="Nhập họ tên người nhận"
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
            Xác nhận
          </Button>
        </Center>
      </Stack>
    </>
  );
};

export default BankAccountPage;
