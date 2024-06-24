import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Image } from "@nextui-org/react";

const SingleProdSlider = ({ cat }) => {
  return (
    <div className="w-full">
      <Swiper
        spaceBetween={50}
        slidesPerView={1}
        modules={[Navigation, Pagination]}
        navigation
        pagination={{ clickable: true }}
      >
        {cat &&
          cat.map((cat) => (
            <SwiperSlide key={cat.id}>
              <Image
                src={cat}
                alt="product"
                className="w-full h-full object-contain rounded-lg"
              />
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

export default SingleProdSlider;
