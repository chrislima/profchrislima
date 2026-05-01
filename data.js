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
  // ---------------------------------------------------------------------------
  links: {
    github: {
      handle: "@chrislima",
      url: "https://github.com/chrislima",
    },
    lattes: {
      handle: "lattes.cnpq.br/XXXXXXXXXXXXXXXX",
      url: "#",
    },
    linkedin: {
      handle: "in/christopher-lima-13050597",
      url: "https://www.linkedin.com/in/christopher-lima-13050597/",
    },
  },

  // ---------------------------------------------------------------------------
  // APPS — personal projects / tools available online
  // ---------------------------------------------------------------------------
  apps: [
    {
      name: "Budgetool",
      description: "App pessoal de controle de finanças. Em desenvolvimento — mas já disponível para todos.",
      url: "http://budgetoolapp.netlify.app",
      status: "beta",
    },
  ],

  // ---------------------------------------------------------------------------
  // DISCIPLINES — your courses
  // contentUrl: link to the interactive lesson content (OneDrive HTML, etc.)
  //             Leave null to show a "coming soon" placeholder.
  // ---------------------------------------------------------------------------
  disciplines: [
    {
      code: "C06",
      slug: "poo",
      name: "Programação Orientada a Objetos",
      description: "Fundamentos de POO em Java e Python: classes, herança, polimorfismo, encapsulamento. Princípios SOLID aplicados a problemas reais. Padrões de projeto introdutórios.",
      color: "#3B82F6",
      folderUrl: "https://1drv.ms/f/c/b5ea056ce2397b48/IgBIeznibAXqIIC1tKMAAAAAAe0JnT9YwxxufnMtEXYgPMA?e=dQhYrn",
      contentUrl: null,
      repos: [
        { label: "C206_C125", url: "https://github.com/chrislima-inatel/C206_C125" },
      ],
    },
    {
      code: "C14",
      slug: "engenharia-de-software",
      name: "Engenharia de Software",
      description: "Processos de desenvolvimento, requisitos, modelagem UML, métricas de software e gestão de projetos ágeis. Trabalho em equipe com práticas de versionamento.",
      color: "#3B82F6",
      folderUrl: "https://1drv.ms/f/c/b5ea056ce2397b48/IgBIeznibAXqIIC1RaIAAAAAAUADkhDnZVQH3FWWh3bZWnE?e=WOOCRw",
      contentUrl: "https://1drv.ms/u/c/b5ea056ce2397b48/IQCHi1tkC2hjQqr9IBtFh5p5AXuSpSKjY8sGIt4UxBeirdo?e=2sQx4E",
      repos: [
        { label: "C214", url: "https://github.com/chrislima-inatel/C214" },
        { label: "tdd-ci-devops", url: "https://github.com/chrislima-inatel/tdd-ci-devops" },
      ],
    },
    {
      code: "S07",
      slug: "qualidade-devops",
      name: "Qualidade de Software e DevOps",
      description: "Estratégias de teste (unitário, integração, e2e), CI/CD, observabilidade, infra como código. Pipelines reais com GitHub Actions, Docker e Kubernetes.",
      color: "#3B82F6",
      folderUrl: "https://1drv.ms/f/c/b5ea056ce2397b48/IgDiHe9D8QdDSqry0cJe4Qe8AcjoKgsSkBgzOkDSdMXRJak?e=sIIXI1",
      contentUrl: null,
      repos: [
        { label: "S07", url: "https://github.com/chrislima-inatel/S07" },
      ],
    },
    {
      code: "S06",
      slug: "engenharia-produto",
      name: "Engenharia de Produto de Software",
      description: "Discovery, métricas de produto, experimentos A/B, roadmap. Da ideia à entrega, conectando engenharia, UX e negócio.",
      color: "#3B82F6",
      folderUrl: "https://1drv.ms/p/c/b5ea056ce2397b48/IQBIeznibAXqIIC1rScAAAAAAemM7nPPKuOwDL9Jt02RYW8?e=U07G9t",
      contentUrl: null,
      repos: [],
    },
  ],

  // ---------------------------------------------------------------------------
  // MATERIALS — leave empty; materials are accessed via each discipline's
  // OneDrive folder link and contentUrl.
  // ---------------------------------------------------------------------------
  materials: [],

  // ---------------------------------------------------------------------------
  // PUBLICATIONS
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
  // TCC
  // ---------------------------------------------------------------------------
  tccFolder: {
    url: "https://onedrive.live.com/?id=B5EA056CE2397B48%2145866&cid=b5ea056ce2397b48&redeem=aHR0cHM6Ly8xZHJ2Lm1zL3UvcyFBa2g3T2VKc0JlcTFndVlxczhtMlBpT2ZMd0pTR1E_ZT04aThkU0U",
    label: "TCC orientados — acervo completo",
  },

  projects: [],
  advisees: [],
};
