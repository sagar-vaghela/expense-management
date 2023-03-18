import Banner from "./components/Banner";
import CardExp from "../components/CardExp";
import CardTrack from "../components/CardTrack";

const ExpenseTracker = ({ data }) => {
  const { frontmatter } = data;
  const { title } = frontmatter;

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
