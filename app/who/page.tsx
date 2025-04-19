'use client'

import { H1, H2, H3 } from '../components/Typography'
import Image from 'next/image'
import Link from 'next/link'

export default function HomePage() {
  return (
    <>
      <H1>Tim Campbell</H1>
      
      <p className="subheading">
        Settle in, it's story time.
      </p>
      
      <H2 className="mb-8">The Short Version...</H2>
      <H3>Here's what you need to know</H3>

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

      <div className="prose prose-invert max-w-none">
        <p>
          Nullam eget felis eget nunc lobortis mattis aliquam faucibus. Vivamus magna justo, lacinia eget 
          consectetur sed, convallis at tellus. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui.
          Curabitur aliquet quam id dui posuere blandit. Nulla quis lorem ut libero malesuada feugiat.
        </p>

        <p>
          Nulla porttitor accumsan tincidunt. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui.
          Curabitur aliquet quam id dui posuere blandit. Vestibulum ante ipsum primis in faucibus orci luctus et 
          ultrices posuere cubilia curae; Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula.
        </p>

        <p>
          Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Vestibulum ante ipsum primis in 
          faucibus orci luctus et ultrices posuere cubilia curae; Donec velit neque, auctor sit amet aliquam vel.
          Sed porttitor lectus nibh. Nulla quis lorem ut libero malesuada feugiat.
        </p>

        <div className="aspect-[3/2] relative rounded-[var(--container-radius)] overflow-hidden bg-[hsl(var(--color-container-bg)/0.3)] my-12">
          <div className="absolute inset-0 flex items-center justify-center text-[hsl(var(--color-text-secondary))]">
            Secondary Image
          </div>
        </div>

        <p>
          Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem. Vestibulum ac diam sit amet quam 
          vehicula elementum sed sit amet dui. Nulla quis lorem ut libero malesuada feugiat. Nulla porttitor 
          accumsan tincidunt. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui.
        </p>

        <p>
          Proin eget tortor risus. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. 
          Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; 
          Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula. Nulla porttitor 
          accumsan tincidunt. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere 
          cubilia curae.
        </p>
      </div>
    </>
  )
} 