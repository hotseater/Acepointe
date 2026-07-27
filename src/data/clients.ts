import type { ImageMetadata } from 'astro';
import radix from '../assets/logos/radix.png';
import esperta from '../assets/logos/esperta-health.png';
import hookes from '../assets/logos/hookes-consult.png';
import nooktek from '../assets/logos/nooktek.png';
import unif from '../assets/logos/unif.png';
import hotseat from '../assets/logos/hotseat.svg';
import icare from '../assets/logos/icare.png';

export interface Client {
  name: string;
  logo: ImageMetadata;
}

export const clients: Client[] = [
  { name: 'Radix', logo: radix },
  { name: 'Esperta Health', logo: esperta },
  { name: 'Hookes Consult', logo: hookes },
  { name: 'NookTek', logo: nooktek },
  { name: 'Unif', logo: unif },
  { name: 'Hotseat', logo: hotseat },
  { name: 'iCare Health Services', logo: icare },
];
