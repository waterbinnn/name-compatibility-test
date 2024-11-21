'use client';

import React, { useEffect, useRef } from 'react';

interface Props {
  unitType: 'main' | 'result';
}

const bannerType = {
  main: {
    unit: 'DAN-YRZuXhCH7AzSV7Z6',
    width: '320',
    height: '50',
  },
  result: {
    unit: 'DAN-GMzMzSpxGYGxyRE9',
    width: '300',
    height: '250',
  },
};

function KakaoAdFit({ unitType }: Props) {
  // 최초 1회만 광고를 불러오기 위한 변수
  const adRef = useRef<boolean>(false);

  useEffect(() => {
    // 로딩된 광고가 있으면, 추가 로딩 X
    if (adRef.current) {
      return;
    }

    const ins = document.createElement('ins');
    const script = document.createElement('script');

    ins.className = 'kakao_ad_area';
    ins.style.display = 'none;';

    ins.setAttribute('data-ad-width', bannerType[unitType].width);
    ins.setAttribute('data-ad-height', bannerType[unitType].height);
    ins.setAttribute('data-ad-unit', bannerType[unitType].unit);

    script.async = true;
    script.type = 'text/javascript';
    script.src = '//t1.daumcdn.net/kas/static/ba.min.js';

    document.querySelector('.aside__kakaoAdFit')?.appendChild(ins);
    document.querySelector('.aside__kakaoAdFit')?.appendChild(script);

    // 광고 로딩 여부 상태 변경
    adRef.current = true;
  }, []);
  return (
    <aside className='aside__kakaoAdFit' style={{ margin: '0 auto' }}></aside>
  );
}

export default React.memo(KakaoAdFit);
