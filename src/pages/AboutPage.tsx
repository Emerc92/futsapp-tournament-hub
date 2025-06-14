
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Users, Target, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Logo from '@/components/ui/logo';

const AboutPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      {/* Header */}
      <header className="bg-gray-900 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/')}
              className="text-white hover:bg-white/20"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Torna alla Home
            </Button>
            <Logo size="md" variant="full" className="text-white" />
            <div className="w-32"></div> {/* Spacer for centering */}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <Logo size="xl" variant="icon" className="mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Chi siamo
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            La storia di FutsApp: dall'idea alla piattaforma che rivoluziona i tornei di calcio
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">La nostra storia</h2>
            
            <p className="text-gray-700 mb-6 text-lg leading-relaxed">
              FutsApp nasce nel 2025 dall'esperienza diretta di un gruppo di appassionati di calcio che, 
              come tanti altri, si trovavano a dover gestire tornei amatoriali con strumenti inadeguati. 
              Fogli Excel infiniti, gruppi WhatsApp caotici, calendari scritti a mano: tutto questo 
              apparteneva al passato per noi.
            </p>

            <p className="text-gray-700 mb-6 text-lg leading-relaxed">
              L'idea è nata durante l'organizzazione di un torneo di calcio a 5 nel nostro quartiere. 
              Dopo ore spese a coordinare squadre, gestire iscrizioni e comunicare risultati, 
              ci siamo resi conto che serviva una soluzione moderna, semplice e alla portata di tutti.
            </p>

            <p className="text-gray-700 mb-8 text-lg leading-relaxed">
              Così è nata FutsApp: una piattaforma pensata da giocatori per giocatori, 
              che semplifica ogni aspetto dell'organizzazione di tornei di calcio. 
              Dai campionati su scala nazionale al torneo tra amici: 
              FutsApp è la casa digitale dei tornei amatoriali.
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-blue-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">I nostri valori</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <Users className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <CardTitle>Comunità</CardTitle>
                <CardDescription>
                  Crediamo nel potere della comunità calcistica
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Il calcio unisce le persone. La nostra missione è creare una piattaforma 
                  che rafforzi i legami tra giocatori, organizzatori e appassionati.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <Target className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <CardTitle>Semplicità</CardTitle>
                <CardDescription>
                  Tecnologia semplice per tutti
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Non serve essere esperti di tecnologia. FutsApp è progettato per essere 
                  intuitivo e accessibile a chiunque voglia organizzare o partecipare a tornei.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <Heart className="h-12 w-12 text-red-500 mx-auto mb-4" />
                <CardTitle>Passione</CardTitle>
                <CardDescription>
                  L'amore per il calcio ci guida
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Ogni funzionalità nasce dall'ascolto della community e dalla nostra 
                  esperienza diretta sul campo. Il calcio è la nostra passione.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Il team</h2>
          <p className="text-lg text-gray-700 mb-8">
            Siamo un gruppo di sviluppatori, designer e appassionati di calcio 
            che lavora ogni giorno per migliorare l'esperienza dei tornei amatoriali in Italia.
          </p>
          <p className="text-lg text-gray-700">
            Il nostro obiettivo è semplice: rendere il mondo dei tornei amatoriali più accessibile, 
            organizzato e divertente per tutti.
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Unisciti alla rivoluzione
          </h2>
          <p className="text-xl text-green-100 mb-8">
            Fai parte della community che sta cambiando il modo di organizzare tornei di calcio
          </p>
          <Button 
            size="lg" 
            variant="secondary"
            onClick={() => navigate('/register')}
            className="text-lg px-8 py-4"
          >
            Inizia ora
          </Button>
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

export default AboutPage;
