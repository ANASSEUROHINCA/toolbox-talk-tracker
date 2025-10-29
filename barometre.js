const { useState, useEffect } = React;

const BarometreSecurite = () => {
  const SUPERVISORS = [
    { name: "Amine Ammar", password: "amine2025" },
    { name: "Aziz Bourkia", password: "aziz2025" },
    { name: "Fouad Hedadi", password: "fouad2025" },
    { name: "Anass Kraifa", password: "anass2025" },
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

  const POSITIVE_ACTIONS = [
    { value: 1, label: "Insignifiant", description: "Accompagnement collègue, vigilance quotidienne" },
    { value: 2, label: "Mineur", description: "Correction rapide, maintenance préventive" },
    { value: 3, label: "Modéré", description: "Proposition d'amélioration, identification risque" },
    { value: 4, label: "Majeur", description: "Prévention d'incident grave" },
    { value: 5, label: "Critique", description: "Sauvetage, arrêt d'urgence vital" }
  ];

  const NEGATIVE_ACTIONS = [
    { value: -1, label: "Insignifiant", description: "Oubli EPI mineur" },
    { value: -2, label: "Mineur", description: "Non-respect procédure simple" },
    { value: -3, label: "Modéré", description: "Contournement sécurité" },
    { value: -4, label: "Majeur", description: "Mise en danger d'autrui" },
    { value: -5, label: "Critique", description: "Violation grave, accident évité de justesse" }
  ];

  const COMPANY_COLOR = "#00A3DD";
  
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [loginName, setLoginName] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  
  const [activeTab, setActiveTab] = useState('dashboard');
  const [workerScores, setWorkerScores] = useState({});
  const [events, setEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedWorker, setSelectedWorker] = useState('');
  const [eventType, setEventType] = useState('positive');
  const [selectedAction, setSelectedAction] = useState(null);
  const [eventDescription, setEventDescription] = useState('');
  const [statusMessage, setStatusMessage] = useState({ text: '', type: '' });
  const [viewingWorker, setViewingWorker] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const scoresResult = await window.storage.get('barometre-scores', true);
        if (scoresResult && scoresResult.value) {
          setWorkerScores(JSON.parse(scoresResult.value));
        } else {
          const initialScores = {};
          WORKERS_LIST.forEach(worker => {
            initialScores[worker] = 0;
          });
          setWorkerScores(initialScores);
        }

        const eventsResult = await window.storage.get('barometre-events', true);
        if (eventsResult && eventsResult.value) {
          setEvents(JSON.parse(eventsResult.value));
        }
      } catch (error) {
        console.log('Erreur de chargement');
      }
    };
    if (isLoggedIn) {
      loadData();
    }
  }, [isLoggedIn]);

  const saveScores = async (scores) => {
    try {
      await window.storage.set('barometre-scores', JSON.stringify(scores), true);
    } catch (error) {
      console.error('Erreur de sauvegarde scores:', error);
    }
  };

  const saveEvents = async (eventsData) => {
    try {
      await window.storage.set('barometre-events', JSON.stringify(eventsData), true);
    } catch (error) {
      console.error('Erreur de sauvegarde événements:', error);
    }
  };

  const handleLogin = () => {
    const user = SUPERVISORS.find(s => s.name === loginName && s.password === loginPassword);
    if (user) {
      setIsLoggedIn(true);
      setCurrentUser(user.name);
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
    setViewingWorker(null);
  };

  const handleAddEvent = () => {
    if (!selectedWorker || !selectedAction) {
      setStatusMessage({ text: 'Veuillez sélectionner un travailleur et une action', type: 'error' });
      return;
    }

    const newEvent = {
      id: Date.now(),
      worker: selectedWorker,
      points: selectedAction.value,
      type: eventType,
      action: selectedAction.label,
      description: eventDescription || selectedAction.description,
      supervisor: currentUser,
      date: new Date().toISOString()
    };

    const updatedScores = { ...workerScores };
    updatedScores[selectedWorker] = (updatedScores[selectedWorker] || 0) + selectedAction.value;

    const updatedEvents = [newEvent, ...events];

    setWorkerScores(updatedScores);
    setEvents(updatedEvents);
    saveScores(updatedScores);
    saveEvents(updatedEvents);

    setStatusMessage({ 
      text: `✓ ${selectedAction.value > 0 ? '+' : ''}${selectedAction.value} points ajoutés à ${selectedWorker}`, 
      type: 'success' 
    });
    
    setSelectedWorker('');
    setSelectedAction(null);
    setEventDescription('');

    setTimeout(() => setStatusMessage({ text: '', type: '' }), 3000);
  };

  const getLevel = (score) => {
    if (score < 0) return { label: 'Zone Dangereuse', color: 'bg-red-600', icon: '🔴', textColor: 'text-red-600' };
    if (score === 0) return { label: 'Neutre', color: 'bg-gray-400', icon: '⚪', textColor: 'text-gray-600' };
    if (score <= 20) return { label: 'À Surveiller', color: 'bg-orange-500', icon: '🟠', textColor: 'text-orange-600' };
    if (score <= 40) return { label: 'Acceptable', color: 'bg-yellow-500', icon: '🟡', textColor: 'text-yellow-600' };
    if (score <= 60) return { label: 'Bon', color: 'bg-green-500', icon: '🟢', textColor: 'text-green-600' };
    if (score <= 80) return { label: 'Très Bon', color: 'bg-blue-500', icon: '🔵', textColor: 'text-blue-600' };
    if (score < 100) return { label: 'Excellent', color: 'bg-purple-500', icon: '🟣', textColor: 'text-purple-600' };
    return { label: 'CHAMPION', color: 'bg-gradient-to-r from-yellow-400 to-yellow-600', icon: '🏆', textColor: 'text-yellow-600' };
  };

  const getBadges = (workerName) => {
    const workerEvents = events.filter(e => e.worker === workerName);
    const badges = [];
    const score = workerScores[workerName] || 0;

    // Badge Champion 100
    if (score >= 100) badges.push({ icon: '🏆', name: 'Champion 100', color: 'bg-yellow-400' });

    // Badge Protecteur (3+ actions majeures 4-5 points)
    const majorActions = workerEvents.filter(e => e.points >= 4).length;
    if (majorActions >= 3) badges.push({ icon: '🛡️', name: 'Protecteur', color: 'bg-blue-400' });

    // Badge Expert Sécurité (10+ événements positifs)
    const positiveEvents = workerEvents.filter(e => e.points > 0).length;
    if (positiveEvents >= 10) badges.push({ icon: '💎', name: 'Expert Sécurité', color: 'bg-purple-400' });

    // Badge Semaine Parfaite (+5 ou plus en 7 jours)
    const now = new Date();
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const weekEvents = workerEvents.filter(e => new Date(e.date) >= weekAgo);
    const weekScore = weekEvents.reduce((sum, e) => sum + e.points, 0);
    if (weekScore >= 5) badges.push({ icon: '🎖️', name: 'Semaine Parfaite', color: 'bg-green-400' });

    // Badge Mois d'Or (+15 ou plus en 30 jours)
    const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    const monthEvents = workerEvents.filter(e => new Date(e.date) >= monthAgo);
    const monthScore = monthEvents.reduce((sum, e) => sum + e.points, 0);
    if (monthScore >= 15) badges.push({ icon: '🏅', name: 'Mois d\'Or', color: 'bg-yellow-500' });

    // Badge Série de 5 (5 actions positives consécutives)
    let consecutive = 0;
    for (let i = 0; i < workerEvents.length; i++) {
      if (workerEvents[i].points > 0) {
        consecutive++;
        if (consecutive >= 5) {
          badges.push({ icon: '🔥', name: 'Série de 5', color: 'bg-red-400' });
          break;
        }
      } else {
        consecutive = 0;
      }
    }

    return badges;
  };

  const getScoreHistory = (workerName, days = 30) => {
    const workerEvents = events.filter(e => e.worker === workerName).reverse();
    const history = [];
    let currentScore = 0;
    
    const now = new Date();
    const startDate = new Date(now.getTime() - days * 24 * 60 * 60 * 1000);
    
    for (let i = 0; i <= days; i++) {
      const date = new Date(startDate.getTime() + i * 24 * 60 * 60 * 1000);
      const dateStr = date.toISOString().split('T')[0];
      
      const dayEvents = workerEvents.filter(e => e.date.split('T')[0] === dateStr);
      dayEvents.forEach(e => currentScore += e.points);
      
      history.push({ date: dateStr, score: currentScore });
    }
    
    return history;
  };

  const getSortedWorkers = () => {
    return Object.entries(workerScores)
      .map(([name, score]) => ({ name, score }))
      .sort((a, b) => b.score - a.score);
  };

  const getTop3 = () => getSortedWorkers().slice(0, 3);
  const getTop10Dangerous = () => {
    return getSortedWorkers()
      .filter(worker => {
        const workerEvents = events.filter(e => e.worker === worker.name);
        const hasNegativeEvent = workerEvents.some(e => e.points < 0);
        return worker.score < 0 || hasNegativeEvent;
      })
      .slice()
      .reverse()
      .slice(0, 10);
  };
  
  const getFilteredWorkers = () => {
    const sorted = getSortedWorkers();
    if (!searchTerm) return sorted;
    return sorted.filter(w => w.name.toLowerCase().includes(searchTerm.toLowerCase()));
  };

  const getWorkerEvents = (workerName, limit = null) => {
    const filtered = events.filter(e => e.worker === workerName);
    return limit ? filtered.slice(0, limit) : filtered;
  };

  const downloadCSV = () => {
    const sorted = getSortedWorkers();
    let csv = "BAROMÈTRE DE SÉCURITÉ - EUROHINCA MAROC\n\n";
    csv += "Nom du travailleur,Score,Niveau,Badges\n";
    sorted.forEach(worker => {
      const level = getLevel(worker.score);
      const badges = getBadges(worker.name);
      const badgeNames = badges.map(b => b.name).join('; ');
      csv += `${worker.name},${worker.score},${level.label},"${badgeNames}"\n`;
    });
    
    const blob = new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8;' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `barometre_securite_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  const avgScore = Object.values(workerScores).reduce((a, b) => a + b, 0) / WORKERS_LIST.length;

  if (!isLoggedIn) {
    return React.createElement('div', {
      className: "min-h-screen flex items-center justify-center p-6",
      style: {background: 'linear-gradient(135deg, #00A3DD 0%, #0077AA 100%)'}
    },
      React.createElement('div', {className: "bg-white rounded-lg shadow-2xl p-8 max-w-md w-full"},
        React.createElement('div', {className: "text-center mb-8"},
          React.createElement('div', {
            className: "mx-auto mb-4 w-16 h-16 flex items-center justify-center rounded-full text-4xl",
            style: {backgroundColor: COMPANY_COLOR}
          }, "📊"),
          React.createElement('h1', {className: "text-3xl font-bold text-gray-800 mb-2"}, "BAROMÈTRE DE SÉCURITÉ"),
          React.createElement('p', {className: "text-gray-600"}, "EUROHINCA MAROC")
        ),
        
        React.createElement('div', {className: "space-y-4"},
          React.createElement('div', null,
            React.createElement('label', {className: "block text-sm font-bold text-gray-700 mb-2"}, "Superviseur"),
            React.createElement('select', {
              value: loginName,
              onChange: (e) => setLoginName(e.target.value),
              className: "w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none",
              style: {borderColor: loginName ? COMPANY_COLOR : '#d1d5db'}
            },
              React.createElement('option', {value: ""}, "Sélectionner un superviseur"),
              SUPERVISORS.map(sup => 
                React.createElement('option', {key: sup.name, value: sup.name}, sup.name)
              )
            )
          ),

          React.createElement('div', null,
            React.createElement('label', {className: "block text-sm font-bold text-gray-700 mb-2"}, "Mot de passe"),
            React.createElement('input', {
              type: "password",
              value: loginPassword,
              onChange: (e) => setLoginPassword(e.target.value),
              onKeyPress: (e) => e.key === 'Enter' && handleLogin(),
              placeholder: "Entrer le mot de passe",
              className: "w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none",
              style: {borderColor: loginPassword ? COMPANY_COLOR : '#d1d5db'}
            })
          ),

          loginError && React.createElement('div', {className: "bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded"}, loginError),

          React.createElement('button', {
            onClick: handleLogin,
            className: "w-full text-white py-3 rounded-lg transition-colors font-bold text-lg",
            style: {backgroundColor: COMPANY_COLOR}
          }, "Se connecter")
        )
      )
    );
  }

  // Worker Profile View
  if (viewingWorker) {
    const score = workerScores[viewingWorker] || 0;
    const level = getLevel(score);
    const badges = getBadges(viewingWorker);
    const workerEvents = getWorkerEvents(viewingWorker);
    const scoreHistory = getScoreHistory(viewingWorker, 30);
    const positiveCount = workerEvents.filter(e => e.points > 0).length;
    const negativeCount = workerEvents.filter(e => e.points < 0).length;

    const maxScore = Math.max(...scoreHistory.map(h => h.score), 10);
    const minScore = Math.min(...scoreHistory.map(h => h.score), 0);

    return React.createElement('div', {className: "min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6"},
      React.createElement('div', {className: "max-w-6xl mx-auto"},
        React.createElement('button', {
          onClick: () => setViewingWorker(null),
          className: "mb-4 flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow hover:shadow-lg transition-shadow font-semibold",
          style: {color: COMPANY_COLOR}
        }, "← Retour à la liste"),

        React.createElement('div', {className: "bg-white rounded-lg shadow-xl p-8"},
          React.createElement('div', {className: "flex items-start justify-between mb-8"},
            React.createElement('div', null,
              React.createElement('h1', {className: "text-3xl font-bold text-gray-800 mb-2"}, viewingWorker),
              React.createElement('div', {className: "flex items-center gap-3"},
                React.createElement('span', {className: "text-2xl"}, level.icon),
                React.createElement('span', {className: `font-bold ${level.textColor}`}, level.label)
              )
            ),
            React.createElement('div', {className: "text-center"},
              React.createElement('div', {className: `${level.color} text-white px-8 py-4 rounded-lg`},
                React.createElement('div', {className: "text-5xl font-bold"}, score),
                React.createElement('div', {className: "text-sm"}, "SCORE TOTAL")
              )
            )
          ),

          badges.length > 0 && React.createElement('div', {className: "mb-8"},
            React.createElement('h3', {className: "text-xl font-bold text-gray-800 mb-4"}, "🏆 Badges obtenus"),
            React.createElement('div', {className: "flex flex-wrap gap-3"},
              badges.map((badge, idx) =>
                React.createElement('div', {
                  key: idx,
                  className: `${badge.color} text-white px-4 py-2 rounded-full flex items-center gap-2 font-semibold`
                },
                  React.createElement('span', null, badge.icon),
                  React.createElement('span', null, badge.name)
                )
              )
            )
          ),

          React.createElement('div', {className: "grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"},
            React.createElement('div', {className: "bg-green-50 border-2 border-green-200 rounded-lg p-4"},
              React.createElement('div', {className: "text-3xl font-bold text-green-600"}, positiveCount),
              React.createElement('div', {className: "text-sm text-gray-600"}, "Actions Positives")
            ),
            React.createElement('div', {className: "bg-red-50 border-2 border-red-200 rounded-lg p-4"},
              React.createElement('div', {className: "text-3xl font-bold text-red-600"}, negativeCount),
              React.createElement('div', {className: "text-sm text-gray-600"}, "Infractions")
            ),
            React.createElement('div', {className: "bg-blue-50 border-2 border-blue-200 rounded-lg p-4"},
              React.createElement('div', {className: "text-3xl font-bold text-blue-600"}, workerEvents.length),
              React.createElement('div', {className: "text-sm text-gray-600"}, "Événements Total")
            )
          ),

          React.createElement('div', {className: "mb-8"},
            React.createElement('h3', {className: "text-xl font-bold text-gray-800 mb-4"}, "📈 Évolution du Score (30 derniers jours)"),
            React.createElement('div', {className: "bg-gray-50 p-4 rounded-lg", style: {height: '300px', position: 'relative'}},
              React.createElement('svg', {viewBox: `0 0 ${scoreHistory.length * 20} 250`, style: {width: '100%', height: '100%'}},
                React.createElement('line', {x1: 0, y1: 125, x2: scoreHistory.length * 20, y2: 125, stroke: '#ccc', strokeWidth: 1}),
                React.createElement('polyline', {
                  points: scoreHistory.map((h, i) => {
                    const x = i * 20 + 10;
                    const y = 250 - ((h.score - minScore) / (maxScore - minScore + 1)) * 200 - 25;
                    return `${x},${y}`;
                  }).join(' '),
                  fill: 'none',
                  stroke: COMPANY_COLOR,
                  strokeWidth: 3
                }),
                scoreHistory.map((h, i) => {
                  const x = i * 20 + 10;
                  const y = 250 - ((h.score - minScore) / (maxScore - minScore + 1)) * 200 - 25;
                  return React.createElement('circle', {key: i, cx: x, cy: y, r: 3, fill: COMPANY_COLOR});
                })
              )
            )
          ),

          React.createElement('div', null,
            React.createElement('h3', {className: "text-xl font-bold text-gray-800 mb-4"}, `📋 Historique Complet (${workerEvents.length} événements)`),
            React.createElement('div', {className: "space-y-3", style: {maxHeight: '500px', overflowY: 'auto'}},
              workerEvents.map(event =>
                React.createElement('div', {
                  key: event.id,
                  className: `p-4 rounded-lg border-l-4 ${event.points > 0 ? 'bg-green-50 border-green-500' : 'bg-red-50 border-red-500'}`
                },
                  React.createElement('div', {className: "flex items-start justify-between"},
                    React.createElement('div', {className: "flex-1"},
                      React.createElement('div', {className: "flex items-center gap-3 mb-2"},
                        React.createElement('span', {
                          className: `${event.points > 0 ? 'bg-green-500' : 'bg-red-500'} text-white px-3 py-1 rounded-full font-bold`
                        }, `${event.points > 0 ? '+' : ''}${event.points}`),
                        React.createElement('span', {className: "font-bold text-gray-800"}, event.action),
                        React.createElement('span', {className: "text-sm text-gray-500"}, new Date(event.date).toLocaleString('fr-FR'))
                      ),
                      React.createElement('p', {className: "text-gray-700"}, event.description),
                      React.createElement('p', {className: "text-sm text-gray-500 mt-1"}, `Par: ${event.supervisor}`)
                    )
                  )
                )
              ),
              workerEvents.length === 0 && React.createElement('p', {className: "text-center text-gray-500 py-8"}, "Aucun événement enregistré")
            )
          )
        )
      )
    );
  }

  return React.createElement('div', {className: "min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6"},
    React.createElement('div', {className: "max-w-7xl mx-auto"},
      React.createElement('div', {
        className: "rounded-lg shadow-xl p-6 mb-6 text-white",
        style: {background: `linear-gradient(135deg, ${COMPANY_COLOR} 0%, #0077AA 100%)`}
      },
        React.createElement('div', {className: "flex justify-between items-center flex-wrap gap-4"},
          React.createElement('div', null,
            React.createElement('h1', {className: "text-3xl font-bold mb-2"}, "📊 BAROMÈTRE DE SÉCURITÉ"),
            React.createElement('p', {className: "text-blue-100"}, "EUROHINCA MAROC"),
            React.createElement('p', {className: "text-blue-200 text-sm mt-1"}, `👤 Connecté: ${currentUser}`)
          ),
          React.createElement('div', {className: "flex gap-3 flex-wrap"},
            React.createElement('button', {
              onClick: downloadCSV,
              className: "flex items-center gap-2 bg-white px-4 py-2 rounded-lg transition-colors font-semibold",
              style: {color: COMPANY_COLOR}
            }, "📥 Exporter CSV"),
            React.createElement('button', {
              onClick: handleLogout,
              className: "flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors font-semibold"
            }, "🚪 Déconnexion")
          )
        )
      ),

      React.createElement('div', {className: "bg-white rounded-lg shadow-lg mb-6"},
        React.createElement('div', {className: "flex border-b overflow-x-auto"},
          [
            { id: 'dashboard', label: 'Tableau de bord', icon: '📊' },
            { id: 'add', label: 'Ajouter Événement', icon: '➕' },
            { id: 'list', label: 'Liste Complète', icon: '📋' }
          ].map(tab =>
            React.createElement('button', {
              key: tab.id,
              onClick: () => setActiveTab(tab.id),
              className: `flex items-center gap-2 px-6 py-4 font-semibold transition-colors whitespace-nowrap ${activeTab === tab.id ? 'border-b-4 text-white' : 'text-gray-600 hover:bg-blue-50'}`,
              style: activeTab === tab.id ? {borderColor: COMPANY_COLOR, backgroundColor: COMPANY_COLOR} : {}
            },
              React.createElement('span', null, tab.icon),
              tab.label
            )
          )
        )
      ),

      React.createElement('div', {className: "bg-white rounded-lg shadow-xl p-8"},
        activeTab === 'dashboard' && React.createElement('div', null,
          React.createElement('h2', {className: "text-2xl font-bold text-gray-800 mb-6"}, "📊 Vue d'ensemble"),
          
          React.createElement('div', {className: "grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"},
            React.createElement('div', {
              className: "rounded-lg p-6 text-white",
              style: {background: `linear-gradient(135deg, ${COMPANY_COLOR} 0%, #0077AA 100%)`}
            },
              React.createElement('div', {className: "text-4xl mb-2"}, "📈"),
              React.createElement('h3', {className: "text-3xl font-bold mb-1"}, avgScore.toFixed(1)),
              React.createElement('p', {className: "text-blue-100"}, "Score Moyen")
            ),
            
            React.createElement('div', {className: "bg-gradient-to-br from-green-500 to-green-600 rounded-lg p-6 text-white"},
              React.createElement('div', {className: "text-4xl mb-2"}, "👥"),
              React.createElement('h3', {className: "text-3xl font-bold mb-1"}, WORKERS_LIST.length),
              React.createElement('p', {className: "text-green-100"}, "Travailleurs")
            ),
            
            React.createElement('div', {className: "bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg p-6 text-white"},
              React.createElement('div', {className: "text-4xl mb-2"}, "📝"),
              React.createElement('h3', {className: "text-3xl font-bold mb-1"}, events.length),
              React.createElement('p', {className: "text-purple-100"}, "Événements Total")
            )
          ),

          React.createElement('div', {className: "grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8"},
            React.createElement('div', {
              className: "border-2 rounded-lg p-6",
              style: {borderColor: COMPANY_COLOR}
            },
              React.createElement('h3', {className: "text-xl font-bold text-gray-800 mb-4"}, "🏆 TOP 3 MEILLEURS"),
              React.createElement('div', {className: "space-y-4"},
                getTop3().map((worker, idx) => {
                  const level = getLevel(worker.score);
                  const badges = getBadges(worker.name);
                  const medals = ['🥇', '🥈', '🥉'];
                  return React.createElement('div', {
                    key: worker.name,
                    className: "flex items-center justify-between p-4 rounded-lg border-l-4 cursor-pointer hover:bg-blue-50 transition-colors",
                    style: {borderColor: COMPANY_COLOR, backgroundColor: `${COMPANY_COLOR}10`},
                    onClick: () => setViewingWorker(worker.name)
                  },
                    React.createElement('div', {className: "flex items-center gap-3"},
                      React.createElement('div', {className: "text-4xl"}, medals[idx]),
                      React.createElement('div', null,
                        React.createElement('p', {className: "font-bold text-lg"}, worker.name),
                        React.createElement('p', {className: "text-sm text-gray-600"}, level.label),
                        badges.length > 0 && React.createElement('div', {className: "flex gap-1 mt-1"},
                          badges.slice(0, 3).map((badge, i) => 
                            React.createElement('span', {key: i, className: "text-lg"}, badge.icon)
                          )
                        )
                      )
                    ),
                    React.createElement('div', {className: `${level.color} text-white px-4 py-2 rounded-full font-bold text-xl`},
                      worker.score
                    )
                  );
                })
              )
            ),

            React.createElement('div', {className: "border-2 border-red-300 rounded-lg p-6 bg-red-50"},
              React.createElement('h3', {className: "text-xl font-bold text-red-800 mb-4"}, "⚠️ TOP 10 À RISQUE"),
              React.createElement('div', {className: "space-y-2"},
                getTop10Dangerous().map((worker, idx) => {
                  const level = getLevel(worker.score);
                  return React.createElement('div', {
                    key: worker.name,
                    className: "flex items-center justify-between p-3 bg-white rounded-lg border-l-4 border-red-500 cursor-pointer hover:bg-gray-50 transition-colors",
                    onClick: () => setViewingWorker(worker.name)
                  },
                    React.createElement('div', {className: "flex items-center gap-3"},
                      React.createElement('div', {className: "font-bold text-red-600"}, `#${idx + 1}`),
                      React.createElement('p', {className: "font-semibold text-sm"}, worker.name)
                    ),
                    React.createElement('div', {className: `${level.color} text-white px-3 py-1 rounded-full font-bold`},
                      worker.score
                    )
                  );
                })
              )
            )
          )
        ),

        activeTab === 'add' && React.createElement('div', {className: "max-w-2xl mx-auto"},
          React.createElement('div', {
            className: "border-l-4 p-4 mb-6",
            style: {backgroundColor: `${COMPANY_COLOR}20`, borderColor: COMPANY_COLOR}
          },
            React.createElement('h2', {className: "text-2xl font-bold mb-1", style: {color: COMPANY_COLOR}}, "➕ Ajouter un Événement"),
            React.createElement('p', {className: "text-gray-700"}, "Enregistrer une action sécuritaire ou une infraction")
          ),

          React.createElement('div', {className: "space-y-6"},
            React.createElement('div', null,
              React.createElement('label', {className: "block text-sm font-bold text-gray-700 mb-2"}, "👷 Travailleur"),
              React.createElement('select', {
                value: selectedWorker,
                onChange: (e) => setSelectedWorker(e.target.value),
                className: "w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none",
                style: {borderColor: selectedWorker ? COMPANY_COLOR : '#d1d5db'}
              },
                React.createElement('option', {value: ""}, "Sélectionner un travailleur"),
                WORKERS_LIST.map(worker =>
                  React.createElement('option', {key: worker, value: worker}, worker)
                )
              )
            ),

            React.createElement('div', null,
              React.createElement('label', {className: "block text-sm font-bold text-gray-700 mb-2"}, "Type d'événement"),
              React.createElement('div', {className: "flex gap-4"},
                React.createElement('button', {
                  onClick: () => { setEventType('positive'); setSelectedAction(null); },
                  className: `flex-1 py-3 rounded-lg font-bold transition-colors ${eventType === 'positive' ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700'}`
                }, "✅ Action Positive"),
                React.createElement('button', {
                  onClick: () => { setEventType('negative'); setSelectedAction(null); },
                  className: `flex-1 py-3 rounded-lg font-bold transition-colors ${eventType === 'negative' ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-700'}`
                }, "❌ Infraction")
              )
            ),

            React.createElement('div', null,
              React.createElement('label', {className: "block text-sm font-bold text-gray-700 mb-2"}, "Gravité / Impact"),
              React.createElement('div', {className: "space-y-2"},
                (eventType === 'positive' ? POSITIVE_ACTIONS : NEGATIVE_ACTIONS).map(action =>
                  React.createElement('button', {
                    key: action.value,
                    onClick: () => setSelectedAction(action),
                    className: `w-full text-left p-4 rounded-lg border-2 transition-colors ${selectedAction?.value === action.value ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'}`
                  },
                    React.createElement('div', {className: "flex items-center justify-between mb-1"},
                      React.createElement('span', {className: "font-bold text-lg"}, action.label),
                      React.createElement('span', {
                        className: `px-3 py-1 rounded-full font-bold ${action.value > 0 ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`
                      }, `${action.value > 0 ? '+' : ''}${action.value}`)
                    ),
                    React.createElement('p', {className: "text-sm text-gray-600"}, action.description)
                  )
                )
              )
            ),

            React.createElement('div', null,
              React.createElement('label', {className: "block text-sm font-bold text-gray-700 mb-2"}, "Description (optionnel)"),
              React.createElement('textarea', {
                value: eventDescription,
                onChange: (e) => setEventDescription(e.target.value),
                placeholder: "Détails supplémentaires...",
                rows: 3,
                className: "w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none",
                style: {borderColor: COMPANY_COLOR}
              })
            ),

            statusMessage.text && React.createElement('div', {
              className: `p-4 rounded-lg ${statusMessage.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`
            },
              React.createElement('p', {className: "font-semibold"}, statusMessage.text)
            ),

            React.createElement('button', {
              onClick: handleAddEvent,
              className: "w-full text-white py-4 rounded-lg transition-colors font-bold text-lg",
              style: {backgroundColor: COMPANY_COLOR}
            }, "✓ Enregistrer l'événement")
          )
        ),

        activeTab === 'list' && React.createElement('div', null,
          React.createElement('div', {className: "flex justify-between items-center mb-6 flex-wrap gap-4"},
            React.createElement('h2', {className: "text-2xl font-bold text-gray-800"}, `📋 Liste Complète (${WORKERS_LIST.length} travailleurs)`),
            React.createElement('input', {
              type: "text",
              value: searchTerm,
              onChange: (e) => setSearchTerm(e.target.value),
              placeholder: "🔍 Rechercher un travailleur...",
              className: "px-4 py-2 border-2 rounded-lg",
              style: {borderColor: COMPANY_COLOR}
            })
          ),

          React.createElement('div', {className: "overflow-x-auto"},
            React.createElement('table', {className: "w-full border-collapse"},
              React.createElement('thead', null,
                React.createElement('tr', {
                  className: "text-white",
                  style: {backgroundColor: COMPANY_COLOR}
                },
                  React.createElement('th', {className: "px-4 py-3 text-left"}, "Rang"),
                  React.createElement('th', {className: "px-4 py-3 text-left"}, "Nom"),
                  React.createElement('th', {className: "px-4 py-3 text-center"}, "Score"),
                  React.createElement('th', {className: "px-4 py-3 text-left"}, "Niveau"),
                  React.createElement('th', {className: "px-4 py-3 text-left"}, "Badges"),
                  React.createElement('th', {className: "px-4 py-3 text-left"}, "Derniers Événements")
                )
              ),
              React.createElement('tbody', null,
                getFilteredWorkers().map((worker, idx) => {
                  const level = getLevel(worker.score);
                  const badges = getBadges(worker.name);
                  const workerEvents = getWorkerEvents(worker.name, 3);
                  return React.createElement('tr', {
                    key: worker.name,
                    className: `${idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-blue-50 cursor-pointer transition-colors`,
                    onClick: () => setViewingWorker(worker.name)
                  },
                    React.createElement('td', {className: "px-4 py-3 border font-bold text-center"}, idx + 1),
                    React.createElement('td', {className: "px-4 py-3 border font-semibold"}, worker.name),
                    React.createElement('td', {className: "px-4 py-3 border text-center"},
                      React.createElement('span', {className: `${level.color} text-white px-4 py-2 rounded-full font-bold text-lg`},
                        worker.score
                      )
                    ),
                    React.createElement('td', {className: "px-4 py-3 border"},
                      React.createElement('span', {className: `inline-flex items-center gap-2`},
                        React.createElement('span', null, level.icon),
                        React.createElement('span', {className: "font-semibold"}, level.label)
                      )
                    ),
                    React.createElement('td', {className: "px-4 py-3 border"},
                      badges.length > 0 ? React.createElement('div', {className: "flex gap-1"},
                        badges.slice(0, 4).map((badge, i) =>
                          React.createElement('span', {key: i, className: "text-xl", title: badge.name}, badge.icon)
                        )
                      ) : React.createElement('span', {className: "text-gray-400 text-sm"}, "-")
                    ),
                    React.createElement('td', {className: "px-4 py-3 border"},
                      workerEvents.length > 0 ? React.createElement('div', {className: "space-y-1"},
                        workerEvents.map(event =>
                          React.createElement('div', {
                            key: event.id,
                            className: "text-xs"
                          },
                            React.createElement('span', {
                              className: `font-bold ${event.points > 0 ? 'text-green-600' : 'text-red-600'}`
                            }, `${event.points > 0 ? '+' : ''}${event.points}`),
                            React.createElement('span', {className: "text-gray-600"}, ` - ${event.action}`)
                          )
                        )
                      ) : React.createElement('span', {className: "text-gray-400 text-sm"}, "Aucun événement")
                    )
                  );
                })
              )
            )
          )
        )
      )
    )
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(React.createElement(BarometreSecurite));
