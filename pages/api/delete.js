//database
import { MongoClient } from "mongodb";

export default async function handler (req,res){
    //check if it is the right http request
    if(req.method !== 'DELETE'){
        res.status(405).json({status:405,message:'This hase to be a DELETE request.'})
        return null;
    }

    //extracting the data from the request object
    const {_id} = req.body

    //connecting to database
    const client = await MongoClient.connect(`mongodb+srv://tagopi:${'DGakye2AgwDd8v2a'}@cluster0.8kpmakb.mongodb.net/?retryWrites=true&w=majority`)
    const feedbacks = client.db(process.env.databaseName).collection("feedbacks")

    //making the mongodb id Object
    var ObjectId = require('mongodb').ObjectId; 
    const wantedFeedbackId = new ObjectId(_id) 

    //delete the feedback
    const result = await feedbacks.deleteOne({_id:wantedFeedbackId})
    res.status(200).json({status:200,message:'Feedback deleted succesefully.'})
    client.close()
}