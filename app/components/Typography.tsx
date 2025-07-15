'use client'

import { LinkIcon } from '@heroicons/react/20/solid'
import { useState } from 'react'

interface TextProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

interface H2Props extends TextProps {
  id?: string;
  anchor?: boolean;
}

interface H3Props extends TextProps {
  id?: string;
  anchor?: boolean;
}

interface TextLinkProps extends TextProps {
  href: string;
  external?: boolean;
}

// Helper function to generate ID from text
function generateId(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function H1({ children, className = '', style = {} }: TextProps) {
  return (
    <h1 style={style} className={`mb-6 text-5xl lg:text-7xl font-[700] leading-tight font-display ${className}`}>
      {children}
    </h1>
  );
}

export function H2({ children, className = '', style = {}, id, anchor = false }: H2Props) {
  const [copied, setCopied] = useState(false)
  const [showToast, setShowToast] = useState(false)
  
  // Generate ID from children text if not provided and anchor is enabled
  const headingId = anchor ? (id || generateId(children?.toString() || '')) : id
  
  const copyToClipboard = async () => {
    const url = `${window.location.origin}${window.location.pathname}#${headingId}`
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setShowToast(true)
      
      // Start fade out after a delay
      setTimeout(() => {
        setCopied(false)
      }, 800)
      
      // Remove from DOM after fade out completes
      setTimeout(() => {
        setShowToast(false)
      }, 1200)
    } catch (err) {
      console.error('Failed to copy: ', err)
    }
  }

  if (!anchor) {
    return (
      <h2 
        id={headingId}
        style={style} 
        className={`mb-6 text-3xl lg:text-5xl font-bold text-text-heading font-display ${className}`}
      >
        {children}
      </h2>
    );
  }

  return (
    <h2 
      id={headingId}
      style={style} 
      className={`group relative mb-6 text-3xl lg:text-5xl font-bold text-text-heading font-display ${className}`}
    >
      <span className="flex items-center gap-3">
        {children}
        <div className="relative">
          <button
            onClick={copyToClipboard}
            className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-2 hover:bg-white/10 rounded-md cursor-pointer"
            title="Copy link to section"
            aria-label="Copy link to this section"
          >
            <LinkIcon className="w-5 h-5 text-gray-400 hover:text-gray-600 transition-colors duration-200" />
          </button>
          
          {/* Toast notification */}
          {showToast && (
            <div className={`absolute top-1/2 left-12 transform -translate-y-1/3 bg-white !text-[var(--text-color-light)] text-sm px-3 py-2 rounded-full shadow-sm border border-gray-200 transition-all duration-300 ease-out ${
              copied 
                ? 'opacity-100 scale-100 -translate-x-1' 
                : 'opacity-0 scale-95 translate-x-2'
            }`}>
              <div className="flex items-center gap-2">
                copied!
              </div>
            </div>
          )}
        </div>
      </span>
    </h2>
  );
}

export function H3({ children, className = '', style = {}, id, anchor = false }: H3Props) {
  const [copied, setCopied] = useState(false)
  const [showToast, setShowToast] = useState(false)
  
  // Generate ID from children text if not provided and anchor is enabled
  const headingId = anchor ? (id || generateId(children?.toString() || '')) : id
  
  const copyToClipboard = async () => {
    const url = `${window.location.origin}${window.location.pathname}#${headingId}`
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setShowToast(true)
      
      // Start fade out after a delay
      setTimeout(() => {
        setCopied(false)
      }, 800)
      
      // Remove from DOM after fade out completes
      setTimeout(() => {
        setShowToast(false)
      }, 1200)
    } catch (err) {
      console.error('Failed to copy: ', err)
    }
  }

  if (!anchor) {
    return (
      <h3 
        id={headingId}
        style={style} 
        className={`mb-6 text-2xl lg:text-3xl font-bold text-text-heading font-display ${className}`}
      >
        {children}
      </h3>
    );
  }

  return (
    <h3 
      id={headingId}
      style={style} 
      className={`group relative mb-6 text-2xl lg:text-3xl font-bold text-text-heading font-display ${className}`}
    >
      <span className="flex items-center gap-3">
        {children}
        <div className="relative">
          <button
            onClick={copyToClipboard}
            className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-1 hover:bg-white/10 rounded-md cursor-pointer"
            title="Copy link to section"
            aria-label="Copy link to this section"
          >
            <LinkIcon className="w-4 h-4 text-gray-400 hover:text-gray-600 transition-colors duration-200" />
          </button>
          
          {/* Toast notification */}
          {showToast && (
            <div className={`absolute top-1/2 left-10 transform -translate-y-1/2 bg-white text-gray-800 text-sm px-3 py-2 rounded-md shadow-xl border border-gray-200 transition-all duration-300 ease-out ${
              copied 
                ? 'opacity-100 scale-100 translate-x-0' 
                : 'opacity-0 scale-95 translate-x-2'
            }`}>
              <div className="flex items-center gap-2">
                copied!
              </div>
            </div>
          )}
        </div>
      </span>
    </h3>
  );
}

export function H4({ children, className = '', style = {} }: TextProps) {
  return (
    <h3 style={style} className={`mb-6 text-xl lg:text-2xl font-bold text-text-heading font-display ${className}`}>
      {children}
    </h3>
  );
}

export function Caption({ children, className = '', style = {} }: TextProps) {
  return (
    <div style={style} className={`text-sm font-[500] text-text-color-light ${className}`}>
      {children}
    </div>
  );
}

export function Overline({ children, className = '', style = {} }: TextProps) {
  return (
    <div style={style} className={`text-xs uppercase font-sans tracking-wider text-text-tertiary ${className}`}>
      {children}
    </div>
  );
}

export function TextLink({ children, href, external = false, className = '', style = {} }: TextLinkProps) {
  const externalProps = external ? {
    target: "_blank",
    rel: "noopener noreferrer"
  } : {};

  return (
    <a 
      href={href}
      style={style}
      className={`text-text-color hover:text-text-heading underline underline-offset-4 transition-colors ${className}`}
      {...externalProps}
    >
      {children}
    </a>
  );
} 