const { useState, useEffect } = React;
const { 
    Clock, Users, FileText, Play, Pause, 
    RotateCcw, Plus, Trash2, Download, Settings, Upload 
} = lucide;

const NetworkingEventPlanner = () => {
    const [participants, setParticipants] = useState([]);
    const [newName, setNewName] = useState('');
    const [newCompany, setNewCompany] = useState('');
    const [numTables, setNumTables] = useState(9);
    const [tableNames, setTableNames] = useState({});
    const [participantsPerTable, setParticipantsPerTable] = useState(4);
    const [tourDuration, setTourDuration] = useState(15);
    const [planning, setPlanning] = useState(null);
    const [currentTour, setCurrentTour] = useState(0);
    const [timeLeft, setTimeLeft] = useState(15 * 60);
    const [isRunning, setIsRunning] = useState(false);
    const [view, setView] = useState('inscription');
    const [showConfig, setShowConfig] = useState(false);

    useEffect(() => {
        let interval;
        if (isRunning && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft(t => t - 1);
            }, 1000);
        } else if (timeLeft === 0 && isRunning) {
            setIsRunning(false);
            alert('Tour terminé ! Passez au tour suivant.');
        }
        return () => clearInterval(interval);
    }, [isRunning, timeLeft]);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const addParticipant = () => {
        if (!newName.trim() || !newCompany.trim()) {
            alert('Veuillez remplir le nom et l\'entreprise');
            return;
        }
        const newP = {
            id: participants.length + 1,
            name: newName.trim(),
            company: newCompany.trim()
        };
        setParticipants([...participants, newP]);
        setNewName('');
        setNewCompany('');
    };

    const removeParticipant = (id) => {
        setParticipants(participants.filter(p => p.id !== id));
        setPlanning(null);
    };

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const data = new Uint8Array(event.target.result);
                const workbook = XLSX.read(data, { type: 'array' });
                const sheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[sheetName];
                const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

                const newParticipants = [];
                for (let i = 1; i < jsonData.length; i++) {
                    const row = jsonData[i];
                    if (row[0] && row[1]) {
                        newParticipants.push({
                            id: participants.length + newParticipants.length + 1,
                            name: String(row[0]).trim(),
                            company: String(row[1]).trim()
                        });
                    }
                }

                if (newParticipants.length > 0) {
                    setParticipants([...participants, ...newParticipants]);
                    alert(`${newParticipants.length} participants importés avec succès !`);
                } else {
                    alert('Aucun participant trouvé dans le fichier. Vérifiez le format : Colonne A = Nom, Colonne B = Entreprise');
                }
            } catch (error) {
                alert('Erreur lors de la lecture du fichier Excel. Vérifiez le format.');
                console.error(error);
            }
        };
        reader.readAsArrayBuffer(file);
        e.target.value = '';
    };

    const getTableName = (idx) => {
        return tableNames[idx] || `Table ${idx + 1}`;
    };

    const generatePlanning = () => {
        const totalSeats = numTables * participantsPerTable;
        
        if (participants.length > totalSeats) {
            alert(`Trop de participants ! Vous avez ${participants.length} participants mais seulement ${totalSeats} places (${numTables} tables × ${participantsPerTable} places)`);
            return;
        }

        if (participants.length < participantsPerTable) {
            alert(`Il faut au moins ${participantsPerTable} participants pour créer un planning.`);
            return;
        }

        const maxToursTheoretical = Math.floor((participants.length - 1) / (participantsPerTable - 1));
        const numTours = Math.min(maxToursTheoretical, 12);

        let tours = [];
        let participantMeetings = Array(participants.length).fill(null).map(() => new Set());

        const isValidPlacement = (table, participantId) => {
            for (let otherId of table) {
                if (participantMeetings[participantId - 1].has(otherId)) {
                    return false;
                }
                if (participants[participantId - 1].company === participants[otherId - 1].company) {
                    return false;
                }
            }
            return true;
        };

        for (let tourNum = 0; tourNum < numTours; tourNum++) {
            let tables = Array(numTables).fill(null).map(() => []);
            let placed = new Set();
            let shuffled = [...Array(participants.length).keys()].map(i => i + 1).sort(() => Math.random() - 0.5);
            let attempts = 0;
            const maxAttempts = 5000;

            while (placed.size < participants.length && attempts < maxAttempts) {
                attempts++;
                
                for (let participantId of shuffled) {
                    if (placed.has(participantId)) continue;

                    let bestTable = -1;
                    let minConflicts = Infinity;

                    for (let tableIdx = 0; tableIdx < numTables; tableIdx++) {
                        if (tables[tableIdx].length < participantsPerTable) {
                            if (isValidPlacement(tables[tableIdx], participantId)) {
                                const conflicts = tables[tableIdx].length;
                                if (conflicts < minConflicts) {
                                    minConflicts = conflicts;
                                    bestTable = tableIdx;
                                }
                            }
                        }
                    }

                    if (bestTable !== -1) {
                        tables[bestTable].push(participantId);
                        placed.add(participantId);
                        
                        for (let otherId of tables[bestTable]) {
                            if (otherId !== participantId) {
                                participantMeetings[participantId - 1].add(otherId);
                                participantMeetings[otherId - 1].add(participantId);
                            }
                        }
                    }
                }

                if (placed.size === participants.length) break;
            }

            if (placed.size < participants.length) {
                alert(`Impossible de placer tous les participants au tour ${tourNum + 1}. Le planning s'arrête à ${tourNum} tours.`);
                break;
            }

            tours.push(tables);
        }

        if (tours.length > 0) {
            setPlanning(tours);
            setView('planning');
            setTimeLeft(tourDuration * 60);
        }
    };
