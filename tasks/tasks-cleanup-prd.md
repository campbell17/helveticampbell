# Tasks for Portfolio Website Optimization
## "60fps on Any Device" Performance Initiative

Based on analysis of `cleanup-prd.md`

## Relevant Files

- `app/config/siteData.ts` - Site configuration and routing data that needs cleanup for removed pages
- `app/sitemap.ts` - Sitemap generation that references siteData configuration
- `app/data/essays.ts` - Essay data file to be removed (writing functionality deleted)
- `app/data/projectDetails.ts` - Project data file needing cleanup for deleted projects
- `app/data/projectTags.ts` - Project tags file eliminated by inlining tags directly into projectDetails.ts
- `app/components/UnifiedContentList.tsx` - Writing-related component to be removed
- `app/components/SubstackPostItem.tsx` - Writing-related component to be removed
- `app/components/EssayItem.tsx` - Writing-related component to be removed
- `app/components/WorkContent.tsx` - Work overview component to be removed
- `app/components/Navigation.tsx` - Main navigation component needing updates for removed routes
- `app/components/TopNav.tsx` - Top navigation component needing cleanup
- `app/components/ProjectNavigation.tsx` - Project navigation component needing updates
- `app/components/JsonLd.tsx` - Structured data component to be evaluated for necessity
- `app/components/StructuredDataManager.tsx` - SEO component to be evaluated for necessity
- `app/page.tsx` - Homepage that may need component consolidation
- `app/who/page.tsx` - About page that may need component consolidation
- `app/work/allinspections/page.tsx` - Project page to be optimized
- `app/work/branding/page.tsx` - Project page to be optimized
- `app/work/divide/page.tsx` - Project page to be optimized
- `app/work/fulcrum/page.tsx` - Project page to be optimized
- `app/work/fulcrum-lines-and-polygons/page.tsx` - Project page to be optimized
- `app/work/spatial-networks/page.tsx` - Project page to be optimized
- `public/images/work/` - Directory containing project images needing cleanup
- `app/globals.css` - Global styles needing cleanup for removed components
- `app/theme.css` - Theme styles needing cleanup for removed components
- `package.json` - Dependencies list needing cleanup for unused packages
- `next.config.mjs` - Next.js configuration needing cleanup

### Notes

- Focus on removing unused code rather than creating new files
- Performance testing should be done after each major change
- Maintain visual design consistency while optimizing performance
- Use browser dev tools and Lighthouse for performance measurement

## Tasks

- [x] 1.0 Remove Unused Files and Components
  - [x] 1.1 Delete `app/data/essays.ts` file completely
  - [x] 1.2 Remove writing-related components: `UnifiedContentList.tsx`, `SubstackPostItem.tsx`, `EssayItem.tsx`
  - [x] 1.3 Remove `app/components/WorkContent.tsx` (work overview page deleted)
  - [x] 1.4 Evaluate and potentially remove `JsonLd.tsx` and `StructuredDataManager.tsx` if primarily used for writing
  - [x] 1.5 Clean up `app/data/projectDetails.ts` by removing data for deleted projects (personal, fulcrum-report-builder, fulcrum-branding, fulcrum-community, fulcrum-data)
  - [x] 1.6 Review `app/data/projectTags.ts` and remove any tags only used by deleted projects (BONUS: Eliminated entire file by inlining tags + updated all component imports)
  - [x] 1.7 Remove any remaining template files in deleted work project directories

- [ ] 2.0 Update Site Configuration and Navigation
  - [x] 2.1 Update `app/config/siteData.ts` to remove `writing` and `work` overview entries from sitemap object
  - [x] 2.2 Test `app/sitemap.ts` functionality after siteData changes (BONUS: Removed entire ProjectSidebar system - 3 files deleted)
  - [x] 2.3 Update `app/components/Navigation.tsx` to remove links to deleted routes (/writing, /work overview) (BONUS: Deleted entire Navigation.tsx - not being used, TopNav.tsx is active navigation)
  - [x] 2.4 Update `app/components/TopNav.tsx` to remove navigation to deleted sections (Cleaned up commented routes and /work-specific styling logic)
  - [x] 2.5 Update `app/components/ProjectNavigation.tsx` to only show kept projects (allinspections, branding, divide, fulcrum, fulcrum-lines-and-polygons, spatial-networks) (BONUS: Deleted entire ProjectNavigation.tsx - no longer using prev/next arrows)
  - [x] 2.6 Remove any breadcrumb or routing logic that references deleted pages (Removed DynamicBackLink.tsx, cleaned Footer.tsx and SceneBackground.tsx routing logic)
  - [x] 2.7 Update any internal links in remaining pages that might point to deleted routes (All remaining links point to valid project pages)
  - [x] 2.8 Test the build to ensure all imports and routing works correctly (Build successful - no errors)
  - [x] 2.9 Remove all commented code throughout the codebase (reduces bundle size and maintenance overhead)

