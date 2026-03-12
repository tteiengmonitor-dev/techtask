export async function getTasks(env: Env){

const stmt = env.DB.prepare("SELECT * FROM tasks")

const { results } = await stmt.all()

return new Response(JSON.stringify(results),{
headers:{ "content-type":"application/json"}
})

}
