import React from 'react';
import { H1, Overline } from '../../components/Typography';
import Image from 'next/image';
import { Metadata } from 'next';
import ArchiveGallery from './ArchiveGallery';

interface ImageData {
  src: string;
  alt: string;
  aspectRatio?: string;
  fullWidth?: boolean;
  categories?: string[];
}

export const metadata: Metadata = {
  title: 'Branding | Logo Design & Identity | Tim Campbell',
  description: 'Various logo and identity work.',
};

// Images data - organized by category
const images: ImageData[] = [
  // === WEB CATEGORY ===
  { src: "/images/work/browser/browser-fulcrum-app-dashboard-prototype.jpg", alt: "Fulcrum app dashboard prototype", aspectRatio: "288/175", categories: ["web"] },
  { src: "/images/work/browser/browser-fulcrum-groups-prototype.jpg", alt: "Fulcrum groups prototype", aspectRatio: "288/175", categories: ["web"] },
  { src: "/images/work/browser/browser-fulcrum-members-prototype.jpg", alt: "Fulcrum members prototype", aspectRatio: "288/175", categories: ["web"] },
  { src: "/images/work/browser/browser-fulcrum-app-builder-prototype.jpg", alt: "Fulcrum app builder prototype", aspectRatio: "288/175", categories: ["web"] },
  { src: "/images/work/browser/browser-fulcrum-app-builder-prototype.png", alt: "Fulcrum app builder prototype PNG", aspectRatio: "288/175", categories: ["web"] },
  { src: "/images/work/browser/browser-fulcrum-modern-apps-empty.jpg", alt: "Fulcrum modern apps empty state", aspectRatio: "288/175", categories: ["web"] },
  { src: "/images/work/browser/browser-fulcrum-modern-builder-empty.jpg", alt: "Fulcrum modern builder empty state", aspectRatio: "288/175", categories: ["web"] },
  { src: "/images/work/browser/browser-fulcrum-modern-builder-selected.jpg", alt: "Fulcrum modern builder selected state", aspectRatio: "288/175", categories: ["web"] },
  { src: "/images/work/browser/browser-fulcrum-modern-apps-context.jpg", alt: "Fulcrum modern apps context menu", aspectRatio: "288/175", categories: ["web"] },
  { src: "/images/work/browser/browser-fulcrum-modern-apps-list.jpg", alt: "Fulcrum modern apps list", aspectRatio: "288/175", categories: ["web"] },
  { src: "/images/work/browser/browser-fulcrum-modern-dataviewer.jpg", alt: "Fulcrum modern data viewer", aspectRatio: "288/175", categories: ["web"] },
  { src: "/images/work/browser/browser-sni-2019-5.jpg", alt: "SNI 2019 screenshot 5", aspectRatio: "8/7", categories: ["web"] },
  { src: "/images/work/browser/browser-sni-2019-4.jpg", alt: "SNI 2019 screenshot 4", aspectRatio: "8/7", categories: ["web"] },
  { src: "/images/work/browser/browser-sni-2019-3.jpg", alt: "SNI 2019 screenshot 3", aspectRatio: "8/7", categories: ["web"] },
  { src: "/images/work/browser/browser-sni-2019-2.jpg", alt: "SNI 2019 screenshot 2", aspectRatio: "8/7", categories: ["web"] },
  { src: "/images/work/browser/browser-sni-2019-1.jpg", alt: "SNI 2019 screenshot 1", aspectRatio: "8/7", categories: ["web"] },
  { src: "/images/work/browser/browser-sni-2017.jpg", alt: "SNI 2017 screenshot", aspectRatio: "8/7", categories: ["web"] },
  { src: "/images/work/browser/browser-sni-2013.jpg", alt: "SNI 2013 screenshot", aspectRatio: "8/7", categories: ["web"] },
  { src: "/images/work/browser/browser-sni-foresight-1.jpg", alt: "SNI Foresight screenshot", aspectRatio: "8/7", categories: ["web"] },
  { src: "/images/work/browser/browser-feat-travel-2.jpg", alt: "FEAT Travel screenshot 2", aspectRatio: "8/7", categories: ["web"] },
  { src: "/images/work/browser/browser-feat-travel-1.jpg", alt: "FEAT Travel screenshot 1", aspectRatio: "8/7", categories: ["web"] },
  { src: "/images/work/browser/browser-tilton-4.jpg", alt: "Tilton screenshot 4", aspectRatio: "8/7", categories: ["web"] },
  { src: "/images/work/browser/browser-tilton-3.jpg", alt: "Tilton screenshot 3", aspectRatio: "8/7", categories: ["web"] },
  { src: "/images/work/browser/browser-tilton-2.jpg", alt: "Tilton screenshot 2", aspectRatio: "8/7", categories: ["web"] },
  { src: "/images/work/browser/browser-tilton-1.jpg", alt: "Tilton screenshot 1", aspectRatio: "8/7", categories: ["web"] },
  { src: "/images/work/browser/browser-sni-2011.jpg", alt: "SNI 2011 screenshot", aspectRatio: "8/7", categories: ["web"] },
  { src: "/images/work/browser/browser-allinspections-5.jpg", alt: "AllInspections screenshot 5", aspectRatio: "8/7", categories: ["web"] },
  { src: "/images/work/browser/browser-allinspections-0.jpg", alt: "AllInspections screenshot 0", aspectRatio: "8/7", categories: ["web"] },
  { src: "/images/work/browser/browser-allinspections-1.jpg", alt: "AllInspections screenshot 1", aspectRatio: "8/7", categories: ["web"] },
  { src: "/images/work/browser/browser-allinspections-4-6.jpg", alt: "AllInspections 4.6 screenshot", aspectRatio: "8/7", categories: ["web"] },
  { src: "/images/work/browser/browser-allinspections-4-5.jpg", alt: "AllInspections 4.5 screenshot", aspectRatio: "8/7", categories: ["web"] },
  { src: "/images/work/browser/browser-allinspections-4-4.jpg", alt: "AllInspections 4.4 screenshot", aspectRatio: "8/7", categories: ["web"] },
  { src: "/images/work/browser/browser-allinspections-4-3.jpg", alt: "AllInspections 4.3 screenshot", aspectRatio: "8/7", categories: ["web"] },
  { src: "/images/work/browser/browser-allinspections-4-2.jpg", alt: "AllInspections 4.2 screenshot", aspectRatio: "8/7", categories: ["web"] },
  { src: "/images/work/browser/browser-allinspections-4-1.jpg", alt: "AllInspections 4.1 screenshot", aspectRatio: "8/7", categories: ["web"] },
  { src: "/images/work/browser/browser-allinspections-2.jpg", alt: "AllInspections screenshot 2", aspectRatio: "8/7", categories: ["web"] },
  { src: "/images/work/browser/browser-allinspections-3.jpg", alt: "AllInspections screenshot 3", aspectRatio: "8/7", categories: ["web"] },
  // { src: "/images/work/full/full-fulcrum-tour-bg2.jpg", alt: "Fulcrum tour background 2", aspectRatio: "1", categories: ["web"] },
  // { src: "/images/work/full/full-fulcrum-groups-redundant2.jpg", alt: "Fulcrum groups redundant design 2", aspectRatio: "1", categories: ["web"] },
  // { src: "/images/work/full/full-fulcrum-groups-redundant.jpg", alt: "Fulcrum groups redundant design", aspectRatio: "1", categories: ["web"] },
  // { src: "/images/work/full/full-fulcrum-tour-bg.jpg", alt: "Fulcrum tour background", aspectRatio: "1", categories: ["web"] },
  // { src: "/images/work/full/full-fulcrum-members-original-stepper.jpg", alt: "Fulcrum members original stepper", aspectRatio: "1", categories: ["web"] },
  // { src: "/images/work/full/full-fulcrum-members-sketches.jpg", alt: "Fulcrum members sketches", aspectRatio: "1", categories: ["web"] },
  // { src: "/images/work/full/full-fulcrum-app-dashboard-sketches.jpg", alt: "Fulcrum app dashboard sketches", aspectRatio: "1", categories: ["web"] },

  // === PRINT CATEGORY ===
  { src: "/images/work/full/full-fulcrum-brochure-mini-mockup-cool.jpg", alt: "Fulcrum brochure mini mockup cool", aspectRatio: "1", categories: ["print"] },
  { src: "/images/work/full/full-allinspections-card-1.jpg", alt: "AllInspections card 1", aspectRatio: "1", categories: ["print"] },
  { src: "/images/work/full/full-divide-brochure-2.jpg", alt: "Divide brochure 2", aspectRatio: "1", categories: ["print", "gaming"] },
  { src: "/images/work/full/full-divide-brochure-1.jpg", alt: "Divide brochure 1", aspectRatio: "1", categories: ["print", "gaming"] },
  { src: "/images/work/full/full-fulcrum-PE-pitchdeck-9.jpg", alt: "Fulcrum PE pitch deck slide 9", aspectRatio: "16/9", categories: ["print"] },
  { src: "/images/work/full/full-fulcrum-PE-pitchdeck-8.jpg", alt: "Fulcrum PE pitch deck slide 8", aspectRatio: "16/9", categories: ["print"] },
  { src: "/images/work/full/full-fulcrum-PE-pitchdeck-7.jpg", alt: "Fulcrum PE pitch deck slide 7", aspectRatio: "16/9", categories: ["print"] },
  { src: "/images/work/full/full-fulcrum-PE-pitchdeck-6.jpg", alt: "Fulcrum PE pitch deck slide 6", aspectRatio: "16/9", categories: ["print"] },
  { src: "/images/work/full/full-fulcrum-PE-pitchdeck-5.jpg", alt: "Fulcrum PE pitch deck slide 5", aspectRatio: "16/9", categories: ["print"] },
  { src: "/images/work/full/full-fulcrum-PE-pitchdeck-4.jpg", alt: "Fulcrum PE pitch deck slide 4", aspectRatio: "16/9", categories: ["print"] },
  { src: "/images/work/full/full-fulcrum-PE-pitchdeck-3.jpg", alt: "Fulcrum PE pitch deck slide 3", aspectRatio: "16/9", categories: ["print"] },
  { src: "/images/work/full/full-fulcrum-PE-pitchdeck-2.jpg", alt: "Fulcrum PE pitch deck slide 2", aspectRatio: "16/9", categories: ["print"] },
  { src: "/images/work/full/full-fulcrum-PE-pitchdeck-1.jpg", alt: "Fulcrum PE pitch deck slide 1", aspectRatio: "16/9", categories: ["print"] },
  { src: "/images/work/full/full-fulcrum-brochure-mini-mockup.jpg", alt: "Fulcrum brochure mini mockup", aspectRatio: "1", categories: ["print"] },
  { src: "/images/work/full/full-allinspections-card-2.jpg", alt: "AllInspections card 2", aspectRatio: "1", categories: ["print"] },
  { src: "/images/work/full/full-sni-ad-2.jpg", alt: "SNI advertisement 2", aspectRatio: "1", categories: ["print"] },
  { src: "/images/work/full/full-sni-flyer-1.jpg", alt: "SNI flyer 1", aspectRatio: "1", categories: ["print"] },
  { src: "/images/work/full/full-sni-ad-1.jpg", alt: "SNI advertisement 1", aspectRatio: "1", categories: ["print"] },
  { src: "/images/work/full/full-fulcrum-ad-2.jpg", alt: "Fulcrum advertisement 2", aspectRatio: "835/1000", categories: ["print"] },
  { src: "/images/work/full/full-fulcrum-brochure-mini-2.jpg", alt: "Fulcrum brochure mini 2", aspectRatio: "1", categories: ["print"] },
  { src: "/images/work/full/full-fulcrum-brochure-mini-1.jpg", alt: "Fulcrum brochure mini 1", aspectRatio: "1", categories: ["print"] },
  { src: "/images/work/full/full-allinspections-brochure.jpg", alt: "AllInspections brochure", aspectRatio: "1", categories: ["print"] },
  { src: "/images/work/full/full-allinspections-double-ad.jpg", alt: "AllInspections double advertisement", aspectRatio: "1", categories: ["print"] },
  // { src: "/images/work/full/full-fulcrum-ad-1.jpg", alt: "Fulcrum advertisement 1", aspectRatio: "1", categories: ["print"] },
  // { src: "/images/work/full/full-fulcrum-tradeshow.jpg", alt: "Fulcrum tradeshow display", aspectRatio: "1", categories: ["print"] },
  { src: "/images/work/full/full-fulcrum-book-fundamentals.jpg", alt: "Fulcrum book fundamentals", aspectRatio: "1", categories: ["print"] },
  { src: "/images/work/full/full-fulcrum-book-data.jpg", alt: "Fulcrum book data", aspectRatio: "1", categories: ["print"] },
  { src: "/images/work/full/full-fulcrum-book-cover.jpg", alt: "Fulcrum book cover", aspectRatio: "1", categories: ["print"] },
  { src: "/images/work/full/full-fulcrum-handout.jpg", alt: "Fulcrum handout", aspectRatio: "1", categories: ["print"] },
  // { src: "/images/work/full/full-allinspections-ad.jpg", alt: "AllInspections advertisement", aspectRatio: "1", categories: ["print"] },
  { src: "/images/work/isolated/iso-sni-tradeshow-booth.jpg", alt: "SNI tradeshow booth", aspectRatio: "1", categories: ["print"] },
  { src: "/images/work/isolated/iso-fulcrum-package.jpg", alt: "Fulcrum package", aspectRatio: "1", categories: ["print"] },
  { src: "/images/work/isolated/iso-fulcrum-pullup-1.jpg", alt: "Fulcrum pullup banner 1", aspectRatio: "1", categories: ["print"] },
  { src: "/images/work/isolated/iso-allinspections-pullup-3.jpg", alt: "AllInspections pullup banner 3", aspectRatio: "1", categories: ["print"] },
  { src: "/images/work/isolated/iso-allinspections-pullup-2-alt.jpg", alt: "AllInspections pullup banner 2 alt", aspectRatio: "1", categories: ["print"] },
  { src: "/images/work/isolated/iso-allinspections-pullup-2.jpg", alt: "AllInspections pullup banner 2", aspectRatio: "1", categories: ["print"] },
  { src: "/images/work/isolated/iso-allinspections-pullup-1.jpg", alt: "AllInspections pullup banner 1", aspectRatio: "1", categories: ["print"] },
  { src: "/images/work/isolated/iso-fulcrum-packaging-holidaybox.jpg", alt: "Fulcrum packaging holiday box", aspectRatio: "2/1", categories: ["print"] },
  { src: "/images/work/isolated/iso-divide-vestige-sticker.jpg", alt: "Divide Vestige sticker", aspectRatio: "1", categories: ["branding", "gaming", "print"] },

  // === PHOTO CATEGORY ===
  { src: "/images/work/full/full-personal-photo-64.png", alt: "Personal photo 64", aspectRatio: "3/2", categories: ["photo"] },
  { src: "/images/work/full/full-personal-photo-59.png", alt: "Personal photo 59", aspectRatio: "3/2", categories: ["photo"] },
  { src: "/images/work/full/full-personal-photo-58.png", alt: "Personal photo 58", aspectRatio: "3/2", categories: ["photo"] },
  { src: "/images/work/full/full-personal-photo-54.jpg", alt: "Personal photo 54", aspectRatio: "3/2", categories: ["photo"] },
  { src: "/images/work/full/full-personal-photo-51.png", alt: "Personal photo 51", aspectRatio: "3/2", categories: ["photo"] },
  { src: "/images/work/full/full-personal-photo-47.png", alt: "Personal photo 47", aspectRatio: "3/2", categories: ["photo"] },
  { src: "/images/work/full/full-personal-photo-46.png", alt: "Personal photo 46", aspectRatio: "3/2", categories: ["photo"] },
  { src: "/images/work/full/full-personal-photo-45.png", alt: "Personal photo 45", aspectRatio: "3/2", categories: ["photo"] },
  { src: "/images/work/full/full-personal-photo-44.png", alt: "Personal photo 44", aspectRatio: "3/2", categories: ["photo"] },
  { src: "/images/work/full/full-personal-photo-42.png", alt: "Personal photo 42", aspectRatio: "3/2", categories: ["photo"] },
  { src: "/images/work/full/full-personal-photo-41.png", alt: "Personal photo 41", aspectRatio: "3/2", categories: ["photo"] },
  { src: "/images/work/full/full-personal-photo-36.png", alt: "Personal photo 36", aspectRatio: "3/2", categories: ["photo"] },
  { src: "/images/work/full/full-personal-photo-35.jpg", alt: "Personal photo 35", aspectRatio: "3/2", categories: ["photo"] },
  { src: "/images/work/full/full-personal-photo-33.png", alt: "Personal photo 33", aspectRatio: "3/2", categories: ["photo"] },
  { src: "/images/work/full/full-personal-photo-32.png", alt: "Personal photo 32", aspectRatio: "3/2", categories: ["photo"] },
  { src: "/images/work/full/full-personal-photo-31.jpg", alt: "Personal photo 31", aspectRatio: "3/2", categories: ["photo"] },
  { src: "/images/work/full/full-personal-photo-30.jpg", alt: "Personal photo 30", aspectRatio: "3/2", categories: ["photo"] },
  { src: "/images/work/full/full-personal-photo-25.jpg", alt: "Personal photo 25", aspectRatio: "3/2", categories: ["photo"] },
  { src: "/images/work/full/full-personal-photo-23.png", alt: "Personal photo 23", aspectRatio: "3/2", categories: ["photo"] },
  { src: "/images/work/full/full-personal-photo-22.jpg", alt: "Personal photo 22", aspectRatio: "3/2", categories: ["photo"] },
  { src: "/images/work/full/full-personal-photo-21.jpg", alt: "Personal photo 21", aspectRatio: "3/2", categories: ["photo"] },
  { src: "/images/work/full/full-personal-photo-19.png", alt: "Personal photo 19", aspectRatio: "3/2", categories: ["photo"] },
  { src: "/images/work/full/full-personal-photo-16.jpg", alt: "Personal photo 16", aspectRatio: "3/2", categories: ["photo"] },
  { src: "/images/work/full/full-personal-photo-13.png", alt: "Personal photo 13", aspectRatio: "3/2", categories: ["photo"] },
  { src: "/images/work/full/full-personal-photo-12.png", alt: "Personal photo 12", aspectRatio: "3/2", categories: ["photo"] },
  // { src: "/images/work/snapshots/snapshot-divide-recording-1.jpg", alt: "Divide recording session 1", aspectRatio: "1", categories: ["photo", "gaming"] },
  // { src: "/images/work/snapshots/snapshot-sni-tradeshow-1.jpg", alt: "SNI tradeshow photo 1", aspectRatio: "1", categories: ["photo"] },
  // { src: "/images/work/snapshots/snapshot-fulcrum-cw-onsite-fema-2.jpg", alt: "Fulcrum CW onsite FEMA 2", aspectRatio: "1", categories: ["photo"] },
  // { src: "/images/work/snapshots/snapshot-fulcrum-cw-onsite-fema-1.jpg", alt: "Fulcrum CW onsite FEMA 1", aspectRatio: "1", categories: ["photo"] },
  // { src: "/images/work/snapshots/snapshot-fulcrum-cw-office-2.jpg", alt: "Fulcrum CW office 2", aspectRatio: "1", categories: ["photo"] },
  // { src: "/images/work/snapshots/snapshot-fulcrum-cw-tradeshow.jpg", alt: "Fulcrum CW tradeshow", aspectRatio: "1", categories: ["photo"] },
  // { src: "/images/work/snapshots/snapshot-fulcrum-cw-early-swag.jpg", alt: "Fulcrum CW early swag", aspectRatio: "1", categories: ["photo"] },
  // { src: "/images/work/snapshots/snapshot-fulcrum-cw-office-1.jpg", alt: "Fulcrum CW office 1", aspectRatio: "1", categories: ["photo"] },

  // === BRANDING CATEGORY ===
  { src: "/images/work/isolated/iso-soteriqa-logo.jpg", alt: "Soteriqa logo", aspectRatio: "1", categories: ["branding"] },
  { src: "/images/work/isolated/iso-soteriqa-icon.jpg", alt: "Soteriqa icon", aspectRatio: "1", categories: ["branding"] },
  { src: "/images/work/isolated/iso-personal-murphys-garage.jpg", alt: "Murphy's Garage sticker", aspectRatio: "1", categories: ["branding"] },
  { src: "/images/work/isolated/iso-foresight-icon.jpg", alt: "Foresight icon", aspectRatio: "1", categories: ["branding"] },
  { src: "/images/work/isolated/iso-foresight-logo.jpg", alt: "Foresight logo", aspectRatio: "1", categories: ["branding"] },
  { src: "/images/work/isolated/iso-focusgeography-logo.jpg", alt: "Focus Geography logo", aspectRatio: "1", categories: ["branding"] },
  { src: "/images/work/isolated/iso-exploding-tuba-logo.jpg", alt: "Exploding Tuba Studios logo", aspectRatio: "1", categories: ["branding"] },
  { src: "/images/work/isolated/iso-exploding-tuba-icon.jpg", alt: "Exploding Tuba Studios icon", aspectRatio: "1", categories: ["branding"] },
  { src: "/images/work/isolated/iso-exploding-tuba-icon-alt.jpg", alt: "Exploding Tuba Studios icon alt", aspectRatio: "1", categories: ["branding"] },
  { src: "/images/work/isolated/iso-sni-icon-fall-tshirt.jpg", alt: "SNI icon fall t-shirt", aspectRatio: "1", categories: ["branding"] },
  { src: "/images/work/isolated/iso-sni-icon-fall.jpg", alt: "SNI icon fall", aspectRatio: "1", categories: ["branding"] },
  { src: "/images/work/isolated/iso-fulcrum-logo.jpg", alt: "Fulcrum logo", aspectRatio: "1", categories: ["branding"] },
  { src: "/images/work/isolated/iso-fulcrum-logo-live.jpg", alt: "Fulcrum logo live", aspectRatio: "1", categories: ["branding"] },
  { src: "/images/work/isolated/iso-fulcrum-logo-og.jpg", alt: "Fulcrum logo OG", aspectRatio: "1", categories: ["branding"] },
  { src: "/images/work/isolated/iso-fulcrum-icon-og.jpg", alt: "Fulcrum icon OG", aspectRatio: "1", categories: ["branding"] },
  { src: "/images/work/isolated/iso-sni-logo.jpg", alt: "Spatial Networks logo", aspectRatio: "1", categories: ["branding"] },
  { src: "/images/work/isolated/iso-liminallab-logo.jpg", alt: "Liminal Lab logo", aspectRatio: "1", categories: ["branding"] },
  { src: "/images/work/isolated/iso-allinspections-icon.jpg", alt: "AllInspections icon", aspectRatio: "1", categories: ["branding"] },
  { src: "/images/work/isolated/iso-fulcrum-sticker-2.jpg", alt: "Fulcrum sticker 2", aspectRatio: "1", categories: ["branding"] },
  { src: "/images/work/isolated/iso-fulcrum-button.jpg", alt: "Fulcrum button", aspectRatio: "1", categories: ["branding"] },
  { src: "/images/work/isolated/iso-fulcrum-sticker-1.jpg", alt: "Fulcrum sticker 1", aspectRatio: "1", categories: ["branding"] },
  { src: "/images/work/isolated/iso-cercana-logo.jpg", alt: "Cercana Systems logo", aspectRatio: "1", categories: ["branding"] },
  { src: "/images/work/isolated/iso-allinspections-logo.jpg", alt: "AllInspections logo", aspectRatio: "1", categories: ["branding"] },
  { src: "/images/work/isolated/iso-fulcrum-icon.jpg", alt: "Fulcrum icon", aspectRatio: "1", categories: ["branding"] },
  { src: "/images/work/isolated/iso-allinspections-icon-alt.jpg", alt: "AllInspections icon alt", aspectRatio: "1", categories: ["branding"] },
  { src: "/images/work/isolated/iso-sni-icon.jpg", alt: "Spatial Networks icon", aspectRatio: "1", categories: ["branding"] },
  { src: "/images/work/isolated/iso-cercana-icon.jpg", alt: "Cercana Systems icon", aspectRatio: "1", categories: ["branding"] },
  { src: "/images/work/isolated/iso-liminallab-icon.jpg", alt: "Liminal Lab icon", aspectRatio: "1", categories: ["branding"] },
  { src: "/images/work/isolated/iso-fulcrum-icon.png", alt: "Fulcrum icon PNG", aspectRatio: "1", categories: ["branding"] },
  { src: "/images/work/isolated/iso-cercana-logo-stacked.jpg", alt: "Cercana Systems logo stacked", aspectRatio: "1", categories: ["branding"] },
  { src: "/images/work/isolated/iso-divide-logo.jpg", alt: "Divide logo", aspectRatio: "1", categories: ["branding", "gaming"] },

  // === ART CATEGORY ===
  { src: "/images/work/full/full-personal-painting-4.jpg", alt: "Personal painting 4", aspectRatio: "1", categories: ["art"] },
  { src: "/images/work/full/full-personal-painting-3.jpg", alt: "Personal painting 3", aspectRatio: "1", categories: ["art"] },
  { src: "/images/work/full/full-personal-painting-2.jpg", alt: "Personal painting 2", aspectRatio: "1", categories: ["art"] },
  { src: "/images/work/full/full-personal-drawing-4.jpg", alt: "Personal drawing 4", aspectRatio: "1", categories: ["art"] },
  { src: "/images/work/full/full-personal-drawing-3.jpg", alt: "Personal drawing 3", aspectRatio: "1", categories: ["art"] },
  { src: "/images/work/full/full-personal-drawing-2.jpg", alt: "Personal drawing 2", aspectRatio: "1", categories: ["art"] },
  { src: "/images/work/full/full-personal-painting-1.jpg", alt: "Personal painting 1", aspectRatio: "1", categories: ["art"] },
  { src: "/images/work/full/full-personal-drawing-1.jpg", alt: "Personal drawing 1", aspectRatio: "1", categories: ["art"] },
  // { src: "/images/work/isolated/iso-personal-helmet-concept.jpg", alt: "Personal helmet concept", aspectRatio: "1", categories: ["art"] },

  // === GAMING CATEGORY ===
  { src: "/images/work/full/full-divide-screenshot-2.jpg", alt: "Divide game screenshot 2", aspectRatio: "1", categories: ["gaming"] },
  { src: "/images/work/full/full-divide-screenshot-1.jpg", alt: "Divide game screenshot 1", aspectRatio: "1", categories: ["gaming"] },
  { src: "/images/work/full/full-divide-ps4.jpg", alt: "Divide PS4 version", aspectRatio: "1", categories: ["gaming"] },
  { src: "/images/work/full/full-divide-ingame-world-3.jpg", alt: "Divide in-game world 3", aspectRatio: "2", categories: ["gaming"] },
  { src: "/images/work/full/full-divide-ingame-codex-4.jpg", alt: "Divide in-game codex 4", aspectRatio: "2", categories: ["gaming"] },
  { src: "/images/work/full/full-divide-ingame-codex-3.jpg", alt: "Divide in-game codex 3", aspectRatio: "2", categories: ["gaming"] },
  { src: "/images/work/full/full-divide-ingame-codex-1.jpg", alt: "Divide in-game codex 1", aspectRatio: "2", categories: ["gaming"] },
  { src: "/images/work/full/full-divide-ingame-codex-2.jpg", alt: "Divide in-game codex 2", aspectRatio: "2", categories: ["gaming"] },
  { src: "/images/work/full/full-divide-ingame-UI-2.jpg", alt: "Divide in-game UI 2", aspectRatio: "2", categories: ["gaming"] },
  { src: "/images/work/full/full-divide-ingame-UI-1.jpg", alt: "Divide in-game UI 1", aspectRatio: "2", categories: ["gaming"] },
  { src: "/images/work/full/full-divide-ingame-world-2.jpg", alt: "Divide in-game world 2", aspectRatio: "2", categories: ["gaming"] },
  { src: "/images/work/full/full-divide-ingame-world-1.jpg", alt: "Divide in-game world 1", aspectRatio: "2", categories: ["gaming"] },
  { src: "/images/work/full/full-divide-soundtrack.jpg", alt: "Divide soundtrack", aspectRatio: "1", categories: ["gaming"] },
  { src: "/images/work/full/full-divide-soundtrack-deluxe.jpg", alt: "Divide soundtrack deluxe", aspectRatio: "1", categories: ["gaming"] },
  { src: "/images/work/full/full-divide-soundtrack-ep.jpg", alt: "Divide soundtrack EP", aspectRatio: "1", categories: ["gaming"] },
];

