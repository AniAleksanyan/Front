import { useEffect, useState } from "react"
import { PostUpload } from "../../../components/post-upload"
import { IPost } from "../../../lib/types"
import { apiGetPost } from "../../../lib/api"

export const Posts = () => {
    const [posts, setPosts] = useState<IPost[]>([]);

    useEffect(() => {
        apiGetPost()
            .then(response => {
                if (response.status === 'ok' && response.payload) {
                    const payloadAsPosts = response.payload as IPost[];
                    setPosts(payloadAsPosts);

                    console.log(payloadAsPosts)
                }
            })
            .catch(error => {
                console.error("Error fetching posts:", error);
            });
    }, []);
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
                                            <img src={post.picture} alt={`Post ${post.id}`} />
                                        ) : (
                                            <img src={URL.createObjectURL(post.picture)} alt={`Post ${post.id}`} />
                                        )
                                    ) : null}
                                {post.title && <p>{post.title}</p>} 
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