import React from 'react';
import FulcrumDataContent from '../../../components/projects/FulcrumDataContent';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Fulcrum Data Viewer | Data Management Platform | Tim Campbell',
  description: 'Designing intuitive data management tools that help organizations make sense of millions of field records through powerful visualization, filtering, and export capabilities.',
};

export default function FulcrumDataPage() {
  return (
    <div className="project-page">
      <FulcrumDataContent />
    </div>
  );
} 