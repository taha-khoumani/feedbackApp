//database
import { MongoClient } from "mongodb";

//helper-functions
import { verifyFeedback } from "@/lib/helper-functions";

export default async function handler (req,res){
    if(req.method !== 'PUT'){
        res.status(405).json({status:405,message:'this is not a post req ! '})
        return null;
    }

    let {_id,feedbackData} = req.body

    console.log(JSON.parse(feedbackData),_id)
    // check if the data is valid
    if(verifyFeedback(JSON.parse(feedbackData)).status === 'error'){
        res.status(400).json({status:400,message:verifyFeedback(JSON.parse(feedbackData)).message})
        return null;
    }
    
    const client = await MongoClient.connect(`mongodb+srv://tagopi:${'DGakye2AgwDd8v2a'}@cluster0.8kpmakb.mongodb.net/?retryWrites=true&w=majority`)
    const feedbacks = client.db(process.env.databaseName).collection("feedbacks")

    //insert the data
    var ObjectId = require('mongodb').ObjectId; 
    const wantedFeedbackId = new ObjectId(_id) 
    const result = await feedbacks.replaceOne({_id:wantedFeedbackId},JSON.parse(feedbackData))
    res.status(200).json({status:200,message:'Feedback updated succesefully',newFeedbackId:req._id})
    client.close()
}