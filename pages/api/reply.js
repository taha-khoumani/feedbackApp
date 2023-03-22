//database
import { MongoClient } from "mongodb";

//helper-functions
import { verifyComment} from "@/lib/helper-functions";

//auth
import { authOptions } from "./auth/[...nextauth]";
import { getServerSession } from "next-auth";

export default async function handler (req,res){
    if(req.method !== 'POST'){
        res.status(405).json({status:405,message:'This is suposed to be a POST request.'})
        return null;
    }

    //auth validation
    const session = await getServerSession(req, res, authOptions)
    if(!session){
        res.status(405).json({status:405,message:"You have to Sign In before posting a feedback."})
        return null;
    }

    const {replyData,_id,commentId} = req.body

    //check if the data is valid
    if(verifyComment(replyData).status === 'error'){
        res.status(400).json({status:400,message:verifyComment(replyData).message})
        return null;
    }
    
    const client = await MongoClient.connect(`mongodb+srv://tagopi:${'DGakye2AgwDd8v2a'}@cluster0.8kpmakb.mongodb.net/?retryWrites=true&w=majority`)
    const feedbacks = client.db(process.env.DATABASE).collection("feedbacks")

    //id object
    var ObjectId = require('mongodb').ObjectId; 
    const wantedFeedbackId = new ObjectId(_id) 

    //get feedback
    const originalResult = await feedbacks.findOne({_id:wantedFeedbackId})

    //make a new replies array
    const targetedComment = originalResult.comments.find(comment=>comment.id === commentId)
    const newComment = {
        ...targetedComment,
        replies: [...targetedComment.replies,replyData]
    }

    const newComments = originalResult.comments.map( comment=> comment.id === commentId ? newComment : comment )

    //post in database
    const modifiedResult = await feedbacks.updateOne({_id:wantedFeedbackId},{$set:{comments:newComments}})

    res.status(200).json({status:200,message:'Reply posted succesefully'})
    client.close()
}