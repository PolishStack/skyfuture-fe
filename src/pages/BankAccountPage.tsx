import Header from "../component/Header";
import { Button, Center, Stack, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import Swal from "sweetalert2";
import axios from "../services/api";
import { useAppSelector } from "../hooks/store";
import { getToken } from "../utils/helpers";
import { useEffect } from "react";

const BankAccountPage = () => {
  const { user } = useAppSelector((state) => state.user);
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      bankName: "",
      accountNumber: "",
      accountHolder: "",
    },
  });

  const handleOnFormSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (!user) {
      Swal.fire({
        icon: "error",
        text: "EN: user id is not found",
        confirmButtonColor: "#6EE3A5",
      });
      return;
    }
    try {
      const token = getToken();
      await axios.put(`/users/${user.id}`, form.getValues(), {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      Swal.fire({
        icon: "success",
        text: "EN: update bank info success",
        confirmButtonColor: "#6EE3A5",
        timer: 2000,
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        text: "EN: update bank info failed",
        confirmButtonColor: "#6EE3A5",
      });
      console.log(err);
    }
  };

  useEffect(() => {
    if (user)
      (async () => {
        try {
          const token = getToken();
          const {
            data: { result },
          } = await axios.get(`/users/${user!.id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          form.setValues({
            bankName: result.bankName,
            accountNumber: result.accountNumber,
            accountHolder: result.accountHolder,
          });
        } catch (err) {
          Swal.fire({
            icon: "error",
            text: "Đăng nhập không thành công số điện thoại hoặc mật khẩu sai",
            confirmButtonColor: "#6EE3A5",
          });
          console.log(err);
        }
      })();
  }, [user]);

  return (
    <>
      <Header title="Thêm tài khoản ngân hàng" />
      <Stack gap="16px" style={{ padding: "16px 24px 0px 24px" }}>
        <TextInput
          label="Tên ngân hàng"
          placeholder="Nhập tên ngân hàng"
          key={form.key("bankName")}
          {...form.getInputProps("bankName")}
        />
        <TextInput
          label="Số tài khoản"
          placeholder="Nhập số tài khoản"
          key={form.key("accountNumber")}
          {...form.getInputProps("accountNumber")}
        />
        <TextInput
          label="Chủ tài khoản"
          placeholder="Nhập họ tên người nhận"
          key={form.key("accountHolder")}
          {...form.getInputProps("accountHolder")}
        />
        <Center>
          <Button
            onClick={(e) => handleOnFormSubmit(e)}
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
