const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/image-urls', (req, res) => {

    console.log(req);

    const urls = [
        'https://lux.mrcong.com/images/2023/04/26/DJAWA-Photo-Son-Ye-Eun-Early-Spring-Walk-in-March-Vol.2-S.Ver-MrCong.com-001.webp',
        'https://lux.mrcong.com/images/2023/04/26/DJAWA-Photo-Son-Ye-Eun-Early-Spring-Walk-in-March-Vol.2-S.Ver-MrCong.com-002.webp',
        'https://lux.mrcong.com/images/2023/04/26/DJAWA-Photo-Son-Ye-Eun-Early-Spring-Walk-in-March-Vol.2-S.Ver-MrCong.com-999.webp',
    ]
    res.render('image-urls', { urls })
})

app.post('/submit-text', (req, res) => {
    const text = req.body.text
    const urls = [];
    for (let index = 0; index < 999; index++) {

        urls.push(getUrl(text, index));
    }
    // const urls = [
    //     'https://lux.mrcong.com/images/2023/04/26/DJAWA-Photo-Son-Ye-Eun-Early-Spring-Walk-in-March-Vol.2-S.Ver-MrCong.com-001.webp',
    //     'https://lux.mrcong.com/images/2023/04/26/DJAWA-Photo-Son-Ye-Eun-Early-Spring-Walk-in-March-Vol.2-S.Ver-MrCong.com-002.webp',
    //     'https://lux.mrcong.com/images/2023/04/26/DJAWA-Photo-Son-Ye-Eun-Early-Spring-Walk-in-March-Vol.2-S.Ver-MrCong.com-999.webp',
    // ]
    res.render('image-urls', { urls })
    //res.send(`You submitted: ${text}`)
})

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})


app.listen(3000, () => {
    console.log('Server listening on port 3000')
})

function getUrl(rawUrl, index) {
    let i = index;
    if (index < 10) {
        i = '00' + index;
    }
    else if (index < 100) {
        i = '0' + index;
    }
    let url = rawUrl.replace('001', i);
    return url;

}
