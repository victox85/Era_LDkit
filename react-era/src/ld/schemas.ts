import { era } from "./namespaces";
import { dc, rdfs, xsd, owl } from "ldkit/namespaces";







// Tipo Tunnel
export type Tunnel = {
  $id: string;       // siempre presente en los objetos devueltos
  label: string;
  inCountry: string;
  length: number;    // número, no string
};

export type Track = {
  $id: string;
  label: string;
  wheelSetGauge?: number;
  gaugingProfile?: string;
  railInclination?: number;
  maximumPermittedSpeed?: number;
};

export type InfrastructureElement = {
  $id: string;
  label: string;
  inCountry?: string;
  length?: number;
};

export type ContactLineSystem = {
  $id: string;
  label: string;
  contactLineSystemType?: string;
  energySupplySystem?: string;
  maximumTrainCurrent?: number;
};

export type SectionOfLine = {
  $id: string;
  label: string;
  inCountry?: string;
  length?: number;
  track?: string; // IRI del Track asociado
};


export const TunnelSchema = {
  "@type": era.Tunnel,
  label: rdfs.label,
  inCountry: era.inCountry,
  length: {
    "@id": era.lengthOfTunnel,
    "@type": xsd.decimal,
  },
} as const;
export const TrackSchema = {
  "@type": era.Track,
  label: rdfs.label,
  wheelSetGauge: { "@id": era.wheelSetGauge, "@type": xsd.decimal },
  gaugingProfile: { "@id": era.gaugingProfile },
  railInclination: { "@id": era.railInclination, "@type": xsd.decimal },
  maximumPermittedSpeed: { "@id": era.maximumPermittedSpeed, "@type": xsd.decimal },
} as const;



export const InfrastructureElementSchema = {
  "@type": era.InfrastructureElement,
  label: rdfs.label,
  inCountry: era.inCountry, 
  length: { "@id": era.length, "@type": xsd.decimal },
} as const;




export const ContactLineSystemSchema = {
  "@type": era.ContactLineSystem,
  label: rdfs.label,
  contactLineSystemType: { "@id": era.contactLineSystemType },
  energySupplySystem: { "@id": era.energySupplySystem },
} as const;

export const SectionOfLineSchema = {
  "@type": era.SectionOfLine,
  label: rdfs.label,
  inCountry: { "@id": era.inCountry },
  length: { "@id": era.length, "@type": xsd.decimal },
  track: { "@id": era.track }, // relación a Track
} as const;




