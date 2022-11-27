import { FormEvent, useRef } from "react";
import { Button, Container, FloatingLabel, Form } from "react-bootstrap";

interface AuthFormProps {
  onFormSubmit: { (formData: FormDataType): void };
  button: string;
}

export interface FormDataType {
  email: string;
  password: string;
}

const AuthForm = (props: AuthFormProps) => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (emailRef.current?.value && passwordRef.current?.value) {
      const newUser = {
        email: emailRef.current.value,
        password: passwordRef.current.value,
      };
      props.onFormSubmit(newUser);
    }
  };
  return (
    <>
      <h2 className="mb-5 text-center">{props.button}</h2>
      <Form onSubmit={handleSubmit} className="mb-3">
        <FloatingLabel label="Email adress" className="mb-3">
          <Form.Control
            type="text"
            ref={emailRef}
            placeholder="email@email.com"
          />
        </FloatingLabel>
        <FloatingLabel label="Password" className="mb-3">
          <Form.Control
            type="password"
            ref={passwordRef}
            placeholder="8+ characters"
          />
        </FloatingLabel>
        <Button type="submit">{props.button}</Button>
      </Form>
    </>
  );
};

export default AuthForm;
