import { useStyle } from '@/hooks';

import styles from './NameInput.module.scss';
import { InputHTMLAttributes, forwardRef } from 'react';
interface Props extends InputHTMLAttributes<HTMLInputElement> {
  color?: 'blue' | 'green';
  editable?: boolean;
  isSquare?: boolean;
}

export const NameInput = forwardRef<HTMLInputElement, Props>(
  ({ color = 'blue', editable = true, isSquare = false, ...rest }, ref) => {
    const { styled: cx } = useStyle(styles);
    const classes = cx('input', color, { 'aspect-square': isSquare });

    return (
      <input
        className={classes}
        readOnly={!editable}
        ref={ref}
        maxLength={3}
        {...rest}
      />
    );
  }
);

NameInput.displayName = 'NameInput';