export default function ArchivePage() {
  return (
    <div className="project-page">
      {/* Hero Image */}
      <div className="w-full -mt-18 bg-black">
        <div className="relative overflow-hidden flex justify-center items-center">
          <div className="relative">
            <Image 
              src="/images/work/hero/hero-archive.jpg"
              alt="Fulcrum Hero"
              width={1920}
              height={757}
              sizes="100vw"
              className="min-w-[1200px]"
              priority
            />
          </div>
        </div>
      </div>

      <div className="px-4 sm:px-6 pb-10 md:px-20">
        
        <H1 className="pt-16 !mb-0">Archive<span className="font-[200] block lg:inline"><span className="hidden lg:inline"> |</span> Everything All At Once</span></H1>
        <div className="flex flex-wrap mb-4">
          <p className="!text-[var(--text-color-light)]">Role: designer, developer, artist, maker...whatev-er</p>
        </div>
        <div className="flex flex-col lg:flex-row gap-12">
          <p className="!mb-0 lg:!mb-10 flex-1">I've never been any good at keeping my work documented. I have an aversion to busywork and keeping my portfolio up to date was always more opportunity cost than I wanted to pay.</p>
          <p className="flex-1">But I'm paying for it now with this disorganized train-wreck. I'm sure there are some projects missing, as well as some that are past their sell-by date, but these should be enough to get a sense of my aesthetic, anyway.</p>
        </div>

      </div>

      {/* Archive Gallery with Filters */}
      <ArchiveGallery images={images} />
    </div>
  );
} 