export default defineEventHandler(async (event) => {
  
  const body = await readBody(event);

  try {
    console.log('HIT TASK GET SERVER')
    const response = await $fetch(`https://tayend.onrender.com/gettasks/${body.username}`, {
      method: 'GET',
    })

    console.log(response)

    return response
  } catch(error) {
    console.log(`An error occured in task get server`)
    console.error(error)
  }
})