import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import merge from 'deepmerge';

export type Language = 'en' | 'zh-CN';

interface SettingsStore {
  alarmVolume: number;
  globalVolume: number;
  language: Language;
  setAlarmVolume: (volume: number) => void;
  setGlobalVolume: (volume: number) => void;
  setLanguage: (language: Language) => void;
}

export function getDefaultLanguage(): Language {
  return typeof navigator !== 'undefined' &&
    navigator.language.toLowerCase().startsWith('zh')
    ? 'zh-CN'
    : 'en';
}

export const useSettingsStore = create<SettingsStore>()(
  persist(
    set => ({
      alarmVolume: 1,
      globalVolume: 1,
      language: 'en',

      setAlarmVolume(volume: number) {
        set({ alarmVolume: volume });
      },

      setGlobalVolume(volume: number) {
        set({ globalVolume: volume });
      },

      setLanguage(language) {
        set({ language });
      },
    }),
    {
      merge: (persisted, current) =>
        merge(current, persisted as Partial<SettingsStore>),
      name: 'moodist-settings',
      partialize: state => ({
        alarmVolume: state.alarmVolume,
        globalVolume: state.globalVolume,
        language: state.language,
      }),
      skipHydration: true,
      storage: createJSONStorage(() => localStorage),
      version: 0,
    },
  ),
);
