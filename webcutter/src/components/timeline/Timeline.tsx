import React, { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import theme from '../../styles/theme';
import { Clip } from '../../types';

interface TimelineProps {
  duration: number;
  currentTime: number;
  clips?: Clip[];
  onSeek: (time: number) => void;
  zoom?: number;
}

// Define color type for type safety
type NeonColor = 'neonPink' | 'neonBlue' | 'neonGreen' | 'neonPurple';
type GlowEffect = 'pinkGlow' | 'blueGlow' | 'greenGlow' | 'purpleGlow';

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: ${theme.colors.timelineBackground};
  position: relative;
  user-select: none;
`;

const TimeRuler = styled.div`
  height: 30px;
  background-color: ${theme.colors.backgroundDark};
  border-bottom: 1px solid ${theme.colors.border};
  position: relative;
  overflow: hidden;
`;

const TimeMarkers = styled.div<{ zoom: number }>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  /* Scale based on zoom level */
  transform: scale(${props => props.zoom}, 1);
  transform-origin: left center;
`;

const TimeMarker = styled.div`
  position: absolute;
  height: 10px;
  border-left: 1px solid ${theme.colors.timelineRuler};
  bottom: 0;
  color: ${theme.colors.textSecondary};
  font-family: ${theme.typography.fontFamily.secondary};
  font-size: ${theme.typography.fontSize.xs};
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TimeText = styled.span`
  position: absolute;
  top: 2px;
  transform: translateX(-50%);
  text-shadow: 0 0 2px rgba(0, 0, 0, 0.5);
`;

const Tracks = styled.div`
  flex: 1;
  position: relative;
  overflow: auto;
  display: flex;
  flex-direction: column;
`;

const Track = styled.div<{ type: 'video' | 'audio' }>`
  height: 60px;
  background-color: ${props => props.type === 'video' ? 
    theme.colors.videoTrack : theme.colors.audioTrack};
  border-bottom: 1px solid ${theme.colors.border};
  position: relative;
`;

const ClipItem = styled.div<{ start: number; width: number; color: NeonColor; zoom: number }>`
  position: absolute;
  height: 80%;
  top: 10%;
  left: ${props => props.start * 100 * props.zoom}px;
  width: ${props => props.width * 100 * props.zoom}px;
  background: ${props => theme.colors[props.color]};
  border-radius: ${theme.borderRadius.small};
  border: 2px solid rgba(255, 255, 255, 0.2);
  box-shadow: ${theme.effects.boxShadow};
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: ${theme.typography.fontFamily.secondary};
  font-size: ${theme.typography.fontSize.xs};
  color: ${theme.colors.textPrimary};
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  padding: 0 ${theme.spacing.sm};
  cursor: pointer;
  transition: transform ${theme.animation.fast} ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${props => {
      const glowKey = `${props.color.replace('neon', '').toLowerCase()}Glow` as GlowEffect;
      return theme.effects[glowKey];
    }};
    z-index: 10;
  }
`;

const Playhead = styled.div<{ position: number; zoom: number }>`
  position: absolute;
  height: 100%;
  width: 2px;
  background-color: ${theme.colors.neonPink};
  top: 0;
  left: ${props => props.position * 100 * props.zoom}px;
  z-index: 100;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -4px;
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-top: 8px solid ${theme.colors.neonPink};
  }
  
  /* Retro glow effect */
  filter: drop-shadow(0 0 2px ${theme.colors.neonPink});
`;

// Background grid with retro styling
const Grid = styled.div<{ zoom: number }>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: 
    linear-gradient(
      90deg, 
      ${theme.colors.timelineGrid} 1px, 
      transparent 1px
    );
  background-size: ${props => 100 * props.zoom}px 100%;
  pointer-events: none;
  opacity: 0.2;
  z-index: 1;
`;

const EmptyState = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  color: ${theme.colors.textSecondary};
  font-family: ${theme.typography.fontFamily.secondary};
  font-size: ${theme.typography.fontSize.md};
