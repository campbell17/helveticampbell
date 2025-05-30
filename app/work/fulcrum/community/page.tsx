import React from 'react';
import FulcrumCommunityContent from '../../../components/projects/FulcrumCommunityContent';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Fulcrum Community | Crisis Response Platform | Tim Campbell',
  description: 'Designing tools that help emergency response teams coordinate effectively during natural disasters, humanitarian crises, and community emergencies.',
};

export default function FulcrumCommunityPage() {
  return (
    <div className="project-page">
      <FulcrumCommunityContent />
    </div>
  );
} 