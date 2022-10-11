import { db } from './config'
import { query, collection, limit, getDoc, getDocs, doc, orderBy } from "firebase/firestore"

const getData = async (params) => {
	
	return await (async () => {
		var ct = 9 // default to 9 items per page, else get from router query

		const shouldResolve = (arr, ct) => arr.length >= ct // resolve if enough items in payload
		const subTypesRef = doc(db, `collections`, `${params.pid[0].toLowerCase()}`) // the ref query
		const metaVal = await getDoc(subTypesRef)

		var payload = []
		// var lastSeenDocRef = null;


		if (metaVal.exists()) {
			var n_items = metaVal.data()['_meta_']['n_items']
			for (const subType of metaVal.data()['_meta_']['subTypes']) {
				if (shouldResolve(payload, ct)) {
					// console.log('sending', { "data": payload, "meta": { 'n_items': n_items} })
					return { "data": payload, "meta": { 'n_items': n_items } }

				} else {
					var q = query(collection(db, `collections/${params.pid[0].toLowerCase()}/${subType}`),
							orderBy('name'), // returns max two strings e.g. price, desc
							limit(ct))
					const d = await getDocs(q).then(value => {
						value.forEach(doc => payload.push(doc.data()))
					})

				}
			}
		}
		return { "data": null }
	})()

}

export default getData