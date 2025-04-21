'use client'

import { H1, H2, H3 } from '../components/Typography'
import Image from 'next/image'
import Link from 'next/link'

export default function HomePage() {
  return (
    <>
      <H1>Tim Campbell</H1>
      
      <div className="subheading">
        The TL;DR and the TL;S<em>(still)</em>R.
      </div>

      <H2 className="mb-8">The Short Version</H2>

      <ul className="space-y-4 list-disc list-outside ml-5">
        <li>
          I was the sole designer on <Link href="https://www.fulcrumapp.com" target="_blank" rel="noopener noreferrer" className="text-teal-600">Fulcrum</Link> for its first 10 years while it grew from a simple idea to $12M+ ARR with 2,000+ customers.
        </li>
        <li>
          This included web app, mobile Apps, branding, marketing website, print materials.
        </li>
        <li>
          I&apos;m used to working with Rails, HTML, CSS, as well as JS/React. They didn&apos;t ask me to learn how to code. I did it to speed us up. 
        </li>
        <li>
          In addition to working on Fulcrum, I was also solely responsible for designing and shipping the branding, website, and print / trade show materials for our parent company, Spatial Networks.
        </li>
        <li>
          I write for fun. You can read what I publish on <Link href="https://campbellseventeen.substack.com" target="_blank" rel="noopener noreferrer" className="text-teal-600">Substack</Link>.
        </li>
        <li>
          I enjoy sports and I love Formula 1. I haven&apos;t missed a race in 25 years.
        </li>
      </ul>

      <H2 className="mb-8">For Brevity Haters</H2>
      <p>Fourteen years ago, a geospatial technology company named Spatial Networks(popover) hired me as their 12th employee and first designer. They needed... everything. My title was UI Designer, but I did it all, online and in print. But we&apos;ll come back to that.</p>
      <p>Before that, I founded a design agency called Whiteshark Creations(popover) with an engineering colleague. We worked with some great clients(popover) in our first year, but I realized agency life wasn&apos;t my calling and I left for other design pursuits.</p>
      <p>Prior to going solo, my design career began its infancy, when Macromedia was still a household name and Web 2.0 was hitting it&apos;s bubbly prime. I started as a web designer at an online travel operator called Tourico Holidays (now HotelBeds) (popover) and this is where I first clapped eyes on naked HTML & CSS. We had dedicated developers to write all the code, but started learning and practicing to satisfy my curiosity. But it wasn't until my first year working at Spatial Networks that I would feel the power of `git push origin master`(code).</p>
      <p>When you&apos;re the only designer for a company with big ambitions, becoming a generalist is a matter of survival. I have sketchbooks with pages chock full of logos, mobile app screens, mobile app icons, and trade show pull-up banners for offshoots of ideas that didn&apos;t (and never would) exist.</p>
      <p>I loved it.</p>
      <p>But what I loved most was working on the web apps and the marketing websites. Since we were so small, everyone had to be trusted to make what they were doing count without much (or any) oversight. This was the first time I was encouraged to simply address the customer problem and build. There was no time for hand-wringing.</p>
      <p>We took a few cracks at different product ideas. Allinspections, the product I was actually hired to help create, couldn&apos;t find its niche and had to be sunsetted after 18 months. The CEO called me into his office. I was proud of the work we did, but when he told me we had to shut it down, I worried that would be our final meeting. Instead, he offered me the opportunity to head up something new: Fulcrum.(popover)</p>
      <p>Since 2012, this has been the flagship product of Spatial Networks and my number one source of design activity. Unlike prior attempts, Fulcrum struck just the right balance of utility, ease of use, customizability, and extensibility. We were still super lean back then, but now we had people counting on our product. It felt so good to talk to customers about their issues and ideas and be able to mesh them with ours to give their companies leverage just from using our software.</p>
      <p>Since then, we grew every month, steady as a rock. We found product market fit. Our founders understood the importance of keeping the team tight. People who didn&apos;t perform didn&apos;t last. I was responsible the strategy and design for the marketing website, the web app, and the mobile app, all while continuing to support the corporate design materials and marketing for our parent company. It&apos;s wild to compare how we operate now with what we achieved back then with so little, but what I learned about the importance of shipping fast to keep the feedback loop tight was invaluable.</p>

    </>
  )
} 