import { useEffect } from 'react';

import { useSoundStore } from '@/stores/sound';
import {
  getDefaultLanguage,
  useSettingsStore,
  type Language,
} from '@/stores/settings';
import { useNoteStore } from '@/stores/note';
import { usePresetStore } from '@/stores/preset';
import { useTodoStore } from '@/stores/todo';

interface StoreConsumerProps {
  children: React.ReactNode;
}

export function StoreConsumer({ children }: StoreConsumerProps) {
  useEffect(() => {
    useSoundStore.persist.rehydrate();
    const settingsHydration = useSettingsStore.persist.rehydrate();
    useNoteStore.persist.rehydrate();
    usePresetStore.persist.rehydrate();
    useTodoStore.persist.rehydrate();

    void Promise.resolve(settingsHydration).then(() => {
      const persistedSettings = localStorage.getItem('moodist-settings');
      const savedLanguage = persistedSettings
        ? (
            JSON.parse(persistedSettings) as {
              state?: { language?: Language };
            }
          ).state?.language
        : undefined;

      if (savedLanguage === undefined) {
        const defaultLanguage = getDefaultLanguage();
        if (defaultLanguage === 'zh-CN') {
          useSettingsStore.getState().setLanguage(defaultLanguage);
        }
      }
    });
  }, []);

  return <>{children}</>;
}
