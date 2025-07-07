type AppState = {
  notificationsEnabled: boolean;
  overlayEnabled: boolean;
};

const _defaultState: AppState = {
  notificationsEnabled: false,
  overlayEnabled: false,
};

export class AppStateStore {
  private _state: AppState;

  constructor(defaultState: AppState = _defaultState) {
    this._state = defaultState;
  }

  public async init(): Promise<void> {
    const result = await chrome.storage.local.get(this._state);
    this._state = {
      ...this._state,
      ...result,
    };
    chrome.storage.local.set(this._state);
  }

  public get state(): AppState {
    return this._state;
  }

  public set state(state: AppState) {
    this._state = state;
    chrome.storage.local.set(this._state);
  }
}
