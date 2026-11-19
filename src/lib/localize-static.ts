import { translateStaticText } from '@/lib/i18n';
import type { Language } from '@/stores/settings';

export function localizeStaticContent() {
  const update = () => {
    const language: Language =
      document.documentElement.lang === 'zh-CN' ? 'zh-CN' : 'en';
    document.documentElement.lang = language;

    document.querySelectorAll<HTMLElement>('[data-i18n]').forEach(element => {
      const text = translateStaticText(
        element.dataset.i18n ?? '',
        element.dataset.i18nCount,
        language,
      );

      if (element instanceof HTMLMetaElement) {
        element.content = text;
      } else {
        element.textContent = text;
      }
    });
  };

  update();

  document.addEventListener('moodist:language-change', update);

  return () => document.removeEventListener('moodist:language-change', update);
}
