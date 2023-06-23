import { requestLogin } from "@apis"
import { useRecoilState } from "recoil";
import { isAuthAtom } from "../../atoms";
import { useNavigate } from "react-router-dom";

const LogIn = () => {
  const [, setIsAuth] = useRecoilState(isAuthAtom);
  const navigate = useNavigate();


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
    <button onClick={onClickHandler}>Log in</button>
  );
};

export default LogIn;