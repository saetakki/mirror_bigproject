import { useNavigate } from "react-router-dom";

const LogIn = () => {
  const navigate = useNavigate();

  const onClickHandler = (e) => {
    e.preventDefault();
    localStorage.setItem("Auth", true);
    console.log("clicked");
    navigate("/");
  };

  return (
    <button onClick={onClickHandler}>Log in</button>
  );
};

export default LogIn;