const downloadFiches = () => {
        if (!planning) return;

        let content = 'FICHES RÉCAPITULATIVES - ÉVÉNEMENT NETWORKING\n\n';
        
        participants.forEach(p => {
            content += `${'='.repeat(60)}\n`;
            content += `PARTICIPANT #${p.id}\n`;
            content += `Nom: ${p.name}\n`;
            content += `Entreprise: ${p.company}\n`;
            content += `${'='.repeat(60)}\n\n`;
            
            planning.forEach((tour, idx) => {
                const tableIdx = tour.findIndex(table => table.includes(p.id));
                if (tableIdx !== -1) {
                    content += `Tour ${idx + 1}: ${getTableName(tableIdx)}\n`;
                }
            });
            
            content += `\n\n`;
        });

        const blob = new Blob([content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'fiches_participants.txt';
        a.click();
    };

    const downloadPlanningComplet = () => {
        if (!planning) return;

        let content = 'PLANNING COMPLET - ÉVÉNEMENT NETWORKING\n\n';
        content += `Nombre de participants: ${participants.length}\n`;
        content += `Nombre de tables: ${numTables}\n`;
        content += `Places par table: ${participantsPerTable}\n`;
        content += `Durée par tour: ${tourDuration} minutes\n`;
        content += `Nombre de tours: ${planning.length}\n\n`;
        content += `${'='.repeat(80)}\n\n`;

        planning.forEach((tour, tourIdx) => {
            content += `TOUR ${tourIdx + 1}\n`;
            content += `${'-'.repeat(80)}\n`;
            
            tour.forEach((table, tableIdx) => {
                content += `\n${getTableName(tableIdx)}:\n`;
                table.forEach(pId => {
                    const p = participants.find(pp => pp.id === pId);
                    content += `  - #${pId} ${p?.name} (${p?.company})\n`;
                });
            });
            
            content += `\n${'='.repeat(80)}\n\n`;
        });

        const blob = new Blob([content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'planning_complet.txt';
        a.click();
    };

    const Icon = ({ icon: LucideIcon, ...props }) => {
        return React.createElement(LucideIcon, props);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 p-6">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl font-bold text-purple-900 mb-8 text-center flex items-center justify-center gap-3">
                    <Icon icon={Users} className="w-10 h-10" style={{ color: '#d32869' }} />
                    <span style={{ color: '#7c2a73' }}>Organisateur d'Événement Networking</span>
                </h1>

                {/* Navigation */}
                <div className="flex gap-4 mb-6 justify-center flex-wrap">
                    <button
                        onClick={() => setView('inscription')}
                        className={`px-6 py-3 rounded-lg font-semibold transition ${
                            view === 'inscription' ? 'text-white' : 'bg-white hover:bg-pink-50'
                        }`}
                        style={view === 'inscription' ? { backgroundColor: '#d32869' } : { color: '#7c2a73' }}
                    >
                        <Icon icon={Plus} className="inline w-5 h-5 mr-2" />
                        Inscription ({participants.length})
                    </button>
                    <button
                        onClick={() => setView('planning')}
                        disabled={!planning}
                        className={`px-6 py-3 rounded-lg font-semibold transition ${
                            view === 'planning' && planning ? 'text-white' : 'bg-white hover:bg-pink-50 disabled:opacity-50 disabled:cursor-not-allowed'
                        }`}
                        style={view === 'planning' && planning ? { backgroundColor: '#d32869' } : { color: '#7c2a73' }}
                    >
                        <Icon icon={FileText} className="inline w-5 h-5 mr-2" />
                        Planning
                    </button>
                    <button
                        onClick={() => setView('chrono')}
                        disabled={!planning}
                        className={`px-6 py-3 rounded-lg font-semibold transition ${
                            view === 'chrono' && planning ? 'text-white' : 'bg-white hover:bg-pink-50 disabled:opacity-50 disabled:cursor-not-allowed'
                        }`}
                        style={view === 'chrono' && planning ? { backgroundColor: '#d32869' } : { color: '#7c2a73' }}
                    >
                        <Icon icon={Clock} className="inline w-5 h-5 mr-2" />
                        Chronomètre
                    </button>
                </div>

                {/* Vue Inscription */}
                {view === 'inscription' && (
                    <div className="bg-white rounded-xl shadow-lg p-8">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold" style={{ color: '#7c2a73' }}>Inscrire les participants</h2>
                            <div className="flex gap-3">
                                <label className="text-white px-4 py-2 rounded-lg hover:opacity-90 transition cursor-pointer" style={{ backgroundColor: '#90EE90' }}>
                                    <Icon icon={Upload} className="inline w-5 h-5 mr-2" />
                                    Importer Excel
                                    <input type="file" accept=".xlsx,.xls" onChange={handleFileUpload} className="hidden" />
                                </label>
                                <button
                                    onClick={() => setShowConfig(!showConfig)}
                                    className="text-white px-4 py-2 rounded-lg hover:opacity-90 transition"
                                    style={{ backgroundColor: '#7c2a73' }}
                                >
                                    <Icon icon={Settings} className="inline w-5 h-5 mr-2" />
                                    Configuration
                                </button>
                            </div>
                        </div>

                        {showConfig && (
                            <div className="p-6 rounded-lg mb-6 space-y-4" style={{ backgroundColor: '#f8f0f5' }}>
                                <h3 className="font-bold mb-4" style={{ color: '#7c2a73' }}>Paramètres de l'événement</h3>
                                
                                <div className="grid grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-sm font-semibold mb-2" style={{ color: '#7c2a73' }}>
                                            Nombre de tables (1-50)
                                        </label>
                                        <input
                                            type="number"
                                            min="1"
                                            max="50"
                                            value={numTables}
                                            onChange={(e) => setNumTables(Math.max(1, Math.min(50, parseInt(e.target.value) || 1)))}
                                            className="w-full px-4 py-2 border-2 rounded-lg focus:outline-none"
                                            style={{ borderColor: '#d32869' }}
                                        />
                                    </div>
                                    
                                    <div>
                                        <label className="block text-sm font-semibold mb-2" style={{ color: '#7c2a73' }}>
                                            Participants par table
                                        </label>
                                        <input
                                            type="number"
                                            min="2"
                                            max="20"
                                            value={participantsPerTable}
                                            onChange={(e) => setParticipantsPerTable(Math.max(2, parseInt(e.target.value) || 4))}
                                            className="w-full px-4 py-2 border-2 rounded-lg focus:outline-none"
                                            style={{ borderColor: '#d32869' }}
                                        />
                                    </div>
                                    
                                    <div>
                                        <label className="block text-sm font-semibold mb-2" style={{ color: '#7c2a73' }}>
                                            Durée par tour (minutes)
                                        </label>
                                        <input
                                            type="number"
                                            min="1"
                                            max="120"
                                            value={tourDuration}
                                            onChange={(e) => setTourDuration(Math.max(1, parseInt(e.target.value) || 15))}
                                            className="w-full px-4 py-2 border-2 rounded-lg focus:outline-none"
                                            style={{ borderColor: '#d32869' }}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold mb-2" style={{ color: '#7c2a73' }}>
                                        Noms des tables (optionnel)
                                    </label>
                                    <div className="grid grid-cols-4 gap-2">
                                        {Array.from({ length: numTables }, (_, i) => (
                                            <input
                                                key={i}
                                                type="text"
                                                placeholder={`Table ${i + 1}`}
                                                value={tableNames[i] || ''}
                                                onChange={(e) => setTableNames({ ...tableNames, [i]: e.target.value })}
                                                className="px-3 py-2 border rounded text-sm focus:outline-none"
                                                style={{ borderColor: '#d32869' }}
                                            />
                                        ))}
                                    </div>
                                </div>

                                <div className="text-sm bg-white p-3 rounded" style={{ color: '#7c2a73' }}>
                                    <strong>Info:</strong> Places totales: {numTables * participantsPerTable}
                                </div>
                            </div>
                        )}

                        <div className="flex gap-4 mb-6">
                            <input
                                type="text"
                                value={newName}
                                onChange={(e) => setNewName(e.target.value)}
                                placeholder="Nom du participant"
                                className="flex-1 px-4 py-3 border-2 rounded-lg focus:outline-none"
                                style={{ borderColor: '#d32869' }}
                                onKeyPress={(e) => e.key === 'Enter' && addParticipant()}
                            />
                            <input
                                type="text"
                                value={newCompany}
                                onChange={(e) => setNewCompany(e.target.value)}
                                placeholder="Entreprise"
                                className="flex-1 px-4 py-3 border-2 rounded-lg focus:outline-none"
                                style={{ borderColor: '#d32869' }}
                                onKeyPress={(e) => e.key === 'Enter' && addParticipant()}
                            />
                            <button
                                onClick={addParticipant}
                                className="text-white px-6 py-3 rounded-lg hover:opacity-90 transition font-semibold"
                                style={{ backgroundColor: '#90EE90' }}
                            >
                                <Icon icon={Plus} className="inline w-5 h-5" />
                            </button>
                        </div>

                        <div className="space-y-2 mb-6 max-h-96 overflow-y-auto">
                            {participants.map(p => (
                                <div key={p.id} className="flex items-center gap-4 bg-gray-50 p-4 rounded-lg">
                                    <span className="font-bold w-8" style={{ color: '#d32869' }}>#{p.id}</span>
                                    <span className="flex-1 font-semibold">{p.name}</span>
                                    <span className="text-gray-600">{p.company}</span>
                                    <button onClick={() => removeParticipant(p.id)} className="text-red-600 hover:text-red-800">
                                        <Icon icon={Trash2} className="w-5 h-5" />
                                    </button>
                                </div>
                            ))}
                        </div>

                        {participants.length >= participantsPerTable && (
                            <button
                                onClick={generatePlanning}
                                className="w-full text-white py-4 rounded-lg hover:opacity-90 transition font-bold text-lg"
                                style={{ backgroundColor: '#d32869' }}
                            >
                                🎯 Générer le Planning
                            </button>
                        )}
                    </div>
                )}

                {/* Vue Planning */}
                {view === 'planning' && planning && (
                    <div className="bg-white rounded-xl shadow-lg p-8">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold" style={{ color: '#7c2a73' }}>Planning ({planning.length} tours)</h2>
                            <div className="flex gap-3">
                                <button onClick={downloadFiches} className="text-white px-4 py-2 rounded-lg hover:opacity-90 transition" style={{ backgroundColor: '#90EE90' }}>
                                    <Icon icon={Download} className="inline w-5 h-5 mr-2" />
                                    Fiches Individuelles
                                </button>
                                <button onClick={downloadPlanningComplet} className="text-white px-4 py-2 rounded-lg hover:opacity-90 transition" style={{ backgroundColor: '#d32869' }}>
                                    <Icon icon={Download} className="inline w-5 h-5 mr-2" />
                                    Planning Complet
                                </button>
                            </div>
                        </div>

                        <div className="space-y-6 max-h-[600px] overflow-y-auto">
                            {planning.map((tour, tourIdx) => (
                                <div key={tourIdx} className="border-2 rounded-lg p-6" style={{ borderColor: '#d32869' }}>
                                    <h3 className="text-xl font-bold mb-4" style={{ color: '#7c2a73' }}>Tour {tourIdx + 1}</h3>
                                    <div className="grid grid-cols-3 gap-4">
                                        {tour.map((table, tableIdx) => (
                                            <div key={tableIdx} className="p-4 rounded-lg" style={{ backgroundColor: '#f8f0f5' }}>
                                                <h4 className="font-bold mb-2" style={{ color: '#7c2a73' }}>{getTableName(tableIdx)}</h4>
                                                <ul className="space-y-1 text-sm">
                                                    {table.map(pId => {
                                                        const p = participants.find(pp => pp.id === pId);
                                                        return <li key={pId} className="text-gray-700">#{pId} - {p?.name} ({p?.company})</li>;
                                                    })}
                                                </ul>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Vue Chronomètre */}
                {view === 'chrono' && planning && (
                    <div className="bg-white rounded-xl shadow-lg p-8">
                        <h2 className="text-2xl font-bold mb-6 text-center" style={{ color: '#7c2a73' }}>Gestion des Tours</h2>
                        
                        <div className="text-center mb-8">
                            <div className="text-7xl font-bold mb-4" style={{ color: '#d32869' }}>{formatTime(timeLeft)}</div>
                            <div className="text-2xl font-semibold mb-6" style={{ color: '#7c2a73' }}>Tour {currentTour + 1} / {planning.length}</div>
                            
                            <div className="flex gap-4 justify-center mb-8">
                                <button
                                    onClick={() => setIsRunning(!isRunning)}
                                    className="text-white px-8 py-4 rounded-lg hover:opacity-90 transition font-bold text-lg"
                                    style={{ backgroundColor: '#d32869' }}
                                >
                                    <Icon icon={isRunning ? Pause : Play} className="inline w-6 h-6 mr-2" />
                                    {isRunning ? 'Pause' : 'Démarrer'}
                                </button>
                                <button
                                    onClick={() => setTimeLeft(tourDuration * 60)}
                                    className="text-white px-8 py-4 rounded-lg hover:opacity-90 transition font-bold text-lg"
                                    style={{ backgroundColor: '#7c2a73' }}
                                >
                                    <Icon icon={RotateCcw} className="inline w-6 h-6 mr-2" />
                                    Réinitialiser
                                </button>
                            </div>

                            <div className="flex gap-4 justify-center">
                                <button
                                    onClick={() => {
                                        if (currentTour > 0) {
                                            setCurrentTour(currentTour - 1);
                                            setTimeLeft(tourDuration * 60);
                                            setIsRunning(false);
                                        }
                                    }}
                                    disabled={currentTour === 0}
                                    className="text-white px-6 py-3 rounded-lg hover:opacity-90 transition font-semibold disabled:opacity-50"
                                    style={{ backgroundColor: '#7c2a73' }}
                                >
                                    ← Tour Précédent
                                </button>
                                <button
                                    onClick={() => {
                                        if (currentTour < planning.length - 1) {
                                            setCurrentTour(currentTour + 1);
                                            setTimeLeft(tourDuration * 60);
                                            setIsRunning(false);
                                        }
                                    }}
                                    disabled={currentTour === planning.length - 1}
                                    className="text-white px-6 py-3 rounded-lg hover:opacity-90 transition font-semibold disabled:opacity-50"
                                    style={{ backgroundColor: '#7c2a73' }}
                                >
                                    Tour Suivant →
                                </button>
                            </div>
                        </div>

                        <div className="border-t-2 pt-6" style={{ borderColor: '#d32869' }}>
                            <h3 className="text-xl font-bold mb-4" style={{ color: '#7c2a73' }}>Tour {currentTour + 1}</h3>
                            <div className="grid grid-cols-3 gap-4">
                                {planning[currentTour].map((table, tableIdx) => (
                                    <div key={tableIdx} className="p-4 rounded-lg" style={{ backgroundColor: '#f8f0f5' }}>
                                        <h4 className="font-bold mb-2" style={{ color: '#7c2a73' }}>{getTableName(tableIdx)}</h4>
                                        <ul className="space-y-1 text-sm">
                                            {table.map(pId => {
                                                const p = participants.find(pp => pp.id === pId);
                                                return <li key={pId} className="text-gray-700">#{pId} - {p?.name}</li>;
                                            })}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<NetworkingEventPlanner />);

