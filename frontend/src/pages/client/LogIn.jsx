import { useState } from "react";
import { requestLogin } from "@apis"
import { useRecoilState } from "recoil";
import { 
  isAuthAtom, 
  initialHistoryLoadAtom,
  initalBookmarkLoadAtom } from "../../atoms";
import { useNavigate } from "react-router-dom";
import { Container } from "@styles";
const LogIn = () => {
  const [, setIsAuth] = useRecoilState(isAuthAtom);
  const [, setInitalHistoryLoad] = useRecoilState(initialHistoryLoadAtom);
  const [, setInitalBookmarkLoad] = useRecoilState(initalBookmarkLoadAtom);
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);


  const onClickHandler = (e) => {
    e.preventDefault();
    console.log("clicked");
    requestLogin()
    .then(res => {
      const initHistory = res.history
      const initBookmark  = res.bookmarked_history
      setInitalHistoryLoad(initHistory)
      setInitalBookmarkLoad(initBookmark)
    })
    .then(() => setIsAuth("true"))
    .then(() => navigate("/"))
    .catch(err => console.log(err))
  };

  return (
    <Container>
      <button onClick={onClickHandler}>{isLogin ? "Log in" : "Sign up"}</button>
      <div onClick={() => setIsLogin(!isLogin)}>{isLogin ? "회원가입으로" : "로"}</div>
    </Container>)
};

export default LogIn;