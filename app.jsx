// Main app — router + floating nav + tweaks integration
const { useState: uS, useEffect: uE, useMemo: uM } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "direction": "editorial",
  "accent": "#3B82F6",
  "density": "regular",
  "dark": true,
  "lang": "pt"
}/*EDITMODE-END*/;

const ACCENT_PRESETS = [
  { name: "Azul", color: "#3B82F6" },
  { name: "Violeta", color: "#7C3AED" },
  { name: "Verde", color: "#10B981" },
  { name: "Âmbar", color: "#F59E0B" },
  { name: "Coral", color: "#FF5F1F" },
];

function DisciplinasMenu({ page, go }) {
  const [t] = window.useT();
  const [open, setOpen] = uS(false);
  const ref = React.useRef(null);
  uE(() => {
    if (!open) return;
    const onDoc = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, [open]);
  const active = page.name === 'disciplina';
  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <a className={"nav-link " + (active ? 'active' : '')} onClick={() => setOpen(o => !o)}>
        {t.nav.disciplines} <span style={{ fontSize: 9, opacity: 0.6, marginLeft: 4 }}>▾</span>
      </a>
      {open && (
        <div style={{
          position: 'absolute', top: 'calc(100% + 8px)', left: '50%', transform: 'translateX(-50%)',
          minWidth: 320, padding: 6, borderRadius: 14,
          background: 'var(--bg-elev)',
          backdropFilter: 'blur(16px) saturate(180%)',
          WebkitBackdropFilter: 'blur(16px) saturate(180%)',
          border: '1px solid var(--border-strong)',
          boxShadow: '0 16px 48px rgba(0,0,0,0.35)',
          display: 'flex', flexDirection: 'column', gap: 2,
        }}>
          {window.SITE_DATA.disciplines.map(d => (
            <a key={d.code} onClick={() => { go('disciplina', d.slug); setOpen(false); }}
               style={{
                 display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16,
                 padding: '10px 12px', borderRadius: 10, cursor: 'default',
                 transition: 'background 0.15s',
               }}
               onMouseEnter={e => e.currentTarget.style.background = 'var(--surface)'}
               onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
              <div>
                <div style={{ fontSize: 13.5, fontWeight: 500, color: 'var(--text)', letterSpacing: '-0.005em' }}>{d.name}</div>
                <div style={{ fontSize: 11, color: 'var(--text-muted)', fontFamily: 'JetBrains Mono, ui-monospace, monospace', marginTop: 2 }}>{d.semester} · {d.hours}h</div>
              </div>
              <span style={{ fontFamily: 'JetBrains Mono, ui-monospace, monospace', fontSize: 11, color: 'var(--accent)', letterSpacing: '0.06em' }}>{d.code}</span>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

function App() {
  const [tweaks, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [page, setPage] = uS({ name: 'home', arg: null });

  // Language
  uE(() => {
    window.__lang = tweaks.lang || 'pt';
    window.dispatchEvent(new CustomEvent('__langChange', { detail: window.__lang }));
    document.documentElement.lang = window.__lang === 'en' ? 'en' : 'pt-BR';
  }, [tweaks.lang]);

  const [t] = window.useT();

  // Theme
  uE(() => {
    document.documentElement.setAttribute('data-theme', tweaks.dark ? 'dark' : 'light');
  }, [tweaks.dark]);

  uE(() => {
    document.documentElement.setAttribute('data-direction', tweaks.direction);
  }, [tweaks.direction]);

  uE(() => {
    document.documentElement.setAttribute('data-density', tweaks.density);
  }, [tweaks.density]);

  // Accent color
  uE(() => {
    const a = tweaks.accent;
    document.documentElement.style.setProperty('--accent', a);
    const hex = a.replace('#', '');
    const r = parseInt(hex.slice(0,2), 16);
    const g = parseInt(hex.slice(2,4), 16);
    const b = parseInt(hex.slice(4,6), 16);
    document.documentElement.style.setProperty('--accent-soft', `rgba(${r},${g},${b},0.12)`);
    document.documentElement.style.setProperty('--accent-glow', `rgba(${r},${g},${b},0.35)`);
  }, [tweaks.accent]);

  // Nav
  const go = (name, arg = null) => {
    setPage({ name, arg });
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  return (
    <div className="app">
      <div className="bg-decor"></div>

      {/* Floating pill nav */}
      <div style={{
        position: 'fixed', top: 16, left: '50%', transform: 'translateX(-50%)', zIndex: 50,
        display: 'flex', gap: 8, alignItems: 'center',
        padding: 6, borderRadius: 14,
        background: 'color-mix(in srgb, var(--bg) 70%, transparent)',
        backdropFilter: 'blur(16px) saturate(180%)',
        WebkitBackdropFilter: 'blur(16px) saturate(180%)',
        border: '1px solid var(--border)'
      }}>
        <a className={"nav-link " + (page.name === 'home' ? 'active' : '')} onClick={() => go('home')}>{t.nav.home}</a>
        <DisciplinasMenu page={page} go={go}/>
        <a className={"nav-link " + (page.name === 'materiais' ? 'active' : '')} onClick={() => go('materiais')}>{t.nav.materials}</a>
        <a className={"nav-link " + (page.name === 'publicacoes' ? 'active' : '')} onClick={() => go('publicacoes')}>{t.nav.research}</a>
        <a className={"nav-link " + (page.name === 'redes' ? 'active' : '')} onClick={() => go('redes')}>{t.nav.networks}</a>
        <button className="theme-toggle" onClick={() => setTweak('lang', tweaks.lang === 'pt' ? 'en' : 'pt')} title="Idioma / Language" style={{ fontSize: 11, fontWeight: 600, fontFamily: 'JetBrains Mono, ui-monospace, monospace', letterSpacing: '0.05em' }}>
          {tweaks.lang === 'pt' ? 'PT' : 'EN'}
        </button>
        <button className="theme-toggle" onClick={() => setTweak('dark', !tweaks.dark)} title={tweaks.dark ? t.nav.themeLight : t.nav.themeDark}>
          {tweaks.dark ? <Icon.Sun/> : <Icon.Moon/>}
        </button>
      </div>

      <main key={page.name + (page.arg || '')}>
        {page.name === 'home' && <HomePage go={go}/>}
        {page.name === 'materiais' && <MateriaisPage go={go} initialDiscipline={page.arg || 'todos'}/>}
        {page.name === 'disciplina' && <DisciplinaPage go={go} slug={page.arg}/>}
        {page.name === 'publicacoes' && <PublicacoesPage/>}
        {page.name === 'redes' && <RedesPage/>}
      </main>

      <TweaksPanel>
        <TweakSection label={t.tweaks.language}/>
        <TweakRadio label={t.tweaks.language} value={tweaks.lang || 'pt'}
                    options={[{ value: 'pt', label: 'Português' }, { value: 'en', label: 'English' }]}
                    onChange={v => setTweak('lang', v)}/>
        <TweakSection label={t.tweaks.direction}/>
        <TweakRadio label={t.tweaks.style} value={tweaks.direction}
                    options={[
                      { value: 'editorial', label: 'Editorial' },
                      { value: 'tech', label: 'Tech' },
                      { value: 'soft', label: 'Soft' },
                    ]}
                    onChange={v => setTweak('direction', v)}/>
        <TweakSection label={t.tweaks.theme}/>
        <TweakToggle label={t.tweaks.dark} value={tweaks.dark} onChange={v => setTweak('dark', v)}/>
        <TweakSection label={t.tweaks.accent}/>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {ACCENT_PRESETS.map(p => (
            <button key={p.color} onClick={() => setTweak('accent', p.color)}
                    title={p.name}
                    style={{
                      width: 26, height: 26, borderRadius: 8, border: tweaks.accent === p.color ? '2px solid #29261b' : '1px solid rgba(0,0,0,0.15)',
                      background: p.color, cursor: 'default', padding: 0
                    }}/>
          ))}
        </div>
        <TweakColor label={t.tweaks.custom} value={tweaks.accent} onChange={v => setTweak('accent', v)}/>
        <TweakSection label={t.tweaks.density}/>
        <TweakRadio label={t.tweaks.spacing} value={tweaks.density}
                    options={['compact', 'regular', 'comfy']}
                    onChange={v => setTweak('density', v)}/>
      </TweaksPanel>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App/>);
