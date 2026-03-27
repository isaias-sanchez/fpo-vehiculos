import fs from 'fs';
import path from 'path';

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

async function fetchImage(query) {
    const url = `https://en.wikipedia.org/w/api.php?action=query&prop=pageimages&titles=${query}&pithumbsize=500&format=json`;
    const res = await fetch(url);
    const data = await res.json();
    const pages = data.query.pages;
    const pageId = Object.keys(pages)[0];
    if (pageId !== '-1' && pages[pageId].thumbnail) {
        return pages[pageId].thumbnail.source;
    }
    return null;
}

async function run() {
    for (const item of items) {
        const imgUrl = await fetchImage(item.q);
        if (imgUrl) {
            console.log(`Downloading ${item.name} from ${imgUrl}`);
            const buf = await fetch(imgUrl).then(r => r.arrayBuffer());
            fs.writeFileSync(path.join(dir, `${item.name}.png`), Buffer.from(buf));
        } else {
            console.log(`Not found for ${item.q}`);
        }
    }
}
run();
