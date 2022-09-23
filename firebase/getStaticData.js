import { db } from './config'
import { query, collection, limit, getDoc, getDocs, doc } from "firebase/firestore"


const resolveData = (params) => new Promise(async resolve => {
    var ct = params.limit ?? 9 // default to 9 items per page, else get from router query

    const shouldResolve = (arr, ct) => arr.length >= ct // resolve if enough items in payload
    const subTypesRef = doc(db, `collections`, `${params.pid[0].toLowerCase()}`) // the ref query
    const metaVal = await getDoc(subTypesRef)

    var payload = []

    if (metaVal.exists()) {
        var n_items = metaVal.data()['_meta_']['n_items']
        for (const subType of metaVal.data()['_meta_']['subTypes']) {
            if (shouldResolve(payload, ct)) {
                return resolve({"data": payload, "meta": {'n_items': n_items}})
            } else {
    		    const q = query(collection(db, `collections/${params.pid[0].toLowerCase()}/${subType}`), limit(ct))
                const d = await getDocs(q).then(value => {
                    value.forEach(doc => payload.push(doc.data()))
    
                })
                
            }
        }
    }
})

const getData = async (params) => {
    
    var response = await resolveData(params)

    return response;
}

export default getData

