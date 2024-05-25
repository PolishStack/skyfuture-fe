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

const HomePage = () => {
  const { user, point: userPoint } = useAppSelector((state) => state.user);

  return (
    <Stack bg="#77d5ae">
      <Center bg="#88ffce" style={{ padding: "8px" }}>
        <b>SKYFUTURE</b>
      </Center>
      <Container style={{ width: "100%" }}>
        <Flex justify="space-between">
          <Flex>
            <Text style={{ fontSize: "14px" }}>ID: {user?.id.substring(0, 5)}</Text>
          </Flex>
          <Flex>
            <Text style={{ fontSize: "14px" }}>
              Số điểm: {userPoint}
            </Text>
          </Flex>
        </Flex>
      </Container>
      <Flex justify="center" style={{ margin: "0px" }}>
        <Title
          order={3}
          style={{ margin: "0px", marginTop: "8px", fontSize: "18px" }}
        >
          TRUNG TÂM ĐIỀU PHỐI
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
