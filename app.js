const { useState, useEffect } = React;
const { Download, Calendar, Users, BarChart3, TrendingUp, FileText, Trash2, Edit2, Printer, LogOut, Lock, Plus } = lucide;

const ToolboxTracker = () => {
  const SUPERVISORS = [
    { name: "Amine Ammar", password: "amine2025" },
    { name: "Aziz Bourkia", password: "aziz2025" },
    { name: "Fouad Hedadi", password: "fouad2025" },
    { name: "Anas Krayfa", password: "anas2025" },
    { name: "Rachid Kasso", password: "rachid2025" },
    { name: "Adaoud Mehdi", password: "mehdi2025" },
    { name: "Adame Nibba", password: "adame2025" }
  ];
  
  const WORKERS_LIST = [
    "MOHAMED YAHYAOUI", "JULIO JIMENO", "ANGELO GIOVANNI FERRANTE GIARDINA", "ABEL LOPEZ SUAREZ",
    "ADIL BARDOUD", "IDRISS KHALIL BENSAR", "SEMENSO", "MOUHCINE EL HAJOUI", "AYMANE BENNANI",
    "AMAZOUZ BADER", "CHRIFI MOHAMED", "AMINE AMAR", "AZIZ BOURKIA", "FOUAD HEDADI",
    "ANAS KRAYFA", "RACHID KASSO", "ADAOUD MEHDI", "SOUFIANE TAHIRI", "AZIZE ECH CHARYF",
    "IMAD OUATTAB", "MICHEL", "NICO STUFO", "GRANDA OVIDIO", "ABDERRAZAK HADIKI",
    "RACHID GHAFOUR", "AHMED EL-ASRI", "ABDELFATTAH OUATTAB", "ABDELALI MOUNADAM",
    "PEDRO HERDIA", "ALAIEN", "KARIM BARDOUD", "MOHAMED BARGHACH", "LEONARDO ADASME",
    "IOSIF IULIAN LUCA", "ALMEIDA GONZALEZ WILSON FERNANDO", "LAHOUSSINE ELAASRI",
    "IBRAHIM MOUNADAM", "SAÏD HARCHAOUI", "AZIZ BIYYA", "RACHID ELHAAIBI",
    "SARDAOUI MOUHCINE", "MOUNIR SELOUANE", "MEHDI TOUISSI", "MOURAD MALLAS",
    "ABDELILAH KHAYRAN", "CARLOS DONOSO", "NABIL BOUTAYEB", "ABDELGHAFFAR BAKRAOUI",
    "ALI SENHAJI", "MAROUANE KHALDOUNE", "VICTOR COLLADO-ALFONZO JOSE", "ARKADIOZ GRZBGORZ",
    "MOHAMED NOUR ER-RACHDI", "SALAH IZAITOUNI", "MUSTAPHA ZL KHAYATI", "AL MRABET MOHAMED",
    "BENAICHA ETTIJANI", "ADRAOUI ABDELATI", "JUAN CARLOS MESA", "JONATHAN JARA",
    "ZAIM OMAR", "SALAH BAHBAH", "OMAR ABOD", "MOHAMMED EL-KAOUTARI", "SOFIANE GHAZALI",
    "ABDERRAHIM ERRECHYDY", "OUKHOYI WADIE", "SARDAOUI ZOUHAIR", "AMIN KHETTABI",
    "JAWAD HAJJI", "RACHID HAKIMI", "GHAFOUR ABDERAHIM", "ABDELHAK EL MFOUAR",
    "NAITALLAH HOUCEIN", "MOHAMMED MAHBOUB", "ISMAIL ABOULMAJD", "ABDERAHIM EL KHAYATI",
    "REDOUANE AMOUDAT", "FATHI BADR", "YOUSSEF TAMDI", "MOURAD SARGAOUI",
    "MUSTAPHA EL ALAOUI", "MOHAMED NATEJ", "RABII BOUJHAD", "SAID ELOUAHIDI",
    "MOHAMMED LACHHEB", "ILYAS NAOUM", "MOHAMED LAKHNATI", "KABBOUR EL BERDAOUI",
    "RACHID OUNAJMA", "KHALID RAMZI", "KARIM KHAYRAT", "ZAKARIA BAKRAOUI",
    "HAMZA EDDARI", "MOHAMMED KHANDALI", "GLAIBI ABDELILAH", "NOUR EDDIN KARTIT",
    "SABOUR LAHLOU", "RACHID LEOURAK", "AYOUB TAOUAF", "ACHFOUD AHMED",
    "HASSAN ZTAK", "BRAHIM EL BAHTI", "KHALID BAKKOUCH", "HAKIMI ABDELHADI",
    "ADAME NIBBA", "ANAS ETTAJRI", "SALHI ABDELGHANI", "ABDERRAHIM ECHELIH",
    "MOHAMMED EL HAJJI", "SALAH-DINE KHALDOUNE", "RIDA ATRAGHA", "HICHAM DARHAM",
    "AYOUB ZEGRARI", "JAWAD LAHLALI", "AYOUB CHERIFI"
  ].sort();
  
  const SHIFTS = ["Matin", "Nuit"];
  const COMPANY_NAME = "EUROHINCA MAROC";
  const COMPANY_COLOR = "#00A3DD";
  
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [loginName, setLoginName] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  
  const [activeTab, setActiveTab] = useState('entry');
  const [currentDate, setCurrentDate] = useState(new Date().toISOString().split('T')[0]);
  const [supervisor, setSupervisor] = useState('');
  const [shift, setShift] = useState(SHIFTS[0]);
  const [workerInput, setWorkerInput] = useState('');
  const [selectedWorkers, setSelectedWorkers] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [toolboxSessions, setToolboxSessions] = useState([]);
  const [statusMessage, setStatusMessage] = useState({ text: 'Prêt pour la saisie', type: 'success' });
  const [editingSession, setEditingSession] = useState(null);
  const [filterStartDate, setFilterStartDate] = useState('');
  const [filterEndDate, setFilterEndDate] = useState('');

  useEffect(() => {
    const loadData = async () => {
      try {
        const result = await window.storage.get('toolbox-sessions', true);
        if (result && result.value) {
          setToolboxSessions(JSON.parse(result.value));
        }
      } catch (error) {
        console.log('Aucune donnée existante');
      }
    };
    if (isLoggedIn) {
      loadData();
    }
  }, [isLoggedIn]);

  const saveData = async (data) => {
    try {
      await window.storage.set('toolbox-sessions', JSON.stringify(data), true);
    } catch (error) {
      console.error('Erreur de sauvegarde:', error);
    }
  };

  const handleLogin = () => {
    const user = SUPERVISORS.find(s => s.name === loginName && s.password === loginPassword);
    if (user) {
      setIsLoggedIn(true);
      setCurrentUser(user.name);
      setSupervisor(user.name);
      setLoginError('');
    } else {
      setLoginError('Nom ou mot de passe incorrect');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    setLoginName('');
    setLoginPassword('');
  };

  const handleWorkerInputChange = (value) => {
    setWorkerInput(value);
    if (value.length > 0) {
      const filtered = WORKERS_LIST.filter(w => 
        w.toLowerCase().includes(value.toLowerCase()) && 
        !selectedWorkers.includes(w)
      );
      setSuggestions(filtered.slice(0, 10));
    } else {
      setSuggestions([]);
    }
  };

  const addWorker = (worker) => {
    if (!selectedWorkers.includes(worker)) {
      setSelectedWorkers([...selectedWorkers, worker]);
      setWorkerInput('');
      setSuggestions([]);
    }
  };

  const removeWorker = (worker) => {
    setSelectedWorkers(selectedWorkers.filter(w => w !== worker));
  };

  const handleSubmit = () => {
    if (selectedWorkers.length === 0) {
      setStatusMessage({ text: 'Veuillez ajouter au moins un travailleur', type: 'error' });
      return;
    }

    if (editingSession) {
      const updatedSessions = toolboxSessions.map(s => 
        s.id === editingSession.id 
          ? { ...s, date: currentDate, shift, supervisor, workers: selectedWorkers, attendance: selectedWorkers.length }
          : s
      );
      setToolboxSessions(updatedSessions);
      saveData(updatedSessions);
      setStatusMessage({ text: '✓ Session modifiée avec succès!', type: 'success' });
      setEditingSession(null);
    } else {
      const newSession = {
        id: Date.now(),
        date: currentDate,
        shift,
        supervisor,
        workers: selectedWorkers,
        attendance: selectedWorkers.length,
        createdAt: new Date().toISOString()
      };

      const updatedSessions = [...toolboxSessions, newSession];
      setToolboxSessions(updatedSessions);
      saveData(updatedSessions);
      setStatusMessage({ text: '✓ Session enregistrée avec succès!', type: 'success' });
    }
    
    setSelectedWorkers([]);
    setTimeout(() => {
      setStatusMessage({ text: 'Prêt pour la saisie', type: 'success' });
    }, 2000);
  };

  const deleteSession = (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette session?')) {
      const updated = toolboxSessions.filter(s => s.id !== id);
      setToolboxSessions(updated);
      saveData(updated);
    }
  };

  const editSession = (session) => {
    setEditingSession(session);
    setCurrentDate(session.date);
    setShift(session.shift);
    setSupervisor(session.supervisor);
    setSelectedWorkers([...session.workers]);
    setActiveTab('entry');
  };

  const cancelEdit = () => {
    setEditingSession(null);
    setSelectedWorkers([]);
  };

  const getFilteredSessions = () => {
    let filtered = [...toolboxSessions];
    if (filterStartDate) {
      filtered = filtered.filter(s => s.date >= filterStartDate);
    }
    if (filterEndDate) {
      filtered = filtered.filter(s => s.date <= filterEndDate);
    }
    return filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
  };

  const getWorkerStats = () => {
    const stats = {};
    toolboxSessions.forEach(session => {
      session.workers.forEach(worker => {
        if (!stats[worker]) {
          stats[worker] = { count: 0, lastDate: session.date, dates: [] };
        }
        stats[worker].count++;
        stats[worker].dates.push(session.date);
        if (session.date > stats[worker].lastDate) {
          stats[worker].lastDate = session.date;
        }
      });
    });
    return Object.entries(stats)
      .map(([name, data]) => ({ name, ...data }))
      .sort((a, b) => b.count - a.count);
  };

  const getSupervisorStats = () => {
    const stats = {};
    SUPERVISORS.forEach(sup => {
      stats[sup.name] = { total: 0, morning: 0, night: 0, totalWorkers: 0 };
    });
    toolboxSessions.forEach(session => {
      if (stats[session.supervisor]) {
        stats[session.supervisor].total++;
        stats[session.supervisor].totalWorkers += session.attendance;
        if (session.shift === 'Matin') stats[session.supervisor].morning++;
        else stats[session.supervisor].night++;
      }
    });
    return stats;
  };

  const getTrendData = () => {
    const trends = {};
    toolboxSessions.forEach(session => {
      const month = session.date.substring(0, 7);
      if (!trends[month]) trends[month] = 0;
      trends[month]++;
    });
    return Object.entries(trends).sort();
  };

  const downloadCSV = () => {
    const workerStats = getWorkerStats();
    const supervisorStats = getSupervisorStats();
    
    let csv = "EXPORT DONNÉES TOOLBOX TALK - EUROHINCA MAROC\n\n";
    csv += "SESSIONS\n";
    csv += "ID,Date,Équipe,Superviseur,Nombre de participants,Travailleurs\n";
    toolboxSessions.forEach(session => {
      csv += `${session.id},${session.date},${session.shift},${session.supervisor},${session.attendance},"${session.workers.join('; ')}"\n`;
    });
    
    csv += "\n\nSTATISTIQUES TRAVAILLEURS\n";
    csv += "Nom du travailleur,Total sessions,Dernière présence\n";
    workerStats.forEach(worker => {
      csv += `${worker.name},${worker.count},${worker.lastDate}\n`;
    });
    
    csv += "\n\nSTATISTIQUES SUPERVISEURS\n";
    csv += "Superviseur,Total sessions,Matin,Nuit,Total travailleurs\n";
    Object.entries(supervisorStats).forEach(([name, stats]) => {
      csv += `${name},${stats.total},${stats.morning},${stats.night},${stats.totalWorkers}\n`;
    });
    
    const blob = new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8;' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `toolbox_talk_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  const printReport = () => {
    window.print();
  };

  const workerStats = getWorkerStats();
  const supervisorStats = getSupervisorStats();
  const totalSessions = toolboxSessions.length;
  const totalAttendance = toolboxSessions.reduce((sum, s) => sum + s.attendance, 0);
  const uniqueWorkers = workerStats.length;
  const filteredSessions = getFilteredSessions();

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6" style={{background: 'linear-gradient(135deg, #00A3DD 0%, #0077AA 100%)'}}>
        <div className="bg-white rounded-lg shadow-2xl p-8 max-w-md w-full">
          <div className="text-center mb-8">
            <div className="mx-auto mb-4 w-16 h-16 flex items-center justify-center rounded-full" style={{backgroundColor: COMPANY_COLOR}}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">{COMPANY_NAME}</h1>
            <p className="text-gray-600">Système de suivi Toolbox Talk</p>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Superviseur</label>
              <select
                value={loginName}
                onChange={(e) => setLoginName(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none"
                style={{borderColor: loginName ? COMPANY_COLOR : '#d1d5db'}}
              >
                <option value="">Sélectionner un superviseur</option>
                {SUPERVISORS.map(sup => (
                  <option key={sup.name} value={sup.name}>{sup.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Mot de passe</label>
              <input
                type="password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                placeholder="Entrer le mot de passe"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none"
                style={{borderColor: loginPassword ? COMPANY_COLOR : '#d1d5db'}}
              />
            </div>

            {loginError && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                {loginError}
              </div>
            )}

            <button
              onClick={handleLogin}
              className="w-full text-white py-3 rounded-lg transition-colors font-bold text-lg"
              style={{backgroundColor: COMPANY_COLOR}}
              onMouseOver={(e) => e.target.style.opacity = '0.9'}
              onMouseOut={(e) => e.target.style.opacity = '1'}
            >
              Se connecter
            </button>
          </div>

          <div className="mt-6 text-sm text-gray-600 text-center">
            <p>Mots de passe par défaut: [prénom]2025</p>
            <p className="text-xs mt-2">Ex: amine2025, fouad2025, anas2025</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="rounded-lg shadow-xl p-6 mb-6 text-white" style={{background: `linear-gradient(135deg, ${COMPANY_COLOR} 0%, #0077AA 100%)`}}>
          <div className="flex justify-between items-center flex-wrap gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">{COMPANY_NAME}</h1>
              <p className="text-blue-100">Système de suivi Toolbox Talk</p>
              <p className="text-blue-200 text-sm mt-1">👤 Connecté: {currentUser}</p>
            </div>
            <div className="flex gap-3 flex-wrap no-print">
              <button onClick={downloadCSV} className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg transition-colors font-semibold" style={{color: COMPANY_COLOR}}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="7 10 12 15 17 10"></polyline>
                  <line x1="12" y1="15" x2="12" y2="3"></line>
                </svg>
                Exporter CSV
              </button>
              <button onClick={printReport} className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors font-semibold">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="6 9 6 2 18 2 18 9"></polyline>
                  <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
                  <rect x="6" y="14" width="12" height="8"></rect>
                </svg>
                Imprimer
              </button>
              <button onClick={handleLogout} className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors font-semibold">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                  <polyline points="16 17 21 12 16 7"></polyline>
                  <line x1="21" y1="12" x2="9" y2="12"></line>
                </svg>
                Déconnexion
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg mb-6 no-print">
          <div className="flex border-b overflow-x-auto">
            {[
              { id: 'entry', label: 'Saisie', icon: '➕' },
              { id: 'sessions', label: 'Sessions', icon: '📋' },
              { id: 'workers', label: 'Travailleurs', icon: '👥' },
              { id: 'dashboard', label: 'Tableau de bord', icon: '📊' },
              { id: 'trends', label: 'Tendances', icon: '📈' }
            ].map(tab => (
              <button 
                key={tab.id} 
                onClick={() => setActiveTab(tab.id)} 
                className={`flex items-center gap-2 px-6 py-4 font-semibold transition-colors whitespace-nowrap ${activeTab === tab.id ? 'border-b-4 text-white' : 'text-gray-600 hover:bg-blue-50'}`}
                style={activeTab === tab.id ? {borderColor: COMPANY_COLOR, backgroundColor: COMPANY_COLOR} : {}}
              >
                <span>{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-xl p-8">
          {activeTab === 'entry' && (
            <div className="max-w-2xl mx-auto">
              <div className="border-l-4 p-4 mb-6" style={{backgroundColor: `${COMPANY_COLOR}20`, borderColor: COMPANY_COLOR}}>
                <h2 className="text-2xl font-bold mb-1" style={{color: COMPANY_COLOR}}>
                  {editingSession ? '✏️ Modifier la session' : '➕ Nouvelle session'}
                </h2>
                <p className="text-gray-700">Saisie des présences Toolbox Talk</p>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">📅 Date</label>
                  <input 
                    type="date" 
                    value={currentDate} 
                    onChange={(e) => setCurrentDate(e.target.value)} 
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none"
                    style={{borderColor: COMPANY_COLOR}}
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">👤 Superviseur</label>
                  <select 
                    value={supervisor} 
                    onChange={(e) => setSupervisor(e.target.value)} 
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none"
                    style={{borderColor: COMPANY_COLOR}}
                  >
                    {SUPERVISORS.map(sup => (
                      <option key={sup.name} value={sup.name}>{sup.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">🕐 Équipe</label>
                  <select 
                    value={shift} 
                    onChange={(e) => setShift(e.target.value)} 
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none"
                    style={{borderColor: COMPANY_COLOR}}
                  >
                    {SHIFTS.map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">👷 Ajouter des travailleurs</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={workerInput}
                      onChange={(e) => handleWorkerInputChange(e.target.value)}
                      placeholder="Commencer à taper le nom..."
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none"
                      style={{borderColor: workerInput ? COMPANY_COLOR : '#d1d5db'}}
                    />
                    {suggestions.length > 0 && (
                      <div className="absolute z-10 w-full bg-white border-2 rounded-lg mt-1 max-h-48 overflow-y-auto shadow-lg" style={{borderColor: COMPANY_COLOR}}>
                        {suggestions.map(worker => (
                          <div
                            key={worker}
                            onClick={() => addWorker(worker)}
                            className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
                          >
                            {worker}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {selectedWorkers.length > 0 && (
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      ✅ Travailleurs sélectionnés ({selectedWorkers.length})
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {selectedWorkers.map(worker => (
                        <div key={worker} className="bg-blue-100 text-blue-800 px-3 py-2 rounded-full flex items-center gap-2">
                          <span className="text-sm">{worker}</span>
                          <button onClick={() => removeWorker(worker)} className="text-blue-600 hover:text-blue-800 font-bold">
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className={`p-4 rounded-lg ${statusMessage.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  <p className="font-semibold">{statusMessage.text}</p>
                </div>

                <div className="flex gap-3">
                  <button 
                    onClick={handleSubmit} 
                    className="flex-1 text-white py-4 rounded-lg transition-colors font-bold text-lg"
                    style={{backgroundColor: COMPANY_COLOR}}
                  >
                    {editingSession ? '✓ Mettre à jour' : '✓ Enregistrer'}
                  </button>
                  {editingSession && (
                    <button onClick={cancelEdit} className="px-6 bg-gray-500 text-white py-4 rounded-lg hover:bg-gray-600 transition-colors font-bold">
                      ✕ Annuler
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'sessions' && (
            <div>
              <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
                <h2 className="text-2xl font-bold text-gray-800">📋 Sessions Toolbox Talk ({filteredSessions.length})</h2>
                <div className="flex gap-3 flex-wrap">
                  <input 
                    type="date" 
                    value={filterStartDate} 
                    onChange={(e) => setFilterStartDate(e.target.value)} 
                    placeholder="Date début" 
                    className="px-3 py-2 border-2 rounded-lg"
                    style={{borderColor: COMPANY_COLOR}}
                  />
                  <input 
                    type="date" 
                    value={filterEndDate} 
                    onChange={(e) => setFilterEndDate(e.target.value)} 
                    placeholder="Date fin" 
                    className="px-3 py-2 border-2 rounded-lg"
                    style={{borderColor: COMPANY_COLOR}}
                  />
                  <button onClick={() => { setFilterStartDate(''); setFilterEndDate(''); }} className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600">
                    Réinitialiser
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="text-white" style={{backgroundColor: COMPANY_COLOR}}>
                      <th className="px-4 py-3 text-left">ID</th>
                      <th className="px-4 py-3 text-left">Date</th>
                      <th className="px-4 py-3 text-left">Équipe</th>
                      <th className="px-4 py-3 text-left">Superviseur</th>
                      <th className="px-4 py-3 text-center">Présents</th>
                      <th className="px-4 py-3 text-left">Travailleurs</th>
                      <th className="px-4 py-3 text-center no-print">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredSessions.map((session, idx) => (
                      <tr key={session.id} className={idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                        <td className="px-4 py-3 border font-mono text-xs">{session.id}</td>
                        <td className="px-4 py-3 border font-semibold">{session.date}</td>
                        <td className="px-4 py-3 border">
                          <span className={`px-2 py-1 rounded text-sm ${session.shift === 'Matin' ? 'bg-yellow-100 text-yellow-800' : 'bg-indigo-100 text-indigo-800'}`}>
                            {session.shift}
                          </span>
                        </td>
                        <td className="px-4 py-3 border">{session.supervisor}</td>
                        <td className="px-4 py-3 border text-center">
                          <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full font-bold">
                            {session.attendance}
                          </span>
                        </td>
                        <td className="px-4 py-3 border text-sm">{session.workers.join(', ')}</td>
                        <td className="px-4 py-3 border no-print">
                          <div className="flex gap-2 justify-center">
                            <button onClick={() => editSession(session)} className="text-blue-600 hover:text-blue-800" title="Modifier">
                              ✏️
                            </button>
                            <button onClick={() => deleteSession(session.id)} className="text-red-600 hover:text-red-800" title="Supprimer">
                              🗑️
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {filteredSessions.length === 0 && (
                      <tr>
                        <td colSpan="7" className="px-4 py-8 text-center text-gray-500">
                          Aucune session enregistrée
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'workers' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">👥 Statistiques des travailleurs ({uniqueWorkers})</h2>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-orange-600 text-white">
                      <th className="px-4 py-3 text-left">Rang</th>
                      <th className="px-4 py-3 text-left">Nom</th>
                      <th className="px-4 py-3 text-center">Sessions</th>
                      <th className="px-4 py-3 text-left">Dernière présence</th>
                      <th className="px-4 py-3 text-left">Statut</th>
                    </tr>
                  </thead>
                  <tbody>
                    {workerStats.map((worker, idx) => {
                      const status = worker.count < 5 ? 'Faible' : worker.count < 10 ? 'Actif' : 'Très actif';
                      const statusColor = status === 'Très actif' ? 'bg-green-100 text-green-800' : status === 'Actif' ? 'bg-blue-100 text-blue-800' : 'bg-yellow-100 text-yellow-800';
                      
                      return (
                        <tr key={worker.name} className={idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                          <td className="px-4 py-3 border font-bold text-center">{idx + 1}</td>
                          <td className="px-4 py-3 border font-semibold">{worker.name}</td>
                          <td className="px-4 py-3 border text-center">
                            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-bold">
                              {worker.count}
                            </span>
                          </td>
                          <td className="px-4 py-3 border">{worker.lastDate}</td>
                          <td className="px-4 py-3 border">
                            <span className={`px-3 py-1 rounded-full font-semibold ${statusColor}`}>
                              {status}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                    {workerStats.length === 0 && (
                      <tr>
                        <td colSpan="5" className="px-4 py-8 text-center text-gray-500">
                          Aucune statistique disponible
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'dashboard' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">📊 Tableau de bord</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="rounded-lg p-6 text-white" style={{background: `linear-gradient(135deg, ${COMPANY_COLOR} 0%, #0077AA 100%)`}}>
                  <div className="text-4xl mb-2">📋</div>
                  <h3 className="text-3xl font-bold mb-1">{totalSessions}</h3>
                  <p className="text-blue-100">Sessions totales</p>
                </div>
                
                <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg p-6 text-white">
                  <div className="text-4xl mb-2">✅</div>
                  <h3 className="text-3xl font-bold mb-1">{totalAttendance}</h3>
                  <p className="text-green-100">Présences totales</p>
                </div>
                
                <div className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-lg p-6 text-white">
                  <div className="text-4xl mb-2">👥</div>
                  <h3 className="text-3xl font-bold mb-1">{uniqueWorkers}</h3>
                  <p className="text-amber-100">Travailleurs uniques</p>
                </div>
                
                <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg p-6 text-white">
                  <div className="text-4xl mb-2">📈</div>
                  <h3 className="text-3xl font-bold mb-1">
                    {totalSessions > 0 ? (totalAttendance / totalSessions).toFixed(1) : 0}
                  </h3>
                  <p className="text-purple-100">Moyenne par session</p>
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-800 mb-4">🏆 Performance des superviseurs</h3>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="text-white" style={{backgroundColor: COMPANY_COLOR}}>
                        <th className="px-4 py-3 text-left">Superviseur</th>
                        <th className="px-4 py-3 text-center">Sessions</th>
                        <th className="px-4 py-3 text-center">Matin</th>
                        <th className="px-4 py-3 text-center">Nuit</th>
                        <th className="px-4 py-3 text-center">Total travailleurs</th>
                        <th className="px-4 py-3 text-center">Moyenne/session</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.entries(supervisorStats)
                        .sort((a, b) => b[1].total - a[1].total)
                        .map(([name, stats], idx) => (
                        <tr key={name} className={idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                          <td className="px-4 py-3 border font-semibold">{name}</td>
                          <td className="px-4 py-3 border text-center">
                            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-bold">
                              {stats.total}
                            </span>
                          </td>
                          <td className="px-4 py-3 border text-center">{stats.morning}</td>
                          <td className="px-4 py-3 border text-center">{stats.night}</td>
                          <td className="px-4 py-3 border text-center font-semibold">{stats.totalWorkers}</td>
                          <td className="px-4 py-3 border text-center">
                            {stats.total > 0 ? (stats.totalWorkers / stats.total).toFixed(1) : 0}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">🥇 Top 10 travailleurs</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {workerStats.slice(0, 10).map((worker, idx) => (
                    <div key={worker.name} className="flex items-center justify-between bg-gradient-to-r from-green-50 to-green-100 border-l-4 border-green-600 p-4 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="bg-green-600 text-white font-bold rounded-full w-10 h-10 flex items-center justify-center text-lg">
                          {idx + 1}
                        </div>
                        <span className="font-semibold text-gray-800">{worker.name}</span>
                      </div>
                      <span className="bg-green-600 text-white px-4 py-2 rounded-full font-bold">
                        {worker.count}
                      </span>
                    </div>
                  ))}
                  {workerStats.length === 0 && (
                    <div className="col-span-2 text-center text-gray-500 py-8">
                      Aucune donnée disponible
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'trends' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">📈 Analyse des tendances</h2>
              
              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-800 mb-4">📅 Sessions par mois</h3>
                <div className="space-y-4">
                  {getTrendData().map(([month, count]) => {
                    const maxCount = Math.max(...getTrendData().map(([, c]) => c), 1);
                    const percentage = (count / maxCount) * 100;
                    return (
                      <div key={month}>
                        <div className="flex justify-between mb-1">
                          <span className="font-semibold">{month}</span>
                          <span className="text-gray-600">{count} sessions</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-6">
                          <div 
                            className="h-6 rounded-full flex items-center justify-end pr-3 text-white font-bold text-sm"
                            style={{width: `${percentage}%`, backgroundColor: COMPANY_COLOR}}
                          >
                            {count}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  {getTrendData().length === 0 && (
                    <p className="text-center text-gray-500 py-8">Pas encore de données de tendance</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-white border-2 rounded-lg p-6" style={{borderColor: COMPANY_COLOR}}>
                  <h3 className="text-lg font-bold text-gray-800 mb-4">🕐 Répartition Matin/Nuit</h3>
                  <div className="space-y-3">
                    {(() => {
                      const morning = toolboxSessions.filter(s => s.shift === 'Matin').length;
                      const night = toolboxSessions.filter(s => s.shift === 'Nuit').length;
                      const total = morning + night;
                      return (
                        <>
                          <div>
                            <div className="flex justify-between mb-1">
                              <span className="font-semibold">☀️ Matin</span>
                              <span className="font-bold">{morning} ({total > 0 ? ((morning/total)*100).toFixed(1) : 0}%)</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-4">
                              <div className="bg-yellow-500 h-4 rounded-full" style={{width: `${total > 0 ? (morning/total)*100 : 0}%`}}></div>
                            </div>
                          </div>
                          <div>
                            <div className="flex justify-between mb-1">
                              <span className="font-semibold">🌙 Nuit</span>
                              <span className="font-bold">{night} ({total > 0 ? ((night/total)*100).toFixed(1) : 0}%)</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-4">
                              <div className="bg-indigo-600 h-4 rounded-full" style={{width: `${total > 0 ? (night/total)*100 : 0}%`}}></div>
                            </div>
                          </div>
                        </>
                      );
                    })()}
                  </div>
                </div>

                <div className="bg-white border-2 border-green-200 rounded-lg p-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-4">👥 Comparaison superviseurs</h3>
                  <div className="space-y-3">
                    {Object.entries(supervisorStats)
                      .sort((a, b) => b[1].total - a[1].total)
                      .map(([name, stats]) => {
                        const maxTotal = Math.max(...Object.values(supervisorStats).map(s => s.total), 1);
                        const percentage = (stats.total / maxTotal) * 100;
                        return (
                          <div key={name}>
                            <div className="flex justify-between mb-1">
                              <span className="font-semibold text-sm">{name.split(' ')[0]}</span>
                              <span className="text-sm font-bold">{stats.total}</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-3">
                              <div className="bg-green-500 h-3 rounded-full" style={{width: `${percentage}%`}}></div>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>
              </div>

              <div className="bg-amber-50 border-2 border-amber-200 rounded-lg p-6">
                <h3 className="text-lg font-bold text-amber-900 mb-3">📊 Rapports périodiques</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="bg-white p-4 rounded-lg border-2 border-amber-300">
                    <h4 className="font-bold text-amber-800 mb-2">📅 Rapport hebdomadaire</h4>
                    <p className="text-sm text-gray-600 mb-3">Derniers 7 jours</p>
                    <div className="text-2xl font-bold" style={{color: COMPANY_COLOR}}>
                      {toolboxSessions.filter(s => {
                        const sessionDate = new Date(s.date);
                        const weekAgo = new Date();
                        weekAgo.setDate(weekAgo.getDate() - 7);
                        return sessionDate >= weekAgo;
                      }).length} sessions
                    </div>
                  </div>
                  <div className="bg-white p-4 rounded-lg border-2 border-amber-300">
                    <h4 className="font-bold text-amber-800 mb-2">📆 Rapport mensuel</h4>
                    <p className="text-sm text-gray-600 mb-3">Derniers 30 jours</p>
                    <div className="text-2xl font-bold" style={{color: COMPANY_COLOR}}>
                      {toolboxSessions.filter(s => {
                        const sessionDate = new Date(s.date);
                        const monthAgo = new Date();
                        monthAgo.setDate(monthAgo.getDate() - 30);
                        return sessionDate >= monthAgo;
                      }).length} sessions
                    </div>
                  </div>
                </div>
                <p className="text-sm text-amber-800">
                  💡 Les rapports incluent: statistiques détaillées, performances des superviseurs, tendances et recommandations
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<ToolboxTracker />);
