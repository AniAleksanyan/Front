import { useState, forwardRef, useImperativeHandle } from "react";
import { IUserLogin } from "../lib/types";
import { apiUpdateLogIn } from "../lib/api";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

export const EditLogin = forwardRef((props, ref) => {
    const [user, setUser] = useState<IUserLogin>({ login: "", password: "" });
    const navigate = useNavigate();

    useImperativeHandle(ref, () => ({
        handleSubmit: () => {
            if (user.login || user.password) {
                console.log('login');
                apiUpdateLogIn(user)
                    .then(response => {
                        if (response.status !== 'ok' && response.message) {
                            toast(response.message);
                        } else {
                            navigate('/profile');
                        }
                    })
                    .catch(() => {
                        toast("An error occurred while updating login.");
                    });
                }
        }
    }));

    return (
        <>
            <div className="update-login">
                <label>Edit Login</label>
                <input
                    type="text"
                    value={user.login}
                    placeholder="Login"
                    onChange={(e) => setUser({ ...user, login: e.target.value })}
                />
                <input
                    type="password"
                    value={user.password}
                    placeholder="Password"
                    onChange={(e) => setUser({ ...user, password: e.target.value })}
                />
            </div>
        </>
    );
});
