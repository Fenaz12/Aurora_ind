import React, { useRef, useState } from "react";
// Import Swiper React components
import { Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react.js';
import profile from '../images/profile.jpg';
import test from '../images/test.jpg';
import 'swiper/swiper.scss'; // core Swiper
import 'swiper/modules/navigation/navigation.scss'; // Navigation module
import 'swiper/modules/pagination/pagination.scss'; // Pagination module
import "./styles/Swiper.css"

export default function SongList() {
  return (
    <>
      <Swiper
        navigation={true}
        slidesPerView={6}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        modules={[Navigation]}
        className="mySwiper"
      >
        <SwiperSlide><img src={profile} style={{width:"120px", height:"120px"}}/></SwiperSlide>
        <SwiperSlide><img src={test} style={{width:"120px", height:"120px"}}/></SwiperSlide>
        <SwiperSlide><img src={profile} style={{width:"120px", height:"120px"}}/></SwiperSlide>
        <SwiperSlide><img src={test} style={{width:"120px", height:"120px"}}/></SwiperSlide>
        <SwiperSlide><img src={profile} style={{width:"120px", height:"120px"}}/></SwiperSlide>
        <SwiperSlide><img src={test} style={{width:"120px", height:"120px"}}/></SwiperSlide>
        <SwiperSlide><img src={profile} style={{width:"120px", height:"120px"}}/></SwiperSlide>
        <SwiperSlide><img src={test} style={{width:"120px", height:"120px"}}/></SwiperSlide>
        <SwiperSlide><img src={profile} style={{width:"120px", height:"120px"}}/></SwiperSlide>
      </Swiper>
    </>
  );
}
