
const API_BASE_URL = 'https://seomaster.stekom.ac.id/api/public/organizations';
const ORG_ID = 'e29fc5ad-506c-4cea-bc2e-157d1abc801d';
const API_KEY = '83623a0d751709750d0c21f0af9c98547358228dff14f73deb83e2f100267653';

const PROJECTS = [
    { name: 'Akuntansi', id: '85d0dd00-19ae-4c71-85fa-519ca37e0d0b' },
    { name: 'Manajemen', id: '05c090b1-02ae-4485-88da-a2b5230c3eb7' }
];

async function getTotals() {
    for (const project of PROJECTS) {
        const url = `${API_BASE_URL}/${ORG_ID}/contents?projectId=${project.id}&page=1&limit=1`;
        try {
            const response = await fetch(url, {
                headers: {
                    'X-API-Key': API_KEY,
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                const data = await response.json();
                console.log(`${project.name}: ${data.total} data`);
            } else {
                console.error(`Failed to fetch ${project.name}: ${response.status} ${response.statusText}`);
            }
        } catch (error) {
            console.error(`Error fetching ${project.name}:`, error);
        }
    }
}

getTotals();
