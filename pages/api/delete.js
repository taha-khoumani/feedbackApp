//database
import { MongoClient } from "mongodb";

//auth
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";

export default async function handler (req,res){
    //check if it is the right http request
    if(req.method !== 'DELETE'){
        res.status(405).json({status:405,message:'This hase to be a DELETE request.'})
        return null;
    }

    //auth validation
    const session = await getServerSession(req, res, authOptions)
    if(!session){
        res.status(405).json({status:405,message:"You have to Sign In before posting a feedback."})
        return null;
    }

    //extracting the data from the request object
    const {_id} = req.body

    //connecting to database
    const client = await MongoClient.connect(`mongodb+srv://tagopi:${'DGakye2AgwDd8v2a'}@cluster0.8kpmakb.mongodb.net/?retryWrites=true&w=majority`)
    const feedbacks = client.db(process.env.DATABASE).collection("feedbacks")

    //making the mongodb id Object
    var ObjectId = require('mongodb').ObjectId; 
    const wantedFeedbackId = new ObjectId(_id) 

    //rights validation
    const feedbackResult = await feedbacks.findOne({_id:wantedFeedbackId})
    if(session.user.userName !== feedbackResult.user){
        res.status(405).json({status:405,message:"You are not the feedback owner to delete it."})
        return null;
    }

    //delete the feedback
    const result = await feedbacks.deleteOne({_id:wantedFeedbackId})
    res.status(200).json({status:200,message:'Feedback deleted succesefully.'})
    client.close()
}