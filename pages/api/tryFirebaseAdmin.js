import admin from '@/lib/firebase'

export default async function handler(req, res) {
    const firebase = admin.firestore()

    // Return promise to handle serverless function timeouts
    return new Promise((resolve, reject) => {
       firebase
        // For example, look into the comments collection
        .collection('comments')
        .get()
        // set of operations to perform on the collection's records
        .then((posts) => {
          res.status(200).json({ comments: posts.docs.map((doc) => doc.data()) })
          res.end()
          resolve()
        })
        .catch((e) => {
          res.status(405).json(e)
          res.end()
          resolve()
        })
    }

}