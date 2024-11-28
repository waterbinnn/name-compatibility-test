'use client';

import { useStyle } from '@/hooks';
import { NameInput } from '@/components';
import Image from 'next/image';

import { useEffect, useState } from 'react';

import Arrow from '/public/assets/icon_arrow_s.svg';

import { useRouter } from 'next/navigation';

import styles from './Main.module.scss';
import { koreanRegex } from '@/constant';

import KakaoAdFit from '@/lib/KakaoAdFit';

import {
  Button,
  Popover,
  PopoverContent,
  PopoverHandler,
} from '@waterbin/ui-kit';

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

        <div className={cx('button-wrap')}>
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

          <Popover>
            <PopoverHandler>
              <Button size='sm' color='teal'>
                💙 안내사항 💙
              </Button>
            </PopoverHandler>
            <PopoverContent placement='right'>
              <ul className={cx('info-wrap')}>
                <li className={cx('info-list')}>
                  💙 궁합 볼 사람이 없다고요?
                  <p className={cx('info-content')}>
                    연예인이랑 하시는 건 어떤지..
                  </p>
                </li>
                <li className={cx('info-list')}>
                  💙 버그를 발견하셨다고요?
                  <p className={cx('info-content')}>
                    묻어 ....... 가 아니고
                    <br />
                    <a href='mailto:ewaterbinn@gmail.com'>
                      ewaterbinn@gmail.com
                    </a>
                    으로
                    <br />
                    버그에 대해 알려주세요!
                  </p>
                </li>
              </ul>
            </PopoverContent>
          </Popover>
        </div>

        <span className={cx('copyright')}>
          ©copyright waterbinn | made by waterbinn
        </span>
      </main>
    </>
  );
};
