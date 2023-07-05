import styled from '@emotion/styled';
import { useState } from 'react';
import { requestLogin } from '@apis';
import { useRecoilState } from 'recoil';
import {
  isAuthAtom,
  initialHistoryLoadAtom,
  initalBookmarkLoadAtom,
  userInfoAtom,
} from '../../atoms';
import { useNavigate } from 'react-router-dom';

//테스트 회원정보
const User = [
  {
    username: 'a6666',
    password: 'a123',
    email: 'a5555@kt.com',
    real_name: '소영',
  },
  {
    username: 'b7777',
    password: 'a456',
    email: 'a6666@naver.com',
    real_name: '길동',
  },
];

const LogIn = () => {
  //로그인, 아이디 찾기, 비밀번호 찾기, 회원가입 모드 관리
  const [mode, setMode] = useState('Login');

  //현재까지 입력된 아이디, 비밀번호, 비밀번호 재확인, 이름, 이메일 관리
  const [id, setId] = useState('a0000');
  const [pw, setPw] = useState('tjwnsgh000');
  const [confirmPw, setConfirmPw] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  //각각 회원가입 입력 형식에 부합하는지 관리
  const [idValid, setIdValid] = useState(false);
  const [pwValid, setPwValid] = useState(false);
  const [confirmPwValid, setConfirmPwValid] = useState(false);
  const [emailValid, setEmailValid] = useState(false);
  const [nameValid, setNameValid] = useState(false);

  //회원가입 아이디, 이메일 중복체크 관리
  const [idDuplicateValid, setIdDuplicateValid] = useState(false);
  const [emailDuplicateValid, setEmailDuplicateValid] = useState(false);

  // 로그인 성공 시 유저 정보
  const [, setIsAuth] = useRecoilState(isAuthAtom);
  const [, setInitalHistoryLoad] = useRecoilState(initialHistoryLoadAtom);
  const [, setInitalBookmarkLoad] = useRecoilState(initalBookmarkLoadAtom);
  const [, setUserInfo] = useRecoilState(userInfoAtom);
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);

  //현재까지 입력된 모든 State 초기화
  const resetState = () => {
    setId('');
    setPw('');
    setConfirmPw('');
    setName('');
    setEmail('');
  };

  //모든 모드에서 각각 현재까지 입력된 text 저장 및 회원가입 시 입력 형식 부합 여부 체크
  const handleId = (e) => {
    setId(e.target.value);
    const regex = /^[A-Za-z0-9]{4,20}$/;
    if (regex.test(e.target.value)) {
      setIdValid(true);
    } else {
      setIdValid(false);
    }
  };
  const handlePw = (e) => {
    setPw(e.target.value);
    const regex =
      /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+])(?!.*[^a-zA-z0-9$`~!@$!%*#^?&\\(\\)\-_=+]).{8,20}$/;
    if (regex.test(e.target.value)) {
      setPwValid(true);
    } else {
      setPwValid(false);
    }
  };
  const handleName = (e) => {
    setName(e.target.value);
    console.log(confirmPw);
    const regex = /^[\p{L}]{1,20}$/u;
    if (regex.test(e.target.value)) {
      setNameValid(true);
    } else {
      setNameValid(false);
    }
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
    const regex =
      /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
    if (regex.test(e.target.value)) {
      setEmailValid(true);
    } else {
      setEmailValid(false);
    }
  };
  //회원가입 시 비밀번호 재확인 부분 관리
  const handleConfirmPw = (e) => {
    setConfirmPw(e.target.value);
    if (pw !== e.target.value) {
      setConfirmPwValid(false);
    } else {
      setConfirmPwValid(true);
    }
  };

  //비밀번호 찾기
  const findPwHandle = () => {
    let isMatched = false; // 회원정보에 매칭되는 데이터가 있는지 확인
    for (let i = 0; i < User.length; i++) {
      // 루프를 돌며 모든 회원 정보를 조회해 매칭되는게 있는지 확인
      if (id === User[i].username && email === User[i].email) {
        // 회원정보에 매칭되는 데이터가 있을때
        alert('비밀번호는 ' + User[i].password + ' 입니다.');
        resetState();
        isMatched = true; //매칭되는게 있으면 true로 변경
        setMode('Login');
        break;
      }
    }
    if (!isMatched) {
      // 회원정보에 매칭되는 데이터가 없을때
      alert('입력하신 아이디, 이메일에 해당하는 회원정보가 없습니다.');
      resetState();
    }
  };
  //아이디 찾기(비밀번호 찾기와 같은 로직)
  const findIdHandle = () => {
    let isMatched = false;
    for (let i = 0; i < User.length; i++) {
      if (email === User[i].email && pw === User[i].password) {
        alert('아이디는 ' + User[i].username + ' 입니다.');
        resetState();
        isMatched = true;
        setMode('Login');
        break;
      }
    }
    if (!isMatched) {
      alert('입력하신 이메일, 비밀번호에 해당하는 회원정보가 없습니다.');
      resetState();
    }
  };

  // 회원가입
  const joinHandle = () => {
    //입력한 모든 text가 형식에 부합하면 User 정보에 push
    if (
      idValid === true &&
      pwValid === true &&
      confirmPwValid === true &&
      emailValid === true &&
      nameValid === true &&
      idDuplicateValid === true &&
      emailDuplicateValid === true
    ) {
      User.push({ username: id, password: pw, email: email, real_name: name });
      console.log(id, pw, email, name);
      resetState();
      setMode('Login');
      alert('회원가입 되었습니다.');
    } else {
      alert('형식에 맞게 입력했는지 다시 확인해 주세요.');
    }
  };

  //회원가입 시 아이디 중복 체크
  const idDuplicateCheck = () => {
    let isMatched = false;
    for (let i = 0; i < User.length; i++) {
      if (id === User[i].username) {
        setIdDuplicateValid(false);
        alert('이미 등록된 아이디 입니다.');
        setId('');
        isMatched = true;
        break;
      }
    }
    if (!isMatched) {
      alert('사용 가능한 아이디 입니다.');
      setIdDuplicateValid(true);
    }
  };

  //회원가입 시 이메일 중복 체크
  const emailDuplicateCheck = () => {
    let isMatched = false;
    for (let i = 0; i < User.length; i++) {
      if (email === User[i].email) {
        setEmailDuplicateValid(false);
        alert('이미 등록된 이메일 입니다.');
        setEmail('');
        isMatched = true;
        break;
      }
    }
    if (!isMatched) {
      alert('사용 가능한 이메일 입니다.');
      setEmailDuplicateValid(true);
    }
  };

  //LOGIN 버튼을 클릭했을때 ID, PW가 맞으면 로그인, 아니면 실패 메시지 출력
  const onClickConfirmButton = (e) => {
    e.preventDefault();
    console.log('clicked');
    requestLogin(id, pw)
      .then((res) => {
        const initUserInfo = {
          profile_img: res.user_profile.profile_image,
          real_name: res.user_profile.real_name,
          id: res.user_profile.user.username,
          email: res.user_profile.user.email,
          username: res.user_profile.user.username,
        };
        const initHistory = res.history;
        const initBookmark = res.bookmarked_history;
        setInitalHistoryLoad(initHistory);
        setInitalBookmarkLoad(initBookmark);
        setUserInfo(initUserInfo);
      })
      .then(() => setIsAuth('true'))
      .then((res) => console.log(res))
      .then(() => navigate('/'))
      .catch((err) => console.log(err));
  };

  //로그인, 비밀번호 찾기, 아이디 찾기, 회원가입 onClick에 해당하는 mode로 변경
  const setModeHandle = (mode) => {
    resetState();
    setMode(mode);
  };

  //각 모드에 해당하는 title, content를 보여줌
  let content = null;
  let title = null;
  if (mode === 'Login') {
    title = '환영합니다';
    content = (
      <>
        <InputTitle>아이디</InputTitle>
        <InputWrap>
          <Input
            type='text'
            placeholder='아이디'
            value={id}
            onChange={handleId}
          />
        </InputWrap>
        <InputTitle>비밀번호</InputTitle>
        <InputWrap>
          <Input
            type='password'
            placeholder='비밀번호'
            value={pw}
            onChange={handlePw}
          />
        </InputWrap>
        <SubmitWrap>
          <SubmitBtn onClick={onClickConfirmButton} className='bottomButton'>
            LOGIN
          </SubmitBtn>
        </SubmitWrap>
      </>
    );
  } else if (mode === 'Join') {
    title = '회원가입';
    content = (
      <>
        <InputTitle>아이디</InputTitle>
        <InputWrap>
          <Input
            type='text'
            placeholder='사용할 아이디를 입력해 주세요.'
            value={id}
            onChange={handleId}
          />
          <DuplicateCheckWrap>
            <DuplicateCheckBtn onClick={idDuplicateCheck}>
              중복체크
            </DuplicateCheckBtn>
          </DuplicateCheckWrap>
        </InputWrap>
        <ErrorMessageWrap>
          {!idValid && id.length > 0 && (
            <div>
              아이디는 4~20자의 영문 대소문자와 숫자로 이루어져야 합니다.
            </div>
          )}
        </ErrorMessageWrap>
        <InputTitle>비밀번호</InputTitle>
        <InputWrap>
          <Input
            type='password'
            placeholder='사용할 비밀번호를 입력해 주세요.'
            value={pw}
            onChange={handlePw}
          />
        </InputWrap>
        <ErrorMessageWrap>
          {!pwValid && pw.length > 0 && (
            <div>
              비밀번호는 영문 대소문자, 숫자, 특수문자($`~!@$!%*#^?&\()-_=+)를
              포함하여 8~20자여야 합니다.
            </div>
          )}
        </ErrorMessageWrap>
        <InputTitle>비밀번호 확인</InputTitle>
        <InputWrap>
          <Input
            type='password'
            placeholder='비밀번호를 다시 입력해 주세요.'
            value={confirmPw}
            onChange={handleConfirmPw}
          />
        </InputWrap>
        <ErrorMessageWrap>
          {confirmPwValid === false || confirmPw === '' ? (
            <div>*비밀번호가 일치하지 않습니다.</div>
          ) : (
            <div style={{ color: 'green' }}>*비밀번호가 일치합니다.</div>
          )}
        </ErrorMessageWrap>
        <InputTitle>이름</InputTitle>
        <InputWrap>
          <Input
            type='text'
            placeholder='이름을 입력해 주세요.'
            value={name}
            onChange={handleName}
          />
        </InputWrap>
        <ErrorMessageWrap>
          {!nameValid && name.length > 0 && (
            <div>이름은 1~20자의 문자여야 합니다.</div>
          )}
        </ErrorMessageWrap>
        <InputTitle>이메일</InputTitle>
        <InputWrap>
          <Input
            type='email'
            placeholder='사용할 이메일을 입력해 주세요.'
            value={email}
            onChange={handleEmail}
          />
          <DuplicateCheckWrap>
            <DuplicateCheckBtn onClick={emailDuplicateCheck}>
              중복체크
            </DuplicateCheckBtn>
          </DuplicateCheckWrap>
        </InputWrap>
        <ErrorMessageWrap>
          {!emailValid && email.length > 0 && (
            <div>유효한 이메일 주소 형식이 아닙니다.</div>
          )}
        </ErrorMessageWrap>
        <SubmitWrap>
          <SubmitBtn onClick={joinHandle} className='bottomButton'>
            {idValid &&
            pwValid &&
            confirmPwValid &&
            emailValid &&
            nameValid &&
            idDuplicateValid &&
            emailDuplicateValid
              ? '✔ 회원가입'
              : '✘ 회원가입'}
          </SubmitBtn>
        </SubmitWrap>
      </>
    );
  } else if (mode === 'FindId') {
    title = '아이디 찾기';
    content = (
      <>
        <InputTitle>이메일</InputTitle>
        <InputWrap>
          <Input
            type='email'
            placeholder='이메일을 입력해 주세요.'
            value={email}
            onChange={handleEmail}
          />
        </InputWrap>
        <InputTitle>비밀번호</InputTitle>
        <InputWrap>
          <Input
            type='password'
            placeholder='비밀번호를 입력해 주세요.'
            value={pw}
            onChange={handlePw}
          />
        </InputWrap>
        <SubmitWrap>
          <SubmitBtn onClick={findIdHandle} className='bottomButton'>
            아이디 찾기
          </SubmitBtn>
        </SubmitWrap>
      </>
    );
  } else if (mode === 'FindPw') {
    title = '비밀번호 찾기';
    content = (
      <>
        <InputTitle>아이디</InputTitle>
        <InputWrap>
          <Input
            type='text'
            placeholder='아이디를 입력해 주세요.'
            value={id}
            onChange={handleId}
          />
        </InputWrap>
        <InputTitle>이메일</InputTitle>
        <InputWrap>
          <Input
            type='email'
            placeholder='이메일을 입력해 주세요.'
            value={email}
            onChange={handleEmail}
          />
        </InputWrap>
        <SubmitWrap>
          <SubmitBtn onClick={findPwHandle} className='bottomButton'>
            비밀번호 찾기
          </SubmitBtn>
        </SubmitWrap>
      </>
    );
  } else {
    console.log('err');
  }
  return (
    <Page>
      <ContentWrap>
        <LogoWrap>
          <a onClick={() => setModeHandle('Login')}>
            <Logo src={'https://cfm.kt.com/images/v2/layout/gnb-ktlogo.png'} />
          </a>
        </LogoWrap>

        <TitleWrap>{title}</TitleWrap>
        {content}
        <FindWrap>
          <LoginBtn onClick={() => setModeHandle('Login')}>
            <pre> 로그인 |</pre>
          </LoginBtn>
          <FindPwBtn onClick={() => setModeHandle('FindPw')}>
            <pre> 비밀번호 찾기 |</pre>
          </FindPwBtn>
          <FindIdBtn onClick={() => setModeHandle('FindId')}>
            <pre> 아이디 찾기 |</pre>
          </FindIdBtn>
          <JoinBtn onClick={() => setModeHandle('Join')}>
            <pre> 회원가입 </pre>
          </JoinBtn>
        </FindWrap>
      </ContentWrap>
    </Page>
  );
};

