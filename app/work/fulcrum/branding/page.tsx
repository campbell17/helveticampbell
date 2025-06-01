import React from 'react';
import FulcrumLinesAndPolygonsContent from '../../../components/projects/FulcrumLinesAndPolygonsContent';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Fulcrum Lines & Polygons | Visual Identity & Evolution | Tim Campbell',
  description: 'Developing a cohesive visual identity that evolved with the company from startup to enterprise platform, including logos, marketing materials, and brand guidelines.',
};

export default function FulcrumBrandingPage() {
  return (
    <div className="project-page">
      <FulcrumLinesAndPolygonsContent />
    </div>
  );
} 