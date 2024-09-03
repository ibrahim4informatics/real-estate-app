// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css'


import 'swiper/css/scrollbar'; import { Navigation, Pagination, A11y, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Image } from '@chakra-ui/react';

const Carrousel = ({ slides }) => {
    return (
        <Swiper
            modules={[Navigation, Pagination, Autoplay, A11y]}
            spaceBetween={0}
            loop
            slidesPerView={1}
            navigation
            autoplay
            pagination={{ clickable: true }}

        >

            {slides.map(slide => <SwiperSlide key={slide.id}> <Image width={"100%"} objectFit={'contain'} src={slide.display_url} /> </SwiperSlide>)}

        </Swiper>
    )
}

export default Carrousel