# 🌍 TravelGenie - Student Quickstart & Setup Guide

Welcome to **TravelGenie**! This guide will help you set up and run the full project (Django backend + React frontend) in less than 5 minutes.

---

## 📋 Prerequisites
Before starting, ensure you have the following installed on your computer:
1. **Python 3.10+** — [Download Python](https://www.python.org/downloads/) (Make sure to check *"Add Python to PATH"* during Windows installation).
2. **Node.js 18+** — [Download Node.js](https://nodejs.org/).
3. A free **Supabase** account (or any PostgreSQL database).

---

## 🗄️ Step 1: Set Up Your Database Connection

1. Open the project folder and navigate into the `server` directory:
   ```bash
   cd travel-genie/server
   ```

2. Duplicate `.env.example` and name the new file **`.env`**:
   - On Windows PowerShell:
     ```powershell
     cp .env.example .env
     ```
   - Or simply copy and rename it using your file explorer or code editor.

3. Open `.env` and paste your Supabase connection string into `DATABASE_URL`:
   ```env
   DATABASE_URL=postgresql://postgres.YOUR_PROJECT_ID:YOUR_PASSWORD@aws-0-YOUR_REGION.pooler.supabase.com:5432/postgres
   ```

### 💡 Where to find your Supabase connection string:
1. Log in to [Supabase](https://supabase.com/dashboard) and open your project.
2. Go to **Project Settings** (gear icon in sidebar) ➔ **Database**.
3. Under **Connection string**, select **URI** (Session mode or Transaction mode, port 5432 or 6543).
4. Copy the URI and replace `[YOUR-PASSWORD]` with the database password you chose when creating your Supabase project.

> 💡 **Offline / SQLite Mode**: If you haven't set up Supabase yet and want to run the project immediately, simply leave `DATABASE_URL=` empty! The backend will automatically fall back to a local SQLite database (`db.sqlite3`).

---

## 🚀 Step 2: Set Up & Start the Backend (Django)

In your terminal (inside `travel-genie/server`):

1. **Create and activate a Python virtual environment**:
   - **Windows (PowerShell)**:
     ```powershell
     python -m venv venv
     .\venv\Scripts\activate
     ```
   - **macOS / Linux**:
     ```bash
     python3 -m venv venv
     source venv/bin/activate
     ```

2. **Install required packages**:
   ```bash
   pip install -r requirements.txt
   ```

3. **Run database migrations** (this creates all tables in your Supabase database):
   ```bash
   python manage.py migrate
   ```

4. **Create your Admin account**:
   ```bash
   python manage.py createsuperuser
   ```
   *(Enter your preferred username, email, and password)*

5. **Start the Django backend server**:
   ```bash
   python manage.py runserver 127.0.0.1:8000
   ```
   ✅ The backend API is now running at `http://127.0.0.1:8000/`.

---

## 💻 Step 3: Set Up & Start the Frontend (React + Vite)

Open a **new, second terminal** window:

1. **Navigate to the client directory**:
   ```bash
   cd travel-genie/client
   ```

2. **Install Node dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:5173/
   ```

---

## 🎯 Verification & Features to Test

1. **Sign Up / Log In**:
   - Create a new user account or log in with the superuser credentials you created.
2. **Kam Air Flight Search**:
   - Navigate to `/flights` or use the flight card on the landing page.
   - Test one-way and round-trip searches between Kabul (KBL), Dubai (DXB), Istanbul (IST), and more.
3. **Trip Planning & AI**:
   - Go to `/dashboard/trips/create` and create your trip.
   - Check AI recommendations at `/dashboard/recommendations`.
4. **Travel Memories**:
   - Upload photos and add memories at `/dashboard/memory`.

---

## 🛠️ Troubleshooting

- **Error: `OperationalError: connection to server failed`**:
  - Double check your Supabase password in `server/.env`.
  - Ensure your Supabase project is active (not paused).
  - If password contains special characters (like `@`, `#`, or `%`), URL-encode them (e.g. replace `@` with `%40`).
- **PowerShell Script Execution Policy Error**:
  - If `.\venv\Scripts\activate` gives an execution policy error, run:
    ```powershell
    Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
    ```
    Then run `.\venv\Scripts\activate` again.
- **Port 8000 or 5173 already in use**:
  - You can run the backend on a different port: `python manage.py runserver 127.0.0.1:8001` (and set `VITE_API_URL=http://127.0.0.1:8001` in client `.env`).
