import React, { useState } from 'react';
import styled from 'styled-components';
import theme from '../../styles/theme';

interface PanelProps {
  title: string;
  children: React.ReactNode;
  initiallyOpen?: boolean;
  color?: 'pink' | 'blue' | 'green' | 'purple';
  icon?: React.ReactNode;
}

const PanelContainer = styled.div`
  background-color: ${theme.colors.backgroundLight};
  border-radius: ${theme.borderRadius.medium};
  margin-bottom: ${theme.spacing.md};
  overflow: hidden;
  box-shadow: ${theme.effects.boxShadow};
  border: 1px solid ${theme.colors.border};
`;

const PanelHeader = styled.div<{ color: string }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${theme.spacing.md};
  background-color: ${theme.colors.backgroundDark};
  color: ${props => {
    switch (props.color) {
      case 'pink': return theme.colors.neonPink;
      case 'green': return theme.colors.neonGreen;
      case 'purple': return theme.colors.neonPurple;
      default: return theme.colors.neonBlue;
    }
  }};
  cursor: pointer;
  user-select: none;
  font-family: ${theme.typography.fontFamily.secondary};
  position: relative;
  
  /* Retro scanlines */
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
  
  &:hover {
    text-shadow: ${props => {
      switch (props.color) {
        case 'pink': return theme.effects.pinkGlow;
        case 'green': return theme.effects.greenGlow;
        case 'purple': return theme.effects.purpleGlow;
        default: return theme.effects.blueGlow;
      }
    }};
  }
`;

const HeaderContent = styled.div`
  display: flex;
  align-items: center;
`;

const PanelTitle = styled.h3`
  margin: 0;
  font-size: ${theme.typography.fontSize.md};
  margin-left: ${theme.spacing.sm};
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ToggleIcon = styled.div<{ isOpen: boolean }>`
  width: 1.2rem;
  height: 1.2rem;
  position: relative;
  
  &::before,
  &::after {
    content: '';
    position: absolute;
    background-color: currentColor;
    transition: transform ${theme.animation.normal} ease;
  }
  
  &::before {
    width: 100%;
    height: 2px;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
  }
  
  &::after {
    width: 2px;
    height: 100%;
    left: 50%;
    top: 0;
    transform: translateX(-50%) ${props => props.isOpen ? 'scaleY(0)' : 'scaleY(1)'};
  }
`;

const PanelContent = styled.div<{ isOpen: boolean }>`
  padding: ${props => props.isOpen ? theme.spacing.md : '0'};
  max-height: ${props => props.isOpen ? '1000px' : '0'};
  opacity: ${props => props.isOpen ? '1' : '0'};
  overflow: hidden;
  transition: all ${theme.animation.normal} ease;
`;

const Panel: React.FC<PanelProps> = ({
  title,
  children,
  initiallyOpen = true,
  color = 'blue',
  icon,
}) => {
  const [isOpen, setIsOpen] = useState(initiallyOpen);

  const togglePanel = () => {
    setIsOpen(!isOpen);
  };

  return (
    <PanelContainer>
      <PanelHeader color={color} onClick={togglePanel}>
        <HeaderContent>
          {icon && <IconWrapper>{icon}</IconWrapper>}
          <PanelTitle>{title}</PanelTitle>
        </HeaderContent>
        <ToggleIcon isOpen={isOpen} />
      </PanelHeader>
      <PanelContent isOpen={isOpen}>
        {children}
      </PanelContent>
    </PanelContainer>
  );
};

export default Panel; 