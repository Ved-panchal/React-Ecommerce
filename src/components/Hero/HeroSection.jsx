import React from "react";
import Logo from "./../logo/Logo";
import CustomButton from "../Button/CustomButton";
import { Image } from "@nextui-org/react";

const HeroSection = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="hero-section bg-primary py-20 min-h-[50vh] flex items-center">
        <div className="container flex items-center justify-between max-md:flex-col">
          <div className=" flex flex-col gap-6">
            <div className="flex flex-col gap-2 max-w-[500px]">
              <h1 className="text-white text-4xl font-bold">
                Welcome to V Store
              </h1>
              <p className="text-white text-lg">
                The best place to find the most amazing products. We offer a
                wide range of high-quality items, from electronics to fashion,
                home decor to outdoor gear. Whether you're looking for something
                specific or just browsing, ACME has everything you need.
              </p>
            </div>
            <CustomButton
              label={"Get Started"}
              size={"lg"}
              className={"self-start"}
            />
          </div>

          <Image
            isBlurred
            height={540}
            width={540}
            src="https://cdn.dummyjson.com/products/images/furniture/Annibale%20Colombo%20Sofa/1.png"
            alt=""
            className="m-5 object-contain h-[500px] w-[500px] max-sm:w-[200px] max-sm:h-[200px]"
          />
        </div>
      </section>
    </div>
  );
};

export default HeroSection;
