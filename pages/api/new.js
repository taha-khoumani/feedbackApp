//database
import { MongoClient } from "mongodb";

//helper-functions
import { verifyFeedback } from "@/lib/helper-functions";

//auth
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import { getServerSession } from "next-auth/next"

export default async function handler (req,res){
    //methode validation
    if(req.method !== 'POST'){
        res.status(405).json({status:405,message:'this is not a post req ! '})
        return null;
    }

    //auth validation
    const session = await getServerSession(req, res, authOptions)
    if(!session){
        res.status(405).json({status:405,message:"You have to Sign In before posting a feedback."})
        return null;
    }

    const {feedbackData} = req.body

    //check if the data is valid
    if(verifyFeedback(feedbackData).status === 'error'){
        res.status(400).json({status:400,message:verifyFeedback(feedbackData).message})
        return null;
    }
    
    const client = await MongoClient.connect(`mongodb+srv://tagopi:${'DGakye2AgwDd8v2a'}@cluster0.8kpmakb.mongodb.net/?retryWrites=true&w=majority`)
    const feedbacks = client.db(process.env.DATABASE).collection("feedbacks")

    //insert the data
    const result = await feedbacks.insertOne(feedbackData)
    res.status(200).json({status:200,message:'Feedback added succesefully',newFeedbackId:result.insertedId})
    client.close()
}