# Sidepanel App

The sidepanel app provides a persistent sidebar interface for the Top of Mind extension, allowing users to manage their saved content and collections.

## Structure

The sidepanel follows the same organizational pattern as the popup app:

```
sidepanel/
├── app.tsx              # Main app component with routing
├── layout.tsx           # Layout wrapper with header and theme
├── index.tsx            # Entry point
├── index.html           # HTML template
├── sidepanel.css        # Tailwind CSS styles
├── components/
│   ├── atoms/           # Basic UI components
│   │   ├── Toggle.tsx   # Toggle switch component
│   │   └── index.ts     # Export barrel
│   └── widgets/         # Composite UI components
│       ├── LoadingState.tsx      # Loading spinner
│       ├── ConnectionError.tsx   # Error state
│       ├── TabNavigation.tsx     # Tab navigation
│       ├── EmptyState.tsx        # Empty state display
│       └── index.ts              # Export barrel
└── screens/             # Route screens
    └── SidePanelRootScreen.tsx   # Main screen with tabs

```

## Features

- **Tab Navigation**: Switch between Recent, Collections, and Search views
- **Dark Mode**: Theme toggle with persistence via Redux
- **State Management**: Connected to the extension's Redux store
- **Responsive Design**: Optimized for sidebar dimensions (320-420px wide)

## Usage

The sidepanel can be opened programmatically:

```javascript
chrome.sidePanel.open({ windowId: chrome.windows.WINDOW_ID_CURRENT });
```

Or by user action through the browser's side panel menu.

## Development

The sidepanel uses:
- React 19 with TypeScript
- Tailwind CSS for styling
- Wouter for routing (with memory location)
- Redux (via webext-redux) for state management
- Custom atoms/widgets component architecture