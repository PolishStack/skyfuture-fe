import "./App.css";
import { Center, Image, Stack } from "@mantine/core";

function App() {
  return (
    <>
      <Center style={{ width: "100%", height: "100%" }}>
        <Stack style={{ width: "540px", height: "100vh"}} bg={"#77d5ae"} >
          <Center bg={"#88ffce"} style={{ padding: "5px" }}>
            <b>DREAMS</b>
          </Center>
          <Center>
            <Image src="./logo.png" alt="logo" height={"254px"}/>
          </Center>
        </Stack>
      </Center>
    </>
  );
}

export default App;
