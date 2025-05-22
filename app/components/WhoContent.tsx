'use client'

import { H1, H2, H3 } from './Typography'
import Image from 'next/image'
import Link from 'next/link'
import { ProjectOpener } from '../hooks/useOpenProject'
import { Tooltip } from './Tooltip'
import ContactModal from './ContactModal'
import { useState } from 'react'
import { PersonStructuredData } from './StructuredDataManager'
import { EnvelopeIcon, DocumentTextIcon } from '@heroicons/react/24/solid'

export default function WhoContent() {
  const [contactModalOpen, setContactModalOpen] = useState(false)

  const openContactModal = (e: React.MouseEvent) => {
    e.preventDefault()
    setContactModalOpen(true)
  }

  return (
    <div className="container-narrow px-4 sm:px-6 md:px-8 xl:px-0">
      <PersonStructuredData />
      <div className="flex flex-col md:flex-row items-start md:items-center">
        {/* Profile image  */}
        {/* <div className="aspect-[4/4] -scale-x-100 relative rounded-[var(--container-radius)] overflow-hidden bg-white/30 mr-0 md:mr-6 mb-6 md:mb-0">
          <Image
            src="/images/tim.jpg"
            alt="Tim Campbell"
            width={1000}
            height={1000}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="transition-all duration-200"
            />
        </div> */}
        <H1>Hey, I'm Tim</H1>
      </div>
      
      <div className="subheading">
        I'm a lead product designer based near Philadelphia with 20 years of experience designing and shipping software with a relentless focus on the user.
        <ul className="w-fit flex flex-col sm:flex-row space-x-6 mt-3 text-base">
          {/* Get in touch:  */}
          <li>
            <Link href="#contact" onClick={openContactModal} className="flex items-center transition-colors">
              <EnvelopeIcon className="h-5 w-5 mr-2" />
              <span>Contact</span>
            </Link>
          </li>
          <li>
            <Link href="/pdf/Tim-Campbell-Lead-Product-Designer-Resume-2025.pdf" target="_blank" rel="noopener noreferrer" className="flex items-center text-teal-600 hover:text-teal-700 transition-colors">
              <DocumentTextIcon className="h-5 w-5 mr-2" />
              <span>Resume</span>
            </Link>
          </li>
          <li>
            <Link href="https://github.com/campbell17" target="_blank" rel="noopener noreferrer" className="flex items-center text-teal-600 hover:text-teal-700 transition-colors">
              <svg className="h-5 w-5 mr-2" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M24.0199 0C10.7375 0 0 10.8167 0 24.1983C0 34.895 6.87988 43.9495 16.4241 47.1542C17.6174 47.3951 18.0545 46.6335 18.0545 45.9929C18.0545 45.4319 18.0151 43.509 18.0151 41.5055C11.3334 42.948 9.94198 38.6209 9.94198 38.6209C8.86818 35.8164 7.27715 35.0956 7.27715 35.0956C5.09022 33.6132 7.43645 33.6132 7.43645 33.6132C9.86233 33.7735 11.1353 36.0971 11.1353 36.0971C13.2824 39.7827 16.7422 38.7413 18.1341 38.1002C18.3328 36.5377 18.9695 35.456 19.6455 34.8552C14.3163 34.2942 8.70937 32.211 8.70937 22.9161C8.70937 20.2719 9.66321 18.1086 11.1746 16.4261C10.9361 15.8253 10.1008 13.3409 11.4135 10.0157C11.4135 10.0157 13.4417 9.3746 18.0146 12.4996C19.9725 11.9699 21.9916 11.7005 24.0199 11.6982C26.048 11.6982 28.1154 11.979 30.0246 12.4996C34.5981 9.3746 36.6262 10.0157 36.6262 10.0157C37.9389 13.3409 37.1031 15.8253 36.8646 16.4261C38.4158 18.1086 39.3303 20.2719 39.3303 22.9161C39.3303 32.211 33.7234 34.2539 28.3544 34.8552C29.2296 35.6163 29.9848 37.0583 29.9848 39.3421C29.9848 42.5871 29.9454 45.1915 29.9454 45.9924C29.9454 46.6335 30.383 47.3951 31.5758 47.1547C41.12 43.9491 47.9999 34.895 47.9999 24.1983C48.0392 10.8167 37.2624 0 24.0199 0Z"
                  fill="currentColor"
                />
              </svg>
              <span>GitHub</span>
            </Link>
          </li>
          <li>
            <Link href="https://linkedin.com/in/campbell17" target="_blank" rel="noopener noreferrer" className="flex items-center text-teal-600 hover:text-teal-700 transition-colors">
              <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.2234 0H1.77187C0.792187 0 0 0.773438 0 1.72969V22.2656C0 23.2219 0.792187 24 1.77187 24H22.2234C23.2031 24 24 23.2219 24 22.2703V1.72969C24 0.773438 23.2031 0 22.2234 0ZM7.12031 20.4516H3.55781V8.99531H7.12031V20.4516ZM5.33906 7.43438C4.19531 7.43438 3.27187 6.51094 3.27187 5.37187C3.27187 4.23281 4.19531 3.30937 5.33906 3.30937C6.47813 3.30937 7.40156 4.23281 7.40156 5.37187C7.40156 6.50625 6.47813 7.43438 5.33906 7.43438ZM20.4516 20.4516H16.8938V14.8828C16.8938 13.5563 16.8703 11.8453 15.0422 11.8453C13.1906 11.8453 12.9094 13.2938 12.9094 14.7891V20.4516H9.35625V8.99531H12.7688V10.5609H12.8156C13.2891 9.66094 14.4516 8.70938 16.1813 8.70938C19.7859 8.70938 20.4516 11.0813 20.4516 14.1656V20.4516Z" fill="currentColor"/>
              </svg>
              <span>LinkedIn</span>
            </Link>
          </li>
        </ul>
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
      <p>Fourteen years ago, a geospatial technology company named <Tooltip content="Open Project"><Link href="/work/spatial-networks"> Spatial Networks</Link></Tooltip> hired me as their 12th employee and first designer. They needed... everything. My title was UI Designer, but I did it all, online and in print. But we&apos;ll come back to that.</p>
      <p>Before that, I founded a design agency called Whiteshark Creations with an engineering colleague. We worked with some great clients in our first year, but I realized agency life wasn&apos;t my calling and I left for other design pursuits.</p>
      <p>Prior to going solo, my design career began its infancy, when Macromedia was still a household name and Web 2.0 was hitting it&apos;s bubbly prime. I started as a web designer at an online travel operator called Tourico Holidays (now HotelBeds) and this is where I first clapped eyes on naked HTML & CSS. We had dedicated developers to write all the code, but started learning and practicing to satisfy my curiosity. But it wasn't until my first year working at Spatial Networks that I would feel the power of <code className="pane no-hover text-xl p-2 rounded-md border border-dashed border-[var(--color-border)]">git push origin master</code>.</p>
      <p>When you&apos;re the only designer for a company with big ambitions, being a generalist is mandatory. I have sketchbooks with pages chock full of logos, mobile app screens, mobile app icons, and trade show pull-up banners for offshoots of ideas that didn&apos;t (and never would) exist.</p>
      <p>I loved it.</p>
      <p>But what I loved most was working on the web apps and the marketing websites. Since we were so small, everyone had to be trusted to make what they were doing count without much (or any) oversight. This was the first time I was encouraged to simply address the customer problem and build. There was no time for hand-wringing.</p>
      <p>We took a few cracks at different product ideas. <Tooltip content="Open Project"><Link href="/work/allinspections"> Allinspections</Link></Tooltip>, the product I was actually hired to help create, couldn&apos;t find its niche and had to be sunsetted after 18 months. The CEO called me into his office. I was proud of the work we did, but when he told me we had to shut it down, I worried that would be our final meeting. Instead, he offered me the opportunity to head up something new: Fulcrum.</p>
      <p>Since 2012, this has been the flagship product of Spatial Networks and my number one source of design activity. Unlike prior attempts, Fulcrum struck just the right balance of utility, ease of use, customizability, and extensibility. We were still super lean back then, but now we had people counting on our product. It felt so good to talk to customers about their issues and ideas and be able to mesh them with ours to give their companies leverage just from using our software.</p>
      <p>Since then, we grew every month, steady as a rock. We found product market fit. Our founders understood the importance of keeping the team tight. People who didn&apos;t perform didn&apos;t last. I was responsible the strategy and design for the marketing website, the web app, and the mobile app, all while continuing to support the corporate design materials and marketing for our parent company. It&apos;s wild to compare how we operate now with what we achieved back then with so little, but what I learned about the importance of shipping fast to keep the feedback loop tight was invaluable.</p>
      <p>Now, the next chapter of my career is upon me and I'm on the lookout for what lies ahead. If you need help designing and building beautiful, usable software, <Link href="#contact" onClick={openContactModal} className="text-gray-500 hover:text-black transition-colors inline">get in touch</Link>.</p>
      
      {/* Contact Modal */}
      <ContactModal isOpen={contactModalOpen} onClose={() => setContactModalOpen(false)} />
    </div>
  )
} 