# 🚀 Deployment Guide - LabKom Unila Website

Complete guide for deploying your application to production.

## 📋 Deployment Options

### Frontend Deployment
- ✅ **Vercel** (Recommended - Free)
- Netlify
- GitHub Pages
- AWS S3 + CloudFront

### Backend Deployment
- ✅ **Render** (Recommended - Free tier)
- ✅ **Railway** (Easy setup)
- Heroku
- AWS EC2
- DigitalOcean

### Database Options
- ✅ **Railway MySQL** (Included with Railway)
- ✅ **PlanetScale** (Free tier)
- AWS RDS
- Google Cloud SQL

---

## 🎯 Recommended Stack (Free Tier)

- **Frontend**: Vercel
- **Backend**: Render or Railway
- **Database**: Railway MySQL or PlanetScale

---

## 1️⃣ Deploy Frontend to Vercel

### Prerequisites
- GitHub account
- Code pushed to GitHub repository

### Steps

1. **Prepare Your Code**
   ```bash
   # Ensure your code is in GitHub
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Go to Vercel**
   - Visit https://vercel.com
   - Sign up/Login with GitHub

3. **Import Project**
   - Click "Add New" → "Project"
   - Select your repository
   - Configure:
     - **Framework Preset**: Vite
     - **Root Directory**: `client`
     - **Build Command**: `npm run build`
     - **Output Directory**: `dist`

4. **Environment Variables**
   - Add environment variable:
     ```
     VITE_API_URL=https://your-backend-url.onrender.com/api
     ```
   - (You'll update this after deploying backend)

5. **Deploy**
   - Click "Deploy"
   - Wait for deployment to complete
   - Your site will be live at: `https://your-project.vercel.app`

### Update After Backend Deployment
1. Go to Vercel project settings
2. Navigate to "Environment Variables"
3. Update `VITE_API_URL` with your actual backend URL
4. Redeploy

---

## 2️⃣ Deploy Backend to Render

### Prerequisites
- GitHub account
- Code pushed to GitHub

### Steps

1. **Go to Render**
   - Visit https://render.com
   - Sign up/Login with GitHub

2. **Create MySQL Database**
   - Click "New" → "PostgreSQL" or use external MySQL
   - Or skip and use Railway MySQL (see Railway section)

3. **Create Web Service**
   - Click "New" → "Web Service"
   - Connect your repository
   - Configure:
     - **Name**: `labkom-unila-api`
     - **Root Directory**: `server`
     - **Environment**: Node
     - **Build Command**: `npm install`
     - **Start Command**: `npm start`

4. **Environment Variables**
   Add all variables from `.env.example`:
   ```
   PORT=5000
   NODE_ENV=production
   
   DB_HOST=your-db-host
   DB_USER=your-db-user
   DB_PASSWORD=your-db-password
   DB_NAME=labkom_unila
   DB_PORT=3306
   
   JWT_SECRET=your-production-secret-key
   
   FRONTEND_URL=https://your-project.vercel.app
   ```

5. **Deploy**
   - Click "Create Web Service"
   - Wait for deployment
   - Your API will be at: `https://your-service.onrender.com`

6. **Update Frontend**
   - Copy your Render backend URL
   - Update `VITE_API_URL` in Vercel
   - Redeploy frontend

### Important Notes
- Free tier sleeps after inactivity (may take 30s to wake up)
- Upgrade to paid tier for always-on service

---

## 3️⃣ Deploy to Railway (Alternative - Easier)

Railway provides both backend hosting and MySQL database in one place.

### Steps

1. **Go to Railway**
   - Visit https://railway.app
   - Sign up/Login with GitHub

2. **Create New Project**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your repository

3. **Add MySQL Database**
   - Click "New" → "Database" → "Add MySQL"
   - Railway will create a MySQL instance
   - Copy the connection details

4. **Configure Backend Service**
   - Click on your service
   - Go to "Variables" tab
   - Add environment variables:
     ```
     PORT=5000
     NODE_ENV=production
     
     # Use Railway's MySQL connection details
     DB_HOST=${{MySQL.MYSQL_HOST}}
     DB_USER=${{MySQL.MYSQL_USER}}
     DB_PASSWORD=${{MySQL.MYSQL_PASSWORD}}
     DB_NAME=${{MySQL.MYSQL_DATABASE}}
     DB_PORT=${{MySQL.MYSQL_PORT}}
     
     JWT_SECRET=your-production-secret-key
     FRONTEND_URL=https://your-project.vercel.app
     ```

5. **Configure Build**
   - Go to "Settings"
   - Set Root Directory: `server`
   - Build Command: `npm install`
   - Start Command: `npm start`

6. **Deploy**
   - Railway will auto-deploy
   - Get your backend URL from "Settings" → "Domains"
   - Generate domain: `your-service.up.railway.app`

7. **Update Frontend on Vercel**
   - Update `VITE_API_URL` with Railway backend URL
   - Redeploy

### Advantages of Railway
- ✅ Database included
- ✅ Automatic HTTPS
- ✅ Easy environment variables
- ✅ Better free tier limits

---

## 4️⃣ Deploy Database to PlanetScale

If you want a separate managed MySQL database:

### Steps

1. **Go to PlanetScale**
   - Visit https://planetscale.com
   - Sign up for free account

2. **Create Database**
   - Click "New database"
   - Name: `labkom-unila`
   - Region: Choose closest to your backend

3. **Get Connection String**
   - Go to "Connect"
   - Select "Node.js"
   - Copy connection details

