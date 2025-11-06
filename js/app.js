// ============================================
// IMPORTS REACT
// ============================================
const { useState, useEffect, useRef } = React;

// ============================================
// CONFIGURATION
// ============================================
const LOGO_PATH = "img/logo-aperos.png";
const COLORS = {
    primary: '#d32869',
    secondary: '#7c2a73',
    success: '#90EE90'
};

// ============================================
// ICÔNES SVG (pas besoin de Lucide)
// ============================================
const Icons = {
    Users: () => (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
    ),
    Plus: (props) => (
        <svg className={props.className || "w-5 h-5"} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
    ),
    FileText: (props) => (
        <svg className={props.className || "w-5 h-5"} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
    ),
    Clock: (props) => (
        <svg className={props.className || "w-5 h-5"} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
    ),
    Settings: (props) => (
        <svg className={props.className || "w-5 h-5"} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
    ),
    Upload: (props) => (
        <svg className={props.className || "w-5 h-5"} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
        </svg>
    ),
    Download: (props) => (
        <svg className={props.className || "w-5 h-5"} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        </svg>
    ),
    Trash2: (props) => (
        <svg className={props.className || "w-5 h-5"} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
    ),
    Play: (props) => (
        <svg className={props.className || "w-6 h-6"} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
    ),
    Pause: (props) => (
        <svg className={props.className || "w-6 h-6"} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
    ),
    RotateCcw: (props) => (
        <svg className={props.className || "w-6 h-6"} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
    ),
    RefreshCw: (props) => (
        <svg className={props.className || "w-5 h-5"} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
    )
};

