import fs from 'fs';
import path from 'path';

const items = [
  { name: 'gato', url: 'https://upload.wikimedia.org/wikipedia/commons/1/1a/Car_jack.jpg' },
  { name: 'llavesExpansion', url: 'https://upload.wikimedia.org/wikipedia/commons/c/c5/Adjustable_wrench.jpg' },
  { name: 'destornilladores', url: 'https://upload.wikimedia.org/wikipedia/commons/1/1c/Screw_Driver_display.jpg' },
  { name: 'linterna', url: 'https://upload.wikimedia.org/wikipedia/commons/e/e4/LED_Flashlights.jpg' },
  { name: 'llantaRepuesto', url: 'https://upload.wikimedia.org/wikipedia/commons/b/be/Flat_tire_edited_size.jpg' },
  { name: 'llavesFijas', url: 'https://upload.wikimedia.org/wikipedia/commons/1/1c/Gedore_No._7_combination_wrenches_6%E2%80%9319_mm.jpg' }
];

const dir = 'C:/Users/P827/Downloads/fpo-vehiculos-master/fpo-vehiculos-master/public/img/equipo';
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

async function download(name, url) {
    try {
        const res = await fetch(url, {
            headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36' }
        });
        if (!res.ok) throw new Error(`Status ${res.status}`);
        const buf = await res.arrayBuffer();
        fs.writeFileSync(path.join(dir, `${name}.png`), Buffer.from(buf));
        console.log(`Success: ${name}`);
    } catch (e) {
        console.error(`Failed ${name}: ${e.message}`);
    }
}

async function run() {
    for (const item of items) {
        await download(item.name, item.url);
    }
}
run();
