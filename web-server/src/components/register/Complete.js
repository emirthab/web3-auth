import { useContext } from "react";
import { RegisterContext } from "../contexts/RegisterContext";
import { ethers } from "ethers";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../contexts/GlobalContext";

const Complete = () => {
  const globalContext= useContext(GlobalContext);
  let navigate = useNavigate();
  const provider = useContext(RegisterContext);
  async function onComplete() {
    const web3Provider = new ethers.providers.Web3Provider(window.ethereum);
    const address = await web3Provider.getSigner().getAddress();
    const response = await fetch("/api/nonce?walletAddress=" + address)
      .then(response => response.json())

    const signature = await web3Provider.getSigner().signMessage(response["nonce"]);
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "wallet_address": address,
        "signature": signature,
        "username": provider.username,
        "email": provider.email,
        "avatar": {

        }
      }),
      credentials: "include"
    }

    fetch("/api/register", requestOptions)
      .then(response => {
        if (response.status == 200) { 
          globalContext.setIsLogged(true)
          navigate("/") 
        };
      })
  }

  return (
    <div className="complete-container">
      <h1>Congratulations!</h1>
      <h5>You have one last step left</h5>
      <div className="license-wrapper card">
        <div className="license">
          <h5>Our License Aggrement</h5>
          <span>
            <span >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
            Bizim için kişisel bilgilerinizi korumanın çok önemli olduğunu ve bunların gizliliğine saygı duyduğumuzu bilmenizi istiyoruz. Bu Gizlilik Politikasını, bizimle paylaştığınız kişisel bilgilerinizi nasıl kullandığımızı ve koruduğumuzu açıklamak için hazırladık. Bu Politika www.oyunatolyesi.com (“site”) ve hizmetlerimizi kullanan, ayrıca bilet satın alan tüm kullanıcılar ile bize verilen tüm bilgiler için geçerlidir. Bilet satın almak suretiyle, Gizlilik Beyanı hükümlerini okuduğunuzu, incelediğinizi ve içeriğini aynen kabul etmiş sayılacağınızı önemle belirtiriz. Web sitemizi ve hizmetlerimizi kullanmak ve/veya bilet satın almak suretiyle işbu Gizlilik Politikasında belirtilen uygulamaları ve kuralları kabul etmektesiniz.
            <span ><br /><br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
            Bizim için kişisel bilgilerinizi korumanın çok önemli olduğunu ve bunların gizliliğine saygı duyduğumuzu bilmenizi istiyoruz. Bu Gizlilik Politikasını, bizimle paylaştığınız kişisel bilgilerinizi nasıl kullandığımızı ve koruduğumuzu açıklamak için hazırladık. Bu Politika www.oyunatolyesi.com (“site”) ve hizmetlerimizi kullanan, ayrıca bilet satın alan tüm kullanıcılar ile bize verilen tüm bilgiler için geçerlidir. Bilet satın almak suretiyle, Gizlilik Beyanı hükümlerini okuduğunuzu, incelediğinizi ve içeriğini aynen kabul etmiş sayılacağınızı önemle belirtiriz. Web sitemizi ve hizmetlerimizi kullanmak ve/veya bilet satın almak suretiyle işbu Gizlilik Politikasında belirtilen uygulamaları ve kuralları kabul etmektesiniz.
            <span ><br /><br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
            Bizim için kişisel bilgilerinizi korumanın çok önemli olduğunu ve bunların gizliliğine saygı duyduğumuzu bilmenizi istiyoruz. Bu Gizlilik Politikasını, bizimle paylaştığınız kişisel bilgilerinizi nasıl kullandığımızı ve koruduğumuzu açıklamak için hazırladık. Bu Politika www.oyunatolyesi.com (“site”) ve hizmetlerimizi kullanan, ayrıca bilet satın alan tüm kullanıcılar ile bize verilen tüm bilgiler için geçerlidir. Bilet satın almak suretiyle, Gizlilik Beyanı hükümlerini okuduğunuzu, incelediğinizi ve içeriğini aynen kabul etmiş sayılacağınızı önemle belirtiriz. Web sitemizi ve hizmetlerimizi kullanmak ve/veya bilet satın almak suretiyle işbu Gizlilik Politikasında belirtilen uygulamaları ve kuralları kabul etmektesiniz.
            <span ><br /><br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
            Bizim için kişisel bilgilerinizi korumanın çok önemli olduğunu ve bunların gizliliğine saygı duyduğumuzu bilmenizi istiyoruz. Bu Gizlilik Politikasını, bizimle paylaştığınız kişisel bilgilerinizi nasıl kullandığımızı ve koruduğumuzu açıklamak için hazırladık. Bu Politika www.oyunatolyesi.com (“site”) ve hizmetlerimizi kullanan, ayrıca bilet satın alan tüm kullanıcılar ile bize verilen tüm bilgiler için geçerlidir. Bilet satın almak suretiyle, Gizlilik Beyanı hükümlerini okuduğunuzu, incelediğinizi ve içeriğini aynen kabul etmiş sayılacağınızı önemle belirtiriz. Web sitemizi ve hizmetlerimizi kullanmak ve/veya bilet satın almak suretiyle işbu Gizlilik Politikasında belirtilen uygulamaları ve kuralları kabul etmektesiniz.
          </span>
        </div>
      </div>
      <div className="checkbox-wrapper">
        <input onChange={e => {
          provider.checked ? provider.setChecked(false) : provider.setChecked(true);
        }} type="checkbox" checked={provider.checked} />
        <label for="checkbox-1">I have read and agreed to the terms</label>
      </div>
      <div className="button-wrapper">
        <button
          onClick={(e) => onComplete()}
          className={
            (!provider.checked) ? "btn-m btn-pink disabled" : "btn-m btn-pink"
          }>
          Complete
        </button>
      </div>
    </div>
  )
}
export default Complete;