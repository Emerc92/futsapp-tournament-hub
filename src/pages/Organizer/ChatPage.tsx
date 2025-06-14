
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Send, Users, Search, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Tournament {
  TOUR_UUID: string;
  TOUR_NAME: string;
  TOUR_CITY: string;
}

interface Captain {
  id: string;
  name: string;
  team: string;
  tournament: string;
  lastMessage?: string;
  lastMessageTime?: string;
  unreadCount: number;
  avatar?: string;
}

interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: string;
  isFromOrganizer: boolean;
}

const ChatPage: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [selectedTournament, setSelectedTournament] = useState<string>('');
  const [captains, setCaptains] = useState<Captain[]>([]);
  const [selectedCaptain, setSelectedCaptain] = useState<Captain | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (user) {
      fetchTournaments();
    }
  }, [user]);

  useEffect(() => {
    if (selectedTournament) {
      fetchCaptains();
    }
  }, [selectedTournament]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const fetchTournaments = async () => {
    try {
      const { data, error } = await supabase
        .from('FUTATOUR')
        .select('TOUR_UUID, TOUR_NAME, TOUR_CITY')
        .eq('TOUR_ORGS_UUID', user?.id)
        .eq('TOUR_STAT', 'open');

      if (error) {
        console.error('Error fetching tournaments:', error);
      } else {
        setTournaments(data || []);
        if (data && data.length > 0) {
          setSelectedTournament(data[0].TOUR_UUID);
        }
      }
    } catch (error) {
      console.error('Error fetching tournaments:', error);
    }
  };

  const fetchCaptains = async () => {
    // Mock data per ora - qui dovresti implementare la logica per recuperare i capitani iscritti al torneo
    const mockCaptains: Captain[] = [
      {
        id: '1',
        name: 'Marco Rossi',
        team: 'Squadra Alfa',
        tournament: selectedTournament,
        lastMessage: 'Quando iniziano gli allenamenti?',
        lastMessageTime: '10:30',
        unreadCount: 2,
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150'
      },
      {
        id: '2',
        name: 'Luca Verdi',
        team: 'Team Beta',
        tournament: selectedTournament,
        lastMessage: 'Perfetto, grazie per le info!',
        lastMessageTime: '09:15',
        unreadCount: 0,
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150'
      },
      {
        id: '3',
        name: 'Andrea Blu',
        team: 'Gli Invincibili',
        tournament: selectedTournament,
        lastMessage: 'Possiamo cambiare orario partita?',
        lastMessageTime: 'Ieri',
        unreadCount: 1,
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150'
      }
    ];
    setCaptains(mockCaptains);
  };

  const loadMessages = (captain: Captain) => {
    // Mock messages - qui dovresti implementare la logica per recuperare i messaggi dal database
    const mockMessages: Message[] = [
      {
        id: '1',
        sender: captain.name,
        content: 'Ciao! Ho una domanda sul torneo.',
        timestamp: '09:00',
        isFromOrganizer: false
      },
      {
        id: '2',
        sender: 'Tu',
        content: 'Certo, dimmi pure!',
        timestamp: '09:05',
        isFromOrganizer: true
      },
      {
        id: '3',
        sender: captain.name,
        content: captain.lastMessage || 'Quando iniziano gli allenamenti?',
        timestamp: captain.lastMessageTime || '10:30',
        isFromOrganizer: false
      }
    ];
    setMessages(mockMessages);
  };

  const handleCaptainSelect = (captain: Captain) => {
    setSelectedCaptain(captain);
    loadMessages(captain);
    
    // Azzera il contatore dei messaggi non letti
    setCaptains(prev => 
      prev.map(c => 
        c.id === captain.id 
          ? { ...c, unreadCount: 0 }
          : c
      )
    );
  };

  const sendMessage = () => {
    if (!newMessage.trim() || !selectedCaptain) return;

    const message: Message = {
      id: Date.now().toString(),
      sender: 'Tu',
      content: newMessage.trim(),
      timestamp: new Date().toLocaleTimeString('it-IT', { 
        hour: '2-digit', 
        minute: '2-digit' 
      }),
      isFromOrganizer: true
    };

    setMessages(prev => [...prev, message]);
    setNewMessage('');

    // Qui dovresti implementare l'invio del messaggio al database
    toast({
      title: "Messaggio inviato",
      description: `Messaggio inviato a ${selectedCaptain.name}`,
    });
  };

  const filteredCaptains = captains.filter(captain =>
    captain.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    captain.team.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <div className="p-4 flex items-center space-x-4">
          <Link to="/home/organizer">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <div className="flex-1">
            <h1 className="text-xl font-bold">Chat con i Capitani</h1>
            <p className="text-green-100">Comunica con i capitani delle squadre</p>
          </div>
          <MessageCircle className="w-6 h-6" />
        </div>
      </div>

      <div className="flex h-[calc(100vh-120px)]">
        {/* Sidebar - Lista Capitani */}
        <div className="w-1/3 bg-white border-r border-gray-200 flex flex-col">
          {/* Tournament Selector */}
          <div className="p-4 border-b border-gray-200">
            <select
              value={selectedTournament}
              onChange={(e) => setSelectedTournament(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Seleziona Torneo</option>
              {tournaments.map((tournament) => (
                <option key={tournament.TOUR_UUID} value={tournament.TOUR_UUID}>
                  {tournament.TOUR_NAME} - {tournament.TOUR_CITY}
                </option>
              ))}
            </select>
          </div>

          {/* Search */}
          <div className="p-4 border-b border-gray-200">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                type="text"
                placeholder="Cerca capitano o squadra..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Captains List */}
          <div className="flex-1 overflow-y-auto">
            {filteredCaptains.length === 0 ? (
              <div className="p-4 text-center text-gray-500">
                <Users className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                <p>Nessun capitano trovato</p>
              </div>
            ) : (
              filteredCaptains.map((captain) => (
                <motion.div
                  key={captain.id}
                  whileHover={{ backgroundColor: '#f3f4f6' }}
                  className={`p-4 border-b border-gray-100 cursor-pointer ${
                    selectedCaptain?.id === captain.id ? 'bg-blue-50 border-blue-200' : ''
                  }`}
                  onClick={() => handleCaptainSelect(captain)}
                >
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <img
                        src={captain.avatar || `https://ui-avatars.com/api/?name=${captain.name}&background=random`}
                        alt={captain.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      {captain.unreadCount > 0 && (
                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                          {captain.unreadCount}
                        </span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center">
                        <h4 className="font-medium text-gray-900 truncate">{captain.name}</h4>
                        <span className="text-xs text-gray-500">{captain.lastMessageTime}</span>
                      </div>
                      <p className="text-sm text-gray-600 truncate">{captain.team}</p>
                      {captain.lastMessage && (
                        <p className="text-xs text-gray-500 truncate mt-1">{captain.lastMessage}</p>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {selectedCaptain ? (
            <>
              {/* Chat Header */}
              <div className="bg-white border-b border-gray-200 p-4">
                <div className="flex items-center space-x-3">
                  <img
                    src={selectedCaptain.avatar || `https://ui-avatars.com/api/?name=${selectedCaptain.name}&background=random`}
                    alt={selectedCaptain.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-medium text-gray-900">{selectedCaptain.name}</h3>
                    <p className="text-sm text-gray-600">{selectedCaptain.team}</p>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${message.isFromOrganizer ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        message.isFromOrganizer
                          ? 'bg-blue-600 text-white'
                          : 'bg-white text-gray-900 border border-gray-200'
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                      <p className={`text-xs mt-1 ${
                        message.isFromOrganizer ? 'text-blue-100' : 'text-gray-500'
                      }`}>
                        {message.timestamp}
                      </p>
                    </div>
                  </motion.div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Message Input */}
              <div className="bg-white border-t border-gray-200 p-4">
                <div className="flex space-x-2">
                  <Input
                    type="text"
                    placeholder="Scrivi un messaggio..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                    className="flex-1"
                  />
                  <Button onClick={sendMessage} disabled={!newMessage.trim()}>
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center bg-gray-50">
              <div className="text-center">
                <MessageCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Seleziona un capitano
                </h3>
                <p className="text-gray-600">
                  Scegli un capitano dalla lista per iniziare a chattare
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
