import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import Layout from '@/components/Layout';

interface FormData {
  nome: string;
  citta: string;
  tipo: 'elimination' | 'round_robin' | 'mixed';
  regole: string;
  costoIscrizione: string;
  prezzoPartita: string;
  dataInizio: string;
  dataFine: string;
  maxSquadre: string;
  tipoSport: '5v5' | '7v7' | '11v11';
  note: string;
  logo: string;
}

const CreateTournamentPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [formData, setFormData] = useState<FormData>({
    nome: '',
    citta: '',
    tipo: 'elimination',
    regole: '',
    costoIscrizione: '',
    prezzoPartita: '',
    dataInizio: '',
    dataFine: '',
    maxSquadre: '',
    tipoSport: '5v5',
    note: '',
    logo: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    setError('');

    try {
      console.log('Creating tournament with data:', formData);
      
      // Map form data to database fields with correct ENUM values
      const tournamentData = {
        TOUR_NAME: formData.nome,
        TOUR_CITY: formData.citta,
        TOUR_TYPE: formData.tipo as 'elimination' | 'round_robin' | 'mixed',
        TOUR_STAT: 'draft' as 'draft' | 'open' | 'closed' | 'active' | 'completed',
        TOUR_RULE: formData.regole ? JSON.parse(formData.regole) : null,
        TOUR_EFEE: parseFloat(formData.costoIscrizione) || 0,
        TOUR_PMAT: parseFloat(formData.prezzoPartita) || 0,
        TOUR_SDAT: formData.dataInizio,
        TOUR_EDAT: formData.dataFine,
        TOUR_RDAT: formData.dataInizio, // Registration deadline same as start date for now
        TOUR_MTEA: parseInt(formData.maxSquadre) || 8,
        TOUR_KIND: formData.tipoSport,
        TOUR_NOTE: formData.note || null,
        TOUR_LOGO: formData.logo || null,
        TOUR_ORGS_UUID: user.id
      };

      const { data, error } = await supabase
        .from('FUTATOUR')
        .insert(tournamentData)
        .select()
        .single();

      if (error) {
        console.error('Error creating tournament:', error);
        throw new Error('Errore durante la creazione del torneo');
      }

      console.log('Tournament created successfully:', data);
      toast({
        title: "Torneo creato",
        description: "Il torneo è stato creato con successo!",
      });

      // Reset form or redirect
      setFormData({
        nome: '',
        citta: '',
        tipo: 'elimination',
        regole: '',
        costoIscrizione: '',
        prezzoPartita: '',
        dataInizio: '',
        dataFine: '',
        maxSquadre: '',
        tipoSport: '5v5',
        note: '',
        logo: ''
      });

    } catch (error: any) {
      console.error('Tournament creation error:', error);
      setError(error.message || 'Errore durante la creazione del torneo');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <Layout>
      <div className="container mx-auto py-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Crea un nuovo torneo</CardTitle>
            <CardDescription>Inserisci i dettagli del torneo qui sotto.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              <div>
                <Label htmlFor="nome">Nome del Torneo</Label>
                <Input
                  type="text"
                  id="nome"
                  name="nome"
                  value={formData.nome}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="citta">Città</Label>
                <Input
                  type="text"
                  id="citta"
                  name="citta"
                  value={formData.citta}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="tipo">Tipo di Torneo</Label>
                <Select onValueChange={(value) => setFormData({ ...formData, tipo: value as 'elimination' | 'round_robin' | 'mixed' })}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Seleziona un tipo" defaultValue={formData.tipo} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="elimination">Eliminazione Diretta</SelectItem>
                    <SelectItem value="round_robin">Girone all'Italiana</SelectItem>
                    <SelectItem value="mixed">Misto</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="regole">Regole (JSON)</Label>
                <Textarea
                  id="regole"
                  name="regole"
                  value={formData.regole}
                  onChange={handleChange}
                  placeholder="Inserisci le regole in formato JSON"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="costoIscrizione">Costo di Iscrizione</Label>
                  <Input
                    type="number"
                    id="costoIscrizione"
                    name="costoIscrizione"
                    value={formData.costoIscrizione}
                    onChange={handleChange}
                    placeholder="0.00"
                  />
                </div>
                <div>
                  <Label htmlFor="prezzoPartita">Prezzo per Partita</Label>
                  <Input
                    type="number"
                    id="prezzoPartita"
                    name="prezzoPartita"
                    value={formData.prezzoPartita}
                    onChange={handleChange}
                    placeholder="0.00"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="dataInizio">Data di Inizio</Label>
                  <Input
                    type="date"
                    id="dataInizio"
                    name="dataInizio"
                    value={formData.dataInizio}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="dataFine">Data di Fine</Label>
                  <Input
                    type="date"
                    id="dataFine"
                    name="dataFine"
                    value={formData.dataFine}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="maxSquadre">Massimo Numero di Squadre</Label>
                <Input
                  type="number"
                  id="maxSquadre"
                  name="maxSquadre"
                  value={formData.maxSquadre}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="tipoSport">Tipo di Sport</Label>
                <Select onValueChange={(value) => setFormData({ ...formData, tipoSport: value as '5v5' | '7v7' | '11v11' })}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Seleziona un tipo di sport" defaultValue={formData.tipoSport} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5v5">Calcio a 5</SelectItem>
                    <SelectItem value="7v7">Calcio a 7</SelectItem>
                    <SelectItem value="11v11">Calcio a 11</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="note">Note Aggiuntive</Label>
                <Textarea
                  id="note"
                  name="note"
                  value={formData.note}
                  onChange={handleChange}
                  placeholder="Inserisci note aggiuntive"
                />
              </div>
              <div>
                <Label htmlFor="logo">Logo URL</Label>
                <Input
                  type="text"
                  id="logo"
                  name="logo"
                  value={formData.logo}
                  onChange={handleChange}
                  placeholder="Inserisci l'URL del logo"
                />
              </div>
              <Button type="submit" disabled={loading} className="w-full">
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creazione in corso...
                  </>
                ) : (
                  'Crea Torneo'
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default CreateTournamentPage;
