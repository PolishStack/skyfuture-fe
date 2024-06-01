import Header from "../component/Header";
import { Button, Center, PasswordInput, Stack } from "@mantine/core";
import axios from "../services/api";
import Swal from "sweetalert2";
import { useAppSelector } from "../hooks/store";
import { getToken } from "../utils/helpers";
import { useForm } from "@mantine/form";
import { useNavigate } from "react-router-dom";

const ChangePasswordPage = () => {
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.user);

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      oldPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
    validate: {
      oldPassword: (value) =>
        value.length < 5 ? "Mật khẩu phải dài hơn 5 ký tự" : null,
      newPassword: (value) =>
        value.length < 5 ? "Mật khẩu phải dài hơn 5 ký tự" : null,
      confirmNewPassword: (value) =>
        value.length < 5 ? "Mật khẩu phải dài hơn 5 ký tự" : null,
    },
  });

  const handleChangePassword = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    const { newPassword, confirmNewPassword } = form.getValues();
    if (newPassword !== confirmNewPassword) {
      Swal.fire({
        icon: "error",
        text: "Xác nhận mật khẩu không đúng",
        confirmButtonColor: "#6EE3A5",
      });
      return;
    }

    if (form.validate().hasErrors) {
      return;
    }

    try {
      const token = getToken();
      await axios.post(`/users/${user?.id}/change-password`, form.getValues(), {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      Swal.fire({
        icon: "success",
        text: "Cập nhật mật khẩu tài khoản thành công",
        confirmButtonColor: "#6EE3A5",
      });
      navigate("/app/home");
    } catch (err: any) {
      console.log(err);
      Swal.fire({
        icon: "error",
        text:
          err?.response?.data?.error === "Old password is not correct"
            ? "mật khẩu cũ không đúng"
            : "Cập nhật mật khẩu tài khoản không thành công, vui lòng thử lại",
        confirmButtonColor: "#6EE3A5",
      });
    }
  };

  return (
    <>
      <Header title="Mật khẩu cũ" />
      <Stack gap="16px" style={{ padding: "16px 24px 0px 24px" }}>
        <PasswordInput
          placeholder="Mật khẩu cũ"
          key={form.key("oldPassword")}
          {...form.getInputProps("oldPassword")}
        />
        <PasswordInput
          placeholder="Mật khẩu mới"
          key={form.key("newPassword")}
          {...form.getInputProps("newPassword")}
        />
        <PasswordInput
          placeholder="Nhập lại mật khẩu"
          key={form.key("confirmNewPassword")}
          {...form.getInputProps("confirmNewPassword")}
        />
        <Center>
          <Button
            variant="gradient"
            style={{ paddingLeft: "25px", paddingRight: "25px" }}
            onClick={handleChangePassword}
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

export default ChangePasswordPage;
