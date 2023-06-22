import styled from "@emotion/styled";
import React, { useState, useRef, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive'
import { Container } from "@styles"

function ProfilePage() {
  //백엔드에서 넘어온 데이터 저장
  /*
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get('/profile');
        const data = response.data;
        profileData.current.username = data.user.username;
        profileData.current.email = data.user.email;
        profileData.current.password = data.user.userpassword;
        profileData.current.real_name = data.real_name;
        profileImgData.current.profile_Image = data.profile_image;
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };

    fetchProfileData();
  }, []);
  */

  //image 데이터
  const profileImgData = useRef({
    profile_Image: 'https://www.pngarts.com/files/10/Default-Profile-Picture-PNG-Download-Image.png'
  });

  //information 데이터
  const profileData = useRef({
    username: 'username',
    password: '123456@',
    email: 'email@example.com',
    real_name: 'real_name',
  });


  //프로필 이미지의 Edit, Save 모드를 관리하는 훅
  const [isImgEditing, setIsImgEditing] = useState(false);

  //이미지 Edit 버튼을 눌렀을 때 동작 함수
  const handleImgEditClick = (e) => {
    if (isImgEditing) {
      // 이미지 선택 후 Save 버튼을 눌렀을 때의 동작
      setIsImgEditing(false); //이미지 버튼을 Edit로 변경
      e.preventDefault(); // Save를 클릭했을 때 또 파일 선택 창이 뜨지 않도록 함
      alert('프로필 사진이 변경 되었습니다.')
      //이미지를 백으로 보내는 로직...
      console.log('백으로 변경된 Profile 이미지 보내는 함수');

    } else {
      //이미지 Edit 버튼을 눌렀을 때의 동작
      setIsImgEditing(true); //이미지 버튼을 Save로 변경
    }
  };

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
    profileData.current = {
      ...profileData.current,
      [name]: value,
    };
  };

  //프로필 이미지 설정
  const [profileImage, setProfileImage] = useState(profileImgData.current.profile_Image);
  console.log(profileImgData.profile_Image)

  //솔직히 뭔지 잘 모르겠음
  const profileChange = e => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setProfileImage(reader.result); // 파일 리더가 로드될 때 프로필 이미지 URL 상태 업데이트
      }
    };
    reader.readAsDataURL(e.target.files[0]); // 선택한 파일을 데이터 URL로 읽기
  };

  //회원탈퇴 버튼 클릭했을 때 실행 함수
  /* const handleDelete = async () => {
    const confirmed = window.confirm('정말로 삭제하시겠습니까?');
    if (confirmed) {
      try {
        const response = await axios.delete('/delete', {
          // 필요한 경우 요청에 대한 헤더 설정을 추가하세요
        });
        console.log('Delete request successful:', response.data);
      } catch (error) {
        console.error('Error deleting:', error);
      }
    }
  }; Delete 버튼 누를시 동작하는 것*/

  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });

  return (

    <ProfileWrapper>
      {!isMobile
        ? (<ProfileImgDiv>
          <ProfileImg src={profileImage} alt="Profile" />
          <label htmlFor="inputimgid"><EditSaveDiv>{isImgEditing ? 'Save' : 'Edit'}</EditSaveDiv></label>
          <ImageUploadBtn id="inputimgid" type="file" onClick={handleImgEditClick} onChange={profileChange} />
          <RealName>{profileData.current.real_name}</RealName>
        </ProfileImgDiv>) :
        (<MProfileImgDiv>
          <MProfileImg src={profileImage} alt="Profile" />
          <h1>{profileData.current.real_name}</h1>
          <label htmlFor="inputimgid"><MEditSaveDiv>{isImgEditing ? 'Save' : 'Edit'}</MEditSaveDiv></label>
          <MImageUploadBtn id="inputimgid" type="file" onClick={handleImgEditClick} onChange={profileChange} />
        </MProfileImgDiv>)}
      {!isMobile
        ? (<Information>
          {isEditing ? (
            // 편집 모드인 경우에는 입력 필드를 표시
            <>
              <InfoText>이름 :{' '}<ChangeInfo type="text" name="real_name" defaultValue={profileData.current.real_name} onChange={handleInputChange} /></InfoText>
              <InfoText>이메일 :{' '}<ChangeInfo type="email" name="email" defaultValue={profileData.current.email} onChange={handleInputChange} /></InfoText>
              <InfoText>아이디 :{' '}<ChangeInfo type="text" name="username" defaultValue={profileData.current.username} onChange={handleInputChange} /></InfoText>
              <InfoText>비밀번호 :{' '}<ChangeInfo type="text" name="password" defaultValue={profileData.current.password} onChange={handleInputChange} /></InfoText>
            </>
          ) : (
            // 편집 모드가 아닌 경우에는 정보를 표시
            <>
              <InfoText>이름 : {profileData.current.real_name}</InfoText>
              <InfoText>이메일 : {profileData.current.email}</InfoText>
              <InfoText>아이디 : {profileData.current.username}</InfoText>
              <InfoText>비밀번호 : {profileData.current.password}</InfoText>
            </>
          )}
          <EditSaveBtn onClick={handleEditClick}>{isEditing ? 'Save' : 'Edit'}</EditSaveBtn>
        </Information>) :
        (<MInformation>
          {isEditing ? (
            // 편집 모드인 경우에는 입력 필드를 표시
            <>
              <InfoText>이름 :{' '}<ChangeInfo type="text" name="real_name" defaultValue={profileData.current.real_name} onChange={handleInputChange} /></InfoText>
              <InfoText>이메일 :{' '}<ChangeInfo type="email" name="email" defaultValue={profileData.current.email} onChange={handleInputChange} /></InfoText>
              <InfoText>아이디 :{' '}<ChangeInfo type="text" name="username" defaultValue={profileData.current.username} onChange={handleInputChange} /></InfoText>
              <InfoText>비밀번호 :{' '}<ChangeInfo type="text" name="password" defaultValue={profileData.current.password} onChange={handleInputChange} /></InfoText>
            </>
          ) : (
            // 편집 모드가 아닌 경우에는 정보를 표시
            <>
              <InfoText>이름 : {profileData.current.real_name}</InfoText>
              <InfoText>이메일 : {profileData.current.email}</InfoText>
              <InfoText>아이디 : {profileData.current.username}</InfoText>
              <InfoText>비밀번호 : {profileData.current.password.slice(0, Math.floor(profileData.current.password.length / 2))}</InfoText>
            </>
          )}
          <MEditSaveBtn onClick={handleEditClick}>{isEditing ? 'Save' : 'Edit'}</MEditSaveBtn>
        </MInformation>)}
      {!isMobile  
      ?(<DeleteDiv>
        <DeleteButton>회원탈퇴</DeleteButton>
      </DeleteDiv>):(<MDeleteDiv>
        <MDeleteButton>회원탈퇴</MDeleteButton>
      </MDeleteDiv>)}
    </ProfileWrapper>
  );
}


