// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import {MongoClient} from "mongodb"

export async function connectToDB (password){
    const client = await MongoClient.connect(`mongodb+srv://tagopi:${password}@cluster0.8kpmakb.mongodb.net/?retryWrites=true&w=majority`)
    return client
}

export default function handler(req, res) {
  res.status(200).json({ name: 'John Doe' })
}
