// application programming interface for fetching investor data 

import supabaseClient from "../utils/supabase";

// function to get all investors 
export async function getInvestors(token) {

    // creates a client by taking token
    const supabase = await supabaseClient(token)

    // store data and error obtained
    const { data, error } = await supabase
    .from('investors') // table name
    .select('*') // select all info

    // in case of error
    if (error) {
        console.error("Error fetching investors: ", error)
        return null
    }

    // return data fetched from supabase
    return data
}
