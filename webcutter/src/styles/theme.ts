// Theme for the WebCutter application with 80's retro styling
const theme = {
  colors: {
    // Dark backgrounds
    background: '#121212',
    backgroundLight: '#1E1E1E',
    backgroundDark: '#0A0A0A',
    
    // Muted neon accents
    neonPink: '#FF5C8D',
    neonBlue: '#5CB8FF',
    neonGreen: '#54EEBE',
    neonPurple: '#B467E3',
    
    // Gradients
    gradientPink: 'linear-gradient(135deg, #FF5C8D 0%, #FF3B6A 100%)',
    gradientBlue: 'linear-gradient(135deg, #5CB8FF 0%, #2F96FF 100%)',
    gradientGreen: 'linear-gradient(135deg, #54EEBE 0%, #33D1A0 100%)',
    gradientPurple: 'linear-gradient(135deg, #B467E3 0%, #A04DCC 100%)',
    
    // Text colors
    textPrimary: '#FFFFFF',
    textSecondary: '#B3B3B3',
    textMuted: '#777777',
    
    // UI elements
    border: '#333333',
    divider: '#444444',
    hover: 'rgba(255, 255, 255, 0.1)',
    active: 'rgba(255, 255, 255, 0.2)',
    
    // Timeline specific
    timelineBackground: '#0D0D0D',
    timelineGrid: '#333333',
    timelineRuler: '#444444',
    videoTrack: '#272727',
    audioTrack: '#1A1A1A',
    
    // Status colors
    success: '#00E676',
    warning: '#FFEA00',
    error: '#FF1744',
    info: '#00E5FF',
  },
  
  // Typography settings
  typography: {
    fontFamily: {
      primary: "'Press Start 2P', 'VT323', monospace",
      secondary: "'VT323', 'Courier New', monospace",
      body: "'Inter', 'Roboto', sans-serif",
    },
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      md: '1rem', 
      lg: '1.25rem',
      xl: '1.5rem',
      xxl: '2rem',
      xxxl: '3rem',
    },
    fontWeight: {
      normal: 400,
      medium: 500,
      bold: 700,
    },
  },
  
  // Spacing system
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    xxl: '3rem',
  },
  
  // Border radius
  borderRadius: {
    small: '4px',
    medium: '8px',
    large: '12px',
    pill: '9999px',
  },
  
  // Shadows and glow effects
  effects: {
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.5)',
    buttonShadow: '0 2px 6px rgba(0, 0, 0, 0.3)',
    pinkGlow: '0 0 8px rgba(255, 92, 141, 0.7)',
    blueGlow: '0 0 8px rgba(92, 184, 255, 0.7)',
    greenGlow: '0 0 8px rgba(84, 238, 190, 0.7)',
    purpleGlow: '0 0 8px rgba(180, 103, 227, 0.7)',
  },
  
  // Animation timing
  animation: {
    fast: '0.15s',
    normal: '0.3s',
    slow: '0.5s',
  },
  
  // Z-index levels
  zIndex: {
    base: 1,
    dropdown: 10,
    modal: 100,
    tooltip: 200,
  },
  
  // Media queries for responsive design
  breakpoints: {
    xs: '480px',
    sm: '768px',
    md: '992px',
    lg: '1200px',
    xl: '1600px',
  },
};

export default theme; 