# Modern Church Mobile App

A full-featured church mobile application built with React, Express, and modern web technologies. Features include live streaming, community engagement, testimonies sharing, and M-Pesa donations.

![App Screenshot](https://via.placeholder.com/800x400?text=Church+App+Screenshot)

## Features

- 📱 Mobile-first responsive design
- 🔴 Live streaming of church services via YouTube API
- 🎬 On-demand sermon library
- 📖 Daily devotionals and Bible verse of the day
- 👥 Community engagement with testimonies and comments
- 💸 Financial giving through M-Pesa integration
- 👤 User profiles with saved content

## Tech Stack

### Frontend
- **React + TypeScript**: For type-safe frontend development
- **Vite**: For fast development and production builds
- **TanStack Query**: For data fetching and state management
- **Wouter**: For lightweight routing
- **ShadCN UI**: For component library and styled UI elements
- **Tailwind CSS**: For utility-based styling
- **Lucide Icons**: For consistent iconography

### Backend
- **Express.js**: For API endpoints and server-side logic
- **Drizzle ORM**: For database schema and queries
- **Zod**: For schema validation
- **PassportJS**: For authentication (planned)

## Architecture

The application follows a client-server architecture with a React frontend and a Node.js/Express backend.

### Project Structure

```
├── client             # Frontend React application
│   ├── src
│   │   ├── components # Reusable UI components
│   │   ├── context    # Global state providers
│   │   ├── hooks      # Custom React hooks
│   │   ├── layouts    # Page layouts
│   │   ├── lib        # Utility functions
│   │   ├── pages      # Main application views
│   │   ├── App.tsx    # Main application component
│   │   └── main.tsx   # Application entry point
│   └── index.html
├── server             # Backend Express application
│   ├── auth.ts        # Authentication logic
│   ├── index.ts       # Server entry point
│   ├── routes.ts      # API endpoints
│   ├── storage.ts     # Data persistence layer
│   └── vite.ts        # Vite integration
├── shared             # Shared code between client and server
│   └── schema.ts      # Database schema and types
└── README.md          # Project documentation
```

## Frontend Structure

### Components Organization

The frontend is organized into logical sections:

1. **Pages**: Main application views
   - `home-page.tsx`: Dashboard with devotionals, verse of day
   - `live-page.tsx`: Live streaming and sermon library
   - `community-page.tsx`: Testimonies and community features
   - `giving-page.tsx`: Donation features with M-Pesa integration
   - `profile-page.tsx`: User profile and saved content
   - `auth-page.tsx`: Authentication (login/registration)

2. **Components**: Reusable UI elements
   - `components/ui/`: ShadCN UI components
   - `components/navigation/`: Navigation components
   - `components/home/`: Home page specific components
   - `components/community/`: Community section components
   - `components/profile/`: Profile section components
   - `components/giving/`: Donation related components
   - `components/live/`: Live streaming related components

### Navigation

The app uses two navigation patterns:

1. **Bottom Tabs Navigation**: Primary mobile navigation
   - Home: Dashboard and updates
   - Live: Streaming and sermon library
   - Community: Testimonies and interactions
   - Giving: Donations
   - Profile: User settings and saved content

2. **Drawer Navigation**: Additional features and settings
   - Extended menu options
   - Theme toggle (light/dark mode)
   - Text size adjustments
   - Logout functionality

## Backend Structure

### Server Components

1. **API Routes** (`routes.ts`): Defines all API endpoints
   - User authentication
   - Testimonies management
   - Donations processing
   - Content serving

2. **Storage Interface** (`storage.ts`): Data persistence layer
   - In-memory storage implementation (default)
   - Methods for CRUD operations on various entities

3. **Schema** (`schema.ts`): Shared data models
   - Database table definitions
   - Type definitions for client and server
   - Validation schemas

### Data Models

The application uses several key data models:

1. **User**: User profiles and authentication
2. **Testimony**: User-shared testimonies
3. **Donation**: Financial contributions
4. **SavedContent**: Content bookmarked by users

## Key Features Implementation

### 1. Authentication
- JWT-based authentication
- Login/registration forms
- Protected routes for authenticated content

### 2. Live Streaming
- YouTube API integration for live streaming
- Sermon library with categorization
- Video playback functionality

### 3. Community Features
- Testimony creation and sharing
- Optional anonymous sharing
- Reactions (likes, comments) on testimonies

### 4. Donation System
- M-Pesa payment integration
- Transaction history
- Donation receipt generation

### 5. User Profile
- Profile information management
- Saved content library
- Activity statistics tracking

## Getting Started

### Prerequisites
- Node.js (v18+)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/church-app.git
cd church-app
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

4. Open your browser to [http://localhost:5000](http://localhost:5000)

## Future Enhancements

### 1. Backend Improvements
- **Database Integration**: Move from in-memory to persistent database
- **Performance Optimization**: Caching and query optimization
- **Security Enhancements**: Input validation and rate limiting

### 2. Frontend Features
- **Offline Support**: Caching for offline access
- **Push Notifications**: For live events and updates
- **Content Search**: Advanced search functionality
- **Multi-language Support**: Internationalization

### 3. Integration Possibilities
- **Church Calendar**: Event scheduling and reminders
- **Bible Study Tools**: Scripture references and study guides
- **Prayer Request System**: Community prayer requests
- **Small Group Management**: Group organization and communication

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- [ShadCN UI](https://ui.shadcn.com/) for the component library
- [Lucide Icons](https://lucide.dev/) for the icon set
- [TanStack Query](https://tanstack.com/query/latest) for data fetching
- [Tailwind CSS](https://tailwindcss.com/) for styling