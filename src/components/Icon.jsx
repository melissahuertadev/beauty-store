const paths = {
  calendar: <><rect x="3.5" y="5" width="17" height="15.5" rx="2" /><path d="M7.5 3.5v3M16.5 3.5v3M3.5 9.5h17M8 13h.01M12 13h.01M16 13h.01M8 16.5h.01M12 16.5h.01" /></>,
  user: <><circle cx="12" cy="8" r="3.5" /><path d="M5 20c.7-3.2 3.1-5 7-5s6.3 1.8 7 5" /></>,
  settings: <><path d="M12 3.5v2M12 18.5v2M20.5 12h-2M5.5 12h-2M18 6l-1.4 1.4M7.4 16.6 6 18M18 18l-1.4-1.4M7.4 7.4 6 6" /><circle cx="12" cy="12" r="5" /></>,
  check: <path d="m5 12.5 4.2 4.2L19 7" />,
  close: <path d="m6 6 12 12M18 6 6 18" />,
  clock: <><circle cx="12" cy="12" r="8.5" /><path d="M12 7v5l3.5 2" /></>,
  image: <><rect x="3.5" y="4" width="17" height="16" rx="2" /><circle cx="9" cy="9" r="1.5" /><path d="m4 17 5-5 3.5 3 2.5-2 5 4" /></>,
  note: <><path d="M13.5 4H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7.5" /><path d="m11 13 8.8-8.8a1.6 1.6 0 0 1 2.2 2.2L13.2 15.2 10 16z" /></>,
};

export default function Icon({ name, size = 18, className = '' }) {
  return <svg className={`ui-icon ${className}`} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>;
}
