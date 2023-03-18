
import Admin from "@layouts/Admin";
import { getListPage } from "@lib/contentParser";
import { useUser } from "@lib/firebase/useUser";
import AdminIndex from "./admin";
import Auth from "./auth";
import HomeIndex from "./home";


const Home = ({ banner, brands, features, intro, speciality, testimonial }) => {
  
  const { user, logout } = useUser()
  console.log(user, "User");
if (user && user.email === 'admin@admin.com'){
  return <AdminIndex />
} else if (user) {
  return <HomeIndex  banner={banner} features={features} intro={intro} speciality={speciality} testimonial={testimonial}/>
} else {
  return <Auth />

}

 
};

export default Home;

// for homepage data
export const getStaticProps = async () => {
  const homepage = await getListPage("content/_index.md");
  const { frontmatter } = homepage;
  const { banner, features, intro, speciality, testimonial } =
    frontmatter;

  return {
    props: {
      banner: banner,
      features: features,
      intro: intro,
      speciality: speciality,
      testimonial: testimonial,
    },
  };
};
