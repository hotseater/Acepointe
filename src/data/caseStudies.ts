export type SceneId = 'insurance' | 'healthcare' | 'nooktek' | 'radix';

export interface CaseResult {
  value: string;
  label: string;
}
export interface CaseBuildItem {
  term: string;
  detail: string;
}

export interface CaseStudy {
  slug: string;
  category: string;
  title: string;
  /** Short card summary (homepage/success-stories cards). */
  summary: string;
  /** Numeric part of the headline metric, animated as a count-up on cards. */
  metricValue: number;
  metricSuffix: string;
  metricCaption: string;
  scene: SceneId;
  // --- Detail page ---
  intro: string;
  client: string;
  engagement: string;
  timeline: string;
  challenge: string;
  buildIntro: string;
  build: CaseBuildItem[];
  outcome: string;
  results: CaseResult[];
  tech: string[];
}

/** NOTE: metrics + narratives are plausible placeholders — confirm with AcePointe before launch. */
export const caseStudies: CaseStudy[] = [
  {
    slug: 'life-insurer',
    category: 'Insurance · AI Lead Generation',
    title: 'Smarter lead generation for a national life insurer',
    summary:
      'Built an AI-driven lead scoring and routing engine that qualifies prospects in real time and puts agents on the highest-intent conversations first.',
    metricValue: 3.1,
    metricSuffix: '×',
    metricCaption: 'more qualified leads per agent',
    scene: 'insurance',
    intro:
      'An AI-driven lead scoring and routing engine that qualifies prospects in real time — so agents spend their day on the conversations most likely to become policies.',
    client: 'National life insurance carrier',
    engagement: 'Forward-deployed team of 3',
    timeline: '14 weeks to production',
    challenge:
      "The carrier's agents worked purchased lead lists top to bottom. Contact rates were falling, high-intent prospects waited hours for a callback while agents dialed cold numbers, and marketing couldn't say which channels actually produced policyholders — only which produced form fills.",
    buildIntro:
      "Our forward-deployed team embedded with the carrier's sales-ops group and shipped in increments from week three:",
    build: [
      {
        term: 'Real-time lead scoring',
        detail:
          'a model trained on three years of policy outcomes, scoring every inbound lead on intent and fit within seconds of capture.',
      },
      {
        term: 'Intelligent routing',
        detail:
          "hot leads go straight to the best-matched licensed agent's queue; cooler leads enter automated nurture until their signals change.",
      },
      {
        term: 'Channel attribution',
        detail: 'closed-loop reporting connecting marketing spend to issued policies, not just form fills.',
      },
      {
        term: 'CRM-native delivery',
        detail: "everything surfaced inside the agents' existing CRM; no new tools to learn.",
      },
    ],
    outcome:
      "Within a quarter, agents were spending most of their day on scored, routed conversations. The carrier's cost per issued policy dropped by a third, and the scoring model now retrains monthly on fresh outcomes — run entirely by the client's own team, as designed.",
    results: [
      { value: '3.1×', label: 'more qualified leads per agent' },
      { value: '-34%', label: 'cost per issued policy' },
      { value: '< 5 min', label: 'median response time to hot leads (from 3+ hours)' },
    ],
    tech: ['Python', 'AWS', 'Snowflake', 'SageMaker', 'dbt', 'Salesforce'],
  },
  {
    slug: 'healthcare-voice-ai',
    category: 'Healthcare · Voice AI',
    title: 'Voice-first incident reporting for a healthcare network',
    summary:
      'Replaced form-based incident reporting with a voice AI workflow — clinicians speak, the system captures, structures, and files compliant reports automatically.',
    metricValue: 82,
    metricSuffix: '%',
    metricCaption: 'less time spent on incident reports',
    scene: 'healthcare',
    intro:
      'Clinicians speak; the system captures, structures, and files a compliant incident report — turning a 40-minute form into a 4-minute conversation.',
    client: 'Regional healthcare network, 6 facilities',
    engagement: 'Forward-deployed team of 2',
    timeline: '10 weeks to first live facility',
    challenge:
      'Incident reporting is mandatory — and universally dreaded. Nurses faced a 14-screen form at the end of an already long shift, so minor incidents went unreported, serious ones were filed late with thin detail, and the patient-safety team was working from an incomplete picture of what was happening on their floors.',
    buildIntro: 'A voice-first reporting workflow that meets clinicians where they are — on their feet, between patients:',
    build: [
      {
        term: 'Hands-free capture',
        detail: 'clinicians describe the incident in their own words from any workstation or shared device.',
      },
      {
        term: 'AI structuring',
        detail:
          "speech is transcribed and mapped onto the network's incident taxonomy; the system asks targeted follow-up questions only for missing required fields.",
      },
      {
        term: 'Compliance built in',
        detail:
          "reports are generated in the format regulators and insurers require, with an auditable trail; PHI handling reviewed with the client's compliance office from week one.",
      },
      {
        term: 'Safety analytics',
        detail: 'a dashboard for the patient-safety team surfacing trends by unit, shift, and incident type.',
      },
    ],
    outcome:
      "Reporting stopped being an end-of-shift chore. Volume went up — not because incidents increased, but because near-misses finally got captured — and the safety team now sees patterns weeks earlier. The network's own IT group runs the system and rolled out facilities four through six without us.",
    results: [
      { value: '82%', label: 'less time spent per incident report' },
      { value: '2.4×', label: 'more incidents & near-misses captured' },
      { value: '6', label: "facilities live — the last three deployed by the client's own team" },
    ],
    tech: ['Azure', 'Speech-to-text', 'LLM structuring', 'FHIR', 'Power BI'],
  },
  {
    slug: 'nooktek',
    category: 'Education · End-to-End AI',
    title: 'End-to-end AI implementation at NookTek',
    summary:
      "Embedded with NookTek's team to take AI from roadmap to production — learning copilots for students, analytics for educators, and the data platform underneath.",
    metricValue: 6,
    metricSuffix: ' wks',
    metricCaption: 'from kickoff to first AI feature live',
    scene: 'nooktek',
    intro:
      "From an AI roadmap on a whiteboard to learning copilots in students' hands — the data platform, the AI features, and the team to run them, delivered as one engagement.",
    client: 'NookTek — education technology company',
    engagement: 'Forward-deployed team of 4',
    timeline: '6 weeks to first live feature · 6 months total',
    challenge:
      'NookTek had an ambitious AI roadmap and real competitive pressure — but student data scattered across their LMS, CRM, and product database, no ML infrastructure, and an engineering team fully booked on the core product. Every AI feature was six months away, permanently.',
    buildIntro: "A four-person AcePointe team embedded with NookTek's engineers and shipped in layers:",
    build: [
      {
        term: 'Unified data platform',
        detail:
          "student activity, outcomes, and content brought into one governed warehouse with privacy controls appropriate for minors' data.",
      },
      {
        term: 'Learning copilot',
        detail:
          "an in-product tutor that explains concepts against the student's own coursework, with guardrails reviewed by NookTek's pedagogy team.",
      },
      {
        term: 'Educator analytics',
        detail: 'early-warning dashboards flagging students who are struggling weeks before grades show it.',
      },
      {
        term: 'In-house capability',
        detail: 'paired delivery throughout; NookTek engineers co-owned every service from the first commit.',
      },
    ],
    outcome:
      "The copilot shipped to a pilot cohort in week six and to all users within the quarter. Session length and course completion both moved. When we rolled off, NookTek's own team shipped the next two AI features without us — which is exactly how we measure success.",
    results: [
      { value: '6 wks', label: 'from kickoff to first AI feature live' },
      { value: '+18%', label: 'course completion in the copilot cohort' },
      { value: '2', label: "AI features shipped by NookTek's own team after handover" },
    ],
    tech: ['AWS', 'Snowflake', 'LLM APIs', 'RAG', 'React', 'dbt'],
  },
  {
    slug: 'radix-housing-analytics',
    category: 'Real Estate · Real-Time Data Engineering',
    title: 'Real-time residential housing analytics for Radix',
    summary:
      "Built a production pipeline that streams real-time data from external sources, transforms and stores it, and powers live dashboards embedded on Radix's website.",
    metricValue: 3,
    metricSuffix: ' wks',
    metricCaption: 'to live streaming dashboards in production',
    scene: 'radix',
    intro:
      "A production data-engineering pipeline that streams live data from external sources, transforms and stores it, and powers real-time analytics dashboards embedded directly on Radix's website — built and shipped in three weeks.",
    client: 'Radix — residential real estate',
    engagement: 'Forward-deployed data engineering',
    timeline: '3 weeks to live dashboards in production',
    challenge:
      'Radix needed to turn a constant flow of external housing-market data into something their team — and their website visitors — could act on immediately. The data lived in disparate external sources, arrived continuously, and had no pipeline to land it anywhere usable. Decisions were being made on stale snapshots, and there was nothing live to show on the company’s own site.',
    buildIntro:
      'An AcePointe engineer embedded with Radix and delivered a complete real-time data-engineering implementation:',
    build: [
      {
        term: 'Streaming ingestion',
        detail:
          'real-time capture of data from multiple external housing-market sources, resilient to source outages and schema drift.',
      },
      {
        term: 'Transformation & storage',
        detail:
          'a pipeline that cleans, transforms, and stores incoming data in a warehouse structured for low-latency analytical queries.',
      },
      {
        term: 'Real-time dashboards',
        detail: 'live analytics dashboards surfacing housing metrics as they update, with no manual refresh.',
      },
      {
        term: 'Embedded on the website',
        detail:
          "the dashboards were published directly onto Radix's website, putting real-time analytics in front of the team and their visitors for immediate decision-making.",
      },
    ],
    outcome:
      'In three weeks Radix went from no pipeline to live, always-current analytics driving decisions and displayed publicly on their site. The team now watches the market move in real time instead of waiting on periodic reports — and the pipeline runs in their own environment.',
    results: [
      { value: '3 wks', label: 'from kickoff to live dashboards in production' },
      { value: 'Real-time', label: 'streaming analytics, no manual refresh' },
      { value: 'Live', label: 'dashboards embedded on the company website' },
    ],
    tech: ['Streaming', 'ETL', 'Data warehouse', 'Real-time dashboards', 'Web embed'],
  },
];

export const getCaseStudy = (slug: string) => caseStudies.find((c) => c.slug === slug);
