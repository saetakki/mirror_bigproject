import { useState } from "react"
import styled from "@emotion/styled"
import { useMediaQuery } from 'react-responsive'
import { PageHeader } from "@organisms"
import { Container } from "@styles"
import { useRecoilValue } from "recoil"
import { userInfoAtom } from "../../atoms"
import { Thumnail, InfoBox } from "@organisms"

const Profile = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { email, id, profile_img, real_name, username } = useRecoilValue(userInfoAtom)

  const profileChangeHandler = (e) => {
    e.preventDefault()
    setIsOpen(!isOpen)
  }
  
  const isMobile = useMediaQuery({query: "(max-width: 767px)"}); 

  return (
    <>
        <BodyContainer>
          <PageHeader page="프로필 설정" />
          <PageBody>
            <CardContainer className="card-container">
              <CardWrapper>
                <CardUpper />
                <CardLower />
                  <Thumnail 
                  profileImg={profile_img}
                  username={real_name}
                  uid={id}
                  />
              </CardWrapper>
            </CardContainer>
            {!isMobile 
            ? ( <InfoBox 
              email={email}
              username={username}
              uid={id}
            />) 
            : ( null ) }
          </PageBody>
          <ProfileEditBtn onClick={profileChangeHandler}>
            <button className='btn'>프로필 수정</button>
          </ProfileEditBtn>
        </BodyContainer>
    </>
  )
}

const BodyContainer = styled(Container)`
  height:100%;
`

const PageBody = styled.section`
  width: 100%;
  margin: 25px, auto;
  maring-bottom: 10px;
  margin-top: 25px;

`
const CardContainer = styled.div`
  margin-top: 50px;
  width: 80%;
  margin: 0 auto;
  height: 25em;
  border-radius: 30px;
  overflow: hidden;
  box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
  
`

const CardWrapper = styled.div`
  display: inline-block;
  border-radius: 30px 30px 0 0;
  overflow: hidden;
  position: relative;
  background-color: #e9e9e9;
  width: 100%;
  height: 25em;
`
const CardUpper = styled.div`
  background-color: aqua;
  width: 100%;
  height: 25em;
`
const CardLower = styled.div`
  z-index: 1;
  position: absolute;
  bottom: 0px;
  background-color: #fff;
  width: 100%;
  height: 15em;
  border-radius: 0 0 30px 30px;
`



const ProfileEditBtn = styled.div`

  margin-top: 40px;
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;

  .btn{
    width: 80%;
    height: 45px;
    font-family: 'Roboto', sans-serif;
    font-size: 16px;
    text-transform: uppercase;
    letter-spacing: 2.5px;
    font-weight: 500;
    color: #000;
    background-color: #fff;
    border: none;
    border-radius: 45px;
    box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease 0s;
    cursor: pointer;
    outline: none;
  }
  .btn:hover {
    background-color: #2EE59D;
    box-shadow: 0px 15px 20px rgba(46, 229, 157, 0.4);
    color: #fff;
    transform: translateY(-7px);
  }

`


export default Profile