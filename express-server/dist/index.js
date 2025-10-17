import express from "express";
import { createClient } from "redis";
const app = express();
app.use(express.json());
const client = createClient();
client.on('error', (err) => console.log("Redis client error: ", err));
// Handling problem submission
app.post("/submission", async (req, res) => {
    const problemId = req.body.problemId;
    const code = req.body.code;
    const language = req.body.language;
    try {
        client.lPush("problems", JSON.stringify({ problemId, code, language }));
        res.status(200).send("Submission has been recived !....Processing......");
    }
    catch (e) {
        res.status(500).send("Error has occured on submission");
    }
});
const serverStart = async () => {
    try {
        await client.connect();
        app.listen(3030, () => console.log("Primary Backend Running on 3030"));
    }
    catch (e) {
        console.log("Error has occured on startUp!");
    }
};
serverStart();
//# sourceMappingURL=index.js.map