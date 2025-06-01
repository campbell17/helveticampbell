import React from 'react';
import FulcrumLinesAndPolygonsContent from '../../components/projects/FulcrumLinesAndPolygonsContent';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Fulcrum Lines & Polygons | GIS Feature Development | Tim Campbell',
  description: 'A shift in company focus back to our GIS roots - developing line and polygon geometry capabilities for Fulcrum\'s data collection platform.',
};

export default function FulcrumLinesAndPolygonsPage() {
  return (
    <div className="project-page">
      <FulcrumLinesAndPolygonsContent />
    </div>
  );
} 