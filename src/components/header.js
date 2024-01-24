import React, { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Swiper, SwiperSlide, } from 'swiper/react';
import { Autoplay,Pagination,Navigation } from 'swiper/modules';
//import Header from '../components/header';
import 'swiper/swiper-bundle.css';
import '../styles/header.css';
import hero1 from '../images/designer1.svg';
import hero2 from '../images/designer2.svg';
import hero3 from '../images/designer3.svg';
import logo from '../images/logo192.png';
//import hero1 from '../styles/hero1.jpg';

const Header = ()=>{
    const [sidebarOpen,setSideBarOpen] = useState(false);
    const toggleSideBar = ()=>{
        setSideBarOpen(!sidebarOpen);
    };
    return(
        <div className ='header-wrapper'>
            <div className = 'logo' >
               <span className = 'menu-btn' onClick={toggleSideBar}>
                <i class="fa-solid fa-bars"></i>
               </span>
                HRMS App
            </div>
            <div className='aside-wrapper'>
                <Link className='help'>
                    <i className="fa-solid fa-circle-question"></i>
                </Link>
                <div className='profile-card'>
                    <img src={logo} alt='profile' />
                </div>
            </div>
            <div className={`header-sidebar ${sidebarOpen ? 'show' : ''}` }>
                <div className='close-icon' onClick={toggleSideBar}>
                     <i class="fa-solid fa-circle-xmark"></i>
                </div>
                <div className='sidebar-container-1'>
                        <div className = 'box1-wrapper'>
                            <div className = 'card organization' >
                                <i class="fa-solid fa-building"></i>
                                <span className = 'title'>Haerna Sherma</span>
                            </div>
                            <Link className = 'card'>
                                <span className="material-symbols-outlined">
                                    apps
                                </span>
                                <span className = 'title'>Apps</span>
                            </Link>
                            <Link className = 'card'>
                                <i class="fa-solid fa-users"></i>
                                <span className = 'title'>Organization & users</span>
                            </Link>
                            <Link className = 'card'>
                                <i className="fa-solid fa-gear"></i>
                                <span className = 'title'>Settings</span>
                            </Link>
                            <Link className = 'card'>
                                <i class="fa-solid fa-headset"></i>
                                <span className = 'title'>Support</span>
                            </Link>
                        </div>
                        <div className = 'box2-wrapper' >
                            <Link className = 'card'>
                                <i class="fa-solid fa-right-from-bracket"></i>
                                <span className = 'title'>Logout</span>
                            </Link>
                        </div>
                </div>
            </div>
        </div>
    );
};

export default Header;