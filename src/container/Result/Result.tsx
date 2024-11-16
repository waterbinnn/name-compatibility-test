'use client';

import { useStyle } from '@/hooks';
import styles from './Result.module.scss';

import { Button } from '@waterbin/ui-kit';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import { useNameStore } from '@/store';
import { coda, consonant, strokeCount, vowel } from '@/constant';
import { useShallow } from 'zustand/shallow';

export const Result = () => {
  const router = useRouter();
  const { styled: cx } = useStyle(styles);

  const { name1, name2, setName1, setName2 } = useNameStore(
    useShallow((state) => ({
      name1: state.name1,
      name2: state.name2,
      setName1: state.setName1,
      setName2: state.setName2,
    }))
  );

  const [nameBox, setNameBox] = useState<string[]>([]);
  const [countedLines, setCountedLines] = useState<number[][]>([[]]);
  const [isError, setIsError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  const handleGoToMain = useCallback(() => {
    router.push('/');
    setName1('');
    setName2('');
  }, [router, setName1, setName2]);

  useEffect(() => {
    function mixStrings(name1: string, name2: string) {
      let mixedArr = [];
      const nameArr = name1.split('');
      const name2Arr = name2.split('');

      for (let i = 0; i < 3; i++) {
        mixedArr.push(nameArr[i], name2Arr[i]);
      }
      return mixedArr;
    }

    if (name1 && name2) {
      setNameBox(mixStrings(name1, name2));
    }
  }, [name1, name2]);

  //하나의 글자 획수 계산 함수
  function splitHangulAndCount(name: string) {
    const char = name.trim();
    const charCode = char.charCodeAt(0);

    if (charCode >= 0xac00 && charCode <= 0xd7a3) {
      // 한글 유니코드 계산
      const baseCode = charCode - 0xac00;

      const con = Math.floor(baseCode / (21 * 28)); //초성
      const vow = Math.floor((baseCode % (21 * 28)) / 28); //중성
      const cod = baseCode % 28; //종성

      //초성, 중성, 종성 분리
      const hangulArr = [consonant[con], vowel[vow], coda[cod]];

      //각 획수를 계산하여 더한값 return
      const countHangul: number[] = [];

      //글자와 글자수배열 매칭
      hangulArr.forEach((hangul) => {
        const matchedHangul = strokeCount.find(
          (value) => value.text === hangul
        );
        if (matchedHangul && matchedHangul.value !== undefined) {
          countHangul.push(+matchedHangul.value);
        }
      });

      //총 stroke 계산
      const count = countHangul.reduce((a, c) => a + c, 0);
      return count;
    } else {
      setIsError(true);
      return 0;
    }
  }

  useEffect(() => {
    //두 숫자를 더하고 일의 자리만 반환
    const sumNames = (a: number, b: number) => (a + b) % 10;

    if (!nameBox || nameBox.length === 0) return;

    const firstArray = nameBox.map((name) => splitHangulAndCount(name)); // 첫 번째 배열
    const allResults = [firstArray]; // 중간 배열 결과를 저장할 배열

    let currentArray = firstArray;

    while (currentArray.length > 2) {
      const newArray = [];
      for (let i = 0; i < currentArray.length - 1; i++) {
        newArray.push(sumNames(currentArray[i], currentArray[i + 1]));
      }
      allResults.push(newArray); // 새로운 배열 추가
      currentArray = newArray; // 현재 배열 갱신
    }
    setCountedLines(allResults); // 모든 결과를 상태에 저장
  }, [nameBox]);

  return (
    <>
      {/* 정상 작동  */}
      {!isLoading && !isError && countedLines[0].length > 0 && (
        <div className={cx('container')}>
          <h1 className={cx('hidden')}>이름 궁합 결과</h1>
          <header className={cx('header')}>
            <h2 className={cx('header-text-wrap')}>
              <div className={cx('header-name-wrap')}>
                <strong className={cx('header-text')}>{name1}</strong>
                <span className={cx('header-text')}>🩵</span>
                <strong className={cx('header-text')}>{name2}</strong>
              </div>
              <p className={cx('header-text-sm')}>우리의 이름 궁합은</p>
              <strong className={cx('header-text-point')}>
                {countedLines[4] && countedLines[4].join('')} %
              </strong>
            </h2>
            <Image
              className={cx('image-cats')}
              src={'/assets/cat.png'}
              width={204}
              height={172}
              alt='cats'
              aria-hidden
              placeholder='blur'
              blurDataURL='/assets/cat.png'
            />
          </header>

          <main className={cx('main-wrap')}>
            <div className={cx('name-box-wrap')}>
              {nameBox.map((name, index) => (
                <div className={cx('name-box')} key={index}>
                  {name}
                </div>
              ))}
            </div>

            <div className={cx('list-wrap')}>
              {countedLines.map((number, index) => (
                <ol
                  className={cx('list', { result: index === 4 })}
                  key={`line-${index}`}
                >
                  {number.map((count, idx) => (
                    <li key={`count-${idx}`} className={cx('count')}>
                      {count}
                    </li>
                  ))}
                </ol>
              ))}
            </div>
          </main>

          <div className={cx('button-wrap')}>
            <Button size='lg' fullWidth className={cx('button')}>
              저장하기
            </Button>
            <Button
              size='lg'
              fullWidth
              className={cx('button', 'restart')}
              onClick={handleGoToMain}
            >
              다시하기
            </Button>
          </div>
        </div>
      )}

      {/* 로딩중 */}
      {isLoading && (
        <div className={cx('gif-wrap')}>
          <strong className={cx('loading-text')}>궁합 계산 중 .. ... </strong>
          <Image
            alt='loading'
            src='/assets/loading-cats.gif'
            aria-label='loading'
            className={cx('loading-gif')}
            width={335}
            height={350}
            layout='responsive'
            placeholder='blur'
            blurDataURL='/assets/loading-cats.png'
            priority
          />
        </div>
      )}

      {/* 에러 발생 */}
      {isError && (
        <div className={cx('container', 'error-wrap')}>
          <h1 className={cx('header-text')}>
            이름을
            <br />
            불러오지
            <br />
            못했어요
            <br />
            메인 페이지로
            <br />
            이동해서
            <br />
            다시 시도해주세요~!
          </h1>
          <Button
            size='lg'
            fullWidth
            onClick={handleGoToMain}
            className={cx('button')}
          >
            메인 페이지로 이동하기
          </Button>
        </div>
      )}
    </>
  );
};
