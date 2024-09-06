import { FC } from "react";
import HomeScreen from "~/screens/home";

const Home: FC <{ searchParams: { page: string } }> = ({ searchParams }) => {  
  return <HomeScreen page={searchParams.page || "1"} />
}

export default Home