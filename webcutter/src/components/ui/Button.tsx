import React from 'react';
import styled, { css } from 'styled-components';
import theme from '../../styles/theme';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'text';
type ButtonSize = 'small' | 'medium' | 'large';
type ButtonColor = 'pink' | 'blue' | 'green' | 'purple';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  color?: ButtonColor;
  fullWidth?: boolean;
  icon?: React.ReactNode;
  isActive?: boolean;
  glow?: boolean;
}

const StyledButton = styled.button<ButtonProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: ${theme.typography.fontFamily.secondary};
  border-radius: ${theme.borderRadius.medium};
  transition: all ${theme.animation.fast} ease;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  
  /* Size variations */
  ${props => props.size === 'small' && css`
    font-size: ${theme.typography.fontSize.xs};
    padding: ${theme.spacing.xs} ${theme.spacing.sm};
  `}
  
  ${props => (props.size === 'medium' || !props.size) && css`
    font-size: ${theme.typography.fontSize.sm};
    padding: ${theme.spacing.sm} ${theme.spacing.md};
  `}
  
  ${props => props.size === 'large' && css`
    font-size: ${theme.typography.fontSize.md};
    padding: ${theme.spacing.md} ${theme.spacing.lg};
  `}
  
  /* Width */
  ${props => props.fullWidth && css`
    width: 100%;
  `}
  
  /* Variants and colors */
  ${props => {
    const colors = {
      pink: theme.colors.neonPink,
      blue: theme.colors.neonBlue,
      green: theme.colors.neonGreen,
      purple: theme.colors.neonPurple,
    };
    
    const gradients = {
      pink: theme.colors.gradientPink,
      blue: theme.colors.gradientBlue,
      green: theme.colors.gradientGreen,
      purple: theme.colors.gradientPurple,
    };
    
    const glows = {
      pink: theme.effects.pinkGlow,
      blue: theme.effects.blueGlow,
      green: theme.effects.greenGlow,
      purple: theme.effects.purpleGlow,
    };
    
    const color = props.color || 'blue';
    
    if (props.variant === 'primary' || !props.variant) {
      return css`
        background: ${gradients[color]};
        color: ${theme.colors.textPrimary};
        border: none;
        box-shadow: ${props.glow ? glows[color] : theme.effects.buttonShadow};
        
        &:hover, &:focus {
          opacity: 0.9;
          box-shadow: ${glows[color]};
        }
        
        &:active, ${props.isActive && css`
          opacity: 0.8;
          box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.3);
        `}
      `;
    }
    
    if (props.variant === 'secondary') {
      return css`
        background: ${theme.colors.backgroundLight};
        color: ${colors[color]};
        border: none;
        box-shadow: ${props.glow ? glows[color] : theme.effects.buttonShadow};
        
        &:hover, &:focus {
          background: ${theme.colors.backgroundDark};
          box-shadow: ${glows[color]};
        }
        
        &:active, ${props.isActive && css`
          background: ${theme.colors.backgroundDark};
          box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.3);
        `}
      `;
    }
    
    if (props.variant === 'outline') {
      return css`
        background: transparent;
        color: ${colors[color]};
        border: 1px solid ${colors[color]};
        
        &:hover, &:focus {
          background: rgba(${color === 'pink' ? '255, 92, 141' : 
            color === 'blue' ? '92, 184, 255' :
            color === 'green' ? '84, 238, 190' : 
            '180, 103, 227'}, 0.1);
          box-shadow: ${glows[color]};
        }
        
        &:active, ${props.isActive && css`
          background: rgba(${color === 'pink' ? '255, 92, 141' : 
            color === 'blue' ? '92, 184, 255' :
            color === 'green' ? '84, 238, 190' : 
            '180, 103, 227'}, 0.2);
        `}
      `;
    }
    
    if (props.variant === 'text') {
      return css`
        background: transparent;
        color: ${colors[color]};
        border: none;
        padding-left: ${theme.spacing.sm};
        padding-right: ${theme.spacing.sm};
        
        &:hover, &:focus {
          text-shadow: ${glows[color]};
          background: rgba(${color === 'pink' ? '255, 92, 141' : 
            color === 'blue' ? '92, 184, 255' :
            color === 'green' ? '84, 238, 190' : 
            '180, 103, 227'}, 0.1);
        }
        
        &:active, ${props.isActive && css`
          background: rgba(${color === 'pink' ? '255, 92, 141' : 
            color === 'blue' ? '92, 184, 255' :
            color === 'green' ? '84, 238, 190' : 
            '180, 103, 227'}, 0.2);
        `}
      `;
    }
  }}
  
  /* Disabled state */
  ${props => props.disabled && css`
    opacity: 0.5;
    cursor: not-allowed;
    box-shadow: none;
    
    &:hover, &:focus, &:active {
      opacity: 0.5;
      box-shadow: none;
      transform: none;
    }
  `}
  
  /* Icon positioning - fixed to avoid TypeScript errors */
  .icon {
    margin-right: ${props => props.children ? theme.spacing.sm : '0'};
  }
  
  /* Retro effect: scanlines */
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: repeating-linear-gradient(
      to bottom,
      transparent,
      transparent 1px,
      rgba(255, 255, 255, 0.03) 1px,
      rgba(255, 255, 255, 0.03) 2px
    );
    pointer-events: none;
    opacity: 0.2;
  }
`;

const Button: React.FC<ButtonProps> = ({ 
  children, 
  icon, 
  ...props 
}) => {
  return (
    <StyledButton {...props}>
      {icon && <span className="icon">{icon}</span>}
      {children}
    </StyledButton>
  );
};

export default Button; 