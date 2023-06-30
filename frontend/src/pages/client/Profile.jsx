import { useState, useRef } from "react"
import styled from "@emotion/styled"
import { useMediaQuery } from 'react-responsive'
import { PageHeader } from "@organisms"
import { Container } from "@styles"
import { useRecoilValue } from "recoil"
import { userInfoAtom } from "../../atoms"
import { Thumnail, InfoBox } from "@organisms"



const Profile = () => {
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

  const [isOpen, setIsOpen] = useState(false)
  const { email, id, profile_img, real_name, username } = useRecoilValue(userInfoAtom)

  console.log(email, id, profile_img, real_name, username )
  const [mode, setMode] = useState('Profile')

  const [editedInfo, setEditedInfo] = useState({
    editedRealName: real_name,
    editedEmail: email,
    editedPassword: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // 탈퇴 제출 
  const deletehandleSubmit = (e) => {
    e.preventDefault();
  
    setIsOpen(false);
    alert('완료되었습니다!');
  };

  // 프로필 수정 제출 e.target.editedRealName e.target.editedEmail e.target.editedPassword
  const profilehandleSubmit = (e) => {
    e.preventDefault();
  
    setIsOpen(false);
    alert('완료되었습니다!');
  };

  
  const profileChangeHandler = (e) => {
    e.preventDefault();
    setMode('Profile');
    setIsOpen(!isOpen);
  }

  const DeleteChangeHandler = (e) => {
    e.preventDefault();
    setMode('Delete');
    setIsOpen(!isOpen);
  }
  
  const imageChangeHandler = (e) => {
    e.preventDefault();
    // 이미지 수정 로직을 추가하세요.
  };

  // 여기부터 이미지 테스트
  const profileImgData = useRef({
    profile_Image: 'https://www.pngarts.com/files/10/Default-Profile-Picture-PNG-Download-Image.png'
  });

  const profileData = useRef({
      username: 'a0000',
      password: '123456@',
      email: 'email@example.com',
      real_name: '김애옹',
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

    

  //프로필 이미지 설정
  const [profileImage, setProfileImage] = useState(profileImgData.current.profile_Image);
  console.log(profileImgData.profile_Image)

  const profileChange = e => {
    const reader = new FileReader();
    reader.onload = () => {
    if (reader.readyState === 2) {
        setProfileImage(reader.result); // 파일 리더가 로드될 때 프로필 이미지 URL 상태 업데이트
      }
    };
      reader.readAsDataURL(e.target.files[0]); // 선택한 파일을 데이터 URL로 읽기
    };

  //information의 Edit, Save 모드를 관리하는 훅
  const [isEditing, setIsEditing] = useState(false);

  

  const isMobile = useMediaQuery({query: "(max-width: 767px)"}); 

  return (
    <Container>
        <GridContainer>
            <GridPageHeaderWrap>
              <Head>
                <strong>PROFILE</strong>
                <Quotes>
                  <span>{profileData.current.username}님의 프로필 설정 페이지 입니다. </span>
                </Quotes>
              </Head>
            </GridPageHeaderWrap>
            
            <ProfileContainer>
              <PageHeader page="프로필 설정" />
              <PageBody>
                <CardContainer className="card-container">
                  <CardWrapper>
                    
                    <ProfileImgDiv>
                    <ProfileImg src={profileImage} alt="Profile" />
                    <label htmlFor="inputimgid"><EditSaveDiv>{isImgEditing ? '저장' : '이미지 수정'}</EditSaveDiv></label>
                    <ImageUploadBtn id="inputimgid" type="file" onClick={handleImgEditClick} onChange={profileChange} />
                    <RealName>{profileData.current.real_name}</RealName>
                    </ProfileImgDiv>                     
                  </CardWrapper>                  
                </CardContainer>               
              </PageBody>


              <ProfileEditBtn onClick={profileChangeHandler}>
                <button className='btn'>프로필 수정</button>
              </ProfileEditBtn>
              
              {isOpen && mode === 'Profile' && (
              <EditFormContainer>
                <EditFormWrapper>
                  <Dtext>프로필 수정</Dtext>
                  <form onSubmit={profilehandleSubmit}>
                      <InfoTextWrap>
                        <InfoText>이 름 :{' '}<ChangeInfo1 type="text" name="real_name" defaultValue={profileData.current.real_name} onChange={handleInputChange} /></InfoText>
                        <InfoText>이메일 :{' '}<ChangeInfo2 type="email" name="email" defaultValue={profileData.current.email} onChange={handleInputChange} /></InfoText>
                        <InfoText>비밀번호 :{' '}<ChangeInfo3 type="text" name="password" defaultValue={profileData.current.password} onChange={handleInputChange} /></InfoText>
                      </InfoTextWrap>
                    <button type="submit">저장</button>
                  </form>
                </EditFormWrapper>
              </EditFormContainer>
              )}
              
              {isOpen && mode === 'Delete' && (
              <EditFormContainer>
                <DeleteFormWrapper>
                  <Dtext>회원탈퇴</Dtext>
                  <form onSubmit={deletehandleSubmit}>
                    <Dtext1>'정말로 탈퇴 하시겠습니까?'</Dtext1>
                    <button type="submit">확인</button>
                  </form>
                </DeleteFormWrapper>

                

              </EditFormContainer>
              )}

              <DeleteEditBtn onClick={DeleteChangeHandler}>
                <button className='btn'>회원 탈퇴</button>
              </DeleteEditBtn>
            </ProfileContainer>
            <KtlogoContainer>
              <JustText1>GROW 모델</JustText1>             
                <JustText2>Goal</JustText2>
                <JustText3> 상대방이 어떤 문제를 해결하길 원하고, 어떻게 변화 되기를 바라는지 설정하도록 돕는 단계이다.</JustText3>
                <JustText2>Reality</JustText2>
                <JustText3> 고객이 현재 처해있는 상태를 파악하는 단계이다. 그 동안의 추진사항과 어려움, 장애물 등을 파악하는 것이 목적이다.</JustText3>
                <JustText2>Option</JustText2>
                <JustText3> 목표와 현재 상태의 갭을 어떻게 메울 것인가를 찾는 단계이다. 생각할 수 있는 다양한 방법들을 구상하고, 그 중에서 고객이 취할 수 있는 실행계획을 구체화 하는 것이 중심이다.</JustText3>
                <JustText2>Will</JustText2>
                <JustText3> 가장 적합한 옵션을 선택하고 실행하기 위한 구체적인 계획을 세우고, 일정, 자원, 동기 부여 등을 고려하여 목표 달성을 위한 행동 계획을 구체화 하는 것을 돕는 단계이다.</JustText3>
                
            </KtlogoContainer>
        </GridContainer>
    </Container>
  )
}

const GridContainer = styled.div`
display: grid;
padding: 20px 10px;
grid-template-columns: repeat(15, 1fr);
grid-template-rows : repeat(12, 10%);
grid-gap: 24px;
`


const GridPageHeaderWrap = styled.div`
  padding: 20px;
  grid-column: 1 / 17;
  grid-row: 1 / 2;
  background-color: #f9f9f9;
  border-radius: 10px;
  
`
const Head = styled.div`
  margin-top: -7px;
  margin-left: 30px;
  strong {
    font-size: 24px;
  }
`


const Quotes = styled.div`
  margin-top: 10px;
  font-size: 12px;
  color: #9a9a9a;
`

const GridLine = styled.div`
  width: 100%;
  height: 1px;
  background-color: #d9d9d9;
  margin-top: 12px;
`




const ProfileContainer = styled(Container)`
  grid-column-start: 1;
  grid-column-end: 8;
  grid-row-start: 2;
  grid-row-end: 10;

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

const DeleteEditBtn = styled.div`

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


const EditFormContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

const EditFormWrapper = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);

  h2 {
    margin-bottom: 10px;
  }

  form {
    display: flex;
    flex-direction: column;

    label {
      margin-bottom: 10px;
    }

    input {
      padding: 5px;
    }
  }
  width: 400px;
  height: 400px;
`;

const DeleteFormWrapper = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);

  h2 {
    margin-bottom: 10px;
  }

  form {
    display: flex;
    flex-direction: column;

    label {
      margin-bottom: 10px;
    }

    input {
      padding: 5px;
    }
  }
  width: 300px;
  height: 300px;
`;

const KtlogoContainer = styled(Container)`
  grid-column-start: 8;
  grid-column-end: 16;
  grid-row-start: 2;
  grid-row-end: 10;
  
  
`

const JustText1 = styled.div`
  margin-top: 10px;
  margin-left: 10px;
  font-size: 34px;
`;

const JustText2 = styled.div`
  margin-top: 30px;
  margin-left: 20px;
  font-size: 24px;
`;

const JustText3 = styled.div`
  margin-top: 30px;
  margin-left: 30px;
  font-size: 20px;
`;


// 이미지 테스트
const ProfileImgDiv = styled.div`
  margin-top: 30px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin-bottom: 20px;
  position: relative;
`

const ProfileImg = styled.img`
  height: 200px;
  width: 200px;
  
  border-radius: 50%;
  margin-bottom: 20px;
`

const ImageUploadBtn = styled.input`
  position: absolute;
  top: 10px;
  right: 0;
  cursor: pointer;  
  display: none;
`



const EditSaveDiv = styled.div`
  font-size: 12px;
  position: absolute;
  bottom: -40px; 
  left: 37%; 
  transform: translateX(-50%) 

  cursor: pointer;
  width: 100px;
  height: 30px;
  background: #fff;  
  border-radius: 10px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    background-color: #2EE59D;
    box-shadow: 0px 15px 20px rgba(46, 229, 157, 0.4);
    color: #fff;
    transform: translateY(-7px); 
`

const RealName = styled.p`
  margin-bottom: 5px;
  align-items: center;
  justify-content: center;
  text-align: left;
  font-weight: bold;
  word-break: break-all;
`
const Dtext = styled.div`
  margin-top: 20px;
  margin-left: 10px;
  font-size: 25px;
  display: flex;
  justify-content: center;
  font-weight: 600;
`;

const Dtext1 = styled.div`
  margin-top: 50px;
  margin-left: 10px;
  margin-bottom: 50px;
  font-size: 18px;
`;



const InfoText = styled.p`
  margin-bottom: 30px;
  margin-left: 22px;
  align-items: center;
  justify-content: center;
  text-align: left;
  font-weight: bold;
  word-break: break-all;
`;

const ChangeInfo1 = styled.input`
  border: 1px solid black;
  margin-left: 36px;
  padding: 5px;
`;

const ChangeInfo2 = styled.input`
  border: 1px solid black;
  margin-left: 26px;
  padding: 5px;
`;

const ChangeInfo3 = styled.input`
  border: 1px solid black;
  margin-left: 10px;
  padding: 5px;
`;

const InfoTextWrap = styled.div`
  margin-top: 50px;
`;

export default Profile