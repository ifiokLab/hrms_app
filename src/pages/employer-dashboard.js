import React, { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Swiper, SwiperSlide, } from 'swiper/react';
import { Autoplay,Pagination,Navigation } from 'swiper/modules';
//import Header from '../components/header';
import 'swiper/swiper-bundle.css';
import '../styles/employer-dashboard.css';
import Header from '../components/header';
import hero1 from '../images/designer1.svg';
import hero2 from '../images/designer2.svg';
import hero3 from '../images/designer3.svg';
import logo from '../images/logo192.png';
//import hero1 from '../styles/hero1.jpg';

const EmployerDashboard = ()=>{
    const user = useSelector((state) => state.user);
    return(
        <div className ='page-wrapper'>
            <Header/>
            <div className = 'wrapper' >
                <div className='sidebar-container-1'>
                    <div className = 'box1-wrapper'>
                        <div className = 'card organization' >
                            <i class="fa-solid fa-building"></i>
                            <span className = 'title'>{user.user.first_name} {user.user.last_name}</span>
                        </div>
                        <Link className = 'card'>
                            <span className="material-symbols-outlined">
                                apps
                            </span>
                            <span className = 'title'>Apps</span>
                        </Link>
                        <Link to='/organizations/' className = 'card'>
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
                <div className='container-2'>
                    <div className = "container-2-wrapper">
                        <div className='title'>All Apps</div>
                        <div className='apps-container'>
                            <Link className='cards'>
                                <div className='icon hrms-icon'>
                                    <i class="fa-solid fa-user-tie"></i>
                                </div>
                                <div className='text-wrapper'>
                                    <div className='title-header'>HRMS</div>
                                    <p>Human Resource management System</p>
                                </div>
                            </Link>
                            <Link className='cards'>
                                <div className='icon e-icon'>
                                <i class="fa-solid fa-graduation-cap"></i>
                                </div>
                                <div className='text-wrapper'>
                                    <div className='title-header'>Elearning</div>
                                    <p>Human Resource management System</p>
                                </div>
                            </Link>
                            <Link className='cards'>
                                <div className='icon p-icon'>
                                <i class="fa-solid fa-chart-simple"></i>
                                </div>
                                <div className='text-wrapper'>
                                    <div className='title-header'>Performance</div>
                                    <p>Monitor employee performance</p>
                                </div>
                            </Link>
                            <Link className='cards'>
                                 <div className='icon pay-icon'>
                                 <i class="fa-solid fa-credit-card"></i>
                                 </div>
                                <div className='text-wrapper'>
                                    <div className='title-header'>Payroll</div>
                                    <p>Seamless payment & invoice system</p>
                                </div>
                            </Link>
                            <Link className='cards'>
                                 <div className='icon time-icon'>
                                 <i class="fa-solid fa-business-time"></i>
                                 </div>
                                <div className='text-wrapper'>
                                    <div className='title-header'>TimeSheet</div>
                                    <p>Seamless payment & invoice system</p>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmployerDashboard;