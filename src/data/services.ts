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
      'A team of 4 embedded at NookTek shipped their first AI feature in 6 weeks — and left their engineers running it.',
    featured: true,
  },
  {
    title: 'AI Consulting',
    desc: 'From use-case discovery to model selection and governance — a pragmatic path to AI that pays for itself.',
    example:
      'Took a healthcare network from "can voice AI work for us?" to a compliant incident-reporting system live in 6 facilities.',
    featured: true,
  },
  {
    title: 'Data Engineering & Architecture',
    desc: 'Modern, scalable data platforms — pipelines, warehousing, and integration built to grow with you.',
    example: 'Built a modern analytics platform for a healthcare institution on AWS, Airflow, and Snowflake.',
  },
  {
    title: 'Analytics & Visualization',
    desc: 'Dashboards and embedded analytics that turn raw data into decisions people actually make.',
    example: 'Interactive dashboards and embedded analytics for Hookes Consult, white-labeled for their own clients.',
  },
  {
    title: 'Web & App Development',
    desc: 'High-quality web and application development that puts your data products in front of users.',
    example: 'A self-service platform for an education institute where students manage their entire experience end to end.',
  },
  {
    title: 'UX/UI Design',
    desc: 'Interfaces designed around your users and your brand — because adoption is the real ROI.',
    example: 'Redesigned a client-reporting platform around fast, robust search — adoption doubled in the first month.',
  },
];
