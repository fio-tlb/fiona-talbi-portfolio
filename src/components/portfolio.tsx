import { useEffect, useState } from 'react';
import { ArrowUpRight, ArrowDown, MapPin, Globe, Menu, X, Plus, BriefcaseBusiness, GraduationCap, Plane, BookOpen, Pencil, FileText, Mail, Linkedin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { navigation, linkedin, projects, education, skills, tools, certifications } from '@/lib/portfolio-data';
import deskImage from '@/assets/creative-desk.jpg';

function SectionHeading({ number, label, title, accent, description }: { number: string; label: string; title: string; accent?: string; description?: string }) {
  return <div className="section-heading reveal"><div><span className="section-kicker">{number} / {label}</span><h2 className="section-title">{title}{accent && <><br /><em>{accent}</em></>}</h2></div>{description && <p className="section-description">{description}</p>}</div>;
}

export function Portfolio() {
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); } }), { threshold: 0.08 });
    document.querySelectorAll('.reveal').forEach(element => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return <>
    <header className="site-header"><div className="site-wrap header-inner">
      <a href="#accueil" className="wordmark" aria-label="Fiona Talbi, accueil">fiona talbi<span>.</span></a>
      <nav className="desktop-nav" aria-label="Navigation principale">{navigation.map(([label,id]) => <a key={id} className="nav-link" href={`#${id}`}>{label}</a>)}<Button asChild variant="portfolio" size="sm"><a href="#contact">On échange ? <ArrowUpRight /></a></Button></nav>
      <Button variant="ghost" size="icon" className="mobile-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'} aria-expanded={menuOpen}>{menuOpen ? <X /> : <Menu />}</Button>
    </div>{menuOpen && <nav className="mobile-nav" aria-label="Navigation mobile">{[...navigation, ['Recommandations','recommandations'], ['Contact','contact']].map(([label,id]) => <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)}>{label}</a>)}</nav>}</header>

    <main>
      <section id="accueil" className="hero">
        <img className="hero-photo" src={deskImage} alt="Carnet bordeaux, crayon rouge et café dans un atelier créatif" width={1440} height={1024} />
        <div className="site-wrap hero-inner"><div className="eyebrow"><span className="status-dot" />Marketing 360 · Communication · Créativité</div>
          <h1>Fiona<br /><span>Talbi.</span></h1><p className="hero-role">Des idées créatives.<br />Des résultats concrets.</p>
          <p className="hero-copy">Plus de 3 ans d’expérience pour faire rayonner les marques, connecter les audiences et transformer les stratégies en impact.</p>
          <div className="hero-actions"><Button asChild variant="portfolio" size="lg"><a href="#projets">Découvrir mes projets <ArrowUpRight /></a></Button><Button asChild variant="portfolioOutline" size="lg"><a href="#contact">Me contacter <ArrowUpRight /></a></Button></div>
          <div className="hero-meta"><span><MapPin size={13} /> Paris, France</span><span><Globe size={13} /> Un parcours international</span></div>
        </div><span className="image-caption">Stratégie, créativité & un café.</span>
      </section>
      <section className="impact-strip" aria-label="Mes résultats en chiffres"><div className="site-wrap impact-grid">{[['+30 %','de ventes chez Logitech'],['140','top stores activés day one'],['500+','abonnés Instagram en < 1 an'],['3+ ans','en marketing & communication']].map(([number,label]) => <div className="impact-item" key={label}><strong className="impact-number">{number}</strong><span className="impact-label">{label}</span></div>)}</div></section>

      <section id="parcours" className="section site-wrap">
        <div className="about-grid"><div className="reveal"><span className="section-kicker">01 / Mon parcours</span><h2 className="section-title">La curiosité comme moteur.<br /><em>L’impact comme cap.</em></h2><div className="interest-list"><span><Plane size={15} />Voyage</span><span><BookOpen size={15} />Lecture</span><span><Pencil size={15} />Dessin</span></div></div><div className="about-copy reveal"><p>Je suis Fiona, une professionnelle du <strong>marketing 360 et de la communication</strong>, basée à Paris. J’aime comprendre les marques, imaginer des idées qui font sens et les concrétiser sur le terrain.</p><p>De la tech au luxe, en passant par les réseaux de franchises, mon parcours combine <strong>vision stratégique, créativité et coordination opérationnelle</strong>. Paris, Londres et Dublin ont nourri ma curiosité et mon ouverture internationale.</p></div></div>
        <div className="timeline-columns mt-14 reveal"><div><h3 className="timeline-heading"><BriefcaseBusiness size={18} />Expériences professionnelles</h3><div className="timeline-item"><span className="timeline-date">Logitech · France</span><h3>Marketing Manager Assistant</h3><p>Category management, trade marketing et coordination terrain. Déploiement des campagnes et accompagnement d’une équipe de merchandisers.</p></div><div className="timeline-item"><span className="timeline-date">CosmétiCar · France</span><h3>Chargée de communication</h3><p>Animation des réseaux sociaux et formation communication des franchisés.</p></div><div className="timeline-item"><span className="timeline-date">Massilia E-consulting</span><h3>Chargée de relations influenceurs</h3><p>Partenariats en France et en Espagne, coordination avec les fournisseurs internationaux.</p></div></div><div className="about-copy"><h3 className="timeline-heading"><Globe size={18} />Une vision à 360°</h3><p><strong>Relier la stratégie à l’exécution.</strong><br />Un rayon repensé, une campagne prête dès le premier jour, une communauté qui grandit : chaque projet commence par un objectif clair.</p><p><strong>Créer, coordonner, mesurer.</strong><br />Je m’appuie sur une approche transversale du marketing et de la communication pour donner de la cohérence aux marques et de la portée à leurs actions.</p></div></div>
      </section>

      <section id="projets" className="section project-section"><div className="site-wrap"><SectionHeading number="02" label="Mes projets" title="Des marques, des défis." accent="Et de vrais résultats." description="Quatre expériences où la stratégie rencontre le terrain, la création et la performance." />
        <div className="projects-grid">{projects.map((project,index) => <article className="project-card reveal" key={project.category}><div className={`project-art ${project.theme}`}><span className="art-tag">{project.category}</span><span className="project-brand">{project.brand}{project.brand === 'logitech' && <span>.</span>}</span><span className="art-line" /><span className="art-number">PROJET 0{index+1}</span></div><div className="project-body"><h3>{project.title}</h3><p>{project.context}</p><span className="mission-label">Mes missions</span><p>{project.mission}</p><div className="project-metrics">{project.metrics.map(([number,label]) => <div key={label}><strong>{number}</strong><span>{label}</span></div>)}</div><details className="project-detail"><summary>Au cœur du projet <Plus size={15} /></summary><ul>{project.details.map(detail => <li key={detail}>{detail}</li>)}</ul></details></div></article>)}</div>
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