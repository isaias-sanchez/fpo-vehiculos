import fs from 'fs';
import https from 'https';
import path from 'path';

const items = [
    { name: 'gato', url: 'https://upload.wikimedia.org/wikipedia/commons/1/1a/Car_Floor_jack.jpg' },
    { name: 'llavesExpansion', url: 'https://upload.wikimedia.org/wikipedia/commons/7/7b/Adjustablewrenches.jpg' },
    { name: 'destornilladores', url: 'https://upload.wikimedia.org/wikipedia/commons/e/ec/Screw_Driver_display.jpg' },
    { name: 'linterna', url: 'https://upload.wikimedia.org/wikipedia/commons/e/e0/LEDFlashlight.jpg' },
    { name: 'llantaRepuesto', url: 'https://upload.wikimedia.org/wikipedia/commons/b/be/Flat_tire_edited_size.jpg' },
    { name: 'llavesFijas', url: 'https://upload.wikimedia.org/wikipedia/commons/1/1c/Gedore_No._7_combination_wrenches_6%E2%80%9319_mm.jpg' }
];

const dir = 'C:/Users/P827/Downloads/fpo-vehiculos-master/fpo-vehiculos-master/public/img/equipo';

function download(item) {
    return new Promise((resolve) => {
        const file = fs.createWriteStream(path.join(dir, `${item.name}.png`));
        https.get(item.url, {
            headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120.0.0.0' }
        }, (res) => {
            if (res.statusCode !== 200) {
                console.error(`Failed ${item.name}: ${res.statusCode}`);
                resolve();
                return;
            }
            res.pipe(file);
            file.on('finish', () => {
                file.close();
                console.log(`Success: ${item.name}`);
                resolve();
            });
        }).on('error', (err) => {
            console.error(`Error ${item.name}: ${err.message}`);
            resolve();
        });
    });
}

async function run() {
    for (const item of items) {
        await download(item);
    }
}
run();
