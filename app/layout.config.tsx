import { type HomeLayoutProps } from 'fumadocs-ui/home-layout'

export const baseOptions: HomeLayoutProps = {
  nav: {
    title: (
      <>
        <img src='https://raw.githubusercontent.com/ZeyaRabani/Gitbook2/main/public/logo/logo-circle.png' alt='BIT10' width={20} height={20} />
        <span className='text-[1rem] font-semibold'>BIT10 Documentation</span>
      </>
    ),
  },
  links: [
    {
      text: 'Website',
      url: 'https://www.bit10.app',
      active: 'nested-url',
      icon: (
        <img src='https://raw.githubusercontent.com/ZeyaRabani/Gitbook2/main/public/assets/globe.svg' alt='Website' width={15} height={15} />
      )
    },
    {
      text: 'X/Twitter',
      url: 'https://twitter.com/bit10startup',
      active: 'nested-url',
      icon: (
        <div>
          <img src='https://raw.githubusercontent.com/ZeyaRabani/Gitbook2/main/public/assets/twitter-light.svg' alt='Twitter' className='block dark:hidden' width={15} height={15} />
          <img src='https://raw.githubusercontent.com/ZeyaRabani/Gitbook2/main/public/assets/twitter-dark.svg' alt='Twitter' className='hidden dark:block ml-0.5' width={10} height={10} />
        </div>
      )
    },
  ],
};
