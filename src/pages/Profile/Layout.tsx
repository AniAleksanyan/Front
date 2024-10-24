import { useEffect, useState } from "react"
import { NavLink, Outlet, useNavigate } from "react-router-dom"
import { apiLogOut, apiVerify } from "../../lib/api"
import { IAccount } from "../../lib/types";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Layout = () => {
    const navigate = useNavigate();
    const [account, setAccount] = useState<IAccount|null>(null);

    useEffect(() => {
        apiVerify()
        .then(response => {
            if (!response.user) {
                navigate("/login")
            }else{
                setAccount(response.user as IAccount)
            }
        })    
    },[])

    const handleLogOut = () => {
        apiLogOut()
        .then(response =>{
            if (response.status !== 'ok') {
               alert("Logout error. Try again later.");
            }else{
                navigate("/login")
            }
        });
    }

    return account && <>
        <ToastContainer />
        <nav>
            <div className="nav-container">
                <div className="nav-logo">MyApp</div>
                <div className="nav-links">
                    <NavLink to="/profile" end>Profile</NavLink>
                    <NavLink to="/profile/settings">Settings</NavLink>
                    <NavLink to="/profile/followers">Followers</NavLink>
                    <NavLink to="/profile/photos">Photos</NavLink>
                </div>
            </div> 
            <div className="nav-logout">
                <p className="user-name">{account.name} {account.surname}</p>
                <p onClick={handleLogOut}>Log Out</p>
            </div>
        </nav>
        <div className="content">
            <Outlet context={{ account, setAccount }}/>
        </div>
    </>
}