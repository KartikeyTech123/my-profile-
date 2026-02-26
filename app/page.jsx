'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Github, Linkedin, Mail, Phone, MapPin, ExternalLink, Download } from 'lucide-react';

// ============================================================================
// CUSTOM HOOKS & UTILITIES
// ============================================================================

const MatrixRain = ({ canvas }) => {
  useEffect(() => {
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const w = (canvas.width = window.innerWidth);
    const h = (canvas.height = window.innerHeight);

    const chars = '01ヲアウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユラリルレロワン';
    const fontSize = 14;
    const columns = w / fontSize;
    const drops = Array(Math.floor(columns)).fill(0);

    const draw = () => {
      ctx.fillStyle = 'rgba(10, 10, 10, 0.1)';
      ctx.fillRect(0, 0, w, h);

      ctx.fillStyle = '#00FF41';
      ctx.font = `bold ${fontSize}px "Courier New"`;

      for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(char, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > h && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
      requestAnimationFrame(draw);
    };

    draw();
  }, [canvas]);

  return null;
};

const GlitchText = ({ text, className = '' }) => {
  const [seed, setSeed] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setSeed(Math.random()), 150);
    return () => clearInterval(interval);
  }, []);

  if (seed > 0.98) {
    const charIndex = Math.floor(Math.random() * text.length);
    const glitchChars = '!@#$%^&*()_+-=[]{}|;:,.<>?/~`';
    const newText = text.split('');
    newText[charIndex] = glitchChars[Math.floor(Math.random() * glitchChars.length)];
    return (
      <span className={className} style={{
        textShadow: '0 0 10px rgba(0, 255, 65, 0.5), 0 0 20px rgba(0, 255, 255, 0.3)',
        animation: 'pulse 0.2s'
      }}>
        {newText.join('')}
      </span>
    );
  }

  return <span className={className} style={{
    textShadow: '0 0 10px rgba(0, 255, 65, 0.5), 0 0 20px rgba(0, 255, 255, 0.3)'
  }}>{text}</span>;
};

const TypingAnimation = ({ text, speed = 100 }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (displayedText.length < text.length) {
      const timer = setTimeout(() => {
        setDisplayedText(text.slice(0, displayedText.length + 1));
      }, speed);
      return () => clearTimeout(timer);
    } else {
      setIsComplete(true);
    }
  }, [displayedText, text, speed]);

  return (
    <span>
      {displayedText}
      {!isComplete && <span style={{ animation: 'pulse 0.5s' }}>█</span>}
    </span>
  );
};

// ============================================================================
// COMPONENTS
// ============================================================================

