import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { GlobalContext } from "../contexts/GlobalContext"
const Header = () => {
  const globalContext = useContext(GlobalContext);
  return (
    <header>
      <div className="logo-wrapper">
        <img className="logo" src={process.env.PUBLIC_URL + "/img/logo.png"} />
      </div>
      {globalContext.isLogged ? <AccountBar/> : <SignInButton />}
    </header>
  )
}

const AccountBar = () => {
  return (
    <div className="accountbar-container">
      <div className="ethereum">
        <img src={process.env.PUBLIC_URL + "/img/icons/ethereum.svg"} />
        <h1>0.00 ETH</h1>
      </div>
      <div className="profile">
        <img src={process.env.PUBLIC_URL + "/img/AvatarImg.webp"} />
      </div>
    </div>
  )
}

const SignInButton = () => {
  const location = useLocation();
  return (
    <div className="sign-in">
      <Link to="login" state={{ background: location }}>
        <button className="btn-s btn-yellow">
          Sign In
        </button>
      </Link>
    </div >
  )
}
export default Header;