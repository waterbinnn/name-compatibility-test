import { useStyle } from '@/hooks';

import styles from './NameInput.module.scss';
import { InputHTMLAttributes, forwardRef } from 'react';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  placeholder: string;
  value: string;
}

export const NameInput = forwardRef<HTMLInputElement, Props>(
  ({ placeholder, value, ...rest }, ref) => {
    const { styled: cx } = useStyle(styles);
    const classes = cx('input');

    return (
      <input
        placeholder={placeholder}
        className={classes}
        ref={ref}
        minLength={3}
        maxLength={3}
        value={value}
        {...rest}
      />
    );
  }
);

NameInput.displayName = 'NameInput';
