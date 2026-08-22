import { useState, useContext } from 'react';
import DataContext from './context/DataContext';
import { useNavigate } from 'react-router-dom';
import api from './api/post';

const NewPost = () => {

    const [postTitle, setPostTitle] = useState('');
    const [postBody, setPostBody] = useState('');
    const history = useNavigate();
    const { post, setPost } = useContext(DataContext)


    const handleSubmit = async (e) => {
        e.preventDefault();
        const id = post.length ? post[post.length - 1].id + 1 : 1;
        const newPost = { id, title: postTitle, body: postBody };
        try {
            const response = await api.post('/post', newPost);
            setPost([...post, response.data]);
            setPostTitle('');
            setPostBody('');
            history('/');
        } catch (err) {
            console.log(err);
        } finally {
            console.log('finally');
        }
    }

    return (
        <main>
            <h2>New Post</h2>
            <form className="NewPostForm" onSubmit={handleSubmit}>
                <label htmlFor="postTitle">Title:</label>
                <input type="text" id="postTitle" value={postTitle} required onChange={(e) => setPostTitle(e.target.value)} />
                <label htmlFor="postBody">Body:</label>
                <textarea id="postBody" value={postBody} required onChange={(e) => setPostBody(e.target.value)} />
                <button type="submit">Submit</button>
            </form>
        </main>
    )
}

export default NewPost