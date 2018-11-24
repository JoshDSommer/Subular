import { TapticEngine } from 'nativescript-taptic-engine';
import { ClassProvider } from '@angular/core';

export const VIBRATE_PROVIDER: ClassProvider = {
  provide: TapticEngine,
  useClass: TapticEngine
};
