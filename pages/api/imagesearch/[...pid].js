import zlib from 'zlib'

export default async function handler(req, res) {
    const { pid } = req.query
    const [product, manufacturer, qty] = pid
    const SUBSCRIPTION_KEY = process.env.NEXT_PUBLIC_AZURE_IMAGE_SEARCH_KEY
    //const SearchURL = `https://www.googleapis.com/customsearch/v1?key=${process.env.NEXT_PUBLIC_GOOGLE_SEARCH_API_TOKEN}&cx=${process.env.NEXT_PUBLIC_GOOGLE_SEARCH_ENGINE_ID}&searchType=image&q=${encodeURI(`${product} ${manufacturer}`)}&num=${parseInt(qty)}&rights=cc_publicdomain`
    const searchURL = `https://api.bing.microsoft.com/v7.0/images/search?q=${encodeURIComponent(`${product} ${manufacturer} headphones`)}&count=${qty}`

//    headers:  { 'Ocp-Apim-Subscription-Key': SUBSCRIPTION_KEY },
    var response = await fetch(searchURL, {
        method: 'GET',
        mode: 'no-cors',
        redirect: 'follow',
        gzip: false,
        headers:  { 'Ocp-Apim-Subscription-Key': SUBSCRIPTION_KEY },
    }).then(res => res.text())

    res.status(200).json(
        JSON.parse(JSON.stringify(response))
    )
}
