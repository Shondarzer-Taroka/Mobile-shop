const { default: connectDb } = require("@/lib/connectDB");

export const POST = async (request) => {
    try {
        console.log(request);
        let newUser = await request.json()
        let db =await connectDb()
        let usersCollection = await db.collection('users')
        let result = await usersCollection.insertOne(newUser)
        return Response.json({ message: 'new user created' })



    } catch (error) {
        return Response.json({message:"something went wrong"})
    }

}


