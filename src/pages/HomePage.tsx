import {
  Center,
  Container,
  Flex,
  Image,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { useAppSelector } from "../hooks/store";
// import { useEffect } from "react";
// import axios from "axios";
// import { apiUrl } from "../config";
// import { useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";

const HomePage = () => {
  // const navigate = useNavigate()
  const { user, point: userPoint } = useAppSelector((state) => state.user);

  // useEffect(() => {
  //   const auth = async () => {
  //     try {
  //       await axios.get(`${apiUrl}/auth`, { withCredentials: true })
  //     } catch (err) {
  //       Swal.fire({
  //         icon: "error",
  //         text: "Time out login again",
  //         confirmButtonColor: "#6EE3A5",
  //       })
  //       navigate("/")
  //       console.log(err)
  //     }
  //   }
  //   auth()
  // }, [navigate])

  return (
    <Stack bg="#77d5ae">
      <Center bg="#88ffce" style={{ padding: "8px" }}>
        <b>DREAMS</b>
      </Center>
      <Container style={{ width: "100%" }}>
        <Flex justify="space-between">
          <Flex>
            <Text style={{ fontSize: "14px" }}>ID: {user?.id}</Text>
          </Flex>
          <Flex>
            <Text style={{ fontSize: "14px" }}>
              Number of points: {userPoint}
            </Text>
          </Flex>
        </Flex>
      </Container>
      <Flex justify="center" style={{ margin: "0px" }}>
        <Title
          order={3}
          style={{ margin: "0px", marginTop: "8px", fontSize: "18px" }}
        >
          COORDINATION CENTER
        </Title>
      </Flex>
      <Container bg="white" style={{ padding: "20px" }}>
        <Stack>
          <Image src="/banner1.png" />
          <Image src="/banner2.png" />
          <Center>
            <Image src="/heart.png" width="200px" height="32px" />
          </Center>
        </Stack>
      </Container>
    </Stack>
  );
};

export default HomePage;
