import { useState } from "react";
import Toast from "react-bootstrap/Toast";

interface ToastProps {
  background: string;
  message: string;
  isOpen: boolean;
}

const ToastComponent = ({ background, message, isOpen }: ToastProps) => {
  const [show, setShow] = useState<boolean>(isOpen);

  return (
    <div>
      <Toast
        onClose={() => setShow(!show)}
        show={show}
        bg={background}
        delay={2000}
        autohide
      >
        <Toast.Header>Toast à la con</Toast.Header>
        <Toast.Body className="text-white text-center">{message}</Toast.Body>
      </Toast>
    </div>
  );
};

export default ToastComponent;
