// Video import/export related types
export type VideoFormat = 'mp4' | 'mov' | 'avi' | 'wmv';
export type ExportResolution = '720p' | '1080p' | '4k';

// Project types
export interface Project {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  duration: number; // in seconds
  fps: number;
  resolution: {
    width: number;
    height: number;
  };
  clips: Clip[];
  audioTracks: AudioTrack[];
}

// Video Clip
export interface Clip {
  id: string;
  name: string;
  sourceFile: string;
  startTime: number; // in timeline (seconds)
  duration: number; // in seconds
  sourceStartTime: number; // original start in source file (seconds)
  sourceEndTime: number; // original end in source file (seconds)
  trackIndex: number;
  linkedAudioId?: string; // ID of linked audio clip
}

// Audio Track
export interface AudioTrack {
  id: string;
  name: string;
  clips: AudioClip[];
  volume: number; // 0 to 1
  isMuted: boolean;
}

// Audio Clip
export interface AudioClip {
  id: string;
  name: string;
  sourceFile?: string; // Optional for generated audio
  startTime: number; // in timeline (seconds)
  duration: number; // in seconds
  sourceStartTime?: number; // original start in source file (seconds)
  sourceEndTime?: number; // original end in source file (seconds)
  volume: number; // 0 to 1
  fadeIn: number; // fade in duration in seconds
  fadeOut: number; // fade out duration in seconds
  isMuted: boolean;
  linkedVideoId?: string; // ID of linked video clip
}

// J-Cut configuration
export interface JCutConfig {
  duration: number; // in seconds
  skipTransitions: string[]; // IDs of transitions to skip
}

// Transcription types
export interface TranscriptionSegment {
  id: string;
  startTime: number; // in seconds
  endTime: number; // in seconds
  text: string;
  speaker?: string;
  confidence: number;
}

export interface Transcription {
  id: string;
  sourceFile: string;
  segments: TranscriptionSegment[];
  speakers: string[];
}

// UI State
export interface UIState {
  currentTime: number; // in seconds
  isPlaying: boolean;
  zoom: number; // zoom level for timeline
  selectedClipIds: string[];
  selectedAudioClipIds: string[];
  selectedTranscriptionSegmentIds: string[];
  panelVisibility: {
    mediaLibrary: boolean;
    tools: boolean;
    transcription: boolean;
  };
}

// Theme type
export interface Theme {
  colors: {
    background: string;
    backgroundLight: string;
    backgroundDark: string;
    neonPink: string;
    neonBlue: string;
    neonGreen: string;
    neonPurple: string;
    gradientPink: string;
    gradientBlue: string;
    gradientGreen: string;
    gradientPurple: string;
    textPrimary: string;
    textSecondary: string;
    textMuted: string;
    border: string;
    divider: string;
    hover: string;
    active: string;
    timelineBackground: string;
    timelineGrid: string;
    timelineRuler: string;
    videoTrack: string;
    audioTrack: string;
    success: string;
    warning: string;
    error: string;
    info: string;
  };
  typography: {
    fontFamily: {
      primary: string;
      secondary: string;
      body: string;
    };
    fontSize: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
      xxl: string;
      xxxl: string;
    };
    fontWeight: {
      normal: number;
      medium: number;
      bold: number;
    };
  };
  spacing: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    xxl: string;
  };
  borderRadius: {
    small: string;
    medium: string;
    large: string;
    pill: string;
  };
  effects: {
    boxShadow: string;
    buttonShadow: string;
    pinkGlow: string;
    blueGlow: string;
    greenGlow: string;
    purpleGlow: string;
  };
  animation: {
    fast: string;
    normal: string;
    slow: string;
  };
  zIndex: {
    base: number;
    dropdown: number;
    modal: number;
    tooltip: number;
  };
  breakpoints: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
} 