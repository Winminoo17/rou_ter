// PostPage.js
import { useParams, Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import DataContext from "./context/DataContext";
import api from "./api/post";

const PostPage = () => {
    const { post, setPost } = useContext(DataContext);
    const { id } = useParams();
    const history = useNavigate();

    const handleDelete = async (id) => {
        try {
            await api.delete(`/post/${id}`);
            const postlist = post.filter((post) => post.id !== id);
            setPost(postlist);
            history('/');
        } catch (err) {
            console.log(err);
        }
    }

    const foundPost = post.find((p) => Number(p.id) === Number(id));

    return (
        <main className="postPage">
            <article className="post">
                {foundPost ? (
                    <>
                        <h2>{foundPost.title}</h2>
                        <p>{foundPost.body}</p>
                        <Link to={`/edit/${foundPost.id}`}><button>Edit</button></Link>
                        <button onClick={() => handleDelete(foundPost.id)}>Delete</button>
                    </>
                ) : (
                    <p>Post not found... Go to <Link to="/">Home</Link></p>
                )}
            </article>
        </main>
    );
};

export default PostPage;
