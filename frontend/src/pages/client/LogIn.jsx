const LogIn = () => {

  const onClickHandler = (e) => {
    e.preventDefault();
    localStorage.setItem("Auth", true);
    console.log("clicked");
    window.location.href = "/";
  };

  return (
    <button onClick={onClickHandler}>Log in</button>
  );
};

export default LogIn;