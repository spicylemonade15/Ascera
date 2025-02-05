import { useSession } from '@clerk/clerk-react';
import React, { useState } from 'react'

// custom hook to fetch data from supabase
const useFetch = (cb, options = {}) => {
    // to store data fetched if any 
    const [data, setData] = useState(undefined);

    // to check loading status 
    const [loading, setLoading] = useState(null);

    // to check any errors
    const [error, setError] = useState(null);

    // current user session from clerk
    const { session } = useSession();

    // function to fetch data from supabase
    const fn = async (...args) => {
        setLoading(true);
        setError(null);

        try {
            // get supabase token from current session
            const supabaseAccessToken = await session.getToken({
                template: "supabase",
            })

            // awaiting response from the callback function 
            const response = await cb(supabaseAccessToken, options, ...args);

            // store response in data
            setData(response);
            console.log(response);

            // no error found
            setError(null);

        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    }

    // log whatever data is being fetched
    console.log(data);

    // return data fetched, loading status, errors and function
    return { data, loading, error, fn };
}

export default useFetch
