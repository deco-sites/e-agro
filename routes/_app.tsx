import { asset, Head } from "$fresh/runtime.ts";
import { defineApp } from "$fresh/server.ts";
import { useScript } from "@deco/deco/hooks";
import { Context } from "@deco/deco";
const serviceWorkerScript = () =>
  addEventListener(
    "load",
    () =>
      navigator &&
      navigator.serviceWorker &&
      navigator.serviceWorker.register("/sw.js"),
  );
export default defineApp(async (_req, ctx) => {
  const revision = await Context.active().release?.revision();
  return (
    <>
      {/* Include Icons and manifest */}
      <Head>
        {/* Enable View Transitions API */}
        <style
          dangerouslySetInnerHTML={{
            __html: `@view-transition { navigation: auto; }`,
          }}
        />

        <style
          dangerouslySetInnerHTML={{
            __html: `
                    @font-face {
            font-family: 'Bradesco Sans';
            src: url(${
              asset(
                "/fonts/BradescoSans-Thin.woff2",
              )
            }) format('woff2'),
              url(${asset("/fonts/BradescoSans-Thin.woff")}) format('woff');
            font-weight: 200;
            font-style: normal;
            font-display: swap;
          }

          @font-face {
            font-family: 'Bradesco Sans';
            src: url(${
              asset(
                "/fonts/BradescoSans-Light.woff2",
              )
            }) format('woff2'),
              url(${asset("/fonts/BradescoSans-Light.woff")}) format('woff');
            font-weight: 300;
            font-style: normal;
            font-display: swap;
          }

          @font-face {
            font-family: 'Bradesco Sans';
            src: url(${
              asset(
                "/fonts/BradescoSans-Regular.woff2",
              )
            }) format('woff2'),
              url(${asset("/fonts/BradescoSans-Regular.woff")}) format('woff');
            font-weight: 400;
            font-style: normal;
            font-display: swap;
          }

          @font-face {
            font-family: 'Bradesco Sans';
            src: url(${
              asset(
                "/fonts/BradescoSans-Medium.woff2",
              )
            }) format('woff2'),
              url(${asset("/fonts/BradescoSans-Medium.woff")}) format('woff');
            font-weight: 500;
            font-style: normal;
            font-display: swap;
          }

          @font-face {
            font-family: 'Bradesco Sans';
            src: url(${
              asset(
                "/fonts/BradescoSans-SemiBold.woff2",
              )
            }) format('woff2'),
              url(${asset("/fonts/BradescoSans-SemiBold.woff")}) format('woff');
            font-weight: 600;
            font-style: normal;
            font-display: swap;
          }

          @font-face {
            font-family: 'Bradesco Sans';
            src: url(${
              asset(
                "/fonts/BradescoSans-Bold.woff2",
              )
            }) format('woff2'),
              url(${asset("/fonts/BradescoSans-Bold.woff")}) format('woff');
            font-weight: 700;
            font-style: normal;
            font-display: swap;
          }

          @font-face {
            font-family: 'Bradesco Sans';
            src: url(${
              asset(
                "/fonts/BradescoSans-Black.woff2",
              )
            }) format('woff2'),
              url(${asset("/fonts/BradescoSans-Black.woff")}) format('woff');
            font-weight: 800;
            font-style: normal;
            font-display: swap;
          }
        `,
          }}
        />

        {/* Tailwind v3 CSS file */}
        <link
          href={asset(`/styles.css?revision=${revision}`)}
          rel="stylesheet"
        />

        {/* Web Manifest */}
        <link rel="manifest" href={asset("/site.webmanifest")} />
      </Head>

      {/* Rest of Preact tree */}
      <ctx.Component />

      <script
        type="module"
        dangerouslySetInnerHTML={{ __html: useScript(serviceWorkerScript) }}
      />
    </>
  );
});
