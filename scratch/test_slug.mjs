
const API_BASE_URL = 'https://seomaster.stekom.ac.id/api/public/organizations';
const ORG_ID = 'e29fc5ad-506c-4cea-bc2e-157d1abc801d';
const API_KEY = '83623a0d751709750d0c21f0af9c98547358228dff14f73deb83e2f100267653';

async function testSlug() {
    const slug = 'lowongan-dosen-akuntansi-di-kabupaten-asahan-periode-april-2026';
    const projectId = '85d0dd00-19ae-4c71-85fa-519ca37e0d0b';
    const url = `${API_BASE_URL}/${ORG_ID}/contents?projectId=${projectId}&slug=${slug}`;
    
    try {
        const response = await fetch(url, {
            headers: {
                'X-API-Key': API_KEY,
                'Accept': 'application/json'
            }
        });

        if (response.ok) {
            const data = await response.json();
            console.log('Search by slug result:', data.data?.length, 'items');
            if (data.data?.length > 0) {
                console.log('First article slug:', data.data[0].slug);
            }
        } else {
            console.error('Failed to fetch by slug:', response.status);
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

testSlug();
