import { Link } from 'react-router-dom';
import { useContext } from 'react';
import DataContext from './context/DataContext';

const Home = () => {

    const { searchResult, loading, error } = useContext(DataContext)
    return (
        <main className="home">
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {!loading && !error && (
                searchResult.length ?
                    searchResult.map((p) => (
                        <article className="post" key={p.id}>
                            <h2>{p.title}</h2>
                            <p>{p.body}</p>
                            <Link to={`/post/${p.id}`}><button>View Post</button></Link>
                        </article>
                    )) :
                    <p>No posts to display</p>
            )}

        </main>
    );
};

export default Home;
