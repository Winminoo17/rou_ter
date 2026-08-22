import { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/post';
import useAxios from '../hooks/useAxios';

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
    const [search, setSearch] = useState('');
    const [post, setPost] = useState([]);

    const [searchResult, setSearchResult] = useState([]);
    const { data, loading, error } = useAxios('http://localhost:3500/post');

    useEffect(() => {
        setPost(data);
    }, [data])




    useEffect(() => {
        const filterResult = post.filter((post) => post.title.toLowerCase().includes(search.toLowerCase()));
        setSearchResult(filterResult);
    }, [post, search])


    return (
        <DataContext.Provider value={{
            search,
            setSearch,
            searchResult,
            loading,
            error,
            post,
            setPost
        }}>
            {children}
        </DataContext.Provider>
    )
}

export default DataContext;