import React, { useState, useEffect, useRef } from 'react';
import './src/invite.css';

const YT_VIDEO_ID = '8hnd8595E2k';
const TARGET_DATE = new Date('2026-09-14T09:00:00');

export default function GaneshFestivalInvite() {
  // State management
  const [doorOpened, setDoorOpened] = useState(false);
  const [doorHide, setDoorHide] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Audio / YouTube Controls
  const [ytSrc, setYtSrc] = useState('');
  const [ytPaused, setYtPaused] = useState(false);
  const [ytMuted, setYtMuted] = useState(false);
  const ytPlayerRef = useRef(null);

  // Countdown State
  const [countdown, setCountdown] = useState({
    days: '--',
    hours: '--',
    minutes: '--',
    seconds: '--',
  });

  // Petals
  const [petals, setPetals] = useState([]);

  // Lightbox & Interactivity
  const [lightbox, setLightbox] = useState({ open: false, caption: '' });
  const [copyStatus, setCopyStatus] = useState('🔗 Copy Link');
  const [videoCardNotices, setVideoCardNotices] = useState({});

  // Toggle Body Lock when door screen is overlayed
  useEffect(() => {
    if (!doorOpened) {
      document.documentElement.classList.add('locked');
    } else {
      document.documentElement.classList.remove('locked');
    }
  }, [doorOpened]);

  // Floating Petals Generator
  useEffect(() => {
    const petalEmojis = ['🌼', '🌸', '🧡'];
    const count = window.innerWidth < 600 ? 10 : 20;
    const generatedPetals = Array.from({ length: count }, (_, i) => ({
      id: i,
      emoji: petalEmojis[i % petalEmojis.length],
      left: Math.random() * 100 + '%',
      duration: 8 + Math.random() * 10 + 's',
      delay: Math.random() * 10 + 's',
      fontSize: 0.9 + Math.random() * 0.9 + 'rem',
    }));
    setPetals(generatedPetals);
  }, []);

  // Countdown Timer
  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      let diff = TARGET_DATE - now;
      if (diff < 0) diff = 0;
      const d = Math.floor(diff / (1000 * 60 * 60 * 24));
      const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const m = Math.floor((diff / (1000 * 60)) % 60);
      const s = Math.floor((diff / 1000) % 60);
      setCountdown({ days: d, hours: h, minutes: m, seconds: s });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  // Scroll Reveal Observer for Timeline
  useEffect(() => {
    const items = document.querySelectorAll('.t-item');
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
          }
        });
      },
      { threshold: 0.2 }
    );
    items.forEach((item) => revealObserver.observe(item));

    return () => revealObserver.disconnect();
  }, []);

  // YouTube API command dispatcher
  const ytCommand = (func) => {
    if (ytPlayerRef.current && ytPlayerRef.current.contentWindow) {
      ytPlayerRef.current.contentWindow.postMessage(
        JSON.stringify({ event: 'command', func: func, args: [] }),
        '*'
      );
    }
  };

  // Open Door Action
  const handleOpenDoor = () => {
    if (doorOpened) return;
    setDoorOpened(true);
    setYtSrc(
      `https://www.youtube.com/embed/${YT_VIDEO_ID}?autoplay=1&loop=1&playlist=${YT_VIDEO_ID}&enablejsapi=1&controls=0`
    );
    setTimeout(() => {
      setDoorHide(true);
    }, 1150);
  };

  const handlePlayPause = () => {
    const nextState = !ytPaused;
    setYtPaused(nextState);
    ytCommand(nextState ? 'pauseVideo' : 'playVideo');
  };

  const handleMuteToggle = () => {
    const nextMute = !ytMuted;
    setYtMuted(nextMute);
    ytCommand(nextMute ? 'mute' : 'unMute');
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopyStatus('✅ कॉपी झाले');
      setTimeout(() => setCopyStatus('🔗 Copy Link'), 1800);
    });
  };

  const handleVideoCardClick = (index) => {
    setVideoCardNotices((prev) => ({
      ...prev,
      [index]: 'व्हिडिओ लवकरच जोडला जाईल',
    }));
  };

  return (
    <div>
      {/* ================= ENTRY DOOR ================= */}
      <div
        id="entryScreen"
        className={`${doorOpened ? 'open' : ''} ${doorHide ? 'hide' : ''}`}
      >
        <div className="entry-rangoli"></div>

        <div className="default-content">
          <div
            className="door-scene"
            id="doorScene"
            role="button"
            tabIndex={0}
            aria-label="दार उघडण्यासाठी टॅप करा"
            onClick={handleOpenDoor}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleOpenDoor();
              }
            }}
          >
            <div className="temple-frame"></div>
            <div className="side-pillar left"></div>
            <div className="side-pillar right"></div>
            <div className="toran">
              <span>🌿</span><span>🌼</span><span>🌿</span><span>🌼</span>
              <span>🌿</span><span>🌼</span><span>🌿</span><span>🌼</span><span>🌿</span>
            </div>
            <div className="door-medallion">🐘</div>
            <span className="side-diya left">🪔</span>
            <span className="side-diya right">🪔</span>
            <div className="door-well">
              <div className="door-panel left">
                <div className="stud-row top"></div>
                <div className="panel-carving">
                  <div className="inner-panel"></div>
                  <span className="corner tl">❁</span>
                  <span className="corner tr">❁</span>
                  <span className="corner bl">❁</span>
                  <span className="corner br">❁</span>
                  <span className="center-motif">🪷</span>
                </div>
                <div className="handle"></div>
                <div className="stud-row bottom"></div>
              </div>
              <div className="door-panel right">
                <div className="stud-row top"></div>
                <div className="panel-carving">
                  <div className="inner-panel"></div>
                  <span className="corner tl">❁</span>
                  <span className="corner tr">❁</span>
                  <span className="corner bl">❁</span>
                  <span className="corner br">❁</span>
                  <span className="center-motif">🪷</span>
                </div>
                <div className="handle"></div>
                <div className="stud-row bottom"></div>
              </div>
            </div>
            <div className="door-plaque">
              <h1>गणपती बाप्पा मोरया</h1>
              <p className="entry-group">॥ शिवतेज ग्रुप, नरसेवाडी ॥</p>
            </div>
          </div>
        </div>
      </div>

      {/* Background YouTube Audio Player */}
      <div
        id="ytPlayerWrap"
        style={{
          position: 'fixed',
          width: '1px',
          height: '1px',
          overflow: 'hidden',
          opacity: 0,
          pointerEvents: 'none',
        }}
      >
        <iframe
          ref={ytPlayerRef}
          id="ytPlayer"
          width="1"
          height="1"
          src={ytSrc}
          title="Ganpati song"
          frameBorder="0"
          allow="autoplay; encrypted-media"
        ></iframe>
      </div>

      {/* Music Control Overlay */}
      <div id="musicControls" className={doorOpened ? 'show' : ''}>
        <button id="playPauseBtn" title="गाणं सुरू/थांबवा" onClick={handlePlayPause}>
          {ytPaused ? '▶️' : '⏸️'}
        </button>
        <button id="muteBtn" title="आवाज बंद/चालू करा" onClick={handleMuteToggle}>
          {ytMuted ? '🔇' : '🔊'}
          {!ytPaused && (
            <span className="music-indicator" id="eq">
              <span></span>
              <span></span>
              <span></span>
            </span>
          )}
        </button>
      </div>

      <div className="garland-strip"></div>

      {/* ================= HERO ================= */}
      <header className="hero" id="hero">
        <div className="rangoli-bg"></div>
        <div id="petals">
          {petals.map((p) => (
            <span
              key={p.id}
              className="petal"
              style={{
                left: p.left,
                animationDuration: p.duration,
                animationDelay: p.delay,
                fontSize: p.fontSize,
              }}
            >
              {p.emoji}
            </span>
          ))}
        </div>
        <div className="group-logo">🐘</div>
        <h1 className="display">गणेशोत्सव २०२६</h1>
        <p className="subhead">शिवतेज ग्रुप, नरसेवाडी यांच्यातर्फे सप्रेम आमंत्रण</p>
        <div className="meta-line">
          <span>📅 भाद्रपद शुद्ध चतुर्थी (१४ सप्टेंबर २०२६)</span>
          <span>🕘 सकाळी ९:०० वा.</span>
          <span>📍 नरसेवाडी</span>
        </div>

        <div className="countdown" id="countdown">
          <div className="cd-box">
            <div className="cd-num" id="cd-days">{countdown.days}</div>
            <div className="cd-label">दिवस</div>
          </div>
          <div className="cd-box">
            <div className="cd-num" id="cd-hours">{countdown.hours}</div>
            <div className="cd-label">तास</div>
          </div>
          <div className="cd-box">
            <div className="cd-num" id="cd-mins">{countdown.minutes}</div>
            <div className="cd-label">मिनिटे</div>
          </div>
          <div className="cd-box">
            <div className="cd-num" id="cd-secs">{countdown.seconds}</div>
            <div className="cd-label">सेकंद</div>
          </div>
        </div>

        <a href="#event" className="cta-btn">
          कार्यक्रमाची माहिती पहा
        </a>
      </header>

      {/* ================= EVENT DETAILS ================= */}
      <section id="event">
        <div className="section-title">
          <div className="eyebrow">संपूर्ण माहिती</div>
          <h2>कार्यक्रम तपशील</h2>
          <div className="rule"></div>
        </div>
        <div className="single-event-wrap">
          <div className="single-event-card">
            <div className="sec-header">
              <div className="sec-icon">🕉️</div>
              <h3>गणेशोत्सव २०२६</h3>
              <span className="sec-badge">सार्वजनिक गणेशोत्सव</span>
            </div>
            
            <p className="sec-desc">
              श्री गणेशाच्या आगमनापासून विसर्जनापर्यंतचा भक्तिभावपूर्ण सोहळा, सांस्कृतिक कार्यक्रमांसह.
            </p>

            <div className="sec-grid">
              <div className="sec-item">
                <span className="sec-label">👤 आयोजक</span>
                <span className="sec-val">शिवतेज ग्रुप, नरसेवाडी</span>
              </div>

              <div className="sec-item">
                <span className="sec-label">📅 दिनांक</span>
                <span className="sec-val">१४ सप्टेंबर २०२६</span>
              </div>

              <div className="sec-item">
                <span className="sec-label">⏰ वेळ</span>
                <span className="sec-val">सकाळी ९:०० — रात्री ९:०० वा.</span>
              </div>

              <div className="sec-item">
                <span className="sec-label">📞 संपर्क</span>
                <span className="sec-val">7385726593</span>
              </div>

              <div className="sec-item">
                <span className="sec-label">👗 वेशभूषा</span>
                <span className="sec-val">पारंपरिक / सोयीस्कर पेहराव</span>
              </div>

              <div className="sec-item">
                <span className="sec-label">📢 विशेष सूचना</span>
                <span className="sec-val">कृपया वेळेवर उपस्थित रहा, पार्किंग सुविधा उपलब्ध आहे.</span>
              </div>
            </div>

            <div className="sec-footer">
              <span className="status-tag">✅ स्थिती: निश्चित (Confirmed)</span>
            </div>
          </div>
        </div>
      </section>

      {/* ================= SCHEDULE ================= */}
      <section id="schedule">
        <div className="section-title">
          <div className="eyebrow">पूजा व सांस्कृतिक कार्यक्रम</div>
          <h2>उत्सवाचे वेळापत्रक</h2>
          <div className="rule"></div>
        </div>
        <div className="timeline">
          <div className="t-item" id="sthapana">
            <span className="t-dot"></span>
            <div className="t-card">
              <div className="t-icon">🪔</div>
              <div className="t-day">दिवस १ · भाद्रपद शुद्ध चतुर्थी</div>
              <h3>श्री गणेश मूर्ती स्थापना</h3>
              <div className="t-datetime">दि. १४ सप्टेंबर, सकाळी ९:०० वा.</div>
              <p>
                शुभ मुहूर्तावर श्री गणेशमूर्तीची प्राणप्रतिष्ठा व स्थापना करून पूजा-आरतीने उत्सवाला प्रारंभ केला जाईल.
              </p>
              <div className="t-loc">📍 शिवतेज ग्रुप, नरसेवाडी</div>
            </div>
          </div>

          <div className="t-item" id="padyapujan">
            <span className="t-dot"></span>
            <div className="t-card">
              <div className="padya-anim">
                <svg viewBox="0 0 90 60">
                  <ellipse
                    className="ripple"
                    cx="45"
                    cy="46"
                    rx="16"
                    ry="5"
                    fill="none"
                    stroke="#7BB4D8"
                    strokeWidth="2"
                  />
                  <ellipse cx="45" cy="46" rx="14" ry="4.5" fill="#BFE3F5" />
                  <circle className="drop" cx="34" cy="24" r="2.3" fill="#7BB4D8" />
                  <circle className="drop" cx="34" cy="24" r="2.3" fill="#7BB4D8" />
                  <circle className="drop" cx="34" cy="24" r="2.3" fill="#7BB4D8" />
                  <g className="kalash">
                    <path
                      d="M14,14 Q10,10 16,8 L26,8 Q32,10 28,14 L27,20 Q27,26 21,26 Q15,26 15,20 Z"
                      fill="#D4A029"
                      stroke="#8A6A1E"
                      strokeWidth="1"
                    />
                    <rect x="18" y="6" width="6" height="4" fill="#D4A029" stroke="#8A6A1E" strokeWidth="1" />
                  </g>
                </svg>
              </div>
              <div className="t-icon">🪷</div>
              <div className="t-day">दिवस १ · मूर्ती स्थापनेनंतर</div>
              <h3>पाद्य पूजन</h3>
              <div className="t-datetime">दि. १४ सप्टेंबर, सकाळी ९:३० वा.</div>
              <p>
                षोडशोपचार पूजेतील पहिला विधी — बाप्पांच्या चरणांवर पवित्र जलाभिषेक करून भावपूर्ण पाद्य पूजन केले जाईल.
              </p>
              <div className="t-loc">📍 शिवतेज ग्रुप, नरसेवाडी</div>
            </div>
          </div>

          <div className="t-item" id="aarti">
            <span className="t-dot"></span>
            <div className="t-card">
              <div className="t-icon">🔔</div>
              <div className="t-day">दिवस १ · रोज सकाळ-संध्याकाळ</div>
              <h3>आरती</h3>
              <div className="t-datetime">दररोज सकाळी ८:०० व सायं. ७:३० वा.</div>
              <p>
                ढोल-टाळांच्या गजरात रोज सकाळ-संध्याकाळ बाप्पांची भक्तिभावपूर्ण आरती केली जाईल. सर्वांनी सहभागी व्हावे.
              </p>
              <div className="t-loc">📍 शिवतेज ग्रुप, नरसेवाडी</div>
            </div>
          </div>

          <div className="t-item" id="rangoli">
            <span className="t-dot"></span>
            <div className="t-card">
              <div className="t-icon">🎨</div>
              <div className="t-day">दिवस ४ · सांस्कृतिक कार्यक्रम</div>
              <h3>रांगोळी स्पर्धा</h3>
              <div className="t-datetime">दि. १७ सप्टेंबर, सकाळी १०:०० वा.</div>
              <p>
                सर्व वयोगटांसाठी रंगीबेरंगी रांगोळी स्पर्धा! आपल्या कलागुणांचे दर्शन घडवा आणि आकर्षक बक्षिसे जिंका.
              </p>
              <div className="t-loc">📍 शिवतेज ग्रुप, नरसेवाडी</div>
            </div>
          </div>

          <div className="t-item" id="musicalchairs">
            <span className="t-dot"></span>
            <div className="t-card">
              <div className="t-icon">🎶</div>
              <div className="t-day">दिवस ५ · सांस्कृतिक कार्यक्रम</div>
              <h3>म्युझिकल चेअर्स</h3>
              <div className="t-datetime">दि. १८ सप्टेंबर, सायं. ६:०० वा.</div>
              <p>
                लहानांपासून मोठ्यांपर्यंत सर्वांसाठी धमाल म्युझिकल चेअर्स स्पर्धा! संगीत, हास्यविनोद आणि रोमांचक चुरस.
              </p>
              <div className="t-loc">📍 शिवतेज ग्रुप, नरसेवाडी</div>
            </div>
          </div>

          <div className="t-item" id="mahaprasad">
            <span className="t-dot"></span>
            <div className="t-card">
              <div className="t-icon">🍛</div>
              <div className="t-day">दिवस ६ · सामुदायिक भोजन</div>
              <h3>महाप्रसाद</h3>
              <div className="t-datetime">दि. १९ सप्टेंबर, दुपारी १२:३० वा.</div>
              <p>
                बाप्पांच्या नैवेद्यानंतर सर्व भाविकांसाठी महाप्रसादाचे आयोजन. सर्वांनी कुटुंबासह सहभागी व्हावे.
              </p>
              <div className="t-loc">📍 शिवतेज ग्रुप, नरसेवाडी</div>
            </div>
          </div>

          <div className="t-item" id="bhajan">
            <span className="t-dot"></span>
            <div className="t-card">
              <div className="t-icon">🎤</div>
              <div className="t-day">दिवस ७ · भक्तिसंध्या</div>
              <h3>भजन / कीर्तन</h3>
              <div className="t-datetime">दि. २० सप्टेंबर, सायं. ७:०० वा.</div>
              <p>
                भक्तिमय वातावरणात भजन व कीर्तनाचा कार्यक्रम. सुरेल भजनांनी मंडप दुमदुमून जाईल.
              </p>
              <div className="t-loc">📍 शिवतेज ग्रुप, नरसेवाडी</div>
            </div>
          </div>

          <div className="t-item" id="visarjan">
            <span className="t-dot"></span>
            <div className="t-card">
              <div className="t-icon">🐘</div>
              <div className="t-day">दिवस ११ · अनंत चतुर्दशी</div>
              <h3>श्री गणपती विसर्जन</h3>
              <div className="t-datetime">दि. २४ सप्टेंबर, सायं. ४:०० वा. मिरवणूक</div>
              <p>
                ढोल-ताशांच्या गजरात, "गणपती बाप्पा मोरया" च्या जयघोषात लाडक्या बाप्पांना निरोप दिला जाईल.
              </p>
              <div className="t-loc">📍 विसर्जन घाट, नरसेवाडी</div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= PUJA VIDEO ================= */}
      <section className="video-section" id="pujavideo">
        <div className="section-title on-dark" style={{ paddingTop: 0 }}>
          <div className="eyebrow">सत्यनारायण पूजा</div>
          <h2>पूजा विधी पहा</h2>
          <div className="rule"></div>
        </div>
        <div className="video-wrap">
          <iframe
            src=""
            title="Ganpati Padya Pujan Vidhi"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            loading="lazy"
          ></iframe>
        </div>
      </section>

      {/* ================= LOCATION ================= */}
      <section id="location">
        <div className="section-title">
          <div className="eyebrow">कुठे भेटूया</div>
          <h2>कार्यक्रम स्थळ</h2>
          <div className="rule"></div>
        </div>
        <div className="location-wrap">
          <div className="loc-card">
            <span className="loc-pin">📍</span>
            <h3>शिवतेज ग्रुप, नरसेवाडी</h3>
            <p>
              पत्ता: नरसेवाडी, महाराष्ट्र<br />
              खूणपत: [जवळील प्रसिद्ध ठिकाण]
            </p>
            <span className="distance-tag">अंदाजे अंतर: गावाच्या मध्यवर्ती भाग</span>
            <br />
            <a
              className="directions-btn"
              href="https://www.google.com/maps?q=17.2122433,74.6411697"
              target="_blank"
              rel="noopener noreferrer"
            >
              दिशादर्शन मिळवा →
            </a>
          </div>
          <div className="map-wrap">
            <iframe
              src="https://www.google.com/maps?q=17.2122433,74.6411697&z=15&output=embed"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="कार्यक्रम स्थळ नकाशा"
            ></iframe>
          </div>
        </div>
      </section>

      {/* ================= MANDAL ================= */}
      <section id="mandal">
        <div className="section-title">
          <div className="eyebrow">आमच्याविषयी</div>
          <h2>आमचे गणेश मंडळ</h2>
          <div className="rule"></div>
        </div>
        <div className="mandal-wrap">
          <div className="mandal-frame">🐘</div>
          <h2>शिवतेज ग्रुप, नरसेवाडी</h2>
          <p>
            अनेक वर्षांपासून भक्तिभावाने व एकोप्याने गणेशोत्सव साजरा करणारा आमचा युवा गट. सामाजिक बांधिलकी, सांस्कृतिक कार्यक्रम आणि परंपरेची जपणूक हेच आमचे ध्येय.
          </p>
          <div className="mandal-meta">
            <span>👥 सदस्य: ५०+</span>
          </div>
          <div className="social-row">
            <a href="#" title="Instagram">📸</a>
            <a href="#" title="Facebook">📘</a>
            <a href="#" title="WhatsApp">💬</a>
          </div>
        </div>
      </section>

      {/* ================= MEMBERS ================= */}
      <section id="members">
        <div className="section-title">
          <div className="eyebrow">कार्यकारिणी</div>
          <h2>मंडळाचे सदस्य</h2>
          <div className="rule"></div>
        </div>
        <div className="members-grid">
          {[
            { initial: 'अ', role: 'अध्यक्ष', desc: 'मंडळाचे नेतृत्व व संपूर्ण नियोजन सांभाळतात.' },
            { initial: 'स', role: 'सचिव', desc: 'प्रशासकीय कामकाज व संवाद पाहतात.' },
            { initial: 'ख', role: 'खजिनदार', desc: 'आर्थिक व्यवहार व निधी व्यवस्थापन पाहतात.' },
            { initial: 'क', role: 'कार्यक्रम समन्वयक', desc: 'सर्व कार्यक्रमांचे नियोजन व अंमलबजावणी.' },
            { initial: 'सां', role: 'सांस्कृतिक समन्वयक', desc: 'सांस्कृतिक कार्यक्रम व स्पर्धांचे आयोजन.' },
            { initial: 'स्व', role: 'स्वयंसेवक', desc: 'उत्सवाच्या प्रत्येक टप्प्यात सहकार्य करतात.' },
          ].map((m, idx) => (
            <div key={idx} className="member-card" tabIndex={0}>
              <div className="member-avatar">{m.initial}</div>
              <h4>शिवतेज सदस्य</h4>
              <div className="m-role">{m.role}</div>
              <div className="m-desc">{m.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= GALLERY ================= */}
      <section id="gallery">
        <div className="section-title">
          <div className="eyebrow">आठवणी</div>
          <h2>फोटो गॅलरी</h2>
          <div className="rule"></div>
        </div>
        <div className="gallery-grid" id="galleryGrid">
          {[
            'मागील उत्सव',
            'सजावट',
            'आरती',
            'मंडळ सदस्य',
            'सांस्कृतिक कार्यक्रम',
            'विसर्जन मिरवणूक',
          ].map((cap, idx) => (
            <div
              key={idx}
              className="gallery-item"
              onClick={() => setLightbox({ open: true, caption: cap })}
            >
              <div className="ph">
                🖼️<span style={{ fontSize: '0.7rem' }}>फोटो लवकरच</span>
              </div>
              <div className="cap">{cap}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Lightbox Modal */}
      <div
        id="lightbox"
        className={lightbox.open ? 'open' : ''}
        onClick={(e) => {
          if (e.target.id === 'lightbox') setLightbox({ open: false, caption: '' });
        }}
      >
        <button
          className="lb-close"
          id="lbClose"
          onClick={() => setLightbox({ open: false, caption: '' })}
        >
          ×
        </button>
        <div className="lb-box">
          <div style={{ fontSize: '2.4rem' }}>🖼️</div>
          <p id="lbCap" style={{ marginTop: '0.8rem' }}>
            {lightbox.caption} — फोटो लवकरच जोडले जातील
          </p>
        </div>
      </div>

      {/* ================= VIDEO GALLERY ================= */}
      <section id="videos">
        <div className="section-title">
          <div className="eyebrow">पाहा</div>
          <h2>व्हिडिओ गॅलरी</h2>
          <div className="rule"></div>
        </div>
        <div className="videos-grid">
          {['बाप्पा आगमन', 'आरती सोहळा', 'सांस्कृतिक कार्यक्रम', 'विसर्जन मिरवणूक'].map(
            (vcap, idx) => (
              <div
                key={idx}
                className="video-card"
                onClick={() => handleVideoCardClick(idx)}
              >
                <div className="vph">
                  <span className="play-btn">▶</span>
                </div>
                <div className="vcap">
                  {videoCardNotices[idx] || vcap}
                </div>
              </div>
            )
          )}
        </div>
      </section>

      {/* ================= INVITATION / SHARE ================= */}
      <section className="invite-section" id="invite">
        <div className="section-title" style={{ paddingTop: 0 }}>
          <div className="eyebrow">निमंत्रण शेअर करा</div>
          <h2>आमंत्रण पत्रिका</h2>
          <div className="rule"></div>
        </div>
        <div className="invite-card-share">
          <div className="ic-icon">🐘</div>
          <h3>गणेशोत्सव २०२६</h3>
          <div className="ic-meta">
            शिवतेज ग्रुप, नरसेवाडी<br />
            १४ सप्टेंबर २०२६ · 🕘 सकाळी ९:०० वा.<br />
            📍 शिवतेज ग्रुप, नरसेवाडी
          </div>
          <div className="qr-box">
            <img
              src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://www.google.com/maps?q=17.2122433,74.6411697"
              alt="QR Code"
            />
          </div>
          <div className="qr-caption">स्कॅन करून स्थळ पहा</div>
          <div className="share-row">
            <a
              className="share-wa"
              href="https://wa.me/?text=गणपती%20बाप्पा%20मोरया!%20शिवतेज%20ग्रुप%2C%20नरसेवाडी%20यांच्यातर्फे%20गणेशोत्सव%20२०२६%20निमंत्रण."
              target="_blank"
              rel="noopener noreferrer"
            >
              💬 WhatsApp
            </a>
            <a
              className="share-fb"
              href="https://www.facebook.com/sharer/sharer.php?u=https://www.google.com/maps?q=17.2122433,74.6411697"
              target="_blank"
              rel="noopener noreferrer"
            >
              📘 Facebook
            </a>
            <a
              className="share-ig"
              href="#"
              target="_blank"
              rel="noopener noreferrer"
            >
              📸 Instagram
            </a>
            <button className="share-copy" id="copyLinkBtn" onClick={handleCopyLink}>
              {copyStatus}
            </button>
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="footer" id="contact">
        <div className="f-logo">🐘</div>
        <h2>शिवतेज ग्रुप, नरसेवाडी</h2>
        <div className="f-year">गणेशोत्सव २०२६</div>
        <div className="details">
          पत्ता: <br />
          संपर्क: 7385726593<br />
          📍 नरसेवाडी, महाराष्ट्र
        </div>
        <div className="social-row">
          <a href="#" title="Instagram">📸</a>
          <a href="#" title="Facebook">📘</a>
          <a href="#" title="WhatsApp">💬</a>
        </div>
        <a className="rsvp-btn" href="tel:+917385726593">कळवा तुमची उपस्थिती</a>
        <div className="signoff">🙏 गणपती बाप्पा मोरया! 🙏</div>
        <div className="fine-print">Designed by ER. Rutuja Jadhav</div>
      </footer>
    </div>
  );
}