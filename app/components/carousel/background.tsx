const SvgComponent = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width={1440}
    height={560}
    preserveAspectRatio="none"
    // {...props}
  >
    <g fill="none" mask='url("#a")'>
      <use xlinkHref="#b" />
      <use xlinkHref="#b" x={720} />
    </g>
    <defs>
      <path id="d" d="M-1 0a1 1 0 1 0 2 0 1 1 0 1 0-2 0z" />
      <path id="f" d="M-3 0a3 3 0 1 0 6 0 3 3 0 1 0-6 0z" />
      <path id="c" d="M-5 0A5 5 0 1 0 5 0 5 5 0 1 0-5 0z" />
      <path id="g" d="m2-2-4 4z" />
      <path id="e" d="M6-6-6 6z" />
      <path id="h" d="m30-30-60 60z" />
      <mask id="a">
        <path fill="#fff" d="M0 0h1440v560H0z" />
      </mask>
    </defs>
    <symbol id="b">
      <use xlinkHref="#c" x={30} y={30} stroke="rgba(126, 132, 198, 1)" />
      <use xlinkHref="#d" x={30} y={90} stroke="rgba(126, 132, 198, 1)" />
      <use xlinkHref="#e" x={30} y={150} stroke="rgba(126, 132, 198, 1)" />
      <use xlinkHref="#d" x={30} y={210} stroke="rgba(126, 132, 198, 1)" />
      <use xlinkHref="#c" x={30} y={270} stroke="rgba(126, 132, 198, 1)" />
      <use xlinkHref="#e" x={30} y={330} stroke="rgba(126, 132, 198, 1)" />
      <use xlinkHref="#f" x={30} y={390} stroke="rgba(126, 132, 198, 1)" />
      <use xlinkHref="#e" x={30} y={450} stroke="rgba(126, 132, 198, 1)" />
      <use xlinkHref="#f" x={30} y={510} stroke="rgba(126, 132, 198, 1)" />
      <use xlinkHref="#g" x={30} y={570} stroke="rgba(126, 132, 198, 1)" />
      <use xlinkHref="#g" x={90} y={30} stroke="rgba(126, 132, 198, 1)" />
      <use xlinkHref="#e" x={90} y={90} stroke="rgba(126, 132, 198, 1)" />
      <use xlinkHref="#h" x={90} y={150} stroke="rgba(126, 132, 198, 1)" strokeWidth={3} />
      <use xlinkHref="#g" x={90} y={210} stroke="rgba(126, 132, 198, 1)" />
      <use xlinkHref="#c" x={90} y={270} stroke="rgba(126, 132, 198, 1)" />
      <use xlinkHref="#d" x={90} y={330} stroke="rgba(126, 132, 198, 1)" />
      <use xlinkHref="#g" x={90} y={390} stroke="rgba(126, 132, 198, 1)" />
      <use xlinkHref="#e" x={90} y={450} stroke="rgba(126, 132, 198, 1)" />
      <use xlinkHref="#g" x={90} y={510} stroke="rgba(126, 132, 198, 1)" />
      <use xlinkHref="#c" x={90} y={570} stroke="rgba(126, 132, 198, 1)" />
      <use xlinkHref="#e" x={150} y={30} stroke="rgba(126, 132, 198, 1)" />
      <use xlinkHref="#e" x={150} y={90} stroke="rgba(126, 132, 198, 1)" />
      <use xlinkHref="#f" x={150} y={150} stroke="rgba(126, 132, 198, 1)" />
      <use xlinkHref="#c" x={150} y={210} stroke="rgba(126, 132, 198, 1)" />
      <use xlinkHref="#c" x={150} y={270} stroke="rgba(126, 132, 198, 1)" />
      <use xlinkHref="#g" x={150} y={330} stroke="rgba(126, 132, 198, 1)" />
      <use xlinkHref="#c" x={150} y={390} stroke="rgba(126, 132, 198, 1)" />
      <use xlinkHref="#c" x={150} y={450} stroke="rgba(126, 132, 198, 1)" />
      <use xlinkHref="#c" x={150} y={510} stroke="rgba(126, 132, 198, 1)" />
      <use xlinkHref="#d" x={150} y={570} stroke="rgba(126, 132, 198, 1)" />
      <use xlinkHref="#c" x={210} y={30} stroke="rgba(126, 132, 198, 1)" />
      <use xlinkHref="#c" x={210} y={90} stroke="rgba(126, 132, 198, 1)" />
      <use xlinkHref="#c" x={210} y={150} stroke="rgba(126, 132, 198, 1)" />
      <use xlinkHref="#e" x={210} y={210} stroke="rgba(126, 132, 198, 1)" />
      <use xlinkHref="#c" x={210} y={270} stroke="rgba(126, 132, 198, 1)" />
      <use xlinkHref="#e" x={210} y={330} stroke="rgba(126, 132, 198, 1)" />
      <use xlinkHref="#d" x={210} y={390} stroke="rgba(126, 132, 198, 1)" />
      <use xlinkHref="#e" x={210} y={450} stroke="rgba(126, 132, 198, 1)" />
      <use xlinkHref="#e" x={210} y={510} stroke="rgba(126, 132, 198, 1)" />
      <use xlinkHref="#g" x={210} y={570} stroke="rgba(126, 132, 198, 1)" />
      <use xlinkHref="#c" x={270} y={30} stroke="rgba(126, 132, 198, 1)" />
      <use xlinkHref="#g" x={270} y={90} stroke="rgba(126, 132, 198, 1)" />
      <use xlinkHref="#g" x={270} y={150} stroke="rgba(126, 132, 198, 1)" />
      <use xlinkHref="#c" x={270} y={210} stroke="rgba(126, 132, 198, 1)" />
      <use xlinkHref="#h" x={270} y={270} stroke="rgba(126, 132, 198, 1)" strokeWidth={3} />
      <use xlinkHref="#e" x={270} y={330} stroke="rgba(126, 132, 198, 1)" />
      <use xlinkHref="#c" x={270} y={390} stroke="rgba(126, 132, 198, 1)" />
      <use xlinkHref="#d" x={270} y={450} stroke="rgba(126, 132, 198, 1)" />
      <use xlinkHref="#e" x={270} y={510} stroke="rgba(126, 132, 198, 1)" />
      <use xlinkHref="#c" x={270} y={570} stroke="rgba(126, 132, 198, 1)" />
      <use xlinkHref="#g" x={330} y={30} stroke="rgba(126, 132, 198, 1)" />
      <use xlinkHref="#e" x={330} y={90} stroke="rgba(126, 132, 198, 1)" />
      <use xlinkHref="#c" x={330} y={150} stroke="rgba(126, 132, 198, 1)" />
      <use xlinkHref="#c" x={330} y={210} stroke="rgba(126, 132, 198, 1)" />
      <use xlinkHref="#f" x={330} y={270} stroke="rgba(126, 132, 198, 1)" />
      <use xlinkHref="#c" x={330} y={330} stroke="rgba(126, 132, 198, 1)" />
      <use xlinkHref="#c" x={330} y={390} stroke="rgba(126, 132, 198, 1)" />
      <use xlinkHref="#e" x={330} y={450} stroke="rgba(126, 132, 198, 1)" />
      <use xlinkHref="#c" x={330} y={510} stroke="rgba(126, 132, 198, 1)" />
      <use xlinkHref="#g" x={330} y={570} stroke="rgba(126, 132, 198, 1)" />
      <use xlinkHref="#c" x={390} y={30} stroke="rgba(126, 132, 198, 1)" />
      <use xlinkHref="#f" x={390} y={90} stroke="rgba(126, 132, 198, 1)" />
      <use xlinkHref="#e" x={390} y={150} stroke="rgba(126, 132, 198, 1)" />
      <use xlinkHref="#d" x={390} y={210} stroke="rgba(126, 132, 198, 1)" />
      <use xlinkHref="#e" x={390} y={270} stroke="rgba(126, 132, 198, 1)" />
      <use xlinkHref="#h" x={390} y={330} stroke="rgba(126, 132, 198, 1)" strokeWidth={3} />
      <use xlinkHref="#c" x={390} y={390} stroke="rgba(126, 132, 198, 1)" />
      <use xlinkHref="#e" x={390} y={450} stroke="rgba(126, 132, 198, 1)" />
      <use xlinkHref="#d" x={390} y={510} stroke="rgba(126, 132, 198, 1)" />
      <use xlinkHref="#f" x={390} y={570} stroke="rgba(126, 132, 198, 1)" />
      <use xlinkHref="#f" x={450} y={30} stroke="rgba(126, 132, 198, 1)" />
      <use xlinkHref="#e" x={450} y={90} stroke="rgba(126, 132, 198, 1)" />
      <use xlinkHref="#d" x={450} y={150} stroke="rgba(126, 132, 198, 1)" />
      <use xlinkHref="#e" x={450} y={210} stroke="rgba(126, 132, 198, 1)" />
      <use xlinkHref="#c" x={450} y={270} stroke="rgba(126, 132, 198, 1)" />
      <use xlinkHref="#e" x={450} y={330} stroke="rgba(126, 132, 198, 1)" />
      <use xlinkHref="#c" x={450} y={390} stroke="rgba(126, 132, 198, 1)" />
      <use xlinkHref="#e" x={450} y={450} stroke="rgba(126, 132, 198, 1)" />
      <use xlinkHref="#e" x={450} y={510} stroke="rgba(126, 132, 198, 1)" />
      <use xlinkHref="#e" x={450} y={570} stroke="rgba(126, 132, 198, 1)" />
      <use xlinkHref="#e" x={510} y={30} stroke="rgba(126, 132, 198, 1)" />
      <use xlinkHref="#c" x={510} y={90} stroke="rgba(126, 132, 198, 1)" />
      <use xlinkHref="#e" x={510} y={150} stroke="rgba(126, 132, 198, 1)" />
      <use xlinkHref="#e" x={510} y={210} stroke="rgba(126, 132, 198, 1)" />
      <use xlinkHref="#e" x={510} y={270} stroke="rgba(126, 132, 198, 1)" />
      <use xlinkHref="#g" x={510} y={330} stroke="rgba(126, 132, 198, 1)" />
      <use xlinkHref="#f" x={510} y={390} stroke="rgba(126, 132, 198, 1)" />
      <use xlinkHref="#c" x={510} y={450} stroke="rgba(126, 132, 198, 1)" />
      <use xlinkHref="#f" x={510} y={510} stroke="rgba(126, 132, 198, 1)" />
      <use xlinkHref="#c" x={510} y={570} stroke="rgba(126, 132, 198, 1)" />
      <use xlinkHref="#c" x={570} y={30} stroke="rgba(126, 132, 198, 1)" />
      <use xlinkHref="#e" x={570} y={90} stroke="rgba(126, 132, 198, 1)" />
      <use xlinkHref="#e" x={570} y={150} stroke="rgba(126, 132, 198, 1)" />
      <use xlinkHref="#f" x={570} y={210} stroke="rgba(126, 132, 198, 1)" />
      <use xlinkHref="#g" x={570} y={270} stroke="rgba(126, 132, 198, 1)" />
      <use xlinkHref="#e" x={570} y={330} stroke="rgba(126, 132, 198, 1)" />
      <use xlinkHref="#c" x={570} y={390} stroke="rgba(126, 132, 198, 1)" />
      <use xlinkHref="#e" x={570} y={450} stroke="rgba(126, 132, 198, 1)" />
      <use xlinkHref="#c" x={570} y={510} stroke="rgba(126, 132, 198, 1)" />
      <use xlinkHref="#g" x={570} y={570} stroke="rgba(126, 132, 198, 1)" />
      <use xlinkHref="#c" x={630} y={30} stroke="rgba(126, 132, 198, 1)" />
      <use xlinkHref="#h" x={630} y={90} stroke="rgba(126, 132, 198, 1)" strokeWidth={3} />
      <use xlinkHref="#e" x={630} y={150} stroke="rgba(126, 132, 198, 1)" />
      <use xlinkHref="#d" x={630} y={210} stroke="rgba(126, 132, 198, 1)" />
      <use xlinkHref="#c" x={630} y={270} stroke="rgba(126, 132, 198, 1)" />
      <use xlinkHref="#f" x={630} y={330} stroke="rgba(126, 132, 198, 1)" />
      <use xlinkHref="#c" x={630} y={390} stroke="rgba(126, 132, 198, 1)" />
      <use xlinkHref="#c" x={630} y={450} stroke="rgba(126, 132, 198, 1)" />
      <use xlinkHref="#c" x={630} y={510} stroke="rgba(126, 132, 198, 1)" />
      <use xlinkHref="#c" x={630} y={570} stroke="rgba(126, 132, 198, 1)" />
      <use xlinkHref="#e" x={690} y={30} stroke="rgba(126, 132, 198, 1)" />
      <use xlinkHref="#g" x={690} y={90} stroke="rgba(126, 132, 198, 1)" />
      <use xlinkHref="#e" x={690} y={150} stroke="rgba(126, 132, 198, 1)" />
      <use xlinkHref="#h" x={690} y={210} stroke="rgba(126, 132, 198, 1)" strokeWidth={3} />
      <use xlinkHref="#f" x={690} y={270} stroke="rgba(126, 132, 198, 1)" />
      <use xlinkHref="#e" x={690} y={330} stroke="rgba(126, 132, 198, 1)" />
      <use xlinkHref="#e" x={690} y={390} stroke="rgba(126, 132, 198, 1)" />
      <use xlinkHref="#c" x={690} y={450} stroke="rgba(126, 132, 198, 1)" />
      <use xlinkHref="#e" x={690} y={510} stroke="rgba(126, 132, 198, 1)" />
      <use xlinkHref="#e" x={690} y={570} stroke="rgba(126, 132, 198, 1)" />
    </symbol>
  </svg>
);
export default SvgComponent;
