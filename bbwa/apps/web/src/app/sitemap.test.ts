import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import sitemap from './sitemap'

// Mock Supabase client
const mockSupabaseData = [
  { slug: 'modern-home-renovation', updated_at: '2024-01-15T10:00:00Z' },
  { slug: 'luxury-extension-perth', updated_at: '2024-01-20T15:30:00Z' },
  { slug: 'commercial-office-fitout', updated_at: '2024-01-25T09:15:00Z' },
]

vi.mock('@/lib/supabase/server', () => ({
  createClient: vi.fn(() => ({
    from: vi.fn(() => ({
      select: vi.fn(() => ({
        eq: vi.fn(() => ({
          then: vi.fn(),
          catch: vi.fn(),
        })),
      })),
    })),
  })),
}))

vi.mock('@/lib/services-data', () => ({
  servicesData: [
    { slug: 'new-home-construction' },
    { slug: 'home-renovations' },
    { slug: 'extensions-additions' },
    { slug: 'commercial-construction' },
    { slug: 'maintenance-repairs' },
    { slug: 'project-management' },
  ],
}))

describe('Sitemap Generation', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('should generate sitemap with static routes', async () => {
    // Mock successful database response
    const { createClient } = await import('@/lib/supabase/server')
    const mockClient = createClient()
    vi.mocked(mockClient.from).mockReturnValue({
      select: vi.fn().mockReturnValue({
        eq: vi.fn().mockReturnValue({
          then: vi.fn().mockResolvedValue({ data: mockSupabaseData }),
          catch: vi.fn(),
        }),
      }),
    } as any)

    const result = await sitemap()

    expect(result).toBeDefined()
    expect(Array.isArray(result)).toBe(true)
    expect(result.length).toBeGreaterThan(0)

    // Check for required static routes
    const urls = result.map(entry => entry.url)
    expect(urls).toContain('https://baysidebuilderswa.com.au')
    expect(urls).toContain('https://baysidebuilderswa.com.au/about')
    expect(urls).toContain('https://baysidebuilderswa.com.au/contact')
    expect(urls).toContain('https://baysidebuilderswa.com.au/services')
    expect(urls).toContain('https://baysidebuilderswa.com.au/projects')
  })

  it('should include service routes', async () => {
    const result = await sitemap()
    const urls = result.map(entry => entry.url)

    // Check for service routes
    expect(urls).toContain('https://baysidebuilderswa.com.au/services/new-home-construction')
    expect(urls).toContain('https://baysidebuilderswa.com.au/services/home-renovations')
    expect(urls).toContain('https://baysidebuilderswa.com.au/services/extensions-additions')
  })

  it('should set correct priority and change frequency', async () => {
    const result = await sitemap()
    
    const homeEntry = result.find(entry => entry.url === 'https://baysidebuilderswa.com.au')
    expect(homeEntry?.priority).toBe(1.0)
    expect(homeEntry?.changeFrequency).toBe('weekly')

    const servicesEntry = result.find(entry => entry.url === 'https://baysidebuilderswa.com.au/services')
    expect(servicesEntry?.priority).toBe(0.9)
    expect(servicesEntry?.changeFrequency).toBe('weekly')
  })

  it('should handle database errors gracefully', async () => {
    // Mock database error
    const { createClient } = await import('@/lib/supabase/server')
    const mockClient = createClient()
    vi.mocked(mockClient.from).mockReturnValue({
      select: vi.fn().mockReturnValue({
        eq: vi.fn().mockReturnValue({
          then: vi.fn().mockRejectedValue(new Error('Database error')),
          catch: vi.fn(),
        }),
      }),
    } as any)

    const result = await sitemap()
    
    // Should still return static routes even if database fails
    expect(result).toBeDefined()
    expect(Array.isArray(result)).toBe(true)
    const urls = result.map(entry => entry.url)
    expect(urls).toContain('https://baysidebuilderswa.com.au')
  })

  it('should have valid lastModified dates', async () => {
    const result = await sitemap()
    
    result.forEach(entry => {
      expect(entry.lastModified).toBeInstanceOf(Date)
      expect(entry.lastModified.getTime()).toBeLessThanOrEqual(Date.now())
    })
  })
})