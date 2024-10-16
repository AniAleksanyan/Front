import { useState, forwardRef, useImperativeHandle } from "react";
import { IUserChangePassword } from "../lib/types";
import { apiUpdatePassword } from "../lib/api";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

export const EditPassword = forwardRef((props, ref) => {
    const [password, setPassword] = useState<IUserChangePassword>({ old: "", newpwd: "" });
    const navigate = useNavigate();

    useImperativeHandle(ref, () => ({
        handleSubmit: () => {
            if (password.old || password.newpwd) {
                console.log('password');
                apiUpdatePassword(password)
                    .then(response => {
                        if (response.status !== 'ok' && response.message) {
                            toast(response.message);
                        } else {
                            navigate('/profile');
                        }
                    })
                    .catch(() => {
                        toast("An error occurred while updating password.");
                    });
                }
            }

    }));

    return (
        <>
            <div className="update-password">
                <label>Edit Password</label>
                <input
                    type="password"
                    value={password.old}
                    placeholder="Old Password"
                    onChange={(e) => setPassword({ ...password, old: e.target.value })}
                />
                <input
                    type="password"
                    value={password.newpwd}
                    placeholder="New Password"
                    onChange={(e) => setPassword({ ...password, newpwd: e.target.value })}
                />
            </div>
        </>
    );
});
