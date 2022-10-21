import { db } from "/firebase/config"
import { query, collection, limit, getDoc, getDocs, doc, startAfter, orderBy } from "firebase/firestore"

export default async function handler(req, res) {
	const { pid } = req.query
	var [type, limit, order, direction, startVal] = pid
    console.log('HEEKLJ', type)

	// let lastVisible = JSON.parse(decodeURIComponent(lastVisibleSnapshot))
    var response = await resolveData(type, limit, order, direction, startVal)
//	var response = await resolveData({ type: type, limit: limit, order: order, direction: direction, startVal: startVal })
	// res.end(startVal)
	res.status(200).json(
		JSON.parse(JSON.stringify(response))
	)
	res.status()

}




const resolveData = (type, limitt, order, direction, startVal) => new Promise(async resolve => {
    console.log(typeof(type), type)
	var ct = parseInt(limitt) ?? 9 // default to 9 items per page, else get from router query
	
	const shouldResolve = (arr, ct) => arr.length >= ct // resolve if enough items in payload
	
	const subTypesRef = doc(db, `collections`, `${type.toLowerCase()}`) // the ref query
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
                console.log([order, direction])
				if (startVal !== "null") {
					q = query(collection(db, `collections/${type.toLowerCase()}/${subType}`),
						orderBy(order, direction), // returns max two strings e.g. price, desc
						startAfter(startVal),
						limit(ct))
				} else {
					q = query(collection(db, `collections/${type.toLowerCase()}/${subType}`),
						orderBy(order, direction), // returns max two strings e.g. price, desc
						limit(ct))
				}
				const d = await getDocs(q).then(value => {
					value.forEach(doc => payload.push(doc.data()))
				})

			}
		}
	}
    return resolve({data: payload.length > 0 ? [...payload] : [], meta: {n_items: payload.length > 0 ? payload.length : 0}})
})