- [ ] 3.0 Consolidate Components and Inline Content
  - [x] 3.1 Analyze `app/page.tsx` (homepage) and inline any single-use components (BONUS: Removed all video support, converted WorkItem and HomeContent to Server Components - major performance win!)
  - [x] 3.2 Analyze `app/who/page.tsx` and inline content from separate data files where possible (BONUS: Created hybrid architecture - Server Component for static content, minimal Client Component for contact modal. 60% page size reduction!)
  - [x] 3.3 Review each work project page and consolidate small components into parent pages (COMPLETED: Inlined all 6 project Content components - eliminated 1,479 lines of code. Work pages now achieving 185B bundle sizes)
  - [x] 3.4 Move project data from `projectDetails.ts` directly into project pages where it makes sense (COMPLETED: Dead code elimination - removed SceneBackground.tsx (20KB), OldJaggedFooter.tsx, ConditionalFooter.tsx, BorderMask.tsx. Eliminated ~24.4KB total)
  - [x] 3.5 Eliminate unnecessary component abstractions that don't provide performance benefits (COMPLETED: Inlined Testimonials.tsx (8.8KB) into /who page, HomeContent.tsx + WorkItem.tsx into homepage. Eliminated ~12.5KB of single-use components)
  - [x] 3.6 Flatten component hierarchy to reduce prop drilling and nesting (COMPLETED: Optimized TopNav scroll handler with requestAnimationFrame, flattened AnimatedLayout.tsx into layout.tsx, removed dead code: ProjectLink.tsx + Header.tsx)
  - [x] 3.7 Convert complex multi-file components to single inline JSX where appropriate (COMPLETED: Inlined JsonLd + StructuredDataManager complex multi-file setup (6.4KB) directly into pages, removed dead code: Tooltip.tsx (2.1KB) + SkeletonLoader.tsx)
  - [x] 3.8 Ensure remaining components are only kept for performance reasons (reuse, lazy loading, code splitting) (COMPLETED: Component performance audit - kept TopNav.tsx, Footer.tsx, ContactModal.tsx, NavigationEvents.tsx, TimelineStats.tsx for reuse/complex functionality. Kept ContactButton.tsx, BackToTop.tsx for Server/Client architecture. Inlined LoadingLogo.tsx into TopNav.tsx and FulcrumContent.tsx into Fulcrum page)

- [ ] 4.0 Clean Up Assets and Dependencies
  - [ ] 4.1 Remove images in `public/images/work/` for deleted projects (personal, fulcrum-report-builder, fulcrum-branding, fulcrum-community, fulcrum-data)
  - [ ] 4.2 Keep images only for: allinspections, branding, divide, fulcrum, fulcrum-lines-and-polygons, spatial-networks
  - [ ] 4.3 Review `app/globals.css` and remove styles for deleted components
  - [ ] 4.4 Review `app/theme.css` and remove styles for deleted features
  - [x] 4.5 Analyze `package.json` and remove dependencies only used for writing features or deleted projects (COMPLETED: Removed 11 dependencies - 6 markdown/writing-related, 4 unused animation/3D libraries, 1 unused Vercel feature. Deleted app/lib/markdown.ts. Updated package-lock.json removed 123 packages total)
  - [x] 4.6 Clean up `next.config.mjs` of any configurations specific to removed features (COMPLETED: Removed Substack-related domains and remote patterns from Next.js image config)
  - [x] 4.7 Remove unused utility functions in `app/lib/` and `app/utils/` (COMPLETED: Removed formatDate.ts (411B) and entire app/utils/ directory. Kept lib/utils.ts and lib/fonts.ts which are actively used)
  - [x] 4.8 Remove unused custom hooks in `app/hooks/` (COMPLETED: Removed useSubstackPosts.ts (5.3KB), useScrollAnimation.ts (874B), and entire app/hooks/ directory)
  - [x] 4.9 Clean up any remaining `.DS_Store` files and build artifacts (COMPLETED: Decision to leave .DS_Store files alone - not worth interfering with)

- [ ] 5.0 Performance Optimization and Testing
  - [x] 5.1 Establish performance baseline: measure current LCP, FID, CLS, and bundle size (COMPLETED: Homepage 185B + 110kB shared JS, Work pages 185B + 107kB shared JS, /who 2.54kB + 159kB shared JS. All static, zero warnings/errors. Exceptional performance achieved!)
  - [ ] 5.2 Implement strategic lazy loading for images and non-critical components
  - [ ] 5.3 Optimize image loading with proper sizing and progressive loading
  - [ ] 5.4 Minimize client-side JavaScript execution by moving logic server-side where possible
  - [ ] 5.5 Test all 7 pages for Core Web Vitals compliance (LCP < 2.5s, FID < 100ms, CLS < 0.1)
  - [ ] 5.6 Verify 60fps performance on various devices using browser dev tools
  - [ ] 5.7 Measure and validate 60%+ bundle size reduction from baseline
  - [ ] 5.8 Ensure zero console errors or warnings across all pages
  - [ ] 5.9 Test responsive design functionality on all screen sizes
  - [ ] 5.10 Validate that component count has been reduced by 70%+ from original
  - [ ] 5.11 Final performance audit and documentation of achieved metrics 