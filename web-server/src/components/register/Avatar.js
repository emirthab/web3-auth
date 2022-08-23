import { useContext } from "react";
import { RegisterContext } from "../contexts/RegisterContext";

const Avatar = () => {
    const provider = useContext(RegisterContext);
    return (
        <div className="avatar-container">
            <button onClick={e => provider.setStep(3)} className="btn-m btn-pink">merhaba</button>
        </div>
    )
}

export default Avatar;