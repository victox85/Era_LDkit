import { createLens } from "ldkit";
import { ldOptions } from "./ldkit";
import {
  TunnelSchema,
  TrackSchema,
  ContactLineSystemSchema,
  SectionOfLineSchema,
} from "./schemas";
import type {Tunnel, Track,  ContactLineSystem, SectionOfLine, } from "./schemas";


export const SectionOfLines = createLens(SectionOfLineSchema, ldOptions);
export const Tunnels = createLens(TunnelSchema, ldOptions);
export const Tracks = createLens(TrackSchema, ldOptions);

export const ContactLineSystems = createLens(ContactLineSystemSchema, ldOptions);

export type { Tunnel, Track, SectionOfLine, ContactLineSystem,};