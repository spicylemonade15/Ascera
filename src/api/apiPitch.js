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