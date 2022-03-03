import express from "express";
import cors from "cors";
import dialogflow from '@google-cloud/dialogflow';


const app = express();
app.use(cors())
app.use(express.json())
const PORT = process.env.PORT || 4000;
// const private_key = process.env.private_key
// const client_email = "firebase-adminsdk-gpsgd@firstcarbot-glii.iam.gserviceaccount.com"


// const sessionClient = new dialogflow.SessionsClient({
//     credentials: {
//         client_email: client_email,
//         private_key: private_key,
//     },

// });
const sessionClient = new dialogflow.SessionsClient();


app.post("/talktochatbot", async (req, res) => {
    const projectId = "firstcarbot-glii"
    const sessionId = "session123"
    const query = req.body.text
    const languageCode  = "en-US"

    // The path to identify the agent that owns the created intent.
    const sessionPath = sessionClient.projectAgentSessionPath(
        projectId,
        sessionId
    )

    // The text query request.
    const request = {
        session: sessionPath,
        queryInput: {
            text: {
                text: query,
                languageCode: languageCode
            },
        },
    }

    const response = await sessionClient.detectIntent(request);
    // console.log("Response", response)
    console.log("Response", response[0].queryResult.fulfillmentText)

    res.send({
        text: response[0].queryResult.fulfillmentText
    })

})




// Boiler Plate Code
app.get("/", (req, res) => {
    res.send("here is your server");
})
app.get("/profile", (req, res) => {
    res.send("here is your profile");
})
app.get("/about", (req, res) => {
    res.send("some information about me");
})
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});
