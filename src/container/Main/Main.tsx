'use client';

import { useStyle } from '@/hooks';
import styles from './Main.module.scss';
import { NameInput } from '@/components';
import Image from 'next/image';

import { useEffect, useRef, useState } from 'react';

import Arrow from '/public/assets/arrow_back.svg';
import Link from 'next/link';

export const Main = () => {
  const { styled: cx } = useStyle(styles);
  const [isFilled, setIsFilled] = useState<boolean>(false);

  const [name1, setName1] = useState<string>('');
  const [name2, setName2] = useState<string>('');

  useEffect(() => {
    if (name1.length + name2.length >= 6) {
      setIsFilled(true);
    }

    return () => {
      setIsFilled(false);
    };
  }, [name1.length, name2.length]);

  return (
    <div className={cx('container', 'main')}>
      <div>
        <div className={cx('padding')}>
          <h1 className={cx('title')}>우리의</h1>
          <h1 className={cx('title')}>이름 궁합은?</h1>
        </div>
        <div>
          <div className={cx('inputs')}>
            <NameInput
              maxLength={3}
              value={name1}
              onChange={(e) => setName1(e.target.value)}
            />
            <NameInput
              value={name2}
              onChange={(e) => setName2(e.target.value)}
              maxLength={3}
              color='green'
            />
          </div>

          <span className={cx('desc')}>
            이름을 입력해 주세요. (세자리의 한글 이름만 가능합니다.)
          </span>
        </div>
      </div>
      <Link
        href={'/result'}
        aria-disabled={!isFilled}
        tabIndex={!isFilled ? -1 : undefined}
        className={cx('arrow-wrap', { disabled: !isFilled })}
      >
        <Arrow className={cx('arrow')} />
      </Link>
      <div className={cx('image-wrap')}>
        <Image
          aria-hidden
          alt='image'
          width={0}
          height={0}
          sizes='100vw'
          src={'/assets/tto.png'}
          className={cx('char')}
        />
      </div>
    </div>
  );
};
