'use client'

import Link from 'next/link'
import React from 'react'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { H1, Caption, H2, H3, Overline } from './Typography'
import Image from 'next/image'
import Testimonials from './Testimonials'
import { useState } from 'react'
import { projectDetails } from '../data/projectDetails'
import WorkItem from './WorkItem'
import { PortfolioStructuredData } from './StructuredDataManager'

// Work images from Sidebar component
const workImages = [
  // Gallery 1: My Work
  { src: "/images/work/isolated/iso-fulcrum-icon.png", alt: "Fulcrum", projectKey: "Fulcrum", gallery: 1 },
  { src: "/images/work/isolated/iso-sni-icon.jpg", alt: "Spatial Networks", projectKey: "Spatial Networks", gallery: 1 },
  { src: "/images/work/isolated/iso-divide-logo.jpg", alt: "Divide for PS4", projectKey: "Divide", gallery: 1 },
  { src: "/images/work/isolated/iso-allinspections-icon-alt.jpg", alt: "Allinspections", projectKey: "Allinspections", gallery: 1 },
  { src: "/images/work/gridded/grid-icons-all.jpg", alt: "Branding", projectKey: "Branding", gallery: 1 },
  // { src: "/images/work/full/full-personal-drawing-1.jpg", alt: "Personal/Misc", projectKey: "Personal", gallery: 1 },
];

export default function WorkContent() {
  return (
    <div className="container-narrow px-4 sm:px-6 md:px-8 xl:px-0">
      <PortfolioStructuredData 
        name="Tim Campbell's Portfolio Work"
        description="Design and development work by Tim Campbell, including Fulcrum app, Spatial Networks, Divide for PS4, and more."
        image="https://helveticampbell.com/images/work/isolated/iso-fulcrum-icon.png"
        url="https://helveticampbell.com/work"
      />
      
      <H1>Work</H1>

      <div className="subheading">
        See a few examples of my work, learn how I got my start, and hear what it's like to work with me from the people who have.
      </div>

      <div className="flex flex-col gap-20">
        <div>
          {/* Work gallery grid  */}
          <div className="@container mb-16">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 md:gap-8">
              {workImages.map((image, index) => (
                <WorkItem
                  key={index}
                  image={image}
                />
              ))}
            </div>
          </div>
        </div>
        
        <div>
          <H2 className="mb-8">How It All Started</H2>
          <div className="mt-12">
            <p>I went to art school where I majored in illustration and photography.</p>
            <p>After graduation I worked in sporting goods. A great start, I know.</p>
            <p>I spent my days fitting people for running shoes (I was damn good, by the way) and my nights working on my design portfolio. Despite the BFA in my posession and my love for making beautiful images, I never felt comfortable pursuing how to make money with my art. The idea of something so personal and subjective being scrutinized by someone else never squared with me.</p>
            <p>But I was always technically sharp, and to me design was more technical. If someone needed a logo, no problem. &ldquo;Logos cost this much&rdquo;. I fell in love with design because it was the perfect combination of drawing a sublime portrait and troubleshooting my neighbor's Dell. </p>
            <p>Design careers of the early 2000's always kicked off with logos, flyers, posters, and brochures... so many brochures. In the beginning it was mostly print, with some corporate Powerpoint decks thrown in. When I started, web design was still young. But I kept my eye on it and dabbled where I could and eventually, it's all I did.</p>
            <p>If design called to my logical side, the web as a medium called to my preternatural lust for improvement. When I sent that file entitled "business-card-CEO-front_final-final2.pdf" to the printer for that run of 10,000, clicking 'send' was what I like to refer to as a Pampers™ moment. On the web, however, I could fix a typo faster than that same PDF would load in Adobe Acrobat. I'm not condoning sloppiness, of course. Pampers™ are expensive.</p>            
            <p><Link href="/who">Read more about my work history.</Link></p>
          </div>
        </div>
        
        <div>
          {/* Working with Tim */}
          <div className="flex flex-col">
            <H2>What It's Like to Work With Me</H2>
            <Testimonials className="mt-12"/>
          </div>
        </div>
      </div>
    </div>
  )
} 