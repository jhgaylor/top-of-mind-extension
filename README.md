# Top of Mind

A Chrome extension designed to help you remember and organize things you find online. Capture, collect, and recall web content with ease.

## Overview

Top of Mind is a modern Chrome extension (Manifest V3) that provides multiple interfaces for capturing and organizing web content. The extension features a floating action button on every page, a browser popup for quick settings, and a dedicated side panel for managing your saved content.

## Features

### 🎨 User Interface
- **Popup**: Quick access to settings and controls
- **Side Panel**: Dedicated space for browsing saved content with tabs for:
  - Recent items
  - Collections
  - Search functionality
- **Floating Action Button**: Appears on every webpage with quick access to:
  - 📝 Summarize - Generate summaries of web content
  - 🧠 Memorize - Save important information for later
  - 🔍 Research - Deep dive into topics
  - ✅ Fact Check - Verify information

### 🔧 Technical Features
- React 19 with TypeScript for type safety
- Tailwind CSS for responsive styling
- Multi-context architecture with state synchronization
- Chrome Storage API for persistent data

## Installation

### Development Setup

1. Clone the repository:
```bash
git clone https://github.com/jhgaylor/top-of-mind.git
cd top-of-mind
```

2. Install dependencies:
```bash
npm install
```

3. Start the development build:
```bash
npm run watch
```

4. Load the extension in Chrome:
   - Open Chrome and navigate to `chrome://extensions/`
   - Enable "Developer mode" in the top right
   - Click "Load unpacked"
   - Select the `dist` directory from the project

### Production Build

```bash
npm run build
```

## Architecture

The extension operates across multiple Chrome contexts:

### Background Service Worker (`src/apps/background/`)
- Manages global state using Chrome Storage API
- Handles message passing between contexts
- Tracks which UI panels are currently open

### Popup (`src/apps/popup/`)
- Browser action interface
- Settings management (notifications, overlay toggle)
- Quick access to open side panel

### Side Panel (`src/apps/sidepanel/`)
- Persistent sidebar for content management
- Tab-based navigation
- Empty states with helpful actions

### Quick Actions (`src/apps/quickactions/`)
- Content script injected into all web pages
- Floating action button with expandable menu
- Communicates with background script for actions

## Development

### Available Scripts

- `npm run watch` - Start development mode with file watching
- `npm run build` - Create production build
- `npm run typecheck` - Run TypeScript type checking
- `npm run lint` - Run linting (currently same as typecheck)

### Project Structure

```
src/
├── apps/              # Extension entry points
│   ├── background/    # Service worker
│   ├── popup/         # Browser action popup
│   ├── sidepanel/     # Chrome side panel
│   └── quickactions/  # Content script
├── components/        # Shared React components
│   ├── atoms/         # Basic UI elements
│   ├── containers/    # Smart components
│   └── widgets/       # Composite UI components
├── store/            # State management
└── styles/           # Global styles
```

### Component Architecture

- **Atoms**: Basic UI building blocks (Toggle, Button, etc.)
- **Widgets**: Composite components (QuickActionsWidget, etc.)
- **Providers**: Smart components that connect to state (BrowserStateProvider)

### State Management

The extension uses Chrome Storage API for state persistence with a custom hook pattern:
- State is managed in the background service worker
- UI contexts subscribe to state changes
- Automatic synchronization across all extension contexts

## Contributing

Contributions are welcome! Please follow these guidelines:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Style

- TypeScript with strict mode enabled
- React functional components with hooks
- Tailwind CSS for styling
- Path aliases: use `@/` for imports from `src/`

## Roadmap

- [ ] Implement actual content processing functionality
- [ ] Create collections management system
- [ ] Implement search functionality
- [ ] Add content summarization features
- [ ] Build fact-checking integration
- [ ] Add export/import capabilities

## Author

Jake Gaylor

---

**Note**: This extension is currently in early development. Core functionality for saving and retrieving content is still being implemented.
