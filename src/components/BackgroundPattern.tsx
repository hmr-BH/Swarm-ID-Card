interface BackgroundPatternProps {
  pattern: string;
  textColorClass: string;
}

export const BackgroundPattern: React.FC<BackgroundPatternProps> = ({ pattern, textColorClass }) => {
  const renderBackgroundPattern = () => {
    switch (pattern) {
      case 'circuit':
        return (
          <div className="absolute inset-0 opacity-20">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="circuit-board" width="60" height="60" patternUnits="userSpaceOnUse">
                  <path d="M0,30 L15,30 L15,15 L30,15 L30,45 L45,45 L45,30 L60,30" 
                        fill="none" stroke="currentColor" strokeWidth="2" opacity="0.8"/>
                  <path d="M30,0 L30,15 M45,15 L45,0 M15,45 L15,60 M30,45 L30,60" 
                        fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.6"/>
                  <path d="M0,15 L10,15 L10,10 L20,10" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.5"/>
                  <path d="M40,50 L50,50 L50,55 L60,55" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.5"/>
                  <path d="M5,0 L5,5 L10,5" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.5"/>
                  <path d="M55,60 L55,55 L50,55" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.5"/>
                  <circle cx="15" cy="30" r="3" fill="currentColor" opacity="0.9"/>
                  <circle cx="30" cy="15" r="3" fill="currentColor" opacity="0.9"/>
                  <circle cx="30" cy="45" r="3" fill="currentColor" opacity="0.9"/>
                  <circle cx="45" cy="45" r="3" fill="currentColor" opacity="0.9"/>
                  <circle cx="45" cy="15" r="2" fill="currentColor" opacity="0.7"/>
                  <circle cx="15" cy="15" r="2" fill="currentColor" opacity="0.7"/>
                  <circle cx="15" cy="45" r="2" fill="currentColor" opacity="0.7"/>
                  <circle cx="10" cy="15" r="1.5" fill="currentColor" opacity="0.6"/>
                  <circle cx="20" cy="10" r="1.5" fill="currentColor" opacity="0.6"/>
                  <circle cx="40" cy="50" r="1.5" fill="currentColor" opacity="0.6"/>
                  <circle cx="50" cy="55" r="1.5" fill="currentColor" opacity="0.6"/>
                  <circle cx="5" cy="5" r="1.5" fill="currentColor" opacity="0.6"/>
                  <circle cx="55" cy="55" r="1.5" fill="currentColor" opacity="0.6"/>
                  <rect x="35" y="25" width="10" height="10" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.4"/>
                  <rect x="10" y="35" width="8" height="8" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.4"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#circuit-board)" />
            </svg>
          </div>
        );
      
      case 'hexagon':
        return (
          <div className="absolute inset-0 opacity-15">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="hexagon-pattern" width="40" height="35" patternUnits="userSpaceOnUse">
                  <polygon points="20,1 35,10 35,25 20,34 5,25 5,10" 
                           fill="none" stroke="currentColor" strokeWidth="1" opacity="0.6"/>
                  <polygon points="10,17 15,20 15,27 10,30 5,27 5,20" 
                           fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.4"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#hexagon-pattern)" />
            </svg>
          </div>
        );
      
      case 'grid':
        return (
          <div className="absolute inset-0 opacity-20">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="grid-pattern" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M20,0 L0,0 0,20" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.6"/>
                  <circle cx="10" cy="10" r="1" fill="currentColor" opacity="0.4"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid-pattern)" />
            </svg>
          </div>
        );
      
      case 'dots':
        return (
          <div className="absolute inset-0 opacity-25">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="dots-pattern" width="15" height="15" patternUnits="userSpaceOnUse">
                  <circle cx="7.5" cy="7.5" r="1.5" fill="currentColor" opacity="0.6"/>
                  <circle cx="0" cy="0" r="0.8" fill="currentColor" opacity="0.3"/>
                  <circle cx="15" cy="0" r="0.8" fill="currentColor" opacity="0.3"/>
                  <circle cx="0" cy="15" r="0.8" fill="currentColor" opacity="0.3"/>
                  <circle cx="15" cy="15" r="0.8" fill="currentColor" opacity="0.3"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#dots-pattern)" />
            </svg>
          </div>
        );
      
      case 'waves':
        return (
          <div className="absolute inset-0 opacity-20">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="waves-pattern" width="50" height="30" patternUnits="userSpaceOnUse">
                  <path d="M0,15 Q12.5,5 25,15 T50,15" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.6"/>
                  <path d="M0,25 Q12.5,15 25,25 T50,25" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.4"/>
                  <path d="M0,5 Q12.5,15 25,5 T50,5" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.4"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#waves-pattern)" />
            </svg>
          </div>
        );
      
      case 'geometric':
        return (
          <div className="absolute inset-0 opacity-18">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="geometric-pattern" width="45" height="45" patternUnits="userSpaceOnUse">
                  <rect x="5" y="5" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.5"/>
                  <rect x="25" y="25" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.5"/>
                  <path d="M0,22.5 L22.5,0 M22.5,45 L45,22.5" stroke="currentColor" strokeWidth="0.8" opacity="0.4"/>
                  <circle cx="22.5" cy="22.5" r="2" fill="currentColor" opacity="0.6"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#geometric-pattern)" />
            </svg>
          </div>
        );
      
      case 'tech':
        return (
          <div className="absolute inset-0 opacity-15">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="tech-pattern" width="55" height="55" patternUnits="userSpaceOnUse">
                  <text x="5" y="10" fontSize="8" fill="currentColor" opacity="0.6">01</text>
                  <text x="20" y="25" fontSize="8" fill="currentColor" opacity="0.4">10</text>
                  <text x="35" y="15" fontSize="8" fill="currentColor" opacity="0.5">11</text>
                  <text x="10" y="40" fontSize="8" fill="currentColor" opacity="0.6">00</text>
                  <text x="30" y="45" fontSize="8" fill="currentColor" opacity="0.4">01</text>
                  <text x="45" y="35" fontSize="8" fill="currentColor" opacity="0.5">10</text>
                  <path d="M10,10 L25,25 M35,15 L30,45 M20,40 L45,35" 
                        stroke="currentColor" strokeWidth="0.5" opacity="0.3"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#tech-pattern)" />
            </svg>
          </div>
        );
      
      case 'minimal':
        return (
          <div className="absolute inset-0 opacity-12">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="minimal-pattern" width="80" height="80" patternUnits="userSpaceOnUse">
                  <circle cx="40" cy="40" r="20" fill="none" stroke="currentColor" strokeWidth="0.8" opacity="0.4"/>
                  <circle cx="40" cy="40" r="2" fill="currentColor" opacity="0.6"/>
                  <line x1="40" y1="20" x2="40" y2="60" stroke="currentColor" strokeWidth="0.5" opacity="0.3"/>
                  <line x1="20" y1="40" x2="60" y2="40" stroke="currentColor" strokeWidth="0.5" opacity="0.3"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#minimal-pattern)" />
            </svg>
          </div>
        );
      
      default:
        return null;
    }
  };

  return <div className={textColorClass}>{renderBackgroundPattern()}</div>;
};