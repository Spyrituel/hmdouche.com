export interface Course {
  id: string;
  day: string;
  startTime: string;
  endTime: string;
  module: string;
  category: 'network' | 'security' | 'linux' | 'windows' | 'language' | 'soft-skills' | 'evaluation' | 'cloud';
  room?: string;
  teacher?: string;
  notes?: string;
}

export interface ModuleInfo {
  name: string;
  category: Course['category'];
  description: string;
  objectives: string[];
  skills: string[];
  keyConcepts: string[];
  tools: string[];
  difficulty: 1 | 2 | 3 | 4 | 5;
  priority: 'haute' | 'moyenne' | 'basse';
  revision: {
    preClassReview: string[];
    exercises: string[];
    prepTime: string;
  };
}

export const DAYS = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi'];

export const TIME_SLOTS = [
  { start: '08:30', end: '09:30' },
  { start: '09:35', end: '10:35' },
  { start: '10:50', end: '11:50' },
  { start: '12:30', end: '13:30' },
  { start: '13:35', end: '14:35' },
];

export const defaultSchedule: Course[] = [
  // Lundi
  {
    id: 'lun-1',
    day: 'Lundi',
    startTime: '08:30',
    endTime: '10:35',
    module: 'Réseaux et Sécurité Réseaux Informatique',
    category: 'network',
  },
  {
    id: 'lun-2',
    day: 'Lundi',
    startTime: '10:50',
    endTime: '11:50',
    module: 'Anglais 2',
    category: 'language',
  },
  {
    id: 'lun-3',
    day: 'Lundi',
    startTime: '12:30',
    endTime: '13:30',
    module: 'Communication et Collab au Travail',
    category: 'soft-skills',
  },
  // Mardi
  {
    id: 'mar-1',
    day: 'Mardi',
    startTime: '08:30',
    endTime: '10:35',
    module: 'Admin des Services Linux',
    category: 'linux',
  },
  {
    id: 'mar-2',
    day: 'Mardi',
    startTime: '10:50',
    endTime: '11:50',
    module: 'Réseaux WLAN',
    category: 'network',
  },
  {
    id: 'mar-3',
    day: 'Mardi',
    startTime: '12:30',
    endTime: '13:30',
    module: 'Réseaux WLAN',
    category: 'network',
  },
  // Mercredi
  {
    id: 'mer-1',
    day: 'Mercredi',
    startTime: '08:30',
    endTime: '09:30',
    module: 'Evaluation des Composants Informatique',
    category: 'evaluation',
  },
  {
    id: 'mer-2',
    day: 'Mercredi',
    startTime: '09:35',
    endTime: '10:35',
    module: 'Gestion des Risques de la Sécurité de l\'information',
    category: 'security',
  },
  {
    id: 'mer-3',
    day: 'Mercredi',
    startTime: '10:50',
    endTime: '11:50',
    module: 'Admin Service Windows',
    category: 'windows',
  },
  {
    id: 'mer-4',
    day: 'Mercredi',
    startTime: '12:30',
    endTime: '13:30',
    module: 'Admin Service Windows',
    category: 'windows',
  },
];

