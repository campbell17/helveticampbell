import React from 'react';
import SpatialNetworksContent from '../../components/projects/SpatialNetworksContent';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Spatial Networks | Geospatial Intelligence Platform | Tim Campbell',
  description: 'Geospatial intelligence specializing in technology, analytics, and ground-truthing. I led design for all aspects of the company, including marketing, branding, and product design of its software products.',
};

export default function SpatialNetworksPage() {
  return (
    <div className="project-page">
      <SpatialNetworksContent />
    </div>
  );
} 