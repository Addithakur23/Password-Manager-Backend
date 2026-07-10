import mongoose from "mongoose";
import express from "express";

const PasswordSchema=new mongoose.Schema({
    Website:String,
    Username:String,
    Password:String
})

export const password=mongoose.model("Password",PasswordSchema)