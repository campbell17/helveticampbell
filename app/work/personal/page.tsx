import React from 'react';
import PersonalContent from '../../components/projects/PersonalContent';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Art | Personal Work | Tim Campbell',
  description: 'I studied traditional illustration and photography before I became a designer and I still practice when I can.',
};

export default function PersonalPage() {
  return (
    <div className="project-page">
      <PersonalContent />
    </div>
  );
} 