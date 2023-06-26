import styled from "@emotion/styled";
import initImage from "@assets/defaultImg.png";
import { PageHeader } from "@organisms";
import { useState } from 'react';
import { useMediaQuery } from 'react-responsive'
import { Container } from "@styles"
import {userInfoAtom } from '../../atoms'
import { useRecoilValue } from "recoil";

function ProfilePage() {

  // 유저 정보
  const userInfo = useRecoilValue(userInfoAtom);
  console.log(userInfo)

  // 프로필 이미지의 Edit, Save 모드를 관리하는 훅
  // const [isImgEditing, setIsImgEditing] = useState(false);

  // //이미지 Edit 버튼을 눌렀을 때 동작 함수
  // const handleImgEditClick = (e) => {
  //   if (isImgEditing) {
  //     // 이미지 선택 후 Save 버튼을 눌렀을 때의 동작
  //       e.preventDefault() // 이벤트 버블링 방지
  //       setIsImgEditing(false); //이미지 버튼을 Edit로 변경
  //       alert('프로필 사진이 변경 되었습니다.')
  //     //이미지를 백으로 보내는 로직...
  //     console.log('백으로 변경된 Profile 이미지 보내는 함수');
  //   } else {
  //     //이미지 Edit 버튼을 눌렀을 때의 동작
  //     setIsImgEditing(true); //이미지 버튼을 Save로 변경
  //   }
  // };

  //information의 Edit, Save 모드를 관리하는 훅
  const [isEditing, setIsEditing] = useState(false);

  //information의 Edit 버튼을 클릭하면 편집 모드로 전환하는 함수
  const handleEditClick = () => {
    setIsEditing(!isEditing);
    if (isEditing) {
      //information Save 버튼을 클릭하면 변경된 데이터를 백으로 보내는 로직...
      alert('개인정보가 변경 되었습니다.')
      console.log('백으로 변경된 information 보내는 함수');

    }
  };

  // Edit 모드에서 input 태그에 입력 값이 변경될 때마다 프로필 데이터를 업데이트하는 함수
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    userInfo.current = {
      ...userInfo,
      [name]: value,
    };
  };

  //프로필 이미지 설정
  // const [profileImage, setProfileImage] = useState(userInfo.profile_img);


  //프로필 이미지 변경
  // const profileChange = e => {
  //   // 파일을 읽기 위한 FileReader 인스턴스 생성
  //   const reader = new FileReader();
  //   // 파일이 선택되었을 때 호출되는 함수
  //   reader.onload = () => {
  //     // fileReader API의 state 2는 완료를 의미
  //     // 데이터를 모두 읽었다면
  //     if (reader.readyState === 2) {
  //       setProfileImage(reader.result); // 파일 리더가 로드될 때 프로필 이미지 URL 상태 업데이트
  //     }
  //   };
  //   reader.readAsDataURL(e.target.files[0]); // 선택한 파일을 데이터 URL로 읽기
  // };

  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });

  return (
      <Container>
        <ContainerWrapper>
          <PageHeader page="프로필 설정" />
          <ProfileImgContainer className="profileImgContainer">
            <div className='upper'>
            </div>
            <div className="lower">
              <div className='lower-container'>
                <div className='img-holder'>
                  <img src={initImage} alt="Profile" />
                </div>
                <div className='username-container'>
                  <span className="real-name">{userInfo.real_name}</span>
                  <span className='uid'>{userInfo.id}</span>
                </div>
              </div>
            </div>
          </ProfileImgContainer>

            
              {/* <ProfileImg src={profileImage} alt="Profile" />
                <label htmlFor="inputimgid">
                  <EditSaveDiv>
                    {isImgEditing ? 'Save' : 'Edit'}
                    </EditSaveDiv>
                  </label>
                <ImageUploadBtn id="inputimgid" type="file" onClick={handleImgEditClick} onChange={profileChange} /> */}
              {/* <UserNameContainer>
                <div className='lower'>
                  <div>{userInfo.username}</div>
                  <div>{userInfo.id}</div>
                </div>
              </UserNameContainer> */}
              {/* <RealName>{userInfo.id}</RealName> */}
            {!isMobile
              ? (<Information>
                {isEditing ? (
                  // 편집 모드인 경우에는 입력 필드를 표시
                  <>
                    <InfoText>이름 :{' '}<ChangeInfo type="text" name="real_name" defaultValue={userInfo.real_name} onChange={handleInputChange} /></InfoText>
                    <InfoText>이메일 :{' '}<ChangeInfo type="email" name="email" defaultValue={userInfo.email} onChange={handleInputChange} /></InfoText>
                    <InfoText>아이디 :{' '}<ChangeInfo type="text" name="username" defaultValue={userInfo.username} onChange={handleInputChange} /></InfoText>
                    <InfoText>비밀번호 :{' '}<ChangeInfo type="text" name="password" defaultValue={userInfo.password} onChange={handleInputChange} /></InfoText>
                  </>
                ) : (
                  // 편집 모드가 아닌 경우에는 정보를 표시
                  <>
                    <InfoText>이름 : {userInfo.real_name}</InfoText>
                    <InfoText>이메일 : {userInfo.email}</InfoText>
                    <InfoText>아이디 : {userInfo.username}</InfoText>
                    <InfoText>비밀번호 : {userInfo.password}</InfoText>
                  </>
                )}
                <EditSaveBtn onClick={handleEditClick}>{isEditing ? 'Save' : 'Edit'}</EditSaveBtn>
              </Information>) :
              (<MInformation>
                {isEditing ? (
                  // 편집 모드인 경우에는 입력 필드를 표시
                  <>
                    <InfoText>이름 :{' '}<ChangeInfo type="text" name="real_name" defaultValue={userInfo.real_name} onChange={handleInputChange} /></InfoText>
                    <InfoText>이메일 :{' '}<ChangeInfo type="email" name="email" defaultValue={userInfo.email} onChange={handleInputChange} /></InfoText>
                    <InfoText>아이디 :{' '}<ChangeInfo type="text" name="username" defaultValue={userInfo.username} onChange={handleInputChange} /></InfoText>
                    <InfoText>비밀번호 :{' '}<ChangeInfo type="text" name="password" defaultValue={userInfo.password} onChange={handleInputChange} /></InfoText>
                  </>
                ) : (
                  // 편집 모드가 아닌 경우에는 정보를 표시
                  <>
                    <InfoText>이름 : {userInfo.real_name}</InfoText>
                    <InfoText>이메일 : {userInfo.email}</InfoText>
                    <InfoText>아이디 : {userInfo.username}</InfoText>
                    <InfoText>비밀번호 : {userInfo.password}</InfoText>
                  </>
                )}
                <MEditSaveBtn onClick={handleEditClick}>{isEditing ? 'Save' : 'Edit'}</MEditSaveBtn>
              </MInformation>)}
            {!isMobile  
            ?(
            <DeleteDiv>
              <DeleteButton>회원탈퇴</DeleteButton>
            </DeleteDiv>)
            :(
              <MDeleteDiv>
                <MDeleteButton>회원탈퇴</MDeleteButton>
              </MDeleteDiv>
              )}
        </ContainerWrapper>
      </Container>
  );
}

