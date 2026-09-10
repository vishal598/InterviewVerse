# InterviewVerse

## Setup

Clone the project and open the root directory.

### 1. Install Root Modules

```bash
npm ci
```

### 2. Install Frontend Modules

```bash
cd frontend
npm ci
```

### 3. Install Backend Modules

```bash
cd ../backend
npm ci
```

Then return to the root:

```bash
cd ..
```

> `npm ci` requires `package-lock.json` to be present.

---

## 4. Setup Environment Variables

Create:

```text
backend/.env
```

Add your own API credentials:

```env
PORT=5000
DB_URL=YOUR_MONGODB_URL

NODE_ENV=production

INNGEST_EVENT_KEY=YOUR_INNGEST_EVENT_KEY
INNGEST_SIGNING_KEY=YOUR_INNGEST_SIGNING_KEY

CLIENT_URL=http://localhost:5173

STREAM_API_KEY=YOUR_STREAM_API_KEY
STREAM_API_SECRET=YOUR_STREAM_API_SECRET

CLERK_PUBLISHABLE_KEY=YOUR_CLERK_PUBLISHABLE_KEY
CLERK_SECRET_KEY=YOUR_CLERK_SECRET_KEY

GEMINI_API_KEY=YOUR_GEMINI_API_KEY
```

Create your own:

* MongoDB API/URL
* Inngest keys
* Stream API keys
* Clerk keys
* Gemini API key

---

## 5. Start the Project

Go back to the **root directory**:

```bash
npm start
```

That's it 🚀
