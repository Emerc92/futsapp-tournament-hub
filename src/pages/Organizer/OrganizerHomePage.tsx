import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Trophy, Users, Calendar, Settings } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import BottomNavigation from '../../components/Layout/BottomNavigation';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Layout } from '@/components/Layout/Layout';
import { User } from 'lucide-react';

interface Tournament {
  TOUR_UUID: string;
  TOUR_NAME: string;
  TOUR_KIND: string;
  TOUR_CITY: string;
  TOUR_SDAT: string;
  TOUR_EDAT: string | null;
  TOUR_STAT: string;
  TOUR_EFEE: number;
  TOUR_MTEA: number;
  TOUR_TYPE: string;
}

const OrganizerHomePage: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchTournaments();
    }
  }, [user]);

  const fetchTournaments = async () => {
    try {
      const { data, error } = await supabase
        .from('FUTATOUR')
        .select('*')
        .eq('TOUR_ORGS_UUID', user?.id)
        .order('TOUR_DCRE', { ascending: false });

      if (error) {
        console.error('Errore nel recupero tornei:', error);
        toast({
          title: "Errore",
          description: "Impossibile caricare i tornei",
          variant: "destructive",
        });
        return;
      }

      setTournaments(data || []);
    } catch (error) {
      console.error('Errore:', error);
    } finally {
      setLoading(false);
    }
  };

  const stats = {
    totalTournaments: tournaments.length,
    totalRevenue: tournaments.reduce((sum, t) => sum + (t.TOUR_EFEE || 0), 0),
    totalParticipants: 0 // Questo sarà calcolato quando avremo le iscrizioni
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'open': return 'bg-blue-100 text-blue-800';
      case 'ongoing': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-yellow-100 text-yellow-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status.toLowerCase()) {
      case 'open': return 'Iscrizioni aperte';
      case 'ongoing': return 'In corso';
      case 'completed': return 'Completato';
      case 'cancelled': return 'Annullato';
      default: return status;
    }
  };

  const getTypeText = (type: string) => {
    switch (type) {
      case 'elimination': return 'Eliminazione Diretta';
      case 'round_robin': return 'Girone all\'Italiana';
      case 'mixed': return 'Misto';
      default: return type;
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="relative">
              {user?.avatar_url ? (
                <img
                  src={user.avatar_url}
                  alt="Profile"
                  className="w-16 h-16 rounded-full object-cover border-2 border-green-500"
                />
              ) : (
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center border-2 border-green-500">
                  <User className="h-8 w-8 text-green-600" />
                </div>
              )}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Benvenuto, {user?.nome} {user?.cognome}!
              </h1>
              <p className="text-gray-600">Pannello Organizzatore</p>
            </div>
          </div>
          <Button onClick={() => navigate('/organizer/create')} className="bg-green-600 hover:bg-green-700">
            <Plus className="h-4 w-4 mr-2" />
            Crea Torneo
          </Button>
        </div>

        <div className="p-6 space-y-6">
          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Link to="/organizer/create">
              <Button className="w-full flex items-center justify-center space-x-2" size="lg">
                <Plus className="w-5 h-5" />
                <span>Crea Nuovo Torneo</span>
              </Button>
            </Link>
          </motion.div>

          {/* My Tournaments */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h2 className="text-xl font-bold text-gray-900 mb-4">I Miei Tornei</h2>
            
            {loading ? (
              <div className="text-center py-8">
                <div className="text-gray-500">Caricamento tornei...</div>
              </div>
            ) : tournaments.length === 0 ? (
              <Card className="p-6 text-center">
                <Trophy className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Nessun torneo creato</h3>
                <p className="text-gray-600 mb-4">Inizia creando il tuo primo torneo!</p>
                <Link to="/organizer/create">
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Crea Torneo
                  </Button>
                </Link>
              </Card>
            ) : (
              <div className="space-y-4">
                {tournaments.map((tournament, index) => (
                  <motion.div
                    key={tournament.TOUR_UUID}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                  >
                    <Link to={`/organizer/tournament/${tournament.TOUR_UUID}`}>
                      <Card className="hover:shadow-xl transition-all p-4">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h3 className="font-semibold text-gray-900 mb-1">{tournament.TOUR_NAME}</h3>
                            <div className="flex items-center space-x-3 text-sm text-gray-600">
                              <span className="bg-gray-100 px-2 py-1 rounded">{tournament.TOUR_KIND}</span>
                              <span>{getTypeText(tournament.TOUR_TYPE)}</span>
                              <span>{tournament.TOUR_CITY}</span>
                            </div>
                            <div className="text-sm text-gray-500 mt-1">
                              {new Date(tournament.TOUR_SDAT).toLocaleDateString('it-IT')}
                              {tournament.TOUR_EDAT && ` - ${new Date(tournament.TOUR_EDAT).toLocaleDateString('it-IT')}`}
                            </div>
                          </div>
                          <span className={`px-2 py-1 rounded-lg text-sm ${getStatusColor(tournament.TOUR_STAT)}`}>
                            {getStatusText(tournament.TOUR_STAT)}
                          </span>
                        </div>

                        <div className="grid grid-cols-3 gap-4 mt-4">
                          <div className="text-center">
                            <div className="text-lg font-semibold text-gray-900">
                              0/{tournament.TOUR_MTEA}
                            </div>
                            <div className="text-xs text-gray-500">Squadre</div>
                          </div>
                          <div className="text-center">
                            <div className="text-lg font-semibold text-green-600">
                              €{tournament.TOUR_EFEE || 0}
                            </div>
                            <div className="text-xs text-gray-500">Quota</div>
                          </div>
                          <div className="text-center">
                            <Button size="sm" variant="outline">
                              Gestisci
                            </Button>
                          </div>
                        </div>

                        <div className="mt-3">
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                              style={{ width: `0%` }}
                            ></div>
                          </div>
                        </div>
                      </Card>
                    </Link>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>

          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <h2 className="text-xl font-bold text-gray-900 mb-4">Attività Recente</h2>
            <Card className="p-4">
              <div className="space-y-3">
                {tournaments.length > 0 ? (
                  <>
                    <div className="flex items-center space-x-3">
                      <Trophy className="w-5 h-5 text-blue-500" />
                      <span className="text-gray-700">Torneo "{tournaments[0]?.TOUR_NAME}" creato</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Calendar className="w-5 h-5 text-green-500" />
                      <span className="text-gray-700">
                        Prossimo torneo: {tournaments[0] && new Date(tournaments[0].TOUR_SDAT).toLocaleDateString('it-IT')}
                      </span>
                    </div>
                  </>
                ) : (
                  <div className="text-center text-gray-500 py-4">
                    Nessuna attività recente
                  </div>
                )}
              </div>
            </Card>
          </motion.div>
        </div>

        <BottomNavigation />
      </div>
    </Layout>
  );
};

export default OrganizerHomePage;
