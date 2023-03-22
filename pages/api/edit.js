//database
import { MongoClient } from "mongodb";

//helper-functions
import { verifyFeedback } from "@/lib/helper-functions";

//auth
import { authOptions } from "./auth/[...nextauth]";
import { getServerSession } from "next-auth";

export default async function handler (req,res){
    if(req.method !== 'PUT'){
        res.status(405).json({status:405,message:'this is not a post req ! '})
        return null;
    }

    //auth validation
    const session = await getServerSession(req, res, authOptions)
    if(!session){
        res.status(405).json({status:405,message:"You have to Sign In before posting a feedback."})
        return null;
    }

    const {_id,feedbackData} = req.body

    // check if the data is valid
    if(verifyFeedback(feedbackData).status === 'error'){
        res.status(400).json({status:400,message:verifyFeedback(feedbackData).message})
        return null;
    }
    
    const client = await MongoClient.connect(`mongodb+srv://tagopi:${'DGakye2AgwDd8v2a'}@cluster0.8kpmakb.mongodb.net/?retryWrites=true&w=majority`)
    const feedbacks = client.db(process.env.DATABASE).collection("feedbacks")

    //insert the data
    var ObjectId = require('mongodb').ObjectId;
    const wantedFeedbackId = new ObjectId(_id) 
    
    //rights validation
    const feedbackResult = await feedbacks.findOne({_id:wantedFeedbackId})
    if(session.user.userName !== feedbackResult.user){
        res.status(405).json({status:405,message:"You are not the feedback owner to delete it."})
        return null;
    }

    const {title,description,category} = feedbackData
    const result = await feedbacks.updateOne({_id:wantedFeedbackId},{$set:{
        title:title,
        description:description,
        category:category,
    }})
    res.status(200).json({status:200,message:'Feedback updated succesefully',newFeedbackId:_id})
    client.close()
}