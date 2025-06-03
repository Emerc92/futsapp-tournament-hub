
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, Calendar, Users, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';
import Card from '../../components/UI/Card';
import Button from '../../components/UI/Button';
import BottomNavigation from '../../components/Layout/BottomNavigation';

const TournamentSearchPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  // Mock data - replace with actual API call
  const tournaments = [
    {
      id: '1',
      name: 'Torneo Estivo 2024',
      type: '5v5',
      location: 'Roma Centro',
      distance: '2.5 km',
      date: '2024-07-15',
      fee: 50,
      teams: 12,
      maxTeams: 16,
      organizer: 'Mario Bianchi'
    },
    {
      id: '2',
      name: 'Champions League Locale',
      type: '7v7',
      location: 'Milano Nord',
      distance: '5.2 km',
      date: '2024-07-20',
      fee: 75,
      teams: 8,
      maxTeams: 12,
      organizer: 'Luca Verdi'
    },
    {
      id: '3',
      name: 'Coppa Amatori',
      type: '11v11',
      location: 'Napoli Sud',
      distance: '8.1 km',
      date: '2024-07-25',
      fee: 100,
      teams: 16,
      maxTeams: 16,
      organizer: 'Andrea Rossi'
    }
  ];

  const filteredTournaments = tournaments.filter(tournament => {
    const matchesSearch = tournament.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         tournament.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === 'all' || tournament.type === selectedType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white shadow-sm p-4">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Cerca Tornei</h1>
        
        {/* Search Bar */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Cerca per nome o località..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Filter Bar */}
        <div className="flex items-center space-x-2">
          <div className="flex-1 flex space-x-2 overflow-x-auto">
            {['all', '5v5', '7v7', '11v11'].map((type) => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                  selectedType === type
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {type === 'all' ? 'Tutti' : type}
              </button>
            ))}
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <Filter className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Advanced Filters */}
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4 p-4 bg-gray-50 rounded-xl"
          >
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Distanza massima
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                  <option>5 km</option>
                  <option>10 km</option>
                  <option>20 km</option>
                  <option>50 km</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Budget massimo
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                  <option>€50</option>
                  <option>€100</option>
                  <option>€150</option>
                  <option>Nessun limite</option>
                </select>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Location Banner */}
      <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mx-4 mt-4 rounded-r-xl">
        <div className="flex items-center">
          <MapPin className="w-5 h-5 text-blue-600 mr-2" />
          <span className="text-blue-800">Mostrando tornei vicino a Roma, Italia</span>
        </div>
      </div>

      {/* Tournament List */}
      <div className="p-4 space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-900">
            {filteredTournaments.length} tornei trovati
          </h2>
        </div>

        {filteredTournaments.map((tournament, index) => (
          <motion.div
            key={tournament.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Link to={`/tournaments/${tournament.id}`}>
              <Card className="hover:shadow-xl transition-all">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">{tournament.name}</h3>
                    <p className="text-sm text-gray-600">Organizzato da {tournament.organizer}</p>
                  </div>
                  <div className="text-right">
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-lg text-sm">
                      {tournament.type}
                    </span>
                    {tournament.teams === tournament.maxTeams && (
                      <div className="bg-red-100 text-red-800 px-2 py-1 rounded-lg text-xs mt-1">
                        Completo
                      </div>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span>{tournament.location} • {tournament.distance}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(tournament.date).toLocaleDateString('it-IT')}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Users className="w-4 h-4" />
                    <span>{tournament.teams}/{tournament.maxTeams} squadre</span>
                  </div>
                  <div className="text-sm text-gray-900 font-medium">
                    €{tournament.fee} quota
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <div className="w-full bg-gray-200 rounded-full h-2 mr-3">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(tournament.teams / tournament.maxTeams) * 100}%` }}
                    ></div>
                  </div>
                  <Button 
                    size="sm" 
                    disabled={tournament.teams === tournament.maxTeams}
                    onClick={(e) => {
                      e.preventDefault();
                      console.log('Iscriviti al torneo', tournament.id);
                    }}
                  >
                    {tournament.teams === tournament.maxTeams ? 'Completo' : 'Iscriviti'}
                  </Button>
                </div>
              </Card>
            </Link>
          </motion.div>
        ))}

        {filteredTournaments.length === 0 && (
          <div className="text-center py-12">
            <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Nessun torneo trovato
            </h3>
            <p className="text-gray-600">
              Prova a modificare i filtri di ricerca
            </p>
          </div>
        )}
      </div>

      <BottomNavigation />
    </div>
  );
};

export default TournamentSearchPage;
