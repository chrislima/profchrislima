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

  const hubItems = [
    {
      key: 'disciplinas',
      tx: t.home.hubs[0],
      count: `${D.disciplines.length} ${t.home.hubs[0].metaSuffix}`,
      onClick: () => go('disciplina', D.disciplines[0].slug),
    },
    {
      key: 'artigos',
      tx: t.home.hubs[2],
      count: `${D.publications.length} ${t.home.hubs[2].metaSuffix}`,
      onClick: () => go('publicacoes'),
    },
    {
      key: 'redes',
      tx: t.home.hubs[3],
      count: t.home.hubs[3].meta,
      onClick: () => go('redes'),
    },
  ];

  return (
    <section className="hub">
      <div className="container">
        <div className="hub-intro">
          <div className="hub-name">{D.professor.title} {D.professor.name}</div>
          <div className="hub-affil">{t.home.affil}</div>
        </div>

        <div className="hub-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)', background: 'var(--border-strong)', border: '1px solid var(--border-strong)' }}>
          {hubItems.map((it, i) => (
            <a key={it.key} className="hub-card" onClick={it.onClick} style={{ animationDelay: `${i * 80}ms` }}>
              <div className="hub-card-label">
                {it.tx.label}
                <span className="hub-card-arrow"><Icon.Arrow/></span>
              </div>
              <div className="hub-card-desc">{it.tx.desc}</div>
            </a>
          ))}
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
