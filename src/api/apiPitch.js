import supabaseClient from "../utils/supabase";

// function to pitch to investor
export async function pitchToInvestor(token, _, startupData) {
    const supabase = await supabaseClient(token);
    const { data, error } = await supabase
    .from('pitch') // table name containing pitch for startup
    .insert([{
        ...startupData,
    },
    ]).select()

    if (error) {
        console.error("Error submitting pitch: ", error)
        return null;
    }

    return data;
}

export async function updatePitchStatus(token, {startup_id}, status) {
    
    const supabase = await supabaseClient(token);

        const { data, error } = await supabase
            .from("pitch")
            .update({status})
            .eq("startup_id",startup_id)
            .select();

        if(error || data.length === 0) {
            console.error("Error Updating Pitch Status:", error);
            return null;
        }

        return data;
 }

 export async function getpitches(token, { user_id }) {
    
    const supabase = await supabaseClient(token);

        const { data, error } = await supabase
            .from("pitch")
            .select("*, startup:startups(name, industry)")
            .eq("founder_id",user_id)
            

        if(error) {
            console.error("Error Fetching Pitches:", error);
            return null;
        }

        return data;
 }