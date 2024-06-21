import Header from "../component/Header";
import { Box, Button, Center, NumberInput, Stack } from "@mantine/core";
import { useAppDispatch, useAppSelector } from "../hooks/store";
import { useForm } from "@mantine/form";
import Swal from "sweetalert2";
import { getToken } from "../utils/helpers";
import axios from "../services/api";
import { setUser } from "../features/user/userSlice";
import { useNavigate } from "react-router-dom";

const WithdrawPointPage = () => {
  const { user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      amount: 0,
    },
  });

  const handleOnFormSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    const amount = form.getValues().amount;

    if (!user) {
      Swal.fire({
        icon: "error",
        text: "Không tìm thấy người dùng",
        confirmButtonColor: "#6EE3A5",
      });
      return;
    }
    if (!(user.accountHolder && user.accountNumber && user.bankName)) {
      Swal.fire({
        icon: "error",
        text: "vui lòng điền thông tin ngân hàng trước",
        confirmButtonColor: "#6EE3A5",
      });
      navigate("/app/bank_account");
      return;
    }
    if (amount < 1) {
      Swal.fire({
        icon: "error",
        text: "Rút tiền phải lớn hơn 0",
        confirmButtonColor: "#6EE3A5",
      });
      return;
    }
    if (amount > user.point) {
      Swal.fire({
        icon: "error",
        text: "Rút tiền không được vượt quá điểm của người dùng",
        confirmButtonColor: "#6EE3A5",
      });
      return;
    }
    try {
      const token = getToken();
      await axios.post(
        `/users/${user.id}/transactions`,
        {
          amount: -amount,
          status: "pending",
          method: "withdraw",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      Swal.fire({
        icon: "success",
        text: "Tạo yêu cầu rút tiền thành công",
        confirmButtonColor: "#6EE3A5",
        timer: 2000,
      });

      const res = await axios.get(`/users/${user.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const { result } = res.data;

      localStorage.setItem("token", result.token);

      dispatch(
        setUser({
          id: result.id,
          phone: result.phone,
          point: result.point,
          role: result.role,
          bankName: result.bankName,
          accountNumber: result.accountNumber,
          accountHolder: result.accountHolder,
          canUpdatePassword: result.canUpdatePassword,
          canUpdateBankName: result.canUpdateBankName,
          canUpdateAccountNumber: result.canUpdateAccountNumber,
          canUpdateAccountHolder: result.canUpdateAccountHolder
        })
      );
    } catch (err) {
      Swal.fire({
        icon: "error",
        text: "Không thể tạo yêu cầu rút tiền thành công",
        confirmButtonColor: "#6EE3A5",
      });
      console.log(err);
    }
  };
  return (
    <>
      <Header title="Rút điểm" />
      <Stack style={{ padding: "20px 24px 0px 24px" }}>
        <Box>
          <p style={{ margin: "0px" }}>Số điểm hiện có: {user?.point.toLocaleString()} đ</p>
          <NumberInput
            placeholder="Nhập số điểm cần rút"
            withAsterisk
            allowNegative={false}
            allowDecimal={false}
            key={form.key("amount")}
            {...form.getInputProps("amount")}
          />
        </Box>
        <Center>
          <Button
            onClick={(e) => handleOnFormSubmit(e)}
            variant="gradient"
            style={{ paddingLeft: "25px", paddingRight: "25px" }}
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

export default WithdrawPointPage;
