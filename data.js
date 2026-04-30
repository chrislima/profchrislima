// =============================================================================
// data.js — EDIT THIS FILE to insert your real data
// =============================================================================

window.SITE_DATA = {

  // ---------------------------------------------------------------------------
  // PROFESSOR — your basic info
  // ---------------------------------------------------------------------------
  professor: {
    name: "Christopher Lima",
    title: "Prof.",
    institution: "Inatel — Instituto Nacional de Telecomunicações",
    bio: "Professor de Engenharia de Software no Inatel.",
    email: "christopher@inatel.br",
    location: "Santa Rita do Sapucaí, MG",
  },

  // ---------------------------------------------------------------------------
  // LINKS — your social / academic profiles
  // EDIT: replace each url and handle with your real values.
  // ---------------------------------------------------------------------------
  links: {
    github: {
      handle: "@chrislima",
      url: "https://github.com/chrislima",
    },
    lattes: {
      handle: "lattes.cnpq.br/XXXXXXXXXXXXXXXX",
      // EDIT: e.g. url: "http://lattes.cnpq.br/1234567890123456"
      url: "#",
    },
    linkedin: {
      handle: "in/christopher-lima-13050597",
      // EDIT: e.g. url: "https://www.linkedin.com/in/christopher-lima-13050597/"
      url: "#",
    },
  },

  // ---------------------------------------------------------------------------
  // DISCIPLINES — your courses
  // Each discipline needs a unique `code` (filter key) and `slug` (routing).
  // folderUrl: OneDrive shared folder link for this discipline's materials.
  // ---------------------------------------------------------------------------
  disciplines: [
    {
      code: "C06",
      slug: "poo",
      name: "Programação Orientada a Objetos",
      description: "Fundamentos de POO em Java e Python: classes, herança, polimorfismo, encapsulamento. Princípios SOLID aplicados a problemas reais. Padrões de projeto introdutórios.",
      color: "#3B82F6",
      folderUrl: "https://1drv.ms/f/c/b5ea056ce2397b48/IgBIeznibAXqIIC1tKMAAAAAAe0JnT9YwxxufnMtEXYgPMA?e=dQhYrn",
    },
    {
      code: "C14",
      slug: "engenharia-de-software",
      name: "Engenharia de Software",
      description: "Processos de desenvolvimento, requisitos, modelagem UML, métricas de software e gestão de projetos ágeis. Trabalho em equipe com práticas de versionamento.",
      color: "#3B82F6",
      folderUrl: "https://1drv.ms/f/c/b5ea056ce2397b48/IgBIeznibAXqIIC1RaIAAAAAAUADkhDnZVQH3FWWh3bZWnE?e=WOOCRw",
    },
    {
      code: "S07",
      slug: "qualidade-devops",
      name: "Qualidade de Software e DevOps",
      description: "Estratégias de teste (unitário, integração, e2e), CI/CD, observabilidade, infra como código. Pipelines reais com GitHub Actions, Docker e Kubernetes.",
      color: "#3B82F6",
      folderUrl: "https://1drv.ms/f/c/b5ea056ce2397b48/IgDiHe9D8QdDSqry0cJe4Qe8AcjoKgsSkBgzOkDSdMXRJak?e=sIIXI1",
    },
    {
      code: "S06",
      slug: "engenharia-produto",
      name: "Engenharia de Produto de Software",
      description: "Discovery, métricas de produto, experimentos A/B, roadmap. Da ideia à entrega, conectando engenharia, UX e negócio.",
      color: "#3B82F6",
      folderUrl: "https://1drv.ms/p/c/b5ea056ce2397b48/IQBIeznibAXqIIC1rScAAAAAAemM7nPPKuOwDL9Jt02RYW8?e=U07G9t",
    },
  ],

  // ---------------------------------------------------------------------------
  // MATERIALS — catalog of PDFs, slides, and repos.
  // Each item links to the discipline's OneDrive folder (folderUrl above).
  // To link individual files, add: url: "https://direct-link-to-file"
  // ---------------------------------------------------------------------------
  materials: [
    // C06 — POO
    { id: 1, title: "Apostila Completa — POO em Java", type: "apostila", discipline: "C06", semester: "2026/1", date: "2026-02-10", pages: 184, tags: ["java", "fundamentos"], featured: true },
    { id: 2, title: "Slides — Aula 01: Classes e Objetos", type: "slides", discipline: "C06", semester: "2026/1", date: "2026-02-12", pages: 32, tags: ["java", "introdução"] },
    { id: 3, title: "Slides — Aula 04: Herança e Polimorfismo", type: "slides", discipline: "C06", semester: "2026/1", date: "2026-03-05", pages: 41, tags: ["java", "herança"] },
    { id: 4, title: "Repositório — Exemplos SOLID", type: "codigo", discipline: "C06", semester: "2026/1", date: "2026-03-18", tags: ["java", "solid"], url: "github.com/chrislima/solid-exemplos" },
    { id: 5, title: "Slides — Padrões GoF Essenciais", type: "slides", discipline: "C06", semester: "2026/1", date: "2026-04-02", pages: 48, tags: ["padrões", "design"] },

    // C14 — Engenharia de Software
    { id: 6, title: "Apostila — Engenharia de Software Moderna", type: "apostila", discipline: "C14", semester: "2026/1", date: "2026-02-08", pages: 247, tags: ["processos", "agile"], featured: true },
    { id: 7, title: "Slides — Métodos Ágeis: Scrum, Kanban, XP", type: "slides", discipline: "C14", semester: "2026/1", date: "2026-02-22", pages: 56, tags: ["scrum", "ágil"] },
    { id: 8, title: "Slides — Engenharia de Requisitos", type: "slides", discipline: "C14", semester: "2026/1", date: "2026-03-10", pages: 44, tags: ["requisitos"] },
    { id: 9, title: "Slides — UML na Prática", type: "slides", discipline: "C14", semester: "2026/1", date: "2026-03-28", pages: 52, tags: ["uml", "modelagem"] },
    { id: 10, title: "Repositório — Projeto Modelo", type: "codigo", discipline: "C14", semester: "2026/1", date: "2026-04-15", tags: ["template"], url: "github.com/chrislima/es-projeto-modelo" },

    // S07 — Qualidade e DevOps
    { id: 11, title: "Apostila — Qualidade & DevOps", type: "apostila", discipline: "S07", semester: "2026/1", date: "2026-02-15", pages: 218, tags: ["devops", "testes"], featured: true },
    { id: 12, title: "Slides — Pirâmide de Testes", type: "slides", discipline: "S07", semester: "2026/1", date: "2026-02-28", pages: 38, tags: ["testes", "qualidade"] },
    { id: 13, title: "Slides — CI/CD com GitHub Actions", type: "slides", discipline: "S07", semester: "2026/1", date: "2026-03-15", pages: 47, tags: ["ci", "github-actions"] },
    { id: 14, title: "Repositório — Pipeline Demo (Docker + K8s)", type: "codigo", discipline: "S07", semester: "2026/1", date: "2026-03-30", tags: ["docker", "kubernetes"], url: "github.com/chrislima/cicd-demo" },
    { id: 15, title: "Slides — Observabilidade & SRE", type: "slides", discipline: "S07", semester: "2026/1", date: "2026-04-12", pages: 43, tags: ["observabilidade", "sre"] },

    // S06 — Engenharia de Produto
    { id: 16, title: "Apostila — Engenharia de Produto", type: "apostila", discipline: "S06", semester: "2026/1", date: "2026-02-18", pages: 162, tags: ["produto", "discovery"] },
    { id: 17, title: "Slides — Discovery & Métricas", type: "slides", discipline: "S06", semester: "2026/1", date: "2026-03-04", pages: 39, tags: ["discovery", "métricas"] },
    { id: 18, title: "Slides — A/B Testing na prática", type: "slides", discipline: "S06", semester: "2026/1", date: "2026-03-22", pages: 35, tags: ["a/b", "experimentos"] },
  ],

  // ---------------------------------------------------------------------------
  // PUBLICATIONS — peer-reviewed papers
  // doi: string WITHOUT "https://doi.org/" — links are auto-generated.
  // ---------------------------------------------------------------------------
  publications: [
    {
      year: 2019,
      title: "A Proposal to Improve the Earned Value Management Technique Using Quality Data in Software Projects",
      venue: "ITNG 2019 — Advances in Intelligent Systems and Computing, vol 800",
      type: "Conferência",
      authors: ["C. Lima", "A.D. de Souza"],
      doi: "10.1007/978-3-030-14070-0_84",
    },
    {
      year: 2019,
      title: "A Systematic Review Based on Earned Value Management and Quality",
      venue: "ITNG 2019 — Advances in Intelligent Systems and Computing, vol 800",
      type: "Conferência",
      authors: ["C. Lima", "A.D. de Souza"],
      doi: "10.1007/978-3-030-14070-0_20",
    },
  ],

  // ---------------------------------------------------------------------------
  // TCC — folder with final graduation works supervised
  // ---------------------------------------------------------------------------
  tccFolder: {
    url: "https://onedrive.live.com/?id=B5EA056CE2397B48%2145866&cid=b5ea056ce2397b48&redeem=aHR0cHM6Ly8xZHJ2Lm1zL3UvcyFBa2g3T2VKc0JlcTFndVlxczhtMlBpT2ZMd0pTR1E_ZT04aThkU0U",
    label: "TCC orientados — acervo completo",
  },

  // ---------------------------------------------------------------------------
  // PROJECTS — ongoing research (optional, edit or clear the array)
  // ---------------------------------------------------------------------------
  projects: [],

  // ---------------------------------------------------------------------------
  // ADVISEES — students supervised (optional, edit or clear the array)
  // ---------------------------------------------------------------------------
  advisees: [],
};
