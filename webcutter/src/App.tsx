import React, { useState, useRef } from 'react';
import { ThemeProvider } from 'styled-components';
import theme from './styles/theme';
import GlobalStyles from './styles/globalStyles';
import Layout from './components/ui/Layout';
import Panel from './components/ui/Panel';
import Button from './components/ui/Button';
import InitialScreen from './components/ui/InitialScreen';
import VideoPlayer from './components/video/VideoPlayer';
import Timeline from './components/timeline/Timeline';

function App() {
  const [currentView, setCurrentView] = useState<'initial' | 'editor'>('initial');
  const [currentProject, setCurrentProject] = useState<{ id: string; name: string } | null>(null);
  const [currentFile, setCurrentFile] = useState<File | null>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [zoom, setZoom] = useState(1);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  
  // Mock recent projects
  const recentProjects = [
    { id: '1', name: 'Product Demo Video', lastModified: new Date('2023-03-15') },
    { id: '2', name: 'YouTube Tutorial', lastModified: new Date('2023-03-10') },
    { id: '3', name: 'Interview Compilation', lastModified: new Date('2023-03-01') },
  ];

  const handleNewProject = () => {
    setCurrentProject({ id: Date.now().toString(), name: 'Untitled Project' });
    setCurrentView('editor');
  };

  const handleLoadFile = (file: File) => {
    setCurrentFile(file);
    setCurrentProject({ id: Date.now().toString(), name: file.name.split('.')[0] });
    setCurrentView('editor');
  };

  const handleLoadProject = (projectId: string) => {
    const project = recentProjects.find(p => p.id === projectId);
    if (project) {
      setCurrentProject({ id: project.id, name: project.name });
      setCurrentView('editor');
    }
  };

  const handleBackToHome = () => {
    setCurrentView('initial');
  };

  const handleTimeUpdate = (time: number) => {
    setCurrentTime(time);
  };
  
  const handleDurationChange = (newDuration: number) => {
    setDuration(newDuration);
  };
  
  const handleSeek = (time: number) => {
    setCurrentTime(time);
    // If we had a video reference, we would set its time
    // This will be handled by the VideoPlayer component
  };
  
  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev * 1.5, 10));
  };
  
  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev / 1.5, 0.5));
  };
  
  const handleZoomReset = () => {
    setZoom(1);
  };

  if (currentView === 'initial') {
    return (
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <InitialScreen
          onNewProject={handleNewProject}
          onLoadFile={handleLoadFile}
          onLoadProject={handleLoadProject}
          recentProjects={recentProjects}
        />
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Layout
        headerControls={
          <div style={{ display: 'flex', gap: theme.spacing.sm }}>
            <Button variant="outline" color="blue" onClick={handleBackToHome}>Home</Button>
            <Button variant="outline" color="green">Save Project</Button>
            <Button variant="outline" color="pink">Export</Button>
          </div>
        }
        logo={currentProject?.name || 'WebCutter'}
        sidebar={
          <>
            <Panel title="Media Library" color="blue">
              <div style={{ padding: theme.spacing.sm }}>
                {currentFile ? (
                  <div>
                    <p>Current file: {currentFile.name}</p>
                    <p>Size: {(currentFile.size / (1024 * 1024)).toFixed(2)} MB</p>
                    <p>Current position: {currentTime.toFixed(2)}s</p>
                    {duration > 0 && <p>Duration: {duration.toFixed(2)}s</p>}
                  </div>
                ) : (
                  <p>Your media files will appear here.</p>
                )}
                <div style={{ marginTop: theme.spacing.md }}>
                  <Button fullWidth color="blue">Import Media</Button>
                </div>
              </div>
            </Panel>
            
            <Panel title="Tools" color="green">
              <div style={{ padding: theme.spacing.sm }}>
                <p>Editing tools:</p>
                <div style={{ marginTop: theme.spacing.md }}>
                  <Button fullWidth color="green" disabled={!currentFile}>Cut at Current Position</Button>
                </div>
                <div style={{ marginTop: theme.spacing.sm }}>
                  <Button fullWidth color="pink" disabled={!currentFile}>Apply J-Cut</Button>
                </div>
              </div>
            </Panel>
            
            <Panel title="Timeline Controls" color="blue">
              <div style={{ padding: theme.spacing.sm }}>
                <p>Zoom: {zoom.toFixed(1)}x</p>
                <div style={{ display: 'flex', gap: theme.spacing.sm, marginTop: theme.spacing.md }}>
                  <Button color="blue" onClick={handleZoomOut} disabled={zoom <= 0.5}>-</Button>
                  <Button color="green" onClick={handleZoomReset} fullWidth>Reset</Button>
                  <Button color="blue" onClick={handleZoomIn} disabled={zoom >= 10}>+</Button>
                </div>
              </div>
            </Panel>
            
            <Panel title="Text Editing" color="pink" initiallyOpen={false}>
              <div style={{ padding: theme.spacing.sm }}>
                <p>Transcription-based editing will be available here.</p>
                <div style={{ marginTop: theme.spacing.md }}>
                  <Button fullWidth color="purple" disabled={!currentFile}>Transcribe Audio</Button>
                </div>
              </div>
            </Panel>
          </>
        }
        video={
          <VideoPlayer 
            file={currentFile || undefined} 
            onTimeUpdate={handleTimeUpdate}
            onDurationChange={handleDurationChange}
          />
        }
        timeline={
          <Timeline 
            duration={duration} 
            currentTime={currentTime} 
            onSeek={handleSeek}
            zoom={zoom}
          />
        }
      />
    </ThemeProvider>
  );
}

export default App;
