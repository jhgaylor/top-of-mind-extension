const PRESENCE_CONTEXTS = ['popup', 'sidepanel'] as const;

type PresenceContext = typeof PRESENCE_CONTEXTS[number];

export function isPresenceContext(context: string): context is PresenceContext {
  return (PRESENCE_CONTEXTS as readonly string[]).includes(context);
}

export class PresenceTracker {
  private static instance: PresenceTracker;
  private onChangeCallbacks: ((present: string[]) => void)[] = [];

  private constructor() {
    this.connectedContexts = {
      popup: false,
      sidepanel: false
    };
  }

  public static getInstance(): PresenceTracker {
    if (!PresenceTracker.instance) {
      PresenceTracker.instance = new PresenceTracker();
    }
    return PresenceTracker.instance;
  }

  private connectedContexts: Record<PresenceContext, boolean> = {
    popup: false,
    sidepanel: false
  };

  public get present() {
    return Object.keys(this.connectedContexts).filter(key => this.connectedContexts[key as PresenceContext]);
  }

  public async join(channelName: PresenceContext) {
    this.connectedContexts = {
      ...this.connectedContexts,
      [channelName]: true
    };
    this.onChangeCallbacks.forEach(callback => callback(this.present));
  }

  public async leave(channelName: PresenceContext) {
    this.connectedContexts = {
      ...this.connectedContexts,
      [channelName]: false
    };
    this.onChangeCallbacks.forEach(callback => callback(this.present));
  }

  public onChange(callback: (present: string[]) => void) {
    this.onChangeCallbacks.push(callback);
    return () => {
      this.onChangeCallbacks = this.onChangeCallbacks.filter(cb => cb !== callback);
    };
  }
}

export const Presence = PresenceTracker.getInstance();

export function presenceConnectionListener(port: chrome.runtime.Port): void {
  if (isPresenceContext(port.name)) {
    const portName = port.name;
    Presence.join(portName);

    port.onDisconnect.addListener(() => {
      Presence.leave(portName);
    });
  }
}
