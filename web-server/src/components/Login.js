import { useNavigate } from 'react-router-dom';
import { ethers } from 'ethers';
import styles from "../styles/login.css"
import { useContext } from 'react';
import { GlobalContext } from './contexts/GlobalContext';

const Login = () => {
  const globalContext = useContext(GlobalContext);
  let navigate = useNavigate();

  async function connectWithMetamask() {
    if (!window.ethereum) {
      throw new Error("No crypto wallet found. Please install it.")
    }
    await window.ethereum.send("eth_requestAccounts");
    const web3Provider = new ethers.providers.Web3Provider(window.ethereum);
    const address = await web3Provider.getSigner().getAddress();
    const response = await fetch("/api/nonce?walletAddress=" + address)
      .then(response => response.json())
    if (response["registered"] == false) {
      navigate("/register");
      return;
    }

    const signature = await web3Provider.getSigner().signMessage(response["nonce"]);
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "wallet_address": address,
        "signature": signature
      }),
      credentials: "include"
    }

    fetch("/api/auth", requestOptions)
      .then(response => {
        if (response.status == 200) {
          globalContext.setIsLogged(true);
          navigate("/");
        }
      })
  }

  return (
    <div className="wallets-container">
      <div className="container">
        <h2>Log in or Create an account</h2>
        <img onClick={() => navigate(-1)} className="close-button" src={process.env.PUBLIC_URL + "/img/icons/close.webp"} />
        <div className="wallets-wrapper">
          <Wallet onClick={connectWithMetamask} name="Metamask" desc="WEB3" icon={process.env.PUBLIC_URL + "/img/icons/metamask.webp"} />
        </div>
      </div>
    </div>
  )
}

const Wallet = ({ name, icon, desc, onClick }) => {
  return (
    <div onClick={onClick} className="wallet-container">
      <div className="wallet-wrapper">
        <img src={icon} />
        <h5>{name}</h5>
      </div>
      <h6>{desc}</h6>
    </div>
  )
}

export default Login;