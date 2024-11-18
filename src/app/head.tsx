export default function Head() {
  return (
    <>
      <meta content='width=device-width, initial-scale=1' name='viewport' />
      <link rel='icon' href='/assets/cat.png' />
      <link
        rel='canonical'
        href='https://name-compatibility-test.vercel.app/'
      />
      <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      <meta property='og:type' content='website' />
      <meta property='og:title' content={`이름 궁합 테스트`} />
      <meta property='og:description' content='우리의 이름 궁합은?' />
      <meta property='og:imgae' content='/assets/share_image.png' />
      <meta property='og:site_name' content={'이름 궁합 테스트'} />
      <meta
        property='og:url'
        content={'https://name-compatibility-test.vercel.app/'}
      />
      {/* x */}
      <meta name='twitter:card' content='card' />
      <meta name='twitter:title' content='이름 궁합 테스트' />
      <meta name='twitter:description' content='우리의 이름 궁합은?' />
      <meta property='twitter:imgae' content='/assets/share_image.png' />
    </>
  );
}
