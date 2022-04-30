import { useState, ReactNode } from 'react';
import { Modal as BootstrapModal, ModalHeader, ModalBody } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

interface IPropType {
  title: string;
  children: ReactNode;
  onClose: () => any;
  className?: string;
}

function Modal(props: IPropType) {
  return (
    <BootstrapModal
      show={true}
      onHide={props.onClose}
      aria-labelledby="contained-modal-title-vcenter"
      centered={true}
      className={props.className || ''}
    >
      <ModalHeader closeButton={true}>{props.title}</ModalHeader>

      <ModalBody>{props.children}</ModalBody>
    </BootstrapModal>
  );
}

export default Modal;
