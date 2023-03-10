//database
import { MongoClient } from "mongodb";
import { compare, hash } from "bcrypt"

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
    const users = client.db("feedback").collection("users")

    // check if inputed email already exist in the database
    const result0 = await users.findOne({email:userData.email.toLowerCase() })
    if(result0){
        res.status(409).json({status:409,message:'This email already have an account'})
        return null;
    }

    //insert the data (with hased password)
    async function hashPassword(notHashedPassword){
        return await hash(notHashedPassword,12)
    }
    async function areTheSamePasswords(hashedPassword,notHashedPassword){
        return await compare(hashedPassword,notHashedPassword)
    }
    const hashedPassword = await hashPassword(userData.password)
    const result1 = await users.insertOne({...userData,password:hashedPassword})
    client.close()
    res.status(200).json({status:200,message:'Signed up succesefully'})
}