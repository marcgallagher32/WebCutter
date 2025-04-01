import React from 'react';
import styled from 'styled-components';
import theme from '../../styles/theme';

interface LayoutProps {
  children?: React.ReactNode;
}

const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: ${theme.colors.background};
  overflow: hidden;
`;

const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${theme.spacing.md};
  background-color: ${theme.colors.backgroundDark};
  border-bottom: 1px solid ${theme.colors.border};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  position: relative;
  z-index: ${theme.zIndex.dropdown};
  
  /* Retro glow effect */
  &::after {
    content: '';
    position: absolute;
    bottom: -1px;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(
      to right,
      ${theme.colors.neonPink},
      ${theme.colors.neonBlue},
      ${theme.colors.neonGreen},
      ${theme.colors.neonPurple}
    );
    opacity: 0.7;
  }
`;

const Logo = styled.div`
  font-family: ${theme.typography.fontFamily.primary};
  font-size: ${theme.typography.fontSize.xl};
  color: ${theme.colors.textPrimary};
  text-shadow: ${theme.effects.blueGlow};
  letter-spacing: 2px;
`;

const MainContainer = styled.main`
  display: flex;
  flex: 1;
  overflow: hidden;
`;

const SidebarContainer = styled.div`
  width: 280px;
  background-color: ${theme.colors.backgroundLight};
  border-right: 1px solid ${theme.colors.border};
  overflow-y: auto;
  padding: ${theme.spacing.md};
  display: flex;
  flex-direction: column;
`;

const ContentContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const VideoContainer = styled.div`
  flex: 1;
  padding: ${theme.spacing.md};
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 0;
  background-color: ${theme.colors.backgroundDark};
  position: relative;
  
  /* Retro grid background */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: linear-gradient(rgba(60, 60, 60, 0.1) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(60, 60, 60, 0.1) 1px, transparent 1px);
    background-size: 20px 20px;
    background-position: -1px -1px;
    z-index: 0;
  }
`;

const TimelineContainer = styled.div`
  height: 200px;
  background-color: ${theme.colors.timelineBackground};
  border-top: 1px solid ${theme.colors.border};
  overflow: hidden;
  position: relative;
  
  /* Retro glow effect */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(
      to right,
      ${theme.colors.neonPink},
      ${theme.colors.neonBlue},
      ${theme.colors.neonGreen},
      ${theme.colors.neonPurple}
    );
    opacity: 0.7;
    z-index: 1;
  }
`;

interface LayoutComponentsProps {
  logo?: React.ReactNode;
  headerControls?: React.ReactNode;
  sidebar?: React.ReactNode;
  video?: React.ReactNode;
  timeline?: React.ReactNode;
}

const Layout: React.FC<LayoutProps & LayoutComponentsProps> = ({
  children,
  logo,
  headerControls,
  sidebar,
  video,
  timeline,
}) => {
  return (
    <LayoutContainer>
      <HeaderContainer>
        <Logo>
          {logo || 'WebCutter'}
        </Logo>
        {headerControls}
      </HeaderContainer>
      <MainContainer>
        <SidebarContainer>
          {sidebar || children}
        </SidebarContainer>
        <ContentContainer>
          <VideoContainer>
            {video}
          </VideoContainer>
          <TimelineContainer>
            {timeline}
          </TimelineContainer>
        </ContentContainer>
      </MainContainer>
    </LayoutContainer>
  );
};

export default Layout; 