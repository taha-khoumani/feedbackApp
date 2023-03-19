//database
import { MongoClient } from "mongodb";
import { hash } from "bcrypt"

//helper-functions
import { verifySignUp} from "@/lib/helper-functions";

export default async function handler (req,res){
    if(req.method !== 'POST'){
        res.status(405).json({status:405,message:'this is not a post req ! '})
        return null;
    }

    const userData = req.body

    //check if the data is valid
    if(verifySignUp(userData).status === 'error'){
        res.status(400).json({status:400,message:verifySignUp(userData).message})
        return null;
    }
    
    const client = await MongoClient.connect(`mongodb+srv://tagopi:${'DGakye2AgwDd8v2a'}@cluster0.8kpmakb.mongodb.net/?retryWrites=true&w=majority`)
    const users = client.db(process.env.DATABASE).collection("users")

    // check if the user's email is already signed up
    const emailResult = await users.findOne({email:userData.email})
    if(emailResult){
        client.close()
        res.status(409).json({status:409,message:'This email is already signed up'})
        return null;
    }

    //check if the username is already taken
    const usernameResult = await users.findOne({userName:userData.userName})
    if(usernameResult){
        client.close()
        res.status(409).json({status:409,message:'This username has been already taken'})
        return null;
    }

    //insert the data (with hased password)
    async function hashPassword(notHashedPassword){
        return await hash(notHashedPassword,12)
    }
    const hashedPassword = await hashPassword(userData.password)
    const result1 = await users.insertOne({...userData,password:hashedPassword})
    client.close()
    res.status(200).json({status:200,message:'Signed up succesefully'})
}