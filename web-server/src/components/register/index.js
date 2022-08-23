import React, { useContext } from "react"
import { RegisterContext } from "../contexts/RegisterContext"

import Complete from "./Complete"
import Account from "./Account"
import Avatar from "./Avatar"
import styles from "../../styles/register.css"

const Register = () => {
  const provider = useContext(RegisterContext);

  return (
    <div className="register-container">
      <div className="steps-container">
        <div className="column logo">
          <img src={process.env.PUBLIC_URL + "/img/logo.png"} />
        </div>
        <div className={"column steps step-" + provider.step}>
          <div className="step-texts">
            <span className={provider.step == 1 && "active"}>Account</span>
            <span className={provider.step == 2 && "active"}>Avatar</span>
            <span className={provider.step == 3 && "active"}>Complete</span>
          </div>
        </div>
      </div>
      {provider.step != 1 && <button onClick={(e) => provider.setStep(provider.step - 1)} className="btn-bck" />}
      <div className="content-wrapper">
        {provider.step == 1 && <Account />}
        {provider.step == 2 && <Avatar />}
        {provider.step == 3 && <Complete />}
      </div>
    </div>
  )
}
export default Register;