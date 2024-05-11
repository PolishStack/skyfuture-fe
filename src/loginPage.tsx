import "./App.css";
import {
  Center,
  Container,
  Image,
  Input,
  PasswordInput,
  Stack,
} from "@mantine/core";

function App() {
  return (
    <>
      <Center style={{ width: "100%", height: "100%" }}>
        <Stack style={{ width: "540px", height: "100vh" }} bg={"#77d5ae"}>
          <Center bg={"#88ffce"} style={{ padding: "5px" }}>
            <b>DREAMS</b>
          </Center>
          <Center>
            <Image src="./logo.png" alt="logo" height={"254px"} />
          </Center>
          <Container style={{ width: "100%", padding: "30px" }}>
            <Container
              bg={"#ffffff"}
              style={{
                width: "100%",
                borderRadius: "12px",
                border: "solid 2px black",
              }}
            >
              <Stack style={{ padding: "20px" }}>
                <Center>
                  <h2>LOG</h2>
                </Center>
                <Input
                  placeholder="Enter your phone number"
                  style={{ width: "100%" }}
                  leftSection={<h4>+84</h4>}
                />
                <PasswordInput
                  placeholder="Enter your password"
                  style={{ width: "100%" }}
                />
                <p>Forgot your password? Click here</p>
                <button style={{ backgroundColor: "#ffffff", borderRadius: "24px", padding: "12px"}}>
                  <b>Log</b>
                </button>
                <button style={{ backgroundColor: "#ffffff", borderRadius: "24px", padding: "12px"}}>
                  <b>Don't have an account yet? Sign up now</b>
                </button>
              </Stack>
            </Container>
          </Container>
        </Stack>
      </Center>
    </>
  );
}

export default App;