const Page = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
  max-width: 500px;
  padding: 0 20px;

  left: 50%;
  transform: translate(-50%, 0);

  background-color: #f7f7f7;

  overflow: hidden;
  display: flex;
  flex-direction: column;
  overflow: scroll;
  ::-webkit-scrollbar {
    width: 0;
    height: 0;
  }
`;

const LogoWrap = styled.div`
  margin: 0px;
`;

const Logo = styled.img`
  margin: 0px;
`;

const TitleWrap = styled.div`
  margin: 0px;
  margin-top: 50px;
  font-size: 26px;
  font-weight: 700;
  color: #262626;
`;

const ContentWrap = styled.div`
  margin-top: 50px;
  flex: 1;
`;

const InputWrap = styled.div`
  margin-top: 15px;
  display: flex;
`;

const ErrorMessageWrap = styled.div`
  font-size: 11px;
  color: red;
  margin: 0px;
`;

const InputTitle = styled.div`
  margin-top: 30px;
  font-size: 15px;
  font-weight: 600;
  color: #262626;
`;

const FindWrap = styled.div`
  margin-top: 5px;
  display: flex;
  justify-content: center;
`;

const FindIdBtn = styled.button`
  margin: 0px;
  white-space: nowrap;
`;

const FindPwBtn = styled.button`
  margin: 0px;
  white-space: nowrap;
