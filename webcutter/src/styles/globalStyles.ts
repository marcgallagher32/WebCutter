import { createGlobalStyle } from 'styled-components';
import theme from './theme';

const GlobalStyles = createGlobalStyle`
  /* Import fonts */
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=Press+Start+2P&family=VT323&display=swap');
  
  /* Reset CSS */
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  body {
    font-family: ${theme.typography.fontFamily.body};
    background-color: ${theme.colors.background};
    color: ${theme.colors.textPrimary};
    font-size: ${theme.typography.fontSize.md};
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overflow-x: hidden;
  }
  
  /* Scrollbar styling */
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }
  
  ::-webkit-scrollbar-track {
    background: ${theme.colors.backgroundDark};
  }
  
  ::-webkit-scrollbar-thumb {
    background: ${theme.colors.border};
    border-radius: ${theme.borderRadius.small};
  }
  
  ::-webkit-scrollbar-thumb:hover {
    background: ${theme.colors.neonBlue};
  }
  
  /* Headings */
  h1, h2, h3, h4, h5, h6 {
    font-family: ${theme.typography.fontFamily.primary};
    margin-bottom: ${theme.spacing.md};
    line-height: 1.2;
  }
  
  h1 {
    font-size: ${theme.typography.fontSize.xxxl};
  }
  
  h2 {
    font-size: ${theme.typography.fontSize.xxl};
  }
  
  h3 {
    font-size: ${theme.typography.fontSize.xl};
  }
  
  h4 {
    font-size: ${theme.typography.fontSize.lg};
  }
  
  h5, h6 {
    font-size: ${theme.typography.fontSize.md};
  }
  
  /* Links */
  a {
    color: ${theme.colors.neonBlue};
    text-decoration: none;
    transition: color ${theme.animation.fast} ease;
  }
  
  a:hover {
    color: ${theme.colors.neonPink};
    text-shadow: ${theme.effects.blueGlow};
  }
  
  /* Buttons */
  button {
    font-family: ${theme.typography.fontFamily.secondary};
    cursor: pointer;
    border: none;
    background: transparent;
    color: ${theme.colors.textPrimary};
  }
  
  /* Focus outline */
  :focus {
    outline: 2px solid ${theme.colors.neonBlue};
    outline-offset: 2px;
  }
  
  /* Typography helpers */
  .text-secondary {
    color: ${theme.colors.textSecondary};
  }
  
  .text-muted {
    color: ${theme.colors.textMuted};
  }
  
  /* Code and pre */
  code, pre {
    font-family: ${theme.typography.fontFamily.secondary};
    background-color: ${theme.colors.backgroundDark};
    border-radius: ${theme.borderRadius.small};
    padding: ${theme.spacing.xs} ${theme.spacing.sm};
  }
  
  pre {
    padding: ${theme.spacing.md};
    overflow-x: auto;
  }
  
  /* Utilities */
  .container {
    max-width: 1440px;
    margin: 0 auto;
    padding: 0 ${theme.spacing.md};
  }
  
  /* Animations */
  @keyframes glow {
    0% {
      box-shadow: 0 0 5px rgba(92, 184, 255, 0.5);
    }
    50% {
      box-shadow: 0 0 20px rgba(92, 184, 255, 0.8);
    }
    100% {
      box-shadow: 0 0 5px rgba(92, 184, 255, 0.5);
    }
  }
  
  @keyframes pulse {
    0% {
      opacity: 0.5;
    }
    50% {
      opacity: 1;
    }
    100% {
      opacity: 0.5;
    }
  }
  
  /* Retro grid pattern */
  .retro-grid {
    background-image: linear-gradient(rgba(60, 60, 60, 0.3) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(60, 60, 60, 0.3) 1px, transparent 1px);
    background-size: 20px 20px;
    background-position: -1px -1px;
  }
`;

export default GlobalStyles; 