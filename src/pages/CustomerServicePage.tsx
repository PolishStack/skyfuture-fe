import { Skeleton } from "@mantine/core";
import Header from "../component/Header";

const CustomerServicePage = () => {
  return (
    <>
      <Skeleton height="100vh" width="100%" pos="absolute" />
      <iframe
        src={import.meta.env.VITE_CHAT_URL}
        style={{
          width: "calc(100% + 6px)",
          height: "calc(100vh - 60px - 38px)",
          position: "fixed",
          top: "41px",
          transform:"translateX(-3px)",
          maxWidth:"546px"
        }}
      />
      <Header title="Chăm Sóc Khách Hàng" position="fixed" />
    </>
  );
};

export default CustomerServicePage;