// ============================================
// COMPOSANT PRINCIPAL
// ============================================
const NetworkingEventPlanner = () => {
    // === ÉTATS DE BASE ===
    // Gestion de la liste des participants
    const [participants, setParticipants] = useState([]);
    const [newName, setNewName] = useState('');
    const [newCompany, setNewCompany] = useState('');
    
    // Configuration des tables
    const [numTables, setNumTables] = useState(9);
    const [tableNames, setTableNames] = useState({});
    const [participantsPerTable, setParticipantsPerTable] = useState(4);
    
    // === ÉTATS POUR LA DURÉE ===
    // Durée de présentation de chaque participant (minutes + secondes)
    const [presentationMinutes, setPresentationMinutes] = useState(4);
    const [presentationSeconds, setPresentationSeconds] = useState(0);
    
    // Durée de la pause entre chaque chronomètre (en secondes)
    const [pauseSeconds, setPauseSeconds] = useState(0);
    
    // Configuration du nombre de tours
    const [maxTours, setMaxTours] = useState('');
    
    // Gestion du planning généré
    const [planning, setPlanning] = useState(null);
    const [currentTour, setCurrentTour] = useState(0);
    
    // Gestion du chronomètre
    const [timeLeft, setTimeLeft] = useState(4 * 60);
    const [isRunning, setIsRunning] = useState(false);
    
    // Navigation entre les vues
    const [view, setView] = useState('inscription');
    const [showConfig, setShowConfig] = useState(false);
    
    // === ÉTATS POUR SONS ET MESSAGES ===
    // Messages globaux affichés au début et à la fin du tour
    const [startText, setStartText] = useState('');
    const [endText, setEndText] = useState('');
    const [showNotification, setShowNotification] = useState(false);
    const [notificationText, setNotificationText] = useState('');
    
    // === ÉTATS POUR SONS PAR CHRONOMÈTRE ===
    // Chaque chronomètre (participant) a son propre son de début et de fin
    const [chronoStartSounds, setChronoStartSounds] = useState({});
    const [chronoEndSounds, setChronoEndSounds] = useState({});
    
    // === REF POUR TRACKING DU CHRONO ACTIF ===
    // Permet de savoir quel chronomètre était actif précédemment
    const previousActiveChronoRef = useRef(-1);

    // ============================================
    // FONCTIONS DE CALCUL
    // ============================================
    
    /**
     * Calcule la durée totale de présentation en secondes
     * @returns {number} Durée en secondes
     */
    const getTotalPresentationSeconds = () => {
        return (presentationMinutes * 60) + presentationSeconds;
    };

    /**
     * Calcule la durée totale (présentation + pause) en secondes
     * @returns {number} Durée totale en secondes
     */
   // La pause est maintenant un chronomètre séparé
    const getTotalTimeWithPause = () => {
    return getTotalPresentationSeconds();
    };

// Calcul du temps total incluant toutes les pauses
    const getTotalTimeForTour = () => {
    return (participantsPerTable * getTotalPresentationSeconds()) + ((participantsPerTable - 1) * pauseSeconds);
    };

    // ============================================
    // GESTION DES SONS PAR CHRONOMÈTRE
    // ============================================
    
    /**
     * Gère l'upload du son de début pour un chronomètre spécifique
     * @param {number} chronoIndex - Index du chronomètre (0-based)
     * @param {Event} e - Event de l'input file
     */
    const handleChronoStartSoundUpload = (chronoIndex, e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith('audio/')) {
            const url = URL.createObjectURL(file);
            setChronoStartSounds(prev => ({ ...prev, [chronoIndex]: url }));
        } else if (file) {
            alert('Veuillez sélectionner un fichier audio');
        }
    };

    /**
     * Gère l'upload du son de fin pour un chronomètre spécifique
     * @param {number} chronoIndex - Index du chronomètre (0-based)
     * @param {Event} e - Event de l'input file
     */
    const handleChronoEndSoundUpload = (chronoIndex, e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith('audio/')) {
            const url = URL.createObjectURL(file);
            setChronoEndSounds(prev => ({ ...prev, [chronoIndex]: url }));
        } else if (file) {
            alert('Veuillez sélectionner un fichier audio');
        }
    };

    // ============================================
    // EFFET POUR LE CHRONOMÈTRE
    // ============================================
    
    /**
     * Gère le compte à rebours du chronomètre
     * Déclenche les sons et détecte les changements de chronomètre
     */
    useEffect(() => {
    let interval;
    
    if (isRunning && timeLeft > 0) {
        interval = setInterval(() => {
            setTimeLeft(t => {
                const newTime = t - 1;
                
                // Calculer dans quel segment on se trouve
                const totalPresentationSec = getTotalPresentationSeconds();
                const segmentDuration = totalPresentationSec + pauseSeconds;
                
                // Temps écoulé depuis le début
                const elapsedTime = getTotalTimeForTour() - newTime;
                
                // Dans quel segment sommes-nous ?
                const currentSegment = Math.floor(elapsedTime / segmentDuration);
                const timeInSegment = elapsedTime % segmentDuration;
                
                // Est-on en pause ou en présentation ?
                const isInPresentation = timeInSegment < totalPresentationSec;
                const isInPause = timeInSegment >= totalPresentationSec;
                
                // Détection des transitions
                if (isInPresentation && currentSegment !== previousActiveChronoRef.current) {
                    // Début d'une nouvelle présentation
                    const startSound = chronoStartSounds[currentSegment];
                    if (startSound) {
                        const audio = new Audio(startSound);
                        audio.volume = 0.7;
                        audio.play().catch(e => console.log('Erreur son début:', e));
                    }
                    previousActiveChronoRef.current = currentSegment;
                }
                
                // Détection de la fin d'une présentation (début de pause)
                if (timeInSegment === totalPresentationSec && currentSegment < participantsPerTable) {
                    const endSound = chronoEndSounds[currentSegment];
                    if (endSound) {
                        const audio = new Audio(endSound);
                        audio.volume = 0.7;
                        audio.play().catch(e => console.log('Erreur son fin:', e));
                    }
                }
                
                return newTime;
            });
        }, 1000);
    } 
    else if (timeLeft === 0 && isRunning) {
        setIsRunning(false);
        
        // Son de fin du dernier participant
        const lastChronoIndex = participantsPerTable - 1;
        const endSound = chronoEndSounds[lastChronoIndex];
        if (endSound) {
            const audio = new Audio(endSound);
            audio.volume = 0.7;
            audio.play().catch(e => console.log('Erreur son fin:', e));
        }
        
        if (endText) {
            setNotificationText(endText);
            setShowNotification(true);
            setTimeout(() => setShowNotification(false), 3000);
        }
        
        setTimeout(() => alert('Tour terminé ! Passez au tour suivant.'), 100);
        previousActiveChronoRef.current = -1;
    }
    
    return () => clearInterval(interval);
}, [isRunning, timeLeft, endText, chronoStartSounds, chronoEndSounds, participantsPerTable, pauseSeconds]);

    // ============================================
    // FONCTIONS UTILITAIRES
    // ============================================
    
    /**
     * Formate un nombre de secondes en MM:SS
     * @param {number} seconds - Nombre de secondes
     * @returns {string} Format MM:SS
     */
    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    /**
     * Récupère le nom d'une table (personnalisé ou par défaut)
     * @param {number} idx - Index de la table
     * @returns {string} Nom de la table
     */
    const getTableName = (idx) => tableNames[idx] || `Table ${idx + 1}`;

    // ============================================
    // GESTION DU CHRONOMÈTRE
    // ============================================
    
    /**
     * Démarre ou met en pause le chronomètre
     * Joue le texte et le son de début lors du démarrage
     */
    const handleStartTimer = () => {
        if (!isRunning) {
            // Texte de début global
            if (startText) {
                setNotificationText(startText);
                setShowNotification(true);
                setTimeout(() => setShowNotification(false), 3000);
            }
            
            // Son de début du premier chronomètre
            const firstChronoSound = chronoStartSounds[0];
            if (firstChronoSound) {
                const audio = new Audio(firstChronoSound);
                audio.volume = 0.7;
                audio.play().catch(e => console.log('Erreur son début:', e));
            }
            
            previousActiveChronoRef.current = 0;
        }
        setIsRunning(!isRunning);
    };

    // ============================================
    // GESTION DES PARTICIPANTS
    // ============================================
    
    /**
     * Ajoute un nouveau participant à la liste
     * Valide que le nom et l'entreprise sont remplis
     */
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

    /**
     * Supprime un participant et recalcule les IDs
     * Réinitialise le planning pour forcer un nouveau calcul
     * @param {number} id - ID du participant à supprimer
     */
    const removeParticipant = (id) => {
        const updatedParticipants = participants
            .filter(p => p.id !== id)
            .map((p, index) => ({ ...p, id: index + 1 }));
        
        setParticipants(updatedParticipants);
        setPlanning(null);
    };

    /**
     * Recalcule le planning avec la liste actuelle de participants
     * Vérifie qu'il y a assez de participants avant de recalculer
     */
    const recalculatePlanning = () => {
        if (participants.length < participantsPerTable) {
            alert(`Il faut au moins ${participantsPerTable} participants.`);
            return;
        }
        setPlanning(null);
        setTimeout(() => generatePlanning(), 100);
    };
    // ============================================
    // IMPORT EXCEL
    // ============================================
    
    /**
     * Gère l'import d'un fichier Excel contenant les participants
     * Format attendu : Colonne A = Nom, Colonne B = Entreprise
     * @param {Event} e - Event de l'input file
     */
    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                // Lecture du fichier Excel
                const data = new Uint8Array(event.target.result);
                const workbook = XLSX.read(data, { type: 'array' });
                const sheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[sheetName];
                const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

                // Extraction des participants (ignore la première ligne = en-têtes)
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

                // Ajout des participants importés
                if (newParticipants.length > 0) {
                    setParticipants([...participants, ...newParticipants]);
                    alert(`${newParticipants.length} participants importés !`);
                } else {
                    alert('Aucun participant trouvé.');
                }
            } catch (error) {
                alert('Erreur lors de la lecture du fichier Excel.');
                console.error(error);
            }
        };
        reader.readAsArrayBuffer(file);
        e.target.value = '';
    };

    // ============================================
    // GÉNÉRATION DU PLANNING
    // ============================================
    
    /**
     * Génère un planning optimal pour l'événement networking
     * Respecte les contraintes :
     * - Aucun participant ne rencontre la même personne 2 fois
     * - Aucun collègue de la même entreprise à la même table
     */
    const generatePlanning = () => {
        const totalSeats = numTables * participantsPerTable;
        
        // Validation : Trop de participants ?
        if (participants.length > totalSeats) {
            alert(`Trop de participants ! ${participants.length} participants pour ${totalSeats} places`);
            return;
        }

        // Validation : Assez de participants ?
        if (participants.length < participantsPerTable) {
            alert(`Il faut au moins ${participantsPerTable} participants.`);
            return;
        }

        // Calcul du nombre de tours possible
        const maxToursTheoretical = Math.floor((participants.length - 1) / (participantsPerTable - 1));
        const numTours = maxTours && parseInt(maxTours) > 0 
            ? Math.min(parseInt(maxTours), maxToursTheoretical) 
            : Math.min(maxToursTheoretical, 12);

        let tours = [];
        // Suivi des rencontres entre participants
        let participantMeetings = Array(participants.length).fill(null).map(() => new Set());

        /**
         * Vérifie si un participant peut être placé à une table
         * @param {Array} table - Liste des IDs déjà à la table
         * @param {number} participantId - ID du participant à placer
         * @returns {boolean} true si le placement est valide
         */
        const isValidPlacement = (table, participantId) => {
            for (let otherId of table) {
                // Vérifier : déjà rencontré ?
                if (participantMeetings[participantId - 1].has(otherId)) return false;
                // Vérifier : même entreprise ?
                if (participants[participantId - 1].company === participants[otherId - 1].company) return false;
            }
            return true;
        };

        // Génération tour par tour
        for (let tourNum = 0; tourNum < numTours; tourNum++) {
            let tables = Array(numTables).fill(null).map(() => []);
            let placed = new Set();
            let shuffled = [...Array(participants.length).keys()].map(i => i + 1).sort(() => Math.random() - 0.5);
            let attempts = 0;
            const maxAttempts = 5000;

            // Placement des participants
            while (placed.size < participants.length && attempts < maxAttempts) {
                attempts++;
                
                for (let participantId of shuffled) {
                    if (placed.has(participantId)) continue;

                    let bestTable = -1;
                    let minConflicts = Infinity;

                    // Trouver la meilleure table pour ce participant
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

                    // Placer le participant à la meilleure table trouvée
                    if (bestTable !== -1) {
                        tables[bestTable].push(participantId);
                        placed.add(participantId);
                        
                        // Enregistrer les rencontres
                        for (let otherId of tables[bestTable]) {
                            if (otherId !== participantId) {
                                participantMeetings[participantId - 1].add(otherId);
                                participantMeetings[otherId - 1].add(participantId);
                            }
                        }
                    }
                }

                // Si tous les participants sont placés, passer au tour suivant
                if (placed.size === participants.length) break;
            }

            // Vérifier que tous les participants ont été placés
            if (placed.size < participants.length) {
                alert(`Planning arrêté à ${tourNum} tours.`);
                break;
            }

            tours.push(tables);
        }

        // Finalisation : Sauvegarder le planning et passer à la vue planning
        if (tours.length > 0) {
            setPlanning(tours);
            setView('planning');
            setTimeLeft(getTotalTimeForTour());
            previousActiveChronoRef.current = -1;
        }
    };

    // ============================================
    // TÉLÉCHARGEMENT DES FICHIERS
    // ============================================
    
    /**
     * Télécharge les fiches individuelles de chaque participant
     * Chaque fiche indique à quelle table se rendre pour chaque tour
     */
    const downloadFiches = () => {
        if (!planning) return;
        let content = 'FICHES RÉCAPITULATIVES - ÉVÉNEMENT NETWORKING\n\n';
        
        // Générer une fiche par participant
        participants.forEach(p => {
            content += `${'='.repeat(60)}\n`;
            content += `PARTICIPANT #${p.id}\n`;
            content += `Nom: ${p.name}\n`;
            content += `Entreprise: ${p.company}\n`;
            content += `${'='.repeat(60)}\n\n`;
            
            // Lister les tables pour chaque tour
            planning.forEach((tour, idx) => {
                const tableIdx = tour.findIndex(table => table.includes(p.id));
                if (tableIdx !== -1) {
                    content += `Tour ${idx + 1}: ${getTableName(tableIdx)}\n`;
                }
            });
            
            content += `\n\n`;
        });

        // Télécharger le fichier
        const blob = new Blob([content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'fiches_participants.txt';
        a.click();
    };

    /**
     * Télécharge le planning complet de l'événement
     * Contient tous les tours avec la répartition par table
     */
    const downloadPlanningComplet = () => {
        if (!planning) return;
        const totalSeconds = getTotalPresentationSeconds();
        const mins = Math.floor(totalSeconds / 60);
        const secs = totalSeconds % 60;
        
        // En-tête du fichier
        let content = `PLANNING COMPLET - ÉVÉNEMENT NETWORKING\n\n`;
        content += `Participants: ${participants.length}\n`;
        content += `Tables: ${numTables}\n`;
        content += `Places/table: ${participantsPerTable}\n`;
        content += `Durée présentation: ${mins}min ${secs}s\n`;
        content += `Pause entre chronos: ${pauseSeconds}s\n`;
        content += `Tours: ${planning.length}\n\n`;
        content += `${'='.repeat(80)}\n\n`;

        // Détail de chaque tour
        planning.forEach((tour, tourIdx) => {
            content += `TOUR ${tourIdx + 1}\n`;
            content += `${'-'.repeat(80)}\n`;
            
            // Détail de chaque table
            tour.forEach((table, tableIdx) => {
                content += `\n${getTableName(tableIdx)}:\n`;
                table.forEach(pId => {
                    const p = participants.find(pp => pp.id === pId);
                    content += `  - ${p?.company} | ${p?.name}\n`;
                });
            });
            
            content += `\n${'='.repeat(80)}\n\n`;
        });

        // Télécharger le fichier
        const blob = new Blob([content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'planning_complet.txt';
        a.click();
    };

    // ============================================
    // RENDU DU COMPOSANT - STRUCTURE PRINCIPALE
    // ============================================
    
    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 p-6">
            {/* Bannière de notification (messages début/fin) */}
            {showNotification && (
                <div className="notification-banner" style={{color: COLORS.primary}}>
                    {notificationText}
                </div>
            )}

            <div className="max-w-7xl mx-auto">
                {/* ============================================
                    EN-TÊTE AVEC LOGO
                    ============================================ */}
                <h1 className="text-4xl font-bold text-purple-900 mb-8 text-center flex items-center justify-center gap-3">
                    <img src={LOGO_PATH} alt="Logo Les Apéros Impromptu" className="w-16 h-16 object-contain" />
                    <span style={{color: COLORS.secondary}}>Organisateur d'Événement Networking</span>
                </h1>

                {/* ============================================
                    NAVIGATION ENTRE LES VUES
                    ============================================ */}
                <div className="flex gap-4 mb-6 justify-center flex-wrap">
                    {/* Bouton Inscription */}
                    <button 
                        onClick={() => setView('inscription')} 
                        className={`px-6 py-3 rounded-lg font-semibold transition ${view==='inscription'?'text-white':'bg-white hover:bg-pink-50'}`} 
                        style={view==='inscription'?{backgroundColor: COLORS.primary}:{color: COLORS.secondary}}
                    >
                        <Icons.Plus className="inline w-5 h-5 mr-2" />
                        Inscription ({participants.length})
                    </button>
                    
                    {/* Bouton Planning */}
                    <button 
                        onClick={() => setView('planning')} 
                        disabled={!planning} 
                        className={`px-6 py-3 rounded-lg font-semibold transition ${view==='planning'&&planning?'text-white':'bg-white hover:bg-pink-50 disabled:opacity-50 disabled:cursor-not-allowed'}`} 
                        style={view==='planning'&&planning?{backgroundColor: COLORS.primary}:{color: COLORS.secondary}}
                    >
                        <Icons.FileText className="inline w-5 h-5 mr-2" />
                        Planning
                    </button>
                    
                    {/* Bouton Chronomètre */}
                    <button 
                        onClick={() => setView('chrono')} 
                        disabled={!planning} 
                        className={`px-6 py-3 rounded-lg font-semibold transition ${view==='chrono'&&planning?'text-white':'bg-white hover:bg-pink-50 disabled:opacity-50 disabled:cursor-not-allowed'}`} 
                        style={view==='chrono'&&planning?{backgroundColor: COLORS.primary}:{color: COLORS.secondary}}
                    >
                        <Icons.Clock className="inline w-5 h-5 mr-2" />
                        Chronomètre
                    </button>
                </div>
                {/* ============================================
                    VUE INSCRIPTION
                    ============================================ */}
                {view==='inscription' && (
                    <div className="bg-white rounded-xl shadow-lg p-8">
                        {/* En-tête de la vue inscription */}
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold" style={{color: COLORS.secondary}}>Inscrire les participants</h2>
                            <div className="flex gap-3">
                                {/* Bouton Import Excel */}
                                <label className="text-white px-4 py-2 rounded-lg hover:opacity-90 transition cursor-pointer" style={{backgroundColor: COLORS.success}}>
                                    <Icons.Upload className="inline w-5 h-5 mr-2" />
                                    Importer Excel
                                    <input type="file" accept=".xlsx,.xls" onChange={handleFileUpload} className="hidden" />
                                </label>
                                
                                {/* Bouton Configuration */}
                                <button onClick={() => setShowConfig(!showConfig)} className="text-white px-4 py-2 rounded-lg hover:opacity-90 transition" style={{backgroundColor: COLORS.secondary}}>
                                    <Icons.Settings className="inline w-5 h-5 mr-2" />
                                    Configuration
                                </button>
                            </div>
                        </div>

                        {/* ============================================
                            PANNEAU DE CONFIGURATION
                            ============================================ */}
                        {showConfig && (
                            <div className="p-6 rounded-lg mb-6 space-y-4" style={{backgroundColor:'#f8f0f5'}}>
                                <h3 className="font-bold mb-4" style={{color: COLORS.secondary}}>Paramètres de l'événement</h3>
                                
                                {/* Paramètres principaux : Tables, Participants, Durée, Pause */}
                                <div className="grid grid-cols-4 gap-4">
                                    {/* Nombre de tables */}
                                    <div>
                                        <label className="block text-sm font-semibold mb-2" style={{color: COLORS.secondary}}>Nombre de tables (1-50)</label>
                                        <input 
                                            type="number" 
                                            min="1" 
                                            max="50" 
                                            value={numTables} 
                                            onChange={(e)=>setNumTables(Math.max(1,Math.min(50,parseInt(e.target.value)||1)))} 
                                            className="w-full px-4 py-2 border-2 rounded-lg focus:outline-none" 
                                            style={{borderColor: COLORS.primary}} 
                                        />
                                    </div>
                                    
                                    {/* Participants par table */}
                                    <div>
                                        <label className="block text-sm font-semibold mb-2" style={{color: COLORS.secondary}}>Participants par table</label>
                                        <input 
                                            type="number" 
                                            min="2" 
                                            max="20" 
                                            value={participantsPerTable} 
                                            onChange={(e)=>setParticipantsPerTable(Math.max(2,parseInt(e.target.value)||4))} 
                                            className="w-full px-4 py-2 border-2 rounded-lg focus:outline-none" 
                                            style={{borderColor: COLORS.primary}} 
                                        />
                                    </div>
                                    
                                    {/* Durée de présentation (minutes et secondes) */}
                                    <div>
                                        <label className="block text-sm font-semibold mb-2" style={{color: COLORS.secondary}}>Durée présentation</label>
                                        <div className="flex gap-2">
                                            <div className="flex-1">
                                                <input 
                                                    type="number" 
                                                    min="0" 
                                                    max="60" 
                                                    value={presentationMinutes} 
                                                    onChange={(e)=>setPresentationMinutes(Math.max(0,parseInt(e.target.value)||0))} 
                                                    className="w-full px-3 py-2 border-2 rounded-lg focus:outline-none text-center" 
                                                    style={{borderColor: COLORS.primary}} 
                                                />
                                                <span className="text-xs block text-center mt-1">min</span>
                                            </div>
                                            <div className="flex-1">
                                                <input 
                                                    type="number" 
                                                    min="0" 
                                                    max="59" 
                                                    value={presentationSeconds} 
                                                    onChange={(e)=>setPresentationSeconds(Math.max(0,Math.min(59,parseInt(e.target.value)||0)))} 
                                                    className="w-full px-3 py-2 border-2 rounded-lg focus:outline-none text-center" 
                                                    style={{borderColor: COLORS.primary}} 
                                                />
                                                <span className="text-xs block text-center mt-1">sec</span>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    {/* Pause entre les chronomètres */}
                                    <div>
                                        <label className="block text-sm font-semibold mb-2" style={{color: COLORS.secondary}}>Pause entre chronos (sec)</label>
                                        <input 
                                            type="number" 
                                            min="0" 
                                            max="60" 
                                            value={pauseSeconds} 
                                            onChange={(e)=>setPauseSeconds(Math.max(0,Math.min(60,parseInt(e.target.value)||0)))} 
                                            className="w-full px-4 py-2 border-2 rounded-lg focus:outline-none text-center" 
                                            style={{borderColor: COLORS.primary}} 
                                        />
                                        <span className="text-xs block text-center mt-1 text-gray-500">0 = pas de pause</span>
                                    </div>
                                </div>

                                {/* Durée tour complet (calculée automatiquement) */}
                                <div className="grid grid-cols-1 gap-4">
                                    <div>
                                        <label className="block text-sm font-semibold mb-2" style={{color: COLORS.secondary}}>Durée tour complet</label>
                                        <div className="w-full px-4 py-2 border-2 rounded-lg bg-gray-100 font-bold text-center" style={{borderColor: COLORS.primary, color: COLORS.primary}}>
                                            {Math.floor(getTotalTimeForTour() / 60)} min {getTotalTimeForTour() % 60} sec
                                            {pauseSeconds > 0 && (
    <span className="block text-xs mt-1 font-normal text-gray-600">
        (incluant {participantsPerTable - 1} pauses de {pauseSeconds}s = {(participantsPerTable - 1) * pauseSeconds}s de pause totale)
    </span>
)}
                                        </div>
                                    </div>
                                </div>

                                {/* Nombre de tours personnalisé */}
                                <div className="grid grid-cols-1 gap-4">
                                    <div>
                                        <label className="block text-sm font-semibold mb-2" style={{color: COLORS.secondary}}>
                                            Nombre de tours (optionnel - laisser vide pour calcul auto)
                                        </label>
                                        <input 
                                            type="number" 
                                            min="1" 
                                            max="20" 
                                            value={maxTours} 
                                            onChange={(e)=>setMaxTours(e.target.value)} 
                                            placeholder="Calcul automatique"
                                            className="w-full px-4 py-2 border-2 rounded-lg focus:outline-none" 
                                            style={{borderColor: COLORS.primary}} 
                                        />
                                    </div>
                                </div>

                                {/* Messages globaux (début et fin du tour) */}
                                <div className="border-t-2 pt-4 mt-4" style={{borderColor: COLORS.primary}}>
                                    <h4 className="font-bold mb-3" style={{color: COLORS.secondary}}>Messages globaux</h4>
                                    
                                    <div className="grid grid-cols-2 gap-6">
                                        {/* Message de démarrage du tour */}
                                        <div>
                                            <label className="block text-xs mb-1 text-gray-600">Texte au démarrage du tour</label>
                                            <input 
                                                type="text" 
                                                value={startText}
                                                onChange={(e)=>setStartText(e.target.value)}
                                                placeholder="Ex: C'est parti !"
                                                className="w-full px-3 py-2 border rounded text-sm"
                                                style={{borderColor: COLORS.primary}}
                                            />
                                        </div>
                                        
                                        {/* Message de fin du tour */}
                                        <div>
                                            <label className="block text-xs mb-1 text-gray-600">Texte à la fin du tour</label>
                                            <input 
                                                type="text" 
                                                value={endText}
                                                onChange={(e)=>setEndText(e.target.value)}
                                                placeholder="Ex: Tour terminé !"
                                                className="w-full px-3 py-2 border rounded text-sm"
                                                style={{borderColor: COLORS.primary}}
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Sons individuels par chronomètre */}
                                <div className="border-t-2 pt-4 mt-4" style={{borderColor: COLORS.primary}}>
                                    <h4 className="font-bold mb-3" style={{color: COLORS.secondary}}>Sons individuels par chronomètre</h4>
                                    <p className="text-sm text-gray-600 mb-4">
                                        Configurez un son différent pour le début et la fin de chaque participant
                                    </p>
                                    
                                    {/* Liste scrollable des configurations de sons */}
                                    <div className="space-y-4 max-h-96 overflow-y-auto">
                                        {Array.from({length: participantsPerTable}, (_, i) => (
                                            <div key={i} className="bg-white p-4 rounded-lg border" style={{borderColor: COLORS.primary}}>
                                                <h5 className="font-semibold mb-3" style={{color: COLORS.secondary}}>Participant {i + 1}</h5>
                                                <div className="grid grid-cols-2 gap-3">
                                                    {/* Son de début du chronomètre */}
                                                    <div>
                                                        <label className="block text-xs mb-1 text-gray-600">Son de début</label>
                                                        <input 
                                                            type="file" 
                                                            accept="audio/*" 
                                                            onChange={(e) => handleChronoStartSoundUpload(i, e)}
                                                            className="w-full px-2 py-1 border rounded text-xs"
                                                            style={{borderColor: COLORS.primary}}
                                                        />
                                                        {chronoStartSounds[i] && <span className="text-xs text-green-600">✓ Configuré</span>}
                                                    </div>
                                                    
                                                    {/* Son de fin du chronomètre */}
                                                    <div>
                                                        <label className="block text-xs mb-1 text-gray-600">Son de fin</label>
                                                        <input 
                                                            type="file" 
                                                            accept="audio/*" 
                                                            onChange={(e) => handleChronoEndSoundUpload(i, e)}
                                                            className="w-full px-2 py-1 border rounded text-xs"
                                                            style={{borderColor: COLORS.primary}}
                                                        />
                                                        {chronoEndSounds[i] && <span className="text-xs text-green-600">✓ Configuré</span>}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Noms personnalisés des tables */}
                                <div>
                                    <label className="block text-sm font-semibold mb-2" style={{color: COLORS.secondary}}>
                                        Noms des tables (optionnel)
                                    </label>
                                    <div className="grid grid-cols-4 gap-2">
                                        {Array.from({length:numTables},(_,i)=>(
                                            <input 
                                                key={i} 
                                                type="text" 
                                                placeholder={`Table ${i+1}`} 
                                                value={tableNames[i]||''} 
                                                onChange={(e)=>setTableNames({...tableNames,[i]:e.target.value})} 
                                                className="px-3 py-2 border rounded text-sm focus:outline-none" 
                                                style={{borderColor: COLORS.primary}} 
                                            />
                                        ))}
                                    </div>
                                </div>

                                {/* Informations récapitulatives */}
                                <div className="text-sm bg-white p-3 rounded" style={{color: COLORS.secondary}}>
                                    <strong>Info:</strong> Participants: {participants.length} | 
                                    Places: {numTables*participantsPerTable} | 
                                    Durée présentation: {presentationMinutes}min {presentationSeconds}s | 
                                    Pause: {pauseSeconds}s | 
                                    Durée tour: {Math.floor(getTotalTimeForTour() / 60)}min {getTotalTimeForTour() % 60}s
                                </div>
                            </div>
                        )}

                        {/* ============================================
                            FORMULAIRE D'AJOUT DE PARTICIPANT
                            ============================================ */}
                        <div className="flex gap-4 mb-6">
                            {/* Champ Nom */}
                            <input 
                                type="text" 
                                value={newName} 
                                onChange={(e)=>setNewName(e.target.value)} 
                                placeholder="Nom du participant" 
                                className="flex-1 px-4 py-3 border-2 rounded-lg focus:outline-none" 
                                style={{borderColor: COLORS.primary}} 
                                onKeyPress={(e)=>e.key==='Enter'&&addParticipant()} 
                            />
                            
                            {/* Champ Entreprise */}
                            <input 
                                type="text" 
                                value={newCompany} 
                                onChange={(e)=>setNewCompany(e.target.value)} 
                                placeholder="Entreprise" 
                                className="flex-1 px-4 py-3 border-2 rounded-lg focus:outline-none" 
                                style={{borderColor: COLORS.primary}} 
                                onKeyPress={(e)=>e.key==='Enter'&&addParticipant()} 
                            />
                            
                            {/* Bouton Ajouter */}
                            <button 
                                onClick={addParticipant} 
                                className="text-white px-6 py-3 rounded-lg hover:opacity-90 transition font-semibold" 
                                style={{backgroundColor: COLORS.success}}
                            >
                                <Icons.Plus className="inline w-5 h-5" />
                            </button>
                        </div>

                        {/* ============================================
                            LISTE DES PARTICIPANTS INSCRITS
                            ============================================ */}
                        <div className="space-y-2 mb-6 max-h-96 overflow-y-auto">
                            {participants.map(p=>(
                                <div key={p.id} className="flex items-center gap-4 bg-gray-50 p-4 rounded-lg">
                                    <span className="font-bold w-8" style={{color: COLORS.primary}}>#{p.id}</span>
                                    <span className="flex-1 font-semibold">{p.name}</span>
                                    <span className="text-gray-600">{p.company}</span>
                                    <button 
                                        onClick={()=>removeParticipant(p.id)} 
                                        className="text-red-600 hover:text-red-800"
                                    >
                                        <Icons.Trash2 className="w-5 h-5" />
                                    </button>
                                </div>
                            ))}
                        </div>

                        {/* ============================================
                            BOUTONS D'ACTION (Générer / Recalculer)
                            ============================================ */}
                        <div className="space-y-3">
                            {/* Bouton Générer le planning (si pas encore généré) */}
                            {participants.length>=participantsPerTable && !planning && (
                                <button 
                                    onClick={generatePlanning} 
                                    className="w-full text-white py-4 rounded-lg hover:opacity-90 transition font-bold text-lg" 
                                    style={{backgroundColor: COLORS.primary}}
                                >
                                    🎯 Générer le Planning
                                </button>
                            )}
                            
                            {/* Bouton Recalculer le planning (si déjà généré) */}
                            {planning && (
                                <button 
                                    onClick={recalculatePlanning} 
                                    className="w-full text-white py-4 rounded-lg hover:opacity-90 transition font-bold text-lg flex items-center justify-center gap-2" 
                                    style={{backgroundColor: COLORS.secondary}}
                                >
                                    <Icons.RefreshCw className="inline w-6 h-6" />
                                    Recalculer le Planning ({participants.length} participants)
                                </button>
                            )}
                        </div>
                    </div>
                )}
                {/* ============================================
                    VUE PLANNING
                    ============================================ */}
                {view==='planning'&&planning && (
                    <div className="bg-white rounded-xl shadow-lg p-8">
                        {/* En-tête avec boutons de téléchargement */}
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold" style={{color: COLORS.secondary}}>
                                Planning ({planning.length} tours)
                            </h2>
                            <div className="flex gap-3">
                                {/* Bouton télécharger les fiches individuelles */}
                                <button 
                                    onClick={downloadFiches} 
                                    className="text-white px-4 py-2 rounded-lg hover:opacity-90 transition" 
                                    style={{backgroundColor: COLORS.success}}
                                >
                                    <Icons.Download className="inline w-5 h-5 mr-2" />
                                    Fiches
                                </button>
                                
                                {/* Bouton télécharger le planning complet */}
                                <button 
                                    onClick={downloadPlanningComplet} 
                                    className="text-white px-4 py-2 rounded-lg hover:opacity-90 transition" 
                                    style={{backgroundColor: COLORS.primary}}
                                >
                                    <Icons.Download className="inline w-5 h-5 mr-2" />
                                    Planning
                                </button>
                            </div>
                        </div>
                        
                        {/* Affichage de tous les tours */}
                        <div className="space-y-6 max-h-[600px] overflow-y-auto">
                            {planning.map((tour,tourIdx)=>(
                                <div key={tourIdx} className="border-2 rounded-lg p-6" style={{borderColor: COLORS.primary}}>
                                    <h3 className="text-xl font-bold mb-4" style={{color: COLORS.secondary}}>
                                        Tour {tourIdx+1}
                                    </h3>
                                    
                                    {/* Grid des tables pour ce tour */}
                                    <div className="grid grid-cols-3 gap-4">
                                        {tour.map((table,tableIdx)=>(
                                            <div key={tableIdx} className="p-4 rounded-lg" style={{backgroundColor:'#f8f0f5'}}>
                                                <h4 className="font-bold mb-2" style={{color: COLORS.secondary}}>
                                                    {getTableName(tableIdx)}
                                                </h4>
                                                
                                                {/* Liste des participants à cette table */}
                                                <ul className="space-y-1 text-sm">
                                                    {table.map(pId=>{
                                                        const p=participants.find(pp=>pp.id===pId);
                                                        return (
                                                            <li key={pId} className="text-gray-700">
                                                                <span className="font-semibold" style={{color: COLORS.secondary}}>
                                                                    {p?.company}
                                                                </span> | {p?.name}
                                                            </li>
                                                        );
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

                {/* ============================================
                    VUE CHRONOMÈTRE
                    ============================================ */}
                {view==='chrono'&&planning && (
                    <div className="tour-management-container">
                        {/* ============================================
                            SECTION CHRONOMÈTRES (partie haute)
                            ============================================ */}
                        <div className="chronos-section">
                            {/* Titre et indicateur de tour */}
                            <h2 className="text-2xl font-bold text-center" style={{color: COLORS.secondary}}>
                                Gestion des Tours
                            </h2>
                            <div className="text-xl font-semibold text-center" style={{color: COLORS.secondary}}>
                                Tour {currentTour+1} / {planning.length}
                            </div>
                            
                            <h3 className="text-xl font-bold text-center" style={{color: COLORS.primary}}>
                                Temps de présentation par participant
                            </h3>
                            
                            {/* Grid des chronomètres individuels */}
                            <div className="chronos-grid">
    {/* Boucle sur tous les participants + pauses */}
    {Array.from({length: participantsPerTable * 2 - 1}, (_, i) => {
        const isPauseSlot = i % 2 === 1; // Les indices impairs sont des pauses
        const participantIndex = Math.floor(i / 2); // Index réel du participant
        
        if (isPauseSlot && pauseSeconds === 0) {
            // Ne pas afficher les pauses si durée = 0
            return null;
        }
        
        // Calculs pour les chronomètres
        const totalPresentationSec = getTotalPresentationSeconds();
        const elapsedTime = getTotalTimeForTour() - timeLeft;
        
        if (isPauseSlot) {
            // === CHRONOMÈTRE DE PAUSE ===
            const pauseStartTime = (participantIndex + 1) * totalPresentationSec + (participantIndex) * pauseSeconds;
            const pauseEndTime = pauseStartTime + pauseSeconds;
            const pauseTime = pauseEndTime - elapsedTime;
            const isPauseActive = elapsedTime >= pauseStartTime && elapsedTime < pauseEndTime;
            const isPauseCompleted = elapsedTime >= pauseEndTime;
            
            return (
                <div 
                    key={i} 
                    className={`chrono-card ${
                        isPauseActive ? 'bg-orange-50' : isPauseCompleted ? 'bg-gray-100' : 'bg-white'
                    }`} 
                    style={{borderColor: isPauseActive ? '#FF8C00' : '#ccc'}}
                >
                    <div className="text-sm font-semibold mb-2 relative z-10 text-orange-600">
                        ⏸️ PAUSE
                    </div>
                    <div className={`text-3xl font-bold relative z-10 ${
                        isPauseActive ? 'text-orange-600' : 'text-gray-500'
                    }`}>
                        {isPauseCompleted ? '00:00' : formatTime(Math.max(0, pauseTime))}
                    </div>
                    {isPauseActive && (
                        <div className="text-xs mt-2 font-semibold relative z-10 text-orange-600">
                            EN COURS
                        </div>
                    )}
                    {isPauseCompleted && (
                        <div className="text-xs mt-2 font-semibold text-gray-500 relative z-10">
                            ✓ TERMINÉE
                        </div>
                    )}
                </div>
            );
        } else {
            // === CHRONOMÈTRE DE PARTICIPANT ===
            const participantStartTime = participantIndex * (totalPresentationSec + pauseSeconds);
            const participantEndTime = participantStartTime + totalPresentationSec;
            const participantTime = participantEndTime - elapsedTime;
            const isActive = elapsedTime >= participantStartTime && elapsedTime < participantEndTime;
            const isCompleted = elapsedTime >= participantEndTime;
            const isUrgent = isActive && participantTime <= 10;
            
            return (
                <div 
                    key={i} 
                    className={`chrono-card ${isUrgent ? 'chrono-urgent' : ''} ${
                        isActive ? 'bg-yellow-50' : isCompleted ? 'bg-gray-100' : 'bg-white'
                    }`} 
                    style={{borderColor: isActive ? COLORS.primary : '#ccc'}}
                >
                    {isUrgent && (
                        <div className="logo-overlay">
                            <img src={LOGO_PATH} alt="Logo" className="logo-image" />
                        </div>
                    )}
                    
                    <div className="text-sm font-semibold mb-2 relative z-10" style={{color: COLORS.secondary}}>
                        Participant {participantIndex + 1}
                    </div>
                    <div className={`text-3xl font-bold relative z-10 ${
                        isActive ? 'text-pink-600' : 'text-gray-500'
                    }`}>
                        {isCompleted ? '00:00' : formatTime(Math.max(0, participantTime))}
                    </div>
                    {isActive && !isUrgent && (
                        <div className="text-xs mt-2 font-semibold relative z-10" style={{color: COLORS.primary}}>
                            EN COURS
                        </div>
                    )}
                    {isUrgent && (
                        <div className="text-xs mt-2 font-semibold relative z-10 animate-pulse" style={{color: COLORS.primary}}>
                            ⚠️ DERNIÈRES SECONDES
                        </div>
                    )}
                    {isCompleted && (
                        <div className="text-xs mt-2 font-semibold text-gray-500 relative z-10">
                            ✓ TERMINÉ
                        </div>
                    )}
                </div>
            );
        }
    }).filter(Boolean)}
</div>

                            {/* ============================================
                                CONTRÔLES DU CHRONOMÈTRE
                                ============================================ */}
                            <div className="chrono-controls">
                                {/* Bouton Démarrer/Pause */}
                                <button 
                                    onClick={handleStartTimer} 
                                    className="text-white px-8 py-4 rounded-lg hover:opacity-90 transition font-bold text-lg shadow-lg" 
                                    style={{backgroundColor: COLORS.primary}}
                                >
                                    {isRunning ? (
                                        <Icons.Pause className="inline w-6 h-6 mr-2" />
                                    ) : (
                                        <Icons.Play className="inline w-6 h-6 mr-2" />
                                    )}
                                    {isRunning?'Pause':'Démarrer'}
                                </button>
                                
                                {/* Bouton Réinitialiser */}
                                <button 
                                    onClick={()=>{
                                        setTimeLeft(getTotalTimeForTour());
                                        setIsRunning(false);
                                        previousActiveChronoRef.current = -1;
                                    }} 
                                    className="text-white px-8 py-4 rounded-lg hover:opacity-90 transition font-bold text-lg shadow-lg" 
                                    style={{backgroundColor: COLORS.secondary}}
                                >
                                    <Icons.RotateCcw className="inline w-6 h-6 mr-2" />
                                    Réinitialiser
                                </button>
                            </div>

                            {/* ============================================
                                NAVIGATION ENTRE LES TOURS
                                ============================================ */}
                            <div className="tour-navigation">
                                {/* Bouton Tour Précédent */}
                                <button 
                                    onClick={()=>{
                                        if(currentTour>0){
                                            setCurrentTour(currentTour-1);
                                            setTimeLeft(getTotalTimeForTour());
                                            setIsRunning(false);
                                            previousActiveChronoRef.current = -1;
                                        }
                                    }} 
                                    disabled={currentTour===0} 
                                    className="text-white px-6 py-3 rounded-lg hover:opacity-90 transition font-semibold disabled:opacity-50 disabled:cursor-not-allowed" 
                                    style={{backgroundColor: COLORS.secondary}}
                                >
                                    ← Tour Précédent
                                </button>
                                
                                {/* Bouton Tour Suivant */}
                                <button 
                                    onClick={()=>{
                                        if(currentTour<planning.length-1){
                                            setCurrentTour(currentTour+1);
                                            setTimeLeft(getTotalTimeForTour());
                                            setIsRunning(false);
                                            previousActiveChronoRef.current = -1;
                                        }
                                    }} 
                                    disabled={currentTour===planning.length-1} 
                                    className="text-white px-6 py-3 rounded-lg hover:opacity-90 transition font-semibold disabled:opacity-50 disabled:cursor-not-allowed" 
                                    style={{backgroundColor: COLORS.secondary}}
                                >
                                    Tour Suivant →
                                </button>
                            </div>
                        </div>

                        {/* ============================================
                            SECTION TABLES (partie basse)
                            ============================================ */}
                        <div className="tables-section">
                            <h3 className="text-xl font-bold text-center" style={{color: COLORS.secondary}}>
                                Répartition - Tour {currentTour+1}
                            </h3>
                            
                            {/* Grid des tables pour le tour actuel */}
                            <div className="tables-grid">
                                {planning[currentTour].map((table,tableIdx)=>(
                                    <div key={tableIdx} className="table-card">
                                        {/* Nom de la table */}
                                        <h4 className="font-bold mb-3 text-center text-lg" style={{color: COLORS.secondary}}>
                                            {getTableName(tableIdx)}
                                        </h4>
                                        
                                        {/* Liste des participants à cette table */}
                                        <ul className="space-y-2">
                                            {table.map(pId=>{
                                                const p=participants.find(pp=>pp.id===pId);
                                                return (
                                                    <li key={pId} className="text-gray-700 bg-white p-2 rounded">
                                                        <span className="font-bold" style={{color: COLORS.primary}}>
                                                            #{pId}
                                                        </span> - 
                                                        <span className="font-semibold ml-2" style={{color: COLORS.secondary}}>
                                                            {p?.company}
                                                        </span>
                                                        <span className="block text-sm mt-1">
                                                            {p?.name}
                                                        </span>
                                                    </li>
                                                );
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
// ============================================
// INITIALISATION DE L'APPLICATION
// ============================================

/**
 * Point d'entrée de l'application React
 * Crée le root React et monte le composant principal
 */
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<NetworkingEventPlanner />);
