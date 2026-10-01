# InterviewVerse

InterviewVerse is a full-stack web platform designed to provide interview preparation and live technical interview capabilities in a single application.

## Features

### AI Interview Preparation
- Upload resume in PDF format
- Generate personalized technical and HR interview questions
- Questions based on resume skills, projects, education and experience
- Submit answers and receive AI-generated feedback
- Track interview sessions and performance

### Live Coding Interview
- One-to-one coding interview rooms
- VS Code-like Monaco Editor
- Supports Java, C++ and JavaScript
- Secure code execution
- Real-time video calling
- Screen sharing
- Real-time chat
- Microphone and camera controls
- Room locking for two participants

## Tech Stack

- Frontend: React.js, Framer Motion, TanStack Query
- Backend: Node.js, Express.js
- Database: MongoDB
- Authentication: Clerk, Firebase Google Authentication
- AI: AI APIs for resume-based question generation and feedback
- Video: Stream Video SDK
- Chat: Stream Chat SDK
- Code Editor: Monaco Editor
- Code Execution: Secure Sandboxed Runtime
- Background Jobs: Inngest
- Deployment: Render, Sevalla
- Version Control: Git & GitHub

## Installation

### Clone the Repository

git clone https://github.com/vishal598/InterviewVerse.git
cd InterviewVerse

### Install Dependencies

npm ci

cd frontend
npm ci

cd ../backend
npm ci

## Environment Variables

Backend:

PORT=5000
DB_URL=
NODE_ENV=development
CLIENT_URL=http://localhost:5173
CLERK_SECRET_KEY=
STREAM_API_KEY=
STREAM_API_SECRET=
INNGEST_EVENT_KEY=
INNGEST_SIGNING_KEY=
AI_API_KEY=

Frontend:

VITE_CLERK_PUBLISHABLE_KEY=
VITE_STREAM_API_KEY=
VITE_API_URL=http://localhost:5000

Do not commit .env files or API keys to GitHub.

## Running the Project

### Start Backend

npm run dev --prefix backend

Backend:
http://localhost:5000

### Start Frontend

npm run dev --prefix frontend

Frontend:
http://localhost:5173

## Main Modules

### AI Interview Module

The candidate uploads a resume, which is processed by the backend. AI APIs generate interview questions based on the candidate's resume. After answering the questions, the candidate receives AI-generated feedback.

### Live Coding Module

Interviewers can create coding rooms where candidates can join and solve programming problems collaboratively. The module provides a Monaco-based editor, code execution, video calling, screen sharing and real-time chat.

The live coding and video interview module does not depend on AI.

## Database

MongoDB stores:
- User information
- Resume information
- Interview sessions
- Interview questions
- Feedback
- Coding rooms
- Interview history

## Security

- Protected authentication using Clerk and Firebase
- Environment variables for sensitive credentials
- Protected API routes
- Restricted coding room access
- Sandboxed code execution
- Two-person room limitation

## Development Workflow

The project uses Git and GitHub for version control.

Feature Branch -> Development -> Testing -> Pull Request -> Code Review -> Merge

CodeRabbit can be used for pull-request analysis and code improvement suggestions.

## Future Enhancements

- Voice-based AI mock interviews
- Speech and communication analysis
- Additional programming languages
- Multi-round interview workflows
- Recruiter dashboard
- Interview recording and playback
- Advanced performance analytics
- Multiple-interviewer rooms
- Mobile applications
- Email and calendar integration
- Scalable microservice architecture

## Author

Vishal Bagga

GitHub:
https://github.com/vishal598

## License

This project is developed for academic and educational purposes.
