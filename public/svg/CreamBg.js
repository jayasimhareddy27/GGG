export default function CreamBgSvg() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center overflow-hidden">
      {/* Glow Blur Accent */}
      <div className="absolute w-[800px] h-[400px] bg-[#F5E6D3] opacity-70 rounded-full blur-3xl -translate-y-6" />

      <svg
        className="w-full h-full max-w-5xl opacity-80"
        viewBox="0 0 800 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* Soft Background Wave */}
        <path
          d="M -50 250 Q 200 160 400 240 T 850 180 V 450 H -50 Z"
          fill="#F7EBE1"
          opacity="0.5"
        />

        {/* Jar Drop Shadow */}
        <ellipse cx="400" cy="330" rx="240" ry="18" fill="#D4A373" opacity="0.2" />

        {/* Wide Jar Body */}
        <path
          d="M 180 180 
             C 175 230, 190 300, 220 315 
             C 250 328, 550 328, 580 315 
             C 610 300, 625 230, 620 180 
             Z"
          fill="#FFFDF9"
          stroke="#C69263"
          strokeWidth="3.5"
        />

        {/* Glass Reflections */}
        <path
          d="M 210 200 C 205 240, 215 285, 230 300"
          stroke="#FFFFFF"
          strokeWidth="6"
          strokeLinecap="round"
          opacity="0.9"
        />

        {/* Rich Cream Jar Fill */}
        <path
          d="M 188 190 
             C 184 230, 198 292, 225 306 
             C 250 318, 550 318, 575 306 
             C 602 292, 616 230, 612 190 
             Z"
          fill="#F5E6D3"
        />

        {/* Whipped Cream Top Swirls */}
        <path
          d="M 165 185 
             C 160 155, 210 135, 250 155 
             C 270 115, 340 100, 380 130 
             C 410 105, 480 110, 520 145 
             C 550 125, 610 140, 630 180 
             C 640 200, 615 205, 590 200 
             C 530 205, 270 205, 165 185 
             Z"
          fill="#FFF9F2"
          stroke="#C69263"
          strokeWidth="3"
        />

        {/* Swirl Dollop Peak */}
        <path
          d="M 370 115 C 390 80, 430 90, 415 120 C 400 140, 380 130, 370 115 Z"
          fill="#FFF9F2"
          stroke="#C69263"
          strokeWidth="2.5"
        />

        {/* Texture Lines */}
        <path
          d="M 240 160 C 310 185, 490 180, 560 160"
          stroke="#E0C9B1"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
        />

        {/* Jar Lip Rim */}
        <rect
          x="160"
          y="172"
          width="480"
          height="16"
          rx="8"
          fill="#E6CCB2"
          stroke="#C69263"
          strokeWidth="3"
        />

        {/* Floating Droplets */}
        <circle cx="110" cy="140" r="10" fill="#FFF9F2" stroke="#C69263" strokeWidth="2" />
        <circle cx="680" cy="120" r="14" fill="#F5E6D3" opacity="0.8" />
        <circle cx="715" cy="170" r="7" fill="#FFF9F2" stroke="#C69263" strokeWidth="1.5" />
      </svg>
    </div>
  );
}