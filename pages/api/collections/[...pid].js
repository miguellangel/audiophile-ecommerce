import { db } from "/firebase/config"
import { query, collection, limit, getDoc, getDocs, doc, startAfter, orderBy } from "firebase/firestore"

export default async function handler(req, res) {
	const { pid } = req.query
	var [type, limit, order, startVal] = pid

	// let lastVisible = JSON.parse(decodeURIComponent(lastVisibleSnapshot))

	var response = await resolveData({ type: type, limit: limit, order: order, startVal: startVal })
	// res.end(startVal)
	res.status(200).json(
		JSON.parse(JSON.stringify(response))
	)
	res.status()

}




const resolveData = (params) => new Promise(async resolve => {
	var ct = parseInt(params.limit) ?? 9 // default to 9 items per page, else get from router query
	
	const shouldResolve = (arr, ct) => arr.length >= ct // resolve if enough items in payload
	
	const subTypesRef = doc(db, `collections`, `${params.type.toLowerCase()}`) // the ref query
	const metaVal = await getDoc(subTypesRef)

	var payload = []
	// var lastSeenDocRef = null;


	if (metaVal.exists()) {
		var n_items = metaVal.data()['_meta_']['n_items']
		for (const subType of metaVal.data()['_meta_']['subTypes']) {
			if (shouldResolve(payload, ct)) {
				// console.log('sending', { "data": payload, "meta": { 'n_items': n_items} })
				resolve({ "data": payload, "meta": { 'n_items': n_items } })

			} else {
				var q
				if (params.startVal !== "null") {
					q = query(collection(db, `collections/${params.type.toLowerCase()}/${subType}`),
						orderBy(...params.order.split('-')), // returns max two strings e.g. price, desc
						startAfter(params.startVal),
						limit(ct))
				} else {
					q = query(collection(db, `collections/${params.type.toLowerCase()}/${subType}`),
						orderBy(...params.order.split('-')), // returns max two strings e.g. price, desc
						limit(ct))
				}
				const d = await getDocs(q).then(value => {
					value.forEach(doc => payload.push(doc.data()))
				})

			}
		}
	}
	return resolve({"data": null})
})