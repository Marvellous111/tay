export default defineEventHandler(async(event) => {
  const body = await readBody(event)


  try {
    const response = $fetch("http://127.0.0.1:8000/create-task/", {
      method: 'POST',
      body: body,
      headers: {
        'Content-Type': 'application/json'
      },
    })

    return response.data
  }catch(error) {
    console.error(`An error occurred in SERVER - TASKS`)
    console.error(error)
  }
})