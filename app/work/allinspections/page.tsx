import React from 'react';
import AllinspectionsContent from '../../components/projects/AllinspectionsContent';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Allinspections | Inspection Management Software | Tim Campbell',
  description: 'Inspection management software focused on the home inspections market. I led the design of the branding, marketing, web & mobile apps, and environmental/tradeshow materials.',
};

export default function AllinspectionsPage() {
  return (
    <div className="project-page">
      <AllinspectionsContent />
    </div>
  );
} 