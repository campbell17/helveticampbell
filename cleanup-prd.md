# Portfolio Website Optimization PRD
## "60fps on Any Device" Performance Initiative

### **Project Overview**
Transform the Helveticampbell portfolio website from an over-engineered Next.js application to a high-performance, bare-metal implementation that achieves "60fps on any device" performance standards.

---

## **1. Problem Statement**

### Current State
- Portfolio website built in "make-to-know" fashion with continuous feature additions
- Over-abstracted component architecture with unnecessary complexity
- Multiple template files, content files, and excessive imports
- Performance bottlenecks from over-engineering
- Codebase bloat with components not essential to core functionality

### Business Impact
- Poor performance on mobile/slower devices
- Degraded user experience
- Maintenance overhead from complex architecture
- Slower development velocity due to abstraction layers

---

## **2. Success Criteria**

### Performance Targets
- **Core Web Vitals:**
  - LCP (Largest Contentful Paint): < 2.5s
  - FID (First Input Delay): < 100ms
  - CLS (Cumulative Layout Shift): < 0.1
- **Frame Rate:** Consistent 60fps on all interactions
- **Bundle Size:** Reduce JavaScript bundle by 60%+
- **Time to Interactive:** < 3s on 3G networks

### Code Quality Targets
- Reduce component count by 70%+
- Eliminate unused imports and dependencies
- Consolidate template files
- Minimize abstraction layers
- Achieve sub-100ms server response times

---

## **3. Scope**

### Pages to Optimize (7 total)
- `/` - Homepage
- `/who` - About page  
- `/work/allinspections` - Allinspections project
- `/work/branding` - Branding project
- `/work/divide` - Divide project
- `/work/fulcrum` - Fulcrum project
- `/work/fulcrum-lines-and-polygons` - Fulcrum Lines project
- `/work/spatial-networks` - Spatial Networks project

### Out of Scope
- All previously deleted pages and routes
- Writing/blog functionality
- API endpoints
- Debug functionality
- Unused project pages

---

## **4. Technical Approach**

### Phase 1: Codebase Reduction
- Remove unused components, data files, and assets
- Consolidate template files
- Eliminate dead code and unused imports
- Clean up image assets for deleted projects

### Phase 2: Component Consolidation
- Merge small, single-use components into parent components
- Convert complex components to inline JSX where appropriate
- Eliminate unnecessary abstraction layers
- Keep components ONLY when separation improves performance

### Phase 3: Performance Optimization
- Move content inline rather than importing from separate files
- Optimize image loading and sizing
- Implement lazy loading strategically
- Minimize client-side JavaScript execution

### Phase 4: Architecture Simplification
- Flatten component hierarchy
- Reduce prop drilling and context usage
- Simplify routing and navigation logic
- Streamline styling approach

---

## **5. Implementation Strategy**

### Optimization Principles
1. **Inline First:** Prefer in-page content over separate files
2. **Component Minimalism:** Only create components for performance reasons
3. **Zero Abstraction:** Remove layers that don't provide clear value
4. **Performance Over DRY:** Prioritize speed over code reusability
5. **Direct Implementation:** Avoid indirection where possible

### Component Decision Matrix
Create components ONLY when:
- ✅ Reused across multiple pages with identical functionality
- ✅ Large enough to cause performance issues if inlined
- ✅ Requires specific optimization (lazy loading, code splitting)
- ❌ Used only once
- ❌ Simple presentational content
- ❌ Basic layout structures

---

## **6. Cleanup Tasks**

### High Priority
1. **Site Configuration**
   - Update `app/config/siteData.ts` - remove writing/work overview routes
   - Verify `app/sitemap.ts` functionality

2. **Data File Cleanup**
   - Remove `app/data/essays.ts`
   - Clean `app/data/projectDetails.ts` - remove deleted project data
   - Review `app/data/projectTags.ts` - remove unused tags

3. **Component Removal**
   - Delete writing-related components (UnifiedContentList, SubstackPostItem, EssayItem)
   - Remove WorkContent.tsx (work overview page gone)
   - Evaluate JsonLd.tsx and StructuredDataManager.tsx necessity

### Medium Priority
4. **Navigation Updates**
   - Update Navigation.tsx - remove dead links
   - Update TopNav.tsx - clean navigation
   - Review ProjectNavigation.tsx - show only kept projects

5. **Asset Cleanup**
   - Remove images for deleted projects in `public/images/work/`
   - Keep only: allinspections, branding, divide, fulcrum, fulcrum-lines-and-polygons, spatial-networks

6. **Utility Cleanup**
   - Review `app/lib/` and `app/utils/` - remove unused functions
   - Review `app/hooks/` - remove unused hooks

### Low Priority
7. **Styling & Dependencies**
   - Clean unused styles in globals.css and theme.css
   - Remove unused dependencies from package.json
   - Clean next.config.mjs of unused configurations

---

## **7. Acceptance Criteria**

### Technical Requirements
- [ ] All 7 pages load under 2.5s LCP
- [ ] Zero console errors or warnings
- [ ] Bundle size reduced by 60%+
- [ ] Component count reduced by 70%+
- [ ] No unused imports or dead code

### User Experience Requirements
- [ ] Smooth 60fps scrolling on all devices
- [ ] Instant navigation between pages
- [ ] Images load progressively without layout shift
- [ ] Responsive design works flawlessly on all screen sizes

### Code Quality Requirements
- [ ] Maximum 3 levels of component nesting
- [ ] Each page has <50 lines of imported dependencies
- [ ] Inline content wherever possible
- [ ] Clear, minimal component structure

---

## **8. Risks & Mitigation**

### Risks
- Over-optimization leading to code duplication
- Removing components that provide subtle performance benefits
- Breaking responsive design during consolidation

### Mitigation
- Performance test after each major change
- Keep detailed before/after performance metrics
- Maintain responsive design testing checklist
- Incremental changes with rollback capability

---

## **9. Timeline & Milestones**

### Week 1: Foundation Cleanup
- Complete all file/component removal tasks
- Update site configuration and navigation

### Week 2: Component Consolidation  
- Merge components into parent pages
- Inline content from data files
- Performance baseline testing

### Week 3: Optimization & Testing
- Performance tuning and measurement
- Cross-device testing
- Final polish and deployment

---

## **10. Definition of Done**

The project is complete when:
1. All 7 pages achieve target performance metrics
2. Codebase is reduced to essential components only
3. Site maintains visual design and functionality
4. Performance is consistent across devices
5. Code is maintainable and well-documented

**Success Metric:** Portfolio achieves "60fps on any device" while maintaining design quality and user experience. 