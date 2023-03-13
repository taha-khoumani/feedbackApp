//next-auth
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

//database
import { compare,hash} from "bcrypt"
import { MongoClient } from "mongodb";

export const authOptions = {
  secret: process.env.AUTH_SECRET,
  providers: [
    CredentialsProvider({
      async authorize(credentials,req){
        const {email:inputedEmail,password:inputedPassword} = credentials

        //connect to database
        const client = await MongoClient.connect(`mongodb+srv://tagopi:${'DGakye2AgwDd8v2a'}@cluster0.8kpmakb.mongodb.net/?retryWrites=true&w=majority`)
        const db = client.db('feedback')
        const users = db.collection("users")

        //check credentials legetemecy
        async function areTheSamePasswords(hashedPassword,notHashedPassword){
            return await compare(hashedPassword,notHashedPassword)
        }
        const result = await users.findOne({email:inputedEmail})

        //if email is not registered
        if(!result){
            client.close()
            throw new Error("This email is not signed up.")
            return;
        };

        //if password is wrong
        if(!await areTheSamePasswords(inputedPassword,result.password)){
            client.close()
            throw new Error("The password is wrong.")
            return;
        }

        const {firstName,lastName,userName,email} = result
        client.close()
        return Promise.resolve({firstName:result.firstName,lastName,userName,email})
      }
    })
  ],
    callbacks: {
    async jwt({token, user}) {
      if (user?.firstName) {
        token.firstName = user.firstName
      }
      if (user?.lastName) {
        token.lastName = user.lastName
      }
      if (user?.userName) {
        token.userName = user.userName;
      }
      return token
    },
  
    async session({session,token}) {
      const {firstName,lastName,userName,email} = token
      session.user.email = email;
      session.user.userName = userName;
      session.user.firstName = firstName;
      session.user.lastName = lastName;
      return session
    }
  }
}

export default NextAuth(authOptions)