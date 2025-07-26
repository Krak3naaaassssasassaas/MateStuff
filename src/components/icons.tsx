import type { SVGProps } from "react";

export const Icons = {
  logo: (props: SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 2L1 9l4 12h14l4-12L12 2zM6.5 19l-3-9L12 4.5 20.5 10l-3 9h-11z"/>
      <path d="M12 11.5l-4.5 6.5h9L12 11.5z"/>
    </svg>
  ),
  facebook: (props: SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
    </svg>
  ),
  instagram: (props: SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
    </svg>
  ),
  twitter: (props: SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M22 4s-.7 2.1-2 3.4c1.6 1.4 2.8 3.2 2.8 5.2 0 3.8-3.1 7.2-7.3 7.2-3.8 0-7.3-2.6-7.3-6.4 0-1.5.5-2.9 1.4-4.1C7.1 9.4 4 7.2 4 4.8c0-.7.2-1.3.5-1.8-4.3 1.8-6.5 5.5-6.5 9.2 0 4.9 3.9 9.1 8.8 9.1 4.9 0 8.8-4.2 8.8-9.1 0-1.2-.2-2.3-.7-3.4 1.4-.7 2.5-1.9 3.2-3.4z"></path>
    </svg>
  ),
};
