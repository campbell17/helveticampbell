import React from 'react';
import FulcrumContent from '../components/projects/FulcrumContent';
import SpatialNetworksContent from '../components/projects/SpatialNetworksContent';
import AllinspectionsContent from '../components/projects/AllinspectionsContent';
import DivideContent from '../components/projects/DivideContent';
import BrandingContent from '../components/projects/BrandingContent';
import PersonalContent from '../components/projects/PersonalContent';
import { projectTags } from './projectTags';

// Interfaces moved from ProjectSidebar.tsx
export interface ImageData {
  src: string;
  alt: string;
  caption?: string;
  fullWidth?: boolean;
  gallery?: number;
  aspectRatio?: string;
}

export interface ProjectDetails {
  content?: React.ComponentType<any>; // Reference to a component type
  images?: ImageData[];
  tags?: string[];
  description?: string;
  coverImage?: string;
  heading?: string;
  headingAlt?: string;
  subheading?: string;
}

// Project data moved from ProjectSidebar.tsx
export const projectDetails: Record<string, ProjectDetails> = {
  "Fulcrum": {
    content: FulcrumContent, 
    images: [
      // { src: "/images/work/isolated/iso-fulcrum-icon-og.jpg", alt: "Fulcrum Icon OG" },
      // { src: "/images/work/isolated/iso-fulcrum-logo.jpg", alt: "Fulcrum Logo" },
      // { src: "/images/work/isolated/iso-fulcrum-logo-og.jpg", alt: "Fulcrum Logo OG" },
      // { src: "/images/work/isolated/iso-fulcrum-logo-live.jpg", alt: "Fulcrum Logo Live" },
      { src: "/images/work/browser/browser-fulcrum-modern-builder-empty.jpg", alt: "Fulcrum Modern Builder Empty", aspectRatio: "100/60" },
      { src: "/images/work/browser/browser-fulcrum-modern-builder-selected.jpg", alt: "Fulcrum Modern Builder Selected", aspectRatio: "100/60" },
      { src: "/images/work/browser/browser-fulcrum-modern-apps-empty.jpg", alt: "Fulcrum Modern Apps Empty", aspectRatio: "100/60" },
      { src: "/images/work/browser/browser-fulcrum-modern-apps-context.jpg", alt: "Fulcrum Modern Apps Context", aspectRatio: "100/60" },
      { src: "/images/work/browser/browser-fulcrum-modern-apps-list.jpg", alt: "Fulcrum Modern Apps List", aspectRatio: "100/60" },
      { src: "/images/work/browser/browser-fulcrum-modern-dataviewer.jpg", alt: "Fulcrum Modern Dataviewer", aspectRatio: "100/60" },
      { src: "/images/work/snapshots/snapshot-fulcrum-cw-office-1.jpg", alt: "Fulcrum CW Office 1" },
      { src: "/images/work/snapshots/snapshot-fulcrum-cw-office-2.jpg", alt: "Fulcrum CW Office 2" },
      { src: "/images/work/snapshots/snapshot-fulcrum-cw-onsite-fema-1.jpg", alt: "Fulcrum CW Onsite FEMA 1" },
      { src: "/images/work/snapshots/snapshot-fulcrum-cw-onsite-fema-2.jpg", alt: "Fulcrum CW Onsite FEMA 2" },
      { src: "/images/work/full/full-fulcrum-brochure-mini-1.jpg", alt: "Fulcrum Brochure Mini 1" },
      { src: "/images/work/full/full-fulcrum-brochure-mini-2.jpg", alt: "Fulcrum Brochure Mini 2" },
      { src: "/images/work/full/full-fulcrum-brochure-mini-mockup.jpg", alt: "Fulcrum Brochure Mini Mockup" },
      { src: "/images/work/full/full-fulcrum-ad-2.jpg", alt: "Fulcrum Ad 2" },
      { src: "/images/work/full/full-fulcrum-book-cover.jpg", alt: "Fulcrum Book Cover" },
      { src: "/images/work/full/full-fulcrum-book-fundamentals.jpg", alt: "Fulcrum Book Fundamentals" },
      { src: "/images/work/full/full-fulcrum-book-data.jpg", alt: "Fulcrum Book Data" },
      { src: "/images/work/isolated/iso-fulcrum-pullup-1.jpg", alt: "Fulcrum Pullup 1" },
      { src: "/images/work/snapshots/snapshot-fulcrum-cw-tradeshow.jpg", alt: "Fulcrum CW Tradeshow" },
      { src: "/images/work/snapshots/snapshot-fulcrum-cw-early-swag.jpg", alt: "Fulcrum CW Early Swag" },
      { src: "/images/work/isolated/iso-fulcrum-package.jpg", alt: "Fulcrum Package" },
      { src: "/images/work/isolated/iso-fulcrum-sticker-1.jpg", alt: "Fulcrum Sticker 1" },
      { src: "/images/work/isolated/iso-fulcrum-sticker-2.jpg", alt: "Fulcrum Sticker 2" },
      { src: "/images/work/isolated/iso-fulcrum-button.jpg", alt: "Fulcrum Button" },
      { src: "/images/work/isolated/iso-fulcrum-packaging-holidaybox.jpg", alt: "Fulcrum Holiday Box", aspectRatio: "100/50" },
      { src: "/images/work/full/full-fulcrum-handout.jpg", alt: "Fulcrum Handout", fullWidth: true, aspectRatio: "100/64" },
      { src: "/images/work/gridded/grid-fulcrum-buildericons-v3.jpg", alt: "Fulcrum Builder Icons v3" },
    ],
    tags: projectTags["Fulcrum"],
    description: "As the primary designer for Fulcrum, I led the product's visual and user experience evolution, helping build it into a comprehensive enterprise field operations platform used by thousands of organizations worldwide.",
    coverImage: "/images/work/index/work-index-fulcrum.jpg",
    heading: "Fulcrum",
    headingAlt: "Field Operations Platform",
    subheading: "As the primary designer for Fulcrum, I led the product's visual and user experience evolution, helping build it into a comprehensive enterprise field operations platform used by thousands of organizations worldwide.",
  },
  "Spatial Networks": {
    content: SpatialNetworksContent, 
    images: [
      { src: "/images/work/isolated/iso-sni-icon.jpg", alt: "Spatial Networks Icon" },
      { src: "/images/work/isolated/iso-sni-logo.jpg", alt: "Spatial Networks Logo" },
      { src: "/images/work/isolated/iso-sni-icon-fall.jpg", alt: "Spatial Networks Icon fall" },
      { src: "/images/work/isolated/iso-sni-icon-fall-tshirt.jpg", alt: "Spatial Networks Icon fall tshirt" },
      { src: "/images/work/browser/browser-sni-2011.jpg", alt: "Spatial Networks 2011 Site", aspectRatio: "1440/1261" },
      { src: "/images/work/browser/browser-sni-2013.jpg", alt: "Spatial Networks 2013 Site", aspectRatio: "1440/1261" },
      { src: "/images/work/browser/browser-sni-2017.jpg", alt: "Spatial Networks 2017 Site", aspectRatio: "1440/1261" },
      { src: "/images/work/browser/browser-sni-2019-1.jpg", alt: "Spatial Networks 2019 Site 1", aspectRatio: "1440/1261" },
      { src: "/images/work/browser/browser-sni-2019-3.jpg", alt: "Spatial Networks 2019 Site 3", aspectRatio: "1440/1261" },
      { src: "/images/work/browser/browser-sni-2019-4.jpg", alt: "Spatial Networks 2019 Site 4", aspectRatio: "1440/1261" },
      { src: "/images/work/browser/browser-sni-2019-5.jpg", alt: "Spatial Networks 2019 Site 5", aspectRatio: "1440/1261" },
      { src: "/images/work/browser/browser-sni-foresight-1.jpg", alt: "Spatial Networks Foresight", aspectRatio: "1440/1261" },
      { src: "/images/work/full/full-sni-ad-1.jpg", alt: "Spatial Networks Ad 1" },
      { src: "/images/work/full/full-sni-ad-2.jpg", alt: "Spatial Networks Ad 2" },
      { src: "/images/work/isolated/iso-sni-tradeshow-booth.jpg", alt: "Spatial Networks Tradeshow booth" },
      { src: "/images/work/snapshots/snapshot-sni-tradeshow-1.jpg", alt: "Spatial Networks Tradeshow" },
    ],
    tags: projectTags["Spatial Networks"],
    description: "Rebranding and digital presence for a geospatial intelligence company.",
    coverImage: "/images/work/full/full-sni-ad-1.jpg",
    heading: "Spatial Networks",
    headingAlt: "Geospatial Intelligence Platform",
    subheading: "Geospatial intelligence specializing in technology, analytics, and ground-truthing. I led design for all aspects of the company, including marketing, branding, and product design of its software products.",
  },
  "Divide": {
    content: DivideContent, 
    images: [
      { src: "/images/work/isolated/iso-divide-logo.jpg", alt: "Divide Logo" },
      { src: "/images/work/isolated/iso-divide-vestige-sticker.jpg", alt: "Divide Vestige Sticker" },
      { src: "/images/work/full/full-divide-ingame-world-1.jpg", alt: "Divide In-Game World 1", aspectRatio: "10/5" },
      { src: "/images/work/full/full-divide-ingame-world-2.jpg", alt: "Divide In-Game World 2", aspectRatio: "10/5" },
      { src: "/images/work/full/full-divide-ingame-world-3.jpg", alt: "Divide In-Game World 3", aspectRatio: "10/5" },
      { src: "/images/work/full/full-divide-ingame-UI-1.jpg", alt: "Divide In-Game UI 1", aspectRatio: "10/5" },
      { src: "/images/work/full/full-divide-ingame-UI-2.jpg", alt: "Divide In-Game UI 2", aspectRatio: "10/5" },
      { src: "/images/work/full/full-divide-ingame-codex-1.jpg", alt: "Divide In-Game Codex 1", aspectRatio: "10/5" },
      { src: "/images/work/full/full-divide-ingame-codex-2.jpg", alt: "Divide In-Game Codex 2", aspectRatio: "10/5" },
      { src: "/images/work/full/full-divide-ingame-codex-3.jpg", alt: "Divide In-Game Codex 3", aspectRatio: "10/5" },
      { src: "/images/work/full/full-divide-ingame-codex-4.jpg", alt: "Divide In-Game Codex 4", aspectRatio: "10/5" },
      { src: "/images/work/full/full-divide-brochure-1.jpg", alt: "Divide Brochure 1" },
      { src: "/images/work/full/full-divide-brochure-2.jpg", alt: "Divide Brochure 2" },
      { src: "/images/work/full/full-divide-ps4.jpg", alt: "Divide PS4" },
      { src: "/images/work/gridded/grid-divide-icons.jpg", alt: "Divide Icons" },
      { src: "/images/work/full/full-divide-soundtrack.jpg", alt: "Divide Soundtrack" },
      { src: "/images/work/full/full-divide-soundtrack-deluxe.jpg", alt: "Divide Soundtrack Deluxe" },
      { src: "/images/work/full/full-divide-soundtrack-ep.jpg", alt: "Divide Soundtrack EP" },
      { src: "/images/work/snapshots/snapshot-divide-recording-1.jpg", alt: "Divide Recording Session" }
    ],
    tags: projectTags["Divide"],
    description: "UI design for a sci-fi action RPG exclusive to PlayStation 4.",
    coverImage: "/images/work/index/work-index-divide.jpg",
    heading: "Divide",
    headingAlt: "Action / Adventure Game (PS4)",
    subheading: "A character-driven, science fiction action/adventure game with a modern take on isometric adventures of the past. I designed the logo, UI assets, icons, menus, HUD, and map, as well as posters and branding for the in-game world.",
  },
  "Allinspections": {
    content: AllinspectionsContent, 
    images: [
      { src: "/images/work/isolated/iso-allinspections-icon.jpg", alt: "Allinspections Icon" },
      { src: "/images/work/isolated/iso-allinspections-logo.jpg", alt: "Allinspections Logo" },
      { src: "/images/work/isolated/iso-allinspections-pullup-1.jpg", alt: "Allinspections Pullup 1" },
      { src: "/images/work/isolated/iso-allinspections-pullup-2-alt.jpg", alt: "Allinspections Pullup 2 Alt" },
      { src: "/images/work/isolated/iso-allinspections-pullup-3.jpg", alt: "Allinspections Pullup 3" },
      { src: "/images/work/browser/browser-allinspections-0.jpg", alt: "Allinspections Site 1", aspectRatio: "1440/1261" },
      { src: "/images/work/browser/browser-allinspections-1.jpg", alt: "Allinspections Site 2", aspectRatio: "1440/1261" },
      { src: "/images/work/browser/browser-allinspections-2.jpg", alt: "Allinspections Site 3", aspectRatio: "1440/1261" },
      { src: "/images/work/browser/browser-allinspections-3.jpg", alt: "Allinspections Site 4", aspectRatio: "1440/1261" },
      { src: "/images/work/browser/browser-allinspections-4-1.jpg", alt: "Allinspections Site 5", aspectRatio: "1440/1261" },
      { src: "/images/work/browser/browser-allinspections-4-2.jpg", alt: "Allinspections Site 6", aspectRatio: "1440/1261" },
      { src: "/images/work/browser/browser-allinspections-4-3.jpg", alt: "Allinspections Site 7", aspectRatio: "1440/1261" },
      { src: "/images/work/browser/browser-allinspections-4-4.jpg", alt: "Allinspections Site 8", aspectRatio: "1440/1261" },
      { src: "/images/work/browser/browser-allinspections-4-5.jpg", alt: "Allinspections Site 9", aspectRatio: "1440/1261" },
      { src: "/images/work/browser/browser-allinspections-5.jpg", alt: "Allinspections Site 11", aspectRatio: "1440/1261" },
      { src: "/images/work/full/full-allinspections-brochure.jpg", alt: "Allinspections Brochure" },
      { src: "/images/work/full/full-allinspections-double-ad.jpg", alt: "Allinspections Double Ad" },
      { src: "/images/work/full/full-allinspections-card-1.jpg", alt: "Allinspections Card 1" },
      { src: "/images/work/full/full-allinspections-card-2.jpg", alt: "Allinspections Card 2" }
    ],
    tags: projectTags["Allinspections"],
    description: "Field inspection management platform for quality control teams.",
    coverImage: "/images/work/index/work-index-allinspections.jpg",
    heading: "Allinspections",
    headingAlt: "Inspection Management Software",
    subheading: "Inspection management software focused on the home inspections market. I led the design of the branding, marketing, web & mobile apps, and environmental/tradeshow materials.",
  },
  "Branding": {
    content: BrandingContent, 
    images: [
      { src: "/images/work/isolated/iso-liminallab-logo.jpg", alt: "Liminal Lab Logo" },
      { src: "/images/work/isolated/iso-cercana-logo.jpg", alt: "Cercana Systems Logo" },
      { src: "/images/work/isolated/iso-exploding-tuba-logo.jpg", alt: "Exploding Tuba Studios Logo" },      
      { src: "/images/work/isolated/iso-foresight-logo.jpg", alt: "Foresight Logo" },
      { src: "/images/work/isolated/iso-sni-logo.jpg", alt: "Spatial Networks Logo" },
      { src: "/images/work/isolated/iso-fulcrum-logo-og.jpg", alt: "Fulcrum Logo OG" },
      { src: "/images/work/isolated/iso-fulcrum-logo-live.jpg", alt: "Fulcrum Logo Live" },
      { src: "/images/work/isolated/iso-fulcrum-logo.jpg", alt: "Fulcrum Logo" },
      { src: "/images/work/isolated/iso-allinspections-logo.jpg", alt: "Allinspections Logo" },
      { src: "/images/work/isolated/iso-soteriqa-logo.jpg", alt: "Soteriqa Logo" },
      { src: "/images/work/isolated/iso-divide-logo.jpg", alt: "Divide Logo" },
      { src: "/images/work/isolated/iso-personal-murphys-garage.jpg", alt: "Murphy's Garage sticker" },
      { src: "/images/work/isolated/iso-liminallab-icon.jpg", alt: "Liminal Lab mark" },
      { src: "/images/work/isolated/iso-cercana-icon.jpg", alt: "Cercana Systems mark" },
      { src: "/images/work/isolated/iso-exploding-tuba-icon.jpg", alt: "Exploding Tuba Studios mark" },
      { src: "/images/work/isolated/iso-foresight-icon.jpg", alt: "Foresight Icon" },
      { src: "/images/work/isolated/iso-sni-icon.jpg", alt: "Spatial Networks Icon" },
      { src: "/images/work/isolated/iso-fulcrum-icon-og.jpg", alt: "Fulcrum Icon OG" },
      { src: "/images/work/isolated/iso-fulcrum-icon.jpg", alt: "Fulcrum Icon" },
      { src: "/images/work/isolated/iso-allinspections-icon.jpg", alt: "Allinspections Icon" },
      { src: "/images/work/isolated/iso-soteriqa-icon.jpg", alt: "Soteriqa Icon" },
      { src: "/images/work/isolated/iso-personal-helmet-concept.jpg", alt: "Helmet design concept" },

      // { src: "/images/work/browser/browser-tilton-1.jpg", alt: "Christilton.com", aspectRatio: "1440/1261" },
      // { src: "/images/work/browser/browser-feat-travel-1.jpg", alt: "Feattravel.com", aspectRatio: "1440/1261" },
      // { src: "/images/work/browser/browser-tilton-2.jpg", alt: "Christilton.com", aspectRatio: "1440/1261" },
      // { src: "/images/work/browser/browser-tilton-3.jpg", alt: "Christilton.com", aspectRatio: "1440/1261" },
      // { src: "/images/work/browser/browser-tilton-4.jpg", alt: "Christiltong.com", aspectRatio: "1440/1261" },
      
    ],
    tags: projectTags["Branding"],
    description: "Various logo and identity work.",
    coverImage: "/images/work/gridded/grid-icons-all.jpg",
    heading: "Branding",
    headingAlt: "Logo Design, Identity",
    subheading: "Logo and identity work from companies past and present.",
  },
  // "Personal": {
  //   content: PersonalContent, 
  //   images: [
  //     { src: "/images/work/full/full-personal-painting-1.jpg", alt: "Painting 1" },
  //     { src: "/images/work/full/full-personal-painting-2.jpg", alt: "Painting 2" },
  //     { src: "/images/work/full/full-personal-painting-3.jpg", alt: "Painting 3" },
  //     { src: "/images/work/full/full-personal-painting-4.jpg", alt: "Painting 4" },
  //     { src: "/images/work/full/full-personal-drawing-1.jpg", alt: "Drawing 1" },
  //     { src: "/images/work/full/full-personal-drawing-2.jpg", alt: "Drawing 2" },
  //     { src: "/images/work/full/full-personal-drawing-3.jpg", alt: "Drawing 3" },
  //     { src: "/images/work/full/full-personal-drawing-4.jpg", alt: "Drawing 4" },
  //     { src: "/images/work/full/full-personal-photo-12.png", alt: "Photo 12", aspectRatio: "3/2" },
  //     { src: "/images/work/full/full-personal-photo-13.png", alt: "Photo 13", aspectRatio: "3/2" },
  //     { src: "/images/work/full/full-personal-photo-16.jpg", alt: "Photo 16", aspectRatio: "3/2" },
  //     { src: "/images/work/full/full-personal-photo-19.png", alt: "Photo 19", aspectRatio: "3/2" },
  //     { src: "/images/work/full/full-personal-photo-21.jpg", alt: "Photo 21", aspectRatio: "3/2" },
  //     { src: "/images/work/full/full-personal-photo-22.jpg", alt: "Photo 22", aspectRatio: "3/2" },
  //     { src: "/images/work/full/full-personal-photo-23.png", alt: "Photo 23", aspectRatio: "3/2" },
  //     { src: "/images/work/full/full-personal-photo-25.jpg", alt: "Photo 25", aspectRatio: "3/2" },
  //     { src: "/images/work/full/full-personal-photo-31.jpg", alt: "Photo 31", aspectRatio: "3/2" },
  //     { src: "/images/work/full/full-personal-photo-32.png", alt: "Photo 32", aspectRatio: "3/2" },
  //     { src: "/images/work/full/full-personal-photo-33.png", alt: "Photo 33", aspectRatio: "3/2" },
  //     { src: "/images/work/full/full-personal-photo-35.jpg", alt: "Photo 35", aspectRatio: "3/2" },
  //     { src: "/images/work/full/full-personal-photo-36.png", alt: "Photo 36", aspectRatio: "3/2" },
  //     { src: "/images/work/full/full-personal-photo-41.png", alt: "Photo 41", aspectRatio: "3/2" },
  //     { src: "/images/work/full/full-personal-photo-42.png", alt: "Photo 42", aspectRatio: "3/2" }, 
  //     { src: "/images/work/full/full-personal-photo-44.png", alt: "Photo 44", aspectRatio: "3/2" },
  //     { src: "/images/work/full/full-personal-photo-45.png", alt: "Photo 45", aspectRatio: "3/2" },
  //     { src: "/images/work/full/full-personal-photo-46.png", alt: "Photo 46", aspectRatio: "3/2" },
  //     { src: "/images/work/full/full-personal-photo-47.png", alt: "Photo 47", aspectRatio: "3/2" },
  //     { src: "/images/work/full/full-personal-photo-51.png", alt: "Photo 51", aspectRatio: "3/2" },
  //     { src: "/images/work/full/full-personal-photo-54.jpg", alt: "Photo 54", aspectRatio: "3/2" },
  //     { src: "/images/work/full/full-personal-photo-58.png", alt: "Photo 58", aspectRatio: "3/2" },
  //     { src: "/images/work/full/full-personal-photo-59.png", alt: "Photo 59", aspectRatio: "3/2" },
  //     { src: "/images/work/full/full-personal-photo-64.png", alt: "Photo 64", aspectRatio: "3/2" },
  //   ],
  //   tags: projectTags["Personal"],
  //   description: "Selected works from my personal creative portfolio.",
  //   coverImage: "/images/work/full/full-personal-drawing-1.jpg",
  //   heading: "Art",
  //   headingAlt: "Personal Work",
  //   subheading: "I studied traditional illustration and photography before I became a designer and I still practice when I can.",
  // },
}; 