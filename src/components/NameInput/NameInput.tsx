import { useStyle } from '@/hooks';

import styles from './NameInput.module.scss';
import { InputHTMLAttributes } from 'react';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  color?: 'blue' | 'green';
  editable?: boolean;
}

/**
 * 한글자만 써지게,
 * 하나 쓰면 다음 글자 써지게 input 이동
 * 지우면 옆 인풋창으로 이동, 지워지게 - 접근성
 *
 */

export const NameInput = ({
  color = 'blue',
  editable = true,
  ...rest
}: Props) => {
  const { styled: cx } = useStyle(styles);
  const classes = cx('input', color);
  return <input className={classes} readOnly={!editable} {...rest} />;
};
