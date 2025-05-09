import Image from 'next/image'
import React from 'react'

const testimonials = [
    [
      {
        content: (
          <>
            <p><span className="font-[700] !text-black bg-[var(--theme-color-accent)]">Tim is the kind of teammate that every organization needs.</span> Always reliable, communicative, and highly innovative. His design direction has made him a great partner for our engineering team. He really stands out for using that product knowledge to make well-informed decisions about complex features. He's a motivator, who always makes time for a quick chat and has never been too busy to lend a hand.</p>
          </>
        ),
        author: {
          name: 'Miguel Malcolm',
          handle: 'Senior Software Engineer - Fulcrum',
          imageUrl:
            '/images/miguel.jpeg',
        },
      },
      {
        content: (
          <>
            <p>I had the pleasure of working closely with Tim at Fulcrum, where he brought <span className="font-[700] !text-black bg-[var(--theme-color-accent)]">an incredible mix of design talent, initiative, and thoughtfulness</span> to our team. What stood out most about Tim was his thoughtful ability to question — "Should we do this?" rather than just "How should we do this?" That kind of thinking helped us build not just usable features, but also avoid wasting time on things we didn't need. Tim consistently delivered designs that were a joy to use—some of the most intuitive and polished parts of our platform were his work. He also took initiative on bigger efforts, like leading the charge on our web design system.</p>
          </>
        ),
        author: {
          name: 'Katie Briggs',
          handle: 'Director of Product Management - Fulcrum',
          imageUrl:
            '/images/katie.jpeg',
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
          imageUrl:
            '/images/caleb.jpeg',
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
          imageUrl:
            '/images/mariana2.jpeg',
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
          imageUrl:
            '/images/adrian.jpeg',
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
          imageUrl:
            '/images/cory.jpeg',
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
          imageUrl:
            '/images/kara.jpeg',
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
          imageUrl:
            '/images/bill.jpeg',
        },
      },
    ],
  ]

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

interface TestimonialsProps {
  className?: string;
}

export default function Testimonials({ className }: TestimonialsProps) {
  return (
    <div className={`@container ${className}`}>
      <div className="mx-auto">
        <div className="mx-auto grid grid-cols-1 gap-8">
          {testimonials.flat(2).map((testimonial) => (
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
  )
}
