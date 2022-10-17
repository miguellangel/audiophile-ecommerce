export default async function handler(req, res) {
    const { pid } = req.query
    const [product, manufacturer, qty] = pid

    const SearchURL = `https://www.googleapis.com/customsearch/v1?key=${process.env.NEXT_PUBLIC_GOOGLE_SEARCH_API_TOKEN}&cx=${process.env.NEXT_PUBLIC_GOOGLE_SEARCH_ENGINE_ID}&searchType=image&q=${encodeURI(`${product} ${manufacturer}`)}&num=${qty}&rights=cc_publicdomain`
    var response = await fetch(SearchURL).then(res => res.json())

    res.status(200).json(
        JSON.parse(JSON.stringify(response))
    )
}