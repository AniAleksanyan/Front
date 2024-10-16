import { useRef } from "react";
import { EditLoginRef, EditPasswordRef } from "../../../lib/types";
import { EditLogin } from "../../../components/edit-login"
import { EditPassword } from "../../../components/edit-password"

export const Settings = () => {
    const loginRef = useRef<EditLoginRef | null>(null);
    const passwordRef = useRef<EditPasswordRef | null>(null);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (loginRef.current) {
            loginRef.current.handleSubmit();
        }
        if (passwordRef.current) {
            passwordRef.current.handleSubmit();
        }
    };

    return <>
        <form className="settings-form" onSubmit={handleSubmit}>
            <EditLogin ref={loginRef} />
            <EditPassword ref={passwordRef} />
            <button type="submit">Save</button>
        </form>
    </>
}