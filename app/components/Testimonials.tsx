import Image from 'next/image'
import React from 'react'

const featuredTestimonial = {
  body: [
    'Integer id nunc sit semper purus. Bibendum at lacus ut arcu blandit montes vitae auctor libero. Hac condimentum dignissim nibh vulputate ut nunc.',
    'Amet nibh orci mi venenatis blandit vel et proin. Non hendrerit in vel ac diam.'
  ],
  author: {
    name: 'Miguel Malcolm',
    handle: 'Senior Software Engineer - Fulcrum',
    imageUrl:
      'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=1024&h=1024&q=80',
    logoUrl: 'https://tailwindcss.com/plus-assets/img/logos/savvycal-logo-gray-900.svg',
  },
}
const testimonials = [
    [
      {
        body: [
          "Tim is the kind of teammate that every organization needs. I've worked with him for the past 6 years at Fulcrum, and he's always been reliable, communicative, and highly innovative. His design direction has made him a great partner for our engineering team, adding a deep understanding of the product and a strong focus on the user experience. He really stands out for using that product knowledge to make well-informed decisions about complex features.",
          "Tim is a great person that puts his whole heart into the product - it's inspiring. He's a motivator, who always makes time for a quick chat and has never been too busy to lend a hand. He's an all-star in his field and would be a tremendous addition to any design team.",
        ],
        author: {
          name: 'Miguel Malcolm',
          handle: 'Senior Software Engineer - Fulcrum',
          imageUrl:
            '/images/miguel.jpeg',
        },
      },
      {
        body: [
          "I had the pleasure of working closely with Tim at Fulcrum, where he brought an incredible mix of design talent, initiative, and thoughtfulness to our team.",
          "What stood out most about Tim was his thoughtful ability to question — \"Should we do this?\" rather than just \"How should we do this?\" That kind of thinking helped us build not just usable features, but also avoid wasting time on things we didn't need.",  
          "Tim consistently delivered designs that were a joy to use—some of the most intuitive and polished parts of our platform were his work. He also took initiative on bigger efforts, like leading the charge on our web design system.",
          "I would gladly work with Tim again if the opportunity arose.",
        ],
        author: {
          name: 'Katie Briggs',
          handle: 'Director of Product Management - Fulcrum',
          imageUrl:
            '/images/katie.jpeg',
        },
      },
      {
        body: [
          "I have had the distinct pleasure of working with Tim Campbell for eight years at Fulcrum. Initially, Tim hired me and was instrumental in my development as a designer. Even as our roles evolved, Tim remained a pillar of thought leadership and expertise for me and the entire product design team. Throughout our collaboration, I witnessed firsthand the breadth of his talents and his unwavering commitment to excellence.",
          "Tim's leadership was crucial in several redesigns of Fulcrum's marketing site before he shifted his focus entirely to the product side, where he led the creation, implementation, and management of our design system for the web. His ability to seamlessly blend design with functionality ensured our platforms were visually appealing, intuitive, and user-centric. Tim's deep involvement in both visual design and front-end code provided a cohesive framework that elevated our product's overall aesthetic and usability.",
          "A true wizard with tools like Figma, Photoshop, and Illustrator, Tim's design prowess is matched only by his technical acumen. His proficiency in modern front-end frameworks like React allowed him to bridge the gap between design and development, shortening our time to release.",
          "Beyond his technical skills, Tim's presence on our design team was invaluable. His strategic vision and ability to question not just the 'how' but the 'why' behind every design decision pushed our team to think critically and deliver features that resonated with our users. His mentorship and willingness to share his knowledge empowered those around him, significantly enhancing our team's capabilities. As our go-to UX copywriter, his blog is highly recommended for reference.",
          "Tim is more than just a colleague; he is a respected thought leader and inspiring teammate. His dedication to the craft and holistic approach to design make him an all-star in his field and an asset to any organization fortunate enough to have him.",
          "I wholeheartedly recommend Tim Campbell for any opportunity that allows him to leverage his exceptional skills and leadership. His impact on our team and product was profound, and I have no doubt he will bring the same level of excellence and innovation to any future endeavor.",
        ],
        author: {
          name: 'Caleb Sanderson',
          handle: 'Director, Product Design - Fulcrum',
          imageUrl:
            '/images/caleb.jpeg',
        },
      },
      {
        body: [
          "I had the pleasure of working with Tim for about three years, and I can confidently say he's a designer I truly admire. Tim is incredibly passionate about his work, and it shows in everything he does, his craft is consistently thoughtful, clean, and detailed.",
          "I often turned to him as my go-to \"copy ninja\" and learned so much from his keen eye and clear thinking. Tim has deep expertise in design systems and web design, along with a solid technical background that makes him a versatile and valuable teammate.",
          "He's also incredibly generous with his knowledge, always willing to share, explain, and support others. A true team player, Tim gives constructive, insightful feedback and never hesitates to ask the right questions to ensure the best solution is being pursued.",
          "Any team would be lucky to have Tim on board."
        ],
        author: {
          name: 'Mariana Ciguentes',
          handle: 'Senior Product Designer (UI/UX)',
          imageUrl:
            '/images/mariana.jpeg',
        },
      },
      {
        body: [
          "I had the pleasure of working closely with Tim Campbell for two years at Fulcrum, and I can confidently say he is an exceptional designer, collaborator, and colleague. Tim joined Fulcrum/Spatial Networks in its early days, and over more than 15 years, he became a foundational pillar of our team.",
          "As our Lead Product Designer focused on web design, Tim brought immense value through his deep understanding of our product, our customers, and their unique use cases and challenges. His insights consistently guided our team toward high-impact, user-focused solutions. Tim's ability to align our efforts with customer needs ensured we always prioritized work that created real value.",
          "Beyond his exceptional design skills, Tim is also highly skilled in user research and software development, making him a versatile and invaluable asset to any team. His dedication, collaborative spirit, and thoughtful approach to problem-solving made him a pleasure to work alongside every day.",
          "I wholeheartedly recommend Tim Campbell and have no doubt he will positively impact any organization fortunate enough to have him.",
        ],
        author: {
          name: 'Adrian Zuniga',
          handle: 'Senior Product Manager - Fulcrum',
          imageUrl:
            '/images/adrian.jpeg',
        },
      },
      {
        body: [
          "Tim is much more than a product designer; at Fulcrum, he was our go-to expert for everything design-related. Over the years, as the company evolved, he single-handedly redesigned our entire website several times. Tim truly embodies the concept of a full-stack designer. His expertise encompasses illustrations, motion graphics, branding, print, packaging, typography, coding, and web and mobile UI/UX. He expertly managed it all. He utilized the latest techniques and technologies, consistently transforming ideas into reality. I cannot recommend him highly enough.",
        ],
        author: {
          name: 'Cory MacVie',
          handle: 'Senior Director of Product - Healthicity',
          imageUrl:
            '/images/cory.jpeg',
        },
      },
      {
        body: [
          "I highly recommend Tim for any product design role. I had the pleasure of working with him for just under five years at Fulcrum, and I was consistently impressed by his technical skills, design expertise, and dedication to our users.",
          "Tim has a strong technical background and worked closely with software engineers to build a future vision of Fulcrum's UI that implements a cohesive design system using MUI components. His understanding of both design and engineering principles made him an invaluable asset to our team.",
          "Even before I joined the team, Tim was already a seasoned veteran. He took the time to help me understand our users, our design system, and the challenges we were facing. He was always willing to share his knowledge and expertise. ",
          "In addition to his technical skills and user focus, Tim is also a creative and talented designer. He has a strong eye for detail and a passion for creating beautiful and intuitive user interfaces. He is also a team player and is always willing to collaborate with others to achieve the best possible results. His eloquent wording was often relied upon to concisely and clearly provide user feedback copy.",
          "I have no doubt that Tim would be an asset to any team. He is a highly skilled and experienced product designer with a strong work ethic and a commitment to excellence.",
        ],
        author: {
          name: 'Kara Fox',
          handle: 'Director of Product Engineering - Fulcrum',
          imageUrl:
            '/images/kara.jpeg',
        },
      },
      {
        body: [
          "I worked with Tim for six years at Spatial Networks/Fulcrum. During that time, Tim was responsible for UI/UX design in our SaaS product and was initially responsible for the site design and branding of the web sites for both our SaaS and services lines of business. In both capacities, Tim's work excelled. His design approach to the company's branding ensured that our public-facing presence expertly communicated the value and presence of out offerings through the use clean, elegant design and logical flow. His approach to UI/UX ensured that our mobile apps remained modern, effective, and easy to use. While not a software engineer himself, Tim's understanding of engineering processes enabled him to work closely with engineers during the implementation of his designs.",
          "I thought so highly of Tim's work that, when I left Fulcrum and started my own company, I approached him to design my logo. He not only delivered a logo, but also a professional branding package with usage guidelines. I have been extremely happy with Tim's work and have received numerous compliments from partners and customers.",
          "I highly recommend Tim, both as a designer and a teammate. He operates at the top of his craft and will be an asset and a leader on any team.",
        ],
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
        <div className="mx-auto grid grid-cols-1 gap-8 text-sm/6 text-text-primary">
          {testimonials.flat(2).map((testimonial) => (
            <figure
              key={testimonial.author.handle}
              className="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-gray-900/5 container-glass relative overflow-hidden"
            >
              {/* Large quote mark pseudo-element (top) */}
              <div className="absolute top-20 left-0 text-neutral-400 opacity-10 text-[224px] font-body z-0 -tracking-[20px] leading-16 pointer-events-none select-none">
                &lsquo;&lsquo;
              </div>

              {/* Large quote mark pseudo-element (bottom) */}
              <div className="absolute -bottom-16 right-6 text-neutral-400 opacity-10 text-[224px] font-body z-0 -tracking-[20px] leading-16 pointer-events-none select-none">
                &rsquo;&rsquo;
              </div>

              <blockquote className="text-text-primary relative z-10">
                {testimonial.body.map((paragraph, idx) => (
                  <div key={idx} className="mb-4">
                    {paragraph}
                  </div>
                ))}
              </blockquote>
              <figcaption className="flex items-center gap-x-4 relative z-10">
                <Image
                  src={testimonial.author.imageUrl}
                  alt={`${testimonial.author.name}'s profile picture`}
                  width={40}
                  height={40}
                  className="rounded-full bg-gray-50"
                />
                <div>
                  <div className="font-[700]">{testimonial.author.name}</div>
                  <div className="text-text-secondary">{`${testimonial.author.handle}`}</div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </div>
  )
}
