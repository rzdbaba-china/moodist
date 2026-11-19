import { useState } from 'react';

import { useTodoStore } from '@/stores/todo';

import styles from './form.module.css';
import { t } from '@/lib/i18n';

export function Form() {
  const [value, setValue] = useState('');

  const addTodo = useTodoStore(state => state.addTodo);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!value.trim().length) return;

    addTodo(value);
    setValue('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className={styles.wrapper}>
        <input
          placeholder={t('I have to ...')}
          type="text"
          value={value}
          onChange={e => setValue(e.target.value)}
        />
        <button type="submit">{t('Add')}</button>
      </div>
    </form>
  );
}
