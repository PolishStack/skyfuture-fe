import { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Card, Center, Flex, Group, Loader, Modal, SimpleGrid, Stack, Text, TextInput } from '@mantine/core';
import { getCurrentRound, getGameEndTime, getToken } from '../../utils/helpers';
import { gamesStartDateTime } from '../../config';
import Countdown from './Countdown';
import { SlArrowLeft } from 'react-icons/sl';
import { GamePendingType } from '../../services/api/type';
import axios from '../../services/api';
import { useDisclosure } from '@mantine/hooks';
import Swal from 'sweetalert2';
import { useForm } from '@mantine/form';
import { User } from '../../features/user/type';

interface GameBodyProps {
    gameNumber: number;
    left: string;
    right: string;
}

const ManageGameBody = ({ gameNumber, left, right }: GameBodyProps) => {
    const navigate = useNavigate();
    const availableRoomsId = [1, 2, 3];
    const { id } = useParams();
    const roomId = parseInt(id || "0")
    const [, setRoomNumberList] = useState<number[]>(() => [
        getCurrentRound(1, gamesStartDateTime[0]),
        getCurrentRound(2, gamesStartDateTime[1]),
        getCurrentRound(3, gamesStartDateTime[2]),
    ]);

    const intervalRef = useRef(false)  // 0 = false, 1 = true 
    const intervalId = useRef(-1)

    const [selectedGamePendingId, setSelectedGamePendingId] = useState(-1)
    const [selectedGamePending, setSelectedGame] = useState<GamePendingType | null>(null)
    const [gamePending, setGamePending] = useState<GamePendingType[] | null>(null);

    const [selectedUserId, setSelectedUserId] = useState(-1)
    const selectedUser = useRef<User | null>(null);


    const [deleteModalOpened, { open: deleteModalOpen, close: deleteModalClose }] = useDisclosure(false);
    const [editModalOpened, { open: editModalOpen, close: editModalClose }] = useDisclosure(false);

    const form = useForm({
        mode: "uncontrolled",
        initialValues: {
            side: false,
            label: "",
            amount: 0
        },
        validate: {
            amount: (value) => value > 0 ? null : "EN: amount must be greater than 0"
        }
    })

    useEffect(() => {
        if (!intervalRef.current) {
            intervalRef.current = true

            const token = getToken()

            intervalId.current = setInterval(async () => {
                const uri = `/game?roomId=${roomId}&rightWord=${right}&leftWord=${left}`
                const res = await axios.get(uri, {
                    headers: { Authorization: `Bearer ${token}` }
                }
                )
                const { result } = res.data

                setGamePending(result)
            }, 1000)
        }
    }, [left, right, roomId])

    const onTimerEnd = () => {
        setRoomNumberList((rnl) => {
            const newList = [...rnl];
            newList[roomId - 1] = getCurrentRound(
                roomId,
                gamesStartDateTime[roomId - 1]
            );
            return newList;
        });
    };

    const handleOnDeleteGamePending = async () => {
        if (selectedGamePending === null) {
            return Swal.fire({
                icon: "error",
                text: "Xử lý trò chơi đang chờ xử lý",
                confirmButtonColor: "#6ee3a5"
            })
        }

        try {
            const token = getToken()

            const res = await axios.get(`/users/${selectedUserId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            const { result } = res.data

            selectedUser.current = result;
        } catch (err) {
            console.error(err);

            return Swal.fire({
                icon: "error",
                text: "Xử lý trò chơi đang chờ xử lý",
                confirmButtonColor: "#6ee3a5"
            })
        }

        if (selectedUser.current === null) {
            return Swal.fire({
                icon: "error",
                text: "Chọn người dùng là nullk",
                confirmButtonColor: "#6ee3a5"
            })
        }

        try {
            const token = getToken()

            await axios.delete(`/game/${selectedGamePendingId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            await axios.put(`/users/${selectedUserId}`, {
                point: selectedUser.current.point + selectedGamePending.amount
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            Swal.fire({
                icon: "success",
                text: "Xóa trò chơi đang chờ thành công",
                confirmButtonColor: "#6ee3a5",
            })
        } catch (err) {
            console.error(err);

            Swal.fire({
                icon: "error",
                text: "Không thể xóa trò chơi đang chờ xử lý",
                confirmButtonColor: "#6ee3a5"
            })
        }
    }

    const handleOnSaveGamePending = async () => {
        if (selectedGamePending === null) {
            return Swal.fire({
                icon: "error",
                text: "Trò chơi đã chọn không có giá trị",
                confirmButtonColor: "#6ee3a5"
            })
        }

        try {
            const token = getToken()

            const res = await axios.get(`/users/${selectedUserId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            const { result } = res.data

            selectedUser.current = result;
        } catch (err) {
            console.error(err);

            return Swal.fire({
                icon: "error",
                text: "Không thể tải người dùng",
                confirmButtonColor: "#6ee3a5"
            })
        }

        if (selectedUser.current === null) {
            return Swal.fire({
                icon: "error",
                text: "Chọn người dùng là null",
                confirmButtonColor: "#6ee3a5"
            })
        }

        if (form.getValues().amount > selectedGamePending.amount) {
            if (form.getValues().amount - selectedGamePending.amount > selectedUser.current.point) {
                return Swal.fire({
                    icon: "error",
                    text: `Người dùng không có đủ điểm | điểm người dùng: ${selectedUser.current.point}, điểm đầu vào: ${form.getValues().amount - selectedGamePending.amount}`,
                    confirmButtonColor: "#6ee3a5"
                })
            } else if (form.getValues().amount - selectedGamePending.amount <= selectedUser.current.point) {
                try {
                    const token = getToken()

                    await axios.put(`/users/${selectedUserId}`, {
                        point: selectedUser.current.point - (form.getValues().amount - selectedGamePending.amount)
                    }, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    })
                } catch (err) {
                    console.error(err);

                    Swal.fire({
                        icon: "error",
                        text: "Không thể cập nhật điểm người dùng",
                    })
                }
            }
        } else if (form.getValues().amount < selectedGamePending.amount) {
            try {
                const token = getToken()

                await axios.put(`/users/${selectedUserId}`, {
                    point: selectedUser.current.point + (selectedGamePending.amount - form.getValues().amount)
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
            } catch (err) {
                console.error(err);

                Swal.fire({
                    icon: "error",
                    text: "Không thể cập nhật điểm người dùng",
                })
            }
        }

        try {
            const token = getToken()

            form.setFieldValue(
                "label",
                form.getValues().side === false ? left : right
            )

            const strAmount = form.getValues().amount.toString()
            const numAmount = parseInt(strAmount)
            form.setFieldValue("amount", numAmount)

            console.log(form.getValues())

            await axios.put(`/game/${selectedGamePendingId}`,
                form.getValues(), {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            Swal.fire({
                icon: "success",
                text: "Lưu trò chơi đang chờ dữ liệu thành công",
                confirmButtonColor: "#6ee3a5",
            })
        } catch (err) {
            console.error(err);

            Swal.fire({
                icon: "error",
                text: "Không lưu được dữ liệu đang chờ xử lý của trò chơi",
                confirmButtonColor: "#6ee3a5"
            })
        }
    }

    return (
        <div>
            {/* <Header title={`Manage game ${gameNumber}`}/> */}
            <Center
                h={44}
                bg="#87f3d9"
                style={{
                    padding: "8px",
                    fontSize: "18px",
                    position: "relative",
                }}
            >
                <SlArrowLeft
                    onClick={() => {
                        clearInterval(intervalId.current)
                        navigate("../manage-game")
                    }
                    }
                    size={"20px"}
                    style={{
                        position: "absolute",
                        left: "10px"
                    }}
                    className='clickable'
                />
                <b>Quản lý trò chơi {gameNumber}</b>
            </Center>
            <Group
                justify="space-around"
                w="100%"
                h={50}
                style={{ boxShadow: "0 2px 8px 0 #7c7c7c80" }}
            >
                {availableRoomsId.map((room, index) => (
                    <Button
                        key={index}
                        onClick={() => {
                            // clear data
                            clearInterval(intervalId.current)

                            intervalRef.current = false
                            intervalId.current = -1

                            setGamePending(null)
                            navigate(location.pathname.slice(0, -1) + room)
                        }
                        }
                        style={{
                            backgroundColor: roomId === room ? "#fa546f" : "#ecf5ff",
                            color: roomId === room ? "white" : "black",
                            border: roomId === room ? "none" : "1px solid #d6e8fe",
                            borderRadius: "8px",
                            fontSize: "15px",
                            fontWeight: "700",
                            width: "80px",
                            height: "32px",
                            boxSizing: "border-box",
                            padding: "0",
                            boxShadow: roomId === room ? "0 2px 4px 0 #00000080" : "",
                        }}
                    >
                        PHÒNG {room}
                    </Button>
                ))}
            </Group>
            <Center>
                <Group justify="space-between" px="35px">
                    <h3>ID phòng thời gian còn lại {id}</h3>
                    <Countdown
                        gameEndDateTime={getGameEndTime(
                            new Date(gamesStartDateTime[roomId - 1])
                        )}
                        onTimerEnd={onTimerEnd}
                    />
                </Group>
            </Center>
            {gamePending !== null ? (
                <>
                    {gamePending.length > 0 ? (
                        <SimpleGrid cols={{ base: 1, sm: 2 }} style={{ padding: "0px 24px 24px 24px" }}>
                            {gamePending.map((game) => (
                                <Card
                                    key={game.id}
                                    shadow="sm"
                                    padding="lg"
                                    radius="md"
                                    withBorder
                                >
                                    <Stack>
                                        <Text>User id: {game.userId}</Text>
                                        <Text>Side: {game.label}</Text>
                                        <Text>Amount: {game.amount}</Text>
                                        <Flex
                                            justify="end"
                                            gap={8}
                                        >
                                            <Button
                                                fullWidth
                                                color='red'
                                                onClick={() => {
                                                    setSelectedGame(game)
                                                    setSelectedGamePendingId(game.id)
                                                    setSelectedUserId(game.userId)

                                                    deleteModalOpen()
                                                }
                                                }
                                            >
                                                Xóa bỏ
                                            </Button>
                                            <Button
                                                fullWidth
                                                color='yellow'
                                                onClick={() => {
                                                    setSelectedGame(game)
                                                    setSelectedGamePendingId(game.id)
                                                    setSelectedUserId(game.userId)

                                                    form.setValues({
                                                        side: game.side,
                                                        amount: game.amount
                                                    })
                                                    editModalOpen()
                                                }}
                                            >
                                                Biên tập
                                            </Button>
                                        </Flex>
                                    </Stack>
                                </Card>
                            ))}
                        </SimpleGrid>
                    ) : (
                        <Center>
                            Không có trò chơi đang chờ hiển thị
                        </Center>
                    )}
                </>
            ) : (
                <Center>
                    <Loader color="teal" type="bars" />
                </Center>
            )}
            {/* Delete modal */}
            <Modal
                opened={deleteModalOpened}
                onClose={deleteModalClose}
                title="Xác nhận xóa"
                closeOnClickOutside={false}
                withCloseButton={false}
                centered
            >
                <Stack>
                    <p>quá trình này không thể hoàn tác, xác nhận xóa trò chơi này đang chờ xử lý, điểm sẽ được trả lại cho người dùng</p>
                    <Flex
                        justify={"end"}
                        gap={8}
                    >
                        <Button
                            color='gray'
                            onClick={deleteModalClose}
                        >
                            Hủy bỏ
                        </Button>
                        <Button
                            color='red'
                            onClick={() => {
                                deleteModalClose()
                                handleOnDeleteGamePending()
                            }}
                        >
                            Xóa bỏ
                        </Button>
                    </Flex>
                </Stack>
            </Modal>

            {/* Edit modal  */}
            <Modal
                opened={editModalOpened}
                onClose={editModalClose}
                title="Chỉnh sửa trò chơi đang chờ xử lý"
                closeOnClickOutside={false}
                withCloseButton={false}
                centered
            >
                <Stack>
                    <TextInput
                        type='number'
                        label="Số lượng"
                        description="Số tiền phải lớn hơn 0"
                        key={form.key("amount")}
                        min={1}
                        {...form.getInputProps("amount")}
                    />
                    <Flex>
                        <Button
                            fullWidth
                            onClick={() => form.setFieldValue("side", false)}
                            style={{
                                flexGrow: "1",
                                border:
                                    form.getValues().side === false
                                        ? "1px solid #88ffce"
                                        : "1px solid #e8ffea",
                                color: form.getValues().side === false ? "white" : "#f44336",
                                backgroundColor: form.getValues().side === false ? "#00AD13" : "#D4FED8",
                                height: "83px",
                                fontWeight: "700",
                                fontSize: "18px",
                            }}
                        >
                            {left}
                        </Button>
                        <Button
                            fullWidth
                            onClick={() => form.setFieldValue("side", true)}
                            style={{
                                flexGrow: "1",
                                border:
                                    form.getValues().side === true
                                        ? "1px solid #88ffce"
                                        : "1px solid #e8ffea",
                                color: form.getValues().side === true ? "white" : "#f44336",
                                backgroundColor: form.getValues().side === true ? "#00AD13" : "#D4FED8",
                                height: "83px",
                                fontWeight: "700",
                                fontSize: "18px",
                            }}
                        >
                            {right}
                        </Button>
                    </Flex>

                    <Flex
                        justify={"end"}
                        gap={8}
                    >
                        <Button
                            color='gray'
                            onClick={() => editModalClose()}
                        >
                            Hủy bỏ
                        </Button>
                        <Button
                            color='green'
                            onClick={() => {
                                editModalClose()
                                handleOnSaveGamePending()
                            }}
                        >
                            Cứu
                        </Button>
                    </Flex>
                </Stack>
            </Modal>
        </div>
    )
}

export default ManageGameBody