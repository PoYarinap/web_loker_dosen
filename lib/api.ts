const API_BASE_URL = 'https://seomaster.stekom.ac.id/api/public/organizations'

export interface APIContent {
    id: string
    projectId: string
    content: string
    title: string
    metaDescription: string
    tags: string
    thumbnailUrl: string
    slug: string
    createdAt: string
}

export interface APIResponse {
    data: APIContent[]
    total: number
    page: number
    limit: number
    totalPages: number
}

export async function getArticlesByJurusan(
    jurusanSlug: string,
    page: number = 1,
    limit: number = 10
): Promise<APIResponse | null> {
    const ORG_ID = process.env.SEOMASTER_ORG_ID
    const API_KEY = process.env.SEOMASTER_API_KEY

    const PROJECT_IDS: Record<string, string | undefined> = {
        akuntansi: process.env.PROJECT_ID_AKUNTANSI,
        manajemen: process.env.PROJECT_ID_MANAJEMEN,
    }

    const projectId = PROJECT_IDS[jurusanSlug]
    console.log(
        `[API] Fetching articles for ${jurusanSlug} with projectId: ${projectId}, page: ${page}`
    )

    if (!projectId) {
        console.warn(`[API] No projectId found for jurusan: ${jurusanSlug}`)
        return null
    }

    if (!ORG_ID || !API_KEY) {
        console.error(
            '[API] CRITICAL: Missing SEOMASTER_ORG_ID or SEOMASTER_API_KEY in environment'
        )
        return null
    }

    try {
        const url = `${API_BASE_URL}/${ORG_ID}/contents?projectId=${projectId}&page=${page}&limit=${limit}&v=4`
        console.log(`[API] Calling URL: ${url}`)

        const response = await fetch(url, {
            headers: {
                'X-API-Key': API_KEY,
                Accept: 'application/json',
                'User-Agent':
                    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            },
            next: { revalidate: 3600 },
        })

        if (!response.ok) {
            console.error(
                `[API] Fetch failed for ${jurusanSlug}. Status: ${response.status} ${response.statusText}`
            )
            return null
        }

        const result: APIResponse = await response.json()
        return result
    } catch (error) {
        console.error('[API] Unexpected error fetching articles:', error)
        return null
    }
}

export async function getArticleBySlug(
    jurusanSlug: string,
    jobSlug: string
): Promise<APIContent | null> {
    console.log(
        `[API] Getting article by slug: ${jobSlug} for jurusan: ${jurusanSlug}`
    )
    const result = await getArticlesByJurusan(jurusanSlug, 1, 1000)
    return result?.data.find((a) => a.slug === jobSlug) || null
}

export async function getCountsByJurusan(): Promise<Record<string, number>> {
    const slugs = ['akuntansi', 'manajemen']
    const counts: Record<string, number> = {}

    for (const slug of slugs) {
        try {
            const ORG_ID = process.env.SEOMASTER_ORG_ID
            const API_KEY = process.env.SEOMASTER_API_KEY
            const PROJECT_IDS: Record<string, string | undefined> = {
                akuntansi: process.env.PROJECT_ID_AKUNTANSI,
                manajemen: process.env.PROJECT_ID_MANAJEMEN,
            }
            const projectId = PROJECT_IDS[slug]

            if (!projectId || !ORG_ID || !API_KEY) continue

            const url = `${API_BASE_URL}/${ORG_ID}/contents?projectId=${projectId}&page=1&limit=10&v=3`
            const response = await fetch(url, {
                headers: {
                    'X-API-Key': API_KEY,
                    Accept: 'application/json',
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
                },
                next: { revalidate: 3600 }
            })

            if (response.ok) {
                const result: APIResponse = await response.json()
                counts[slug] = result.total || 0
            }
        } catch (error) {
            console.error(`[API] Error fetching count for ${slug}:`, error)
        }
    }

    return counts
}
