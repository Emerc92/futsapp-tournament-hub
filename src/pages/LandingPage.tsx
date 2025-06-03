
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Users, Calendar, Trophy, Shield } from 'lucide-react';
import Button from '../components/UI/Button';
import Card from '../components/UI/Card';

const LandingPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleEarlyAccess = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Early access signup:', email);
    // Mock API call
    setSubmitted(true);
    setEmail('');
  };

  const features = [
    {
      icon: Users,
      title: 'Gestione Squadre',
      description: 'Crea e gestisci le tue squadre con facilità'
    },
    {
      icon: Calendar,
      title: 'Calendario Partite',
      description: 'Organizza tornei e tieni traccia di tutti i match'
    },
    {
      icon: Trophy,
      title: 'Classifiche Live',
      description: 'Classifiche aggiornate in tempo reale'
    },
    {
      icon: Shield,
      title: 'Sicurezza Garantita',
      description: 'Dati protetti e verificati per ogni giocatore'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="text-2xl font-bold text-blue-600">FutsApp</div>
            </div>
            <div className="flex space-x-4">
              <Link to="/login">
                <Button variant="outline">Accedi</Button>
              </Link>
              <Link to="/register">
                <Button>Inizia Gratis</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.h1 
              className="text-5xl md:text-6xl font-bold text-gray-900 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              La Piattaforma Definitiva per
              <span className="text-blue-600"> Tornei di Calcio</span>
            </motion.h1>
            
            <motion.p 
              className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Organizza tornei di calcio 5v5, 7v7 e 11v11 con facilità. 
              Gestisci squadre, calendari e classifiche tutto in un'unica app.
            </motion.p>

            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Link to="/register">
                <Button size="lg" className="min-w-[200px]">
                  Inizia Gratis Ora
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="outline" size="lg" className="min-w-[200px]">
                  Accedi al Tuo Account
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Tutto quello che ti serve per organizzare tornei perfetti
            </h2>
            <p className="text-lg text-gray-600">
              Strumenti professionali per giocatori e organizzatori
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="text-center h-full">
                  <feature.icon className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Early Access Section */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ottieni l'Accesso Anticipato
          </h2>
          <p className="text-blue-100 mb-8 text-lg">
            Iscriviti alla newsletter per essere tra i primi a provare FutsApp
          </p>

          {submitted ? (
            <motion.div 
              className="bg-green-500 text-white p-4 rounded-xl max-w-md mx-auto"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              ✅ Grazie! Ti contatteremo presto.
            </motion.div>
          ) : (
            <form onSubmit={handleEarlyAccess} className="max-w-md mx-auto">
              <div className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="La tua email"
                  className="flex-1 px-4 py-3 rounded-xl"
                  required
                />
                <Button type="submit" variant="secondary" className="px-6">
                  Iscriviti
                </Button>
              </div>
            </form>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="text-2xl font-bold mb-4">FutsApp</div>
            <p className="text-gray-400 mb-4">
              La piattaforma definitiva per tornei di calcio
            </p>
            <div className="flex justify-center space-x-6">
              <a href="#" className="text-gray-400 hover:text-white">Privacy</a>
              <a href="#" className="text-gray-400 hover:text-white">Termini</a>
              <a href="#" className="text-gray-400 hover:text-white">Contatti</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