const RealName = styled.p`
  margin-bottom: 5px;
  align-items: center;
  justify-content: center;
  text-align: left;
  font-weight: bold;
  word-break: break-all;
`

const InfoText = styled.p`
  margin-bottom: 5px;
  align-items: center;
  justify-content: center;
  text-align: left;
  font-weight: bold;
  word-break: break-all;
`

const ProfileWrapper = styled.div`
  width: 55%;
  overflow-y : auto; 
  overflow-x : hidden;
  padding: 20px;   
  border-radius: 10px; 
`

const EditSaveDiv = styled.div`
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
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    background: rgb(77,77,77);
    color: #fff;
`

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

const ImageUploadBtn = styled.input`
  position: absolute;
  top: 10px;
  right: 0;
  cursor: pointer;  
  display: none;
`

const ProfileImg = styled.img`
  height: 200px;
  width: 200px;
  
  border-radius: 50%;
  margin-bottom: 20px;
`

const ProfileImgDiv = styled.div`
  border-bottom: 1px solid black;
  
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  position: relative;
`

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
  display: flex;
  align-items: center;
  justify-content: flex-end;
`
// 반응형
const MProfileImg = styled.img`
  height: 100px;
  width: 100px;
  
  border-radius: 50%;
`
const MImageUploadBtn = styled.input`
  cursor: pointer;  
  display: none;
`
const MProfileImgDiv = styled.div`
  border-bottom: 1px solid black;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`

const MEditSaveDiv = styled.div`
  font-size: 12px;
  cursor: pointer;
  width: 90px;
  height: 30px;
  background: #fff;
  border: 1px solid rgb(77,77,77);
  border-radius: 10px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    background: rgb(77,77,77);
    color: #fff;
`


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
  border-bottom: 1px solid black;
  
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
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
  height: 15%;
  width: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`

export default ProfilePage;