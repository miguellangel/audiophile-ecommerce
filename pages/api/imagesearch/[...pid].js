export default async function handler(req, res) {
    const { pid } = req.query
    const [product, manufacturer, qty] = pid
    const SUBSCRIPTION_KEY = process.env.NEXT_PUBLIC_AZURE_IMAGE_SEARCH_KEY
    const ENV_URL = process.env.NEXT_PUBLIC_DEV_URL
    //const SearchURL = `https://www.googleapis.com/customsearch/v1?key=${process.env.NEXT_PUBLIC_GOOGLE_SEARCH_API_TOKEN}&cx=${process.env.NEXT_PUBLIC_GOOGLE_SEARCH_ENGINE_ID}&searchType=image&q=${encodeURI(`${product} ${manufacturer}`)}&num=${parseInt(qty)}&rights=cc_publicdomain`
    const searchURL = `https://api.bing.microsoft.com/v7.0/images/search?q=${encodeURIComponent(`${product} ${manufacturer} headphones`)}&count=${qty}`
    const fallbackURL = `${ENV_URL}/api/imagesearch/mockimages`

/*     var response = await fetch(searchURL, {
        method: 'GET',
        mode: 'no-cors',
        redirect: 'follow',
        gzip: false,
        headers:  { 'Ocp-Apim-Subscription-Key': SUBSCRIPTION_KEY },
    }).then(async r => r.status === 200 ? r.text() : await fetch(fallbackURL))
        .then(v => v.json())
    
    res.status(200).json(
        JSON.parse(JSON.stringify(response))
    ) */

    try {
        let azureResponse = await fetch(searchURL, {
            method: 'GET',
            mode: 'no-cors',
            redirect: 'follow',
            gzip: false,
            headers: {'Ocp-Apim-Subscription-Key': SUBSCRIPTION_KEY}
        })

        let azureData = await azureResponse.json();

        if (azureResponse.ok) {
            res.status(200).json(JSON.parse(JSON.stringify(azureData)));
        } else {
            throw new Error('API call failed');
        }
    } catch (e) {
        console.log(e)
        let fallbackResponse = await fetch(fallbackURL);
        let fallbackData = await fallbackResponse.json();
        res.status(200).json(JSON.parse(JSON.stringify(fallbackData)));
    }

}
