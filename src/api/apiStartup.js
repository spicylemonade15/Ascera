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