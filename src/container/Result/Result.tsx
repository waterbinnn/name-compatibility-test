'use client';

import { useStyle } from '@/hooks';
import styles from './Result.module.scss';

import { Button } from '@waterbin/ui-kit';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import saveAs from 'file-saver';

import { coda, consonant, strokeCount, vowel } from '@/constant';
import html2canvas from 'html2canvas';
import KakaoAdFit from '@/lib/KakaoAdFit';
import ShareIcon from '/public/assets/icon-link.svg';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Result = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const name1 = searchParams.get('name1');
  const name2 = searchParams.get('name2');

  const { styled: cx } = useStyle(styles);

  const resultRef = useRef<HTMLDivElement>(null);
  const contentsRef = useRef<HTMLDivElement>(null);

  const [nameBox, setNameBox] = useState<{ char: string; source: string }[]>(
    []
  );
  const [countedLines, setCountedLines] = useState<number[][]>([[]]);
  const [isError, setIsError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [isDownloading, setIsDownloading] = useState<boolean>(false);
  const [isSharing, setIsSharing] = useState<boolean>(false);

  const handleGoToMain = () => {
    router.push('/');
  };

  useEffect(() => {
    if (!name1 || !name2) {
      router.push('/');
      return;
    }
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer); // 타이머 클리어
  }, [name1, name2, router]);

  useEffect(() => {
    function mixStrings(name1: string, name2: string) {
      let mixedArr = [];
      const nameArr = name1.split('');
      const name2Arr = name2.split('');
      const maxLength = Math.max(nameArr.length, name2Arr.length); // 최대 글자 수 계산

      for (let i = 0; i < maxLength; i++) {
        if (nameArr[i]) mixedArr.push({ char: nameArr[i], source: 'name1' });
        if (name2Arr[i]) mixedArr.push({ char: name2Arr[i], source: 'name2' });
      }
      return mixedArr;
    }

    if (name1 && name2) {
      const mixed = mixStrings(name1, name2);
      setNameBox(mixed);
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

    const firstArray = nameBox.map((name) => splitHangulAndCount(name.char)); // 첫 번째 배열
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

  const createCanvas = async (): Promise<HTMLCanvasElement | null> => {
    const contentImage = resultRef.current;
    const onlyContent = contentsRef.current;

    if (!contentImage || !onlyContent) {
      return null;
    }

    try {
      const { height } = onlyContent.getBoundingClientRect();

      const canvas = await html2canvas(contentImage, {
        useCORS: true,
        scale: 2,
        height: Math.ceil(height + 50),
        ignoreElements: (element) => element.id === 'ignore-download',
        onclone: (el) => {
          const countText = el.querySelectorAll('#count');
          const h2Element = el.querySelector('#header');
          const boxText = el.querySelectorAll('#box');

          if (h2Element instanceof HTMLElement) {
            h2Element.style.paddingBottom = '20px';
            h2Element.style.marginTop = '-20px';
          }

          const boxStyle = (element: Element) => {
            if (element instanceof HTMLElement) {
              element.style.paddingBottom = '30px';
              element.style.display = 'inline-block';
            }
          };

          boxText.forEach(boxStyle);
          countText.forEach(boxStyle);
        },
      });

      return canvas;
    } catch (error) {
      console.error('캔버스 생성 중 오류:', error);
      return null;
    }
  };

  const errorToast = () => {
    toast('문제가 발생했는데 다시 시도해 주실 술..?', {
      type: 'error',
    });
  };

  const rawFileName = `${name1}_${name2}의_이름궁합은_${countedLines[countedLines.length - 1].join('')}점`;
  const fileName = rawFileName.replace(/[\\/:*?"<>|]/g, '_');

  const generateBlob = async (
    canvas: HTMLCanvasElement
  ): Promise<Blob | null> => {
    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        if (!blob) {
          console.error('Blob 생성 실패');
          resolve(null);
        } else {
          resolve(blob);
        }
      }, 'image/png');
    });
  };

  const handleDownload = async () => {
    setIsDownloading(true);

    const canvas = await createCanvas();
    if (!canvas) {
      setIsDownloading(false);
      errorToast();
      return;
    }

    const blob = await generateBlob(canvas);
    if (!blob) {
      setIsDownloading(false);
      errorToast();
      return;
    }

    const isKakaoBrowser = /kakao/i.test(
      window.navigator.userAgent.toLowerCase()
    );

    if (isKakaoBrowser) {
      const dataUrl = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = `${fileName}.png`;
      link.setAttribute('target', '_blank');
      link.click();
      URL.revokeObjectURL(dataUrl);
    } else {
      saveAs(blob, `${fileName}.png`);
    }
    setIsDownloading(false);
  };

  const siteUrl = 'https://name-compatibility-test.vercel.app';

  const handleCopyUrl = () => {
    window.navigator.clipboard.writeText(siteUrl);
    toast('링크 저장 완료!', {
      type: 'success',
    });
  };

  const encodeName = (name: string) => {
    const encoder = new TextEncoder(); // TextEncoder는 기본 UTF-8 인코딩
    const encodedBytes = encoder.encode(name); // 바이트 배열 생성
    return Array.from(encodedBytes)
      .map((byte) => `%${byte.toString(16).toUpperCase()}`) // URL 안전한 형태로 변환
      .join('');
  };

  const decodeName = (encodedString: string) => {
    const byteArray = encodedString
      .split('%')
      .filter((byte) => byte) // 빈 문자열 제거
      .map((hex) => parseInt(hex, 16)); // 16진수로 변환

    const decoder = new TextDecoder('utf-8'); // UTF-8로 디코딩
    return decoder.decode(new Uint8Array(byteArray)); // 문자열로 변환
  };

  const handleShare = async () => {
    setIsSharing(true);

    const resultUrl = `${siteUrl}/result?name1=${name1}&name2=${name2}`;

    if (!navigator.share) {
      window.navigator.clipboard.writeText(resultUrl);
      toast('링크 저장 완료!', {
        type: 'success',
      });
      return;
    }

    const encodedName1 = encodeName(name1!);
    const decodedName1 = decodeName(encodedName1);

    const encodedName2 = encodeName(name!);
    const decodedName2 = decodeName(encodedName2);

    console.log(encodedName1, decodedName1);

    try {
      await navigator.share({
        title: fileName,
        url: `${siteUrl}/result?name1=${decodedName1}&name2=${decodedName2}`,
      });
    } catch (error) {
      console.error(error);
    }
    setIsSharing(false);
  };

  return (
    <>
      {/* 정상 작동  */}
      {!isLoading && !isError && countedLines[0].length > 0 && (
        <div className={cx('container')} ref={resultRef}>
          <h1 className={cx('hidden')}>이름 궁합 결과</h1>
          <div ref={contentsRef}>
            <header className={cx('header')}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className={cx('image-cats')}
                src={'/assets/cat.webp'}
                alt='cats'
                aria-hidden
                loading='eager'
              />
              <h2 className={cx('header-text-wrap')} id='header'>
                <div className={cx('header-name-wrap')}>
                  <strong className={cx('header-text')}>{name1}</strong>
                  <span className={cx('header-text')}>🩵</span>
                  <strong className={cx('header-text')}>{name2}</strong>
                </div>
                <p className={cx('header-text-sm')}>우리의 이름 궁합은</p>
                <strong className={cx('header-text-point')}>
                  {countedLines.length > 0 &&
                    countedLines[countedLines.length - 1].join('')}
                  점
                </strong>
              </h2>
            </header>

            <main className={cx('main-wrap')}>
              <div className={cx('name-box-wrap')}>
                {nameBox.map((name, index) => (
                  <div
                    className={cx('name-box', {
                      green: name.source === 'name1',
                    })}
                    key={index}
                  >
                    <span id='box'>{name.char}</span>
                  </div>
                ))}
              </div>

              <div className={cx('list-wrap')}>
                {countedLines.map((number, index) => (
                  <ol
                    className={cx('list', {
                      result: index === countedLines.length - 1,
                    })}
                    key={`line-${index}`}
                  >
                    {number.map((count, idx) => (
                      <li key={`count-${idx}`} className={cx('count')}>
                        <span id='count'>{count}</span>
                      </li>
                    ))}
                  </ol>
                ))}
              </div>
            </main>
          </div>

          <div className={cx('button-wrap')} id='ignore-download'>
            <Button
              size='icon'
              variant='icon'
              className={cx('share-icon')}
              onClick={handleCopyUrl}
              icon={<ShareIcon />}
              rounded
            />
            <Button
              size='lg'
              fullWidth
              className={cx('button')}
              onClick={handleDownload}
              loading={isDownloading}
            >
              이미지 저장하기
            </Button>

            <Button
              size='lg'
              fullWidth
              className={cx('button', 'share')}
              onClick={handleShare}
              loading={isSharing}
            >
              결과 공유하기
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

          <div className={cx('ad-wrap')}>
            <KakaoAdFit unitType='result' />
          </div>
        </div>
      )}

      {/* 로딩중 */}
      {!isError && isLoading && (
        <div className={cx('gif-wrap')}>
          <strong className={cx('loading-text')}>궁합 계산 중 ..... </strong>
          <Image
            alt='loading'
            src='/assets/loading-cats.gif'
            aria-label='loading'
            className={cx('loading-gif')}
            width={335}
            height={350}
            layout='responsive'
            priority
            unoptimized
          />
        </div>
      )}

      {/* 에러 발생 */}
      {isError && (
        <div className={cx('container', 'error-wrap')}>
          <h1 className={cx('header-text', 'error')}>
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

      <ToastContainer
        position='top-right'
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover={false}
        theme='colored'
        style={{
          whiteSpace: 'pre-wrap',
          fontWeight: 600,
        }}
      />
    </>
  );
};
