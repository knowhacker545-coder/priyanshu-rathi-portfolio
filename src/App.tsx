import { useEffect, useMemo, useState, useRef, type FormEvent, type ReactNode } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import {
  ArrowDownRight, ArrowUpRight, Cloud, Code2, Cpu, ExternalLink,
  Github, Globe2, Layers3, Linkedin, Mail, Menu, Network, Server,
  ShieldCheck, Sparkles, Terminal, X, Zap, Database, LockKeyhole,
  Bot, Workflow, Boxes, CheckCircle2, Activity, Trophy, Copy, Volume2, VolumeX, FileText, Eye, Unlock, Radar, Gauge
} from 'lucide-react'

const EMAIL = 'officialpriyanshurathi@gmail.com'
const LINKEDIN = 'https://www.linkedin.com/'
const GITHUB = 'https://github.com/'
const GITHUB_USERNAME = '' // Add your GitHub username here to enable live GitHub activity.

type Project = {
  no: string
  name: string
  description: string
  tags: string[]
  tone: string
  github: string
  demo?: string
  architecture: string[]
  problem: string
  result: string
}

const projects: Project[] = [
  {
    no: '01',
    name: 'CForge',
    description: 'Browser-based C development environment built around a focused editor, compiler workflow and developer-first experience.',
    tags: ['React', 'TypeScript', 'Vite', 'WebAssembly'],
    tone: 'compiler',
    github: 'https://github.com/search?q=CForge&type=repositories',
    demo: '#cforge-demo',
    architecture: ['Monaco Editor', 'WebAssembly', 'Compiler', 'Runtime'],
    problem: 'How can C development feel immediate when the compiler lives in the browser?',
    result: 'A browser-first development concept focused on fast feedback, diagnostics and a clean coding workflow.',
  },
  {
    no: '02',
    name: 'CloudVault',
    description: 'A secure cloud-focused digital storage concept exploring clean interfaces, organization and security-minded product thinking.',
    tags: ['Cloud', 'Security', 'UI', 'Architecture'],
    tone: 'vault',
    github: 'https://github.com/search?q=CloudVault&type=repositories',
    architecture: ['Client', 'API', 'Storage', 'Security'],
    problem: 'How can cloud storage communicate trust, organization and security without becoming complicated?',
    result: 'A security-minded storage experience concept with a clear system model and calm interface.',
  },
  {
    no: '03',
    name: 'Avenix AI',
    description: 'An experimental AI-powered assistant exploring useful automation, conversational interfaces and intelligent digital tools.',
    tags: ['AI APIs', 'JavaScript', 'Automation', 'Product'],
    tone: 'ai',
    github: 'https://github.com/search?q=Avenix+AI&type=repositories',
    architecture: ['User', 'Prompt Layer', 'AI API', 'Response'],
    problem: 'How can an AI assistant become a useful tool instead of just a chat screen?',
    result: 'An experimental assistant direction centered on practical workflows and intelligent interactions.',
  },
  {
    no: '04',
    name: 'Minecraft / Server Lab',
    description: 'Automation, server systems, bots and experimental development built to learn by shipping real working systems.',
    tags: ['Java', 'Servers', 'Automation', 'Linux'],
    tone: 'server',
    github: 'https://github.com/search?q=Minecraft+server+automation&type=repositories',
    architecture: ['Server', 'Bot Manager', 'Automation', 'Monitoring'],
    problem: 'How can repetitive server operations be turned into reliable automated workflows?',
    result: 'A hands-on lab for understanding server operations, automation and system behaviour.',
  },
]

const toolkit = [
  ['Languages', 'C · C++ · JavaScript · TypeScript · Python', Code2],
  ['Web', 'HTML · CSS · React · Vite · Node.js · Express', Globe2],
  ['Cloud / Infra', 'AWS · Docker · Git · GitHub · Linux', Cloud],
  ['Cybersecurity', 'Networking · Web Security · Linux · Fundamentals', ShieldCheck],
  ['AI', 'AI APIs · Automation · AI-powered applications', Cpu],
]

const exploring = [
  ['01', 'CLOUD', 'Learning how scalable systems are designed and deployed.', Cloud],
  ['02', 'CYBERSECURITY', 'Understanding networks, security principles and secure applications.', ShieldCheck],
  ['03', 'AI', 'Experimenting with AI-powered tools and intelligent applications.', Sparkles],
  ['04', 'SOFTWARE ENGINEERING', 'Improving programming, architecture and real-world development skills.', Terminal],
]

const navItems = ['home', 'nexus-3d', 'lab-3d', 'about', 'toolkit', 'projects', 'exploring', 'journey', 'contact']

// Framer Motion expects cubic-bezier easing as a fixed 4-number tuple.
// Keeping this typed prevents TypeScript from widening it to number[].
const CUBIC_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

