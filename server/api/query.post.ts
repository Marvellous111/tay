// server/api/query.ts
export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  // Set up streaming response
  setHeader(event, 'Content-Type', 'text/event-stream');
  setHeader(event, 'Cache-Control', 'no-cache');
  setHeader(event, 'Connection', 'keep-alive');

  try {
    console.log('HIT')
    // Make the request to the backend
    const response = await $fetch('http://127.0.0.1:8000/postquery/', {
      method: 'POST',
      body,
      headers: {
        'Content-Type': 'application/json',
      },
      // responseType: 'stream',
    });

    // Create a TransformStream to send chunks to the client
    // const { readable, writable } = new TransformStream();
    // const writer = writable.getWriter();

    // // Read the backend stream and parse it
    // const reader = response.pipeThrough(new TextDecoderStream()).getReader();
    // while (true) {
    //   const { value, done } = await reader.read();
    //   if (done) {
    //     writer.close();
    //     break;
    //   }

    //   // Parse the incoming data (e.g., "STEP_START::0::write a simple poem...")
    //   // const [step_status, step_number, step_task] = value.replace('data: ', '').split('::');
    //   // const parsedChunk = {
    //   //   type: step_status.startsWith('STEP_') ? 'PLAN' : 'ANSWER', // Adjust based on your needs
    //   //   details: {
    //   //     step_status,
    //   //     step_number,
    //   //     step_task: step_task.startsWith('$') ? step_task.slice(1) : step_task, // Remove $ prefix if present
    //   //   },
    //   // };

    //   // Send the parsed chunk to the client
    //   await writer.write(new TextEncoder().encode(value));
    // }

    return response;
  } catch (error) {
    console.error('Error in /api/query:', error);
    // const writer = new TransformStream().writable.getWriter();
    // await writer.write(new TextEncoder().encode(`data: {"error": "Failed to process query"}\n\n`));
    // await writer.close();
    throw error;
  }
});