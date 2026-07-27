export const compareColumns = [
  'Large systems integrators',
  'AI platform vendors',
  'Staffing & nearshore',
] as const;

export interface CompareRow {
  label: string;
  ace: string;
  si: string;
  platform: string;
  staffing: string;
}

export const compareRows: CompareRow[] = [
  {
    label: 'Who shows up',
    ace: 'Senior forward-deployed engineers embedded in your team, start to finish.',
    si: 'Large rotating teams; the pitch team is rarely the delivery team.',
    platform: 'Platform engineers focused on deploying their product.',
    staffing: 'Individual contractors you manage yourself.',
  },
  {
    label: 'Time to production',
    ace: 'Working software in weeks — we ship early and iterate in your environment.',
    si: 'Multi-quarter programs; discovery and design phases before any code.',
    platform: 'Fast — if your problem fits their platform.',
    staffing: 'Depends entirely on your own management and architecture.',
  },
  {
    label: 'Engagement model',
    ace: 'Outcome-scoped engagements sized for mid-market budgets.',
    si: 'Hourly rates with $500K+ minimums; incentives favor longer engagements.',
    platform: 'Platform licenses plus services; recurring fees.',
    staffing: 'Hourly or monthly rates per head.',
  },
  {
    label: 'What you own after',
    ace: 'Everything — code, platform, and docs. We plan our own exit from day one.',
    si: 'Deliverables, plus a dependency on the integrator to run them.',
    platform: 'Workflows tied to their platform; switching is costly.',
    staffing: 'Code of varying quality, no institutional knowledge.',
  },
  {
    label: 'Breadth',
    ace: 'Strategy through production: data platform, AI, apps, and UX under one roof.',
    si: 'Very broad, but coordinated across separate practices.',
    platform: 'Deep on their product, narrow beyond it.',
    staffing: 'Only the skills you hire, one head at a time.',
  },
];
