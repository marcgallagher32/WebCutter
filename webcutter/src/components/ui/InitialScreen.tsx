import React, { useState } from 'react';
import styled from 'styled-components';
import theme from '../../styles/theme';
import Button from './Button';

interface InitialScreenProps {
  onNewProject: () => void;
  onLoadFile: (file: File) => void;
  onLoadProject: (project: string) => void;
  recentProjects?: { id: string; name: string; lastModified: Date }[];
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: ${theme.spacing.xl};
  background-color: ${theme.colors.background};
  position: relative;
  overflow: hidden;
`;

const LogoContainer = styled.div`
  margin-bottom: ${theme.spacing.xxl};
  text-align: center;
`;

const Logo = styled.h1`
  font-family: ${theme.typography.fontFamily.primary};
  font-size: 3rem;
  color: ${theme.colors.textPrimary};
  text-shadow: ${theme.effects.blueGlow};
  margin-bottom: ${theme.spacing.md};
  letter-spacing: 3px;
`;

const Tagline = styled.p`
  font-family: ${theme.typography.fontFamily.secondary};
  font-size: ${theme.typography.fontSize.lg};
  color: ${theme.colors.textSecondary};
  margin-top: ${theme.spacing.sm};
`;

const ActionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.md};
  width: 100%;
  max-width: 400px;
  margin-bottom: ${theme.spacing.xxl};
`;

const RecentProjectsContainer = styled.div`
  width: 100%;
  max-width: 600px;
  background-color: ${theme.colors.backgroundLight};
  border-radius: ${theme.borderRadius.medium};
  padding: ${theme.spacing.lg};
  box-shadow: ${theme.effects.boxShadow};
  border: 1px solid ${theme.colors.border};
`;

const RecentProjectsTitle = styled.h2`
  font-family: ${theme.typography.fontFamily.secondary};
  font-size: ${theme.typography.fontSize.lg};
  color: ${theme.colors.textPrimary};
  margin-bottom: ${theme.spacing.md};
  text-shadow: ${theme.effects.blueGlow};
`;

const ProjectList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.sm};
`;

const ProjectItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${theme.spacing.md};
  background-color: ${theme.colors.backgroundDark};
  border-radius: ${theme.borderRadius.small};
  border: 1px solid ${theme.colors.border};
  transition: all ${theme.animation.fast} ease;
  
  &:hover {
    background-color: ${theme.colors.hover};
    box-shadow: ${theme.effects.blueGlow};
    transform: translateY(-2px);
  }
`;

const ProjectName = styled.span`
  font-family: ${theme.typography.fontFamily.body};
  color: ${theme.colors.textPrimary};
`;

const ProjectDate = styled.span`
  font-family: ${theme.typography.fontFamily.secondary};
  font-size: ${theme.typography.fontSize.sm};
  color: ${theme.colors.textMuted};
`;

const HiddenInput = styled.input`
  display: none;
`;

// Retro background grid
const BackgroundGrid = styled.div`
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
  pointer-events: none;
`;

const Content = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const InitialScreen: React.FC<InitialScreenProps> = ({
  onNewProject,
  onLoadFile,
  onLoadProject,
  recentProjects = [],
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setIsLoading(true);
      const file = e.target.files[0];
      
      // Add a slight delay to show loading state
      setTimeout(() => {
        onLoadFile(file);
        setIsLoading(false);
      }, 500);
    }
  };

  const handleLoadFileClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <Container>
      <BackgroundGrid />
      <Content>
        <LogoContainer>
          <Logo>WebCutter</Logo>
          <Tagline>Retro-styled video editing for the web</Tagline>
        </LogoContainer>
        
        <ActionsContainer>
          <Button 
            size="large" 
            color="blue" 
            fullWidth 
            glow
            onClick={onNewProject}
            disabled={isLoading}
          >
            New Project
          </Button>
          
          <Button 
            size="large" 
            color="pink" 
            variant="outline" 
            fullWidth 
            onClick={handleLoadFileClick}
            disabled={isLoading}
          >
            Load Video File
          </Button>
          
          <HiddenInput 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileUpload} 
            accept="video/mp4,video/mov,video/avi,video/wmv"
          />
        </ActionsContainer>

        {recentProjects.length > 0 && (
          <RecentProjectsContainer>
            <RecentProjectsTitle>Recent Projects</RecentProjectsTitle>
            <ProjectList>
              {recentProjects.map(project => (
                <ProjectItem 
                  key={project.id} 
                  onClick={() => onLoadProject(project.id)}
                >
                  <ProjectName>{project.name}</ProjectName>
                  <ProjectDate>
                    {new Date(project.lastModified).toLocaleDateString()}
                  </ProjectDate>
                </ProjectItem>
              ))}
            </ProjectList>
          </RecentProjectsContainer>
        )}
      </Content>
    </Container>
  );
};

export default InitialScreen; 