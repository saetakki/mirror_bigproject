import styled from "@emotion/styled";
import React, { useState } from 'react';
import './Profile.css';


function ProfilePage() {
  // 프로필 데이터와 편집 모드를 관리하는 상태
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    username: 'username',
    password: '123456@',
    email: 'email@example.com',
    real_name: 'real_name',
    profile_Image: 'https://www.pngarts.com/files/10/Default-Profile-Picture-PNG-Download-Image.png',
  });

  // Edit 버튼을 클릭하면 편집 모드로 전환하는 함수
  const handleEditClick = () => {
    if (isEditing == false) {
      setIsEditing(true);
    } else {
      setIsEditing(false);
    }


  };

  // 입력 값이 변경될 때마다 프로필 데이터를 업데이트하는 함수
  const handleInputChange = (e) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value,
    });
  };

  const [profileFiles, setProfileFiles] = useState(null); // 프로필 이미지 파일 상태
  const [profileImage, setProfileImage] = useState(null); // 프로필 이미지 URL 상태
  const [user, setUser] = useState({ profileImg: profileData.profile_Image }); //기본 프로필 이미지 경로 설정 (임시 값)
  console.log(profileData.profile_Image)

  const profileChange = e => {
    if (e.target.files[0]) {
      setProfileFiles(e.target.files[0]); // 파일이 선택되면 프로필 이미지 파일 상태 업데이트
    }
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setProfileImage(reader.result); // 파일 리더가 로드될 때 프로필 이미지 URL 상태 업데이트
      }
    };
    reader.readAsDataURL(e.target.files[0]); // 선택한 파일을 데이터 URL로 읽기
  };

  return (
    <div className="profile">
      <div className="profileimgdiv">
        <img className="profileimg" src={profileImage || user.profileImg} alt="Profile" />
        <label for="inputimgid">
          <div class="btn-upload">Edit</div>
        </label>
        <input className="inputimg" id="inputimgid" name="inputimgid" type="file" onChange={profileChange} />
        <h1>{profileData.real_name}</h1>
      </div>

      <div className="information">
        {isEditing ? (
          // 편집 모드인 경우에는 입력 필드를 표시
          <>
            <p>
              이름 :{' '}
              <input
                type="text"
                name="real_name"
                className="editinput"
                value={profileData.real_name}
                onChange={handleInputChange}
              />
            </p>
            <p>
              이메일 :{' '}
              <input
                type="email"
                name="email"
                className="editinput"
                value={profileData.email}
                onChange={handleInputChange}
              />
            </p>
            <p>
              아이디 :{' '}
              <input
                type="text"
                name="username"
                className="editinput"
                value={profileData.username}
                onChange={handleInputChange}
              />
            </p>
            <p>
              비밀번호 :{' '}
              <input
                type="text"
                name="password"
                className="editinput"
                value={profileData.password}
                onChange={handleInputChange}
              />
            </p>
          </>
        ) : (
          // 편집 모드가 아닌 경우에는 정보를 표시
          <>
            <p>이름 : {profileData.real_name}</p>
            <p>이메일 : {profileData.email}</p>
            <p>아이디 : {profileData.username}</p>
            <p>비밀번호 : {profileData.password}</p>
          </>
        )}
        <button className="editinfo" onClick={handleEditClick}>{isEditing ? 'Save' : 'Edit'}</button>
      </div>
    </div>
  );
}

export default ProfilePage;