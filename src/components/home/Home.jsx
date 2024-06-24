import { useEffect, useState } from "react";
import AuthModal from "../Auth/AuthModal";
import ProductCard from "../Products/ProductCard";
import Grid from "./../Utils/Grid";
import HeroSection from "../Hero/HeroSection";
import CatSlider from "../Sliders/SingleProdSlider";
import Toast from "../../services/toasts";
import config from "../../services/config";

const Home = () => {
  const [data, setData] = useState([]);
  const [categories, setCategories] = useState([]);

  const GetProdData = () => {
    fetch(`${config.API_URL}/getallproduct`)
      .then((res) => res.json())
      .then((data) => {
        setData(data.products);
        const uniqueCategories = [
          ...new Set(data.products.map((product) => product.category)),
        ];
        setCategories(uniqueCategories);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    GetProdData();
  }, []);

  return (
    <section className="pt-0">
      <HeroSection /> 
      <div className="container space-y-10 pt-6">
        {categories.map((category) => (
          <div key={category} className=" bg-slate-50 p-6 max-md:p-0 rounded-xl">
            <div className="text-black capitalize font-bold text-3xl mb-6">
              {category}
            </div>
            <div className="product-list">
              <Grid variant={"ProdCard"}>
                {data
                  .filter((product) => product.category === category)
                  .map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
              </Grid>
            </div>
          </div>
        ))}
      </div>
      <Toast />
    </section>
  );
};

export default Home;
