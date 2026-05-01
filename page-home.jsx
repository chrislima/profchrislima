// Page components for the Prof. Christopher Lima site
const { useState, useEffect, useRef, useMemo } = React;

// ───────── Reveal-on-scroll wrapper ─────────
function Reveal({ children, delay = 0 }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setTimeout(() => setShown(true), delay); obs.disconnect(); }
    }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);
  return <div ref={ref} className={"reveal " + (shown ? "in" : "")}>{children}</div>;
}

// ───────── PDF preview floater ─────────
function PdfPreview({ visible, x, y, title, pages }) {
  return (
    <div className={"pdf-preview " + (visible ? "visible" : "")}
         style={{ left: x + 18, top: y + 18 }}>
      <div className="pdf-preview-line title"></div>
      <div className="pdf-preview-line"></div>
      <div className="pdf-preview-line med"></div>
      <div className="pdf-preview-line short"></div>
      <div className="pdf-preview-line faded" style={{ marginTop: 12 }}></div>
      <div className="pdf-preview-line med faded"></div>
      <div className="pdf-preview-line faded"></div>
      <div className="pdf-preview-line short faded"></div>
      <div className="pdf-preview-line faded"></div>
      <div className="pdf-preview-line med faded"></div>
      <div className="pdf-preview-pageno">1 / {pages || "—"}</div>
    </div>
  );
}

// ───────── Home page (minimal hub) ─────────
function HomePage({ go }) {
  const D = window.SITE_DATA;
  const [t] = window.useT();

  const counts = [
    `${D.disciplines.length} ${t.home.hubs[0].metaSuffix}`,
    D.materials.length > 0 ? `${D.materials.length} ${t.home.hubs[1].metaSuffix}` : null,
    `${D.publications.length} ${t.home.hubs[2].metaSuffix}`,
    t.home.hubs[3].meta,
  ];

  const hubItems = [
    { key: 'disciplinas', onClick: () => go('disciplina', D.disciplines[0].slug) },
    { key: 'conteudo', onClick: () => go('materiais') },
    { key: 'artigos', onClick: () => go('publicacoes') },
    { key: 'redes', onClick: () => go('redes') },
  ];

  return (
    <section className="hub">
      <div className="container">
        <div className="hub-intro">
          <div className="hub-name">{D.professor.title} {D.professor.name}</div>
          <div className="hub-affil">{t.home.affil}</div>
        </div>

        <div className="hub-grid">
          {hubItems.map((it, i) => {
            const tx = t.home.hubs[i];
            return (
              <a key={it.key} className="hub-card" onClick={it.onClick} style={{ animationDelay: `${i * 80}ms` }}>
                <div className="hub-card-kicker">{tx.kicker}</div>
                <div className="hub-card-label">
                  {tx.label}
                  <span className="hub-card-arrow"><Icon.Arrow/></span>
                </div>
                <div className="hub-card-desc">{tx.desc}</div>
                {counts[i] && <div className="hub-card-meta">{counts[i]}</div>}
              </a>
            );
          })}
        </div>

        <div className="hub-foot">
          <a href={"mailto:" + D.professor.email} className="hub-foot-link"><Icon.Mail/> {D.professor.email}</a>
          <span className="hub-foot-sep"></span>
          <span className="hub-foot-link"><Icon.Pin/> {t.home.location}</span>
        </div>
      </div>
    </section>
  );
}

window.HomePage = HomePage;
window.Reveal = Reveal;
window.PdfPreview = PdfPreview;
