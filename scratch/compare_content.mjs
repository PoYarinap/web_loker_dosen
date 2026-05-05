import { getArticlesByJurusan, getArticleBySlug } from './lib/api.js';

async function test() {
    console.log("--- AKUNTANSI ---");
    const akun = await getArticlesByJurusan('akuntansi', 1, 1);
    if (akun.data[0]) {
        const detail = await getArticleBySlug('akuntansi', akun.data[0].slug);
        console.log(detail.title);
        console.log(detail.content.substring(0, 500));
    }

    // Hardcode for testing
    process.env.SEOMASTER_ORG_ID = '31';
    process.env.SEOMASTER_API_KEY = '5348888b-6f81-49cc-8519-756182c61148';
    process.env.PROJECT_ID_AKUNTANSI = '114';
    process.env.PROJECT_ID_MANAJEMEN = '115';

    console.log("\n--- MANAJEMEN RAW ---");
    const man = await getArticlesByJurusan('manajemen', 1, 1);
    if (man && man.data && man.data[0]) {
        const detail = await getArticleBySlug('manajemen', man.data[0].slug);
        console.log("TITLE:", detail.title);
        console.log("RAW CONTENT:\n", detail.content);
    } else {
        console.log("No data found for Manajemen");
    }
}

test();
