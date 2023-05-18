const https = require('https');
const fs = require('fs');

const name = 'SAINT-Photolife-Zia-Vol.02';
const baseUrl = 'https://lux.mrcong.com/images/2023/04/26/SAINT-Photolife-Zia-Vol.02-Amazing-MrCong.com-' + '{0}' + '.webp';

function downloadImage(url, localPath) {


    https.get(url, function (response) {
     
        console.log(response.statusCode);
        if (response.statusCode == 200) {
            const file = fs.createWriteStream(localPath);
            response.pipe(file);

            file.on('finish', function () {
                file.close();
                if (fs.existsSync(localPath)) {
                    console.log(`Downloaded ${url} to ${localPath}`);
                } else {
                    console.log(`Error downloading ${url}: File not found`);
                }
            });
        }

    }).on('error', function (err) {
        fs.unlink(localPath);
        console.error(`Error downloading ${url}: ${err.message}`);
    });
}


// function downloadImage(imageUrl, imagePath) {
//     // Download the image
//     const file = fs.createWriteStream(imagePath);
//     https.get(imageUrl, (response) => {
//         console.log(response);
//         response.pipe(file);
//         file.on('finish', () => {

//             //console.log(file);
//             file.close();

//             console.log('Image downloaded.');
//         });
//     }).on('error', (err) => {
//         fs.unlink(imagePath);
//         console.error(`Error downloading image: ${err}`);
//     });
// }


function getUrl(index) {
    let i = index;
    if (index < 10) {
        i = '00' + index;
    }
    else if (index < 100) {
        i = '0' + index;
    }
    let url = baseUrl.replace('{0}', i);
    return url;

}

let directory = 'download/' + name;
if (!fs.existsSync(directory)) {
    // Create directory
    fs.mkdirSync(directory);
    console.log(`Directory '${directory}' created.`);
} else {
    console.log(`Directory '${directory}' already exists.`);
}
for (let index = 1; index < 999; index++) {

    const url = getUrl(index);
    console.log(url);

    downloadImage(url, directory + '/' + index + '.webp');
}


//downloadImage('https://lux.mrcong.com/images/2023/04/26/DJAWA-Photo-Son-Ye-Eun-Early-Spring-Walk-in-March-Vol.2-S.Ver-MrCong.com-200.webp', 'testImage.webp');

//downloadImage('https://lux.mrcong.com/images/2023/04/26/DJAWA-Photo-Son-Ye-Eun-Early-Spring-Walk-in-March-Vol.2-S.Ver-MrCong.com-002.webp', 'download/image2.webp');