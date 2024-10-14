import { useEffect, useState } from "react"
import { NavLink, Outlet, useNavigate } from "react-router-dom"
import { apiVerify } from "../../lib/api"
import { IAccount } from "../../lib/types";

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

    return account && <>
        <nav>
            <NavLink to="/profile" end>Profile</NavLink>
            <NavLink to="/profile/settings">Settings</NavLink>
            <NavLink to="/profile/followers">Followers</NavLink>
            <NavLink to="/profile/photos">Photos</NavLink>
        </nav>
        <div style={{padding:20}}></div>
        <Outlet/>
        <p>{account.name}</p>
        <p>{account.surname}</p>
    </>
}