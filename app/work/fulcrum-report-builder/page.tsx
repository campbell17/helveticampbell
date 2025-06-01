import React from 'react';
import FulcrumReportBuilderContent from '../../components/projects/FulcrumReportBuilderContent';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Fulcrum Report Builder | Data Visualization Platform | Tim Campbell',
  description: 'Designing an intuitive report builder that enables users to create custom reports and visualizations from their field data.',
};

export default function FulcrumReportBuilderPage() {
  return (
    <div className="project-page">
      <FulcrumReportBuilderContent />
    </div>
  );
} 