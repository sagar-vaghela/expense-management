
import Admin from "@layouts/Admin";
import { getListPage } from "@lib/contentParser";
import { useUser } from "@lib/firebase/useUser";
import { useEffect } from "react";
import AdminIndex from "./admin";
import Auth from "./auth";
import HomeIndex from "./home";

const Home = ({ banner, brands, features, intro, speciality, testimonial }) => {
  
  const { user, logout } = useUser()
  // const [userData, setUserData] = useState(null);

  // useEffect(()=>{
  //   if(user){
  //     const onAddUser = (user) => {
  //       console.log(user.val());
  //       setFBExpenseData(user.val())
  //     }
    
  //     const fetchData = async () => {
  //         const countRef = ref(realDB, "users/")
  //         onValue(countRef, onAddUser)
  //     }
    
  //     fetchData();
  //   }
  //    },[user])

//   useEffect(()=>{ 
//     if (user){
//       const registerUser = () => fetch(`/api/addUsers?id=${encodeURIComponent(user.id)}&users=${JSON.stringify(user)}`)
//         registerUser()
//     }
    
// },[user])



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
