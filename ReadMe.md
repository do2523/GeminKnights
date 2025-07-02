# FocusForge 🎯

**A Smart Productivity Chrome Extension with AI-Powered Reflection**

*Developed during the 2025 GeminiKnights Hackathon at University of Central Florida*

---

## 🏆 About

FocusForge is an intelligent Chrome extension that revolutionizes your study and work sessions by combining customizable timers with AI-powered reflection and improvement suggestions. Built during the prestigious GeminiKnights Hackathon at UCF, this extension leverages Google's Gemini AI to provide personalized productivity insights.

##  Features

### 🔄 Smart Session Management
- **Custom Timer Sessions**: Set personalized study/work intervals (1-60 minutes)
- **Session Naming**: Organize your focus sessions with custom names
- **Persistent State**: Sessions continue even if browser is closed
- **Background Notifications**: Get notified when sessions complete

### 🤔 Intelligent Reflection System
- **Post-Session Reflection**: Guided questions after each timer completion
- **Session History**: Track all your reflections and sessions
- **Progressive Insights**: Build understanding through consistent reflection

### 🤖 AI-Powered Improvements
- **Gemini Integration**: After 3 reflection iterations, get personalized tips
- **Contextual Analysis**: AI analyzes your reflection patterns
- **Actionable Suggestions**: Receive specific, implementable advice
- **Motivational Feedback**: Encouraging insights to boost productivity

### 📊 Session Tracking
- **Completed Sessions**: View history of all finished sessions
- **Reflection Archive**: Access past reflections and insights
- **Progress Monitoring**: Track your productivity journey over time

## 🚀 How It Works

1. **Start a Session**: Name your focus session and set a custom timer
2. **Focus Time**: Work distraction-free while the timer runs in background
3. **Reflect**: Answer guided questions about your session when timer completes
4. **Get AI Insights**: After multiple sessions, receive personalized improvement suggestions from Gemini AI
5. **Improve**: Apply suggestions and track your productivity evolution

## 🛠️ Installation

### Method 1: Load Unpacked Extension
1. Download or clone this repository
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" (top right toggle)
4. Click "Load unpacked" (top left)
5. Select the `GeminKnights` folder
6. **Pro Tip**: Pin the extension by clicking the puzzle piece icon next to the address bar

### Method 2: Manual Setup
```bash
git clone https://github.com/do2523/GeminKnights.git
cd GeminKnights
# Follow steps 2-5 from Method 1
```

## Usage Guide

### Starting Your First Session
1. Click the FocusForge extension icon
2. Enter a descriptive session name
3. Click "Start Session"
4. Set your desired timer duration (1-60 minutes)
5. Click "Start Session" to begin

### During a Session
- Timer runs in the background
- Continue working as normal
- Extension will notify you when time expires

### Post-Session Reflection
1. Reflection window opens automatically when timer ends
2. Answer the three guided questions:
   - What went well?
   - What could've gone better?
   - Why did challenges happen?
3. Submit your reflection

### Getting AI Insights
- After completing multiple reflection cycles
- Navigate to the AI insights section
- Click "Get Improvements" for personalized Gemini-powered suggestions
- Receive actionable, motivational feedback

##  Technical Architecture

### Core Technologies
- **Manifest V3**: Modern Chrome extension architecture
- **Service Workers**: Background persistence and notifications
- **Chrome Storage API**: Session and reflection data persistence
- **Google Gemini API**: AI-powered analysis and suggestions

### Project Structure
```
GeminKnights/
├── manifest.json              # Extension configuration
├── background.js             # Service worker for timer logic
├── styles.css               # Global styling
├── pages/
│   ├── start/              # Session initialization
│   ├── ongoing/            # Timer interface
│   ├── reflect/            # Post-session reflection
│   ├── gemini-questions/   # AI insights interface
│   └── finalreport/        # Session history
└── resources/              # Icons and assets
```

### Key Features Implementation
- **Timer Persistence**: Background service worker maintains timer state
- **Cross-Session Data**: Chrome storage for reflection history
- **AI Integration**: Secure Gemini API calls for personalized insights
- **Responsive UI**: Modern, clean interface optimized for extension popup

##  Permissions

The extension requires these permissions:
- `storage`: Save session data and reflections
- `notifications`: Alert when sessions complete
- `windows`: Open reflection interface
- `activeTab`: Basic tab interaction
- `scripting`: Content script functionality

## 🎯 Hackathon Achievement

This project was developed during the **2025 GeminiKnights Hackathon** at the **University of Central Florida**, showcasing:
- Innovative use of Google's Gemini AI
- Modern Chrome extension development
- User-centered productivity design
- Smart reflection and improvement systems

## 🚀 Future Enhancements

- **Analytics Dashboard**: Detailed productivity metrics
- **Team Sessions**: Collaborative focus sessions
- **Goal Setting**: Achievement tracking and milestones
- **Integration**: Calendar and task management connections
- **Customization**: Themes and personalization options

## 👥 Contributors


- Dylan Moo Hernandez
- Daniel Ocampo
- Jakob Laise
- Peter Petro

##  License

This project was created for the 2025 GeminiKnights 12hour Hackathon at University of Central Florida.

---

**Focus Better. Reflect Deeper. Improve Continuously.**

*FocusForge - Where productivity meets intelligence.*
