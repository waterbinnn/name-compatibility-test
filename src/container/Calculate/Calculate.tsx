/**
 * 권강한 이수빈
 * 권 이 강 수 한 빈  으로 정렬
 * 정렬한 이름 각 값의 획수를 count
 * count 한 숫자 두개의 값끼리 더하기 ex. 권 + 이 , 강 + 수 , 한 + 빈
 * 8 + 2 = 0, 5 + 4 = 9, 7 + 7 = 4
 * 0 + 9 = 9 , 9 + 4 = 3
 * 93 %
 *
 */

'use client';

import { first, second, third, strokeCount } from '@/contents/stroke';
import { useState } from 'react';
import styles from './Calculate.module.scss';
import Image from 'next/image';
import Lottie from 'react-lottie-player';

import LoadingLottie from '../../contents/lottie.json';
import { useStyle } from '@/hooks';

export const Calculate = () => {
  const { styled: cx } = useStyle(styles);

  const [result, setResult] = useState<string>('');
  const [name1, setName1] = useState<string>('');
  const [name2, setName2] = useState<string>('');
  const [step, setStep] = useState<number>(0);
  const [mergedNames, setMergedNames] = useState<{
    name: string[];
    count: (number | undefined)[];
    reCount: (number | undefined)[];
  }>({
    name: [],
    count: [],
    reCount: [],
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleName = (e: React.ChangeEvent<HTMLInputElement>, type: string) => {
    if (type === 'name1') {
      setName1(e.target.value);
    } else {
      setName2(e.target.value);
    }
  };

  //한글 이름 쪼개기. ex [ㄱ,ㅝ,ㄴ]
  function splitHangulAndCount(name: string) {
    const char = name.trim();
    const charCode = char.charCodeAt(0);

    if (charCode < 0xac00 || charCode > 0xd7a3) {
      alert('한글 문자만 입력해주세요.');
      setName1('');
      setName2('');
      return;
    }

    const baseCode = charCode - 0xac00;
    const fir = Math.floor(baseCode / (21 * 28));
    const sec = Math.floor((baseCode % (21 * 28)) / 28);
    const th = baseCode % 28;
    const hangulArr = [first[fir], second[sec], third[th]];

    //(ㄱ, ㅝ, ㄴ) 획수를 계산하여 더한값 return
    const countArray: number[] = [];
    hangulArr.forEach((item) => {
      const found = strokeCount.find((v) => v.text === item);
      if (found && found.value !== undefined) {
        countArray.push(Number(found.value));
      }
    });
    const count = countArray.reduce((a, c) => a + c, 0);
    return count;
  }

  //첫번째 획수 계산 배열 생성
  const makeCountArr = () => {
    //이름 번갈아 정렬한 배열 생성
    const mergedArr: string[] = [];
    const arr1 = name1.split('');
    const arr2 = name2.split('');
    const maxLength = Math.max(name1.length, name2.length);

    for (let i = 0; i < maxLength; i++) {
      mergedArr.push(arr1[i], arr2[i]);
    }
    setMergedNames((prevState) => ({
      ...prevState,
      name: mergedArr,
    }));

    //획수 count 한 배열 생성
    const countArr: (number | undefined)[] = [];
    mergedArr.forEach((v, i) => {
      countArr.push(splitHangulAndCount(v));
    });
    setMergedNames((prevState) => ({
      ...prevState,
      count: countArr,
    }));
  };

  function processArray(arr: (number | any)[]) {
    //일의 자리 숫자만 저장하도록 만드는 함수
    function getUnitsPlace(num: number) {
      return num % 10;
    }

    let result = [];

    for (let i = 0; i < arr.length - 1; i += 2) {
      result.push(getUnitsPlace(arr[i] + arr[i + 1]));
    }
    setMergedNames((prevState) => ({
      ...prevState,
      reCount: result,
    }));

    while (result.length > 1) {
      let newResult = [];
      for (let i = 0; i < result.length - 1; i++) {
        newResult.push(getUnitsPlace(result[i] + result[i + 1]));
      }

      if (newResult.length === 2) {
        setResult(newResult.join(''));
        break;
      }

      return result;
    }
  }

  const handleButtonClick = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      makeCountArr();
      processArray(mergedNames.count);
    }, 3000);
  };

  const handleReset = () => {
    setName1('');
    setName2('');
    setResult('');
    setMergedNames({ count: [], name: [], reCount: [] });
  };

  return (
    <div className={cx('container')}>
      <h1 className={cx('title')}>이름 궁합 테스트</h1>
      <div>
        <input
          type='text'
          id='name1'
          value={name1}
          onChange={(e) => handleName(e, 'name1')}
        />
      </div>
      <div>
        <input
          type='text'
          id='name2'
          value={name2}
          onChange={(e) => handleName(e, 'name2')}
        />
      </div>
      <button onClick={handleButtonClick} disabled={step >= 3}>
        <Image
          alt='button'
          width={200}
          height={200}
          src={'/assets/button.png'}
        />
      </button>
      <button onClick={handleReset}>RESET</button>

      {isLoading ? (
        <Lottie animationData={LoadingLottie} loop play />
      ) : (
        <>
          <div style={{ display: 'flex', gap: '10px' }}>
            {mergedNames.name.map((v, i) => (
              <div key={`count${i}`}>{v}</div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            {mergedNames.count.map((v, i) => (
              <div key={`count${i}`}>{v}</div>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            {mergedNames.reCount.map((v, i) => (
              <div key={`reCount${i}`}>{v}</div>
            ))}
          </div>

          <div>{result}</div>
        </>
      )}
    </div>
  );
};
