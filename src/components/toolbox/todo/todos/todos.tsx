import { Todo } from './todo';

import { useTodoStore } from '@/stores/todo';

import styles from './todos.module.css';
import { t } from '@/lib/i18n';

export function Todos() {
  const todos = useTodoStore(state => state.todos);
  const doneCount = useTodoStore(state => state.doneCount());

  return (
    <div className={styles.todos}>
      <header>
        <p className={styles.label}>{t('Your Todos')}</p>
        <div className={styles.divider} />
        <p className={styles.counter}>
          {doneCount} / {todos.length}
        </p>
      </header>

      {todos.length > 0 ? (
        todos.map(todo => (
          <Todo done={todo.done} id={todo.id} key={todo.id} todo={todo.todo} />
        ))
      ) : (
        <p className={styles.empty}>{t("You don't have any todos.")}</p>
      )}
    </div>
  );
}
