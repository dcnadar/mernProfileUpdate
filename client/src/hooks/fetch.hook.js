import axios from "axios";
import { useEffect, useState } from "react";
axios.defaults.baseURL = 'http://localhost:8080'
// import { getUsername } from '../helper/helper.js'



// custom hook
export default function useFetch(query) {
    const [getData, setData] = useState({ isLoading: false, apiData: undefined, status: null, serverError: null })
    useEffect(() => {
        // remove after token created
        if (!query) return;

        const fetchData = async () => {
            try {
                setData(prev => ({ ...prev, isLoading: true }))
                // add after token created
                // const { username } = !query ? await getUsername() : '';
                // const { data, status } =  !query ? await axios.get(`/api/user/${username}`):await axios.get(`/api/${query});



                // remove after token created    
                const { data, status } = await axios.get(`/api/${query}`)
                // console.log(data);
                // console.log(status);

                if (status === 200) {  //status errorr
                    setData(prev => ({ ...prev, isLoading: false }))
                    setData(prev => ({ ...prev, apiData: data, status: status }))
                    // console.log({ apiData: data });
                }
                // console.log(data);
                setData(prev => ({ ...prev, isLoading: false }))
            } catch (error) {
                setData(prev => ({ ...prev, isLoading: false, serverError: error }))

            }
        }

        fetchData()
    }, [query])
    return [getData, setData];
}
