import Banner from "./components/Banner";
import CardExp from "../components/CardExp";
import CardTrack from "../components/CardTrack";
import { useUser } from "@lib/firebase/useUser";
import { useEffect } from "react";
import { realDB } from "@lib/firebase/initFirebase";
import { onValue, ref } from "firebase/database";

const ExpenseTracker = ({ data }) => {
  const { frontmatter } = data;
  const { title } = frontmatter;
  const {user} = useUser();

  useEffect(()=>{
    if(user){
      const onCountIncrease = (count) => console.log(count.val())
    
      const fetchData = async () => {
          const countRef = ref(realDB, "expense/")
          onValue(countRef, onCountIncrease)
      }
    
      fetchData();
    }
     },[user])

  return (
    <section className="section">
      <Banner title={title} />

      <div className="container">
        <div className="section">
          <section className="ionic-page">
            <section className="ionic-bg">
              <div className="ionic-expense">

                <div className="income">
                  <CardExp title="Income" />
                </div>
                <div className="expenseTrack">
                  <CardTrack title="Expense Tracker" />
                </div>
                <div className="expense">
                  <CardExp title="Expense" />
                </div> 

              </div>
            </section>
          </section>
        </div>
      </div>
    </section>
  );
};

export default ExpenseTracker;
