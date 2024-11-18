import Script from 'next/script';

export const GoogleAnalytics = () => {
  const gaId = 'G-WPC01BS7BT';

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy='afterInteractive'
      />
      <Script
        dangerouslySetInnerHTML={{
          __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
      
          gtag('config', '${gaId}',{
          send_page_view : false,
          });
          `,
        }}
        id='google-analytics'
        strategy='afterInteractive'
      />
    </>
  );
};
