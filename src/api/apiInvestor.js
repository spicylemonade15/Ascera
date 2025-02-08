// application programming interface for fetching investor data 

import supabaseClient from "../utils/supabase";

// function to get all investors 
export async function getInvestors(token) {

    // creates a client by taking token
    const supabase = await supabaseClient(token)

    let query = supabase
    .from("investors")
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

// function to check if profile created
export async function checkInvestorProfile(token, investorId) {
    const supabase = await supabaseClient(token);
    const { data, error } = await supabase
    .from('investors')
    .select('investor_id')
    .eq('investor_id', investorId)

    if (error) {
        console.error("Error checking investor profile: ", error);
    }

    return data;
}

// function to get single investor
// function to fetch single startup
export async function getSingleInvestor(token, {id}) {
    const supabase = await supabaseClient(token);

    let query = supabase 
    .from("investors")
    .select("*")
    .eq("id", id)
    .single();

    const { data, error } = await query;

        if (error) {
            console.error("Error Fetching Startup:", error);
            return null;
        }

        
        return data;
}
