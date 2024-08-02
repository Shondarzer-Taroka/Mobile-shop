const { MongoClient, ServerApiVersion } = require("mongodb");

let db;
let connectDb=async()=>{
    if(db) return db

    try {
       const uri=process.env.NEXT_PUBLIC_MONGODB_URI
        const client = new MongoClient(uri, {
            serverApi: {
              version: ServerApiVersion.v1,
              strict: true,
              deprecationErrors: true,
            }
          });

          db=client.db('mobile-shop')
          return db
        
    } catch (error) {
     console.log(error);   
    }
}

export default connectDb