function App() {
  const [loaded, setLoaded] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [active, setActive] = useState('home')
  const [recruiterMode, setRecruiterMode] = useState(false)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [terminalOpen, setTerminalOpen] = useState(false)
  const [overrideMode, setOverrideMode] = useState(false)
  const reduced = useReducedMotion()
  const [scrollProgress, setScrollProgress] = useState(0)
  const [cursor, setCursor] = useState({ x: -100, y: -100 })
  const [cursorActive, setCursorActive] = useState(false)
  const [aiOpen, setAiOpen] = useState(false)
  const [resumeOpen, setResumeOpen] = useState(false)
  const [soundOn, setSoundOn] = useState(false)
  const [xp, setXp] = useState(0)
  const [unlocked, setUnlocked] = useState<string[]>([])
  const [secretSequence, setSecretSequence] = useState<string[]>([])

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      setScrollProgress(max > 0 ? window.scrollY / max : 0)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const move = (e: MouseEvent) => setCursor({ x: e.clientX, y: e.clientY })
    const over = () => setCursorActive(true)
    const out = () => setCursorActive(false)
    window.addEventListener('mousemove', move)
    window.addEventListener('mouseover', over)
    window.addEventListener('mouseout', out)
    return () => { window.removeEventListener('mousemove', move); window.removeEventListener('mouseover', over); window.removeEventListener('mouseout', out) }
  }, [])

  useEffect(() => {
    const timer = window.setTimeout(() => setLoaded(true), 1050)
    return () => window.clearTimeout(timer)
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setTerminalOpen((v) => !v)
      }
      const key = e.key.toLowerCase()
      setSecretSequence((prev) => [...prev, key].slice(-10))
      if (e.key === 'Escape') {
        setTerminalOpen(false)
        setSelectedProject(null)
        setAiOpen(false)
        setResumeOpen(false)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    if (secretSequence.join(' ') === 'arrowup arrowup arrowdown arrowdown arrowleft arrowright arrowleft arrowright') {
      setOverrideMode(true)
      setUnlocked((u) => u.includes('KONAMI CORE') ? u : [...u, 'KONAMI CORE'])
      setXp((v) => v + 250)
      setSecretSequence([])
    }
  }, [secretSequence])

  useEffect(() => {
    const timer = window.setInterval(() => setXp((v) => Math.min(1000, v + 1)), 4000)
    return () => window.clearInterval(timer)
  }, [])

  useEffect(() => {
    const sections = navItems.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[]
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (visible[0]) setActive(visible[0].target.id)
      },
      { rootMargin: '-28% 0px -60% 0px', threshold: [0.05, 0.25, 0.5] },
    )
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  const motionProps = useMemo(() => ({
    initial: reduced ? false : { opacity: 0, y: 28 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-80px' },
    transition: { duration: 0.7, ease: CUBIC_EASE },
  }), [reduced])

  return (
    <>
      <div className={`loader ${loaded ? 'loader--done' : ''}`} aria-hidden="true">
        <div className="loader__core">
          <div className="loader__mark">PR<span>/</span>26</div>
          <div className="loader__track"><span /></div>
          <div className="loader__lines">
            <span>INITIALIZING SYSTEM...</span>
            <span>LOADING PORTFOLIO...</span>
            <span>ESTABLISHING CONNECTION...</span>
            <strong>100%</strong>
          </div>
        </div>
      </div>

      <div className="site-shell">
        <div className="noise" />
        <div className="grid" />
        <div className="cursor-orb" style={{ left: cursor.x, top: cursor.y, opacity: cursorActive ? 1 : 0 }} />
        <div className="scroll-rail"><span style={{ transform: `scaleY(${scrollProgress})` }} /></div>
        <div className="scroll-progress" style={{ transform: `scaleX(${scrollProgress})` }} />
        {!reduced && <ParticleField />}
        <div className="corner-hud"><span>REC // PR-26</span><span>SCROLL {Math.round(scrollProgress * 100)}%</span></div>

        <header className="nav">
          <a href="#home" className="brand" aria-label="Priyanshu Rathi home">
            <span className="brand__sig">PR</span>
            <span><b>PRIYANSHU RATHI</b><small>DEV / CLOUD / CYBER</small></span>
          </a>

          <nav className={`nav__links ${menuOpen ? 'nav__links--open' : ''}`} aria-label="Primary navigation">
            {navItems.map((id) => (
              <a key={id} className={active === id ? 'is-active' : ''} href={`#${id}`} onClick={() => setMenuOpen(false)}><SignalText>{id}</SignalText></a>
            ))}
          </nav>

          <div className="nav__tools">
            <button className={`mode-toggle ${recruiterMode ? 'is-on' : ''}`} onClick={() => setRecruiterMode(!recruiterMode)}>
              {recruiterMode ? 'RECRUITER MODE' : 'COMMAND MODE'}
            </button>
            <button className="hud-tool" onClick={() => setSoundOn(v => !v)} aria-label="Toggle interface sound">{soundOn ? <Volume2 size={14}/> : <VolumeX size={14}/>}</button>
            <button className="hud-tool" onClick={() => setResumeOpen(true)} aria-label="Open resume viewer"><FileText size={14}/></button>
            <a className="nav__status" href="#contact"><i /> <SignalText>OPEN TO BUILD</SignalText></a>
          </div>

          <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation">
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </header>

        <main className={recruiterMode ? 'recruiter-mode' : ''}>
          <div className="ambient-orbs" aria-hidden="true"><i/><i/><i/></div>
          {recruiterMode && <RecruiterStrip />}
      <XPHud xp={xp} unlocked={unlocked} />
      <button className="ai-launcher" onClick={() => setAiOpen(true)}><Bot size={16}/> ASK PRIYANSHU AI</button>
          <section id="home" className="hero section">
            <div className="hero__meta"><span>IND / 29.1°N / 77.7°E</span><span>SYS.ID PR-2026</span></div>

            <div className="hero__copy">
              <motion.div {...motionProps} className="eyebrow"><span className="eyebrow__dot" /> HELLO, I'M PRIYANSHU RATHI</motion.div>
              <motion.h1 className="hero-title" initial={reduced ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: .5, delay: .15 }}>
                {['BUILDING', 'DIGITAL SYSTEMS', 'FOR THE NEXT', 'GENERATION.'].map((line, i) => (
                  <motion.span key={line} className={i === 1 ? 'hero-title__accent' : i === 3 ? 'hero__outline' : ''} initial={reduced ? false : { y: 34, opacity: 0, filter: 'blur(8px)' }} animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }} transition={{ duration: .75, delay: .22 + i * .11, ease: CUBIC_EASE }}>
                    {line}
                  </motion.span>
                ))}
              </motion.h1>
              <motion.p {...motionProps} transition={{ ...motionProps.transition, delay: 0.16 }}>
                I’m a developer focused on cloud technology, cybersecurity and intelligent digital products. I enjoy turning ambitious ideas into functional experiences.
              </motion.p>
              <RoleRotator />
              <motion.div {...motionProps} transition={{ ...motionProps.transition, delay: 0.24 }} className="hero__actions">
                <a className="button button--primary magnetic" href="#projects">EXPLORE MY WORK <ArrowDownRight size={17} /></a>
                <a className="button button--ghost magnetic" href="#contact">CONNECT WITH ME <ArrowUpRight size={17} /></a>
              </motion.div>
              <motion.div {...motionProps} transition={{ ...motionProps.transition, delay: 0.32 }} className="hero__availability">
                <span className="pulse" /> <SignalText>AVAILABLE FOR CREATIVE PROJECTS</SignalText>
              </motion.div>
            </div>

            <CommandVisual />
            <div className="hero__scroll"><span>SCROLL TO EXPLORE</span><div /></div>
          </section>

          <section id="nexus-3d" className="section mega-3d-section">
            <div className="section-index">01.5 / 3D NEXUS</div>
            <motion.div {...motionProps} className="section-heading">
              <span className="kicker">INTERACTIVE SYSTEM WORLD / 20 MODULES</span>
              <KineticHeading first={<>ENTER THE</>} second="NEXUS" />
            </motion.div>
            <Mega3DWorld />
          </section>

          <section id="lab-3d" className="section more-3d-section">
            <div className="section-index">01.7 / 3D LAB</div>
            <motion.div {...motionProps} className="section-heading">
              <span className="kicker">20 MORE INTERACTIVE SYSTEMS / 3D EXPERIMENTS</span>
              <KineticHeading first={<>BUILD THE</>} second="FUTURE" />
            </motion.div>
            <More3DLab />
          </section>

          <section id="about" className="section section--split">
            <div className="section-index">01 / IDENTITY</div>
            <motion.div {...motionProps} className="section-title">
              <span className="kicker">THE HUMAN LAYER</span>
              <KineticHeading first={<>BEHIND</>} second="THE CODE" />
            </motion.div>
            <motion.div {...motionProps} className="about-copy">
              <p className="lead">I’m currently studying <strong>BCA with Cloud Computing</strong> and using college as a launchpad to explore what happens when code meets infrastructure, security and AI.</p>
              <p>I learn by building. Some projects are polished experiments, some are messy labs, but every one gives me a better mental model of how real digital systems work.</p>
              <div className="about-facts">
                <span><b>FOCUS</b> Cloud · Cybersecurity · AI</span>
                <span><b>MODE</b> Learn → Build → Break → Improve</span>
                <span><b>GOAL</b> Strong software / cloud / security professional</span>
              </div>
            </motion.div>
          </section>

          <section id="toolkit" className="section">
            <div className="section-index">02 / TOOLKIT</div>
            <motion.div {...motionProps} className="section-heading">
              <span className="kicker">THE STACK I’M EXPLORING</span><KineticHeading first={<>MY DIGITAL</>} second="TOOLKIT" />
            </motion.div>
            <SkillOrbit />
            <div className="stack-marquee" aria-hidden="true"><span>CLOUD • CYBERSECURITY • AI • DEVELOPMENT • SYSTEMS • DEPLOY • AUTOMATE • BUILD • </span><span>CLOUD • CYBERSECURITY • AI • DEVELOPMENT • SYSTEMS • DEPLOY • AUTOMATE • BUILD • </span></div>
            <div className="toolkit-grid">
              {toolkit.map(([title, items, Icon], i) => (
                <motion.article key={String(title)} {...motionProps} transition={{ ...motionProps.transition, delay: i * 0.06 }} className="tool-card">
                  <div className="tool-card__top"><span>0{i + 1}</span><Icon size={21} /></div>
                  <h3><DecodeText text={String(title)} /></h3><p>{String(items)}</p>
                  <div className="tool-card__signal"><i /><i /><i /><span>ACTIVE / LEARNING</span></div>
                </motion.article>
              ))}
            </div>
          </section>

          <section className="section systems-dashboard">
            <div className="section-index">02.5 / LIVE CORE</div>
            <motion.div {...motionProps} className="section-heading"><span className="kicker">RECRUITER SIGNAL / SYSTEM TELEMETRY</span><KineticHeading first={<>LIVE</>} second="DASHBOARD" /></motion.div>
            <SystemDashboard xp={xp} unlocked={unlocked} onUnlock={(name) => { setUnlocked(u => u.includes(name) ? u : [...u, name]); setXp(v => Math.min(1000, v + 50)) }} />
          </section>

          <section id="projects" className="section projects-section">
            <div className="section-index">03 / BUILDS</div>
            <motion.div {...motionProps} className="section-heading section-heading--projects">
              <div><span className="kicker">SELECTED EXPERIMENTS</span><KineticHeading first={<>THINGS I’VE</>} second="BUILT" /></div>
              <div className="project-count"><Counter end={4} label="SYSTEMS / 2026" /></div>
            </motion.div>
            <div className="project-stack">
              {projects.map((project, i) => <ProjectCard key={project.name} project={project} index={i} motionProps={motionProps} onOpen={() => setSelectedProject(project)} />)}
            </div>
          </section>

          <section id="cforge-demo" className="section lab-section">
            <div className="section-index">03.5 / LIVE LAB</div>
            <motion.div {...motionProps} className="section-heading">
              <span className="kicker">INTERACTIVE PROJECT WINDOW</span><h2>CFORGE <em>PLAYGROUND</em></h2>
            </motion.div>
            <CForgeDemo />
          </section>

          <section className="section architecture-section">
            <div className="section-index">03.7 / SYSTEM MAP</div>
            <motion.div {...motionProps} className="section-heading">
              <span className="kicker">FROM IDEA TO INFRASTRUCTURE</span><h2>CLOUD <em>ARCHITECTURE</em></h2>
            </motion.div>
            <ArchitectureMap />
          </section>

          <section className="section lab-section security-lab">
            <div className="section-index">03.8 / SECURITY LAB</div>
            <motion.div {...motionProps} className="section-heading">
              <span className="kicker">LEARNING BY INVESTIGATING</span><h2>SECURITY <em>LAB</em></h2>
            </motion.div>
            <SecurityLab />
          </section>

          <section className="section lab-section ai-lab">
            <div className="section-index">03.9 / AI LAB</div>
            <motion.div {...motionProps} className="section-heading">
              <span className="kicker">EXPERIMENTAL INTERFACE</span><h2>AVENIX <em>AI</em></h2>
            </motion.div>
            <AvenixDemo />
          </section>

          <section className="section lab-section minecraft-lab">
            <div className="section-index">04.0 / SERVER LAB</div>
            <motion.div {...motionProps} className="section-heading">
              <span className="kicker">ENGINEERING THROUGH EXPERIMENTS</span><KineticHeading first={<>MINECRAFT</>} second="SYSTEM LAB" />
            </motion.div>
            <ServerLab />
          </section>

          <section className="section digital-lab">
            <div className="section-index">04.1 / EXPERIMENTS</div>
            <motion.div {...motionProps} className="section-heading">
              <span className="kicker">DIGITAL LAB</span><KineticHeading first={<>SMALL BUILDS.</>} second="REAL LEARNING." />
            </motion.div>
            <DigitalLab />
          </section>

          <section className="section github-section">
            <div className="section-index">04.2 / OPEN SOURCE SIGNAL</div>
            <motion.div {...motionProps} className="section-heading">
              <span className="kicker">PUBLIC BUILD ACTIVITY</span><KineticHeading first={<>GITHUB</>} second="SIGNAL" />
            </motion.div>
            <GitHubActivity />
          </section>

          <section className="section intelligence-section">
            <div className="section-index">04.3 / INTELLIGENCE</div>
            <motion.div {...motionProps} className="section-heading"><span className="kicker">SIGNALS OVER CLAIMS</span><KineticHeading first={<>SKILL</>} second="INTELLIGENCE" /></motion.div>
            <div className="intelligence-grid"><SkillRadar/><ContributionHeatmap/></div>
          </section>

          <section id="exploring" className="section exploring">
            <div className="section-index">05 / NOW</div>
            <motion.div {...motionProps} className="section-heading">
              <span className="kicker">NO FAKE METRICS — JUST DIRECTION</span><KineticHeading first={<>CURRENTLY</>} second="EXPLORING" />
            </motion.div>
            <div className="explore-list">
              {exploring.map(([no, title, desc, Icon]) => (
                <motion.div {...motionProps} key={String(no)} className="explore-row">
                  <span className="explore-row__no">{String(no)}</span><Icon size={22}/><h3><DecodeText text={String(title)} /></h3><p>{String(desc)}</p>
                  <span className="explore-row__line" /><ArrowUpRight size={17}/>
                </motion.div>
              ))}
            </div>
          </section>

          <section id="journey" className="section journey">
            <div className="section-index">06 / TRAJECTORY</div>
            <motion.div {...motionProps} className="section-heading">
              <span className="kicker">A MOVING TARGET</span><KineticHeading first={<>THE ROAD</>} second="SO FAR" />
            </motion.div>
            <div className="timeline"><div className="timeline-progress" />
              {[
                ['2025', 'Learning programming fundamentals'],
                ['2026', 'Started BCA + Cloud Computing'],
                ['2026', 'Building real projects'],
                ['2026+', 'Deepening Cloud + Cybersecurity + AI'],
                ['FUTURE', 'Become a professional developer and build large-scale systems'],
              ].map(([year, text], i) => (
                <motion.div {...motionProps} transition={{ ...motionProps.transition, delay: i * 0.08 }} className="timeline-item" key={year + text}>
                  <span>{year}</span><div className="timeline-node" /><p>{text}</p>
                </motion.div>
              ))}
            </div>
          </section>

          <section id="contact" className="section contact">
            <div className="section-index">07 / UPLINK</div>
            <motion.div {...motionProps} className="contact__intro">
              <span className="kicker">CHANNEL OPEN</span><KineticHeading first={<>LET’S BUILD</>} second="SOMETHING." />
              <p>Have an interesting idea, project or collaboration in mind?</p>
              <div className="contact-signal"><i /> CHANNEL READY <span>///</span> RESPONSE WINDOW: OPEN</div>
              <div className="contact__links">
                <a href={GITHUB} target="_blank" rel="noreferrer"><Github size={17}/> GITHUB <ExternalLink size={13}/></a>
                <a href={LINKEDIN} target="_blank" rel="noreferrer"><Linkedin size={17}/> LINKEDIN <ExternalLink size={13}/></a>
                <a href={`mailto:${EMAIL}`}><Mail size={17}/> EMAIL ME <ExternalLink size={13}/></a>
              </div>
            </motion.div>

            <ContactForm />
          </section>
        </main>

        <footer className="footer">
          <button className="system-trigger" onClick={() => setOverrideMode((v) => !v)} aria-label="Toggle system override">
            SYSTEM // PR-2026
          </button>
          <div><b>PRIYANSHU RATHI</b><span>— Developer & Technology Explorer</span></div>
          <div className="footer__links"><a href={GITHUB} target="_blank" rel="noreferrer">GitHub</a><a href={LINKEDIN} target="_blank" rel="noreferrer">LinkedIn</a><a href={`mailto:${EMAIL}`}>Email</a></div>
          <span>Built with curiosity, code & caffeine.</span>
        </footer>
      </div>

      {selectedProject && <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />}
      {terminalOpen && <TerminalOverlay onClose={() => setTerminalOpen(false)} />}
      {aiOpen && <PortfolioAI onClose={() => setAiOpen(false)} />}
      {resumeOpen && <ResumeViewer onClose={() => setResumeOpen(false)} />}
      {overrideMode && <OverrideOverlay onClose={() => setOverrideMode(false)} />}
    </>
  )
}

