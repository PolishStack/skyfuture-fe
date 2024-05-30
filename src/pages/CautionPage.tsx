import { Box, List, Text } from "@mantine/core";
import Header from "../component/Header";

const CautionPage = () => {
  return (
    <>
      <Header
        title="QUY ĐỊNH
  "
      ></Header>
      <Box p="15px">
        <Text>
          SKYFUTURE nghiêm cấm mọi hình thức đặt cược gian lận, nếu bị phát hiện
          chúng tôi có quyền thu hồi tất cả số điểm thưởng và không có thông báo
          nào.
        </Text>
        <Text>
          Nếu quý khách có bất kỳ ý kiến hoặc kiến nghị nào vui lòng lựa chọn
          mục "CSKH" và để lại lời nhắn.
        </Text>
        <Text>
          Để đảm bảo trang web được hoạt động lâu dài cũng như bắt buộc duy trì
          các hoạt động thuế cho doanh nghiệp và nhà nước đối với các khách hàng
          tiến hành rút điểm từ trang web theo hạn mức dưới đây.
        </Text>
        <List w="calc(100% - 30px)">
          <List.Item>
            Hạn mức rút điểm tài khoản từ 1-200 triệu (tương ứng với 15% phí)
          </List.Item>
          <List.Item>
            Hạn mức rút điểm tài khoản từ 201-500 triệu (tương ứng với 20% phí)
          </List.Item>
          <List.Item>
            Hạn mức rút điểm tài khoản trên 500 triệu (tương ứng với 30% phí)
          </List.Item>
        </List>
      </Box>
    </>
  );
};

export default CautionPage;
