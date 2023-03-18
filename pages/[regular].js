import NotFound from "@layouts/404";
import About from "@layouts/About";
import Base from "@layouts/Baseof";
import Contact from "@layouts/Contact";
import Default from "@layouts/Default";
import ExpenseTracker from "@layouts/ExpenseTracker";
import { getRegularPage, getSinglePage } from "@lib/contentParser";

// for all regular pages
const RegularPages = ({ data }) => {
  const { title, meta_title, description, image, noindex, canonical, layout } =
    data.frontmatter;
  const { content } = data;

  const pages = () => {
    if (layout === "404") {
      return <NotFound data={data} />;
    } else if (layout === "about") {
      return <About data={data} />;
    } else if (layout === "contact") {
      return <Contact data={data} />;
    } else if (layout === "expenseTracker") {
      return <ExpenseTracker data={data} />;
    } else {
      return <Default data={data} />;
    }
  };

  return (
    <Base
      title={title}
      description={description ? description : content.slice(0, 120)}
      meta_title={meta_title}
      image={image}
      noindex={noindex}
      canonical={canonical}
    >
      {pages()}
    </Base>
  );
};
export default RegularPages;

// for regular page routes
export const getStaticPaths = async () => {
  const slugs = getSinglePage("content");
  const paths = slugs.map((item) => ({
    params: {
      regular: item.slug,
    },
  }));

  return {
    paths,
    fallback: false,
  };
};

// for regular page data
export const getStaticProps = async ({ params }) => {
  const { regular } = params;
  const allPages = await getRegularPage(regular);

  return {
    props: {
      slug: regular,
      data: allPages,
    },
  };
};
