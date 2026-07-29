export interface Service {
  title: string;
  desc: string;
  example: string;
  /** Flagship services get emphasis treatment to break grid monotony. */
  featured?: boolean;
}

export const services: Service[] = [
  {
    title: 'Forward-Deployed Engineering',
    desc: 'Our engineers embed with your team to build and ship in your environment, not from the sidelines.',
    example:
      'Two engineers embedded at NookTek automated a two-hour student registration into a two-minute flow — 60× faster, ~39 staff-hours saved per cohort.',
    featured: true,
  },
  {
    title: 'AI Consulting',
    desc: 'From use-case discovery to model selection and governance — a pragmatic path to AI that pays for itself.',
    example:
      'Built a conversational voice AI for iCare Health Services that cut daily documentation across 16 facilities by 76% — and closed compliance gaps.',
    featured: true,
  },
  {
    title: 'Data Engineering & Architecture',
    desc: 'Modern, scalable data platforms — pipelines, warehousing, and integration built to grow with you.',
    example:
      'Built a real-time streaming pipeline for Unif — lab results reach live dashboards in under seven seconds, down from four hours of manual work.',
  },
  {
    title: 'Analytics & Visualization',
    desc: 'Dashboards and embedded analytics that turn raw data into decisions people actually make.',
    example:
      "Real-time dashboards embedded in Unif's web portal for government reviewers, updating the moment a lab result comes in.",
  },
  {
    title: 'Web & App Development',
    desc: 'High-quality web and application development that puts your data products in front of users.',
    example:
      'A comprehensive NookTek student portal — courses, grades, attendance, interviews, mentorship — and the SeatStep gate-to-seat navigation app for iOS & Android.',
  },
  {
    title: 'UX/UI Design',
    desc: 'Interfaces designed around your users and your brand — because adoption is the real ROI.',
    example:
      "Designed SeatStep's gate-to-seat experience — a turn-by-turn list, a live concourse map, and AR wayfinding for loud, crowded venues.",
  },
];
