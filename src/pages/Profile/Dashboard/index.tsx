import { useOutletContext } from "react-router-dom"
import { IContext } from "../../../lib/types"
import { ImagePicker } from "../../../components/image-picker";
import { BASE_URL, DEFAULT_PIC } from "../../../lib/constants"

export const Profile = () => {
    const { account, setAccount } = useOutletContext<IContext>()
    return <>
        <div className="profile-info">
            <div className="user-photo"><img className="pic" src={!account.picture ? DEFAULT_PIC : BASE_URL + account.picture} /></div>
            <p className="user-name">{account.name} {account.surname}</p>
        </div>
        <div className="upload-photo">
            <ImagePicker/>
        </div>
    </>
}