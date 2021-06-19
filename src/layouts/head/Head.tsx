import { VFC } from 'react';
import { NextSeo, NextSeoProps } from 'next-seo';

type HeadPropsType = Omit<NextSeoProps, 'title' | 'description' | 'canonical'>;

export const Head: VFC<HeadPropsType> = () => {
  return (
    <NextSeo
      title="ポモドーロタイマー"
      description="ポモドーロタイマー for web app"
      openGraph={{
        type: 'website',
        locale: 'ja_JP',
        url: 'https://pomodoro-hisho.vercel.app/',
        site_name: 'ポモドーロタイマー',
        title: 'ポモドーロタイマー',
        description: 'ポモドーロタイマー for web app',
        // images: [{ url: SEO.image }],
      }}
      canonical="https://pomodoro-hisho.vercel.app/"
    />
  );
};
