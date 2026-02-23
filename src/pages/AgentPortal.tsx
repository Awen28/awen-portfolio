import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  Search, 
  User, 
  Mail, 
  Phone, 
  LogOut, 
  Car, 
  Home, 
  AlertTriangle, 
  FileText, 
  Image as ImageIcon,
  ChevronRight,
  X,
  Download
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged, type User as FirebaseUser } from 'firebase/auth';
import { getDatabase, ref, get } from 'firebase/database';
import { SEO } from '../components/SEO';

// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyAU6UYtuuhdpCjo6JxncwjX7iAnruB-dEA",
  authDomain: "insurancehelp-ea254.firebaseapp.com",
  databaseURL: "https://insurancehelp-ea254-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "insurancehelp-ea254",
  storageBucket: "insurancehelp-ea254.appspot.com",
  messagingSenderId: "943116013085",
  appId: "G-8MZY96YFTZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

// Types
interface Client {
  uid: string;
  name: string;
}

interface ClientData {
  name?: string;
  phoneNumber?: string;
  email?: string;
}

// Helper function to parse date from damage ID (format: DD-MM-YYYY)
const parseDamageDate = (damageId: string): Date | null => {
  // Match format: DD-MM-YYYY or D-MM-YYYY or DD-M-YYYY etc.
  const match = damageId.match(/(\d{1,2})-(\d{1,2})-(\d{4})/);
  if (match) {
    const [, day, month, year] = match;
    return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
  }
  return null;
};

// Helper function to sort damage IDs by date (newest first)
const sortDamagesByDate = (damageIds: string[]): string[] => {
  return [...damageIds].sort((a, b) => {
    const dateA = parseDamageDate(a);
    const dateB = parseDamageDate(b);
    
    // If both have dates, sort by date (newest first)
    if (dateA && dateB) {
      return dateB.getTime() - dateA.getTime();
    }
    
    // If only one has a date, put the dated one first
    if (dateA) return -1;
    if (dateB) return 1;
    
    // If neither has a date, keep original order
    return 0;
  });
};

