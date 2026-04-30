// Materials, Discipline, Publications, Redes pages — i18n-aware
const { useState: useS2, useEffect: useE2, useRef: useR2, useMemo: useM2 } = React;

// ───────── Materiais ─────────
function MateriaisPage({ go, initialDiscipline }) {
  const D = window.SITE_DATA;
  const [t] = window.useT();
  const [query, setQuery] = useS2("");
  const [type, setType] = useS2("todos");
  const [disc, setDisc] = useS2(initialDiscipline || "todos");
  const [hover, setHover] = useS2(null);
  const [pos, setPos] = useS2({ x: 0, y: 0 });

  const types = [
    { key: "todos", label: t.materials.types.all },
    { key: "apostila", label: t.materials.types.apostila },
    { key: "slides", label: t.materials.types.slides },
    { key: "codigo", label: t.materials.types.codigo },
  ];

  const filtered = useM2(() => {
    return D.materials.filter(m => {
      if (type !== "todos" && m.type !== type) return false;
      if (disc !== "todos" && m.discipline !== disc) return false;
      if (query) {
        const q = query.toLowerCase();
        const blob = (m.title + " " + (m.tags || []).join(" ") + " " + m.discipline).toLowerCase();
        if (!blob.includes(q)) return false;
      }
      return true;
    });
  }, [query, type, disc]);

  const counts = useM2(() => {
    const c = { todos: D.materials.length };
    ["apostila","slides","codigo"].forEach(k => { c[k] = D.materials.filter(m => m.type === k).length; });
    return c;
  }, []);

  // Find the active discipline's folder URL (when filtering by a single discipline)
  const activeDiscipline = disc !== "todos" ? D.disciplines.find(d => d.code === disc) : null;

  return (
    <>
      <section className="hero" style={{ paddingBottom: 40 }}>
        <div className="container">
          <span className="kicker" style={{ marginBottom: 24, display: 'inline-flex' }}>{t.materials.kicker}</span>
          <h1 className="hero-title" style={{ fontSize: 'clamp(48px, 7vw, 96px)' }}>
            {t.materials.titleA}<span className="accent">{t.materials.titleAccent}</span>{t.materials.titleB}
          </h1>
          <p className="hero-lede" style={{ marginBottom: 0 }}>{t.materials.lede}</p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 40 }}>
        <div className="container">
          <div className="materials-controls">
            <div className="search-input-wrap">
              <Icon.Search/>
              <input className="search-input" placeholder={t.materials.searchPlaceholder}
                     value={query} onChange={e => setQuery(e.target.value)} />
            </div>
            <div className="filter-chips">
              {types.map(tt => (
                <button key={tt.key} className={"chip " + (type === tt.key ? "active" : "")}
                        onClick={() => setType(tt.key)}>
                  {tt.label} <span className="chip-count">{counts[tt.key]}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="filter-chips" style={{ marginBottom: 24 }}>
            <button className={"chip " + (disc === "todos" ? "active" : "")} onClick={() => setDisc("todos")}>{t.materials.allDisciplines}</button>
            {D.disciplines.map(d => (
              <button key={d.code} className={"chip " + (disc === d.code ? "active" : "")} onClick={() => setDisc(d.code)}>
                {d.code} · {d.name}
              </button>
            ))}
          </div>

          {/* OneDrive folder button when a discipline is selected */}
          {activeDiscipline && activeDiscipline.folderUrl && (
            <div style={{ marginBottom: 24 }}>
              <a href={activeDiscipline.folderUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ textDecoration: 'none' }}>
                <Icon.Download/> {t.materials.openFolder}
              </a>
            </div>
          )}

          <div style={{ fontSize: 12.5, color: 'var(--text-muted)', fontFamily: 'JetBrains Mono, ui-monospace, monospace', marginBottom: 8, letterSpacing: '0.05em' }}>
            {filtered.length} {filtered.length === 1 ? t.materials.countOne : t.materials.countMany}
          </div>

          <div className="material-list">
            {filtered.map(m => {
              const disciplineFolder = D.disciplines.find(d => d.code === m.discipline);
              const href = m.url
                ? "https://" + m.url
                : (disciplineFolder ? disciplineFolder.folderUrl : null);
              return (
                <div key={m.id} className="material-row"
                     onMouseEnter={() => { if (m.type !== 'codigo') setHover(m); }}
                     onMouseMove={e => setPos({ x: e.clientX, y: e.clientY })}
                     onMouseLeave={() => setHover(null)}>
                  <div className={"material-icon t-" + m.type}>
                    {m.type === 'apostila' ? 'PDF' : m.type === 'slides' ? 'PPT' : 'GIT'}
                  </div>
                  <div className="material-meta">
                    {href
                      ? <a href={href} target="_blank" rel="noopener noreferrer" className="material-title" style={{ textDecoration: 'none' }}>{m.title}</a>
                      : <h3 className="material-title">{m.title}</h3>
                    }
                    <div className="material-tags">
                      {(m.tags || []).slice(0, 3).map(tg => <span key={tg} className="material-tag">#{tg}</span>)}
                    </div>
                  </div>
                  <div className="material-disc">{m.discipline}</div>
                  <div className="material-date">{m.semester}</div>
                  <div className="material-size">{m.pages ? `${m.pages} ${t.materials.pages}` : (m.url ? "github" : "—")}</div>
                </div>
              );
            })}
            {filtered.length === 0 && (
              <div style={{ padding: '48px 12px', color: 'var(--text-muted)', textAlign: 'center', fontSize: 14 }}>
                {t.materials.empty}
              </div>
            )}
          </div>
        </div>
      </section>

      <PdfPreview visible={!!hover} x={pos.x} y={pos.y} title={hover?.title} pages={hover?.pages} />
    </>
  );
}

// ───────── Disciplina ─────────
function DisciplinaPage({ go, slug }) {
  const D = window.SITE_DATA;
  const [t, lang] = window.useT();
  const d = D.disciplines.find(x => x.slug === slug) || D.disciplines[0];
  const mats = D.materials.filter(m => m.discipline === d.code);

  const [comments, setComments] = useS2(t.discipline.seedComments);
  useE2(() => { setComments(t.discipline.seedComments); }, [lang]);
  const [draft, setDraft] = useS2("");
  const submit = () => {
    if (!draft.trim()) return;
    setComments([{ author: lang === 'en' ? "You" : "Você", when: t.discipline.now, text: draft.trim() }, ...comments]);
    setDraft("");
  };

  return (
    <>
      <section className="disc-hero">
        <div className="container">
          <button className="kicker" onClick={() => go('home')} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', padding: 0, marginBottom: 32, cursor: 'default' }}>
            {t.discipline.back}
          </button>
          <div className="disc-hero-code">{d.code}</div>
          <h1 className="disc-hero-title">{d.name}</h1>
          <p className="disc-hero-lede">{d.description}</p>

          {d.folderUrl && (
            <div style={{ marginTop: 32 }}>
              <a href={d.folderUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ textDecoration: 'none' }}>
                <Icon.Download/> {t.discipline.openFolder}
              </a>
            </div>
          )}
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <div className="section-head-left">
              <span className="kicker">{t.discipline.kickerMaterials}</span>
              <h2 className="section-title" style={{ fontSize: 'clamp(32px, 4vw, 48px)' }}>{t.discipline.titleMaterials}</h2>
            </div>
            <button className="btn" onClick={() => go('materiais', d.code)}>{t.discipline.seeLibrary} <Icon.Arrow/></button>
          </div>

          <div className="material-list">
            {mats.map(m => {
              const href = m.url ? "https://" + m.url : (d.folderUrl || null);
              return (
                <div key={m.id} className="material-row">
                  <div className={"material-icon t-" + m.type}>
                    {m.type === 'apostila' ? 'PDF' : m.type === 'slides' ? 'PPT' : 'GIT'}
                  </div>
                  <div className="material-meta">
                    {href
                      ? <a href={href} target="_blank" rel="noopener noreferrer" className="material-title" style={{ textDecoration: 'none' }}>{m.title}</a>
                      : <h3 className="material-title">{m.title}</h3>
                    }
                    <div className="material-tags">
                      {(m.tags || []).slice(0, 3).map(tg => <span key={tg} className="material-tag">#{tg}</span>)}
                    </div>
                  </div>
                  <div className="material-disc">{m.semester}</div>
                  <div className="material-date">{m.date}</div>
                  <div className="material-size">{m.pages ? `${m.pages} ${t.materials.pages}` : "—"}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="section-head">
            <div className="section-head-left">
              <span className="kicker">{t.discipline.kickerComments}</span>
              <h2 className="section-title" style={{ fontSize: 'clamp(32px, 4vw, 48px)' }}>{t.discipline.titleComments}</h2>
              <p className="section-desc">{t.discipline.commentsLede}</p>
            </div>
          </div>

          <div className="comments">
            <div className="comment-input">
              <div className="comment-avatar">{lang === 'en' ? 'YO' : 'VC'}</div>
              <div style={{ flex: 1 }}>
                <textarea className="comment-textarea" placeholder={t.discipline.commentsPlaceholder}
                          value={draft} onChange={e => setDraft(e.target.value)}/>
                <div className="comment-actions">
                  <button className="btn btn-primary" onClick={submit}>{t.discipline.publish}</button>
                </div>
              </div>
            </div>
            <div className="comment-list">
              {comments.map((c, i) => (
                <div key={i} className="comment" style={{ animationDelay: `${i * 60}ms` }}>
                  <div className="comment-avatar">{c.author.split(' ').map(s => s[0]).join('').slice(0,2).toUpperCase()}</div>
                  <div className="comment-body">
                    <div className="comment-head">
                      <span className="comment-author">{c.author}</span>
                      <span className="comment-when">{c.when}</span>
                    </div>
                    <div className="comment-text">{c.text}</div>
                    <div className="comment-tools">
                      <button><Icon.Heart/> {t.discipline.like}</button>
                      <button><Icon.Reply/> {t.discipline.reply}</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

// ───────── Publicações ─────────
function PublicacoesPage() {
  const D = window.SITE_DATA;
  const [t] = window.useT();
  const groups = useM2(() => {
    const m = {};
    D.publications.forEach(p => { (m[p.year] = m[p.year] || []).push(p); });
    return Object.keys(m).sort((a, b) => b - a).map(y => ({ year: y, items: m[y] }));
  }, []);

  return (
    <>
      <section className="hero" style={{ paddingBottom: 40 }}>
        <div className="container">
          <span className="kicker" style={{ marginBottom: 24, display: 'inline-flex' }}>{t.publications.kicker}</span>
          <h1 className="hero-title" style={{ fontSize: 'clamp(48px, 7vw, 100px)' }}>
            {t.publications.titleA}<span className="accent">{t.publications.titleAccent}</span>{t.publications.titleB}
          </h1>
          <p className="hero-lede">{t.publications.lede}</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal>
            <div className="section-head">
              <div className="section-head-left">
                <span className="kicker">{t.publications.timelineKicker}</span>
                <h2 className="section-title" style={{ fontSize: 'clamp(36px, 5vw, 64px)' }}>{t.publications.timelineTitle}</h2>
              </div>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div className="pub-list">
              {groups.map(g => (
                <div key={g.year} className="pub-year-group">
                  <div className="pub-year">/// {g.year}</div>
                  {g.items.map((p, i) => (
                    <div key={i} className="pub-item">
                      <div>
                        <h3 className="pub-title">{p.title}</h3>
                        <div className="pub-meta">
                          <span className="pub-venue">{p.venue}</span>
                          <span>·</span>
                          <span className="pub-type">{p.type}</span>
                          {p.featured && <span className="pub-type" style={{ color: 'var(--accent)', borderColor: 'var(--accent)' }}>{t.publications.featured}</span>}
                        </div>
                        <div className="pub-authors">{p.authors.join(", ")}</div>
                      </div>
                      {p.doi && (
                        <a className="pub-doi" href={"https://doi.org/" + p.doi} target="_blank" rel="noopener noreferrer">
                          DOI <Icon.External/>
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* TCC supervised works */}
      {D.tccFolder && D.tccFolder.url && (
        <section className="section" style={{ paddingTop: 0 }}>
          <div className="container">
            <Reveal>
              <div className="section-head">
                <div className="section-head-left">
                  <span className="kicker">{t.publications.tccKicker}</span>
                  <h2 className="section-title" style={{ fontSize: 'clamp(36px, 5vw, 64px)' }}>{t.publications.tccTitle}</h2>
                  <p className="section-desc">{t.publications.tccDesc}</p>
                </div>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <a href={D.tccFolder.url} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ textDecoration: 'none' }}>
                <Icon.File/> {t.publications.tccButton}
              </a>
            </Reveal>
          </div>
        </section>
      )}

      {/* Projects section — only shown when there is data */}
      {D.projects && D.projects.length > 0 && (
        <section className="section" style={{ paddingTop: 0 }}>
          <div className="container">
            <Reveal>
              <div className="section-head">
                <div className="section-head-left">
                  <span className="kicker">{t.publications.ongoingKicker}</span>
                  <h2 className="section-title" style={{ fontSize: 'clamp(36px, 5vw, 64px)' }}>{t.publications.ongoingTitle}</h2>
                </div>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 1, background: 'var(--border)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
                {D.projects.map((p, i) => (
                  <div key={i} style={{ background: 'var(--bg)', padding: 32, display: 'flex', flexDirection: 'column', gap: 14, minHeight: 220 }}>
                    <div style={{ fontFamily: 'JetBrains Mono, ui-monospace, monospace', fontSize: 11, color: 'var(--text-muted)', letterSpacing: '0.08em' }}>
                      {p.role.toUpperCase()} · {p.year}
                    </div>
                    <h3 style={{ fontSize: 22, fontWeight: 600, letterSpacing: '-0.02em', margin: 0, lineHeight: 1.2 }}>{p.title}</h3>
                    <p style={{ color: 'var(--text-dim)', fontSize: 14.5, lineHeight: 1.55, margin: 0, flex: 1 }}>{p.description}</p>
                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                      {p.tags.map(tg => <span key={tg} className="material-tag" style={{ fontFamily: 'JetBrains Mono, ui-monospace, monospace', fontSize: 11, color: 'var(--text-muted)' }}>#{tg}</span>)}
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {/* Advisees — only shown when there is data */}
      {D.advisees && D.advisees.length > 0 && (
        <section className="section" style={{ paddingTop: 0 }}>
          <div className="container">
            <Reveal>
              <h3 style={{ fontSize: 18, fontWeight: 500, marginBottom: 24, color: 'var(--text-dim)' }}>{t.publications.adviseesTitle}</h3>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {D.advisees.map((a, i) => (
                  <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr auto auto auto', gap: 24, padding: '16px 0', borderTop: '1px solid var(--border)', alignItems: 'center', fontSize: 14 }}>
                    <div>
                      <div style={{ fontWeight: 500 }}>{a.name}</div>
                      <div style={{ fontSize: 13, color: 'var(--text-dim)', marginTop: 2 }}>{a.topic}</div>
                    </div>
                    <div style={{ fontFamily: 'JetBrains Mono, ui-monospace, monospace', fontSize: 12, color: 'var(--text-muted)' }}>{a.level}</div>
                    <div style={{ fontFamily: 'JetBrains Mono, ui-monospace, monospace', fontSize: 12, color: 'var(--text-muted)' }}>{a.year}</div>
                    <div style={{ fontSize: 11, padding: '3px 8px', border: '1px solid var(--border)', borderRadius: 4, fontFamily: 'JetBrains Mono, ui-monospace, monospace', letterSpacing: '0.06em', textTransform: 'uppercase', color: a.status === 'concluído' || a.status === 'completed' ? 'var(--accent)' : 'var(--text-muted)' }}>{a.status}</div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>
      )}
    </>
  );
}

// ───────── Redes ─────────
function RedesPage() {
  const D = window.SITE_DATA;
  const [t] = window.useT();
  const links = [
    { name: "GitHub", handle: D.links.github.handle, url: D.links.github.url, icon: <Icon.Github/> },
    { name: "Currículo Lattes", handle: D.links.lattes.handle, url: D.links.lattes.url, icon: <Icon.File/> },
    { name: "LinkedIn", handle: D.links.linkedin.handle, url: D.links.linkedin.url, icon: <Icon.External/> },
    { name: "Email", handle: D.professor.email, url: "mailto:" + D.professor.email, icon: <Icon.Mail/> },
  ];
  return (
    <section className="hero" style={{ paddingBottom: 80 }}>
      <div className="container">
        <span className="kicker" style={{ marginBottom: 24, display: 'inline-flex' }}>{t.redes.kicker}</span>
        <h1 className="hero-title" style={{ fontSize: 'clamp(48px, 7vw, 100px)' }}>
          {t.redes.titleA} <span className="accent">{t.redes.titleB}</span>
        </h1>
        <p className="hero-lede">{t.redes.lede}</p>
        <div style={{ marginTop: 48, display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 1, background: 'var(--border)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
          {links.map(l => (
            <a key={l.name} href={l.url} target={l.url.startsWith('mailto:') ? '_self' : '_blank'} rel="noopener noreferrer"
               style={{ background: 'var(--bg)', padding: 28, display: 'flex', alignItems: 'center', gap: 16, transition: 'background 0.25s' }}
               onMouseEnter={e => e.currentTarget.style.background = 'var(--surface)'}
               onMouseLeave={e => e.currentTarget.style.background = 'var(--bg)'}>
              <div style={{ width: 40, height: 40, display: 'grid', placeItems: 'center', background: 'var(--accent-soft)', color: 'var(--accent)', borderRadius: 10 }}>{l.icon}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 15, fontWeight: 500 }}>{l.name}</div>
                <div style={{ fontSize: 12.5, color: 'var(--text-muted)', fontFamily: 'JetBrains Mono, ui-monospace, monospace', marginTop: 2 }}>{l.handle}</div>
              </div>
              <Icon.External/>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

window.MateriaisPage = MateriaisPage;
window.DisciplinaPage = DisciplinaPage;
window.PublicacoesPage = PublicacoesPage;
window.RedesPage = RedesPage;
