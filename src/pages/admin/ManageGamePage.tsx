import { Center, Container, Image, Stack } from '@mantine/core'
import { SlArrowLeft } from 'react-icons/sl'
import { useNavigate } from 'react-router-dom'

const ManageGamePage = () => {
  const navigate = useNavigate()

  const gameList = [
    { imageSrc: "/banner1.png", navigateTo: "game/1/1" },
    { imageSrc: "/banner2.png", navigateTo: "game/2/1" },
  ]

  return (
    <div>
      {/* <Header title='Manage game pending' /> */}
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
          onClick={() => navigate("../../individual")}
          size={"20px"}
          style={{
            position: "absolute",
            left: "10px"
          }}
          className='clickable'
        />
        <b>Quản lý trò chơi đang chờ xử lý</b>
      </Center>
      <Container bg="white" style={{ padding: "20px" }}>
        <Stack>
          <Center>
            <h3>Chọn trò chơi để kiểm tra</h3>
          </Center>
          {gameList.map((game, key) => (
            <Image
              key={key}
              src={game.imageSrc}
              onClick={() => navigate(game.navigateTo)}
              className='clickable'
            />
          ))}
          {/* <Image
            src="/banner1.png"
            onClick={() => navigate("game/1/1")}
            className="clickable"
          />
          <Image
            src="/banner2.png"
            onClick={() => navigate("game/2/1")}
            className="clickable"
          /> */}
        </Stack>
      </Container>
    </div>
  )
}

export default ManageGamePage