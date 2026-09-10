import {StreamChat} from "stream-chat"
import{StreamClient} from "@stream-io/node-sdk"
import{ENV} from "./env.js"

const apikey=ENV.STREAM_API_KEY
const apiSecret=ENV.STREAM_API_SECRET

if(!apikey || !apiSecret){
    console.error("Stream key or secret key is missing")
}

export const chatClient=StreamChat.getInstance(apikey,apiSecret)//this is for chat
export const streamClient=new StreamClient(apikey,apiSecret)//for video calling

export const upsertStreamUser=async(userData)=>{
    try{
        await chatClient.upsertUser(userData);
        console.log("Stream user updated successfully",userData);
    }catch(error){
        console.error("error upserting stream user:",error)
    }
}

export const deleteStreamUser=async(userId)=>{
    try{
        await chatClient.deleteUser(userId );
        console.log("Stream user deleted successfully",userId);
    }catch(error){
        console.error("error deleting stream user:",error)
    }
}

