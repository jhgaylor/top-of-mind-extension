# JakeGaylor.com Extension

A dynamic Chrome extension with iframe-based controls and multiple content scripts. The extension provides a control panel that allows users to dynamically load and unload different content scripts on the page.

## Architecture

The extension uses an iframe-based architecture with the following components:

### Core Components

- **Content Script Manager** (`src/content.tsx`): Main orchestrator that manages the iframe and active content scripts
- **Iframe Base** (`src/iframe-base.html`): HTML-based control panel that runs inside an iframe
- **Content Scripts** (`src/content-scripts/`): Individual content script components that can be loaded dynamically

### Available Content Scripts

1. **Sidebar Content** (`sidebar-content.tsx`): A fixed sidebar with page tools, notes, and quick actions
2. **Floating Widget** (`floating-widget.tsx`): A collapsible floating widget that shows page statistics
3. **Page Analyzer** (`page-analyzer.tsx`): A detailed content analysis tool with readability metrics

## Quickstart

Install node dependencies and start the dev server

```
npm i
npm run dev
```

Install the dev version of the chrome extension by loading `dist-dev/` as an unpacked extension. 

Navigate to [jakegaylor.com](https://jakegaylor.com) to see the extension load.

Change files in `src/content-scripts/` and refresh jakegaylor.com to see the updated extension.

## Key Features

- **Dynamic Loading**: Content scripts can be loaded and unloaded dynamically through the control panel
- **Iframe Isolation**: The control panel runs in an isolated iframe for better security and styling
- **Shadow DOM**: Content scripts are rendered in a shadow DOM to prevent style conflicts
- **Hot Reloading**: Development server provides hot reloading for faster development
- **Message Passing**: Communication between the iframe and parent page using postMessage API

## Adding New Content Scripts

To add a new content script:

1. Create a new component in `src/content-scripts/`
2. Add it to the `contentScripts` mapping in `src/content.tsx`
3. Add it to the `scripts` array in `src/iframe-base.html`
4. The script will automatically be available in the control panel

## Available NPM Scripts

- `npm run build` - Production build
- `npm run dev` - Development mode with hot reload
- `npm run typecheck` - Run TypeScript type checking
- `npm run lint` - Run TypeScript linting (same as typecheck)
