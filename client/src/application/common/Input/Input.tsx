import { Fragment } from 'react';
import { ChangeEvent } from 'react';
import './Input.scss';

interface IPropType {
  type: 'text' | 'password' | 'email';
  value: string;
  onChange: (value: string) => any;
  isInvalid?: boolean;
  error?: string;
  className?: string;
  placeholder?: string;
}

function Input(props: IPropType) {
  function onChange(event: ChangeEvent<HTMLInputElement>) {
    props.onChange(event.target.value);
  }

  function getProps(): any {
    return {
      type: props.type,
      value: props.value,
      className: `custom-input ${props.className ? props.className : ''} ${
        props.isInvalid ? 'invalid' : ''
      }`,
      onChange: onChange,
      placeholder: props.placeholder || '',
    };
  }

  return (
    <Fragment>
      <input {...getProps()} />
      {props.error && <span>{props.error}</span>}
    </Fragment>
  );
}

export default Input;
