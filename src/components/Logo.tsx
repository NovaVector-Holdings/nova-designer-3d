export function NovaVectorLogo({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Outer hexagon */}
      <path
        d="M50 5 L85 27.5 L85 72.5 L50 95 L15 72.5 L15 27.5 Z"
        fill="url(#gradient1)"
        stroke="#0099FF"
        strokeWidth="2"
      />
      {/* Inner geometric pattern - vector arrows */}
      <path
        d="M50 25 L70 40 L60 50 L50 45 L40 50 L30 40 Z"
        fill="#00CCFF"
        opacity="0.8"
      />
      <path
        d="M50 45 L65 55 L50 75 L35 55 Z"
        fill="#0066FF"
        opacity="0.9"
      />
      {/* Central node */}
      <circle cx="50" cy="50" r="8" fill="#FFFFFF" />
      <circle cx="50" cy="50" r="4" fill="#0066FF" />

      <defs>
        <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0066FF" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#00CCFF" stopOpacity="0.6" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function NovaDesignerWordmark({ height = 24 }: { height?: number }) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      height: `${height}px`
    }}>
      <NovaVectorLogo size={height} />
      <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.2 }}>
        <span style={{
          fontSize: `${height * 0.6}px`,
          fontWeight: 700,
          color: '#FFFFFF',
          letterSpacing: '-0.5px'
        }}>
          Nova Designer
        </span>
        <span style={{
          fontSize: `${height * 0.35}px`,
          fontWeight: 500,
          color: '#00CCFF',
          letterSpacing: '1px'
        }}>
          3D
        </span>
      </div>
    </div>
  );
}
