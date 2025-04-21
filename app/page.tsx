'use client'

import { H1, H2 } from './components/Typography'

export default function HomePage() {
  return (
    <>
      <H1>This is <span className="font-helveticampbell tracking-normal">Helveticampbell</span>.</H1>
      
      <div className="subheading">
        Versatile, product-focused design. Building and evolving digital experiences from the ground up.
      </div>

      <div className="aspect-[3/2] relative rounded-[var(--container-radius)] overflow-hidden bg-[oklch(var(--color-container-bg)/0.3)] mb-12">
        <div className="absolute inset-0 flex items-center justify-center text-[oklch(var(--color-text-secondary))]">
          Hero Image
        </div>
      </div>

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

        <div className="aspect-[3/2] relative rounded-[var(--container-radius)] overflow-hidden bg-[oklch(var(--color-container-bg)/0.3)] my-12">
          <div className="absolute inset-0 flex items-center justify-center text-[oklch(var(--color-text-secondary))]">
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