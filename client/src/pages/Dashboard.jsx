import { useEffect, useState } from "react";
import TeamMemberDashboard from "./TeamMemberDashboard";
import { useDispatch } from "react-redux";
import { login } from "../store/authSlice";
import NavBar from "../components/NavBar";
import AdminDashboard from "./AdminDashboard";

function Dashboard() {
    const [role, setRole] = useState("");
    const dispatch = useDispatch();

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem("userData"));
        setRole(userData.role);
        dispatch(login({ ...userData }));
    }, []);
    return (
        role && (
            <div>
                {role === "admin" ? (
                    <AdminDashboard />
                ) : (
                    <TeamMemberDashboard />
                )}
            </div>
        )
    );
}

export default Dashboard;
