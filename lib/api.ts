const API_BASE_URL = 'https://seomaster.stekom.ac.id/api/public/organizations';

export interface APIContent {
    id: string;
    projectId: string;
    content: string;
    title: string;
    metaDescription: string;
    tags: string;
    thumbnailUrl: string;
    slug: string;
    createdAt: string;
}

export interface APIResponse {
    data: APIContent[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}

export async function getArticlesByJurusan(jurusanSlug: string): Promise<APIContent[]> {
    const ORG_ID = process.env.SEOMASTER_ORG_ID;
    const API_KEY = process.env.SEOMASTER_API_KEY;

    const PROJECT_IDS: Record<string, string | undefined> = {
        'akuntansi': process.env.PROJECT_ID_AKUNTANSI,
        'manajemen': process.env.PROJECT_ID_MANAJEMEN,
    };

    const projectId = PROJECT_IDS[jurusanSlug];
    console.log(`[API] Fetching articles for ${jurusanSlug} with projectId: ${projectId}`);
    
    if (!projectId) {
        console.warn(`[API] No projectId found for jurusan: ${jurusanSlug}`);
        return [];
    }

    if (!ORG_ID || !API_KEY) {
        console.error('[API] CRITICAL: Missing SEOMASTER_ORG_ID or SEOMASTER_API_KEY in environment');
        console.log('[API] Environment keys available:', Object.keys(process.env).filter(k => k.includes('SEOMASTER') || k.includes('PROJECT_ID')));
        return [];
    }

    try {
        // Tambahkan parameter v=2 untuk memaksa Next.js & Vercel menghapus cache lama (Cache Busting)
        const url = `${API_BASE_URL}/${ORG_ID}/contents?projectId=${projectId}&page=1&limit=10&v=2`;
        console.log(`[API] Calling URL: ${url}`);
        
        const response = await fetch(url, {
            headers: {
                'X-API-Key': API_KEY,
                'Accept': 'application/json',
            },
            next: { revalidate: 3600 } 
        });

        if (!response.ok) {
            console.error(`[API] Fetch failed with status: ${response.status}`);
            const errorText = await response.text();
            console.error(`[API] Error details: ${errorText.substring(0, 200)}`);
            return [];
        }
        
        const result: APIResponse = await response.json();
        console.log(`[API] Successfully fetched ${result.data?.length || 0} articles`);
        return result.data || [];
    } catch (error) {
        console.error('[API] Unexpected error fetching articles:', error);
        return [];
    }
}

export async function getArticleBySlug(jurusanSlug: string, jobSlug: string): Promise<APIContent | null> {
    console.log(`[API] Getting article by slug: ${jobSlug} for jurusan: ${jurusanSlug}`);
    const articles = await getArticlesByJurusan(jurusanSlug);
    return articles.find(a => a.slug === jobSlug) || null;
}

