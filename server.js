import express from "express"
import { password } from "./models/Password.js"
import mongoose from "mongoose"
import  dotenv  from "dotenv"
import cors from "cors"
const app = express()
const port = 3000

app.use(express.json())

const allowedOrigins = [
  'https://password-manager-seven-flame.vercel.app',
  'https://www.password-manager-seven-flame.vercel.app'
]

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true)

    const normalizedOrigin = origin.endsWith('/') ? origin.slice(0, -1) : origin
    if (allowedOrigins.includes(normalizedOrigin)) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}))

app.options('*', cors())

mongoose.connect(process.env.MONGO_URI)

app.post('/api/password', async (req, res) => {
     console.log(req.body)
    const newPassword=new password(req.body)
    await newPassword.save()
    res.json(newPassword)
})

app.get('/api/password',async (req, res) => {
     const passwords=await password.find()
     res.json(passwords)
})

app.put('/api/password/:id',async (req, res) => {
    try{

         const id=req.params.id
          const Updated_passwords=await password.findByIdAndUpdate({_id:id},req.body,{new:true})
     
          res.json(Updated_passwords)
    } 
    catch(err){
     res.json({message:err.message})
    }
})

app.delete('/api/password/:id',async (req, res) => {
     let id=req.params.id
     console.log(id)
     let passwords=await password.deleteOne({_id:id})
     res.json({message:"Password deleted Successfully"})
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
