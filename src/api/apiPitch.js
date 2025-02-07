import supabaseClient from "../utils/supabase";

// function to pitch to investor
export async function pitchToInvestor(token, _, startupData) {
    const supabase = await supabaseClient(token);
    const { data, error } = await supabase
    .from('pitch') // table name containing pitch for startup
    .insert([{
        ...startupData,
    },
    ])
    .select()

    if (error) {
        console.error("Error submitting pitch: ", error)
        return null;
    }

    return data;
}

export async function updatePitchStatus(token, {founder_id, status} ) {
    
    const supabase = await supabaseClient(token);

        const { data, error } = await supabase
            .from("pitch")
            .update({status})
            .eq("founder_id",founder_id)
            .select();

        if(error || data.length === 0) {
            console.error("Error Updating Pitch Status:", error);
            return null;
        }

        return data;
 }

 export async function getPitchedStartups(token, { investor_id }) {
    
    const supabase = await supabaseClient(token);

        const { data, error } = await supabase
            .from("pitch")
            .select("*")
            .eq("investor_id",investor_id)
            

        if(error) {
            console.error("Error Fetching Pitches:", error);
            return null;
        }

        return data;
 }