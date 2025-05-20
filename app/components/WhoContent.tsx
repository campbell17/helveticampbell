'use client'

import { H1, H2, H3 } from './Typography'
import Image from 'next/image'
import Link from 'next/link'
import { ProjectOpener } from '../hooks/useOpenProject'
import { Tooltip } from './Tooltip'
import ContactModal from './ContactModal'
import { useState } from 'react'
import { PersonStructuredData } from './StructuredDataManager'

export default function WhoContent() {
  const [contactModalOpen, setContactModalOpen] = useState(false)

  const openContactModal = (e: React.MouseEvent) => {
    e.preventDefault()
    setContactModalOpen(true)
  }

  return (
    <div className="container-narrow px-4 sm:px-6 md:px-8 xl:px-0">
      <PersonStructuredData />
      <H1>Tim Campbell</H1>
      
      <div className="subheading">
        A history of my design career, two ways.
      </div>

      {/* Profile image  */}
      <div className="block md:hidden aspect-[4/4] -scale-x-100 relative rounded-[var(--container-radius)] overflow-hidden bg-white/30 mb-12">
        <Image
          src="/images/tim.jpg"
          alt="Tim Campbell"
          width={1000}
          height={1000}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="transition-all duration-200"
        />
      </div>
      <H2 className="mb-8">The Short Version</H2>

      <ul className="space-y-4 list-disc list-outside ml-5">
        <li>
          I was the sole designer on <Link href="https://www.fulcrumapp.com" target="_blank" rel="noopener noreferrer">Fulcrum</Link> for its first 10 years while it grew from an idea on a whiteboard to $12M+ in ARR with 2,000+ customers.
        </li>
        <li>
          This included web app, mobile Apps, branding, marketing website, print materials.
        </li>
        <li>
          I&apos;m comfortable working with Rails, HTML, CSS, as well as JS/React. They didn&apos;t ask me to learn how to code. I did it to speed us up. 
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
      <p>Fourteen years ago, a geospatial technology company named <Tooltip content="Open Project"><Link href="#" onClick={(e) => {e.preventDefault(); ProjectOpener.openSpatialNetworks()}}> Spatial Networks</Link></Tooltip> hired me as their 12th employee and first designer. They needed... everything. My title was UI Designer, but I did it all, online and in print. But we&apos;ll come back to that.</p>
      <p>Before that, I founded a design agency called Whiteshark Creations with an engineering colleague. We worked with some great clients in our first year, but I realized agency life wasn&apos;t my calling and I left for other design pursuits.</p>
      <p>Prior to going solo, my design career began its infancy, when Macromedia was still a household name and Web 2.0 was hitting it&apos;s bubbly prime. I started as a web designer at an online travel operator called Tourico Holidays (now HotelBeds) and this is where I first clapped eyes on naked HTML & CSS. We had dedicated developers to write all the code, but started learning and practicing to satisfy my curiosity. But it wasn't until my first year working at Spatial Networks that I would feel the power of <code className="pane no-hover text-xl p-2 rounded-md border border-dashed border-[var(--color-border)]">git push origin master</code>.</p>
      <p>When you&apos;re the only designer for a company with big ambitions, being a generalist is mandatory. I have sketchbooks with pages chock full of logos, mobile app screens, mobile app icons, and trade show pull-up banners for offshoots of ideas that didn&apos;t (and never would) exist.</p>
      <p>I loved it.</p>
      <p>But what I loved most was working on the web apps and the marketing websites. Since we were so small, everyone had to be trusted to make what they were doing count without much (or any) oversight. This was the first time I was encouraged to simply address the customer problem and build. There was no time for hand-wringing.</p>
      <p>We took a few cracks at different product ideas. <Tooltip content="Open Project"><Link href="#" onClick={(e) => {e.preventDefault(); ProjectOpener.openAllinspections()}}> Allinspections</Link></Tooltip>, the product I was actually hired to help create, couldn&apos;t find its niche and had to be sunsetted after 18 months. The CEO called me into his office. I was proud of the work we did, but when he told me we had to shut it down, I worried that would be our final meeting. Instead, he offered me the opportunity to head up something new: Fulcrum.</p>
      <p>Since 2012, this has been the flagship product of Spatial Networks and my number one source of design activity. Unlike prior attempts, Fulcrum struck just the right balance of utility, ease of use, customizability, and extensibility. We were still super lean back then, but now we had people counting on our product. It felt so good to talk to customers about their issues and ideas and be able to mesh them with ours to give their companies leverage just from using our software.</p>
      <p>Since then, we grew every month, steady as a rock. We found product market fit. Our founders understood the importance of keeping the team tight. People who didn&apos;t perform didn&apos;t last. I was responsible the strategy and design for the marketing website, the web app, and the mobile app, all while continuing to support the corporate design materials and marketing for our parent company. It&apos;s wild to compare how we operate now with what we achieved back then with so little, but what I learned about the importance of shipping fast to keep the feedback loop tight was invaluable.</p>
      <p>Now, the next chapter of my career is upon me and I'm on the lookout for what lies ahead. If you need help designing and building beautiful, usable software, get in touch.</p>
      <p><Link href="#contact" onClick={openContactModal} className="text-gray-500 hover:text-black transition-colors inline">Let's have a conversation</Link>.</p>

      {/* Contact Modal */}
      <ContactModal isOpen={contactModalOpen} onClose={() => setContactModalOpen(false)} />
    </div>
  )
} 