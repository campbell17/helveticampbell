'use client'

import React, { useState, useEffect, useRef } from 'react';
import { H3 } from '../Typography';

interface StatItem {
  name: string;
  stat: string;
}

interface TimelineStatsProps {
  stats: StatItem[];
}

export default function TimelineStats({ stats }: TimelineStatsProps) {
  const [isTimelineVisible, setIsTimelineVisible] = useState(false);
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentRef = timelineRef.current
    if (!currentRef) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsTimelineVisible(true)
          observer.disconnect() // Stop observing once animation is triggered
        }
      },
      { threshold: 0.3 } // Trigger when 30% of the element is visible
    )

    observer.observe(currentRef)

    return () => {
      observer.disconnect()
    }
  }, [])

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12" ref={timelineRef}>
      {stats.map((item, index) => (
        <div key={item.name} className="bg-white dark:bg-neutral-900 p-6 rounded-lg border border-neutral-200 dark:border-neutral-700">
          <div className="mb-4">
            <div className="w-full bg-neutral-200 dark:bg-neutral-700 rounded-full h-3">
              <div 
                className={`${index === 0 ? 'bg-rose-500' : 'bg-lime-500'} h-3 rounded-full ${
                  isTimelineVisible 
                    ? `animate-[timeline-grow_0.75s_ease-out_${index === 0 ? '0.25s' : '0.5s'}_both]`
                    : 'w-0'
                }`}
              ></div>
            </div>
          </div>
          <H3 className="!text-2xl !font-bold mb-2">{item.stat}</H3>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">{item.name}</p>
        </div>
      ))}
    </div>
  );
} 