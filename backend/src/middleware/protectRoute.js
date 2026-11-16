import { requireAuth } from "@clerk/express";

import User from '../models/User.js'

export const protectRoute=[
    requireAuth({signInUrl:"/sign-in"}),
    async(req,res,next)=>{
        try{
            const clerkId =req.auth().userId;
            if(!clerkId)return res.status(401).json({msg:"Unauthorized -invalid token"})

                //find user in db bu clerk id
                const user=await User.findOne({clerkId})
                if(!user)return res.status(404).json({msg:"uSER NOT FOUND"})
                //atach user 
                req.user=user
                next();
        }catch(Error){
            console.Error("Error in protect middleware",error)
            res.status(500).json({msg:"Internal Server Error"})

        }
    }
]