import { useUser } from '@clerk/clerk-react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { useActiveSessions, useCreateSession, useMyRecentSessions } from '../hooks/useSessions';
import NavBar from '../components/NavBar';
import WelcomeSection from '../components/WelcomeSection';
import StatsCards from '../components/StatsCards';
import ActiveSessions from '../components/ActiveSessions';
import RecentSessions from '../components/RecentSessions';
import CreateSessionModal from '../components/CreateSessionModal';
import ResumeInterviewCard from '../components/ResumeInterviewCard';

const DashBoard = () => {
const navigate=useNavigate()
const {user}=useUser()

const[showCreateModal,setShowCreateModal]=useState(false)
const[roomConfig,setRoomConfig]=useState({problem:"",difficulty:""});

const createSessionMutation=useCreateSession()
const {data:activeSessionsData,isLoading:loadingActiveSessions}=useActiveSessions();
const {data:recentSessionsData,isLoading:loadingRecentSessions}=useMyRecentSessions();

const handleCreateRoom=()=>{
if(!roomConfig.problem || !roomConfig.difficulty)return;
const existingSession=activeSessions.find((session)=>isUserInSession(session))
if(existingSession){
    setShowCreateModal(false)
    navigate(`/session/${existingSession._id}`)
    return;
}
createSessionMutation.mutate({
    problem:roomConfig.problem,difficulty:roomConfig.difficulty.toLowerCase()
},
{
onSuccess:(data)=>{
    setShowCreateModal(false)
    navigate(`/session/${data.sessions._id}`)
},
}
)
}
const activeSessions=activeSessionsData?.sessions||[]
const recentSessions=recentSessionsData?.sessions||[]

const isUserInSession=(session)=>{
    if(!user.id)return false;
    return session.host?.clerkId===user.id || session.participant?.clerkId===user.id
}
    return (
        <>
        <div className='min-h-screen bg-base-300'>
            <NavBar/>
        <WelcomeSection onCreateSession={()=>setShowCreateModal(true)}/>   
        {/* grid */}
        <div className='container mx-auto px-6 pb-16'>
            <ResumeInterviewCard />
            <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
                <StatsCards
                activeSessionsCount={activeSessions.length}
                recentSessionsCount={recentSessions.length}
                />
                <ActiveSessions
                sessions={activeSessions}
                isLoading={loadingActiveSessions}
                isUserInSession={isUserInSession}
                />

            </div>
            <RecentSessions
            sessions={recentSessions}
            isLoading={loadingRecentSessions}
            />
        </div>
        
        </div>
        <CreateSessionModal
        isOpen={showCreateModal}
        onClose={()=>setShowCreateModal(false)}
        roomConfig={roomConfig}
        setRoomConfig={setRoomConfig}
        onCreateRoom={handleCreateRoom}
        isCreating={createSessionMutation.isPending}
        />
        </>
    );
}

export default DashBoard;
