import firebase from 'firebase/app'
import { ref, runTransaction } from 'firebase/database'
import { realDB } from '@/lib/firebase/initFirebase'
import { ExpTrackCon } from '@/components/Context/Context';
import { useContext } from 'react';


const addContacts = async (req, res) => {
    console.log('req-------',req);
    const dbRef = ref(realDB, "contacts/" + req.query.id)

    const { snapshot } = await runTransaction(dbRef, (contact) => {
        if (contact === null) {
            return {ContactData : JSON.parse(req.query.data)}
        }
        // let obj = {...contact, id:"id added once agian"}
        return {ContactData : JSON.parse(req.query.data)}
    })

    return res.status(200).json({
        total: snapshot.val()
    })
}

export default addContacts