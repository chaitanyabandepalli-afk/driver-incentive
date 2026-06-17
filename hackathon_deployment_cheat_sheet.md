# 🚀 Hackathon Full-Stack Deployment Cheat Sheet
### (React + Node.js Express + Prisma + Supabase PostgreSQL)

This is the **ultimate fast-deployment stack** for hackathons. It is reliable, free, and lets you host full-stack projects in minutes.

---

## 🏛️ The Architecture
```mermaid
graph LR
  A[Frontend: Vercel] -->|HTTP Requests| B[Backend: Render]
  B -->|Prisma Client| C[Database: Supabase]
```

---

## 📂 Project Structure (Monorepo/Workspaces)
For rapid hackathon development, keep your code in a single GitHub repository:
```text
my-hackathon-project/
├── frontend/ (React / Vite)
├── backend/  (Express API / Prisma)
└── .gitignore
```

---

## ⚡ Step-by-Step Deployment Playbook

### Phase 1: Database Setup (Supabase)
1. **Create Database**:
   * Go to [Supabase.com](https://supabase.com) and create a new project.
   * Save your **Database Password** carefully.
2. **Get Connection String**:
   * Go to **Project Settings** -> **Database**.
   * Under **Connection String**, select **URI**.
   * *Hackathon Tip*: Choose the **Session Pooler (Port 5432)** connection string to avoid IPv6 issues on local WiFi networks.
3. **Configure Environment Variables locally**:
   * Create a `.env` inside your `backend` folder:
     ```env
     DATABASE_URL="postgresql://postgres.[proj-id]:[password]@aws-0-[region].pooler.supabase.com:5432/postgres"
     ```
4. **Push Schema to Supabase**:
   * In your `backend` directory, run:
     ```bash
     npx prisma db push
     ```

---

### Phase 2: Git Prep & Push
1. Create a `.gitignore` at the root folder to prevent uploading secrets:
   ```text
   node_modules/
   .env
   dist/
   ```
2. Initialize and push:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```

---

### Phase 3: Deploy Backend (Render)
1. Log into [Render.com](https://render.com) and click **New** -> **Web Service**.
2. Connect your GitHub repository.
3. **Critical Settings**:
   * **Root Directory**: `backend` (leaves frontend out of backend build context)
   * **Build Command**: `npm install` (this installs modules and triggers `prisma generate`)
   * **Start Command**: `node server.js`
4. **Environment Variables**:
   * Click **Advanced** -> **Add Environment Variable**:
     * `DATABASE_URL` = (Your Supabase connection string)
5. Click **Deploy Web Service**. Once live, copy your backend URL (e.g., `https://my-api.onrender.com`).

---

### Phase 4: Connect & Deploy Frontend (Vercel)
1. **Update API URL**:
   * In your frontend code (e.g. `App.jsx` or a config file), set your base API URL to point to the live Render URL:
     ```javascript
     const API_BASE_URL = "https://my-api.onrender.com/api";
     ```
   * Push the change:
     ```bash
     git add . && git commit -m "Point to live backend" && git push
     ```
2. Log into [Vercel.com](https://vercel.com) and click **Add New** -> **Project**.
3. Import your GitHub repository.
4. **Settings**:
   * **Framework Preset**: Select `Vite` (or `Next.js` / `React`).
   * **Root Directory**: Click Edit and select the `frontend` folder.
5. Click **Deploy**!

---

## 💡 Pro Hackathon Tips

### 1. Enable CORS in Express
Without CORS, Vercel will not be allowed to talk to Render. Put this at the top of your `server.js`:
```javascript
const cors = require('cors');
app.use(cors()); // Allows all origins
```

### 2. Bypass Render Sleep Time
Render's Free tier goes to sleep after 15 minutes of inactivity. When a judge visits your site, the first load might take 50 seconds to wake up.
* **Hackathon Fix**: Add a loading spinner on the frontend that says *"Waking up server (takes 50 seconds on cold start)..."* so judges don't think your app is broken.

### 3. Prisma Schema Changes
If you change your database models during the hackathon:
1. Update `schema.prisma`.
2. Run `npx prisma db push` locally to update Supabase.
3. Commit and push code to GitHub. Render will redeploy automatically and apply the new models!
