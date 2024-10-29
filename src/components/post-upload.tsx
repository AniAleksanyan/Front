import { useRef, useState } from "react"
import { apiUploadPost } from "../lib/api";
import { inputPost, IPost } from "../lib/types";

export const PostUpload = () => {
    const [text, setText] = useState<string>("");
    const [file, setFile] = useState<File | null>(null);
    const [post, setPost] = useState<inputPost>({ picture: null, title: '' });

    const photo = useRef<HTMLInputElement | null>(null)

    const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>{
        setText(e.target.value);
        setPost({...post, title: text})
    }
  
    const handleFileChange = () => {
        if (photo.current && photo.current.files?.[0]) {
            const file = photo.current.files?.[0];
            setFile( file );
        }
    };
  
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData();
        if(file){
            formData.append('photo', file)
        }

        formData.append('content', text)

        apiUploadPost(formData)
        .then(response => {
           console.log(response);
        })
    };
    
    return <>
        <form className="post-form" onSubmit={handleSubmit}>
            <h2>Create a Post</h2>
            <textarea
                placeholder="Write something..."
                value={text}
                onChange={handleTextChange}
            />
            <input 
                type="file" 
                id="file-upload" 
                ref = {photo}
                onChange={handleFileChange} 
            />
            <button type="submit">Post</button>
        </form>
    </>
}