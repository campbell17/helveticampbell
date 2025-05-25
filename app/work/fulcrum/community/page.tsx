import React from 'react';
import FulcrumContent from '../../../components/projects/FulcrumContent';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Fulcrum Community | Crisis Response Platform | Tim Campbell',
  description: 'As the primary designer for Fulcrum, I led the product\'s visual and user experience evolution, helping build it into a comprehensive enterprise field operations platform used by thousands of organizations worldwide.',
};

export default function FulcrumCommunityPage() {
  return (
    <div className="project-page">
      <FulcrumContent />
    </div>
  );
} 