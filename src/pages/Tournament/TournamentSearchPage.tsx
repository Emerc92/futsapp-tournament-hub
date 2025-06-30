import React, { useState, useEffect } from 'react';
import { Search, MapPin, Filter, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Tournament {
  id: string;
  name: string;
  tournament_type: 'elimination' | 'round_robin' | 'mixed';
  location: string;
  start_date: string;
  entry_fee: number;
  organizer_id: string;
}

const TournamentSearchPage: React.FC = () => {
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Get user's location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    }

    fetchTournaments();
  }, []);

  const fetchTournaments = async () => {
    try {
      const { data, error } = await (supabase as any)
        .from('tournaments')
        .select('*')
        .eq('status', 'open')
        .order('start_date', { ascending: true });

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
      toast({
        title: "Errore",
        description: "Errore di connessione",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (tournamentId: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          title: "Accesso richiesto",
          description: "Devi essere loggato per iscriverti a un torneo",
          variant: "destructive"
        });
        return;
      }

      const { error } = await (supabase as any)
        .from('tournament_registrations')
        .insert({
          tournament_id: tournamentId,
          user_id: user.id,
          paid: false
        });

      if (error) {
        console.error('Error registering for tournament:', error);
        if (error.code === '23505') {
          toast({
            title: "Già iscritto",
            description: "Sei già iscritto a questo torneo",
            variant: "destructive"
          });
        } else {
          toast({
            title: "Errore",
            description: "Errore durante l'iscrizione",
            variant: "destructive"
          });
        }
      } else {
        toast({
          title: "Iscrizione completata",
          description: "Ti sei iscritto con successo al torneo!",
        });
      }
    } catch (error) {
      console.error('Error registering for tournament:', error);
      toast({
        title: "Errore",
        description: "Errore durante l'iscrizione",
        variant: "destructive"
      });
    }
  };

  const filteredTournaments = tournaments.filter(tournament => {
    const matchesSearch = tournament.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tournament.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || tournament.tournament_type === selectedType;
    return matchesSearch && matchesType;
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Cerca Tornei</h1>
          <p className="text-gray-600">Trova tornei di calcio nella tua zona</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Cerca per nome torneo o città..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="flex gap-4">
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="all">Tutti i tipi</option>
                <option value="elimination">Eliminazione</option>
                <option value="round_robin">Girone</option>
                <option value="mixed">Misto</option>
              </select>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filtri
              </Button>
            </div>
          </div>
        </div>

        {/* Tournaments Grid */}
        {filteredTournaments.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Nessun torneo trovato</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTournaments.map((tournament) => (
              <Card key={tournament.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{tournament.name}</CardTitle>
                    <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                      {tournament.tournament_type}
                    </span>
                  </div>
                  <CardDescription>
                    <div className="flex items-center text-sm text-gray-500 mt-2">
                      <MapPin className="h-4 w-4 mr-1" />
                      {tournament.location}
                    </div>
                    <div className="flex items-center text-sm text-gray-500 mt-1">
                      <Calendar className="h-4 w-4 mr-1" />
                      {new Date(tournament.start_date).toLocaleDateString('it-IT')}
                    </div>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-2xl font-bold text-green-600">€{tournament.entry_fee}</span>
                      <span className="text-sm text-gray-500 ml-1">per squadra</span>
                    </div>
                    <Button 
                      onClick={() => handleRegister(tournament.id)}
                      size="sm"
                    >
                      Iscriviti
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TournamentSearchPage;
