import { useEffect, useState } from "react"
import { PostUpload } from "../../../components/post-upload"
import { IPost } from "../../../lib/types"
import { apiDeletePost, apiGetPost } from "../../../lib/api"
import { BASE_URL } from "../../../lib/constants"

export const Posts = () => {
    const [posts, setPosts] = useState<IPost[]>([]);

    useEffect(() => {
        apiGetPost()
            .then(response => {
                if (response.status === 'ok' && response.payload) {
                    const payloadAsPosts = response.payload as IPost[];
                    setPosts(payloadAsPosts);
                }
            })
            .catch(error => {
                console.error("Error fetching posts:", error);
            });
    }, posts);

    const handlePostDelete = (e: React.MouseEvent<HTMLButtonElement>, postId: Number) => {
        e.preventDefault();
        
        apiDeletePost(postId)
        .then(response => {
            setPosts(posts.filter(elm => 
                elm.id != postId
            )) 
        })
    }

    return <>
        <div className="post-container">
            <PostUpload/>
            <div className="posts">
                <h2>Posts</h2>
                <div className="post">
                    {posts.length > 0 ? (
                        posts.map((post) => (
                            <div key={post.id} className="post-files">
                                {post.picture ? (
                                        typeof post.picture === 'string' ? (
                                            <img src={BASE_URL+post.picture} alt={`Post ${post.id}`} />
                                        ) : (
                                            <img src={BASE_URL+post.picture} alt={`Post ${post.id}`} />
                                        )
                                    ) : null}
                                {post.title && <p>{post.title}</p>} 
                                <button onClick={(e) => handlePostDelete(e, post.id)} className="delete-post">Delete</button>
                                </div>
                        ))
                    ) : (
                        <p>No posts available.</p>
                    )}
                </div>
            </div>
        </div>
    </>
}