4. **Update Backend Environment Variables**
   ```
   DB_HOST=your-planetscale-host
   DB_USER=your-planetscale-user
   DB_PASSWORD=your-planetscale-password
   DB_NAME=labkom_unila
   DB_PORT=3306
   ```

5. **SSL Configuration**
   PlanetScale requires SSL. Update `server/config/db.js`:
   ```javascript
   const sequelize = new Sequelize(
     process.env.DB_NAME,
     process.env.DB_USER,
     process.env.DB_PASSWORD,
     {
       host: process.env.DB_HOST,
       port: process.env.DB_PORT || 3306,
       dialect: 'mysql',
       dialectOptions: {
         ssl: {
           rejectUnauthorized: true
         }
       },
       // ... rest of config
     }
   );
   ```

---

## 🔒 Production Security Checklist

Before going live:

- [ ] Change default admin password
- [ ] Use strong JWT_SECRET (generate with crypto)
- [ ] Enable HTTPS (automatic on Vercel/Render/Railway)
- [ ] Set NODE_ENV=production
- [ ] Configure CORS properly
- [ ] Use environment variables (never hardcode secrets)
- [ ] Enable database backups
- [ ] Set up error monitoring (Sentry, LogRocket)
- [ ] Configure rate limiting
- [ ] Review and remove console.logs
- [ ] Test all features in production

---

## 🔧 Post-Deployment Configuration

### 1. Update CORS Settings

In `server/server.js`, update CORS:
```javascript
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));
```

### 2. Disable Auto-Seeding

After first deployment, comment out seeding in `server/server.js`:
```javascript
// await seedDatabase(); // Only run once
```

### 3. Set Up Custom Domain (Optional)

**Vercel:**
1. Go to project settings → Domains
2. Add your custom domain
3. Update DNS records as instructed

**Render/Railway:**
1. Go to service settings → Custom Domain
2. Add domain and update DNS

---

## 📊 Monitoring & Maintenance

### Check Application Health

1. **Frontend Health**
   - Visit your Vercel URL
   - Check all pages load correctly
   - Test navigation

2. **Backend Health**
   - Visit `https://your-backend-url.com/api/health`
   - Should return: `{"status":"OK","message":"LabKom Unila API is running"}`

3. **Database Health**
   - Login to admin panel
   - Try CRUD operations
   - Verify data persists

### Logs

**Vercel:**
- Dashboard → Your Project → Deployments → View Logs

**Render:**
- Dashboard → Your Service → Logs

**Railway:**
- Dashboard → Your Service → Deployments → View Logs

---

## 🐛 Common Deployment Issues

### Issue: "Build Failed"

**Solution:**
1. Check build logs
2. Verify all dependencies in package.json
3. Test build locally: `npm run build`
4. Check Node.js version compatibility

### Issue: "Database Connection Failed"

**Solution:**
1. Verify database credentials
2. Check database is running
3. Verify SSL settings for cloud databases
4. Check firewall/network settings

### Issue: "CORS Error in Production"

**Solution:**
1. Update `FRONTEND_URL` in backend env vars
2. Verify CORS configuration
3. Check both URLs use HTTPS
4. Clear browser cache

### Issue: "Images Not Loading"

**Solution:**
1. Check file upload works in production
2. Verify `uploads` folder is created
3. Consider using cloud storage (AWS S3, Cloudinary)
4. Check file size limits

### Issue: "API Requests Failing"

**Solution:**
1. Verify `VITE_API_URL` is correct
2. Check backend is running
3. Test API directly with Postman
4. Check browser console for errors

---

## 💾 Database Backup

### Railway
- Automatic backups included
- Manual backup: Export from Railway dashboard

### PlanetScale
- Automatic backups included
- Create backup branches

### Manual Backup
```bash
# Export database
mysqldump -u username -p labkom_unila > backup.sql

# Import database
mysql -u username -p labkom_unila < backup.sql
```

---

## 🔄 Continuous Deployment

Both Vercel and Render/Railway support automatic deployments:

1. Push code to GitHub
2. Automatic deployment triggers
3. Changes go live automatically

**Disable auto-deploy for production:**
- Use separate branches (main for production, dev for development)
- Enable manual deployment approval

---

## 📈 Scaling Considerations

### When to Upgrade

- Free tier limits reached
- Need faster response times
- Require always-on service
- Need more database storage
- High traffic volume

### Upgrade Options

**Vercel:**
- Pro: $20/month - Better performance, analytics

**Render:**
- Starter: $7/month - Always on, no sleep

**Railway:**
- Hobby: $5/month - Better limits

---

## 📞 Support

If you need help with deployment:

1. Check deployment platform docs:
   - Vercel: https://vercel.com/docs
   - Render: https://render.com/docs
   - Railway: https://docs.railway.app

2. Check error logs in platform dashboard

3. Test locally first to isolate issues

---

## ✅ Deployment Checklist

- [ ] Code pushed to GitHub
- [ ] Frontend deployed to Vercel
- [ ] Backend deployed to Render/Railway
- [ ] Database configured and connected
- [ ] Environment variables set correctly
- [ ] CORS configured properly
- [ ] Admin can login
- [ ] All CRUD operations work
- [ ] Images upload successfully
- [ ] Custom domain configured (optional)
- [ ] SSL/HTTPS enabled
- [ ] Production secrets changed
- [ ] Monitoring set up
- [ ] Backups configured

---

**Your LabKom Unila website is now live! 🎉**
