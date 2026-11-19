import {
  Modal,
  ModalDescription,
  ModalHeader,
  ModalTitle,
} from '@/components/modal';
import { Form } from './form';
import { Todos } from './todos';
import { t } from '@/lib/i18n';

interface TodoProps {
  onClose: () => void;
  show: boolean;
}

export function Todo({ onClose, show }: TodoProps) {
  return (
    <Modal show={show} onClose={onClose}>
      <ModalHeader>
        <div>
          <ModalTitle>Todo Checklist</ModalTitle>
          <ModalDescription>{t('Super simple todo list.')}</ModalDescription>
        </div>
      </ModalHeader>

      <Form />
      <Todos />
    </Modal>
  );
}
