import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, ArrowDown, MapPin, Globe, Plus, BriefcaseBusiness, GraduationCap, Plane, BookOpen, Pencil, FileText, Mail, Linkedin, TrendingUp, Target, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { navigation, linkedin, projects, education, skills, tools, certifications, impactStats } from '@/lib/portfolio-data';

const impactIcons = [TrendingUp, Target, Users, BriefcaseBusiness];

function SectionHeading({ number, label, title, accent, description }: { number: string; label: string; title: string; accent?: string; description?: string }) {
  return <div className="section-heading reveal"><div><span className="section-kicker">{number} / {label}</span><h2 className="section-title">{title}{accent && <><br /><em>{accent}</em></>}</h2></div>{description && <p className="section-description">{description}</p>}</div>;
}

export function Portfolio() {
  const [activeSection, setActiveSection] = useState('accueil');
  const progressRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let frame = 0;
    const update = () => {
      const distance = document.documentElement.scrollHeight - window.innerHeight;
      const progress = distance > 0 ? Math.min(1, Math.max(0, window.scrollY / distance)) : 0;
      if (progressRef.current) progressRef.current.style.transform = `scaleX(${progress})`;
      const sections = Array.from(document.querySelectorAll<HTMLElement>('main section[id]'));
      const current = sections.filter(section => section.getBoundingClientRect().top <= 160).at(-1);
      setActiveSection(current?.id ?? 'accueil');
      frame = 0;
    };
    const onScroll = () => { if (!frame) frame = window.requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); window.cancelAnimationFrame(frame); };
  }, []);
  useEffect(() => {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); } }), { threshold: 0.08 });
    document.querySelectorAll('.reveal').forEach(element => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return <>
    <header className="site-header"><div className="site-wrap header-inner">
      <a href="#accueil" className="wordmark" aria-label="Fiona Talbi, accueil">Fiona <span>Talbi.</span></a>
      <nav className="desktop-nav" aria-label="Navigation principale">{navigation.map(([label,id]) => <a key={id} className={`nav-link${activeSection === id ? ' active' : ''}`} aria-current={activeSection === id ? 'location' : undefined} href={`#${id}`}>{label}</a>)}<Button asChild variant="portfolio" size="sm"><a href="#contact">Contact <ArrowUpRight /></a></Button></nav>
    </div><div className="scroll-track" aria-hidden="true"><div className="scroll-progress" ref={progressRef} /></div></header>

    <main>
      <section id="accueil" className="hero">
        <div className="site-wrap hero-inner"><div className="hero-intro"><div className="eyebrow"><span className="status-dot" />Marketing 360 · Communication · Créativité</div>
          <h1>Fiona <span>Talbi.</span></h1><p className="hero-role">Marketing à 360°.<br /><span>Créativité & impact.</span></p>
          <p className="hero-copy">Plus de 3 ans d’expérience pour faire rayonner les marques, connecter les audiences et transformer les stratégies en impact.</p>
          <div className="hero-actions"><Button asChild variant="portfolio" size="lg"><a href="#projets">Découvrir mes projets <ArrowUpRight /></a></Button><Button asChild variant="portfolioOutline" size="lg"><a href="#contact">Me contacter <ArrowUpRight /></a></Button></div>
          <div className="hero-meta"><span><MapPin size={13} /> Paris, France</span><span><Globe size={13} /> Un parcours international</span></div>
        </div><div className="hero-kpis" aria-label="Mes résultats en chiffres">{impactStats.map((stat, index) => { const Icon = impactIcons[index]; return <div className={`impact-card impact-card-${index + 1}`} key={stat.label}>{Icon && <Icon size={22} strokeWidth={1.5} />}<strong className="impact-number">{stat.number}</strong><span className="impact-label">{stat.label}</span><span className="impact-company">{stat.company}</span></div>; })}</div></div>
      </section>
      <section className="career-strip"><div className="site-wrap career-inner"><div><span className="section-kicker">Parcours professionnel</span><h2>Des marques. Du terrain. De l’impact.</h2></div><div className="career-brands"><span>logitech.</span><span>CosmétiCar</span><span>Massilia</span></div></div></section>

      <section id="parcours" className="section site-wrap">
        <div className="about-grid"><div className="reveal"><span className="section-kicker">01 / Mon parcours</span><h2 className="section-title">La curiosité comme moteur.<br /><em>L’impact comme cap.</em></h2><div className="interest-list"><span><Plane size={15} />Voyage</span><span><BookOpen size={15} />Lecture</span><span><Pencil size={15} />Dessin</span></div></div><div className="about-copy reveal"><p>Je suis Fiona, une professionnelle du <strong>marketing 360 et de la communication</strong>, basée à Paris. J’aime comprendre les marques, imaginer des idées qui font sens et les concrétiser sur le terrain.</p><p>De la tech au luxe, en passant par les réseaux de franchises, mon parcours combine <strong>vision stratégique, créativité et coordination opérationnelle</strong>. Paris, Londres et Dublin ont nourri ma curiosité et mon ouverture internationale.</p></div></div>
        <div className="timeline-columns mt-14 reveal"><div><h3 className="timeline-heading"><BriefcaseBusiness size={18} />Expériences professionnelles</h3><div className="timeline-item"><span className="timeline-date">Logitech · France</span><h3>Marketing Manager Assistant</h3><p>Category management, trade marketing et coordination terrain. Déploiement des campagnes et accompagnement d’une équipe de merchandisers.</p></div><div className="timeline-item"><span className="timeline-date">CosmétiCar · France</span><h3>Chargée de communication</h3><p>Animation des réseaux sociaux et formation communication des franchisés.</p></div><div className="timeline-item"><span className="timeline-date">Massilia E-consulting</span><h3>Chargée de relations influenceurs</h3><p>Partenariats en France et en Espagne, coordination avec les fournisseurs internationaux.</p></div></div><div className="about-copy"><h3 className="timeline-heading"><Globe size={18} />Une vision à 360°</h3><p><strong>Relier la stratégie à l’exécution.</strong><br />Un rayon repensé, une campagne prête dès le premier jour, une communauté qui grandit : chaque projet commence par un objectif clair.</p><p><strong>Créer, coordonner, mesurer.</strong><br />Je m’appuie sur une approche transversale du marketing et de la communication pour donner de la cohérence aux marques et de la portée à leurs actions.</p></div></div>
      </section>

      <section id="projets" className="section project-section"><div className="site-wrap"><SectionHeading number="02" label="Mes projets" title="Des marques, des défis." accent="Et de vrais résultats." description="Quatre expériences où la stratégie rencontre le terrain, la création et la performance." />
        <div className="projects-grid">{projects.map((project,index) => <article className="project-card reveal" key={project.category}><div className="project-body"><div className="project-topline"><span className="project-index">0{index+1}</span><span className="art-tag">{project.category}</span></div><span className="project-brand">{project.brand}{project.brand === 'logitech' && '.'}</span><h3>{project.title}</h3><p>{project.context}</p><span className="mission-label">Mes missions</span><p>{project.mission}</p><details className="project-detail"><summary>Au cœur du projet <Plus size={15} /></summary><ul>{project.details.map(detail => <li key={detail}>{detail}</li>)}</ul></details></div><aside className="project-metrics" aria-label={`Résultats ${project.category}`}><span className="mission-label">Résultats</span>{project.metrics.map(([number,label]) => <div key={label}><strong>{number}</strong><span>{label}</span></div>)}<ArrowUpRight size={24} strokeWidth={1.2} /></aside></article>)}</div>
      </div></section>

      <section id="competences" className="section skills-section"><div className="site-wrap"><SectionHeading number="03" label="Compétences & outils" title="Une approche transversale." accent="Une boîte à outils créative." /><div className="skills-grid reveal">{skills.map(skill => <div className="skill-column" key={skill.title}><h3>{skill.title}</h3><ul>{skill.items.map(item => <li key={item}>{item}</li>)}</ul></div>)}</div><div className="tools reveal">{tools.map(tool => <span className="tool" key={tool}>{tool}</span>)}</div></div></section>

      <section id="formation" className="section site-wrap"><SectionHeading number="04" label="Formation" title="Apprendre ici." accent="Voir plus loin." description="Un double parcours en marketing digital et en marketing du luxe, nourri d’expériences internationales." /><div className="timeline-columns reveal">{[education.slice(0,2),education.slice(2)].map((group,index) => <div key={index}>{group.map(item => <div className="timeline-item" key={item.title}><span className="timeline-date">{item.date}</span><h3>{item.title}</h3><p className="font-semibold">{item.school}</p><p>{item.description}</p></div>)}</div>)}</div></section>

      <section id="certifications" className="section project-section"><div className="site-wrap"><SectionHeading number="05" label="Certifications" title="Toujours en mouvement." accent="Toujours en apprentissage." /><div className="cert-grid">{certifications.map(cert => <article className="cert-card reveal" key={cert.name}><span aria-label={cert.organization} className={`cert-logo ${cert.style}`}>{cert.mark === 'ETS' ? <GraduationCap size={23} /> : cert.mark}</span><div><h3>{cert.name}</h3><p>{cert.organization} · {cert.year}</p></div></article>)}</div><div className="languages reveal" id="langues"><h3>Sans frontières.</h3><div><p className="language-name">Français</p><p className="language-level">Langue maternelle</p></div><div><p className="language-name">Anglais</p><p className="language-level">TOEIC · 910 / 990</p></div><div><p className="language-name">Espagnol</p><p className="language-level">Niveau B2</p></div></div></div></section>

      <section id="recommandations" className="section recommendations"><div className="site-wrap"><SectionHeading number="06" label="Mes recommandations" title="La confiance se construit." description="Les regards de celles et ceux avec qui j’ai eu le plaisir de travailler." /><div className="reco-grid">{[1,2].map(number => <article className="reco-card reveal" key={number}><div className="document-icon"><FileText size={29} strokeWidth={1.2} /></div><div><h3>Lettre de recommandation 0{number}</h3><p>Document à venir</p><span className="reco-status">Bientôt disponible en PDF</span></div></article>)}</div></div></section>

      <section id="contact" className="section contact-section site-wrap"><div className="reveal"><span className="section-kicker">07 / Et si on échangeait ?</span><h2 className="section-title">Les belles idées<br />commencent par <em>un échange.</em></h2><p className="contact-copy">Un projet, une opportunité ou simplement l’envie de faire connaissance ? Je serai ravie de vous lire.</p><a href="mailto:fiona.2001@live.fr" className="contact-email">fiona.2001@live.fr</a><div className="contact-actions"><Button asChild variant="portfolio" size="lg"><a href="mailto:fiona.2001@live.fr"><Mail />Écrivez-moi <ArrowUpRight /></a></Button><Button asChild variant="portfolioOutline" size="lg"><a href={linkedin} target="_blank" rel="noreferrer"><Linkedin />LinkedIn <ArrowUpRight /></a></Button></div></div></section>
    </main>
    <footer className="site-footer"><div className="site-wrap footer-inner"><span>© 2026 Fiona Talbi · Marketing & Communication</span><span>Imaginé avec curiosité, à Paris.</span><a href="#accueil" aria-label="Retour en haut" className="flex items-center gap-2">Retour en haut <ArrowDown size={12} className="rotate-180" /></a></div></footer>
  </>;
}