function XPHud({ xp, unlocked }: { xp: number; unlocked: string[] }) {
  return <div className="xp-hud"><span><Trophy size={12}/> XP {xp.toString().padStart(3,'0')}</span><b>{unlocked.length} UNLOCKED</b></div>
}

function SystemDashboard({ xp, unlocked, onUnlock }: { xp: number; unlocked: string[]; onUnlock: (name: string) => void }) {
  const stats = [['UPTIME','99.9%'],['LATENCY','24ms'],['PROJECTS','04'],['FOCUS','CLOUD']]
  return <div className="system-dashboard"><div className="telemetry-grid">{stats.map(([a,b],i)=><div key={a}><span>{a}</span><b>{b}</b><i style={{'--meter': `${55+i*9}%`} as React.CSSProperties}/></div>)}</div><div className="dashboard-core"><div className="core-radar"><Radar size={44}/><span>CORE LINK</span><b>ONLINE</b></div><div className="signal-feed"><p><Activity size={13}/> NETWORK // STABLE</p><p><Cloud size={13}/> CLOUD // SYNCED</p><p><ShieldCheck size={13}/> CYBER // MONITORING</p><p><Bot size={13}/> AI // READY</p></div><div className="achievement-grid">{['SYSTEM BUILDER','CLOUD EXPLORER','AI EXPERIMENTER','SECURITY LEARNER'].map((a,i)=><button key={a} className={unlocked.includes(a)?'unlocked':''} onClick={()=>onUnlock(a)}><Trophy size={14}/><span>{a}</span><small>{unlocked.includes(a)?'UNLOCKED':'+50 XP'}</small></button>)}</div></div><div className="xp-bar"><span>EXPLORATION PROGRESS</span><b>{Math.min(100,Math.round(xp/10))}%</b><i><em style={{width:`${Math.min(100,xp/10)}%`}}/></i></div></div>
}

