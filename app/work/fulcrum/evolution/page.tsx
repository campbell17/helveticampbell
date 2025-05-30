import React from 'react';
import FulcrumEvolutionContent from '../../../components/projects/FulcrumEvolutionContent';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Fulcrum Evolution | Product Development Journey | Tim Campbell',
  description: 'From a simple data collection tool to a comprehensive enterprise platform - the 13-year evolution of Fulcrum\'s user experience and feature set.',
};

export default function FulcrumEvolutionPage() {
  return (
    <div className="project-page">
      <FulcrumEvolutionContent />
    </div>
  );
} 