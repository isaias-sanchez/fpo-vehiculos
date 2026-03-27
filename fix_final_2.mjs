import fs from 'fs';
import https from 'https';
import path from 'path';

const items = [
    { name: 'linterna', url: 'https://images.unsplash.com/photo-1613917034320-bf4047dfb28e?q=80&w=500&auto=format&fit=crop' },
    { name: 'llantaRepuesto', url: 'https://images.unsplash.com/photo-1606775390749-05553556af3e?q=80&w=500&auto=format&fit=crop' },
    { name: 'llavesFijas', url: 'https://images.unsplash.com/photo-1581242163695-193375c43294?q=80&w=500&auto=format&fit=crop' }
];

const dir = 'C:/Users/P827/Downloads/fpo-vehiculos-master/fpo-vehiculos-master/public/img/equipo';

function download(item) {
    return new Promise((resolve) => {
        const file = fs.createWriteStream(path.join(dir, `${item.name}.png`));
        https.get(item.url, {
            headers: { 'User-Agent': 'Mozilla/5.0' }
        }, (res) => {
            if (res.statusCode !== 200 && res.statusCode !== 301 && res.statusCode !== 302) {
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
