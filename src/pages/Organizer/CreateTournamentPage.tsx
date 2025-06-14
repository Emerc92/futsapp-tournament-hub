
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, MapPin, Calendar, Users, Trophy } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const CreateTournamentPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    type: 'elimination',
    kind: '5v5',
    city: '',
    startDate: '',
    endDate: '',
    entryFee: '',
    matchPrice: '',
    maxTeams: '',
    description: '',
    rules: '',
    logo: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!user) {
        throw new Error('Utente non autenticato');
      }

      // Validazione campi obbligatori
      if (!formData.name || !formData.city || !formData.startDate || !formData.maxTeams) {
        throw new Error('Compila tutti i campi obbligatori');
      }

      // Inserimento nella tabella FUTATOUR
      const { data, error } = await supabase
        .from('FUTATOUR')
        .insert({
          TOUR_NAME: formData.name,
          TOUR_CITY: formData.city,
          TOUR_TYPE: formData.type,
          TOUR_KIND: formData.kind,
          TOUR_STAT: 'open',
          TOUR_SDAT: formData.startDate,
          TOUR_EDAT: formData.endDate || null,
          TOUR_RDAT: new Date().toISOString(),
          TOUR_EFEE: formData.entryFee ? parseFloat(formData.entryFee) : 0,
          TOUR_PMAT: formData.matchPrice ? parseFloat(formData.matchPrice) : 0,
          TOUR_MTEA: parseInt(formData.maxTeams),
          TOUR_NOTE: formData.description || null,
          TOUR_RULE: formData.rules ? { rules: formData.rules } : null,
          TOUR_LOGO: formData.logo || null,
          TOUR_ORGS_UUID: user.id
        })
        .select()
        .single();

      if (error) {
        console.error('Errore inserimento torneo:', error);
        throw new Error('Errore durante la creazione del torneo');
      }

      toast({
        title: "Torneo creato con successo!",
        description: `Il torneo "${formData.name}" è stato creato.`,
      });

      // Naviga alla home dell'organizzatore
      navigate('/home/organizer');
    } catch (error: any) {
      console.error('Errore:', error);
      toast({
        title: "Errore",
        description: error.message || 'Si è verificato un errore durante la creazione del torneo',
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm p-4">
        <div className="flex items-center space-x-4">
          <Link to="/home/organizer">
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </Link>
          <h1 className="text-xl font-bold text-gray-900">Crea Nuovo Torneo</h1>
        </div>
      </div>

      <div className="p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="p-4">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Info */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Trophy className="w-5 h-5 mr-2 text-blue-600" />
                  Informazioni Base
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Nome Torneo *
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Es. Torneo Estivo 2024"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-2">
                        Tipo Torneo *
                      </label>
                      <select
                        id="type"
                        name="type"
                        value={formData.type}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      >
                        <option value="elimination">Eliminazione Diretta</option>
                        <option value="round_robin">Girone all'Italiana</option>
                        <option value="mixed">Misto</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="kind" className="block text-sm font-medium text-gray-700 mb-2">
                        Formato *
                      </label>
                      <select
                        id="kind"
                        name="kind"
                        value={formData.kind}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      >
                        <option value="5v5">Calcio a 5</option>
                        <option value="7v7">Calcio a 7</option>
                        <option value="11v11">Calcio a 11</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="maxTeams" className="block text-sm font-medium text-gray-700 mb-2">
                      Max Squadre *
                    </label>
                    <input
                      id="maxTeams"
                      name="maxTeams"
                      type="number"
                      value={formData.maxTeams}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="16"
                      min="4"
                      max="32"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Location & Dates */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <MapPin className="w-5 h-5 mr-2 text-green-600" />
                  Luogo e Date
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
                      Città *
                    </label>
                    <input
                      id="city"
                      name="city"
                      type="text"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Es. Roma"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-2">
                        Data Inizio *
                      </label>
                      <input
                        id="startDate"
                        name="startDate"
                        type="datetime-local"
                        value={formData.startDate}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-2">
                        Data Fine
                      </label>
                      <input
                        id="endDate"
                        name="endDate"
                        type="datetime-local"
                        value={formData.endDate}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Financial */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Users className="w-5 h-5 mr-2 text-yellow-600" />
                  Costi
                </h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="entryFee" className="block text-sm font-medium text-gray-700 mb-2">
                      Quota Iscrizione (€)
                    </label>
                    <input
                      id="entryFee"
                      name="entryFee"
                      type="number"
                      step="0.01"
                      value={formData.entryFee}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="50.00"
                      min="0"
                    />
                  </div>

                  <div>
                    <label htmlFor="matchPrice" className="block text-sm font-medium text-gray-700 mb-2">
                      Prezzo per Partita (€)
                    </label>
                    <input
                      id="matchPrice"
                      name="matchPrice"
                      type="number"
                      step="0.01"
                      value={formData.matchPrice}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="10.00"
                      min="0"
                    />
                  </div>
                </div>
              </div>

              {/* Additional Info */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Informazioni Aggiuntive
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                      Descrizione
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Descrivi il torneo..."
                    />
                  </div>

                  <div>
                    <label htmlFor="rules" className="block text-sm font-medium text-gray-700 mb-2">
                      Regolamento
                    </label>
                    <textarea
                      id="rules"
                      name="rules"
                      value={formData.rules}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Specifica le regole del torneo..."
                    />
                  </div>

                  <div>
                    <label htmlFor="logo" className="block text-sm font-medium text-gray-700 mb-2">
                      URL Logo
                    </label>
                    <input
                      id="logo"
                      name="logo"
                      type="url"
                      value={formData.logo}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="https://example.com/logo.png"
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full"
                  size="lg"
                >
                  {loading ? 'Creazione in corso...' : 'Crea Torneo'}
                </Button>
              </div>
            </form>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default CreateTournamentPage;
