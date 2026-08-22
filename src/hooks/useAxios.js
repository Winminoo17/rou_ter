import { useState, useEffect } from 'react';
import axios from 'axios';

const useAxios = (url) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let isMounted = true; // ❌ ူlet → ✅ let
        const source = axios.CancelToken.source();

        const fetchData = async (url) => {
            setLoading(true); // ❌ setIsLoading(ture) → ✅ setLoading(true)
            try {
                const response = await axios.get(url, {
                    cancelToken: source.token,
                });
                if (isMounted) {
                    setData(response.data);
                    setLoading(false);
                    setError(null);
                }
            } catch (err) {
                if (isMounted) {
                    setData([]);
                    setError(err.message);
                    setLoading(false);
                }
            }
        };

        fetchData(url);

        return () => {
            isMounted = false;
            source.cancel();
        };
    }, [url]);

    return { data, loading, error };
};

export default useAxios;
