


const express= require("express")
const dotenv = require("dotenv")
const mongoose = require("mongoose")
const User = require("./User")


dotenv.config()

mongoose.connect(`${process.env.MONGODB_URL}`)
    .then(()=>{
    console.log("Mongodb is connected")
})



const app = express()

app.use(express.json())

const PORT = process.env.PORT



app.listen(PORT,()=>{
    console.log(`Server is Running on ${PORT}`)
})








app.post("/add-user",async (request,response)=>{
    const {Name,Email,Age} = request.body

    if(Name.length <= 3){
        response.status(400).json({
            message : "Name must be 3 character long"
        })

    }



    const newUser = new User({Name,Email,Age})

    await newUser.save()

    return response.status(200).json({
        message:"Successful Registration",
        user: newUser
    })
})



app.post("/update-email",async (request,response)=>{

    const { Name,Email} = request.body

    const Updateuser =await User.findOne({Name})

    Updateuser.Email = Email;

    await Updateuser.save()

    return response.json({
        message:"Updated Successfully",
        user: Updateuser
    })



})


app.post("/add-users", async(request, response)=>{
    
    const users = request.body

    for(const user of users){
        if(user.Age < 18 || user.Age > 99){
            return response.status(400).json({
                message:`User ${user.Name} has an invalid age.`
            })
        }
    }
    
    //constlistuser= new User(users)

    //listuser.save()

    for (const user of users) {
        const newUser = new User(user);
        await newUser.save(); // Save each user document
    }
    
    response.status(201).json({
        message: "Users added successfully."
    })

})



app.get("/all", async(request,response)=>{

    const alluser = await User.find()

    return response.status(200).json({
        message:"all users",
        alluser
    })

})