
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/Auth/ProtectedRoute";

// Pages
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/Auth/LoginPage";
import RegisterPage from "./pages/Auth/RegisterPage";
import PlayerHomePage from "./pages/Player/PlayerHomePage";
import OrganizerHomePage from "./pages/Organizer/OrganizerHomePage";
import TournamentDetailPage from "./pages/Tournament/TournamentDetailPage";
import TournamentSearchPage from "./pages/Tournament/TournamentSearchPage";
import CreateTournamentPage from "./pages/Organizer/CreateTournamentPage";
import TournamentManagementPage from "./pages/Organizer/TournamentManagementPage";
import ProfilePage from "./pages/ProfilePage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            
            {/* Protected Routes - Player */}
            <Route path="/home/player" element={
              <ProtectedRoute requiredRole="player">
                <PlayerHomePage />
              </ProtectedRoute>
            } />
            <Route path="/tournaments/search" element={
              <ProtectedRoute requiredRole="player">
                <TournamentSearchPage />
              </ProtectedRoute>
            } />
            
            {/* Protected Routes - Organizer */}
            <Route path="/home/organizer" element={
              <ProtectedRoute requiredRole="organizer">
                <OrganizerHomePage />
              </ProtectedRoute>
            } />
            <Route path="/organizer/create" element={
              <ProtectedRoute requiredRole="organizer">
                <CreateTournamentPage />
              </ProtectedRoute>
            } />
            <Route path="/organizer/tournament/:id" element={
              <ProtectedRoute requiredRole="organizer">
                <TournamentManagementPage />
              </ProtectedRoute>
            } />
            
            {/* Shared Protected Routes */}
            <Route path="/tournaments/:id" element={
              <ProtectedRoute>
                <TournamentDetailPage />
              </ProtectedRoute>
            } />
            <Route path="/profile" element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            } />
            
            {/* Redirects */}
            <Route path="/home" element={<Navigate to="/" replace />} />
            
            {/* 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
