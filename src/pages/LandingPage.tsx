
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Logo from '@/components/ui/logo';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-green-600 to-blue-600 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center py-6">
            <Logo size="md" variant="full" className="text-white" />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-8">
            <Logo size="xl" variant="icon" className="mx-auto mb-6" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Organizza e Gestisci
            <span className="text-green-600 block">Tornei di Calcio</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            La piattaforma completa per tornei di calcio 5v5, 7v7 e 11v11. 
            Iscriviti come giocatore o organizza i tuoi tornei.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              onClick={() => navigate('/register')}
              className="text-lg px-8 py-4"
            >
              Inizia Gratis
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => navigate('/login')}
              className="text-lg px-8 py-4"
            >
              Ho già un account
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Tutto quello che ti serve
            </h2>
            <p className="text-xl text-gray-600">
              Funzionalità complete per giocatori e organizzatori
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <Users className="h-12 w-12 text-green-600 mb-4" />
                <CardTitle>Per Giocatori</CardTitle>
                <CardDescription>
                  Trova tornei vicini, iscriviti e gestisci le tue squadre
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Ricerca tornei per zona</li>
                  <li>• Iscrizione facile e veloce</li>
                  <li>• Gestione squadre</li>
                  <li>• Statistiche personali</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <Calendar className="h-12 w-12 text-blue-600 mb-4" />
                <CardTitle>Per Organizzatori</CardTitle>
                <CardDescription>
                  Crea e gestisci tornei con facilità
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Creazione tornei rapida</li>
                  <li>• Gestione iscrizioni</li>
                  <li>• Calendario partite</li>
                  <li>• Comunicazioni automatiche</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="h-12 w-12 text-yellow-600 mb-4 flex items-center">
                  <Logo size="sm" variant="icon" />
                </div>
                <CardTitle>Funzionalità Premium</CardTitle>
                <CardDescription>
                  Strumenti avanzati per tornei professionali
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Classifiche automatiche</li>
                  <li>• Statistiche avanzate</li>
                  <li>• Notifiche push</li>
                  <li>• Condivisione social</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Logo size="lg" variant="icon" className="mx-auto mb-6 opacity-90" />
          <h2 className="text-3xl font-bold text-white mb-4">
            Pronto a iniziare?
          </h2>
          <p className="text-xl text-green-100 mb-8">
            Unisciti alla community di FutsApp e scopri tornei nella tua zona
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Logo size="md" variant="full" className="justify-center mb-4" />
            <p className="text-gray-400">
              La piattaforma per i tornei di calcio in Italia
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
