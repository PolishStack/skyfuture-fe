import {
  Anchor,
  Center,
  Container,
  Group,
  Image,
  PasswordInput,
  Stack,
  Text,
} from "@mantine/core";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import "../styles/index.css";
import { useForm } from "@mantine/form";
import axios from "../services/api";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../hooks/store";
import { setUser } from "../features/user/userSlice";

function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      phone: "",
      password: "",
    },
    validate: {
      phone: (value) =>
        value.length < 10 ? "Số điện thoại không hợp lệ" : null,
      password: (value) => (value.length < 5 ? "Mật khẩu không hợp lệ" : null),
    },
  });

  const handleOnFormSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (form.validate().hasErrors) {
      return;
    }

    try {
      const {
        res: {
          data: { result: token, id },
        },
      } = await axios.post<
        { phone: string; password: string },
        { res: { data: { result: string; id: string } } }
      >("/login", form.getValues(), {});
      localStorage.setItem("token", token);

      await axios.get("/auth", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const res = await axios.get(`/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const { result } = res.data;

      dispatch(
        setUser({
          id: result.id,
          phone: result.phone,
          point: result.point,
          role: result.role,
          bankName: result.bankName,
          accountNumber: result.accountNumber,
          accountHolder: result.accountHolder,
        })
      );

      Swal.fire({
        icon: "success",
        text: "Đăng nhập thành công",
        confirmButtonColor: "#6EE3A5",
        timer: 2000,
      });

      navigate("/app/home");
    } catch (err) {
      Swal.fire({
        icon: "error",
        text: "Đăng nhập không thành công số điện thoại hoặc mật khẩu sai",
        confirmButtonColor: "#6EE3A5",
      });
      console.log(err);
    }
  };

  return (
    <Stack
      style={{
        minHeight: "100vh",
        boxShadow:
          "0 4px 2px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
      }}
      bg="#77d5ae"
    >
      <Center bg="#88ffce" style={{ padding: "8px" }}>
        <b>SKYFUTURE</b>
      </Center>
      <Center>
        <Image src="./logo.png" alt="logo" height="254px" />
      </Center>
      <Container style={{ width: "100%", padding: "0px 30px 30px 30px" }}>
        <Container
          bg="linear-gradient(#86d3c3,#e8fcfb)"
          style={{
            width: "100%",
            borderRadius: "18px",
            border: "solid 2px black",
            paddingBottom: "12px",
          }}
        >
          <Stack style={{ padding: "20px" }}>
            <Center>
              <h2>ĐĂNG NHẬP</h2>
            </Center>
            <PhoneInput
              defaultCountry="vn"
              inputStyle={{ width: "100%" }}
              key={form.key("phone")}
              {...form.getInputProps("phone")}
            />
            <PasswordInput
              size="md"
              placeholder="Nhập mật khẩu của bạn"
              key={form.key("password")}
              {...form.getInputProps("password")}
              style={{ width: "100%" }}
            />
            <Group gap={4}>
              <Text>Bạn quên mật khẩu ?</Text>
              <Anchor
                href={import.meta.env.VITE_CHAT_URL}
                target="_blank"
                display="inline"
              >
                Hãy ấn vào đây
              </Anchor>
            </Group>
            <button
              onClick={(e) => handleOnFormSubmit(e)}
              style={{
                backgroundColor: "#ffffff",
                borderRadius: "24px",
                padding: "8px",
                width: "100%",
                border: "solid 2px black",
              }}
              className="clickable"
            >
              <b>ĐĂNG NHẬP</b>
            </button>
            <Link to={"/register"}>
              <Text
                ta="center"
                fw="bold"
                style={{
                  backgroundColor: "#ffffff",
                  borderRadius: "24px",
                  padding: "8px",
                  width: "100%",
                  border: "solid 2px black",
                }}
                className="clickable"
              >
                Bạn chưa có tài khoản ? Đăng ký ngay
              </Text>
            </Link>
          </Stack>
        </Container>
      </Container>
    </Stack>
  );
}

export default LoginPage;
