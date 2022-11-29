import { db } from '/firebase/config'
import { getDoc, doc } from "firebase/firestore"

export default async function handler(req, res) {
    const {pid} = req.query 
    const product = pid
    
    let docRef = doc(db, 'products', product)
    let docSnap = await getDoc(docRef).then(v => {
        if (v.exists()) return {data: v.data()}
        return {data: null}
    })

    res.status(200).json(docSnap)
}
