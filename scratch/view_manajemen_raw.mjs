
const API_BASE_URL = 'https://seomaster.stekom.ac.id/api/public/organizations';
const ORG_ID = 'e29fc5ad-506c-4cea-bc2e-157d1abc801d';
const API_KEY = '83623a0d751709750d0c21f0af9c98547358228dff14f73deb83e2f100267653';
const PROJECT_ID_MANAJEMEN = '05c090b1-02ae-4485-88da-a2b5230c3eb7';

async function viewRaw() {
    const url = `${API_BASE_URL}/${ORG_ID}/contents?projectId=${PROJECT_ID_MANAJEMEN}&page=1&limit=1`;
    const response = await fetch(url, {
        headers: {
            'X-API-Key': API_KEY,
            'Accept': 'application/json'
        }
    });

    if (response.ok) {
        const data = await response.json();
        if (data.data && data.data[0]) {
            console.log("TITLE:", data.data[0].title);
            console.log("CONTENT:\n", data.data[0].content);
        }
    } else {
        console.error("Failed:", response.status);
    }
}

viewRaw();
