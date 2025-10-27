# ⚛️ LabKom Unila Frontend

Modern React frontend for LabKom Unila website built with Vite, Tailwind CSS, and Framer Motion.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Configure environment
cp .env.example .env

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📦 Dependencies

### Core
- **react** - UI library
- **react-dom** - React DOM renderer
- **react-router-dom** - Routing
- **vite** - Build tool

### UI & Styling
- **tailwindcss** - Utility-first CSS
- **framer-motion** - Animation library
- **lucide-react** - Icon library

### Data & State
- **axios** - HTTP client
- **react-hot-toast** - Notifications
- **react-calendar** - Calendar component

## 🗂️ Project Structure

```
client/
├── public/              # Static assets
├── src/
│   ├── components/     # Reusable components
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── Card.jsx
│   │   ├── Table.jsx
│   │   ├── Modal.jsx
│   │   ├── Button.jsx
│   │   ├── Clock.jsx
│   │   └── ProtectedRoute.jsx
│   ├── pages/         # Page components
│   │   ├── Home.jsx
│   │   ├── Jadwal/
│   │   │   ├── Piket.jsx
│   │   │   ├── Praktikum.jsx
│   │   │   └── Seminar.jsx
│   │   ├── Info/
│   │   │   ├── Dosen.jsx
│   │   │   ├── Asisten.jsx
│   │   │   └── Pengurus.jsx
│   │   └── Admin/
│   │       ├── Login.jsx
│   │       └── Dashboard.jsx
│   ├── context/       # React Context
│   │   └── AuthContext.jsx
│   ├── utils/         # Utilities
│   │   └── api.js
│   ├── App.jsx        # Main app
│   ├── main.jsx       # Entry point
│   └── index.css      # Global styles
├── index.html
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── package.json
```

## 🎨 Design System

### Colors
```css
--dark-bg: #0D0D0D
--dark-card: #1E1E1E
--dark-accent: #00C4FF
--text-white: #FFFFFF
--text-gray: #9CA3AF
```

### Typography
- Font: Poppins (Google Fonts)
- Weights: 300, 400, 500, 600, 700

### Components
All components use:
- Glassmorphism design
- Dark theme
- Smooth animations
- Responsive layout

## 🔧 Environment Variables

Create a `.env` file:

```env
VITE_API_URL=http://localhost:5000/api
```

For production:
```env
VITE_API_URL=https://your-backend-url.com/api
```

## 🛣️ Routes

### Public Routes
- `/` - Home page
- `/jadwal/piket` - Piket schedule
- `/jadwal/praktikum` - Praktikum schedule
- `/jadwal/seminar` - Seminar schedule
- `/info/dosen` - Dosen information
- `/info/asisten` - Asisten information
- `/info/pengurus` - Pengurus information

### Admin Routes (Protected)
- `/admin/login` - Admin login
- `/admin/dashboard` - Admin dashboard

## 🎯 Features

### Public Features
- Real-time clock
- Schedule viewing
- Personnel information
- Responsive design
- Smooth animations

### Admin Features
- Secure authentication
- Full CRUD operations
- Image upload
- Real-time updates
- User-friendly dashboard

## 🧩 Key Components

### Navbar
Responsive navigation with dropdown menus and mobile support.

### Footer
Contact information and quick links.

### Card
Reusable card component with glassmorphism effect.

### Table
Dynamic table with sorting and actions.

### Modal
Animated modal for forms and dialogs.

### Button
Customizable button with loading states.

### Clock
Real-time clock component.

### ProtectedRoute
Route wrapper for authentication.

## 📱 Responsive Design

Breakpoints:
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

## 🎨 Styling

Using Tailwind CSS utility classes:
```jsx
<div className="glass rounded-xl p-6 hover:scale-105 transition-transform">
  Content
</div>
```

## 🔐 Authentication

Using Context API for global auth state:
```jsx
const { admin, login, logout, isAuthenticated } = useAuth();
```

## 📡 API Integration

Using Axios with interceptors:
```jsx
import { dosenAPI } from '../utils/api';

const dosen = await dosenAPI.getAll();
```

## 🧪 Testing

```bash
# Run development server
npm run dev

# Open http://localhost:5173
# Test all pages and features
```

## 🏗️ Building

```bash
# Create production build
npm run build

# Output in dist/ folder
# Deploy dist/ folder to hosting
```

## 🚀 Deployment

### Vercel (Recommended)
1. Push to GitHub
2. Import to Vercel
3. Set root directory: `client`
4. Add environment variable: `VITE_API_URL`
5. Deploy

### Other Options
- Netlify
- GitHub Pages
- AWS S3 + CloudFront

## 🐛 Troubleshooting

### API Connection Error
- Check `VITE_API_URL` in `.env`
- Verify backend is running
- Check CORS settings

### Build Errors
```bash
rm -rf node_modules dist
npm install
npm run build
```

### Hot Reload Not Working
- Restart dev server
- Clear browser cache
- Check Vite configuration

## 📚 Learn More

- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)

---

**Part of LabKom Unila Website Project**