const ProfileImgContainer = styled(Container)`
  height: 300px;

  .upper{
    position: relative;
    height: 100px;
    border-radius: 5px 5px 0 0;
  }

  .lower{
    height: 8rem;
    background-color: #d8d8d8;
  }

  .lower-container{
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    top: -3rem;
  }

  .img-holder {
    width: 160px;
    height: 160px;
    display:flex;
    justify-content: center;
    align-items: center;
    position: relative;
    top: -2rem;
    left: 0;
    border-radius: 50%;
    border: 20px solid #fff
  }

  .username-container{
    display:flex;
    flex-direction: column;
    justify-content: space-envenly;
    align-items: flex-end;
    margin-top: 4em;
  }

  .real-name{
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom:12px;
  }

  .uid {
    font-size: 14px;
    font-weight: 400;
    color: #777;
  }

  img{
    width: 140px;
    height: 140px;
    border-radius: 50%;
    background-color: #fff
}
`
const ContainerWrapper = styled.div`
  width: 100%;
  height: 50%;
  margin: 0 auto 42px auto;
`;

const InfoText = styled.p`
  margin-bottom: 5px;
  align-items: center;
  justify-content: center;
  text-align: left;
  font-weight: bold;
  word-break: break-all;
`


// const EditSaveDiv = styled.div`
//   font-size: 12px;
//   position: absolute;
//   top: 10px;
//   right: 10px;
//   cursor: pointer;
//   width: 100px;
//   height: 30px;
//   background: #fff;
//   border: 1px solid rgb(77,77,77);
//   border-radius: 10px;
//   font-weight: 500;
//   cursor: pointer;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   &:hover {
//     background: rgb(77,77,77);
//     color: #fff;
// `

