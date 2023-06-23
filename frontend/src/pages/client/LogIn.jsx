import { useState } from "react";
import { requestLogin } from "@apis"
import { useRecoilState } from "recoil";
import { 
  isAuthAtom, 
  initialHistoryLoadAtom,
  initalBookmarkLoadAtom,
  userInfoAtom } from "../../atoms";
import { useNavigate } from "react-router-dom";
import { Container } from "@styles";
const LogIn = () => {
  const [, setIsAuth] = useRecoilState(isAuthAtom);
  const [, setInitalHistoryLoad] = useRecoilState(initialHistoryLoadAtom);
  const [, setInitalBookmarkLoad] = useRecoilState(initalBookmarkLoadAtom);
  const [, setUserInfo] = useRecoilState(userInfoAtom);
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);




  const onClickHandler = (e) => {
    e.preventDefault();
    console.log("clicked");
    requestLogin()
    .then(res => {
      const initUserInfo = {
        profile_img: res.user_profile.profile_image,
        real_name : res.user_profile.real_name,
        id : res.user_profile.user.username,
        email : res.user_profile.user.email,
        username: res.user_profile.user.username,
      }
      console.log(res)
      const initHistory = res.history
      const initBookmark  = res.bookmarked_history
      setInitalHistoryLoad(initHistory)
      setInitalBookmarkLoad(initBookmark)
      setUserInfo(initUserInfo)
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