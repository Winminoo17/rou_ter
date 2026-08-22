// Edit.js
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import DataContext from './context/DataContext';
import api from './api/post';

const Edit = () => {
    const [editTitle, setEditTitle] = useState('');
    const [editBody, setEditBody] = useState('');
    const { post, setPost } = useContext(DataContext);

    const { id } = useParams();
    const foundPost = post.find((p) => Number(p.id) === Number(id));
    const history = useNavigate();

    const handleEdit = async (id) => {
        const updatedPost = { id, title: editTitle, body: editBody };
        try {
            const response = await api.put(`/post/${id}`, updatedPost);
            setPost(post.map((p) => p.id === id ? { ...response.data } : p));
            setEditTitle('');
            setEditBody('');
            history('/');
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        if (foundPost) {
            setEditTitle(foundPost.title);
            setEditBody(foundPost.body);
        }
    }, [foundPost, setEditTitle, setEditBody]);

    return (
        <main>
            {editTitle ? (
                <>
                    <h2>Edit Post</h2>
                    <form className="NewPostForm" onSubmit={(e) => e.preventDefault()}>
                        <label htmlFor="editTitle">Title:</label>
                        <input
                            type="text"
                            id="editTitle"
                            value={editTitle}
                            required
                            onChange={(e) => setEditTitle(e.target.value)}
                        />
                        <label htmlFor="editBody">Body:</label>
                        <textarea
                            id="editBody"
                            value={editBody}
                            required
                            onChange={(e) => setEditBody(e.target.value)}
                        />
                        <button type="submit" onClick={() => handleEdit(Number(id))}>Submit</button>
                    </form>
                </>
            ) : (
                <p>Post not found... Go to <Link to="/">Home</Link></p>
            )}
        </main>
    );
};

export default Edit;
