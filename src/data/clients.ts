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
  /** Logo has its own dark background/tile — show in full color, skip the grayscale treatment. */
  dark?: boolean;
}

export const clients: Client[] = [
  { name: 'Brightcover Solutions', logo: brightcover, dark: true },
  { name: 'Hookes Consult', logo: hookes },
  { name: 'NookTek', logo: nooktek },
  { name: 'Unif', logo: unif },
  { name: 'Hotseat', logo: hotseat },
  { name: 'iCare Health Services', logo: icare },
];