const Navbar = ({ currentPage, setCurrentPage }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pages = ['Home', 'About', 'Resume', 'Projects', 'Contact'];

  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 50,
      backgroundColor: 'rgba(10, 10, 10, 0.4)',
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid rgba(0, 255, 255, 0.3)',
      boxShadow: '0 10px 30px rgba(0, 255, 65, 0.1)'
    }}>
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '1rem 1.5rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <button
          onClick={() => setCurrentPage('Home')}
          style={{
            fontSize: '1.5rem',
            fontWeight: 'bold',
            color: '#00FF41',
            backgroundColor: 'transparent',
            border: 'none',
            cursor: 'pointer',
            textShadow: '0 0 10px rgba(0, 255, 65, 0.5)'
          }}
        >
          KS
        </button>

        {/* Desktop Menu */}
        <div style={{
          display: 'flex',
          gap: '2rem',
          alignItems: 'center',
          '@media (maxwidth: 768px)': {
            display: 'none'
          }
        }}>
          {pages.map(page => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              style={{
                fontFamily: "'Fira Code', monospace",
                fontSize: '0.875rem',
                backgroundColor: 'transparent',
                border: 'none',
                cursor: 'pointer',
                color: currentPage === page ? '#00FF41' : '#d1d5db',
                borderBottom: currentPage === page ? '2px solid #00FF41' : 'none',
                paddingBottom: '0.25rem',
                transition: 'all 0.3s'
              }}
            >
              {page}
            </button>
          ))}
        </div>

        {/* Social Icons */}
        <div style={{
          display: 'flex',
          gap: '1rem'
        }}>
          <a href="https://github.com/KartikeyTech123/BUG-Report-of-University-" target="_blank" rel="noopener noreferrer" style={{
            color: '#00FFFF',
            fontSize: '1.25rem',
            cursor: 'pointer',
            transition: 'all 0.3s'
          }}>
            <Github size={20} />
          </a>
          <a href="https://linkedin.com/in/kartikey-singh-198bc3" target="_blank" rel="noopener noreferrer" style={{
            color: '#00FFFF',
            fontSize: '1.25rem',
            cursor: 'pointer',
            transition: 'all 0.3s'
          }}>
            <Linkedin size={20} />
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          style={{
            display: 'none',
            '@media (maxwidth: 768px)': {
              display: 'block'
            },
            backgroundColor: 'transparent',
            border: 'none',
            color: '#00FFFF',
            cursor: 'pointer',
            fontSize: '1.5rem'
          }}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div style={{
          display: 'block',
          '@media (min-width: 769px)': {
            display: 'none'
          },
          backgroundColor: 'rgba(10, 10, 10, 0.8)',
          backdropFilter: 'blur(12px)',
          borderTop: '1px solid rgba(0, 255, 255, 0.3)',
          padding: '1rem'
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {pages.map(page => (
              <button
                key={page}
                onClick={() => {
                  setCurrentPage(page);
                  setMobileMenuOpen(false);
                }}
                style={{
                  textAlign: 'left',
                  fontFamily: "'Fira Code', monospace",
                  fontSize: '0.875rem',
                  backgroundColor: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  color: currentPage === page ? '#00FF41' : '#9ca3af'
                }}
              >
                {page}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};


// ============================================================================
// FOOTER
// ============================================================================

const Footer = () => {
  return (
    <footer style={{
      backgroundColor: 'rgba(10, 10, 10, 0.95)',
      borderTop: '1px solid rgba(0, 255, 255, 0.3)',
      padding: '2rem 1.5rem',
      marginTop: '4rem'
    }}>
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        textAlign: 'center'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '2rem',
          marginBottom: '2rem',
          flexWrap: 'wrap'
        }}>
          <a href="https://github.com/KartikeyTech123/BUG-Report-of-University-" target="_blank" rel="noopener noreferrer" style={{
            color: '#00FFFF',
            textDecoration: 'none',
            fontFamily: "'Fira Code', monospace",
            fontSize: '0.875rem'
          }}>
            GitHub
          </a>
          <a href="https://linkedin.com/in/kartikey-singh-198bc3" target="_blank" rel="noopener noreferrer" style={{
            color: '#00FFFF',
            textDecoration: 'none',
            fontFamily: "'Fira Code', monospace",
            fontSize: '0.875rem'
          }}>
            LinkedIn
          </a>
          <a href="mailto:kartikeys2007@gmail.com" style={{
            color: '#00FFFF',
            textDecoration: 'none',
            fontFamily: "'Fira Code', monospace",
            fontSize: '0.875rem'
          }}>
            Email
          </a>
        </div>

        <p style={{
          color: '#9ca3af',
          fontFamily: "'Fira Code', monospace",
          fontSize: '0.875rem',
          marginBottom: '1rem'
        }}>
          © 2026 Kartikey Singh. All rights reserved.
        </p>

        <p style={{
          color: '#00FF41',
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: '0.875rem',
          textShadow: '0 0 10px rgba(0, 255, 65, 0.5)'
        }}>
          Made with 💚 for Security Research
        </p>
      </div>
    </footer>
  );
};

const HomePage = () => {
  const canvasRef = useRef(null);

  return (
    <div style={{
      minHeight: '100vh',
      paddingTop: '1rem',
      position: 'relative',
      overflow: 'hidden',
      backgroundColor: '#000000'
    }}>
      <canvas ref={canvasRef} style={{
        position: 'absolute',
        inset: 0,
        opacity: 0.1
      }} />
      <MatrixRain canvas={canvasRef.current} />

      <div style={{
        position: 'relative',
        zIndex: 10,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        padding: '1.5rem',
        textAlign: 'center'
      }}>
        <div style={{
          space: '2rem',
          maxWidth: '1024px'
        }}>
          {/* Main Heading */}
          <h1 style={{
            fontSize: '3.5rem',
            fontWeight: 'bold',
            fontFamily: "'Space Grotesk', sans-serif",
            lineHeight: 1.2,
            marginBottom: '2rem'
          }}>
            <GlitchText text="KARTIKEY" />
            <br />
            <GlitchText text="SINGH" />
          </h1>

          {/* Typing Animation */}
          <p style={{
            fontSize: '1.5rem',
            fontFamily: "'Fira Code', monospace",
            color: '#d1d5db',
            minHeight: '3rem',
            marginBottom: '2rem'
          }}>
            <TypingAnimation text="I break systems. I build smarter ones." speed={50} />
          </p>

          {/* Stats */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '1rem',
            marginBottom: '3rem'
          }}>
            {[
              { label: 'Bugs Found', value: '2' },
              { label: 'Projects', value: '2+' },
              { label: 'Age', value: '18' }
            ].map((stat, i) => (
              <div key={i} style={{
                backgroundColor: 'rgba(10, 10, 10, 0.4)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(0, 255, 255, 0.5)',
                borderRadius: '0.5rem',
                padding: '1rem',
                boxShadow: '0 0 15px rgba(0, 255, 65, 0.2), inset 0 0 15px rgba(0, 255, 65, 0.1)',
                transition: 'all 0.3s'
              }}>
                <div style={{
                  fontSize: '1.5rem',
                  fontWeight: 'bold',
                  color: '#00FF41',
                  textShadow: '0 0 10px rgba(0, 255, 65, 0.5)'
                }}>{stat.value}</div>
                <div style={{
                  fontSize: '0.75rem',
                  color: '#9ca3af',
                  fontFamily: "'Fira Code', monospace"
                }}>{stat.label}</div>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div style={{
            display: 'flex',
            flexDirection: 'row',
            gap: '1rem',
            justifyContent: 'center'
          }}>
            <button style={{
              padding: '1rem 2rem',
              background: 'linear-gradient(to right, #00FF41, #00FFFF)',
              color: '#000000',
              fontWeight: 'bold',
              borderRadius: '0.5rem',
              border: 'none',
              cursor: 'pointer',
              fontSize: '1rem',
              fontFamily: "'Space Grotesk', sans-serif",
              boxShadow: '0 0 15px rgba(0, 255, 65, 0.3)',
              transition: 'all 0.3s'
            }}>
              View Projects →
            </button>
            <button style={{
              padding: '1rem 2rem',
              border: '2px solid #00FFFF',
              color: '#00FFFF',
              fontWeight: 'bold',
              borderRadius: '0.5rem',
              backgroundColor: 'transparent',
              cursor: 'pointer',
              fontSize: '1rem',
              fontFamily: "'Space Grotesk', sans-serif",
              boxShadow: '0 0 15px rgba(0, 255, 65, 0.3)',
              transition: 'all 0.3s'
            }}>
              Contact Me
            </button>
            <a href="https://github.com/KartikeyTech123/BUG-Report-of-University-" target="_blank" rel="noopener noreferrer" style={{
              padding: '1rem 2rem',
              border: '2px solid #00FF41',
              color: '#00FF41',
              fontWeight: 'bold',
              borderRadius: '0.5rem',
              backgroundColor: 'transparent',
              cursor: 'pointer',
              fontSize: '1rem',
              fontFamily: "'Space Grotesk', sans-serif",
              boxShadow: '0 0 15px rgba(0, 255, 65, 0.3)',
              transition: 'all 0.3s',
              textDecoration: 'none',
              display: 'inline-block'
            }}>
              GitHub
            </a>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

const AboutPage = () => {
  const [terminalHistory, setTerminalHistory] = useState(['> whoami']);
  const [terminalInput, setTerminalInput] = useState('');

  const terminalCommands = {
    'whoami': '→ Kartikey Singh | 18 y/o Ethical Hacker, Web Developer & AI Enthusiast from Mumbai',
    'skills': '→ Web Dev • Ethical Hacking • Python • JavaScript • React • AI • Linux • Burp Suite',
    'bugs': '→ 2 Critical Vulnerabilities Discovered & Responsibly Disclosed (2026)',
    'funfact': '→ I code at 3 AM fueled by chai and curiosity ☕',
    'help': '→ Available commands: whoami • skills • bugs • funfact • clear',
    'clear': 'CLEARED'
  };

  const handleTerminalCommand = (e) => {
    if (e.key === 'Enter' && terminalInput.trim()) {
      const command = terminalInput.toLowerCase();
      let response = terminalCommands[command] || '→ Command not found. Type "help" for available commands.';

      if (command === 'clear') {
        setTerminalHistory(['> whoami']);
        setTerminalInput('');
        return;
      }

      setTerminalHistory([...terminalHistory, `> ${terminalInput}`, response]);
      setTerminalInput('');
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      // paddingTop: '6rem',
      // paddingBottom: '5rem',
      backgroundColor: '#000000',
      // padding: '1.5rem'
    }}>

      <div style={{
        paddingTop: '6rem',
        paddingLeft: '1.5rem'
      }}></div>
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto'
      }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h1 style={{
            fontSize: '3rem',
            fontWeight: 'bold',
            fontFamily: "'Space Grotesk', sans-serif"
          }}>
            <GlitchText text="ABOUT" />
          </h1>
          <p style={{
            color: '#00FFFF',
            fontFamily: "'Fira Code', monospace",
            marginTop: '1rem'
          }}>// Security Researcher • Developer • Innovator</p>
        </div>

        {/* Bio Section */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '3rem',
          alignItems: 'center',
          marginBottom: '3rem'
        }}>
          {/* Profile Card */}
          <div style={{ textAlign: 'center' }}>
            <div style={{
              width: '16rem',
              height: '16rem',
              borderRadius: '0.5rem',
              border: '2px solid rgba(0, 255, 255, 0.5)',
              background: 'linear-gradient(to bottom right, rgba(0, 255, 65, 0.1), rgba(0, 255, 255, 0.1))',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto',
              boxShadow: '0 0 15px rgba(0, 255, 65, 0.2), inset 0 0 15px rgba(0, 255, 65, 0.1)'
            }}>
              <div>
                <div style={{
                  fontSize: '3.5rem',
                  fontWeight: 'bold',
                  color: '#00FF41',
                  textShadow: '0 0 10px rgba(0, 255, 65, 0.5)'
                }}>KS</div>
                <p style={{
                  color: '#00FFFF',
                  fontSize: '0.875rem',
                  marginTop: '1rem',
                  fontFamily: "'Fira Code', monospace"
                }}>18 y/o • Mumbai</p>
              </div>
            </div>
          </div>

          {/* Bio Text */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem'
          }}>
            <p style={{
              color: '#d1d5db',
              lineHeight: 1.6,
              fontSize: '1.125rem'
            }}>
              I'm a 18-year-old ethical hacker and full-stack web developer from Mumbai with a passion for cybersecurity. I've discovered <span style={{
                color: '#00FF41',
                fontWeight: 'bold'
              }}>2 critical vulnerabilities</span> in educational institutions and disclosed them responsibly to improve security practices.
            </p>
            <p style={{
              color: '#9ca3af',
              lineHeight: 1.6
            }}>
              My work focuses on identifying security flaws, building robust applications, and exploring AI-driven solutions. When I'm not breaking systems or building them back better, I'm diving deeper into cutting-edge security research.
            </p>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#00FFFF' }}>
                <MapPin size={20} />
                <span style={{ fontFamily: "'Fira Code', monospace" }}>Mumbai, Maharashtra, India</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#00FFFF' }}>
                <Mail size={20} />
                <span style={{ fontFamily: "'Fira Code', monospace" }}>kartikeys2007@gmail.com</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#00FFFF' }}>
                <Phone size={20} />
                <span style={{ fontFamily: "'Fira Code', monospace" }}>+91 96196 70584</span>
              </div>
            </div>
          </div>
        </div>

        {/* Terminal Console */}
        <div style={{
          backgroundColor: '#000000',
          border: '2px solid rgba(0, 255, 65, 0.5)',
          borderRadius: '0.5rem',
          padding: '1.5rem',
          fontFamily: "'Fira Code', monospace",
          fontSize: '0.875rem',
          boxShadow: '0 0 15px rgba(0, 255, 65, 0.2), inset 0 0 15px rgba(0, 255, 65, 0.1)',
          marginBottom: '2rem'
        }}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
            maxHeight: '24rem',
            overflowY: 'auto',
            marginBottom: '1rem'
          }}>
            {terminalHistory.map((line, i) => (
              <div key={i} style={{
                color: line.startsWith('>') ? '#00FFFF' : '#00FF41'
              }}>
                {line}
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#00FF41' }}>
            <span>→</span>
            <input
              type="text"
              value={terminalInput}
              onChange={(e) => setTerminalInput(e.target.value)}
              onKeyDown={handleTerminalCommand}
              style={{
                backgroundColor: 'transparent',
                outline: 'none',
                flex: 1,
                color: '#00FF41',
                fontFamily: "'Fira Code', monospace",
                border: 'none',
                fontSize: '0.875rem'
              }}
              placeholder="Type command..."
              autoFocus
            />
          </div>
        </div>

        {/* Skills Grid */}
        <div style={{ marginBottom: '3rem' }}>
          <h2 style={{
            fontSize: '1.875rem',
            fontWeight: 'bold',
            fontFamily: "'Space Grotesk', sans-serif",
            color: '#00FFFF',
            textShadow: '0 0 10px rgba(0, 255, 65, 0.5)',
            marginBottom: '1.5rem'
          }}>Tech Stack</h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '1rem'
          }}>
            {[
              'React', 'JavaScript', 'Python', 'Linux',
              'Burp Suite', 'OWASP ZAP', 'Metasploit', 'Nmap',
              'HTML/CSS', 'Next.js', 'Node.js', 'AI/ML'
            ].map((skill, i) => (
              <div key={i} style={{
                backgroundColor: 'rgba(10, 10, 10, 0.4)',
                border: '1px solid rgba(0, 255, 255, 0.5)',
                borderRadius: '0.5rem',
                padding: '1rem',
                textAlign: 'center',
                transition: 'all 0.3s',
                boxShadow: '0 0 15px rgba(0, 255, 65, 0.2), inset 0 0 15px rgba(0, 255, 65, 0.1)'
              }}>
                <span style={{
                  color: '#00FF41',
                  fontWeight: 'bold',
                  fontFamily: "'Space Grotesk', sans-serif"
                }}>{skill}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

const ResumePage = () => {
  return (
    <div style={{
      minHeight: '100vh',
      paddingTop: '6rem',
      paddingBottom: '5rem',
      backgroundColor: '#000000',
      padding: '1.5rem'
    }}>
      <div style={{
        maxWidth: '1024px',
        margin: '0 auto',
        paddingTop: '6rem',
        paddingLeft: '1.5rem',
      }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h1 style={{
            fontSize: '3rem',
            fontWeight: 'bold',
            fontFamily: "'Space Grotesk', sans-serif"
          }}>
            <GlitchText text="RESUME" />
          </h1>
          <a href="#" style={{
            display: 'inline-block',
            padding: '0.75rem 1.5rem',
            background: 'linear-gradient(to right, #00FF41, #00FFFF)',
            color: '#000000',
            fontWeight: 'bold',
            borderRadius: '0.5rem',
            marginTop: '1rem',
            textDecoration: 'none',
            fontFamily: "'Space Grotesk', sans-serif",
            boxShadow: '0 0 15px rgba(0, 255, 65, 0.3)',
            transition: 'all 0.3s'
          }}>
            <Download size={20} style={{ display: 'inline', marginRight: '0.5rem' }} /> Download CV
          </a>
        </div>

        {/* Education */}
        <div style={{ marginBottom: '3rem' }}>
          <h2 style={{
            fontSize: '1.875rem',
            fontWeight: 'bold',
            fontFamily: "'Space Grotesk', sans-serif",
            color: '#00FFFF',
            textShadow: '0 0 10px rgba(0, 255, 65, 0.5)',
            borderLeftWidth: '4px',
            borderLeftColor: '#00FF41',
            paddingLeft: '1rem',
            marginBottom: '1.5rem'
          }}>
            Education
          </h2>
          {[
            { title: 'BCA (Bachelor of Computer Applications)', institution: '1st Year (Current)', date: '2025-2028', status: 'Ongoing' },
            { title: '12th Grade (SSC)', institution: 'Maharashtra Board', date: '2025', status: 'Completed' },
            { title: '10th Grade (CBSE)', institution: 'CBSE Board', date: '2023', status: 'Completed' }
          ].map((edu, i) => (
            <div key={i} style={{
              backgroundColor: 'rgba(10, 10, 10, 0.4)',
              borderLeftWidth: '4px',
              borderLeftColor: 'rgba(0, 255, 65, 0.5)',
              border: '1px solid rgba(0, 255, 255, 0.3)',
              borderRadius: '0.5rem',
              padding: '1.5rem',
              marginBottom: '1rem',
              boxShadow: '0 0 15px rgba(0, 255, 65, 0.2), inset 0 0 15px rgba(0, 255, 65, 0.1)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#00FF41' }}>{edu.title}</h3>
                <span style={{ color: '#00FFFF', fontSize: '0.875rem', fontFamily: "'Fira Code', monospace" }}>{edu.date}</span>
              </div>
              <p style={{ color: '#d1d5db', marginBottom: '0.5rem' }}>{edu.institution}</p>
              <span style={{
                fontSize: '0.75rem',
                backgroundColor: 'rgba(0, 255, 65, 0.2)',
                color: '#00FF41',
                padding: '0.25rem 0.75rem',
                borderRadius: '0.25rem',
                fontFamily: "'Fira Code', monospace"
              }}>{edu.status}</span>
            </div>
          ))}
        </div>

        {/* Certifications */}
        <div style={{ marginBottom: '3rem' }}>
          <h2 style={{
            fontSize: '1.875rem',
            fontWeight: 'bold',
            fontFamily: "'Space Grotesk', sans-serif",
            color: '#00FFFF',
            textShadow: '0 0 10px rgba(0, 255, 65, 0.5)',
            borderLeftWidth: '4px',
            borderLeftColor: '#00FF41',
            paddingLeft: '1rem',
            marginBottom: '1.5rem'
          }}>
            Certifications (In Progress)
          </h2>
          {[
            { title: 'Certified Ethical Hacker (CEH)', issuer: 'EC-Council via DROP', expected: 'February 2026' },
            { title: 'Certified Cyber Security Expert', issuer: 'YCMOU', expected: 'December 2025' }
          ].map((cert, i) => (
            <div key={i} style={{
              backgroundColor: 'rgba(10, 10, 10, 0.4)',
              borderLeftWidth: '4px',
              borderLeftColor: 'rgba(0, 255, 255, 0.5)',
              border: '1px solid rgba(0, 255, 255, 0.3)',
              borderRadius: '0.5rem',
              padding: '1.5rem',
              marginBottom: '1rem',
              boxShadow: '0 0 15px rgba(0, 255, 65, 0.2), inset 0 0 15px rgba(0, 255, 65, 0.1)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#00FFFF' }}>{cert.title}</h3>
                <span style={{ color: '#00FF41', fontSize: '0.875rem', fontFamily: "'Fira Code', monospace" }}>{cert.expected}</span>
              </div>
              <p style={{ color: '#9ca3af' }}>{cert.issuer}</p>
            </div>
          ))}
        </div>

        {/* Skills */}
        <div>
          <h2 style={{
            fontSize: '1.875rem',
            fontWeight: 'bold',
            fontFamily: "'Space Grotesk', sans-serif",
            color: '#00FFFF',
            textShadow: '0 0 10px rgba(0, 255, 65, 0.5)',
            borderLeftWidth: '4px',
            borderLeftColor: '#00FF41',
            paddingLeft: '1rem',
            marginBottom: '1.5rem'
          }}>
            Skills
          </h2>
          {[
            { category: 'Web Development', proficiency: 90 },
            { category: 'Ethical Hacking & Security', proficiency: 85 },
            { category: 'Python & Backend', proficiency: 80 },
            { category: 'AI & Machine Learning', proficiency: 75 },
            { category: 'System Administration & Linux', proficiency: 85 }
          ].map((skill, i) => (
            <div key={i} style={{ marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontFamily: "'Fira Code', monospace", fontSize: '0.875rem' }}>
                <span style={{ color: '#d1d5db' }}>{skill.category}</span>
                <span style={{ color: '#00FF41', textShadow: '0 0 10px rgba(0, 255, 65, 0.5)' }}>{skill.proficiency}%</span>
              </div>
              <div style={{
                width: '100%',
                backgroundColor: 'rgba(10, 10, 10, 0.6)',
                border: '1px solid rgba(0, 255, 255, 0.3)',
                borderRadius: '9999px',
                height: '0.75rem',
                overflow: 'hidden'
              }}>
                <div
                  style={{
                    height: '100%',
                    background: 'linear-gradient(to right, #00FF41, #00FFFF)',
                    width: `${skill.proficiency}%`,
                    transition: 'width 1s ease'
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

const ProjectsPage = () => {
  const projects = [
    {
      title: 'University Web Portal Security Audit',
      date: 'January 2026',
      severity: 'CRITICAL',
      tools: ['Burp Suite', 'Manual Testing'],
      description: 'Comprehensive security audit identifying critical authentication flaws in university portal system.',
      findings: [
        'Broken Authentication → Login bypass via client-side validation flaw',
        'Ineffective Anti-CSRF → 600+ character token not tied to session',
        'Insecure Session Management → Missing HttpOnly + Secure flags'
      ],
      impact: 'Full Account Takeover (students, faculty, admin) + potential database exposure',
      remediation: 'Provided complete remediation recommendations for all vulnerabilities'
    },
    {
      title: 'Hinduja College Website Vulnerability Discovery',
      date: '25 February 2026',
      severity: 'CRITICAL',
      tools: ['OWASP ZAP', 'CVE Analysis'],
      description: 'Discovered critical vulnerabilities in hindujacollege.edu.in including vulnerable libraries and missing security headers.',
      findings: [
        'Vulnerable pdf.js library (CVE-2024-4367) → Arbitrary JavaScript Execution via malicious PDF',
        'Missing security headers (CSP, HSTS, X-Frame-Options)',
        'No Anti-CSRF tokens on contact/inquiry forms'
      ],
      impact: 'Session theft, clickjacking, form hijacking, phishing risk',
      remediation: 'Responsible disclosure with actionable remediation steps'
    }
  ];

  return (
    <div style={{
      minHeight: '100vh',
      paddingTop: '6rem',
      paddingBottom: '5rem',
      backgroundColor: '#000000',
      padding: '1.5rem'
    }}>
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        paddingTop: '6rem',
        paddingLeft: '1.5rem',
      }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h1 style={{
            fontSize: '3rem',
            fontWeight: 'bold',
            fontFamily: "'Space Grotesk', sans-serif"
          }}>
            <GlitchText text="PROJECTS" />
          </h1>
          <p style={{
            color: '#00FFFF',
            fontFamily: "'Fira Code', monospace",
            marginTop: '1rem'
          }}>// Security Research & Vulnerability Discoveries</p>
        </div>

        {/* Projects */}
        {projects.map((project, idx) => (
          <div key={idx} style={{
            background: 'linear-gradient(to bottom right, rgba(10, 10, 10, 0.8), rgba(10, 10, 10, 0.4))',
            border: '1px solid rgba(0, 255, 255, 0.4)',
            borderRadius: '0.75rem',
            overflow: 'hidden',
            marginBottom: '2rem',
            boxShadow: '0 0 20px rgba(0, 255, 65, 0.2)',
            transition: 'all 0.3s'
          }}>
            {/* Header */}
            <div style={{
              background: 'linear-gradient(to right, rgba(0, 255, 65, 0.1), rgba(0, 255, 255, 0.1))',
              borderBottom: '1px solid rgba(0, 255, 255, 0.3)',
              padding: '2rem'
            }}>
              <div style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                gap: '1rem',
                marginBottom: '1rem'
              }}>
                <div>
                  <h2 style={{
                    fontSize: '1.875rem',
                    fontWeight: 'bold',
                    color: '#00FF41',
                    textShadow: '0 0 10px rgba(0, 255, 65, 0.5)',
                    marginBottom: '0.5rem'
                  }}>{project.title}</h2>
                  <p style={{
                    color: '#9ca3af',
                    fontFamily: "'Fira Code', monospace",
                    fontSize: '0.875rem'
                  }}>{project.description}</p>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <span style={{
                    padding: '0.5rem 1rem',
                    borderRadius: '0.5rem',
                    fontWeight: 'bold',
                    fontFamily: "'Space Grotesk', sans-serif",
                    textAlign: 'center',
                    backgroundColor: 'rgba(239, 68, 68, 0.3)',
                    color: '#f87171',
                    border: '1px solid rgba(239, 68, 68, 0.5)'
                  }}>
                    {project.severity}
                  </span>
                  <span style={{
                    color: '#00FFFF',
                    fontFamily: "'Fira Code', monospace",
                    fontSize: '0.875rem',
                    textAlign: 'center'
                  }}>{project.date}</span>
                </div>
              </div>

              {/* Tools */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {project.tools.map((tool, i) => (
                  <span key={i} style={{
                    padding: '0.25rem 0.75rem',
                    backgroundColor: 'rgba(0, 255, 65, 0.2)',
                    color: '#00FF41',
                    borderRadius: '0.25rem',
                    fontSize: '0.75rem',
                    fontFamily: "'Fira Code', monospace",
                    border: '1px solid rgba(0, 255, 65, 0.5)'
                  }}>
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            {/* Body */}
            <div style={{ padding: '2rem' }}>
              {/* Findings */}
              <div style={{ marginBottom: '1.5rem' }}>
                <h3 style={{
                  fontSize: '1.25rem',
                  fontWeight: 'bold',
                  color: '#00FFFF',
                  marginBottom: '1rem',
                  fontFamily: "'Space Grotesk', sans-serif"
                }}>Key Findings</h3>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {project.findings.map((finding, i) => (
                    <li key={i} style={{
                      color: '#d1d5db',
                      display: 'flex',
                      gap: '0.75rem'
                    }}>
                      <span style={{ color: '#00FF41', marginTop: '0.25rem' }}>▸</span>
                      <span>{finding}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Impact */}
              <div style={{ marginBottom: '1.5rem' }}>
                <h3 style={{
                  fontSize: '1.25rem',
                  fontWeight: 'bold',
                  color: '#f87171',
                  marginBottom: '0.5rem',
                  fontFamily: "'Space Grotesk', sans-serif"
                }}>⚠ Impact</h3>
                <p style={{ color: '#d1d5db' }}>{project.impact}</p>
              </div>

              {/* Remediation */}
              <div style={{
                backgroundColor: 'rgba(10, 10, 10, 0.4)',
                border: '1px solid rgba(0, 255, 255, 0.3)',
                borderRadius: '0.5rem',
                padding: '1rem'
              }}>
                <h3 style={{
                  fontSize: '0.875rem',
                  fontWeight: 'bold',
                  color: '#00FF41',
                  marginBottom: '0.5rem',
                  fontFamily: "'Fira Code', monospace"
                }}>✓ Responsible Disclosure</h3>
                <p style={{
                  fontSize: '0.875rem',
                  color: '#d1d5db'
                }}>{project.remediation}</p>
              </div>
            </div>

            {/* Footer */}
            <div style={{
              backgroundColor: 'rgba(10, 10, 10, 0.6)',
              borderTop: '1px solid rgba(0, 255, 255, 0.3)',
              padding: '1rem 2rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <span style={{
                color: '#00FF41',
                fontFamily: "'Fira Code', monospace",
                fontSize: '0.75rem'
              }}>[ DISCLOSED RESPONSIBLY ]</span>
              <button style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.5rem 1.5rem',
                background: 'linear-gradient(to right, rgba(0, 255, 65, 0.2), rgba(0, 255, 255, 0.2))',
                border: '1px solid rgba(0, 255, 65, 0.5)',
                color: '#00FF41',
                fontWeight: 'bold',
                borderRadius: '0.5rem',
                cursor: 'pointer',
                fontFamily: "'Space Grotesk', sans-serif",
                boxShadow: '0 0 10px rgba(0, 255, 65, 0.2)',
                transition: 'all 0.3s'
              }}>
                View Full Report <ExternalLink size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
};

const ContactPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
      setIsSubmitting(false);

      setTimeout(() => setSubmitted(false), 5000);
    }, 1500);
  };

  return (
    <div style={{
      minHeight: '100vh',
      paddingTop: '6rem',
      paddingBottom: '5rem',
      backgroundColor: '#000000',
      padding: '1.5rem'
    }}>
      <div style={{
        maxWidth: '1024px',
        margin: '0 auto',
        paddingTop: '6rem',
        paddingLeft: '1.5rem',
      }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h1 style={{
            fontSize: '3rem',
            fontWeight: 'bold',
            fontFamily: "'Space Grotesk', sans-serif"
          }}>
            <GlitchText text="CONTACT" />
          </h1>
          <p style={{
            color: '#00FFFF',
            fontFamily: "'Fira Code', monospace",
            marginTop: '1rem'
          }}>// Let's build something incredible together</p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 2fr',
          gap: '3rem'
        }}>
          {/* Contact Info */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {[
              { icon: <Mail size={24} />, label: 'Email', value: 'kartikeys2007@gmail.com', link: 'mailto:kartikeys2007@gmail.com' },
              { icon: <Phone size={24} />, label: 'Phone', value: '+91 96196 70584', link: 'tel:+919619670584' },
              { icon: <MapPin size={24} />, label: 'Location', value: 'Mumbai, India', link: null },
              { icon: <Linkedin size={24} />, label: 'LinkedIn', value: 'kartikey-singh-198bc3', link: 'https://linkedin.com/in/kartikey-singh-198bc3' }
            ].map((item, i) => (
              <div key={i} style={{
                backgroundColor: 'rgba(10, 10, 10, 0.4)',
                border: '1px solid rgba(0, 255, 255, 0.3)',
                borderRadius: '0.5rem',
                padding: '1.5rem',
                boxShadow: '0 0 15px rgba(0, 255, 65, 0.2), inset 0 0 15px rgba(0, 255, 65, 0.1)',
                transition: 'all 0.3s'
              }}>
                <div style={{ color: '#00FF41', marginBottom: '0.75rem' }}>{item.icon}</div>
                <p style={{ color: '#9ca3af', fontSize: '0.875rem', marginBottom: '0.25rem' }}>{item.label}</p>
                {item.link ? (
                  <a href={item.link} target="_blank" rel="noopener noreferrer" style={{
                    color: '#00FFFF',
                    fontFamily: "'Fira Code', monospace",
                    textDecoration: 'none',
                    transition: 'color 0.3s'
                  }}>
                    {item.value}
                  </a>
                ) : (
                  <p style={{
                    color: '#00FFFF',
                    fontFamily: "'Fira Code', monospace"
                  }}>
                    {item.value}
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* Contact Form */}
          <div style={{
            backgroundColor: 'rgba(10, 10, 10, 0.4)',
            border: '1px solid rgba(0, 255, 255, 0.3)',
            borderRadius: '0.5rem',
            padding: '2rem',
            boxShadow: '0 0 15px rgba(0, 255, 65, 0.2), inset 0 0 15px rgba(0, 255, 65, 0.1)'
          }}>
            {submitted ? (
              <div style={{ textAlign: 'center', paddingTop: '3rem', paddingBottom: '3rem' }}>
                <div style={{
                  fontSize: '3.5rem',
                  color: '#00FF41',
                  textShadow: '0 0 10px rgba(0, 255, 65, 0.5)',
                  marginBottom: '1rem'
                }}>✓</div>
                <p style={{
                  fontSize: '1.5rem',
                  fontWeight: 'bold',
                  fontFamily: "'Space Grotesk', sans-serif",
                  color: '#00FF41',
                  textShadow: '0 0 10px rgba(0, 255, 65, 0.5)',
                  marginBottom: '1rem'
                }}>
                  [ MESSAGE TRANSMITTED THROUGH THE VOID ✓ ]
                </p>
                <p style={{
                  color: '#9ca3af',
                  fontFamily: "'Fira Code', monospace"
                }}>Thanks for reaching out. I'll get back to you soon.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div>
                  <label style={{
                    display: 'block',
                    color: '#00FFFF',
                    fontFamily: "'Fira Code', monospace",
                    fontSize: '0.875rem',
                    marginBottom: '0.5rem'
                  }}>Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    style={{
                      width: '100%',
                      backgroundColor: 'rgba(10, 10, 10, 0.6)',
                      border: '1px solid rgba(0, 255, 255, 0.3)',
                      borderRadius: '0.5rem',
                      padding: '0.75rem 1rem',
                      color: '#d1d5db',
                      fontFamily: "'Fira Code', monospace",
                      fontSize: '1rem',
                      transition: 'all 0.3s',
                      outline: 'none'
                    }}
                    placeholder="$ whoami"
                    onFocus={(e) => e.target.style.borderColor = '#00FF41'}
                    onBlur={(e) => e.target.style.borderColor = 'rgba(0, 255, 255, 0.3)'}
                  />
                </div>

                <div>
                  <label style={{
                    display: 'block',
                    color: '#00FFFF',
                    fontFamily: "'Fira Code', monospace",
                    fontSize: '0.875rem',
                    marginBottom: '0.5rem'
                  }}>Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    style={{
                      width: '100%',
                      backgroundColor: 'rgba(10, 10, 10, 0.6)',
                      border: '1px solid rgba(0, 255, 255, 0.3)',
                      borderRadius: '0.5rem',
                      padding: '0.75rem 1rem',
                      color: '#d1d5db',
                      fontFamily: "'Fira Code', monospace",
                      fontSize: '1rem',
                      transition: 'all 0.3s',
                      outline: 'none'
                    }}
                    placeholder="your@email.com"
                    onFocus={(e) => e.target.style.borderColor = '#00FF41'}
                    onBlur={(e) => e.target.style.borderColor = 'rgba(0, 255, 255, 0.3)'}
                  />
                </div>

                <div>
                  <label style={{
                    display: 'block',
                    color: '#00FFFF',
                    fontFamily: "'Fira Code', monospace",
                    fontSize: '0.875rem',
                    marginBottom: '0.5rem'
                  }}>Message</label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    rows="5"
                    style={{
                      width: '100%',
                      backgroundColor: 'rgba(10, 10, 10, 0.6)',
                      border: '1px solid rgba(0, 255, 255, 0.3)',
                      borderRadius: '0.5rem',
                      padding: '0.75rem 1rem',
                      color: '#d1d5db',
                      fontFamily: "'Fira Code', monospace",
                      fontSize: '1rem',
                      transition: 'all 0.3s',
                      outline: 'none',
                      resize: 'none'
                    }}
                    placeholder="Your message here..."
                    onFocus={(e) => e.target.style.borderColor = '#00FF41'}
                    onBlur={(e) => e.target.style.borderColor = 'rgba(0, 255, 255, 0.3)'}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  style={{
                    width: '100%',
                    padding: '0.75rem 1.5rem',
                    background: 'linear-gradient(to right, #00FF41, #00FFFF)',
                    color: '#000000',
                    fontWeight: 'bold',
                    borderRadius: '0.5rem',
                    border: 'none',
                    cursor: isSubmitting ? 'not-allowed' : 'pointer',
                    fontSize: '1rem',
                    fontFamily: "'Space Grotesk', sans-serif",
                    boxShadow: '0 0 15px rgba(0, 255, 65, 0.3)',
                    transition: 'all 0.3s',
                    opacity: isSubmitting ? 0.5 : 1
                  }}
                >
                  {isSubmitting ? 'Transmitting...' : 'Send Message'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

// ============================================================================
// MAIN APP
// ============================================================================

export default function PortfolioApp() {
  const [currentPage, setCurrentPage] = useState('Home');

  const renderPage = () => {
    switch (currentPage) {
      case 'Home':
        return <HomePage />;
      case 'About':
        return <AboutPage />;
      case 'Resume':
        return <ResumePage />;
      case 'Projects':
        return <ProjectsPage />;
      case 'Contact':
        return <ContactPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div style={{
      width: '100%',
      minHeight: '100vh',
      backgroundColor: '#000000',
      color: '#ffffff',
      overflowX: 'hidden'
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;600;700&family=Fira+Code:wght@400;500&display=swap');
        
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        html, body {
          font-family: 'Fira Code', monospace;
          background: #0A0A0A;
          color: #ffffff;
          overflow-x: hidden;
        }
        
        ::selection {
          background: rgba(0, 255, 65, 0.3);
          color: #00FF41;
        }
        
        ::-webkit-scrollbar {
          width: 8px;
        }
        
        ::-webkit-scrollbar-track {
          background: #0A0A0A;
        }
        
        ::-webkit-scrollbar-thumb {
          background: #00FF41;
          border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: #00FFFF;
        }
        
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
      `}</style>

      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      {renderPage()}
    </div>
  );
}
