'use client'

import { useState, useEffect } from 'react'
import { config } from '../../config/environment'
import Link from 'next/link'

export default function SubstackDebugPage() {
  const [testResult, setTestResult] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [publicationUrl, setPublicationUrl] = useState(config.substackUrl)

  const testDirectApi = async () => {
    setIsLoading(true)
    setError(null)
    setTestResult(null)

    try {
      const apiUrl = new URL('/api/substack-posts', window.location.origin)
      apiUrl.searchParams.append('publication_url', publicationUrl)
      
      console.log(`Testing API with URL: ${apiUrl.toString()}`)
      
      const response = await fetch(apiUrl.toString())
      const data = await response.json()
      
      setTestResult(data)
      
      if (!response.ok) {
        setError(`API Error: ${data.error || response.statusText}`)
      }
    } catch (err) {
      setError(`Fetch error: ${err instanceof Error ? err.message : String(err)}`)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Substack API Debug Page</h1>
      
      <div className="mb-8">
        <h2 className="text-xl mb-2">Configuration</h2>
        <div className="bg-white/5 p-4 rounded-lg mb-4">
          <p><strong>Current Substack URL:</strong> {config.substackUrl}</p>
        </div>
        
        <div className="mb-4">
          <label className="block mb-2">Test with different URL:</label>
          <input 
            type="text" 
            value={publicationUrl} 
            onChange={(e) => setPublicationUrl(e.target.value)}
            className="w-full p-2 bg-white/10 rounded border border-white/20" 
          />
        </div>
        
        <button 
          onClick={testDirectApi}
          className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded transition"
          disabled={isLoading}
        >
          {isLoading ? 'Testing...' : 'Test API'}
        </button>
      </div>
      
      {error && (
        <div className="mb-8 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
          <h3 className="text-red-400 mb-2">Error</h3>
          <pre className="whitespace-pre-wrap text-sm">{error}</pre>
        </div>
      )}
      
      {testResult && (
        <div className="mb-8">
          <h2 className="text-xl mb-2">API Response</h2>
          <div className="bg-white/5 p-4 rounded-lg overflow-auto max-h-96">
            <pre className="whitespace-pre-wrap text-sm">
              {JSON.stringify(testResult, null, 2)}
            </pre>
          </div>
        </div>
      )}
      
      <div className="mt-8">
        <Link 
          href="/"
          className="text-secondary hover:text-primary transition"
        >
          Back to Home
        </Link>
      </div>
    </div>
  )
} 