import fs from 'fs';
import fetch from 'node-fetch';

async function init() {
    try {
        var arg = null;
        if (process.argv.length > 2) {
            arg = process.argv[2]
            console.log(`Argumento recibido: ${process.argv[2]}`);
        }
        const fetchRequest = await fetch(arg, {
            method: 'get',
            headers: {
                'Referer': 'https://civitai.com',
                'Content-Type': 'application/json',
                'User-Agent': "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
            }
        });

        console.log(fetchRequest.status);
        console.log(fetchRequest.headers.get("content-length"))
        const fileResource = fs.createWriteStream("./" + "model.safetensors");
        fetchRequest.body.pipe(fileResource);
        fileResource.on('finish', () => {
            console.log("############# DESCARGADO ############### "); 
        });
        
    } catch (error) {
        console.log(error)
    }


}

init();