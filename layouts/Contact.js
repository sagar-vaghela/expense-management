import config from "@config/config.json";
import Banner from "./components/Banner";
import ImageFallback from "./components/ImageFallback";
import { useState } from "react";
import ContactsData from "@/components/realtimeDatabase/Contacts";
import { useUser } from "@lib/firebase/useUser";

const Contact = ({ data }) => {
  const { frontmatter } = data;
  const { title } = frontmatter;
  const {user} = useUser();

  const[name,setName]=useState("")
  const[email,setEmail]=useState("")
  const[subject,setSubject]=useState("")
  const[message,setMessage]=useState("")
  const[formValues,setFormValues]=useState({})



  function onSubmit(e){
    e.preventDefault();

    let contactObj = {
      name,email,subject,message
    }

    const registerContact = () => fetch(`/api/addContacts?id=${encodeURIComponent(user.id)}&data=${JSON.stringify(contactObj)}`)
    registerContact()
  //  setFormValues(contactObj)
  }

 

  return (
    <section className="section">
      <Banner title={title} />
      <div className="container">
        <div className="section row items-center justify-center">
          <div className="animate lg:col-5">
            <ImageFallback
              className="mx-auto lg:pr-10"
              src="/images/vectors/contact.png"
              width={497}
              height={397}
              alt=""
            />
          </div>
          <div className="animate lg:col-5">
            <form
              className="contact-form rounded-xl p-6 shadow-[0_4px_25px_rgba(0,0,0,0.05)]"
              onSubmit={onSubmit}
            >
              <h2 className="h4 mb-6">Send A Message</h2>
              <div className="mb-6">
                <label
                  className="mb-2 block font-medium text-dark"
                  htmlFor="name"
                >
                  Name
                </label>
                <input
                  className="form-input w-full"
                  name="name"
                  placeholder="Full Name"
                  type="text"
                  value={name}
                  onChange={(e)=>setName((e.target.value))}
                  required
                />
              </div>
              <div className="mb-6">
                <label
                  className="mb-2 block font-medium text-dark"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  className="form-input w-full"
                  name="email"
                  placeholder="Email Address"
                  type="email"
                  value={email}
                  onChange={(e)=>setEmail((e.target.value))}
                  required
                />
              </div>
              <div className="mb-6">
                <label
                  className="mb-2 block font-medium text-dark"
                  htmlFor="subject"
                >
                  Subject
                </label>
                <input
                  className="form-input w-full"
                  name="subject"
                  type="text"
                  value={subject}
                  onChange={(e)=>setSubject((e.target.value))}
                  required
                />
              </div>
              <div className="mb-6">
                <label
                  className="mb-2 block font-medium text-dark"
                  htmlFor="message"
                >
                  Message
                </label>
                <textarea className="form-textarea w-full" rows="6" value={message} onChange={(e)=>setMessage((e.target.value))}/>
              </div>

              <button className="btn btn-primary block w-full" type="submit">
                Submit Now
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
