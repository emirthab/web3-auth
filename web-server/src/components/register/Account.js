import { useContext, useEffect, useState } from "react";
import { RegisterContext } from "../contexts/RegisterContext";

const Account = () => {
  const provider = useContext(RegisterContext);

  const [usernameIsAble, setUsernameIsAble] = useState(false)
  const [emailIsAble, setEmailIsAble] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    let usernameMinLenght = process.env.REACT_APP_USERNAME_MIN_LENGHT
    provider.username.length >= usernameMinLenght ? setUsernameIsAble(true) : setUsernameIsAble(false)

    let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let result = regex.test(provider.email);
    if (result)
      setEmailIsAble(true);
    else
      setEmailIsAble(false);

  }, [provider.email, provider.username])

  function onUserNameChange(e) {
    let letters = process.env.REACT_APP_USERNAME_LETTERS.split("");
    let maxLenght = process.env.REACT_APP_USERNAME_MAX_LENGHT
    e.target.value.split("").forEach(char => {
      if (!letters.includes(char))
        e.target.value = e.target.value.replace(char, "");
    });
    if (e.target.value.length > maxLenght)
      e.target.value = provider.username;
    provider.setUsername(e.target.value);
  }

  function onContinueClick() {
    if (!emailIsAble || !usernameIsAble)
      return;
    fetch("/api/available?email=" + provider.email + "&username=" + provider.username)
      .then(response => response.json())
      .then(payload => {
        setUsernameIsAble(payload["username"])
        setEmailIsAble(payload["email"])
        if (!emailIsAble || !usernameIsAble)
          setError("username or email address has been already used");
        else
          provider.setStep(2);
      })

  }
  return (
    <div className="account-container">
      <h1 >Your are almost there!</h1>
      <h2 >Complete these fields with your email and nickname.</h2>
      <div className="inputs-container">
        <input onChange={e => onUserNameChange(e)} type="text" placeholder="Username" value={provider.username} />
        <input onChange={e => provider.setEmail(e.target.value)} type="e-mail" placeholder="Email Address" value={provider.email} />
      </div>
      <div className="button-wrapper">
        <button onClick={e => onContinueClick()} className={
          (!emailIsAble || !usernameIsAble) ? "btn-m btn-pink disabled" : "btn-m btn-pink"
        }>Continue</button>
      </div>
      <span className="error">{error}</span>
    </div >
  );
}

export default Account;