const AgentPortal = () => {
  
  // Auth State
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  
  // Data State
  const [, setCurrentAgentCode] = useState<string | null>(null);
  const [clients, setClients] = useState<Client[]>([]);
  const [filteredClients, setFilteredClients] = useState<Client[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentClient, setCurrentClient] = useState<Client | null>(null);
  const [currentClientData, setCurrentClientData] = useState<ClientData | null>(null);
  
  // Navigation State
  const [currentView, setCurrentView] = useState<'login' | 'clients' | 'profile' | 'kfz' | 'household' | 'accidents' | 'fire' | 'water' | 'burglary' | 'glas' | 'natural' | 'liability'>('login');
  
  // Damage Data
  const [kfzDamages, setKfzDamages] = useState<string[]>([]);
  const [accidents, setAccidents] = useState<string[]>([]);
  const [fireDamages, setFireDamages] = useState<string[]>([]);
  const [waterDamages, setWaterDamages] = useState<string[]>([]);
  const [burglaryDamages, setBurglaryDamages] = useState<string[]>([]);
  const [glasDamages, setGlasDamages] = useState<string[]>([]);
  const [naturalDamages, setNaturalDamages] = useState<string[]>([]);
  const [liabilityDamages, setLiabilityDamages] = useState<string[]>([]);
  
  // Modal State
  const [showModal, setShowModal] = useState(false);
  const [currentDamageId, setCurrentDamageId] = useState<string | null>(null);
  const [currentDamageType, setCurrentDamageType] = useState<string | null>(null);
  const [currentHouseholdType, setCurrentHouseholdType] = useState<string | null>(null);

  // Check auth state on mount
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        const uid = user.uid;
        const agentRef = ref(database, `AgentProfile/${uid}/agentID`);
        try {
          const snapshot = await get(agentRef);
          const agentCode = snapshot.val();
          setCurrentAgentCode(agentCode);
          await loadClients(agentCode);
          setCurrentView('clients');
        } catch (error) {
          console.error('Fehler beim Abrufen des AgentCodes:', error);
        }
      } else {
        setUser(null);
        setCurrentView('login');
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Filter clients when search query changes
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredClients(clients);
    } else {
      const filtered = clients.filter(client => 
        client.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredClients(filtered);
    }
  }, [searchQuery, clients]);

  const loadClients = async (agentCode: string) => {
    const clientsRef = ref(database, `clientsForAgent/${agentCode}`);
    try {
      const snapshot = await get(clientsRef);
      const clientsArray: Client[] = [];

      if (snapshot.exists()) {
        const promises: Promise<void>[] = [];
        snapshot.forEach((childSnapshot) => {
          const clientUID = childSnapshot.key;
          const clientDataRef = ref(database, `clientsForAgent/${agentCode}/${clientUID}`);
          const promise = get(clientDataRef).then((clientDataSnapshot) => {
            const clientData = clientDataSnapshot.val();
            if (clientData && clientData.name) {
              clientsArray.push({ uid: clientUID!, name: clientData.name });
            }
          });
          promises.push(promise);
        });
        await Promise.all(promises);
      }

      clientsArray.sort((a, b) => a.name.localeCompare(b.name));
      setClients(clientsArray);
      setFilteredClients(clientsArray);
    } catch (error) {
      console.error('Fehler beim Abrufen der Kunden:', error);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    try {
      await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
    } catch (error: any) {
      console.error('Fehler beim Anmelden:', error);
      setLoginError('Ungültige E-Mail oder Passwort');
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setClients([]);
      setFilteredClients([]);
      setCurrentClient(null);
      setCurrentClientData(null);
    } catch (error) {
      console.error('Fehler beim Logout:', error);
    }
  };

  const showClientProfile = async (client: Client) => {
    setCurrentClient(client);
    const clientRef = ref(database, `Users/${client.uid}`);
    try {
      const snapshot = await get(clientRef);
      const data = snapshot.val();
      setCurrentClientData({
        name: data?.name || client.name,
        phoneNumber: data?.phoneNumber || 'Nicht verfügbar',
        email: data?.email || 'Nicht verfügbar'
      });
      setCurrentView('profile');
    } catch (error) {
      console.error('Fehler beim Abrufen der Kundendaten:', error);
    }
  };

  const loadKfzDamages = async () => {
    if (!currentClient) return;
    const kfzRef = ref(database, `Users/${currentClient.uid}/kfzSchäden`);
    try {
      const snapshot = await get(kfzRef);
      const damages: string[] = [];
      if (snapshot.exists()) {
        snapshot.forEach((child) => {
          damages.push(child.key!);
        });
      }
      setKfzDamages(sortDamagesByDate(damages));
      setCurrentView('kfz');
    } catch (error) {
      console.error('Fehler beim Abrufen der KFZ-Schäden:', error);
    }
  };

  const loadAccidents = async () => {
    if (!currentClient) return;
    const accidentsRef = ref(database, `Users/${currentClient.uid}/unfall`);
    try {
      const snapshot = await get(accidentsRef);
      const items: string[] = [];
      if (snapshot.exists()) {
        snapshot.forEach((child) => {
          items.push(child.key!);
        });
      }
      setAccidents(sortDamagesByDate(items));
      setCurrentView('accidents');
    } catch (error) {
      console.error('Fehler beim Abrufen der Unfälle:', error);
    }
  };

  const loadFireDamages = async () => {
    if (!currentClient) return;
    const fireRef = ref(database, `Users/${currentClient.uid}/hausHaltSchaden/feuer`);
    try {
      const snapshot = await get(fireRef);
      const damages: string[] = [];
      if (snapshot.exists()) {
        snapshot.forEach((child) => {
          damages.push(child.key!);
        });
      }
      setFireDamages(sortDamagesByDate(damages));
      setCurrentView('fire');
    } catch (error) {
      console.error('Fehler beim Abrufen der Feuer-Schäden:', error);
    }
  };

  const loadWaterDamages = async () => {
    if (!currentClient) return;
    const waterRef = ref(database, `Users/${currentClient.uid}/hausHaltSchaden/leitungswasser`);
    try {
      const snapshot = await get(waterRef);
      const damages: string[] = [];
      if (snapshot.exists()) {
        snapshot.forEach((child) => {
          damages.push(child.key!);
        });
      }
      setWaterDamages(sortDamagesByDate(damages));
      setCurrentView('water');
    } catch (error) {
      console.error('Fehler beim Abrufen der Wasser-Schäden:', error);
    }
  };

  const loadBurglaryDamages = async () => {
    if (!currentClient) return;
    const burglaryRef = ref(database, `Users/${currentClient.uid}/hausHaltSchaden/einbruch`);
    try {
      const snapshot = await get(burglaryRef);
      const damages: string[] = [];
      if (snapshot.exists()) {
        snapshot.forEach((child) => {
          damages.push(child.key!);
        });
      }
      setBurglaryDamages(sortDamagesByDate(damages));
      setCurrentView('burglary');
    } catch (error) {
      console.error('Fehler beim Abrufen der Einbruch-Schäden:', error);
    }
  };

  const loadGlasDamages = async () => {
    if (!currentClient) return;
    const glasRef = ref(database, `Users/${currentClient.uid}/hausHaltSchaden/glas`);
    try {
      const snapshot = await get(glasRef);
      const damages: string[] = [];
      if (snapshot.exists()) {
        snapshot.forEach((child) => {
          damages.push(child.key!);
        });
      }
      setGlasDamages(sortDamagesByDate(damages));
      setCurrentView('glas');
    } catch (error) {
      console.error('Fehler beim Abrufen der Glas-Schäden:', error);
    }
  };

  const loadNaturalDamages = async () => {
    if (!currentClient) return;
    const naturalRef = ref(database, `Users/${currentClient.uid}/hausHaltSchaden/naturgewalt`);
    try {
      const snapshot = await get(naturalRef);
      const damages: string[] = [];
      if (snapshot.exists()) {
        snapshot.forEach((child) => {
          damages.push(child.key!);
        });
      }
      setNaturalDamages(sortDamagesByDate(damages));
      setCurrentView('natural');
    } catch (error) {
      console.error('Fehler beim Abrufen der Naturgewalt-Schäden:', error);
    }
  };

  const loadLiabilityDamages = async () => {
    if (!currentClient) return;
    const liabilityRef = ref(database, `Users/${currentClient.uid}/hausHaltSchaden/haftpflicht`);
    try {
      const snapshot = await get(liabilityRef);
      const damages: string[] = [];
      if (snapshot.exists()) {
        snapshot.forEach((child) => {
          damages.push(child.key!);
        });
      }
      setLiabilityDamages(sortDamagesByDate(damages));
      setCurrentView('liability');
    } catch (error) {
      console.error('Fehler beim Abrufen der Haftpflicht-Schäden:', error);
    }
  };

  const openDamageModal = (damageId: string, type: string, householdType?: string) => {
    setCurrentDamageId(damageId);
    setCurrentDamageType(type);
    if (householdType) setCurrentHouseholdType(householdType);
    setShowModal(true);
  };

  const viewReport = async () => {
    if (!currentClient || !currentDamageId) return;
    let damageRef;
    if (currentHouseholdType) {
      damageRef = ref(database, `Users/${currentClient.uid}/hausHaltSchaden/${currentHouseholdType}/${currentDamageId}/schadenmeldung`);
    } else {
      damageRef = ref(database, `Users/${currentClient.uid}/${currentDamageType}/${currentDamageId}/schadenmeldung`);
    }
    try {
      const snapshot = await get(damageRef);
      const pdfUrl = snapshot.val();
      if (pdfUrl) {
        window.open(pdfUrl, '_blank');
      } else {
        alert('Kein Bericht vorhanden.');
      }
    } catch (error) {
      console.error('Fehler beim Abrufen des PDF-Berichts:', error);
    }
    setShowModal(false);
  };

  const downloadPhotos = async () => {
    if (!currentClient || !currentDamageId) return;
    let damageRef;
    if (currentHouseholdType) {
      damageRef = ref(database, `Users/${currentClient.uid}/hausHaltSchaden/${currentHouseholdType}/${currentDamageId}/fotos`);
    } else {
      damageRef = ref(database, `Users/${currentClient.uid}/${currentDamageType}/${currentDamageId}/fotos`);
    }
    try {
      const snapshot = await get(damageRef);
      const zipUrl = snapshot.val();
      if (zipUrl) {
        window.location.href = zipUrl;
      } else {
        alert('Keine Fotos vorhanden.');
      }
    } catch (error) {
      console.error('Fehler beim Abrufen der Fotos:', error);
    }
    setShowModal(false);
  };

  // Loading State
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)' }}>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 rounded-full"
          style={{ borderColor: 'rgba(178, 159, 134, 0.3)', borderTopColor: '#B29F86' }}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)' }}>
      <SEO 
        title="Agent Portal | Suremate Pro"
        description="Suremate Pro Agent Portal - Verwalten Sie Ihre Kunden und Schadensfälle"


      />

      {/* Header */}
      <header className="py-6 px-6 md:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link 
            to="/suremate-pro"
            className="flex items-center gap-2 text-white/70 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm">Zurück zu Suremate Pro</span>
          </Link>
          
          {user && (
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all hover:scale-105"
              style={{ 
                background: 'rgba(255, 255, 255, 0.1)',
                color: 'white',
                border: '1px solid rgba(255, 255, 255, 0.2)'
              }}
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="px-6 md:px-8 pb-20">
        <div className="max-w-4xl mx-auto">
          
          {/* Login View */}
          <AnimatePresence mode="wait">
            {currentView === 'login' && (
              <motion.div
                key="login"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="max-w-md mx-auto mt-20"
              >
                <div 
                  className="p-8 md:p-10 rounded-[30px]"
                  style={{ 
                    background: '#1c1c1c',
                    boxShadow: '0 25px 50px rgba(0, 0, 0, 0.3)'
                  }}
                >
                  <div className="text-center mb-8">
                    <div 
                      className="w-16 h-16 rounded-2xl mx-auto mb-6 flex items-center justify-center"
                      style={{ background: 'linear-gradient(135deg, #B29F86, #E9CFB9)' }}
                    >
                      <User className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="font-serif text-3xl text-white mb-2">Agent Login</h1>
                    <p className="text-white/60">Melden Sie sich an, um Kunden zu verwalten</p>
                  </div>

                  <form onSubmit={handleLogin} className="space-y-5">
                    <div>
                      <input
                        type="email"
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                        placeholder="E-Mail"
                        required
                        className="w-full px-5 py-4 rounded-xl text-white placeholder-white/40 outline-none transition-all"
                        style={{ 
                          background: 'rgba(255, 255, 255, 0.1)',
                          border: '1px solid rgba(255, 255, 255, 0.1)'
                        }}
                      />
                    </div>
                    <div>
                      <input
                        type="password"
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        placeholder="Passwort"
                        required
                        className="w-full px-5 py-4 rounded-xl text-white placeholder-white/40 outline-none transition-all"
                        style={{ 
                          background: 'rgba(255, 255, 255, 0.1)',
                          border: '1px solid rgba(255, 255, 255, 0.1)'
                        }}
                      />
                    </div>
                    
                    {loginError && (
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="p-4 rounded-xl text-sm"
                        style={{ background: 'rgba(239, 68, 68, 0.2)', color: '#fca5a5' }}
                      >
                        {loginError}
                      </motion.div>
                    )}

                    <button
                      type="submit"
                      className="w-full py-4 rounded-xl font-medium text-white transition-all hover:scale-[1.02]"
                      style={{ background: 'linear-gradient(135deg, #B29F86, #E9CFB9)' }}
                    >
                      Anmelden
                    </button>
                  </form>
                </div>
              </motion.div>
            )}

            {/* Clients List View */}
            {currentView === 'clients' && (
              <motion.div
                key="clients"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <div className="text-center mb-10">
                  <h1 className="font-serif text-4xl text-white mb-3">Kundenübersicht</h1>
                  <p className="text-white/60">Wählen Sie einen Kunden aus, um Details anzuzeigen</p>
                </div>

                {/* Search */}
                <div className="relative mb-8">
                  <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Kunden suchen..."
                    className="w-full pl-14 pr-5 py-4 rounded-xl text-white placeholder-white/40 outline-none transition-all"
                    style={{ 
                      background: 'rgba(255, 255, 255, 0.1)',
                      border: '1px solid rgba(255, 255, 255, 0.1)'
                    }}
                  />
                </div>

                {/* Clients List */}
                <div className="space-y-3">
                  {filteredClients.length === 0 ? (
                    <div className="text-center py-12 text-white/50">
                      <User className="w-12 h-12 mx-auto mb-4 opacity-30" />
                      <p>Keine Kunden gefunden</p>
                    </div>
                  ) : (
                    filteredClients.map((client, index) => (
                      <motion.div
                        key={client.uid}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        onClick={() => showClientProfile(client)}
                        className="p-5 rounded-2xl cursor-pointer transition-all hover:scale-[1.02] flex items-center justify-between group"
                        style={{ 
                          background: 'rgba(255, 255, 255, 0.1)',
                          border: '1px solid rgba(255, 255, 255, 0.1)'
                        }}
                      >
                        <div className="flex items-center gap-4">
                          <div 
                            className="w-12 h-12 rounded-xl flex items-center justify-center"
                            style={{ background: 'linear-gradient(135deg, #B29F86, #E9CFB9)' }}
                          >
                            <User className="w-6 h-6 text-white" />
                          </div>
                          <span className="text-white text-lg font-medium">{client.name}</span>
                        </div>
                        <ChevronRight className="w-5 h-5 text-white/40 group-hover:text-white transition-colors" />
                      </motion.div>
                    ))
                  )}
                </div>
              </motion.div>
            )}

            {/* Client Profile View */}
            {currentView === 'profile' && currentClient && currentClientData && (
              <motion.div
                key="profile"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <button
                  onClick={() => setCurrentView('clients')}
                  className="flex items-center gap-2 text-white/60 hover:text-white mb-6 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Zurück zur Übersicht
                </button>

                <div 
                  className="p-8 rounded-[30px] mb-6"
                  style={{ 
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)'
                  }}
                >
                  <div className="flex items-center gap-6 mb-8">
                    <div 
                      className="w-20 h-20 rounded-2xl flex items-center justify-center"
                      style={{ background: 'linear-gradient(135deg, #B29F86, #E9CFB9)' }}
                    >
                      <User className="w-10 h-10 text-white" />
                    </div>
                    <div>
                      <h1 className="font-serif text-3xl text-white mb-1">{currentClientData.name}</h1>
                      <p className="text-white/50">Kundenprofil</p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div 
                      className="p-5 rounded-2xl flex items-center gap-4"
                      style={{ background: 'rgba(255, 255, 255, 0.05)' }}
                    >
                      <Mail className="w-5 h-5 text-[#B29F86]" />
                      <div>
                        <p className="text-white/50 text-sm mb-1">E-Mail</p>
                        <p className="text-white">{currentClientData.email}</p>
                      </div>
                    </div>
                    <div 
                      className="p-5 rounded-2xl flex items-center gap-4"
                      style={{ background: 'rgba(255, 255, 255, 0.05)' }}
                    >
                      <Phone className="w-5 h-5 text-[#B29F86]" />
                      <div>
                        <p className="text-white/50 text-sm mb-1">Telefon</p>
                        <p className="text-white">{currentClientData.phoneNumber}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <h2 className="text-xl text-white mb-4 font-medium">Schadensfälle</h2>
                <div className="grid md:grid-cols-3 gap-4">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    onClick={loadKfzDamages}
                    className="p-6 rounded-2xl cursor-pointer transition-all"
                    style={{ 
                      background: 'linear-gradient(135deg, rgba(178, 159, 134, 0.3), rgba(233, 207, 185, 0.1))',
                      border: '1px solid rgba(178, 159, 134, 0.3)'
                    }}
                  >
                    <Car className="w-8 h-8 text-[#B29F86] mb-4" />
                    <h3 className="text-white font-medium mb-1">KFZ-Schäden</h3>
                    <p className="text-white/50 text-sm">Fahrzeugschäden anzeigen</p>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    onClick={() => setCurrentView('household')}
                    className="p-6 rounded-2xl cursor-pointer transition-all"
                    style={{ 
                      background: 'linear-gradient(135deg, rgba(178, 159, 134, 0.3), rgba(233, 207, 185, 0.1))',
                      border: '1px solid rgba(178, 159, 134, 0.3)'
                    }}
                  >
                    <Home className="w-8 h-8 text-[#B29F86] mb-4" />
                    <h3 className="text-white font-medium mb-1">Haushalt-Schäden</h3>
                    <p className="text-white/50 text-sm">Hausrat & Gebäude</p>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    onClick={loadAccidents}
                    className="p-6 rounded-2xl cursor-pointer transition-all"
                    style={{ 
                      background: 'linear-gradient(135deg, rgba(178, 159, 134, 0.3), rgba(233, 207, 185, 0.1))',
                      border: '1px solid rgba(178, 159, 134, 0.3)'
                    }}
                  >
                    <AlertTriangle className="w-8 h-8 text-[#B29F86] mb-4" />
                    <h3 className="text-white font-medium mb-1">Unfälle</h3>
                    <p className="text-white/50 text-sm">Unfallberichte</p>
                  </motion.div>
                </div>
              </motion.div>
            )}

            {/* Household Damages View */}
            {currentView === 'household' && (
              <motion.div
                key="household"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <button
                  onClick={() => setCurrentView('profile')}
                  className="flex items-center gap-2 text-white/60 hover:text-white mb-6 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Zurück zum Profil
                </button>

                <h1 className="font-serif text-3xl text-white mb-8">Haushalt-Schäden</h1>

                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    { id: 'fire', name: 'Feuer', icon: '🔥' },
                    { id: 'water', name: 'Leitungswasser', icon: '💧' },
                    { id: 'burglary', name: 'Einbruch/Diebstahl', icon: '🚨' },
                    { id: 'glas', name: 'Glasbruch', icon: '🪟' },
                    { id: 'natural', name: 'Naturgewalt', icon: '🌪️' },
                    { id: 'liability', name: 'Haftpflicht', icon: '⚖️' },
                  ].map((item) => (
                    <motion.div
                      key={item.id}
                      whileHover={{ scale: 1.02 }}
                      onClick={() => {
                        if (item.id === 'fire') loadFireDamages();
                        else if (item.id === 'water') loadWaterDamages();
                        else if (item.id === 'burglary') loadBurglaryDamages();
                        else if (item.id === 'glas') loadGlasDamages();
                        else if (item.id === 'natural') loadNaturalDamages();
                        else if (item.id === 'liability') loadLiabilityDamages();
                      }}
                      className="p-6 rounded-2xl cursor-pointer transition-all flex items-center gap-4"
                      style={{ 
                        background: 'rgba(255, 255, 255, 0.1)',
                        border: '1px solid rgba(255, 255, 255, 0.1)'
                      }}
                    >
                      <span className="text-3xl">{item.icon}</span>
                      <span className="text-white text-lg">{item.name}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Damages List Views */}
            {(currentView === 'kfz' || currentView === 'accidents' || currentView === 'fire' || 
              currentView === 'water' || currentView === 'burglary' || currentView === 'glas' || 
              currentView === 'natural' || currentView === 'liability') && (
              <motion.div
                key={currentView}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <button
                  onClick={() => currentView === 'kfz' || currentView === 'accidents' ? setCurrentView('profile') : setCurrentView('household')}
                  className="flex items-center gap-2 text-white/60 hover:text-white mb-6 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Zurück
                </button>

                <h1 className="font-serif text-3xl text-white mb-8">
                  {currentView === 'kfz' && 'KFZ-Schäden'}
                  {currentView === 'accidents' && 'Unfälle'}
                  {currentView === 'fire' && 'Feuer-Schäden'}
                  {currentView === 'water' && 'Leitungswasser-Schäden'}
                  {currentView === 'burglary' && 'Einbruch/Diebstahl'}
                  {currentView === 'glas' && 'Glasbruch'}
                  {currentView === 'natural' && 'Naturgewalt'}
                  {currentView === 'liability' && 'Haftpflicht-Schäden'}
                </h1>

                <div className="space-y-3">
                  {(() => {
                    let damages: string[] = [];
                    let type = '';
                    let householdType = '';
                    
                    switch (currentView) {
                      case 'kfz':
                        damages = kfzDamages;
                        type = 'kfzSchäden';
                        break;
                      case 'accidents':
                        damages = accidents;
                        type = 'unfall';
                        break;
                      case 'fire':
                        damages = fireDamages;
                        type = 'hausHaltSchaden';
                        householdType = 'feuer';
                        break;
                      case 'water':
                        damages = waterDamages;
                        type = 'hausHaltSchaden';
                        householdType = 'leitungswasser';
                        break;
                      case 'burglary':
                        damages = burglaryDamages;
                        type = 'hausHaltSchaden';
                        householdType = 'einbruch';
                        break;
                      case 'glas':
                        damages = glasDamages;
                        type = 'hausHaltSchaden';
                        householdType = 'glas';
                        break;
                      case 'natural':
                        damages = naturalDamages;
                        type = 'hausHaltSchaden';
                        householdType = 'naturgewalt';
                        break;
                      case 'liability':
                        damages = liabilityDamages;
                        type = 'hausHaltSchaden';
                        householdType = 'haftpflicht';
                        break;
                    }

                    if (damages.length === 0) {
                      return (
                        <div className="text-center py-12 text-white/50">
                          <FileText className="w-12 h-12 mx-auto mb-4 opacity-30" />
                          <p>Keine Schäden vorhanden</p>
                        </div>
                      );
                    }

                    return damages.map((damageId, index) => (
                      <motion.div
                        key={damageId}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        onClick={() => openDamageModal(damageId, type, householdType || undefined)}
                        className="p-5 rounded-2xl cursor-pointer transition-all hover:scale-[1.02] flex items-center justify-between group"
                        style={{ 
                          background: 'rgba(255, 255, 255, 0.1)',
                          border: '1px solid rgba(255, 255, 255, 0.1)'
                        }}
                      >
                        <div className="flex items-center gap-4">
                          <div 
                            className="w-12 h-12 rounded-xl flex items-center justify-center"
                            style={{ background: 'rgba(178, 159, 134, 0.3)' }}
                          >
                            <FileText className="w-6 h-6 text-[#B29F86]" />
                          </div>
                          <span className="text-white text-lg font-medium">Schaden ID: {damageId}</span>
                        </div>
                        <ChevronRight className="w-5 h-5 text-white/40 group-hover:text-white transition-colors" />
                      </motion.div>
                    ));
                  })()}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* Damage Options Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: 'rgba(0, 0, 0, 0.8)' }}
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md p-8 rounded-[30px]"
              style={{ 
                background: '#1c1c1c',
                boxShadow: '0 25px 50px rgba(0, 0, 0, 0.5)'
              }}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl text-white font-medium">Schaden ID: {currentDamageId}</h2>
                <button 
                  onClick={() => setShowModal(false)}
                  className="p-2 rounded-full hover:bg-white/10 transition-colors"
                >
                  <X className="w-5 h-5 text-white/60" />
                </button>
              </div>

              <div className="space-y-3">
                <button
                  onClick={viewReport}
                  className="w-full p-5 rounded-2xl flex items-center gap-4 transition-all hover:scale-[1.02] group"
                  style={{ background: 'rgba(178, 159, 134, 0.2)', border: '1px solid rgba(178, 159, 134, 0.3)' }}
                >
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ background: 'linear-gradient(135deg, #B29F86, #E9CFB9)' }}
                  >
                    <FileText className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="text-white font-medium">Unfallbericht anzeigen</p>
                    <p className="text-white/50 text-sm">PDF öffnen</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-white/40 group-hover:text-white" />
                </button>

                <button
                  onClick={downloadPhotos}
                  className="w-full p-5 rounded-2xl flex items-center gap-4 transition-all hover:scale-[1.02] group"
                  style={{ background: 'rgba(255, 255, 255, 0.1)', border: '1px solid rgba(255, 255, 255, 0.1)' }}
                >
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ background: 'rgba(255, 255, 255, 0.1)' }}
                  >
                    <ImageIcon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="text-white font-medium">Fotos anzeigen</p>
                    <p className="text-white/50 text-sm">ZIP herunterladen</p>
                  </div>
                  <Download className="w-5 h-5 text-white/40 group-hover:text-white" />
                </button>

                <button
                  onClick={() => setShowModal(false)}
                  className="w-full py-4 rounded-xl text-white/60 hover:text-white hover:bg-white/5 transition-all"
                >
                  Abbrechen
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AgentPortal;
