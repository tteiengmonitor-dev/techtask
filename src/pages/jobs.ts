export async function getJobs(env: Env){

const stmt = env.DB.prepare("SELECT * FROM jobs")

const { results } = await stmt.all()

return new Response(JSON.stringify(results),{
headers:{ "content-type":"application/json"}
})

}
