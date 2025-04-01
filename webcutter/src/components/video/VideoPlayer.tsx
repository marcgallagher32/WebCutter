import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import theme from '../../styles/theme';
import Button from '../ui/Button';

interface VideoPlayerProps {
  file?: File;
  src?: string;
  onTimeUpdate?: (time: number) => void;
  onDurationChange?: (duration: number) => void;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  position: relative;
  background-color: ${theme.colors.backgroundDark};
  border-radius: ${theme.borderRadius.medium};
  overflow: hidden;
`;

const VideoContainer = styled.div`
  flex: 1;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #000;
  position: relative;
`;

const StyledVideo = styled.video`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
`;

const ControlsContainer = styled.div`
  display: flex;
  align-items: center;
  padding: ${theme.spacing.md};
  background-color: ${theme.colors.backgroundDark};
  border-top: 1px solid ${theme.colors.border};
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

const TimeDisplay = styled.div`
  font-family: ${theme.typography.fontFamily.secondary};
  color: ${theme.colors.textPrimary};
  margin: 0 ${theme.spacing.md};
  background-color: ${theme.colors.backgroundLight};
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  border-radius: ${theme.borderRadius.small};
  min-width: 100px;
  text-align: center;
  text-shadow: ${theme.effects.blueGlow};
`;

const ControlButtons = styled.div`
  display: flex;
  gap: ${theme.spacing.sm};
`;

const Spacer = styled.div`
  flex: 1;
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${theme.spacing.xl};
  text-align: center;
  color: ${theme.colors.textSecondary};
  font-family: ${theme.typography.fontFamily.secondary};
  font-size: ${theme.typography.fontSize.lg};
`;

const VideoPlayer: React.FC<VideoPlayerProps> = ({ 
  file, 
  src, 
  onTimeUpdate,
  onDurationChange 
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [videoSrc, setVideoSrc] = useState<string | undefined>(src);

  useEffect(() => {
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setVideoSrc(objectUrl);
      
      return () => {
        URL.revokeObjectURL(objectUrl);
      };
    } else if (src) {
      setVideoSrc(src);
    } else {
      setVideoSrc(undefined);
    }
  }, [file, src]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime);
      onTimeUpdate?.(video.currentTime);
    };

    const handleDurationChange = () => {
      setDuration(video.duration);
      onDurationChange?.(video.duration);
    };

    const handleEnded = () => {
      setIsPlaying(false);
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('durationchange', handleDurationChange);
    video.addEventListener('ended', handleEnded);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('durationchange', handleDurationChange);
      video.removeEventListener('ended', handleEnded);
    };
  }, [onTimeUpdate, onDurationChange]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleRewind = () => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = Math.max(0, video.currentTime - 5);
  };

  const handleForward = () => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = Math.min(video.duration, video.currentTime + 5);
  };

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);
    return [h, m, s]
      .map(v => v.toString().padStart(2, '0'))
      .filter((v, i) => i > 0 || v !== '00')
      .join(':');
  };

  return (
    <Container>
      <VideoContainer>
        {videoSrc ? (
          <StyledVideo 
            ref={videoRef}
            src={videoSrc}
            controls={false}
          />
        ) : (
          <EmptyState>
            <p>No video loaded</p>
            <p>Import a video file to start editing</p>
          </EmptyState>
        )}
      </VideoContainer>
      
      <ControlsContainer>
        <ControlButtons>
          <Button 
            variant="secondary" 
            size="small" 
            color="blue"
            onClick={handleRewind}
            disabled={!videoSrc}
          >
            -5s
          </Button>
          
          <Button 
            variant="secondary" 
            color="pink"
            onClick={togglePlay}
            disabled={!videoSrc}
          >
            {isPlaying ? 'Pause' : 'Play'}
          </Button>
          
          <Button 
            variant="secondary" 
            size="small" 
            color="blue"
            onClick={handleForward}
            disabled={!videoSrc}
          >
            +5s
          </Button>
        </ControlButtons>
        
        <Spacer />
        
        <TimeDisplay>
          {formatTime(currentTime)} / {formatTime(duration)}
        </TimeDisplay>
      </ControlsContainer>
    </Container>
  );
};

export default VideoPlayer; 