import { DEFAULT_PIC } from "../../src/lib/constants";
import { useRef, useState } from "react";
import { apiUploadProfile } from "../../src/lib/api";

export const ImagePicker = () => {
    const [preview, setPreview] = useState<string>("")
    
    const photo = useRef<HTMLInputElement | null>(null)
    
    const handlePreview = () => {
        if ( photo.current ) {
            const file = photo.current.files?.[0]
            if (file) {
                const reader = new FileReader()
                reader.readAsDataURL(file)
                reader.onload = () => {
                    setPreview(reader.result as string)
                }
            }
        }
    }

    const handleUpload = () => {
        let form = new FormData()
        if( photo.current ){
            const file = photo.current.files ?.[0]
            if(file){
                form.append("picture",file)
                apiUploadProfile(form)
                .then(response => {
                    window.location.reload()
                })
            }
        }
    }


    return (
        <>
            {
                preview &&
                <div className="show-uploaded-imag">
                    <div>
                        <img className="nkar" src={preview} />
                    </div>
                    <div>
                        <button onClick={handleUpload}> Upload </button>
                        <button onClick={() => setPreview("")}> Cancel </button>
                    </div>
                </div>
            }
            <div className="custom-file-input">
                <label className="custom-file-label" >Choose file</label>
                <input
                    id="fileInput"
                    type="file"
                    ref = {photo}
                    onChange={handlePreview}
                />
                <span className="file-name">No file chosen</span>
            </div>
        </>
    );
};
