import supabaseClient from "../utils/supabase";

export async function getStartups(token, { location, industry, searchQuery}) {
    const supabase = await supabaseClient(token);

    let query = supabase
    .from('startups')
    .select("*");

    if (location) {
        query = query.eq("location", location);
    }

    if (industry) {
        query = query.eq("industry", industry);
    }

    if (searchQuery) {
        query = query.ilike("name", `%${searchQuery}%`);
    }

        const { data, error } = await query;
        
        if(error){
            console.error("Error fetching Startups:", error);
            return null;
        }

        return data;

}

// function to create startups
export async function addNewStartup(token, _, startupData) {
    const supabase = await supabaseClient(token);

    const { data, error } = await supabase
    .from("startups")
    .insert([startupData])
    .select()

        if (error) {
            console.error("Error Creating startup:", error);
            return null;
        }

        
        return data;
}

export async function getMyStartups(token, {founder_id}) {
    
    const supabase = await supabaseClient(token); 

        const { data, error } = await supabase 
        .from("startups")
        .select("*")
        .eq("founder_id",founder_id);

        if(error) {
            console.error("Error Fetching Startups:", error);
            return null;
        }

return data;
}

// function to fetch single startup
export async function getSingleStartup(token, {startup_id}) {
    const supabase = await supabaseClient(token);

    let query = supabase 
    .from("startups")
    .select("*")
    .eq("id", startup_id)
    .single();

    const { data, error } = await query;

        if (error) {
            console.error("Error Fetching Startup:", error);
            return null;
        }

        
        return data;
}

// 