import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { login } from "../store/authSlice";
import NavBar from "../components/NavBar";

function Home() {
    const navigate = useNavigate();

    const [role, setRole] = useState("");
    const dispatch = useDispatch();

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem("userData"));
        setRole(userData.role);
        dispatch(login({ ...userData }));
        navigate("/dashboard");
    }, []);
    return (
        <div>
            <NavBar role={role} />
            <Outlet />
        </div>
    );
}

export default Home;
