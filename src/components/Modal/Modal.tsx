'use client';

import classNames from 'classnames/bind';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useRef } from 'react';

import styles from './Modal.module.scss';

const cx = classNames.bind(styles);

interface Props {
  children: React.ReactNode;
}

export const Modal = ({ children }: Props) => {
  const router = useRouter();
  const overlay = useRef<HTMLDivElement>(null);
  const wrapper = useRef<HTMLDivElement>(null);

  const onDismiss = useCallback(() => {
    router.back();
  }, [router]);

  const onCloseModal: React.MouseEventHandler = useCallback(
    (e) => {
      if (e.target === overlay.current || e.target === wrapper.current) {
        if (onDismiss) onDismiss();
      }
    },
    [onDismiss]
  );

  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, []);

  return (
    <div className={cx('overlay')} ref={overlay} onClick={onCloseModal}>
      <div className={cx('wrapper')} ref={wrapper}>
        {children}
      </div>
    </div>
  );
};
