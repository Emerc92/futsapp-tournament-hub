
import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Trophy, Users, Calendar } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';
import Card from '../../components/UI/Card';
import Button from '../../components/UI/Button';
import BottomNavigation from '../../components/Layout/BottomNavigation';

const PlayerHomePage: React.FC = () => {
  const { user } = useAuth();

  // Mock data - replace with actual API calls
  const upcomingTournaments = [
    {
      id: '1',
      name: 'Torneo Estivo 2024',
      type: '5v5',
      location: 'Roma Centro',
      date: '2024-07-15',
      teams: 12
    },
    {
      id: '2',
      name: 'Champions League Locale',
      type: '7v7',
      location: 'Milano Nord',
      date: '2024-07-20',
      teams: 8
    },
    {
      id: '3',
      name: 'Coppa Amatori',
      type: '11v11',
      location: 'Napoli Sud',
      date: '2024-07-25',
      teams: 16
    }
  ];

  const stats = {
    tournaments: 15,
    wins: 8,
    goals: 23
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-gradient-to-r from-blue-600 to-green-600 text-white p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center space-x-4"
        >
          {user?.avatar_url ? (
            <img
              src={user.avatar_url}
              alt="Profile"
              className="w-16 h-16 rounded-full border-3 border-white"
            />
          ) : (
            <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
              <Users className="w-8 h-8" />
            </div>
          )}
          <div>
            <h1 className="text-2xl font-bold">
              Ciao, {user?.nome} {user?.cognome}!
            </h1>
            <p className="text-blue-100">Giocatore</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-3 gap-4 mt-6"
        >
          <div className="text-center">
            <div className="text-2xl font-bold">{stats.tournaments}</div>
            <div className="text-sm text-blue-100">Tornei</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">{stats.wins}</div>
            <div className="text-sm text-blue-100">Vittorie</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">{stats.goals}</div>
            <div className="text-sm text-blue-100">Gol</div>
          </div>
        </motion.div>
      </div>

      <div className="p-6 space-y-6">
        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Link to="/tournaments/search">
            <Button className="w-full flex items-center justify-center space-x-2" size="lg">
              <MapPin className="w-5 h-5" />
              <span>Cerca Tornei Vicini</span>
            </Button>
          </Link>
        </motion.div>

        {/* Upcoming Tournaments */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-xl font-bold text-gray-900 mb-4">Prossimi Tornei</h2>
          <div className="space-y-4">
            {upcomingTournaments.map((tournament, index) => (
              <motion.div
                key={tournament.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
              >
                <Link to={`/tournaments/${tournament.id}`}>
                  <Card className="hover:shadow-xl transition-all">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-gray-900">{tournament.name}</h3>
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-lg text-sm">
                        {tournament.type}
                      </span>
                    </div>
                    <div className="flex items-center text-gray-600 text-sm space-x-4">
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-4 h-4" />
                        <span>{tournament.location}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(tournament.date).toLocaleDateString('it-IT')}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users className="w-4 h-4" />
                        <span>{tournament.teams} squadre</span>
                      </div>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <h2 className="text-xl font-bold text-gray-900 mb-4">Attività Recente</h2>
          <Card>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Trophy className="w-5 h-5 text-yellow-500" />
                <span className="text-gray-700">Vittoria nel Torneo Primavera 2024</span>
              </div>
              <div className="flex items-center space-x-3">
                <Users className="w-5 h-5 text-blue-500" />
                <span className="text-gray-700">Iscrizione al Torneo Estivo 2024</span>
              </div>
              <div className="flex items-center space-x-3">
                <Calendar className="w-5 h-5 text-green-500" />
                <span className="text-gray-700">Prossima partita: 15 Luglio</span>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default PlayerHomePage;
