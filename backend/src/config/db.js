import mongooose from "mongoose"

export const connectDB = async () => {
    try{
       await mongooose.connect(process.env.MONGO_URL);
       console.log("MONGODB CONNECTED");
    }catch(error){
        console.log("Error connecting mongodb", error);
        process.exit(1); //exit with failure
    }
}