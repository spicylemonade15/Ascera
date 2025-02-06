// application programming interface for fetching investor data 

import supabaseClient from "../utils/supabase";

// function to get all investors 
export async function getInvestors(token) {

    // creates a client by taking token
    const supabase = await supabaseClient(token)

    let query = supabase
    .from('investors')
    .select("*")

    // return data fetched from supabase
    const { data, error } = await query;

    // in case of error
    if (error) {
        console.error("Error fetching investors: ", error)
        return null
    }
    return data
}

// function to create add new investors
export async function addInvestor(token, _, investorData) {
    const supabase = await supabaseClient(token);
    const { data, error } = await supabase
    .from('investors') 
    .insert([investorData]) // insert data 
    .select()
    console.log("investor data", investorData);
    if (error) {
        console.error("Error adding investor: ", error);
        return null;
    }

    return data;
}

