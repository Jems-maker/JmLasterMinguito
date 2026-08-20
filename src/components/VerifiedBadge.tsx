"use client";

export default function VerifiedBadge() {
  return (
    <span
      className="ml-2 inline-flex size-[24px] sm:size-[28px] md:size-[32px] shrink-0 items-center justify-center transition-transform duration-150 hover:scale-105"
      role="img"
      aria-label="Verified profile"
      title="Verified profile"
      style={{ verticalAlign: "middle" }}
    >
      <svg
        viewBox="0 0 100 100"
        className="size-full"
        aria-hidden="true"
        fill="none"
      >
        {/* Facebook-style scalloped rosette — 12 subtle rounded lobes */}
        <path
          d="M50 2 L53.06 3.27 L55.74 6.38 L58.03 9.62 L60.35 11.36 L63.23 11.01 L66.84 9.35 L70.71 8 L74 8.43 L76.02 11.06 L76.79 15.09 L77.15 19.05 L78.28 21.72 L80.95 22.85 L84.91 23.21 L88.94 23.98 L91.57 26 L92 29.29 L90.65 33.16 L88.99 36.77 L88.64 39.65 L90.38 41.97 L93.62 44.26 L96.73 46.94 L98 50 L96.73 53.06 L93.62 55.74 L90.38 58.03 L88.64 60.35 L88.99 63.23 L90.65 66.84 L92 70.71 L91.57 74 L88.94 76.02 L84.91 76.79 L80.95 77.15 L78.28 78.28 L77.15 80.95 L76.79 84.91 L76.02 88.94 L74 91.57 L70.71 92 L66.84 90.65 L63.23 88.99 L60.35 88.64 L58.03 90.38 L55.74 93.62 L53.06 96.73 L50 98 L46.94 96.73 L44.26 93.62 L41.97 90.38 L39.65 88.64 L36.77 88.99 L33.16 90.65 L29.29 92 L26 91.57 L23.98 88.94 L23.21 84.91 L22.85 80.95 L21.72 78.28 L19.05 77.15 L15.09 76.79 L11.06 76.02 L8.43 74 L8 70.71 L9.35 66.84 L11.01 63.23 L11.36 60.35 L9.62 58.03 L6.38 55.74 L3.27 53.06 L2 50 L3.27 46.94 L6.38 44.26 L9.62 41.97 L11.36 39.65 L11.01 36.77 L9.35 33.16 L8 29.29 L8.43 26 L11.06 23.98 L15.09 23.21 L19.05 22.85 L21.72 21.72 L22.85 19.05 L23.21 15.09 L23.98 11.06 L26 8.43 L29.29 8 L33.16 9.35 L36.77 11.01 L39.65 11.36 L41.97 9.62 L44.26 6.38 L46.94 3.27Z"
          fill="#0866FF"
        />

        {/* White checkmark — thick, rounded, centered */}
        <path
          d="M29 51 L43 65 L71 35"
          stroke="#FFFFFF"
          strokeWidth="9"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}
