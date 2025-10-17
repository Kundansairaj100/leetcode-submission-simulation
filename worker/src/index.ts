import { createClient } from "redis";
const client = createClient();

async function processSubmission(submission: string) {
    const {problemId,code,language} = JSON.parse(submission);

    console.log(`Processing ProblemID: ${problemId} `);
    console.log(`Code: ${code}`);
    console.log(`Language: ${language}`);
    await new Promise(resolve => setTimeout(resolve,2000));
    console.log(`Finished Processing for Problem: ${problemId}`);
}

async function startWorker () {
    try {
        await client.connect();
        console.log("Worker Connected to Redis Client");

        while(true) {
            try {
                const submission:any = await client.brPop("problems",0);
                await processSubmission(submission?.element);
            } catch(e) {
                console.log("Error during problem processing: ",e);
            }
        }
    } catch(e) {
        console.log("An Error has occurred: ",e);
    }
}

startWorker();
