import { Metadata } from 'next'
import Link from 'next/link'
import { H1, H2 } from '../components/Typography'
import ContactButton from '../components/ContactButton'
import { DocumentTextIcon } from '@heroicons/react/24/solid'
import Image from 'next/image'

// Use static OG image
const ogImageUrl = '/images/social/og-default.png';

export const metadata: Metadata = {
  title: 'About Tim Campbell',
  description: 'A history of my design career, two ways.',
  alternates: {
    canonical: '/who',
  },
  openGraph: {
    title: 'About Tim Campbell',
    description: 'A history of my design career, two ways.',
    url: 'https://helveticampbell.com/who',
    images: [
      {
        url: ogImageUrl,
        width: 1200,
        height: 630,
        alt: 'Tim Campbell'
      }
    ],
    type: 'website'
  }
}

// Testimonials data inlined from Testimonials component
const testimonials = [
  {
    content: (
      <>
        <p><span className="font-[700] !text-black bg-[var(--theme-color-accent)]">Tim is the kind of teammate that every organization needs.</span> Always reliable, communicative, and highly innovative. His design direction has made him a great partner for our engineering team. He really stands out for using that product knowledge to make well-informed decisions about complex features. He's a motivator, who always makes time for a quick chat and has never been too busy to lend a hand.</p>
      </>
    ),
    author: {
      name: 'Miguel Malcolm',
      handle: 'Senior Software Engineer - Fulcrum',
      imageUrl: '/images/miguel.jpeg',
    },
  },
  {
    content: (
      <>
        <p>I had the pleasure of working closely with Tim at Fulcrum, where he brought an <span className="font-[700] !text-black bg-[var(--theme-color-accent)]">incredible mix of design talent, initiative, and thoughtfulness</span> to our team. What stood out most about Tim was his thoughtful ability to question — "Should we do this?" rather than just "How should we do this?" That kind of thinking helped us build not just usable features, but also avoid wasting time on things we didn't need. Tim consistently delivered designs that were a joy to use—some of the most intuitive and polished parts of our platform were his work. He also took initiative on bigger efforts, like leading the charge on our web design system.</p>
      </>
    ),
    author: {
      name: 'Katie Briggs',
      handle: 'Director of Product Management - Fulcrum',
      imageUrl: '/images/katie.jpeg',
    },
  },
  {
    content: (
      <>
        <p>A pillar of thought leadership and expertise for me and the entire product design team. <span className="font-[700] !text-black bg-[var(--theme-color-accent)]">His ability to seamlessly blend design with functionality ensured our platforms were visually appealing, intuitive, and user-centric.</span> Tim's deep involvement in both visual design and front-end code provided a cohesive framework that elevated our product's overall aesthetic and usability. His proficiency in modern front-end frameworks like React allowed him to bridge the gap between design and development, shortening our time to release.</p>
      </>
    ),
    author: {
      name: 'Caleb Sanderson',
      handle: 'Director, Product Design - Fulcrum',
      imageUrl: '/images/caleb.jpeg',
    },
  },
  {
    content: (
      <>
        <p>Incredibly passionate about his work and it shows in everything he does, his craft is consistently thoughtful, clean, and detailed. <span className="font-[700] !text-black bg-[var(--theme-color-accent)]">I often turned to him as my go-to "copy ninja" and learned so much from his keen eye and clear thinking.</span> Tim has deep expertise in design systems and web design, along with a solid technical background that makes him a versatile and valuable teammate. He's also incredibly generous with his knowledge, always willing to share, explain, and support others. Tim gives constructive, insightful feedback and never hesitates to ask the right questions to ensure the best solution is being pursued.</p>
      </>
    ),
    author: {
      name: 'Mariana Cifuentes',
      handle: 'Senior Product Designer (UI/UX)',
      imageUrl: '/images/mariana2.jpeg',
    },
  },
  {
    content: (
      <>
        <p><span className="font-[700] !text-black bg-[var(--theme-color-accent)]">Tim brought immense value through his deep understanding of our product, our customers, and their unique use cases and challenges.</span> His insights consistently guided our team toward high-impact, user-focused solutions and his ability to align our efforts with customer needs ensured we always prioritized work that created real value. His dedication, collaborative spirit, and thoughtful approach to problem-solving made him a pleasure to work alongside every day.</p>
      </>
    ),
    author: {
      name: 'Adrian Zuniga',
      handle: 'Senior Product Manager - Fulcrum',
      imageUrl: '/images/adrian.jpeg',
    },
  },
  {
    content: (
      <>
        <p>Tim truly embodies the concept of a full-stack designer. His expertise encompasses illustrations, motion graphics, branding, print, packaging, typography, coding, and web and mobile UI/UX. <span className="font-[700] !text-black bg-[var(--theme-color-accent)]">He expertly managed it all.</span> He utilized the latest techniques and technologies, consistently transforming ideas into reality. I cannot recommend him highly enough.</p>
      </>
    ),
    author: {
      name: 'Cory MacVie',
      handle: 'Senior Director of Product - Healthicity',
      imageUrl: '/images/cory.jpeg',
    },
  },
  {
    content: (
      <>
        <p>I was always consistently impressed by Tim's technical skills, design expertise, and dedication to our users. He has a strong technical background and worked closely with software engineers to build a future vision of Fulcrum's UI that implemented a cohesive design system. <span className="font-[700] !text-black bg-[var(--theme-color-accent)]">His understanding of both design and engineering principles made him an invaluable asset to our team.</span></p>
      </>
    ),
    author: {
      name: 'Kara Fox',
      handle: 'Director of Product Engineering - Fulcrum',
      imageUrl: '/images/kara.jpeg',
    },
  },
  {
    content: (
      <>
        <p>Tim's work excels. His approach to UI/UX ensured that our mobile apps remained modern, effective, and easy to use. While not a software engineer himself, Tim's understanding of engineering processes enabled him to work closely with engineers during the implementation of his designs. I thought so highly of Tim's work that when I left Fulcrum and started my own company, I approached him to design my logo. He not only delivered a logo, but also a professional branding package with usage guidelines. <span className="font-[700] !text-black bg-[var(--theme-color-accent)]">He operates at the top of his craft and will be an asset and a leader on any team.</span></p>
      </>
    ),
    author: {
      name: 'Bill Dollins',
      handle: 'Fractional Executive, Strategist, Consultant, Founder. - Cercana Systems, LLC',
      imageUrl: '/images/bill.jpeg',
    },
  },
]