const EditSaveBtn = styled.button`
  font-size: 12px;
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  width: 100px;
  height: 30px;
  background: #fff;
  border: 1px solid rgb(77,77,77);
  border-radius: 10px;
  font-weight: 500;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  &:hover {
    background: rgb(77,77,77);
    color: #fff;
  }
`

// const ImageUploadBtn = styled.input`
//   position: absolute;
//   top: 10px;
//   right: 0;
//   cursor: pointer;  
//   display: none;
// `

// const ProfileImg = styled.img`
//   height: 200px;
//   width: 200px;
  
//   border-radius: 50%;
//   margin-bottom: 20px;
// `

// const ProfileImgDiv = styled.div`
//   border-bottom: 1px solid black;
  
//   padding: 20px;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
//   text-align: center;
//   position: relative;
// `

const Information = styled.div`
  position: relative;
  border-bottom: 1px solid black;
  
  padding: 20px;
  display: flex;
  flex-direction: column;
`

const ChangeInfo = styled.input`
  border: 1px solid black;
  padding: 5px;
`

const DeleteButton = styled.button`
  margin-top: 15px;
  margin-right: 10px;
  font-size: 12px;
  cursor: pointer;
  width: 100px;
  height: 30px;
  background: #fff;
  border: 1px solid rgb(77,77,77);
  border-radius: 10px;
  font-weight: 500;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  &:hover {
    background: rgb(77,77,77);
    color: #fff;
  }
`

const DeleteDiv = styled.div`

`
// 반응형
// const MProfileImg = styled.img`
//   height: 100px;
//   width: 100px;
  
//   border-radius: 50%;
// `
// const MImageUploadBtn = styled.input`
//   cursor: pointer;  
//   display: none;
// `
// const MProfileImgDiv = styled.div`
//   border-bottom: 1px solid black;
//   padding: 20px;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
//   text-align: center;
// `

// const MEditSaveDiv = styled.div`
//   font-size: 12px;
//   cursor: pointer;
//   width: 90px;
//   height: 30px;
//   background: #fff;
//   border: 1px solid rgb(77,77,77);
//   border-radius: 10px;
//   font-weight: 500;
//   cursor: pointer;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   &:hover {
//     background: rgb(77,77,77);
//     color: #fff;
// `


const MEditSaveBtn = styled.button`
  margin: 0px
  font-size: 12px;
  cursor: pointer;
  width: 100px;
  height: 30px;
  background: #fff;
  border: 1px solid rgb(77,77,77);
  border-radius: 10px;
  font-weight: 500;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  &:hover {
    background: rgb(77,77,77);
    color: #fff;
  }
`

const MInformation = styled.div`
  height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid black;
  
`
const MDeleteButton = styled.button`
  font-size: 12px;
  cursor: pointer;
  width: 100px;
  height: 30px;
  background: #fff;
  border: 1px solid rgb(77,77,77);
  border-radius: 10px;
  font-weight: 500;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  &:hover {
    background: rgb(77,77,77);
    color: #fff;
  }
`

const MDeleteDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  height: 60px;
`

export default ProfilePage;