function SkillRadar() {
  const skills = [['CLOUD',82],['CYBER',72],['AI',66],['WEB',86],['SYSTEMS',70],['LINUX',68]]
  return <article className="skill-radar"><div className="radar-visual"><div className="radar-ring r1"/><div className="radar-ring r2"/><div className="radar-ring r3"/><div className="radar-sweep"/><div className="radar-center"/></div><div className="radar-list">{skills.map(([name,val])=><div key={String(name)}><span>{String(name)}</span><i><em style={{width:`${val}%`}}/></i><b>{String(val)}</b></div>)}</div></article>
}

function ContributionHeatmap() {
  const cells = Array.from({length: 84}, (_,i) => (i*17)%5)
  return <article className="heatmap-card"><div className="heatmap-head"><span>BUILD ACTIVITY</span><b>84 SIGNAL BLOCKS</b></div><div className="heatmap">{cells.map((v,i)=><i key={i} data-level={v}/>)}</div><div className="heatmap-foot"><span>LESS</span><i/><i/><i/><i/><span>MORE</span></div><p>Visual activity concept — no fake GitHub contribution data.</p></article>
}

function PortfolioAI({ onClose }: { onClose: () => void }) {
  const [q,setQ]=useState('What does Priyanshu build?')
  const [answer,setAnswer]=useState('Ask about projects, skills, cloud, cybersecurity, AI, or contact.')
  const ask=()=>{const p=q.toLowerCase(); if(p.includes('project')||p.includes('build')) setAnswer('Priyanshu builds experimental systems such as CForge, CloudVault, Avenix AI and Minecraft/server automation labs.'); else if(p.includes('skill')) setAnswer('Core areas: cloud computing, cybersecurity fundamentals, web development, Python/JavaScript/TypeScript, Linux and AI-powered applications.'); else if(p.includes('cloud')) setAnswer('Cloud is a major focus: architecture, deployment concepts, infrastructure thinking and scalable systems.'); else if(p.includes('contact')) setAnswer(`Best route: ${EMAIL}`); else if(p.includes('cyber')) setAnswer('Cybersecurity learning focuses on networks, Linux, web security principles and defensive system thinking.'); else if(p.includes('ai')) setAnswer('AI work explores assistants, automation and useful intelligent product interfaces.'); else setAnswer('Try: projects / skills / cloud / cyber / ai / contact.')}
  return <div className="ai-overlay" onMouseDown={e=>e.target===e.currentTarget&&onClose()}><motion.div className="portfolio-ai" initial={{opacity:0,y:25,scale:.97}} animate={{opacity:1,y:0,scale:1}}><button className="modal-close" onClick={onClose}><X/></button><span className="kicker">LOCAL KNOWLEDGE INTERFACE</span><h2>ASK <em>PRIYANSHU</em></h2><div className="ai-answer"><Bot size={18}/><p>{answer}</p></div><div className="ai-query"><input value={q} onChange={e=>setQ(e.target.value)} onKeyDown={e=>e.key==='Enter'&&ask()}/><button className="button button--primary" onClick={ask}>QUERY <ArrowUpRight size={15}/></button></div><small>Showcase AI — local responses, no external model pretending to be live.</small></motion.div></div>
}

function ResumeViewer({ onClose }: { onClose: () => void }) {
  return <div className="resume-overlay" onMouseDown={e=>e.target===e.currentTarget&&onClose()}><motion.div className="resume-window" initial={{opacity:0,scale:.96}} animate={{opacity:1,scale:1}}><button className="modal-close" onClick={onClose}><X/></button><span className="kicker">PROFILE / RECRUITER VIEW</span><h2>PRIYANSHU <em>RATHI</em></h2><div className="resume-grid"><div><span>EDUCATION</span><b>BCA — Cloud Computing</b></div><div><span>FOCUS</span><b>Cloud · Cybersecurity · AI</b></div><div><span>PROJECTS</span><b>CForge · CloudVault · Avenix AI · Server Lab</b></div><div><span>STACK</span><b>React · TypeScript · Python · JavaScript · Linux · AWS</b></div></div><a className="button button--primary" href={`mailto:${EMAIL}?subject=Resume%20request`}>REQUEST / CONNECT <Mail size={15}/></a></motion.div></div>
}