`;

const LoginBtn = styled.button`
  margin: 0px;
  white-space: nowrap;
`;

const JoinBtn = styled.button`
  margin: 0px;
  white-space: nowrap;
`;

const DuplicateCheckWrap = styled.div`
  margin-left: 3px;
  display: flex;
`;
const DuplicateCheckBtn = styled.button`
  flex: 1;
  display: flex;
  border-radius: 8px;
  padding: 16px;
  background-color: white;
  border: 1px solid #e2e0e0;
  white-space: nowrap;
`;

const SubmitWrap = styled.div`
  margin-top: 40px;
  display: flex;
`;

const Input = styled.input`
  flex: 1;
  display: flex;
  border-radius: 8px;
  padding: 16px;
  background-color: white;
  border: 1px solid #e2e0e0;
  &:focus-within {
    background-color: ivory;
  }
`;

const SubmitBtn = styled.button`
  width: 100%;
  height: 48px;
  border: none;
  font-weight: 700;
  color: white;
  background-color: #0aa2b9;
  border-radius: 8px;
  transition: background-color 0.3s;
  &:hover {
    background-color: #0b8a8e;
  }

  &:active {
    background-color: #0b8a8e;
  }
`;
//커서 접촉시, 클릭시 색상 변화

export default LogIn;
