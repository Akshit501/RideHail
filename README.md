# 🚖 Ride Management System - Frontend

A production-grade, fully responsive, and role-based ride booking platform frontend built with React, Redux Toolkit, and TypeScript. This application provides distinct user experiences for Riders, Drivers, and Admins with a modern, intuitive interface.

## 🌐 Live Demo

**Frontend:** [https://ride-hail-lemon.vercel.app](https://ride-hail-lemon.vercel.app)
**Backend API:** [https://book-riding-system.vercel.app](https://book-riding-system.vercel.app)

## 📖 Project Overview

This frontend application is part of a full-stack ride booking platform similar to Uber or Pathao. It features a complete user management system with role-based access control, real-time ride tracking, comprehensive dashboards, and emergency safety features.

### Key Highlights
- 🎯 **Role-based Authentication** - Separate interfaces for Riders, Drivers, and Admins
- 📱 **Fully Responsive** - Optimized for mobile, tablet, and desktop devices
- 📊 **Analytics Dashboard** - Comprehensive data visualization for insights
- 🆘 **Emergency SOS System** - Enhanced safety features for users
- 🎨 **Modern UI/UX** - Clean, intuitive interface with smooth animations

## ✨ Features

### 🏠 Public Pages
- **Landing Page** - Hero section, features overview, testimonials, and call-to-action
- **About Us** - Company background and mission
- **Features** - Detailed breakdown of platform capabilities
- **Contact** - Validated inquiry form
- **FAQ** - Searchable frequently asked questions
- **Services** - Discover the range of transportation solutions we offer to get you where you need to

### 👤 Authentication & User Management
- JWT-based secure authentication
- Role-based registration (Rider/Driver/Admin)
- Account status handling (Active/Blocked/Suspended)
- Persistent login sessions
- Profile management with password updates

### 🚗 Rider Features
- **Ride Booking** - Easy-to-use booking form with fare estimation
- **Live Tracking** - Real-time ride progress with driver details
- **Ride History** - Paginated history with search and filters
- **Ride Details** - Complete ride information with status timeline
- **Profile Management** - Update personal information and preferences

### 🚙 Driver Features
- **Availability Toggle** - Online/Offline status control
- **Ride Management** - Accept/reject incoming ride requests
- **Active Ride Updates** - Status management throughout ride lifecycle
- **Earnings Dashboard** - Visual breakdown with charts and analytics
- **Ride History** - Complete ride records with filtering options
- **Vehicle Profile** - Manage vehicle details and documentation

### 👨‍💼 Admin Features
- **Analytics Dashboard** - all users, riders, drivers, suspended and approved drivers list are shown
- **User Management** - Search, filter, and manage all users
- **Ride Oversight** - Monitor all rides with advanced filtering
- **Analytics Dashboard** - Comprehensive platform statistics and trends
- **Content Management** - Platform settings and configurations
- **Reporting Tools** - Generate detailed reports and insights

### 🆘 Safety Features
- **Emergency SOS Button** - Quick access to emergency services
- **Live Location Sharing** - Share real-time location with emergency contacts
- **Emergency Contacts** - Pre-configured trusted contacts for quick notifications
- **Safety Settings** - Customizable safety preferences and alerts

## 🛠️ Technology Stack

### Frontend Core
- **React 18** - Modern React with hooks and functional components
- **TypeScript** - Type-safe development
- **Redux Toolkit** - State management with RTK Query for API calls
- **React Router** - Client-side routing and navigation

### Styling & UI
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn UI** - Unstyled, accessible UI components
- **React Icons** - Comprehensive icon library


### Data & APIs
- **RTK Query** - Powerful data fetching and caching
- **Axios** - HTTP client for API requests
- **React Hook Form** - Form handling with validation
- **Zod** - Schema validation

### Visualization & Maps
- **Recharts** - Data visualization and charts
- **Leaflet/Mapbox** - Interactive maps (optional)
- **Sonner toast** - Elegant notifications

### Development Tools
- **Vite** - Fast build tool and development server
- **ESLint** - Code linting and formatting
- **Prettier** - Code formatting


## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn or bun
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Sahajewel/book-riding-system-frontend
   cd book-riding-system-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory:
   ```env
   VITE_API_BASE_URL=http://localhost:5000/api/v1
   ```

4. **Start Development Server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Build for Production**
   ```bash
   npm run build
   # or
   yarn build
   ```


## 🎯 Key Features Implementation

### State Management
- **Redux Toolkit** for global state management
- **RTK Query** for efficient API data fetching and caching


### Responsive Design
- **Mobile-first approach** with Tailwind CSS
- **Flexible grid layouts** adapting to different screen sizes
- **Touch-friendly interactions** for mobile devices

### Performance Optimization
- **Lazy loading** for route-based code splitting
- **Skeleton loaders** for better perceived performance


### Error Handling
- **Comprehensive form validation** with clear error messages
- **API error handling** with user-friendly notifications


## 🧪 Testing

### Test Credentials
```
Admin User:
Email: admin@gmail.com
Password: 123456

Driver User:
Email: saha@gmail.com
Password: 123456

Rider User:
Email: rider@gmail.com
Password: 123456
```

### Running Tests
```bash
npm run test
# or
yarn test
```

## 📱 API Integration


## 🚀 Deployment


### Code Style Guidelines
- Follow TypeScript best practices
- Use meaningful component and variable names



## 👥 Team

- **[Saha Jewel Kumar]** - Full Stack Developer
## 📞 Support

For support, email jewelsaha072@gmail.com.

## 🙏 Acknowledgments

- React and Redux teams for excellent documentation
- Tailwind CSS for the utility-first approach

---

**Made with ❤️ by [Saha Jewel Kumar, Credit goes to Programming Hero Team]**