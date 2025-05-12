import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { H1, Overline } from '../../components/Typography';
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

// Define OG image parameters
const ogTitle = 'Writing Archive';
const ogSubtitle = 'Browse my complete collection of essays by topic.';
const ogImageUrl = `/api/og?title=${encodeURIComponent(ogTitle)}&subtitle=${encodeURIComponent(ogSubtitle)}`;

// Define a type for our markdown essays
interface Essay {
  slug: string;
  title: string;
  date: string;
  tags: string[];
}

export const metadata: Metadata = {
  title: 'Writing Archive | Helveticampbell',
  description: 'Browse my complete collection of essays by topic.',
  alternates: {
    canonical: '/writing/archive',
  },
  openGraph: {
    title: 'Writing Archive | Helveticampbell',
    description: 'Browse my complete collection of essays by topic.',
    url: 'https://helveticampbell.com/writing/archive',
    images: [
      {
        url: ogImageUrl,
        width: 1200,
        height: 630,
        alt: 'Tim Campbell\'s Essay Archive'
      }
    ],
    type: 'website'
  }
}

// Function to get essay metadata from files - runs server-side
function getEssays(): { essays: Essay[], allTags: string[] } {
  try {
    const essaysDir = path.join(process.cwd(), 'app/writing/essays');
    
    // Check if directory exists
    if (!fs.existsSync(essaysDir)) {
      console.error('Essays directory not found');
      return { essays: [], allTags: [] };
    }
    
    // Get all markdown files
    const files = fs.readdirSync(essaysDir)
      .filter(file => file.endsWith('.md'));

    let allTags: string[] = [];
      
    // Process each file to extract metadata
    const essays = files.map(file => {
      const filePath = path.join(essaysDir, file);
      try {
        const content = fs.readFileSync(filePath, 'utf8');
        const { data } = matter(content);
        
        // Extract the slug from the filename
        const slug = path.basename(file, '.md');
        
        // Collect tags for this essay
        const tags = data.tags || [];
        
        // Add tags to allTags array
        if (Array.isArray(tags)) {
          tags.forEach((tag: string) => {
            if (!allTags.includes(tag)) {
              allTags.push(tag);
            }
          });
        }
        
        return {
          slug,
          title: data.title || 'Untitled',
          date: data.date ? new Date(data.date).toString() : new Date().toString(),
          tags: tags
        };
      } catch (error) {
        console.error(`Error processing file ${filePath}:`, error);
        return null;
      }
    })
    .filter(Boolean) // Remove nulls from failed processing
    .sort((a, b) => {
      // Sort by date, newest first
      return new Date(b!.date).getTime() - new Date(a!.date).getTime();
    });
    
    // Sort tags alphabetically
    allTags.sort();
    
    return { essays: essays as Essay[], allTags };
  } catch (error) {
    console.error('Error fetching essays:', error);
    return { essays: [], allTags: [] };
  }
}

