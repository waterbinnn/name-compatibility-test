'use client';

import { useStyle } from '@/hooks';
import styles from './Result.module.scss';
import { NameInput } from '@/components';
import Image from 'next/image';

import Arrow from '/public/assets/arrow_back.svg';
import { useRouter } from 'next/navigation';

export const Result = () => {
  const { styled: cx } = useStyle(styles);
  const router = useRouter();

  return (
    <div>
      <div className={cx('arrow')} onClick={() => router.push('/')}>
        <Arrow />
      </div>
      <article className={cx('result-wrap')}>
        <h2 className={cx('hidden')}>결과</h2>
        <div className={cx('image-wrap')}>
          <Image
            aria-hidden
            alt='image'
            width={0}
            height={0}
            sizes='100vw'
            src={'/assets/result-char.png'}
            className={cx('char')}
          />
        </div>

        <div className={cx('background')}>
          <div className={cx('result-text')}>
            <p>우리의 이름 궁합은</p>
            <p className={cx('point')}>49점</p>
          </div>
          <div className={cx('names')}>
            <NameInput isSquare editable={false} />
            <NameInput color='green' isSquare editable={false} />
            <NameInput isSquare editable={false} />
            <NameInput color='green' isSquare editable={false} />
            <NameInput isSquare editable={false} />
            <NameInput color='green' isSquare editable={false} />
          </div>

          <div className={cx('list-wrap')}>
            <ol className={cx('list', '1')}>
              <li>1</li>
              <li>2</li>
              <li>3</li>
              <li>4</li>
              <li>5</li>
              <li>6</li>
            </ol>
            <ol className={cx('list', '2')}>
              <li>7</li>
              <li>8</li>
              <li>9</li>
              <li>0</li>
              <li>2</li>
            </ol>
            <ol className={cx('list', '3')}>
              <li>2</li>
              <li>2</li>
              <li>2</li>
              <li>2</li>
            </ol>
            <ol className={cx('list', '4')}>
              <li>2</li>
              <li>2</li>
              <li>2</li>
            </ol>
            <ol className={cx('list', 'result')}>
              <li className={cx('result')}>4</li>
              <li className={cx('result')}>9</li>
            </ol>
          </div>
        </div>
      </article>
    </div>
  );
};
