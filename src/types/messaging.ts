export interface FrameMessage {
  type: string;
  payload?: any;
  frameId?: string;
  timestamp?: number;
}

export interface ExtensionMessage {
  type: string;
  payload?: any;
  frameId?: string;
  timestamp?: number;
  source: 'SIDE_PANEL' | 'CONTENT_SCRIPT';
}

export type UnifiedMessage = FrameMessage | ExtensionMessage;

export const MESSAGE_TYPES = {
  FRAME_READY: 'FRAME_READY',
  USER_ACTION: 'USER_ACTION',
  STATE_UPDATE: 'STATE_UPDATE',
  ERROR: 'ERROR',
  SIDE_PANEL_READY: 'SIDE_PANEL_READY',
  TIMER_TICK: 'TIMER_TICK',
} as const;

export const UNIFIED_MESSAGE_TYPES = {
  // Existing types
  FRAME_READY: 'FRAME_READY',
  USER_ACTION: 'USER_ACTION',
  STATE_UPDATE: 'STATE_UPDATE',
  ERROR: 'ERROR',
  SIDE_PANEL_READY: 'SIDE_PANEL_READY',
  
  // New unified types
  GLOBAL_STATE_SYNC: 'GLOBAL_STATE_SYNC',
  CROSS_COMPONENT_ACTION: 'CROSS_COMPONENT_ACTION',
  SYSTEM_NOTIFICATION: 'SYSTEM_NOTIFICATION',
} as const;