export default function ArchivePage() {
  // Get essays and tags server-side
  const { essays, allTags } = getEssays();

  // Count essays per tag
  const tagCounts: Record<string, number> = {};
  allTags.forEach(tag => {
    tagCounts[tag] = essays.filter(essay => essay.tags.includes(tag)).length;
  });

  return (
    <>
      <div className="mb-8">
        <Link href="/writing" className="group inline-flex items-center text-sm hover:text-primary transition-colors duration-300">
          <ArrowLeftIcon className="w-4 h-4 mr-1 group-hover:text-rose-400 group-hover:-translate-x-1 transition-all duration-300" />
          <Overline>Back to Writing</Overline>
        </Link>
      </div>

      <H1>Writing Archive</H1>
      
      {/* Tag filtering section */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">Filter by Topic</h2>
        <div className="flex flex-wrap gap-2 mb-4" id="tag-buttons">
          {allTags.map(tag => (
            <button
              key={tag}
              data-tag={tag}
              className="tag-button inline-flex items-center bg-[var(--pane-bg-color)] hover:bg-[var(--theme-color)] border border-[var(--color-border)] cursor-pointer px-3 py-1 rounded-full text-sm transition-all"
            >
              {tag} <span className="ml-1 !text-[var(--text-color-light)]">({tagCounts[tag]})</span>
            </button>
          ))}
        </div>
        {allTags.length > 0 && (
          <div className="flex items-center">
            <button
              id="clear-filters"
              className="bg-[var(--mode-color)] hover:bg-[var(--grid-color)] border border-[var(--color-border)] cursor-pointer px-3 py-1 rounded-full text-sm transition-all"
            >
              Clear Filters
            </button>
            <div id="active-filters-count" className="ml-3 text-sm text-text-color-light hidden">
              Showing essays with <span id="tag-count">0</span> selected tags
            </div>
          </div>
        )}
      </div>
      
      {/* Essays list */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4" id="essays-list">
        {essays.length > 0 ? (
          essays.map((essay) => {
            const formattedDate = new Date(essay.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            });
            
            return (
              <Link href={`/writing/${essay.slug}`} data-tags={JSON.stringify(essay.tags)} key={essay.slug} className="essay-item flex flex-col justify-between rounded-[var(--container-radius)] overflow-hidden pane py-6 shadow-md border-b border-border transition-colors duration-150 px-4">
                <h3 className="font-medium text-xl hover:text-primary transition-colors duration-300">
                  {essay.title}
                </h3>
                <div className="flex flex-wrap gap-2 my-2">
                  {essay.tags && essay.tags.map(tag => (
                    <span 
                      key={`${essay.slug}-${tag}`}
                      className="inline-block bg-secondary/10 px-2 py-0.5 rounded-full text-xs"
                    >
                    </span>
                  ))}
                </div>
                <time dateTime={new Date(essay.date).toISOString()} className="text-sm text-text-color-light">
                  {formattedDate}
                </time>
              </Link>
            );
          })
        ) : (
          <p className="text-text-color-light">No essays found.</p>
        )}
      </div>
      
      <div id="no-results" className="py-8 text-center hidden">
        <p className="text-lg">No essays match the selected tags.</p>
        <button 
          id="reset-filters" 
          className="mt-4 bg-primary/10 hover:bg-primary/20 text-text-color px-4 py-2 rounded-full text-sm transition-all"
        >
          Reset Filters
        </button>
      </div>
      
      {/* Client-side JavaScript for filtering */}
      <script dangerouslySetInnerHTML={{ __html: `
        document.addEventListener('DOMContentLoaded', () => {
          const tagButtons = document.querySelectorAll('.tag-button');
          const clearButton = document.getElementById('clear-filters');
          const resetButton = document.getElementById('reset-filters');
          const essayItems = document.querySelectorAll('.essay-item');
          const noResultsElement = document.getElementById('no-results');
          const activeFiltersCount = document.getElementById('active-filters-count');
          const tagCountElement = document.getElementById('tag-count');
          const activeFilters = new Set();
          
          function updateEssayVisibility() {
            if (activeFilters.size === 0) {
              // If no filters are active, show all essays
              essayItems.forEach(item => {
                item.style.display = 'flex';
              });
              noResultsElement.classList.add('hidden');
              activeFiltersCount.classList.add('hidden');
              return;
            }
            
            // Update the active filters count display
            tagCountElement.textContent = activeFilters.size.toString();
            activeFiltersCount.classList.remove('hidden');
            
            // Hide/show essays based on active filters
            let visibleCount = 0;
            
            essayItems.forEach(item => {
              const tagsJson = item.getAttribute('data-tags');
              const tags = JSON.parse(tagsJson || '[]');
              
              // Check if the essay has at least one of the active tags
              const hasActiveTag = Array.from(activeFilters).some(filter => 
                tags.includes(filter)
              );
              
              if (hasActiveTag) {
                item.style.display = 'flex';
                visibleCount++;
              } else {
                item.style.display = 'none';
              }
            });
            
            // Show "no results" message if needed
            if (visibleCount === 0) {
              noResultsElement.classList.remove('hidden');
            } else {
              noResultsElement.classList.add('hidden');
            }
          }
          
          // Add click event to each tag button
          tagButtons.forEach(button => {
            button.addEventListener('click', () => {
              const tag = button.getAttribute('data-tag');
              
              if (!tag) return;
              
              if (activeFilters.has(tag)) {
                // If tag is already active, remove it
                activeFilters.delete(tag);
                button.classList.remove('bg-[var(--theme-color)]');
                button.classList.add('bg-[var(--pane-bg-color)]');
              } else {
                // If tag is not active, add it
                activeFilters.add(tag);
                button.classList.remove('bg-[var(--pane-bg-color)]');
                button.classList.add('bg-[var(--theme-color)]');
              }
              
              updateEssayVisibility();
            });
          });
          
          // Function to clear all filters
          function clearAllFilters() {
            activeFilters.clear();
            
            // Reset button styles
            tagButtons.forEach(button => {
              button.classList.remove('bg-[var(--theme-color)]');
              button.classList.add('bg-[var(--pane-bg-color)]');
            });
            
            updateEssayVisibility();
          }
          
          // Add click event to clear filters button
          clearButton.addEventListener('click', clearAllFilters);
          
          // Add click event to reset filters button in "no results" message
          resetButton.addEventListener('click', clearAllFilters);
        });
      `}} />
    </>
  );
} 