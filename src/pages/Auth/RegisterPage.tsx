import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, ArrowLeft } from 'lucide-react';
import Logo from '@/components/ui/logo';

interface FormData {
  nome: string;
  cognome: string;
  numero_documento: string;
  data_nascita: string;
  email: string;
  telefono: string;
  password: string;
  confirmPassword: string;
  role: 'player' | 'organizer';
}

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const { register, loading, user } = useAuth();
  const [formData, setFormData] = useState<FormData>({
    nome: '',
    cognome: '',
    numero_documento: '',
    data_nascita: '',
    email: '',
    telefono: '',
    password: '',
    confirmPassword: '',
    role: 'player'
  });
  const [error, setError] = useState('');

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate(user.role === 'player' ? '/home/player' : '/home/organizer');
    }
  }, [user, navigate]);

  const validateForm = () => {
    if (!formData.nome || !formData.cognome || !formData.email || !formData.password) {
      return 'Tutti i campi obbligatori devono essere compilati';
    }

    if (formData.password !== formData.confirmPassword) {
      return 'Le password non coincidono';
    }

    if (formData.password.length < 6) {
      return 'La password deve essere di almeno 6 caratteri';
    }

    if (!formData.email.includes('@')) {
      return 'Inserisci un indirizzo email valido';
    }

    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      await register({
        nome: formData.nome,
        cognome: formData.cognome,
        numero_documento: formData.numero_documento,
        data_nascita: formData.data_nascita,
        email: formData.email,
        telefono: formData.telefono,
        role: formData.role,
        password: formData.password
      });
      // Redirect is handled automatically in AuthContext
    } catch (error: any) {
      setError(error.message || 'Errore durante la registrazione');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header with back button and logo */}
        <div className="flex items-center justify-between mb-6">
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-green-600 hover:text-green-700"
            disabled={loading}
          >
            <ArrowLeft className="h-4 w-4" />
            Torna alla Home
          </Button>
          <Logo size="sm" variant="icon" />
        </div>

        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">Registrati su FutsApp</CardTitle>
            <CardDescription>
              Crea il tuo account per iniziare
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="nome" className="block text-sm font-medium text-gray-700 mb-1">
                    Nome *
                  </label>
                  <input
                    type="text"
                    id="nome"
                    name="nome"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    value={formData.nome}
                    onChange={handleChange}
                    disabled={loading}
                  />
                </div>
                <div>
                  <label htmlFor="cognome" className="block text-sm font-medium text-gray-700 mb-1">
                    Cognome *
                  </label>
                  <input
                    type="text"
                    id="cognome"
                    name="cognome"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    value={formData.cognome}
                    onChange={handleChange}
                    disabled={loading}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="numero_documento" className="block text-sm font-medium text-gray-700 mb-1">
                  Codice Fiscale *
                </label>
                <input
                  type="text"
                  id="numero_documento"
                  name="numero_documento"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  value={formData.numero_documento}
                  onChange={handleChange}
                  disabled={loading}
                />
              </div>

              <div>
                <label htmlFor="data_nascita" className="block text-sm font-medium text-gray-700 mb-1">
                  Data di Nascita *
                </label>
                <input
                  type="date"
                  id="data_nascita"
                  name="data_nascita"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  value={formData.data_nascita}
                  onChange={handleChange}
                  disabled={loading}
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={loading}
                />
              </div>

              <div>
                <label htmlFor="telefono" className="block text-sm font-medium text-gray-700 mb-1">
                  Telefono *
                </label>
                <input
                  type="tel"
                  id="telefono"
                  name="telefono"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  value={formData.telefono}
                  onChange={handleChange}
                  disabled={loading}
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password *
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  required
                  minLength={6}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  value={formData.password}
                  onChange={handleChange}
                  disabled={loading}
                />
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                  Conferma Password *
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  required
                  minLength={6}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  disabled={loading}
                />
              </div>

              <div>
                <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
                  Ruolo *
                </label>
                <select
                  id="role"
                  name="role"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  value={formData.role}
                  onChange={handleChange}
                  disabled={loading}
                >
                  <option value="player">Giocatore</option>
                  <option value="organizer">Organizzatore</option>
                </select>
              </div>

              <Button 
                type="submit" 
                className="w-full"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Registrazione in corso...
                  </>
                ) : (
                  'Registrati'
                )}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Hai già un account?{' '}
                <button
                  onClick={() => navigate('/login')}
                  className="text-green-600 hover:text-green-500 font-medium"
                  disabled={loading}
                >
                  Accedi
                </button>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RegisterPage;