export default function WhoPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Person',
            name: 'Tim Campbell',
            description: 'Designer with extensive experience in web and mobile applications.',
            url: 'https://helveticampbell.com/who',
            image: 'https://helveticampbell.com/images/tim.jpg',
            jobTitle: 'Product Designer',
            sameAs: [
              'https://campbellseventeen.substack.com/'
            ],
            worksFor: {
              '@type': 'Organization',
              name: 'Fulcrum',
              url: 'https://www.fulcrumapp.com'
            }
          })
        }}
      />
      {/* About page content inlined from WhoContent component */}
      <div className="container-wide px-4 sm:px-6 md:px-8 xl:px-0">
        {/* Person structured data inlined */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: 'Tim Campbell',
              url: 'https://helveticampbell.com/who',
              jobTitle: 'Product Designer',
              description: 'Versatile, product-focused designer. Building, shipping, and evolving digital experiences from the ground up.',
              sameAs: [
                'https://github.com/helveticampbell',
                'https://linkedin.com/in/helveticampbell',
              ],
              image: 'https://helveticampbell.com/images/tim.jpg'
            })
          }}
        />
        <div className="flex flex-col md:flex-row items-start md:items-center">
          <H1>About Tim</H1>
        </div>
        
        <div className="subheading">
          I'm a multi-disciplinary designer based near Philly with experience executing quality work to improve life for clients, internal teams, and their customers.
          <div className="flex flex-col md:flex-row gap-6">
          <ul className="rounded-md bg-neutral-400/10 border border-[var(--color-border)] w-full md:w-fit flex flex-col gap-1 md:gap-0 md:flex-row mt-12 !mb-0 text-base">
            {/* Resume, GitHub, LinkedIn */}
            <li>
              <Link href="/pdf/Tim-Campbell-Lead-Product-Designer-Resume-2025.pdf" target="_blank" rel="noopener noreferrer" className="w-full p-6 py-4 pane flex items-center transition-colors">
                <DocumentTextIcon className="h-5 w-5 mr-2" />
                <span>Resume</span>
              </Link>
            </li>
            <li>
              <Link href="https://github.com/campbell17" target="_blank" rel="noopener noreferrer" className="w-full p-6 py-4 pane flex items-center transition-colors">
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
              <Link href="https://linkedin.com/in/campbell17" target="_blank" rel="noopener noreferrer" className="w-full p-6 py-4 pane flex items-center transition-colors">
                <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.2234 0H1.77187C0.792187 0 0 0.773438 0 1.72969V22.2656C0 23.2219 0.792187 24 1.77187 24H22.2234C23.2031 24 24 23.2219 24 22.2703V1.72969C24 0.773438 23.2031 0 22.2234 0ZM7.12031 20.4516H3.55781V8.99531H7.12031V20.4516ZM5.33906 7.43438C4.19531 7.43438 3.27187 6.51094 3.27187 5.37187C3.27187 4.23281 4.19531 3.30937 5.33906 3.30937C6.47813 3.30937 7.40156 4.23281 7.40156 5.37187C7.40156 6.50625 6.47813 7.43438 5.33906 7.43438ZM20.4516 20.4516H16.8938V14.8828C16.8938 13.5563 16.8703 11.8453 15.0422 11.8453C13.1906 11.8453 12.9094 13.2938 12.9094 14.7891V20.4516H9.35625V8.99531H12.7688V10.5609H12.8156C13.2891 9.66094 14.4516 8.70938 16.1813 8.70938C19.7859 8.70938 20.4516 11.0813 20.4516 14.1656V20.4516Z" fill="currentColor"/>
                </svg>
                <span>LinkedIn</span>
              </Link>
            </li>
          </ul>

          <ul className="rounded-md bg-neutral-400/10 border border-[var(--color-border)] w-full md:w-fit flex flex-col md:flex-row mt-6 md:mt-12 !mb-0 text-base">
            {/* Contact button */}
            <li>
              <ContactButton />
            </li>
          </ul>
          </div>
        </div>

        <H2 className="mb-8">The Short Version</H2>

        <ul className="space-y-4 list-disc list-outside ml-5">
          <li>
            I was the sole designer on <Link href="https://www.fulcrumapp.com" target="_blank" rel="noopener noreferrer">Fulcrum</Link> for its first 10 years, growing it from an idea on a whiteboard to $12M+ in ARR with a small team and scant resources.
          </li>
          <li>
            In addition to working on Fulcrum, I was also solely responsible for designing and shipping the branding, website, and print / trade show materials for our parent company, Spatial Networks.
          </li>
          <li>
            I write for fun. You can read what I publish on <Link href="https://campbellseventeen.substack.com" target="_blank" rel="noopener noreferrer" className="text-teal-600">Substack</Link>.
          </li>
          <li>
            I love hockey and I obsess over Formula 1. I haven&apos;t missed a race since Hockenheim in 2000, which made Rubens Barrichello so sad he cried on the podium.
          </li>
        </ul>

        <div className="flex flex-col mt-24">
          <H2>What It's Like to Work With Me</H2>
          {/* Testimonials section inlined from Testimonials component */}
          <div className="@container mt-12">
            <div className="mx-auto">
              <div className="mx-auto grid grid-cols-1 gap-8">
                {testimonials.map((testimonial) => (
                  <figure
                    key={testimonial.author.handle}
                    className="rounded-2xl pane no-hover p-6 shadow-lg ring-1 ring-gray-900/5 relative overflow-hidden"
                  >
                    {/* Large quote mark pseudo-element (top) */}
                    <div className="absolute top-20 left-0 !text-[var(--text-color-light)] opacity-10 text-[224px] font-body z-0 -tracking-[20px] leading-16 pointer-events-none select-none">
                      &lsquo;&lsquo;
                    </div>

                    {/* Large quote mark pseudo-element (bottom) */}
                    <div className="absolute -bottom-16 right-6 !text-[var(--text-color-light)] opacity-10 text-[224px] font-body z-0 -tracking-[20px] leading-16 pointer-events-none select-none">
                      &rsquo;&rsquo;
                    </div>

                    {testimonial.content && (
                      <div className="mt-4">
                        {testimonial.content}
                      </div>
                    )}
                    <figcaption className="flex items-center gap-x-4 relative z-10">
                      <Image
                        src={testimonial.author.imageUrl}
                        alt={`${testimonial.author.name}'s profile picture`}
                        width={40}
                        height={40}
                        className="rounded-full bg-gray-50"
                      />
                      <div>
                        <div className="text-base font-[700]">{testimonial.author.name}</div>
                        <div className="text-sm !text-[var(--text-color-light)]">{`${testimonial.author.handle}`}</div>
                      </div>
                    </figcaption>
                  </figure>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}