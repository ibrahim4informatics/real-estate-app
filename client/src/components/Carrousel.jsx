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
            loop = {slides.length > 1}
            slidesPerView={1}
            navigation
            autoplay={slides.length > 1}
            pagination={{ clickable: true }}

            style={{ zIndex: 5 }}


        >

            {slides.map(slide => <SwiperSlide key={slide.id}> <Image width={"100%"} objectFit={'contain'} aspectRatio={'16 / 9'} src={slide.display_url} loading='lazy' /> </SwiperSlide>)}

        </Swiper>
    )
}

export default Carrousel