function DecodeText({ text }: { text: string }) {
  const [display, setDisplay] = useState(text)
  const glyphs = '01X#@%&*+=<>/\\[]{}'
  useEffect(() => {
    let frame = 0
    const timer = window.setInterval(() => {
      const reveal = Math.min(text.length, Math.floor(frame / 2))
      setDisplay(text.split('').map((c, i) => i < reveal ? c : c === ' ' ? ' ' : glyphs[Math.floor(Math.random() * glyphs.length)]).join(''))
      frame++
      if (reveal >= text.length) window.clearInterval(timer)
    }, 45)
    return () => window.clearInterval(timer)
  }, [text])
  return <span className="decode-text">{display}</span>
}

function RoleRotator() {
  const roles = ['CLOUD DEVELOPER', 'CYBERSECURITY EXPLORER', 'AI BUILDER', 'SOFTWARE ENGINEER']
  const [index, setIndex] = useState(0)
  useEffect(() => { const id = window.setInterval(() => setIndex(v => (v + 1) % roles.length), 2600); return () => window.clearInterval(id) }, [])
  return <div className="role-rotator"><span className="role-rotator__prefix">ROLE //</span><span key={roles[index]} className="role-rotator__value">{roles[index]}</span><i /></div>
}

function Counter({ end, label }: { end: number; label: string }) {
  const [value, setValue] = useState(0)
  const ref = useRef<HTMLDivElement | null>(null)
  useEffect(() => {
    const node = ref.current
    if (!node) return
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      let start = 0
      const id = window.setInterval(() => { start += 1; setValue(Math.min(start, end)); if (start >= end) window.clearInterval(id) }, 90)
      observer.disconnect()
    }, { threshold: .6 })
    observer.observe(node)
    return () => observer.disconnect()
  }, [end])
  return <div ref={ref} className="counter"><b>{String(value).padStart(2, '0')}+</b><span>{label}</span></div>
}

function SkillOrbit() {
  const skills = ['CLOUD', 'AWS', 'LINUX', 'REACT', 'PYTHON', 'SECURITY']
  return <div className="skill-orbit" aria-label="Orbiting technology skills"><div className="skill-orbit__core"><Cloud size={20}/><span>STACK</span></div>{skills.map((skill, i) => <span key={skill} className="skill-orbit__node" style={{ '--orbit-i': i } as React.CSSProperties}>{skill}</span>)}</div>
}

function KineticHeading({ first, second }: { first: ReactNode; second: string }) {
  const chars = second.split('')
  return (
    <h2 className="kinetic-heading">
      <span className="kinetic-heading__first">{first}</span>
      <span className="kinetic-heading__second" aria-label={second}>
        {chars.map((char, i) => <span key={`${char}-${i}`} style={{ '--char': i } as React.CSSProperties}>{char === ' ' ? '\u00a0' : char}</span>)}
      </span>
      <i className="heading-scan" aria-hidden="true" />
    </h2>
  )
}

function SignalText({ children }: { children: string }) {
  return <span className="signal-text" data-text={children}>{children}</span>
}

function ParticleField() {
  const particles = Array.from({ length: 42 }, (_, i) => i)
  return <div className="particle-field" aria-hidden="true">
    {particles.map((i) => <i key={i} style={{ '--i': i, '--x': `${(i * 37) % 100}%`, '--y': `${(i * 17) % 100}%`, '--d': `${6 + (i % 8)}s`, '--delay': `${-(i % 10)}s` } as React.CSSProperties} />)}
  </div>
}

function RecruiterStrip() {
  return (
    <div className="recruiter-strip">
      <span><CheckCircle2 size={15}/> RECRUITER VIEW ACTIVE</span>
      <b>BCA CLOUD COMPUTING · CLOUD · CYBERSECURITY · AI · SOFTWARE DEVELOPMENT</b>
      <a href={`mailto:${EMAIL}`}>CONTACT <ArrowUpRight size={14}/></a>
    </div>
  )
}

function CommandVisual() {
  const [activeNode, setActiveNode] = useState('CORE')
  const [pointer, setPointer] = useState({ x: 0, y: 0 })
  const nodeInfo: Record<string, string> = {
    NET: 'NETWORK / FOUNDATIONS',
    SYS: 'SYSTEMS / INFRASTRUCTURE',
    SEC: 'SECURITY / DEFENSIVE THINKING',
    AI: 'AI / INTELLIGENT TOOLS',
    CORE: 'PRIYANSHU / BUILDING',
  }
  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    setPointer({ x: ((e.clientX - r.left) / r.width - .5) * 18, y: ((e.clientY - r.top) / r.height - .5) * 18 })
  }
  return (
    <motion.div className="command-visual" onMouseMove={onMove} onMouseLeave={() => setPointer({x:0,y:0})}
      initial={{ opacity: 0, scale: .92 }} animate={{ opacity: 1, scale: 1, rotateX: pointer.y * -.08, rotateY: pointer.x * .08 }}
      transition={{ opacity: { delay: .35, duration: .8 }, scale: { delay: .35, duration: .8 }, rotateX: { duration: .25 }, rotateY: { duration: .25 } }}>
      <div className="command-visual__corner">NODE / 01</div><div className="command-visual__corner command-visual__corner--right">UPLINK / LIVE</div>
      <div className="scan-sweep" /><div className="orbit orbit--one"/><div className="orbit orbit--two"/><div className="orbit orbit--three"/><div className="core-glow"/>
      <motion.button className="core-photo" onClick={() => setActiveNode('CORE')} aria-label="Core profile" whileHover={{ scale: 1.04 }}>
        <img src="/priyanshu.png" alt="Priyanshu Rathi"/>
      </motion.button><div className="core-ring"/>
      {[
        ['NET', 'node--a', Network], ['SYS', 'node--b', Server], ['SEC', 'node--c', ShieldCheck], ['AI', 'node--d', Zap],
      ].map(([name, cls, Icon], i) => (
        <motion.button key={String(name)} className={`node ${String(cls)}`} onClick={() => setActiveNode(String(name))}
          whileHover={{ scale: 1.12, y: -4 }} animate={{ y: [0, i % 2 ? -5 : 5, 0] }} transition={{ duration: 3 + i * .35, repeat: Infinity, ease: 'easeInOut' }}>
          <Icon size={15}/><span>{String(name)}</span>
        </motion.button>
      ))}
      <svg className="connections" viewBox="0 0 520 520" aria-hidden="true">
        <path className="data-line" d="M70 125 L195 205 L260 260 L345 185 L448 125"/>
        <path className="data-line" d="M72 392 L190 320 L260 260 L360 337 L445 390"/>
        <path className="data-line" d="M90 260 L185 260 L260 260 L350 260 L430 260"/>
        <circle className="data-packet" r="4"><animateMotion dur="3.4s" repeatCount="indefinite" path="M90 260 L185 260 L260 260 L350 260 L430 260"/></circle>
        <circle className="data-packet" r="3"><animateMotion dur="4.2s" repeatCount="indefinite" path="M70 125 L195 205 L260 260 L345 185 L448 125"/></circle>
      </svg>
      <div className="readout readout--top"><span>CORE</span><b>PR-26</b></div>
      <div className="readout readout--bottom"><span>STATUS</span><b>{nodeInfo[activeNode]}</b></div>
      <div className="coordinate-readout">X:{String(Math.round(pointer.x + 50)).padStart(3,'0')} / Y:{String(Math.round(pointer.y + 50)).padStart(3,'0')}</div>
    </motion.div>
  )
}

