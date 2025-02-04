export default function Head() {
  const title = '우리의 이름 궁합은? | 이름 궁합 테스트';
  const desc =
    '이름 궁합 테스트로 당신과 상대의 이름을 입력해 궁합을 확인해보세요! 간단하고 재미있는 이름 궁합 서비스입니다.';
  const siteUrl = 'https://name-compatibility-test.vercel.app/';
  const imageUrl = `${siteUrl}assets/share_image.png`;

  return (
    <>
      <meta content='width=device-width, initial-scale=1' name='viewport' />
      <link rel='canonical' href={siteUrl} />
      <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      <meta property='og:type' content='website' />
      <meta property='og:title' content={title} />
      <meta property='og:description' content={desc} />
      <meta property='og:image' content={imageUrl} />
      <meta property='og:site_name' content={title} />
      <meta property='og:url' content={siteUrl} />
      <meta name='twitter:card' content='summary_large_image' />
      <meta name='twitter:title' content={title} />
      <meta name='twitter:description' content={desc} />
      <meta name='twitter:image' content={imageUrl} />
    </>
  );
}
