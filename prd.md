## Project Overview: Web-Based Video Editing App

### Project Goals
- Develop a web-based video editing application to automate repetitive tasks in video editing, particularly for YouTube content creation.
- Support large video files (2-3 hours) with efficient performance.
- Provide a clean, intuitive user interface (UI) with a dark theme, soft retro colors, and an 80's retro vibe.
- Initially build the app for personal use, with potential for open-sourcing or monetization later.

### Target Audience
- Primarily for personal use, but designed to be extensible for a broader audience if released publicly.

---

## Key Features

1. **Video Import/Export**
   - Import formats: MP4, MOV, AVI, WMV.
   - Export formats: MP4, MOV with resolution options (720p, 1080p, 4K).
   - Handle large video files (2-3 hours) efficiently using chunked processing or proxy files.

2. **XML/FCPXML Support**
   - Import and export project files in XML and FCPXML formats for compatibility with other editing software (e.g., Final Cut Pro).

3. **Basic Editing Tools**
   - Trim, cut, and arrange video clips using drag-and-drop functionality.
   - Provide visual feedback during edits using HTML5 Canvas or WebGL.

4. **Audio Management**
   - Add, remove, and adjust multiple audio tracks (e.g., music, voiceovers).
   - Link and unlink audio from video clips for flexible editing (e.g., for J-cuts).
   - Adjust volume, apply fade in/out, and mute tracks using the Web Audio API.

5. **Timeline Interface**
   - Horizontal, interactive timeline with separate tracks for video and audio.
   - Support zoom in/out, scroll, and snapping for precise editing.
   - Visual markers for cuts, transitions, and J-cuts.

6. **Automatic Batch J-Cutting**
   - Automate J-cuts across the entire timeline with a user-defined duration (e.g., 2 seconds).
   - Allow skipping specific transitions and fine-tuning after batch application.

7. **Text-Based Editing**
   - Use a local Whisper installation to transcribe video audio.
   - Display transcription in a toggleable panel and allow text edits (e.g., delete, rearrange) to adjust the video timeline.
   - Support multiple speakers in the transcription.

8. **UI/UX Design**
   - Dark theme with soft retro colors (muted neons: pink, blue, green, purple).
   - Retro-inspired typography, icons, and design elements (e.g., glow effects, rounded edges).
   - Initial screen for loading projects and a full editing interface with toggleable panels.
   - Video feed with playback controls (play, stop, rewind, fast forward).

---

## Technical Stack
- **Front-End Framework**: React or Vue.js for a modular, dynamic UI.
- **Video Processing**: FFmpeg.js for in-browser video manipulation (trimming, cutting, exporting).
- **Timeline**: HTML5 Canvas or Konva.js for a smooth, interactive timeline.
- **Audio**: Web Audio API for real-time audio management.
- **Whisper Integration**: A local server (e.g., Node.js) to bridge the app and Whisper for transcription.
- **Performance Optimizations**: Proxy files for large videos and chunked processing for imports.

---

## UI Workflow

### 1. Initial Screen
- A clean, simple UI with options to:
  - Load a video file (MP4, MOV, AVI, WMV).
  - Load an XML or FCPXML file.
  - Open a previously saved project.
- Display a list of recent projects for quick access.
- Use a dark background with soft neon accents and retro typography.

### 2. Full Editing Interface
- **Menu Bar (Top)**: File (Save, Export), Edit (Undo, Redo), View (Toggle panels), Settings.
- **Tool Panels (Left)**: Collapsible panels for Media Bin, Editing Tools, and Text-Based Editing.
- **Video Feed (Center/Right)**: Large video player with retro-styled playback controls (play, stop, rewind, fast forward).
- **Timeline (Bottom)**: Interactive timeline with video and audio tracks, zoom/scroll functionality, and retro design elements.
- **Text-Based Editing**: Toggleable panel with transcription, allowing text edits to adjust the video.

### 3. Design Elements
- Dark background with soft neon accents (pink, blue, green, purple).
- Retro typography and icons (e.g., pixelated or softened 80's fonts).
- Subtle glow effects, gradients, and rounded edges for a nostalgic feel.
- Consistent use of muted neon colors for buttons, highlights, and outlines.

---

## Additional Requirements
- **Audio Linking**: Allow linking and unlinking of audio from video clips with a retro "chain" icon.
- **Whisper Integration**: Detect if Whisper is installed locally and provide setup guidance if needed.
- **Performance**: Optimize for large files using proxy files and chunked processing.
- **Browser Support**: Ensure compatibility with Chrome, Safari, and Firefox.
- **Future AI Features**: Plan for AI-driven take selection and scene assembly (to be implemented later).

---

## Performance Optimizations
- Use proxy files for editing large videos (2-3 hours) to reduce memory usage.
- Implement chunked processing for video imports to handle large files efficiently.
- Optimize timeline rendering and playback for smooth performance in the browser.

---

## Browser Support
- Test and ensure consistent functionality across Chrome, Safari, and Firefox. 