function Mega3DWorld() {
  const [mode, setMode] = useState<'explore' | 'game'>('explore')
  const [scan, setScan] = useState(false)
  const [selected, setSelected] = useState(1)
  const [attacks, setAttacks] = useState(0)
  const modules = [
    ['01','CYBER UNIVERSE','orbiting digital space','universe'],
    ['02','AI BRAIN','reactive neural mesh','brain'],
    ['03','CLOUD CITY','floating infra nodes','city'],
    ['04','ATTACK SIM','defensive packet interception','attack'],
    ['05','HACKER HUD','command overlay mode','hud'],
    ['06','NET GLOBE','global server routes','globe'],
    ['07','WORMHOLE','depth page transition','wormhole'],
    ['08','CODE RAIN','floating source fragments','code'],
    ['09','AI ROBOT','portfolio assistant core','robot'],
    ['10','FIREWALL','threat barrier','firewall'],
    ['11','ENERGY CORE','reactor pulse engine','core'],
    ['12','DNA SKILLS','double helix stack','dna'],
    ['13','PROJECT VAULT','sealed build capsules','vault'],
    ['14','HOLO RESUME','recruiter document hologram','resume'],
    ['15','SATELLITES','orbital project nodes','satellite'],
    ['16','CYBER NETWORK','interactive system graph','network'],
    ['17','TIME MACHINE','scroll-driven timeline tunnel','time'],
    ['18','AI EYE','active threat scanner','eye'],
    ['19','DATA OCEAN','streaming information waves','ocean'],
    ['20','3D PORTFOLIO GAME','explore the world','game'],
  ]
  const selectedName = modules[selected - 1]?.[2] || ''
  return (
    <div className={`mega-world mega-world--${mode} ${scan ? 'is-scanning' : ''}`}>
      <div className="mega-world__topbar">
        <div><span className="status-dot"/> NEXUS CORE <b>ONLINE</b></div>
        <div className="mega-world__controls">
          <button className={mode === 'explore' ? 'is-active' : ''} onClick={() => setMode('explore')}>EXPLORE</button>
          <button className={mode === 'game' ? 'is-active' : ''} onClick={() => setMode('game')}>GAME MODE</button>
          <button onClick={() => setScan(v => !v)}>{scan ? 'STOP SCAN' : 'SCAN WORLD'}</button>
        </div>
      </div>
      <div className="mega-world__scene" onClick={() => setSelected(v => v >= 20 ? 1 : v + 1)}>
        <div className="mega-sky"/>
        <div className="mega-grid-floor"/>
        <div className="mega-sun"/>
        <div className="mega-globe"><span/><span/><span/><i/></div>
        <div className="mega-brain">{Array.from({length: 12}, (_,i) => <i key={i} style={{'--i':i} as React.CSSProperties}/>)}</div>
        <div className="mega-city">
          {Array.from({length: 9}, (_,i) => <i key={i} style={{'--i':i} as React.CSSProperties}><b/><b/><b/></i>)}
        </div>
        <div className="mega-firewall"><span/><span/><span/></div>
        <div className="mega-core"><i/><i/><i/><b>PR</b></div>
        <div className="mega-dna"><span/><span/><span/><span/><span/><span/></div>
        <div className="mega-eye"><i/><b/></div>
        <div className="mega-robot"><div className="robot-head"><i/><i/></div><div className="robot-body"><span/><span/></div></div>
        <div className="mega-vault"><span>PROJECT</span><b>VAULT</b><i/></div>
        <div className="mega-wormhole"><i/><i/><i/><i/></div>
        <div className="mega-ocean"><span/><span/><span/><span/><span/></div>
        <div className="mega-satellites">{[0,1,2,3].map(i => <i key={i} style={{'--i':i} as React.CSSProperties}/>)}</div>
        <div className="mega-packets">{Array.from({length: 16}, (_,i) => <i key={i} style={{'--i':i} as React.CSSProperties}/>)}</div>
        <div className="mega-code-lines">{['npm run deploy','const cloud = secure','firewall.block(threat)','git push origin main','await build()'].map((x,i)=><span key={i} style={{'--i':i} as React.CSSProperties}>{x}</span>)}</div>
        <div className="mega-hud"><span>SYS / PR-26</span><span>THREAT: {attacks ? 'INTERCEPTED' : 'LOW'}</span><span>MODULE: {String(selected).padStart(2,'0')}</span></div>
        <div className="mega-target"/>
        {mode === 'game' && <div className="game-prompt"><b>MISSION // EXPLORE THE NEXUS</b><span>CLICK THE WORLD TO JUMP BETWEEN SYSTEMS</span><strong>MODULE {String(selected).padStart(2,'0')} / 20</strong></div>}
        <button className="attack-trigger" onClick={(e) => {e.stopPropagation(); setAttacks(v => v + 1)}}>SIMULATE ATTACK</button>
      </div>
      <div className="mega-world__modules">
        {modules.map(([no,title,desc,kind]) => (
          <button key={no} className={`mega-module ${selected === Number(no) ? 'is-selected' : ''}`} onClick={() => setSelected(Number(no))}>
            <span>{no}</span><b>{title}</b><small>{desc}</small><i className={`module-glyph module-glyph--${kind}`}/>
          </button>
        ))}
      </div>
      <div className="mega-world__readout"><span>SELECTED MODULE</span><b>{String(selected).padStart(2,'0')} / {modules[selected-1][1]}</b><p>{selectedName}. Hover modules, switch Game Mode, or run a defensive attack simulation.</p></div>
    </div>
  )
}

function ProjectCard({ project, index, motionProps, onOpen }: { project: Project; index: number; motionProps: object; onOpen: () => void }) {
  return (
    <motion.article {...motionProps} transition={{ ...((motionProps as any).transition), delay: index * 0.07 }} className={`project-card project-card--${project.tone}`}>
      <button className="project-card__visual" onClick={onOpen} aria-label={`Open ${project.name} case study`}>
        <div className="visual-grid"/><div className="project-boot"><span>INITIALIZING...</span><i/><span>MODULE ONLINE</span></div><span className="project-card__index">{project.no}</span>
        <div className="project-card__icon">{project.tone === 'compiler' && <Terminal/>}{project.tone === 'vault' && <Layers3/>}{project.tone === 'ai' && <Sparkles/>}{project.tone === 'server' && <Server/>}</div>
        <div className="visual-code"><span>{'>'} initializing.project()</span><span>{'>'} architecture = modular</span><span>{'>'} status = shipping</span></div>
      </button>
      <div className="project-card__body">
        <div className="project-card__title"><span>PROJECT {project.no}</span><h3>{project.name}</h3></div>
        <p>{project.description}</p><div className="tags">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
        <div className="project-card__links"><a href={project.github} target="_blank" rel="noreferrer"><Github size={15}/> SOURCE</a><button onClick={onOpen}>CASE STUDY <ArrowUpRight size={15}/></button></div>
      </div>
    </motion.article>
  )
}

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  return (
    <div className="modal-backdrop" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <motion.div className={`project-modal project-modal--${project.tone}`} initial={{ opacity: 0, y: 24, scale: .97 }} animate={{ opacity: 1, y: 0, scale: 1 }}>
        <button className="modal-close" onClick={onClose} aria-label="Close"><X/></button>
        <span className="kicker">PROJECT {project.no} / CASE STUDY</span><h2>{project.name}</h2>
        <p className="modal-lead">{project.problem}</p>
        <div className="modal-architecture">{project.architecture.map((item, i) => <div key={item}><span>0{i + 1}</span><b>{item}</b>{i < project.architecture.length - 1 && <ArrowDownRight size={15}/>}</div>)}</div>
        <div className="modal-result"><span>RESULT / LEARNING</span><p>{project.result}</p></div>
        <div className="tags">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
        <a className="button button--primary" href={project.github} target="_blank" rel="noreferrer">OPEN SOURCE <ExternalLink size={15}/></a>
      </motion.div>
    </div>
  )
}

