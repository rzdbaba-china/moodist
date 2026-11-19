import { cn } from '@/helpers/styles';
import { t } from '@/lib/i18n';

import styles from './modal.module.css';

export function ModalHeader({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'header'>) {
  return <header className={cn(styles.header, className)} {...props} />;
}

export function ModalTitle({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'h2'>) {
  const { children, ...rest } = props;
  return (
    <h2 className={cn(styles.title, className)} {...rest}>
      {typeof children === 'string' ? t(children) : children}
    </h2>
  );
}

export function ModalDescription({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'p'>) {
  const { children, ...rest } = props;
  return (
    <p className={cn(styles.description, className)} {...rest}>
      {typeof children === 'string' ? t(children) : children}
    </p>
  );
}

export function ModalActions({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'div'>) {
  return <div className={cn(styles.actions, className)} {...props} />;
}

interface ModalButtonProps extends React.ComponentPropsWithoutRef<'button'> {
  fullWidth?: boolean;
  variant?: 'default' | 'primary';
}

export function ModalButton({
  className,
  fullWidth,
  variant = 'default',
  ...props
}: ModalButtonProps) {
  const { children, ...rest } = props;
  return (
    <button
      className={cn(
        styles.button,
        styles[variant],
        fullWidth && styles.fullWidth,
        className,
      )}
      {...rest}
    >
      {typeof children === 'string' ? t(children) : children}
    </button>
  );
}