export const moduleInfoMap: Record<string, ModuleInfo> = {
  'Réseaux et Sécurité Réseaux Informatique': {
    name: 'Réseaux et Sécurité Réseaux Informatique',
    category: 'network',
    description: 'Étude approfondie des architectures réseau et des mécanismes de sécurité pour protéger les infrastructures informatiques.',
    objectives: [
      'Comprendre les protocoles réseau (TCP/IP, DNS, DHCP)',
      'Configurer des pare-feu et systèmes IDS/IPS',
      'Analyser le trafic réseau avec Wireshark',
      'Implémenter des VPN et tunnels sécurisés',
    ],
    skills: ['Analyse réseau', 'Configuration firewall', 'Détection d\'intrusions', 'Sécurisation périmétrique'],
    keyConcepts: ['Modèle OSI', 'TCP/IP', 'Firewall', 'IDS/IPS', 'VPN', 'NAT', 'VLAN'],
    tools: ['Wireshark', 'pfSense', 'Snort', 'Nmap', 'iptables'],
    difficulty: 4,
    priority: 'haute',
    revision: {
      preClassReview: ['Relire le modèle OSI', 'Revoir les protocoles TCP/UDP', 'Pratiquer les commandes réseau'],
      exercises: ['Capturer et analyser du trafic', 'Configurer des ACL', 'Scanner un réseau avec Nmap'],
      prepTime: '45 min',
    },
  },
  'Anglais 2': {
    name: 'Anglais 2',
    category: 'language',
    description: 'Anglais technique et professionnel pour le domaine de l\'informatique et la cybersécurité.',
    objectives: [
      'Maîtriser le vocabulaire IT en anglais',
      'Rédiger des rapports techniques',
      'Présenter des projets en anglais',
    ],
    skills: ['Communication technique', 'Rédaction', 'Présentation orale'],
    keyConcepts: ['Technical writing', 'IT vocabulary', 'Presentation skills'],
    tools: ['Grammarly', 'Google Docs'],
    difficulty: 2,
    priority: 'moyenne',
    revision: {
      preClassReview: ['Réviser le vocabulaire de la semaine', 'Relire les textes assignés'],
      exercises: ['Écrire un paragraphe technique en anglais', 'Pratiquer la prononciation'],
      prepTime: '20 min',
    },
  },
  'Communication et Collab au Travail': {
    name: 'Communication et Collab au Travail',
    category: 'soft-skills',
    description: 'Développement des compétences en communication professionnelle et travail d\'équipe en contexte IT.',
    objectives: [
      'Maîtriser la communication d\'équipe',
      'Gérer les conflits professionnels',
      'Utiliser les outils collaboratifs',
    ],
    skills: ['Travail d\'équipe', 'Communication', 'Gestion de projet agile'],
    keyConcepts: ['Méthodologie Agile', 'Scrum', 'Communication non-violente'],
    tools: ['Jira', 'Slack', 'Teams', 'Trello'],
    difficulty: 1,
    priority: 'basse',
    revision: {
      preClassReview: ['Relire les notes du dernier cours', 'Préparer les sujets de discussion'],
      exercises: ['Pratiquer un pitch de 2 min', 'Organiser un mini stand-up'],
      prepTime: '15 min',
    },
  },
  'Admin des Services Linux': {
    name: 'Admin des Services Linux',
    category: 'linux',
    description: 'Administration avancée des services sous Linux : DNS, DHCP, Apache, Nginx, services de messagerie.',
    objectives: [
      'Installer et configurer des services Linux',
      'Gérer les utilisateurs et permissions',
      'Automatiser avec des scripts Bash',
      'Monitorer les services',
    ],
    skills: ['Administration système', 'Scripting Bash', 'Gestion de services', 'Troubleshooting'],
    keyConcepts: ['systemd', 'Apache/Nginx', 'DNS BIND', 'DHCP', 'SSH', 'Cron', 'Logs'],
    tools: ['Bash', 'vim', 'systemctl', 'journalctl', 'htop', 'netstat'],
    difficulty: 4,
    priority: 'haute',
    revision: {
      preClassReview: ['Revoir les commandes systemctl', 'Relire la config Apache', 'Pratiquer en VM'],
      exercises: ['Configurer un serveur web', 'Écrire un script de monitoring', 'Gérer les logs'],
      prepTime: '50 min',
    },
  },
  'Réseaux WLAN': {
    name: 'Réseaux WLAN',
    category: 'network',
    description: 'Étude des réseaux sans fil, protocoles Wi-Fi, sécurité wireless et déploiement d\'infrastructures WLAN.',
    objectives: [
      'Comprendre les standards 802.11',
      'Configurer des points d\'accès',
      'Sécuriser les réseaux sans fil',
      'Diagnostiquer les problèmes Wi-Fi',
    ],
    skills: ['Configuration Wi-Fi', 'Sécurité wireless', 'Site survey', 'Analyse spectrale'],
    keyConcepts: ['802.11 a/b/g/n/ac/ax', 'WPA2/WPA3', 'SSID', 'Roaming', 'Canaux'],
    tools: ['WiFi Analyzer', 'Aircrack-ng', 'Wireshark', 'Controller AP'],
    difficulty: 3,
    priority: 'haute',
    revision: {
      preClassReview: ['Revoir les standards 802.11', 'Comprendre WPA2 vs WPA3'],
      exercises: ['Analyser un réseau Wi-Fi', 'Configurer un AP virtuel'],
      prepTime: '30 min',
    },
  },
  'Evaluation des Composants Informatique': {
    name: 'Evaluation des Composants Informatique',
    category: 'evaluation',
    description: 'Évaluation et sélection des composants matériels et logiciels pour les infrastructures informatiques.',
    objectives: [
      'Évaluer les performances matérielles',
      'Comparer des solutions logicielles',
      'Rédiger des cahiers des charges techniques',
    ],
    skills: ['Benchmarking', 'Analyse comparative', 'Rédaction technique'],
    keyConcepts: ['CPU/GPU', 'RAM', 'Stockage SSD/HDD', 'Benchmarks', 'TCO'],
    tools: ['CPU-Z', 'CrystalDiskMark', 'Cinebench', 'PCMark'],
    difficulty: 2,
    priority: 'moyenne',
    revision: {
      preClassReview: ['Revoir les architectures matérielles', 'Consulter les specs récentes'],
      exercises: ['Comparer 2 configurations', 'Calculer un TCO'],
      prepTime: '25 min',
    },
  },
  'Gestion des Risques de la Sécurité de l\'information': {
    name: 'Gestion des Risques de la Sécurité de l\'information',
    category: 'security',
    description: 'Méthodologies d\'analyse et de gestion des risques liés à la sécurité de l\'information (ISO 27005, EBIOS).',
    objectives: [
      'Identifier et classifier les risques',
      'Appliquer les normes ISO 27001/27005',
      'Conduire une analyse EBIOS',
      'Élaborer un plan de traitement des risques',
    ],
    skills: ['Analyse de risques', 'Conformité', 'Audit sécurité', 'Gouvernance SI'],
    keyConcepts: ['ISO 27001', 'ISO 27005', 'EBIOS RM', 'RGPD', 'Matrice de risques'],
    tools: ['EBIOS RM', 'Excel avancé', 'Outils GRC'],
    difficulty: 3,
    priority: 'haute',
    revision: {
      preClassReview: ['Relire la norme ISO 27005', 'Revoir la méthode EBIOS', 'Préparer des scénarios'],
      exercises: ['Créer une matrice de risques', 'Analyser un cas pratique'],
      prepTime: '40 min',
    },
  },
  'Admin Service Windows': {
    name: 'Admin Service Windows',
    category: 'windows',
    description: 'Administration des services Windows Server : Active Directory, GPO, DNS, DHCP, Hyper-V.',
    objectives: [
      'Configurer Active Directory',
      'Gérer les GPO',
      'Administrer DNS et DHCP Windows',
      'Déployer Hyper-V',
    ],
    skills: ['Active Directory', 'PowerShell', 'GPO', 'Windows Server'],
    keyConcepts: ['AD DS', 'GPO', 'DNS Windows', 'DHCP', 'Hyper-V', 'WSUS'],
    tools: ['PowerShell', 'Server Manager', 'RSAT', 'MMC'],
    difficulty: 4,
    priority: 'haute',
    revision: {
      preClassReview: ['Revoir la structure AD', 'Pratiquer PowerShell', 'Relire les GPO'],
      exercises: ['Créer une forêt AD', 'Écrire un script PowerShell', 'Configurer une GPO'],
      prepTime: '45 min',
    },
  },
};

export const categoryConfig: Record<Course['category'], { label: string; color: string; icon: string }> = {
  network: { label: 'Réseau', color: 'neon-blue', icon: '🌐' },
  security: { label: 'Sécurité', color: 'neon-red', icon: '🛡️' },
  linux: { label: 'Linux', color: 'neon-green', icon: '🐧' },
  windows: { label: 'Windows', color: 'neon-purple', icon: '🪟' },
  language: { label: 'Langue', color: 'neon-yellow', icon: '🌍' },
  'soft-skills': { label: 'Soft Skills', color: 'neon-yellow', icon: '💬' },
  evaluation: { label: 'Évaluation', color: 'neon-red', icon: '📋' },
  cloud: { label: 'Cloud', color: 'neon-blue', icon: '☁️' },
};

export function isTechnicalModule(category: Course['category']): boolean {
  return ['network', 'security', 'linux', 'windows', 'cloud'].includes(category);
}
