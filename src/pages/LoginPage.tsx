import {
  Center,
  Container,
  Image,
  PasswordInput,
  Stack,
  Text,
} from "@mantine/core";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import "../styles/index.css";
import { useForm } from "@mantine/form";
import axios from "axios";
import { apiUrl } from "../config";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../hooks/store";
import { setUser, setPoint } from "../features/user/userSlice";

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
      phone: (value) => (value.length < 10 ? "Invalid phone number" : null),
      password: (value) => (value.length < 5 ? "Invalid password" : null),
    },
  });

  const handleOnFormSubmit = async () => {
    if (form.validate().hasErrors) {
      return;
    }

    try {
      const res = await axios.post(`${apiUrl}/login`, form.getValues(), {
        withCredentials: true,
      });

      const { result } = res.data;
      dispatch(setUser({ id: result.id, phone: result.phone, name: "None" }));
      dispatch(setPoint(result.point));

      Swal.fire({
        icon: "success",
        text: "Login success",
        confirmButtonColor: "#6EE3A5",
        timer: 2000,
      });

      navigate("/app/home");
    } catch (err) {
      Swal.fire({
        icon: "error",
        text: "Login failed phone number or password is wrong",
        confirmButtonColor: "#6EE3A5",
      });
      console.log(err);
    }
  };

  return (
    <>
      <Center style={{ width: "100%", height: "100%" }} bg="#f2f2f2">
        <Stack
          style={{
            width: "540px",
            height: "100vh",
            boxShadow:
              "0 4px 2px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
          }}
          bg="#77d5ae"
        >
          <Center bg="#88ffce" style={{ padding: "8px" }}>
            <b>DREAMS</b>
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
                  <h2>LOGIN</h2>
                </Center>
                <PhoneInput
                  defaultCountry="vn"
                  inputStyle={{ width: "100%" }}
                  key={form.key("phone")}
                  {...form.getInputProps("phone")}
                />
                <PasswordInput
                  size="md"
                  placeholder="Enter your password"
                  key={form.key("password")}
                  {...form.getInputProps("password")}
                  style={{ width: "100%" }}
                />
                <p>Forgot your password? Click here</p>
                <button
                  onClick={handleOnFormSubmit}
                  style={{
                    backgroundColor: "#ffffff",
                    borderRadius: "24px",
                    padding: "8px",
                    width: "100%",
                  }}
                  className="clickable"
                >
                  <b>Login</b>
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
                    Don't have an account yet? Sign up now
                  </Text>
                </Link>
              </Stack>
            </Container>
          </Container>
        </Stack>
      </Center>
    </>
  );
}

export default LoginPage;
