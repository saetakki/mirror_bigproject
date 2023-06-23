import { useState } from "react";
import { requestLogin } from "@apis"
import { useRecoilState } from "recoil";
import { isAuthAtom } from "../../atoms";
import { useNavigate } from "react-router-dom";
import { Container } from "@styles";
const LogIn = () => {
  const [, setIsAuth] = useRecoilState(isAuthAtom);
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);


  const onClickHandler = (e) => {
    e.preventDefault();
    console.log("clicked");
    requestLogin()
    .then(res => console.log(res))
    .then(() => setIsAuth("true"))
    .then(() => navigate("/"))
    .catch(err => console.log(err))
  };

  return (
    <Container>
      <button onClick={onClickHandler}>{isLogin ? "Log in" : "Sign up"}</button>
      <div onClick={() => setIsLogin(!isLogin)}>{isLogin ? "회원가입으로" : "로그인으로"}</div>
    </Container>)
};

export default LogIn;