function CForgeDemo() {
  const [code, setCode] = useState('#include <stdio.h>\n\nint main() {\n  printf("Hello from CForge!");\n  return 0;\n}')
  const [output, setOutput] = useState('')
  const run = () => {
    const match = code.match(/printf\(\s*"([^"]*)"/)
    setOutput(match ? match[1] : 'Program executed — browser demo only. No remote compiler is connected here.')
  }
  return (
    <div className="demo-window">
      <div className="demo-window__bar"><span><i/> CFORGE / BROWSER LAB</span><span>WEBASSEMBLY CONCEPT</span></div>
      <div className="code-editor">
        <div className="line-numbers">{code.split('\n').map((_, i) => <span key={i}>{i + 1}</span>)}</div>
        <textarea value={code} onChange={(e) => setCode(e.target.value)} spellCheck={false} aria-label="CForge code editor"/>
      </div>
      <div className="demo-window__actions"><button className="button button--primary" onClick={run}><Zap size={15}/> RUN CODE</button><span>LOCAL INTERACTION · NO SERVER REQUIRED</span></div>
      <div className="terminal-output"><span>OUTPUT /</span><strong>{output || 'Awaiting execution...'}</strong></div>
    </div>
  )
}

function ArchitectureMap() {
  const nodes = [
    ['01', 'USER', Network], ['02', 'CDN', Globe2], ['03', 'FRONTEND', Code2], ['04', 'API', Server], ['05', 'CLOUD SERVICES', Cloud], ['06', 'DATABASE', Database]
  ]
  return <div className="architecture-map">{nodes.map(([no, name, Icon], i) => <motion.div key={String(no)} className="architecture-node" whileHover={{ y: -6 }}><span>{String(no)}</span><Icon size={19}/><b>{String(name)}</b>{i < nodes.length - 1 && <ArrowDownRight className="architecture-arrow" size={18}/>}</motion.div>)}</div>
}

function SecurityLab() {
  const cards = [
    ['NETWORK', 'Protocols, traffic and system boundaries', Network],
    ['WEB SECURITY', 'Learning secure application principles', LockKeyhole],
    ['LINUX', 'Command-line and system fundamentals', Terminal],
    ['SECURITY FUNDAMENTALS', 'Threat awareness and defensive thinking', ShieldCheck],
  ]
  return <div className="security-grid">{cards.map(([title, desc, Icon]) => <article key={String(title)}><Icon size={20}/><span>LAB / {String(title)}</span><h3>{String(title)}</h3><p>{String(desc)}</p><i>LEARNING TRACK</i></article>)}</div>
}

function AvenixDemo() {
  const [prompt, setPrompt] = useState('Explain cloud computing in one line.')
  const [reply, setReply] = useState('Ask Avenix something. This local showcase does not pretend to be a live AI API.')
  const answer = () => {
    const p = prompt.toLowerCase()
    if (p.includes('cloud')) setReply('Cloud computing: on-demand access to computing resources over the internet, designed for flexible scale.')
    else if (p.includes('security')) setReply('Security starts with understanding systems, reducing unnecessary exposure and protecting data and access.')
    else if (p.includes('ai')) setReply('AI systems turn models and data into tools that can assist with reasoning, automation and generation.')
    else setReply('Avenix received your prompt — connect an AI API later when you want a live model.')
  }
  return <div className="ai-console"><div className="ai-console__chat"><div><span>YOU</span><p>{prompt}</p></div><div><span>AVENIX</span><p>{reply}</p></div></div><div className="ai-console__input"><input value={prompt} onChange={(e) => setPrompt(e.target.value)} /><button className="button button--primary" onClick={answer}>ASK AVENIX <ArrowUpRight size={15}/></button></div></div>
}

function ServerLab() {
  const steps = [['SERVER', Server], ['BOT MANAGER', Bot], ['AUTOMATION', Workflow], ['MONITORING', ShieldCheck]]
  return <div className="server-flow">{steps.map(([name, Icon], i) => <div key={String(name)}><span>0{i + 1}</span><Icon size={21}/><b>{String(name)}</b>{i < steps.length - 1 && <ArrowDownRight size={18}/>}</div>)}</div>
}

function DigitalLab() {
  const items = [
    ['WebAssembly Compiler', 'EXPERIMENTAL', Terminal],
    ['AI Assistant', 'ACTIVE', Bot],
    ['Cloud Storage Concept', 'EXPERIMENTAL', Cloud],
    ['Server Automation', 'LAB', Workflow],
    ['Security Experiments', 'LEARNING', ShieldCheck],
  ]
  return <div className="digital-lab__grid">{items.map(([name, status, Icon]) => <article key={String(name)}><Icon size={20}/><div><b>{String(name)}</b><span>● {String(status)}</span></div><ArrowUpRight size={16}/></article>)}</div>
}

function GitHubActivity() {
  const [data, setData] = useState<{ public_repos: number; followers: number; following: number } | null>(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    if (!GITHUB_USERNAME) return
    fetch(`https://api.github.com/users/${GITHUB_USERNAME}`)
      .then((r) => r.ok ? r.json() : Promise.reject(new Error('GitHub request failed')))
      .then(setData)
      .catch(() => setError(true))
  }, [])

  return (
    <div className="github-panel">
      {GITHUB_USERNAME && data ? <>
        <div><span>PUBLIC REPOS</span><b>{data.public_repos}</b></div><div><span>FOLLOWERS</span><b>{data.followers}</b></div><div><span>FOLLOWING</span><b>{data.following}</b></div>
        <a className="button button--ghost" href={`https://github.com/${GITHUB_USERNAME}`} target="_blank" rel="noreferrer">VIEW PROFILE <Github size={15}/></a>
      </> : <>
        <div className="github-panel__empty"><Github size={28}/><b>GITHUB PROFILE NOT LINKED YET</b><p>Add your GitHub username in <code>GITHUB_USERNAME</code> inside <code>src/App.tsx</code>. Until then, this panel shows no invented activity.</p></div>
        <a className="button button--ghost" href={GITHUB} target="_blank" rel="noreferrer">OPEN GITHUB <Github size={15}/></a>
        {error && <small>GitHub could not be reached right now.</small>}
      </>}
    </div>
  )
}

