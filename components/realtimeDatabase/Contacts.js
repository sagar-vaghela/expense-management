import { useState, useEffect } from 'react'
import 'firebase/database'
import { realDB } from '@/lib/firebase/initFirebase'
import { ref, onValue, off, getDatabase, set } from "firebase/database"

const ContactsData = ({ id, formValues }) => {
    const [contacts, setContacts] = useState('')
    useEffect(() => {
        const onContactAdd = (contacts) => setContacts(contacts.val())

        const fetchData = async () => {
            const contactRef = ref(realDB, "contacts/" + id)
            onValue(contactRef, onContactAdd)
        }

        fetchData()

        return () => {
            const contactRef = ref(realDB, "contacts/" + id)
            off(contactRef, "value", onContactAdd)
        }
    }, [id]);
    console.log(formValues,"formValues");

    const addContact = async (e) => {
        e.preventDefault();
        const registerContact = () => fetch(`/api/addContacts?id=${encodeURIComponent(id)}&${JSON.stringify(formValues)}`)
        registerContact()
    }
    return (
        <button onClick={addContact} className="btn btn-primary block w-full" type="submit">
            Submit Now
        </button>
    )
}

export default ContactsData
