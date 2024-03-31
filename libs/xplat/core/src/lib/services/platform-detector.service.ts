import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PlatformDetectorService {
  // Check if the app is running in Electron
  isElectron(): boolean {
    // Renderer process in Electron can access the 'window' object and 'process' object
    // return window && window.process && window.process.type;

    // Check if 'navigator' is available to avoid errors in SSR or prerendering environments
    if (typeof navigator === 'undefined') return false;

    // The presence of the 'Electron' in the user agent is a common but not entirely reliable way to check
    const userAgent = navigator.userAgent.toLowerCase();
    return userAgent.includes('electron');
  }
}
