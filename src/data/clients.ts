import type { ImageMetadata } from 'astro';
import brightcover from '../assets/logos/brightcover.png';
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
  { name: 'Brightcover Solutions', logo: brightcover },
  { name: 'Hookes Consult', logo: hookes },
  { name: 'NookTek', logo: nooktek },
  { name: 'Unif', logo: unif },
  { name: 'Hotseat', logo: hotseat },
  { name: 'iCare Health Services', logo: icare },
];
