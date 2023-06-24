import defaultImg from "@assets/defaultImg.png"
import styled from "@emotion/styled"

export const Thumnail = ( props ) => {

  const ImageErrorHandler = (e) => {
    e.target.src = defaultImg
  }
  return (
    <>
    <ImgContainer>
      <ImgHolder>
        <img 
        src={props.profileImg} 
        alt="profile image" 
        onError={ImageErrorHandler}/>
      </ImgHolder>
    </ImgContainer>
    <TxtContainer>
        <TxtHolder>
          <span className="username">{props.username}</span>
          <span className="uid">{props.uid}</span>
        </TxtHolder>
      </TxtContainer>
    </>
  )
}


const ImgContainer = styled.div`
  z-index:2;
  position: absolute;
  top: -6em;
  left: 50%;
  transform: translate(-50%, 50%);
  display: flex;
  justify-content: center;
  align-items: center;
`

const ImgHolder = styled.div`
  z-index: 2;
  width: 15em;
  height: 15em;
  background-color: #fff;
  border : 20px solid #fff;
  border-radius: 50%;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }
`
const TxtContainer = styled.div`
  z-index: 2;
  width: 200px;
  height: 100px;
  position: absolute;
  bottom: 6em;
  left: 50%;
  transform: translate(-50%, 50%);
  display: flex;
  justify-content: center;
  align-items: center;
`

const TxtHolder = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px 0;
  justify-content: space-between;
  text-align: center;
  width: 100px;
  height: 100%;

  .username{
    font-size: 1.6rem;
    font-weight: 800;
  }
  .uid{
    font-size: 1rem;
    font-weight: 400;
  }
`


export default Thumnail