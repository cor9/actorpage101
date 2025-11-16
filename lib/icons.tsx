import React from 'react';

type Props = React.SVGProps<SVGSVGElement>;

export const InstagramIcon = (props: Props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17" cy="7" r="1.5" fill="currentColor" stroke="none" />
  </svg>
);

export const YoutubeIcon = (props: Props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M23.5 6.2a4 4 0 0 0-2.8-2.8C18.8 3 12 3 12 3s-6.8 0-8.7.4A4 4 0 0 0 .5 6.2 41.5 41.5 0 0 0 0 12a41.5 41.5 0 0 0 .5 5.8 4 4 0 0 0 2.8 2.8C5.2 21 12 21 12 21s6.8 0 8.7-.4a4 4 0 0 0 2.8-2.8c.4-1.9.5-3.8.5-5.8s0-3.9-.5-5.8zM9.6 15.5v-7l6.2 3.5-6.2 3.5z" />
  </svg>
);

export const TiktokIcon = (props: Props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M21 8.1a6.6 6.6 0 0 1-4.1-1.4v7.1a6.8 6.8 0 1 1-6.8-6.8c.5 0 1 .1 1.5.2v3.3a3.5 3.5 0 1 0 2.5 3.3V2h3.1a6.6 6.6 0 0 0 3.8 3.3V8.1z" />
  </svg>
);

export const ImdbIcon = (props: Props) => (
  <svg viewBox="0 0 64 32" fill="currentColor" {...props}>
    <rect width="64" height="32" rx="4" />
    <text x="50%" y="55%" textAnchor="middle" fontSize="14" fontWeight="700" fill="#111">IMDb</text>
  </svg>
);

export const MailIcon = (props: Props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m4 7 8 6 8-6" />
  </svg>
);

export const LinkIcon = (props: Props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
    <path d="M10 14a5 5 0 0 0 7.1.1l2.8-2.8a5 5 0 0 0-7.1-7.1l-1.2 1.2" />
    <path d="M14 10a5 5 0 0 0-7.1-.1L4 12.7a5 5 0 0 0 7.1 7.1l1.2-1.2" />
  </svg>
);


