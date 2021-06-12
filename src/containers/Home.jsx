import React from "react";
import Header from "../components/Header";
import SearchBox from '../components/SearchBox'
import { useHistory } from "react-router-dom";



const Home = () => {
  const history = useHistory();
  const handleSearch = (search) => {
    history.push(`/items?search=${search}`, {search});
  };

  return (
    <>
      <Header>        
        <SearchBox handleSearch={handleSearch} />
      </Header>
    </>
  );
};

export default Home;