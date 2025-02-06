export async function getStartups(token) {
    const supabase = await supabaseClient(token);

    let query = supabase.from("startups").select("*");

        const { data, error } = await query;
        console.log(data);
        if(error){
            console.error("Error fetching Startups:", error);
            return null;
        }

        return data;

}