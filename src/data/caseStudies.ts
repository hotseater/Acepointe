export type SceneId = 'insurance' | 'healthcare' | 'nooktek' | 'radix' | 'portal' | 'app';

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

export const caseStudies: CaseStudy[] = [
  {
    slug: 'nooktek-registration',
    category: 'Education · Forward-Deployed Engineering',
    title: 'Automating student registration at NookTek',
    summary:
      'Two forward-deployed engineers turned a two-hour manual registration into a two-minute automated flow — from application to interview questions to enrollment.',
    metricValue: 60,
    metricSuffix: '×',
    metricCaption: 'faster registration (2 hrs → 2 min)',
    scene: 'nooktek',
    intro:
      'A two-hour manual registration — application, screening, interview prep, enrollment — rebuilt into a two-minute automated pipeline that runs itself.',
    client: 'NookTek — education technology company (nooktek.com)',
    engagement: 'Forward-deployed team of 2',
    timeline: 'Weeks to production',
    challenge:
      'Registering a new student was a two-hour manual slog: staff re-keyed data from the external application form, prepared interview questions by hand, and set each student up across systems. At an average of 20 students per cohort, onboarding ate days of staff time — and the bottleneck capped how fast NookTek could grow.',
    buildIntro: 'Our engineers embedded with NookTek and automated the pipeline end to end:',
    build: [
      {
        term: 'Application capture',
        detail: 'pulls each submission straight from the external website form — no re-keying.',
      },
      {
        term: 'Automated interview questions',
        detail: 'generates tailored interview questions for each applicant automatically.',
      },
      {
        term: 'One-click enrollment',
        detail: "registers the student across NookTek's systems in a single automated flow.",
      },
      {
        term: 'Two minutes, start to finish',
        detail: 'the whole journey — application to enrolled — completes in about two minutes.',
      },
    ],
    outcome:
      'Registration went from two hours to two minutes per student — roughly 60× faster, and about 39 staff-hours reclaimed on every 20-student cohort. Staff moved from data entry to actually supporting students, and enrollment stopped being a growth bottleneck.',
    results: [
      { value: '60×', label: 'faster registration (2 hours → 2 minutes)' },
      { value: '~39 hrs', label: 'staff time saved per 20-student cohort' },
      { value: '98%', label: 'less manual admin time' },
    ],
    tech: ['Python', 'Workflow automation', 'LLM APIs', 'API integrations'],
  },
  {
    slug: 'icare-voice-ai',
    category: 'Healthcare · AI Consulting',
    title: 'Voice AI documentation for iCare Health Services',
    summary:
      'Replaced manual clinical documentation across 16 facilities with a conversational voice AI — cutting daily paperwork by 76% and closing compliance gaps.',
    metricValue: 76,
    metricSuffix: '%',
    metricCaption: 'less time on documentation',
    scene: 'healthcare',
    intro:
      'Conversational voice AI that lets staff speak their incident, progress, communication, and intake reports — captured, structured, auto-filled from the system of record, and filed hands-free across 16 facilities.',
    client: 'iCare Health Services (icarehealth.com) — 16 facilities',
    engagement: 'AI consulting + forward-deployed build',
    timeline: 'Live across 16 facilities',
    challenge:
      'Across 16 facilities, staff hand-filled incident reports, progress reports, communication logs, and intake forms — about five hours of documentation a day per facility. Under the load, forms got missed, creating compliance exposure. Manual paperwork was taxing time, effort, and audit-readiness all at once.',
    buildIntro: 'We built a conversational voice AI documentation system, embedded in their workflow:',
    build: [
      {
        term: 'Conversational capture',
        detail: 'staff speak the report; the AI captures it and structures it into the right form.',
      },
      {
        term: 'Source-of-truth integration',
        detail: 'connected to their system of record to pull and auto-fill known information.',
      },
      {
        term: 'Voice-ID security',
        detail: 'each employee is authenticated by voice, so records are secure and attributable.',
      },
      {
        term: 'Accessibility by design',
        detail: 'hands-free operation makes documentation faster and more accessible for every employee.',
      },
    ],
    outcome:
      'Daily documentation dropped from five hours to 1.2 hours per facility — a 76% cut, and roughly 61 staff-hours reclaimed every day across all 16 facilities. Forms stopped slipping through the cracks, so compliance improved right alongside the time savings.',
    results: [
      { value: '76%', label: 'less time on documentation (5 → 1.2 hrs/day per facility)' },
      { value: '~61 hrs', label: 'staff time reclaimed per day across 16 facilities' },
      { value: '16', label: 'facilities live, with stronger compliance' },
    ],
    tech: ['Conversational voice AI', 'Speech-to-text', 'LLM structuring', 'Voice biometrics', 'System integration'],
  },
  {
    slug: 'unif-analytics',
    category: 'Public Sector · Real-Time Analytics',
    title: 'Real-time lab analytics for Unif',
    summary:
      'Replaced a four-hour manual pipeline with instant ingestion and streaming — lab results now reach embedded dashboards for government reviewers in under seven seconds.',
    metricValue: 7,
    metricSuffix: ' sec',
    metricCaption: 'lab result to live dashboard (was 4 hrs)',
    scene: 'radix',
    intro:
      "An end-to-end streaming pipeline that ingests lab results the moment they're collected and renders them in embedded, real-time dashboards for external government reviewers — in under seven seconds.",
    client: 'Unif',
    engagement: 'Forward-deployed data engineering',
    timeline: 'Weeks to production',
    challenge:
      "Government representatives needed to analyze lab results in Unif's web portal — but getting data there took at least four hours. Results were transcribed by hand from paper forms, an ETL job was kicked off to load reporting tables, and dashboards were refreshed manually. With a minimum of 50 lab results a day, reviewers were always looking at stale data.",
    buildIntro: 'We built a real-time, end-to-end data pipeline:',
    build: [
      {
        term: 'Instant ingestion',
        detail: 'captures lab results and pertinent details straight from the collection center — no paper transcription.',
      },
      {
        term: 'Streaming transform',
        detail: 'cleans and streams the data into reporting tables continuously, replacing the batch ETL.',
      },
      {
        term: 'Embedded real-time dashboards',
        detail: "live reports embedded in Unif's web portal for external government reviewers — no manual refresh.",
      },
      {
        term: 'Under seven seconds',
        detail: 'from a result at the collection center to a visible number on the dashboard.',
      },
    ],
    outcome:
      'The four-hour, manual, error-prone path collapsed to under seven seconds of automated streaming. Reviewers now analyze lab data in real time instead of waiting hours, and the 50+ results a day flow in without a single manual step.',
    results: [
      { value: '< 7 sec', label: 'from lab result to live dashboard (was 4+ hours)' },
      { value: 'Real-time', label: 'streaming, embedded for government reviewers' },
      { value: '50+/day', label: 'lab results ingested with zero manual entry' },
    ],
    tech: ['Streaming ingestion', 'Real-time ETL', 'Data warehouse', 'Embedded dashboards', 'Web portal integration'],
  },
  {
    slug: 'brightcover-lead-generation',
    category: 'Insurance · AI Lead Generation',
    title: 'AI lead generation for Brightcover Solutions',
    summary:
      "An AI-driven pipeline that finds and personalizes high-intent life-insurance leads — growing Brightcover's qualified pipeline well beyond word of mouth.",
    metricValue: 10,
    metricSuffix: '×',
    metricCaption: 'more qualified leads than word-of-mouth',
    scene: 'insurance',
    intro:
      'An AI-driven lead-generation engine that finds quality life-insurance prospects and personalizes outreach that converts — replacing a word-of-mouth pipeline with a predictable one.',
    client: 'Brightcover Solutions (brightcoversolutions.com) — life insurance, Avondale, AZ',
    engagement: 'Forward-deployed engineering',
    timeline: 'Live in production',
    challenge:
      'Brightcover offers term, whole, universal, and final-expense life insurance with a genuinely personalized approach — but new business ran almost entirely on word of mouth, averaging about two leads a month. The offering was strong; the pipeline to reach the right families simply was not there.',
    buildIntro: 'We built an AI-driven lead-generation engine tuned to their book of business:',
    build: [
      {
        term: 'Quality-lead sourcing',
        detail: 'identifies prospects who match the profiles most likely to convert to a policy.',
      },
      {
        term: 'Personalized outreach',
        detail: "tailors the message to each prospect's situation — the personal touch Brightcover is known for, at scale.",
      },
      {
        term: 'Intent scoring',
        detail: 'ranks leads by likelihood to convert so the team works the best conversations first.',
      },
    ],
    outcome:
      "Word of mouth gave way to a targeted, personalized pipeline — growing Brightcover's qualified leads roughly 10×, from about two a month to a consistent, convertible flow the team can actually work.",
    results: [
      { value: '~10×', label: 'more qualified leads vs. the word-of-mouth baseline' },
      { value: '2 → 20+', label: 'qualified leads per month' },
      { value: 'Higher', label: 'conversion via personalized, intent-scored outreach' },
    ],
    tech: ['AI lead scoring', 'Personalization', 'Data enrichment', 'Outreach automation'],
  },
  {
    slug: 'nooktek-portal',
    category: 'Education · Web & App Development',
    title: 'A student portal for the full NookTek journey',
    summary:
      'A comprehensive student portal that unifies the entire NookTek experience — courses, attendance, grades, the interview process, and mentorship — in one seamless place.',
    metricValue: 1,
    metricSuffix: ' login',
    metricCaption: 'for the whole student journey',
    scene: 'portal',
    intro:
      'A comprehensive student portal that brings the entire NookTek experience — courses, attendance, grades, the interview process, and mentorship — into a single, seamless place.',
    client: 'NookTek — education technology company (nooktek.com)',
    engagement: 'Forward-deployed web development',
    timeline: 'Weeks to production',
    challenge:
      "NookTek's students juggled their courses, grades, attendance, interview process, and mentorship across disconnected tools and touchpoints. The experience was fragmented, and staff spent time stitching it together by hand.",
    buildIntro: 'We built a comprehensive student portal covering the whole journey:',
    build: [
      { term: 'Courses & content', detail: 'students access their coursework and materials in one place.' },
      { term: 'Attendance & grades', detail: 'live attendance and grades, always up to date.' },
      { term: 'Interview process', detail: 'the registration and interview journey, tracked end to end.' },
      { term: 'Mentorship', detail: 'connects students with mentors as part of the same experience.' },
    ],
    outcome:
      'Students now manage their entire experience — from courses to mentorship — in one portal, and NookTek runs it themselves. A fragmented, manual experience became a single seamless one.',
    results: [
      { value: '1 login', label: 'for courses, grades, attendance, interviews & mentorship' },
      { value: 'End-to-end', label: 'the full student journey in one place' },
      { value: 'Self-run', label: 'owned and operated by NookTek' },
    ],
    tech: ['React', 'Node', 'TypeScript', 'Auth', 'PostgreSQL'],
  },
  {
    slug: 'seatstep-app',
    category: 'Consumer App · Mobile Development',
    title: 'SeatStep — gate-to-seat navigation app',
    summary:
      'A cross-platform mobile app that walks fans the last hundred metres — turn-by-turn from the turnstile to their exact seat, with a live map, AR wayfinding, and their crew on the map inside.',
    metricValue: 3,
    metricSuffix: '',
    metricCaption: 'ways to find your seat — list, live map, AR',
    scene: 'app',
    intro:
      'A cross-platform mobile app that walks fans the last hundred metres every other app gives up on — turn-by-turn from the turnstile to their exact row and seat, with a live concourse map, AR wayfinding, and their crew on the map inside.',
    client: 'SeatStep (seatstep.app)',
    engagement: 'Forward-deployed app development',
    timeline: 'Launching on iOS & Android',
    challenge:
      "Maps get fans to the stadium and quit. Inside — 80,000 people, no signal, kickoff in four minutes — they're stuck between sections reading signs that don't help, and their friends are lost somewhere in the same crowd.",
    buildIntro: 'We built the SeatStep mobile app for iOS and Android:',
    build: [
      {
        term: 'Gate-to-seat navigation',
        detail: 'turn-by-turn from the turnstile to the exact row and seat, counting down every step.',
      },
      {
        term: 'Three ways to find it',
        detail: 'a glanceable step list, a live concourse map that redraws as you walk, and an AR arrow over the real world.',
      },
      {
        term: 'Find your crew',
        detail: 'puts friends on the venue map inside, so "where are you?!" stops being a shouting match.',
      },
      {
        term: 'Amenities & rewards',
        detail: 'amenities ranked by your seat, plus vendor vouchers you spend at the stands.',
      },
    ],
    outcome:
      'SeatStep turns the chaotic last hundred metres into a guided walk — list, map, or AR — and keeps groups together inside the venue. Built cross-platform for iOS and Android, launching soon.',
    results: [
      { value: '3', label: 'wayfinding modes: list, live map, AR' },
      { value: 'iOS + Android', label: 'built cross-platform from one codebase' },
      { value: 'Gate → seat', label: 'the whole walk, guided end to end' },
    ],
    tech: ['React Native', 'Expo', 'AR', 'Real-time location', 'iOS', 'Android'],
  },
];

export const getCaseStudy = (slug: string) => caseStudies.find((c) => c.slug === slug);
