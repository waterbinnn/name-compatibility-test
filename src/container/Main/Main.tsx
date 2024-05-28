'use client';

import { useStyle } from '@/hooks';
import styles from './Main.module.scss';
import { NameInput } from '@/components';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export const Main = () => {
  const { styled: cx } = useStyle(styles);
  const [isFilled, setIsFilled] = useState<boolean>(true);
  return (
    <div className={cx('container')}>
      <h1 className={cx('title')}>우리의</h1>
      <h1 className={cx('title')}>이름 궁합은?</h1>
      <div className={cx('inputs')}>
        <NameInput />
        <NameInput />
        <NameInput />
        <NameInput color='green' editable={false} value={'권'} />
        <NameInput color='green' editable={false} value={'강'} />
        <NameInput color='green' editable={false} value={'한'} />
      </div>
      <span className={cx('desc')}>
        이름을 입력해 주세요. (세자리의 한글 이름만 가능합니다.)
      </span>
      <Link
        className={cx('btn-wrap')}
        aria-disabled={!isFilled}
        href={isFilled ? '/result' : '/'}
      >
        <Image
          alt='button'
          width={260}
          height={260}
          src={'/assets/button.png'}
          className={cx('btn')}
        />
        <strong className={cx('click-text')}>CLICK!</strong>
      </Link>
    </div>
  );
};