`;

const Timeline: React.FC<TimelineProps> = ({
  duration,
  currentTime,
  clips = [],
  onSeek,
  zoom = 1,
}) => {
  const tracksRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  
  // Sample clip for demonstration
  const sampleClips: Clip[] = clips.length > 0 ? clips : [
    {
      id: '1',
      name: 'Intro',
      sourceFile: 'video.mp4',
      startTime: 0,
      duration: duration > 0 ? Math.min(duration, 30) : 30,
      sourceStartTime: 0,
      sourceEndTime: 30,
      trackIndex: 0,
    },
    {
      id: '2',
      name: 'Middle Section',
      sourceFile: 'video.mp4',
      startTime: 35,
      duration: 45,
      sourceStartTime: 35,
      sourceEndTime: 80,
      trackIndex: 0,
    }
  ];
  
  // Generate time markers based on duration and zoom level
  const generateTimeMarkers = () => {
    if (duration <= 0) return [];
    
    const markers = [];
    // Adjust interval based on zoom level and duration
    const interval = duration > 600 ? 60 : duration > 300 ? 30 : duration > 60 ? 10 : 5;
    
    for (let i = 0; i <= duration; i += interval) {
      markers.push({
        time: i,
        label: formatTime(i),
      });
    }
    
    return markers;
  };
  
  // Format seconds to MM:SS format
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };
  
  // Handle click on tracks to seek
  const handleTracksClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!tracksRef.current || duration <= 0) return;
    
    const rect = tracksRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newTime = (clickX / (100 * zoom)) * (duration / 100);
    
    // Make sure we don't seek beyond the duration
    const clampedTime = Math.max(0, Math.min(duration, newTime));
    onSeek(clampedTime);
  };
  
  // Handle mouse down to start dragging
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (duration <= 0) return;
    
    setIsDragging(true);
    handleTracksClick(e);
  };
  
  // Handle mouse move while dragging
  useEffect(() => {
    if (!isDragging) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      if (!tracksRef.current || duration <= 0) return;
      
      const rect = tracksRef.current.getBoundingClientRect();
      const moveX = e.clientX - rect.left;
      const newTime = (moveX / (100 * zoom)) * (duration / 100);
      
      const clampedTime = Math.max(0, Math.min(duration, newTime));
      onSeek(clampedTime);
    };
    
    const handleMouseUp = () => {
      setIsDragging(false);
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, onSeek, duration, zoom]);
  
  // Determine clip color based on index
  const getClipColor = (index: number): NeonColor => {
    const colors: NeonColor[] = ['neonBlue', 'neonPink', 'neonGreen', 'neonPurple'];
    return colors[index % colors.length];
  };
  
  if (duration <= 0) {
    return (
      <Container>
        <EmptyState>
          No video loaded or duration is unknown
        </EmptyState>
      </Container>
    );
  }
  
  return (
    <Container>
      <TimeRuler>
        <TimeMarkers zoom={zoom}>
          {generateTimeMarkers().map((marker, index) => (
            <TimeMarker 
              key={index}
              style={{ left: `${marker.time * 100}px` }}
            >
              <TimeText>{marker.label}</TimeText>
            </TimeMarker>
          ))}
        </TimeMarkers>
      </TimeRuler>
      
      <Tracks 
        ref={tracksRef}
        onMouseDown={handleMouseDown}
      >
        <Grid zoom={zoom} />
        <Track type="video">
          {sampleClips.map((clip, index) => (
            <ClipItem
              key={clip.id}
              start={clip.startTime}
              width={clip.duration}
              color={getClipColor(index)}
              zoom={zoom}
            >
              {clip.name}
            </ClipItem>
          ))}
          <Playhead position={currentTime} zoom={zoom} />
        </Track>
        <Track type="audio">
          {/* Audio clips will go here */}
        </Track>
      </Tracks>
    </Container>
  );
};

export default Timeline; 