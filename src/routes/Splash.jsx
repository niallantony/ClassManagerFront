import { useState } from "react"
import styled from 'styled-components'
import { SignUp } from "./SignUp"
import { Login } from "./Login"
import { Button, MainButton } from "../components/Button"
import { Slider } from "../components/Slider"
import { ButtonContainer } from "../components/ButtonContainer"

const SplashFrame = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    border: solid 1px ${props => props.theme.accent};
    border-radius: 10px;
    height: fit-content;
    padding: 0;
    align-self: center;
    background-color: ${props => props.theme.light};
    box-shadow: 0 4px 10px rgba(0,0,0,0.1);
`

const BackSplash = styled.div`
    width: 100%;
    background-color: ${props => props.theme.light};
    background-image:
        linear-gradient(to right, ${props => props.theme.accent}, transparent 1px),
        linear-gradient(to bottom, ${props => props.theme.light2}, transparent 1px);
    background-size: 20px 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
`

const Header = styled.h1`
    color: ${props => props.theme.accent};
    margin: 2rem
    `

export function Splash() {
  const [visible, setVisible] = useState(1)

  return (
    <BackSplash>
      <SplashFrame>
        <Header>
          ClassRoom
        </Header>
        <Slider height={visible === 0 ? '290' :
          visible === 1 ? '120' :
            '540'
        } width='520' visible={visible}>
          <SignUp onCancel={() => setVisible(1)} />
          <ButtonContainer>
            <MainButton onClick={() => setVisible(0)} >Log in</MainButton>
            <Button onClick={() => setVisible(2)} >Sign Up</Button>
          </ButtonContainer>
          <Login onCancel={() => setVisible(1)} />
        </Slider>
      </SplashFrame>
    </BackSplash>
  )
}
