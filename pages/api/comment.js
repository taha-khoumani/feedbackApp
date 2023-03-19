//database
import { MongoClient } from "mongodb";

//helper-functions
import { verifyComment} from "@/lib/helper-functions";

export default async function handler (req,res){
    if(req.method !== 'POST'){
        res.status(405).json({status:405,message:'This is suposed to be a POST request.'})
        return null;
    }
    const {commentData,_id} = req.body

    //check if the data is valid
    if(verifyComment(commentData).status === 'error'){
        res.status(400).json({status:400,message:verifyComment(commentData).message})
        return null;
    }
    
    const client = await MongoClient.connect(`mongodb+srv://tagopi:${'DGakye2AgwDd8v2a'}@cluster0.8kpmakb.mongodb.net/?retryWrites=true&w=majority`)
    const feedbacks = client.db(process.env.DATABASE).collection("feedbacks")

    //id object
    var ObjectId = require('mongodb').ObjectId; 
    const wantedFeedbackId = new ObjectId(_id) 

    //get comment
    const originalResult = await feedbacks.findOne({_id:wantedFeedbackId})

    //update comment
    const updatedComment = originalResult.comments.concat(commentData)
    const modifiedResult = await feedbacks.updateOne({_id:wantedFeedbackId},{$set:{comments:updatedComment}})



    res.status(200).json({status:200,message:'Comment posted succesefully'})
    client.close()
}