function TerminalOverlay({ onClose }: { onClose: () => void }) {
  const [command, setCommand] = useState('')
  const [lines, setLines] = useState<string[]>(['PR SYSTEM TERMINAL', 'Type: about, projects, cloud, cyber, contact, clear'])
  const inputRef = useRef<HTMLInputElement>(null)
  useEffect(() => inputRef.current?.focus(), [])
  const run = (e: FormEvent) => {
    e.preventDefault()
    const cmd = command.trim().toLowerCase()
    if (!cmd) return
    if (cmd === 'clear') setLines([])
    else if (cmd === 'about') { setLines((l) => [...l, '> about', 'BCA Cloud Computing student exploring cloud, cybersecurity, AI and software development.']); document.getElementById('about')?.scrollIntoView({behavior:'smooth'}); onClose() }
    else if (cmd === 'projects') { setLines((l) => [...l, '> projects', 'CForge / CloudVault / Avenix AI / Minecraft Server Lab']); document.getElementById('projects')?.scrollIntoView({behavior:'smooth'}); onClose() }
    else if (cmd === 'cloud') { setLines((l) => [...l, '> cloud', 'CDN → Frontend → API → Cloud Services → Database']); onClose() }
    else if (cmd === 'cyber') { setLines((l) => [...l, '> cyber', 'Learning networks, web security, Linux and security fundamentals.']); onClose() }
    else if (cmd === 'contact') { document.getElementById('contact')?.scrollIntoView({behavior:'smooth'}); onClose() }
    else setLines((l) => [...l, `> ${cmd}`, 'Unknown command. Try: about / projects / cloud / cyber / contact / clear'])
    setCommand('')
  }
  return <div className="terminal-overlay" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
    <motion.div className="terminal-window" initial={{opacity:0,y:20,scale:.98}} animate={{opacity:1,y:0,scale:1}}>
      <div className="terminal-window__bar"><span>PR@COMMAND-CENTER:~</span><button onClick={onClose}><X size={16}/></button></div>
      <div className="terminal-window__body">{lines.map((line,i)=><div key={`${line}-${i}`}>{line}</div>)}</div>
      <form onSubmit={run} className="terminal-window__form"><span>priyanshu@portfolio:~$</span><input ref={inputRef} value={command} onChange={e=>setCommand(e.target.value)} aria-label="Terminal command"/></form>
    </motion.div>
  </div>
}

function OverrideOverlay({ onClose }: { onClose: () => void }) {
  const systems = [['CORE','ONLINE'],['CLOUD','ACTIVE'],['CYBER','MONITORING'],['AI','READY'],['PROJECTS','04 SYSTEMS']]
  return <div className="override-overlay">
    <motion.div className="override-panel" initial={{opacity:0,scale:.92}} animate={{opacity:1,scale:1}}>
      <button className="modal-close" onClick={onClose}><X/></button>
      <span className="kicker">SYSTEM OVERRIDE</span><h2>ACCESS <em>GRANTED</em></h2>
      <div className="override-grid">{systems.map(([name,status],i)=><motion.div key={name} initial={{opacity:0,x:-20}} animate={{opacity:1,x:0}} transition={{delay:i*.08}}><span>{name}</span><b>● {status}</b></motion.div>)}</div>
      <p>Digital identity layer unlocked. Command mode restored.</p>
    </motion.div>
  </div>
}

function More3DLab() {
  const [active, setActive] = useState(0)
  const [launched, setLaunched] = useState(0)
  const items = [
    ['01','HOLOGRAM AVATAR','3D identity projection','avatar'],['02','RADAR SCANNER','sweeping system detection','radar'],['03','GLASS CUBES','floating glass command blocks','cubes'],['04','SKILL ENGINE','mechanical capability core','engine'],['05','ROCKET LAUNCH','career trajectory booster','rocket'],['06','PROJECT PLANETS','projects orbit as worlds','planets'],['07','DATA CORE','compressed information reactor','data'],['08','DNA → CODE','skills become executable ideas','transform'],['09','LIGHTNING CURSOR','energy trail follows interaction','lightning'],['10','GRAVITY WELL','depth-bending space effect','gravity'],['11','3D MIRROR UI','reflection-based interface','mirror'],['12','COMMS TOWER','holographic signal beacon','tower'],['13','DEV WORKSPACE','mini floating command desk','workspace'],['14','SERVER RACK','virtual infrastructure stack','rack'],['15','SKILL PUZZLE','systems lock into one grid','puzzle'],['16','CRYSTAL CORE','interactive knowledge crystal','crystal'],['17','WIREFRAME EARTH','global mesh visualization','earth'],['18','PARTICLE BLAST','click-triggered energy burst','blast'],['19','NAV COMPASS','3D navigation instrument','compass'],['20','EASTER EGG WORLD','hidden secret dimension','secret']
  ]
  return <div className="lab3d">
    <div className="lab3d__header"><div><span className="status-dot"/> 3D EXPERIMENT DECK <b>ONLINE</b></div><button onClick={() => setLaunched(v => v + 1)}>ACTIVATE ALL <Zap size={13}/></button></div>
    <div className="lab3d__hero">
      <div className="lab3d__scene" onClick={() => setActive(v => (v + 1) % items.length)}>
        <div className="lab3d__stars"/><div className="lab3d__rings"/><div className="lab3d__avatar"><div className="avatar-head"><i/><i/></div><div className="avatar-body"/></div>
        <div className="lab3d__radar"><i/><i/><i/></div><div className="lab3d__core"><span>{String(active + 1).padStart(2,'0')}</span></div>
        <div className="lab3d__orbit o1"/><div className="lab3d__orbit o2"/><div className="lab3d__rocket">▲</div>
        <div className="lab3d__data">BUILD / SHIP / SECURE<br/>CLOUD · AI · CYBER</div>
        <div className="lab3d__cursor"/><div className="lab3d__scanline"/>
        <div className="lab3d__hud"><span>LAB // 40X</span><b>ACTIVE {String(active + 1).padStart(2,'0')}</b><span>LAUNCHES {launched}</span></div>
      </div>
      <div className="lab3d__readout"><span>EXPERIMENT</span><b>{items[active][0]} / {items[active][1]}</b><p>{items[active][2]}. Click the scene or a module to rotate through the experiments.</p></div>
    </div>
    <div className="lab3d__grid">{items.map(([no,title,desc,kind], i) => <button key={no} className={`lab3d-card ${i === active ? 'is-active' : ''}`} onClick={() => setActive(i)}><span>{no}</span><div className={`lab-glyph lab-glyph--${kind}`}><i/><i/><i/></div><b>{title}</b><small>{desc}</small></button>)}</div>
  </div>
}

function ContactForm() {
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    const subject = `Project idea from ${String(data.get('name') || 'a visitor')}`
    const body = `Name: ${String(data.get('name') || '')}\nEmail: ${String(data.get('email') || '')}\n\n${String(data.get('message') || '')}`
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  }
  return <motion.form initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} className="contact-form" onSubmit={submit}>
    <label><span>01 / NAME</span><input required name="name" autoComplete="name" placeholder="Your name"/></label>
    <label><span>02 / EMAIL</span><input required type="email" name="email" autoComplete="email" placeholder="you@example.com"/></label>
    <label><span>03 / MESSAGE</span><textarea required name="message" rows={4} placeholder="Tell me what you’re thinking..."/></label>
    <button className="button button--primary" type="submit">SEND MESSAGE <ArrowUpRight size={17}/></button>
    <small>Direct email: {EMAIL}</small>
  </motion.form>
}

export default App
