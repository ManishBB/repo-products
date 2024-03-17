import { useState } from "react";
import Login from "../components/Login";
import Register from "../components/Register";

const AuthPage = () => {
    const [isRegister, setIsRegister] = useState(true);
    return (
        <div className="flex items-center justify-center">
            {isRegister ? (
                <Register setIsRegister={setIsRegister} />
            ) : (
                <Login setIsRegister={setIsRegister}/>
            )}
        </div>
    );
};

export default AuthPage;
