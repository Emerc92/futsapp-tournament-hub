
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plus, Trophy, Calendar, Users, MessageCircle, BarChart3, Settings } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import Layout from '@/components/Layout/Layout';

interface Tournament {
  TOUR_UUID: string;
  TOUR_NAME: string;
  TOUR_CITY: string;
  TOUR_TYPE: string;
  TOUR_STAT: string;
  TOUR_MTEA: number;
  TOUR_SDAT: string;
  TOUR_EDAT: string;
  TOUR_EFEE: number;
  TOUR_KIND: string;
}

const OrganizerHomePage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
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
        console.error('Error fetching tournaments:', error);
        toast({
          title: "Errore",
          description: "Impossibile caricare i tornei",
          variant: "destructive"
        });
      } else {
        setTournaments(data || []);
      }
    } catch (error) {
      console.error('Error fetching tournaments:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft': return 'bg-gray-100 text-gray-800';
      case 'open': return 'bg-green-100 text-green-800';
      case 'closed': return 'bg-yellow-100 text-yellow-800';
      case 'ongoing': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'draft': return 'Bozza';
      case 'open': return 'Aperto';
      case 'closed': return 'Chiuso';
      case 'ongoing': return 'In corso';
      case 'completed': return 'Completato';
      default: return status;
    }
  };

  const quickActions = [
    {
      title: 'Nuovo Torneo',
      description: 'Crea un nuovo torneo',
      icon: Plus,
      color: 'from-blue-500 to-purple-600',
      action: () => navigate('/organizer/create-tournament')
    },
    {
      title: 'Chat Capitani',
      description: 'Comunica con i capitani',
      icon: MessageCircle,
      color: 'from-green-500 to-teal-600',
      action: () => navigate('/organizer/chat')
    },
    {
      title: 'Statistiche',
      description: 'Visualizza statistiche',
      icon: BarChart3,
      color: 'from-orange-500 to-red-600',
      action: () => navigate('/organizer/stats')
    }
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="p-4">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-between"
            >
              <div>
                <h1 className="text-2xl font-bold">Ciao, {user?.nome}!</h1>
                <p className="text-blue-100">Gestisci i tuoi tornei</p>
              </div>
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <Trophy className="w-6 h-6" />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-4">Azioni Rapide</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <motion.div
                  key={action.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card 
                    className="cursor-pointer hover:shadow-lg transition-shadow"
                    onClick={action.action}
                  >
                    <CardContent className="p-4">
                      <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${action.color} flex items-center justify-center mb-3`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <h4 className="font-semibold text-gray-900">{action.title}</h4>
                      <p className="text-sm text-gray-600">{action.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          {/* Tournaments Section */}
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">I Miei Tornei</h3>
            <Button 
              onClick={() => navigate('/organizer/create-tournament')}
              size="sm"
              className="flex items-center space-x-1"
            >
              <Plus className="w-4 h-4" />
              <span>Nuovo</span>
            </Button>
          </div>

          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Caricamento tornei...</p>
            </div>
          ) : tournaments.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <Trophy className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h4 className="text-lg font-medium text-gray-900 mb-2">Nessun torneo trovato</h4>
                <p className="text-gray-600 mb-4">Inizia creando il tuo primo torneo!</p>
                <Button onClick={() => navigate('/organizer/create-tournament')}>
                  <Plus className="w-4 h-4 mr-2" />
                  Crea Torneo
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {tournaments.map((tournament) => (
                <motion.div
                  key={tournament.TOUR_UUID}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 mb-1">{tournament.TOUR_NAME}</h4>
                          <p className="text-gray-600 text-sm mb-2">{tournament.TOUR_CITY} • {tournament.TOUR_KIND}</p>
                          <div className="flex items-center space-x-2 text-sm text-gray-500">
                            <Calendar className="w-4 h-4" />
                            <span>{new Date(tournament.TOUR_SDAT).toLocaleDateString('it-IT')}</span>
                            <span>-</span>
                            <span>{new Date(tournament.TOUR_EDAT).toLocaleDateString('it-IT')}</span>
                          </div>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(tournament.TOUR_STAT)}`}>
                          {getStatusText(tournament.TOUR_STAT)}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4 text-center border-t pt-3">
                        <div>
                          <div className="text-lg font-bold text-blue-600">{tournament.TOUR_MTEA}</div>
                          <div className="text-xs text-gray-500">Max Squadre</div>
                        </div>
                        <div>
                          <div className="text-lg font-bold text-green-600">€{tournament.TOUR_EFEE}</div>
                          <div className="text-xs text-gray-500">Iscrizione</div>
                        </div>
                        <div>
                          <div className="text-lg font-bold text-purple-600">{tournament.TOUR_TYPE}</div>
                          <div className="text-xs text-gray-500">Tipo</div>
                        </div>
                      </div>
                      
                      <div className="flex space-x-2 mt-4">
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="flex-1"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/organizer/tournament/${tournament.TOUR_UUID}`);
                          }}
                        >
                          <Settings className="w-4 h-4 mr-1" />
                          Gestisci
                        </Button>
                        <Button 
                          size="sm" 
                          className="flex-1"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/organizer/tournament/${tournament.TOUR_UUID}/stats`);
                          }}
                        >
                          <BarChart3 className="w-4 h-4 mr-1" />
                          Statistiche
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default OrganizerHomePage;
