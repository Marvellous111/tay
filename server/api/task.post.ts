export default defineEventHandler(async(event) => {
  const body = await readBody(event)


  try {
    console.log("HIT TASK POST")
    const response = await $fetch("https://tayend.onrender.com/create-task/", {
      method: 'POST',
      body: body,
      headers: {
        'Content-Type': 'application/json'
      },
    })

    console.log(response)

    return response

  }catch(error) {
    console.error(`An error occurred in SERVER - TASKS`)
    console.error(error)
    throw error
  }
})