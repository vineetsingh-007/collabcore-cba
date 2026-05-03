# 🚀 Docker Full-Stack Setup & Testing Guide

## ✅ All Fixes Applied

Your Dockerized full-stack project has been fixed with the following changes:

### 1. **docker-compose.yml** - Fixed Port Conflicts & Networking
- Proper port mappings: Frontend (3000), Backend (5000), MongoDB (27017)
- All services on single network: `collab-network`
- MongoDB healthcheck added
- Environment variables properly passed

### 2. **backend/server.js** - Fixed CORS Issues
- Removed duplicate CORS import
- Removed duplicate CORS setup
- Single unified CORS configuration
- Proper Socket.io CORS integration

### 3. **src/lib/api.ts** - Fixed API URL Configuration
- Changed from hardcoded `localhost:5005`
- Now uses environment variable: `VITE_API_URL`
- Works in both Docker and local development
- Fallback: `http://localhost:5000/api`

### 4. **Dockerfile** - Fixed Frontend Environment
- Properly sets VITE_API_URL environment variable
- Exposes port 8080 for Vite dev server
- Runs `npm run dev`

### 5. **.env.docker** - Docker-specific Configuration
- Created for Docker container environment

---

## 🔧 Setup Instructions

### Option A: Run with Docker Compose (Recommended)

```bash
# Navigate to project root
cd /Users/vineet/Downloads/collab-canvas-main\ 2

# Remove any old containers and volumes
docker-compose down -v

# Build and start all services
docker-compose up --build

# Wait for services to be ready
# You should see:
# ✅ Server running on http://localhost:5000
# ✅ MongoDB connected
# ✅ Vite dev server running
```

**Expected Output:**
```
frontend   | ✅ Frontend running at http://localhost:3000
backend    | ✅ Server running on http://localhost:5000
mongodb    | Listening on 27017
```

### Option B: Run Locally (Development)

**Terminal 1 - Backend:**
```bash
cd backend
npm install
npm run dev
# Should show: ✅ Server running on http://localhost:5001
```

**Terminal 2 - Frontend:**
```bash
npm install
npm run dev
# Should show: ✅ Local: http://localhost:5173
```

---

## 🧪 Testing Checklist

### Test 1: Backend Health Check
```bash
curl http://localhost:5000/
# Expected: "🚀 Collab Canvas API is running"
```

### Test 2: Frontend Loads
- Open browser: `http://localhost:3000`
- Expected: Login page loads without errors
- Check browser console: No "Failed to fetch" errors

### Test 3: Backend API is Accessible
```bash
curl http://localhost:5000/api/auth/login \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123"}'
# Expected: Either error response or success (depends on user in DB)
```

### Test 4: Login Form (Frontend)
1. Navigate to `http://localhost:3000`
2. Enter email and password
3. Click "Sign In"
4. **Expected Results:**
   - ✅ No "Failed to fetch" error
   - ✅ No "Unexpected token '<'" error
   - ✅ Either login success or proper API error message
   - ✅ Network tab shows request to `/api/auth/login`

### Test 5: Docker Network Communication
```bash
# Check if backend is reachable from frontend container
docker exec -it frontend sh -c "curl http://backend:5001"
# Expected: "🚀 Collab Canvas API is running"
```

### Test 6: MongoDB Connection
```bash
# Check MongoDB connectivity from backend
docker exec -it backend npm run test
# Or check logs for MongoDB connection message
```

---

## 🔍 Troubleshooting

### "Port already in use" Error
```bash
# List all Docker containers
docker ps -a

# Stop all containers
docker-compose down

# Or kill specific port
lsof -i :3000  # Find process using port 3000
kill -9 <PID>
```

### "Failed to fetch" Error in Frontend
- Check browser Network tab for actual error
- Verify backend is running: `curl http://localhost:5000`
- Check VITE_API_URL is correct: Open browser console
- Verify CORS configuration in backend/server.js

### "Unexpected token '<'" Error
- This means HTML is being returned instead of JSON
- Usually indicates backend isn't running or wrong URL
- Check backend logs: `docker logs backend`

### Container won't start
```bash
# Check logs
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f mongodb

# Rebuild everything
docker-compose down -v
docker-compose up --build
```

---

## 📋 Architecture Diagram

```
┌─────────────────────────────────────────┐
│         Browser (Host)                  │
│  - Frontend: http://localhost:3000      │
│  - API calls to http://localhost:5000   │
└────────────┬────────────────────────────┘
             │
     ┌───────┴──────────┐
     │                  │
┌────▼────────────┐  ┌──▼──────────────┐
│ Frontend        │  │ Backend         │
│ Container       │  │ Container       │
│ Port: 8080      │  │ Port: 5001      │
│ (exposed: 3000) │  │ (exposed: 5000) │
│                 │  │                 │
│ VITE Dev Server │  │ Express Server  │
│ http://backend  │──────────────────│
│ :5001/api       │  │ Node.js + Cors  │
└─────────────────┘  │ Socket.io       │
      │              └────┬────────────┘
      │                   │
      │            ┌──────▼──────────┐
      │            │ MongoDB         │
      │            │ Container       │
      │            │ Port: 27017     │
      │            │ (exposed: 27017)│
      └─ collab-network ─ Bridge ────┘
```

---

## 📝 File Changes Summary

### docker-compose.yml
- ✅ Port mappings fixed
- ✅ Environment variables added
- ✅ Network properly configured
- ✅ MongoDB healthcheck added

### backend/server.js
- ✅ Duplicate CORS import removed
- ✅ Unified CORS configuration
- ✅ Socket.io CORS settings aligned

### src/lib/api.ts
- ✅ Environment variable support added
- ✅ Fallback to localhost:5000/api

### Dockerfile (frontend)
- ✅ Environment variable support
- ✅ Proper port exposure

---

## 🎯 Next Steps

1. **Run Docker Compose:**
   ```bash
   docker-compose down -v
   docker-compose up --build
   ```

2. **Test Frontend:** Open `http://localhost:3000`

3. **Test Login:** Use credentials from your MongoDB database

4. **Monitor Logs:**
   ```bash
   docker-compose logs -f  # All services
   docker-compose logs -f backend  # Just backend
   ```

5. **Stop Everything:**
   ```bash
   docker-compose down
   ```

---

## ⚡ Quick Command Reference

```bash
# Build and start
docker-compose up --build

# Start (without rebuilding)
docker-compose up

# Stop and remove containers
docker-compose down

# Remove volumes too (clean slate)
docker-compose down -v

# View logs
docker-compose logs -f

# Execute command in container
docker exec -it frontend sh
docker exec -it backend sh

# Check service status
docker-compose ps

# Restart a service
docker-compose restart backend
```

---

## ✨ Success Indicators

When everything is working correctly:

1. ✅ No "port already in use" errors
2. ✅ Frontend loads at `http://localhost:3000`
3. ✅ Login page is visible
4. ✅ No "Failed to fetch" errors
5. ✅ No "Unexpected token '<'" errors
6. ✅ Backend responds to API requests
7. ✅ MongoDB is connected and ready
8. ✅ Login functionality works
9. ✅ No CORS errors in browser console
10. ✅ Containers communicate via network

---

**All fixes are minimal and safe - no unnecessary deletions!** 🎉
