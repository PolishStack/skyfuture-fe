import { Skeleton } from "@mantine/core";
import Header from "../component/Header";

const CustomerServicePage = () => {
  return (
    <>
      <Skeleton height="100vh" width="100%" pos="absolute" />
      <iframe
        src="https://tawk.to/chat/66522c109a809f19fb352b7f/1huofo8nb"
        style={{
          width: "calc(100% + 5px)",
          height: "calc(100vh - 60px - 38px)",
          position: "absolute",
          top: "41px",
          left: "-2px",
        }}
      />
      <Header title="Chăm Sóc Khách Hàng" />
    </>
  );
};

export default CustomerServicePage;
