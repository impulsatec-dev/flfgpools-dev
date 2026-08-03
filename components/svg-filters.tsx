export function SvgFilters() {
  return (
    <svg
      width="0"
      height="0"
      style={{ position: 'absolute' }}
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        {/* Liquid displacement filter for refraction */}
        <filter
          id="liquid-displace"
          x="0%"
          y="0%"
          width="100%"
          height="100%"
        >
          <feImage href="#displace-map" result="map" />
          <feDisplacementMap
            in="SourceGraphic"
            in2="map"
            scale="18"
            xChannelSelector="R"
            yChannelSelector="G"
          />
          <feGaussianBlur stdDeviation="0.4" />
        </filter>

        {/* Specular highlight filter */}
        <filter id="liquid-specular">
          <feSpecularLighting
            surfaceScale="2"
            specularConstant="0.9"
            specularExponent="20"
            lightingColor="#ffffff"
          >
            <feDistantLight azimuth="135" elevation="60" />
          </feSpecularLighting>
          <feComposite in2="SourceAlpha" operator="in" />
        </filter>

        {/* Gradient for displacement map */}
        <linearGradient id="displace-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ff0000" />
          <stop offset="50%" stopColor="#00ff00" />
          <stop offset="100%" stopColor="#0000ff" />
        </linearGradient>
      </defs>
    </svg>
  );
}