import firebase from 'firebase/app'
import { ref, runTransaction } from 'firebase/database'
import { realDB } from '@/lib/firebase/initFirebase'
import { ExpTrackCon } from '@/components/Context/Context';
import { useContext } from 'react';

let data =  []
const addUsers = async (req, res) => {
    console.log('req-------',req);
    const dbRef = ref(realDB, "users/")

    const { snapshot } = await runTransaction(dbRef, (expense) => {
        if (expense === null) {
            return JSON.parse(req.query.users)
        }
        // let obj = {...contact, id:"id added once agian"}
        
        
        return JSON.parse(req.query.users)
    })

    return res.status(200).json({
        total: snapshot.val()
    })
}

export default addUsers