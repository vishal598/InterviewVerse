import { chatClient, streamClient } from "../lib/stream.js"
import Session from "../models/Session.js"
export async function createSession(req,res){
    try{
        const {problem,difficulty}=req.body
        const userId=req.user._id
        const clerkId=req.user.clerkId

        if(!problem||!difficulty){
            return res.status(400).json({message:"problem and difficulty are required"})
        }

        const callId=`session_${Date.now()}_${Math.random().toString(36).substring(7)}`

        const sessions = await Session.create({problem,difficulty,host:userId,callId})

        await streamClient.video.call("default",callId).getOrCreate({
            data:{
                created_by_id:clerkId,
                custom:{problem,difficulty,sessionId:sessions._id.toString()}
            }
        })

        const channel=chatClient.channel("messaging",callId,{
            name:`${problem} Session`,
            members:[clerkId],
            created_by_id:clerkId,
        })
        await channel.create()
        res.status(201).json({sessions})
    }catch(error){
        console.log("error in create Session controller",error.message)
        res.status(500).json({message:"Internal Server Error"})
    }
}

export async function getActiveSession(req,res){
    try{
        const sessions = await Session.find({status:"active"}).populate("host","name profileImage email clerkId")
        .populate("participant","name profileImage email clerkId")
        .sort({createdAt:-1})
        .limit(20);

        res.status(200).json({sessions})
    }catch(error){
        console.log("error in getactivatessesiion",error.message)
        res.status(500).json({message:"internel error"})
    }
}

export async function getMyRecentSession(req,res){
    try{
        const userId=req.user._id;
        const sessions= await Session.find({
            status:"completed",
            $or:[{host:userId},{participant:userId}]
        }).sort({createdAt:-1})
        .limit(20)

        res.status(200).json({ sessions });
    }catch(error){
        console.log("error in getMYssesiion",error.message)
        res.status(500).json({message:"internel error"})
        
    }
}

export async function getSessionById(req,res){
    try{
        const {id}=req.params
        const sessions=await Session.findById(id)
        .populate("host","name profileImage email clerkId")
        .populate("participant","name profileImage email clerkId")

        if(!sessions)return res.status(404).json({message:"session not found"})

        res.status(200).json({sessions})
    }catch(error){
        console.log("error in getssesiionbyid",error.message)
        res.status(500).json({message:"internel error"})
    }
}
export async function leaveSession(req,res) {
  console.log("HANDLE LEAVE CALLED");

  try {
    const { id } = req.params;
    const userId = req.user._id;
    const clerkId = req.user.clerkId;

    const session = await Session.findById(id);

    if (!session) {
      return res.status(404).json({message:"Session not found"});
    }

    if (
      session.participant &&
      session.participant.toString() === userId.toString()
    ) {

      session.participant = null;
      await session.save();


      // remove from stream chat
      const channel = chatClient.channel(
        "messaging",
        session.callId
      );

      await channel.removeMembers([clerkId]);

    }

   return res.status(200).json({
      message: "Left session successfully"
    });

  } catch(error){
    console.log(error);
    res.status(500).json({
      message:"Internal Server Error"
    });
  }
}
export async function joinSession(req,res){
    try{
        const {id}=req.params
        const userId=req.user._id
        const clerkId=req.user.clerkId
        const sessions=await Session.findById(id)
        if(!sessions)return res.status(404).json({message:"session not found"})

        if(sessions.status!=="active"){
        return res.status(400).json({message:"can not join a completed Session"})
        }
      if (sessions.host.toString() === userId.toString()) {
    return res.status(403).json({
        message: "Host cannot join their own session",
    });
}

        if(sessions.participant)return res.status(409).json({message:"session is full"})
        sessions.participant=userId
        await sessions.save()

        const channel =chatClient.channel("messaging",sessions.callId)
        await channel.addMembers([clerkId])
        return res.status(200).json({sessions})

    }catch(error){
 console.log("error in joining session",error.message)
        res.status(500).json({message:"internel error"})
    }
}

export async function endSession(req,res){
    try{
        console.log("=== END SESSION CALLED ===");

        const { id } = req.params;
        console.log("Session ID:", id);

        const userId = req.user._id;
        console.log("User ID:", userId);

        const sessions = await Session.findById(id);
        console.log("Session Found:", sessions);
        if(!sessions)return res.status(404).json({message:"session not found"})
        
      if (sessions.host.toString() !== userId.toString()) {
    return res.status(403).json({
        message: "Only the host can end the session",
    });
}

        if(sessions.status==="completed"){
               return res.status(400).json({
        message: "Session already completed",
    });

        }
        const call=streamClient.video.call("default",sessions.callId)
        await call.delete({hard:true})

        const channel = chatClient.channel("messaging",sessions.callId)
        await channel.delete()

        sessions.status="completed"
        await sessions.save()

console.log("Saved Status:", sessions.status);

        res.status(200).json({message:"Session has ended successfully"})

    }catch(error){
    console.log("Error ending session:", error.message);
    res.status(500).json({ message: "Internal Server Error" }); 
    }

}

export async function updateSessionProblem(req,res){
    try{
        const {id}=req.params
        const {problem,difficulty}=req.body
        const userId=req.user._id

        if(!problem||!difficulty){
            return res.status(400).json({message:"problem and difficulty are required"})
        }

        const session=await Session.findById(id)
        if(!session)return res.status(404).json({message:"session not found"})

        if(session.status!=="active"){
            return res.status(400).json({message:"cannot change the question of a completed session"})
        }

        if(session.host.toString()!==userId.toString()){
            return res.status(403).json({message:"Only the host can change the question"})
        }

        session.problem=problem
        session.difficulty=String(difficulty).toLowerCase()
        await session.save()

        const sessions=await Session.findById(id)
        .populate("host","name profileImage email clerkId")
        .populate("participant","name profileImage email clerkId")

        return res.status(200).json({sessions})
    }catch(error){
        console.log("error in update session problem",error.message)
        res.status(500).json({message:"Internal Server Error"})
    }
}