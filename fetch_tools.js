const fs = require('fs');
const path = require('path');
const https = require('https');

const items = [
  { name: 'botiquin', q: 'First_aid_kit' },
  { name: 'extintor', q: 'Fire_extinguisher' },
  { name: 'gato', q: 'Car_jack' },
  { name: 'cruceta', q: 'Lug_wrench' },
  { name: 'senales', q: 'Warning_triangle' },
  { name: 'tacos', q: 'Wheel_chock' },
  { name: 'alicate', q: 'Pliers' },
  { name: 'destornilladores', q: 'Screwdriver' },
  { name: 'llavesExpansion', q: 'Adjustable_wrench' },
  { name: 'llavesFijas', q: 'Wrench' },
  { name: 'llantaRepuesto', q: 'Spare_tire' },
  { name: 'linterna', q: 'Flashlight' }
];

const dir = 'C:/Users/P827/Downloads/fpo-vehiculos-master/fpo-vehiculos-master/public/img/equipo';
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

function fetchJSON(url) {
    return new Promise((resolve, reject) => {
        https.get(url, { headers: { 'User-Agent': 'NodeJS/Agent' } }, res => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                try { resolve(JSON.parse(data)); } catch (e) { resolve(null); }
            });
        }).on('error', reject);
    });
}

function downloadImage(url, dest) {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(dest);
        https.get(url, res => {
            res.pipe(file);
            file.on('finish', () => { file.close(resolve); });
        }).on('error', err => {
            fs.unlink(dest, () => {});
            reject(err);
        });
    });
}

async function run() {
    for (const item of items) {
        const url = https://en.wikipedia.org/w/api.php?action=query&prop=pageimages&titles=\&pithumbsize=500&format=json;
        const data = await fetchJSON(url);
        if (!data || !data.query || !data.query.pages) continue;
        const pages = data.query.pages;
        const pageId = Object.keys(pages)[0];
        if (pageId !== '-1' && pages[pageId].thumbnail) {
            const imgUrl = pages[pageId].thumbnail.source;
            console.log(Downloading \ from \);
            await downloadImage(imgUrl, path.join(dir, \.jpg));
        } else {
            console.log(Not found for \);
        }
    }
}
run();
