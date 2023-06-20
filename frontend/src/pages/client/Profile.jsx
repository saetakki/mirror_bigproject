import styled from "@emotion/styled";
import profile from '@assets/profile.png'

const Profile = () => {
  return(
    <div className="profile-container">
      <ProfileWrapper>
        <MyProfile>My Profile</MyProfile>
        <Image>
          <ProfileImg  src={profile} alt="profile-image" />
          <ImgEditButton>Edit</ImgEditButton>
        </Image>
        <UserInfo>
          <UserName> USERNAME : a111111 </UserName>
          <Email> EMAIL : a1111@kt.com </Email>
          <Password> PASSWORD : ******  </Password>
          <RealName> REALNAME : 민호 </RealName>
          <UserEditButton>Edit</UserEditButton>
        </UserInfo>
      </ProfileWrapper>
    </div>
  )
}


const ProfileWrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const MyProfile = styled.section`
  width: 100%;
  height: 50px;
  display: flex;
  font-weight: bold;
  margin: 30px;
  margin-left: 100px;
`


const Image = styled.section`
  width: 100%;
  height: 200px;
  display: flex;
  flex-direction: column;
  margin-left: 200px;
`

const UserInfo = styled.section`
  width: 100%;
  height: 200px;
  display: flex;
  flex-direction: column;
  margin-left: 200px;
`

const ProfileImg = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: #000;
  margin-right: 10px;
  margin-bottom: 10px;
  object-fit: cover;
  object-position: center;
`

const UserName = styled.div`
  font-size: 12px;
  color: #9a9a9a;
  height: 50px;
`

const Email = styled.div`
  font-size: 12px;
  color: #9a9a9a;
  height: 50px;
`

const Password = styled.div`
  font-size: 12px;
  color: #9a9a9a;
  height: 50px;
`

const RealName = styled.div`
  font-size: 12px;
  color: #9a9a9a;
  height: 50px;
`


const ImgEditButton = styled.button`
  width: 45px;
  height: 30px;
  background-color: #000;
  color: #fff;
  border-radius: 5px;
  margin-left: 70%;
`

const UserEditButton = styled.button`
  width: 45px;
  height: 30px;
  background-color: #000;
  color: #fff;
  border-radius: 5px;
  margin-left: 70%;
`

export default Profile