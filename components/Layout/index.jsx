import Head from "next/head";
import Header from "../Header";

export default function Layout({ headTitle, headDesc, children }) {
  return (
    <div className="w-full bg-white dark:bg-black text-black dark:text-white font-Poppins">
      <Head>
        <title>{headTitle}</title>
        <meta name="description" content={headDesc} />
        <link rel="icon" href="/logo-petdopter.png" />
      </Head>

      <Header />
      <main className="w-full min-h-screen">{children}</main>
    </div>
  );
}
