'use client';

import { useStyle } from '@/hooks';
import { NameInput } from '@/components';
import Image from 'next/image';

import { useEffect, useState } from 'react';

import Arrow from '/public/assets/icon_arrow_s.svg';

import { Button } from '@waterbin/ui-kit';
import { useRouter } from 'next/navigation';

import styles from './Main.module.scss';
import { koreanRegex } from '@/constant';

import KakaoAdFit from '@/lib/KakaoAdFit';

export const Main = () => {
  const router = useRouter();
  const { styled: cx } = useStyle(styles);
  const [name1, setName1] = useState<string>('');
  const [name2, setName2] = useState<string>('');

  const [isValid, setIsValid] = useState<boolean>(false);

  useEffect(() => {
    setName1('');
    setName2('');
  }, []);

  useEffect(() => {
    const checkValid = (value: string) => {
      if (koreanRegex.test(value) && value.length >= 2) {
        return true;
      } else {
        return false;
      }
    };

    if (checkValid(name1) && checkValid(name2)) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [name1, name2]);

  const handleSubmit = () => {
    router.push(`/result?name1=${name1}&name2=${name2}`);
  };

  return (
    <>
      <main className={cx('container', 'main')}>
        <div className={cx('ad-wrap')}>
          <KakaoAdFit unitType='main' />
        </div>

        <h1 className={cx('title')}>
          우리의
          <br />
          이름 궁합은??~?
        </h1>

        <Image
          className={cx('image-cats')}
          src={'/assets/chat_cat.webp'}
          layout='responsive'
          width={250}
          height={245}
          alt='cats'
          aria-hidden
          priority
        />
        <div className={cx('input-name-wrap')}>
          <NameInput
            value={name1}
            placeholder='이름1'
            onChange={(e) => setName1(e.target.value)}
          />
          <NameInput
            placeholder='이름2'
            value={name2}
            onChange={(e) => setName2(e.target.value)}
          />
        </div>

        <span className={cx('desc')}>
          이름을 입력해 주세요. (2~4자리의 한글 이름만 가능합니다.)
        </span>

        <Button
          className={cx('button-submit')}
          onClick={handleSubmit}
          variant='iconText'
          size='lg'
          disabled={!isValid}
          icon={<Arrow />}
        >
          궁합 보기
        </Button>

        <span className={cx('copyright')}>
          ©copyright waterbinn | made by waterbinn
        </span>
      </main>
    </>
  );
};
