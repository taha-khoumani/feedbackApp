//database
import { MongoClient } from "mongodb";

export default async function handler (req,res){
    if(req.method !== 'PATCH'){
        res.status(405).json({status:405,message:'This is suposed to be a PATCH request.'})
        return null;
    }

    const {feedbackId,from,action} = req.body

    //connect to database
    const client = await MongoClient.connect(`mongodb+srv://tagopi:${'DGakye2AgwDd8v2a'}@cluster0.8kpmakb.mongodb.net/?retryWrites=true&w=majority`)
    const feedbacks = client.db(process.env.databaseName).collection("feedbacks")

    //id object
    var ObjectId = require('mongodb').ObjectId; 
    const wantedFeedbackId = new ObjectId(feedbackId) 

    //get feedback
    const originalResult = await feedbacks.findOne({_id:wantedFeedbackId})
    const {length,from:From} = originalResult.upvotes

    //update comment
    const updatedUpvotes = {
        length: action ? length+1 : length-1,
        from: action ? From.concat(from) : From.filter(username=> username !== from)
    }

    const modifiedResult = await feedbacks.updateOne({_id:wantedFeedbackId},{$set:{upvotes:updatedUpvotes}})

    res.status(200).json({status:200,message:'Upvotes updated succesefully'})
    client.close()
}