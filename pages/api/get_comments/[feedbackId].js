//database
import { MongoClient } from "mongodb";

export default async function handler (req,res){
    if(req.method !== 'GET'){
        res.status(405).json({status:405,message:'this is not a post req ! '})
        return null;
    }

    const {feedbackId} = req.query
    
    const client = await MongoClient.connect(`mongodb+srv://tagopi:${'DGakye2AgwDd8v2a'}@cluster0.8kpmakb.mongodb.net/?retryWrites=true&w=majority`)
    const feedbacks = client.db(process.env.databaseName).collection("feedbacks")
    var ObjectId = require('mongodb').ObjectId; 
    const wantedFeedbackId = new ObjectId(feedbackId) 

    //get data
    const result = await feedbacks.findOne({_id:wantedFeedbackId})
    const comments = result.comments

    res.status(200).json({status:200,message:'Comments succesefully fetched.',comments:comments})
    client.close()
}