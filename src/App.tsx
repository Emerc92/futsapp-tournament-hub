
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { Toaster } from './components/ui/toaster';
import ProtectedRoute from './components/Auth/ProtectedRoute';

// Public pages
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/Auth/LoginPage';
import RegisterPage from './pages/Auth/RegisterPage';
import NotFound from './pages/NotFound';

// Player pages
import PlayerHomePage from './pages/Player/PlayerHomePage';

// Organizer pages
import OrganizerHomePage from './pages/Organizer/OrganizerHomePage';
import CreateTournamentPage from './pages/Organizer/CreateTournamentPage';
import TournamentManagementPage from './pages/Organizer/TournamentManagementPage';
import ChatPage from './pages/Organizer/ChatPage';

// Shared pages
import ProfilePage from './pages/ProfilePage';
import TournamentSearchPage from './pages/Tournament/TournamentSearchPage';
import TournamentDetailPage from './pages/Tournament/TournamentDetailPage';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="App">
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            {/* Protected Player routes */}
            <Route 
              path="/home/player" 
              element={
                <ProtectedRoute requiredRole="player">
                  <PlayerHomePage />
                </ProtectedRoute>
              } 
            />

            {/* Protected Organizer routes */}
            <Route 
              path="/home/organizer" 
              element={
                <ProtectedRoute requiredRole="organizer">
                  <OrganizerHomePage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/organizer/create-tournament" 
              element={
                <ProtectedRoute requiredRole="organizer">
                  <CreateTournamentPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/organizer/tournament/:id" 
              element={
                <ProtectedRoute requiredRole="organizer">
                  <TournamentManagementPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/organizer/chat" 
              element={
                <ProtectedRoute requiredRole="organizer">
                  <ChatPage />
                </ProtectedRoute>
              } 
            />

            {/* Shared protected routes */}
            <Route 
              path="/profile" 
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/tournaments" 
              element={
                <ProtectedRoute>
                  <TournamentSearchPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/tournament/:id" 
              element={
                <ProtectedRoute>
                  <TournamentDetailPage />
                </ProtectedRoute>
              } 
            />

            {/* Redirect based on user role - will be handled by ProtectedRoute */}
            <Route path="/home" element={<Navigate to="/home/player" replace />} />

            {/* 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        <Toaster />
      </AuthProvider>
    </Router>
  );
}

export default App;
