import React, { useState,useEffect } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Swiper, SwiperSlide, } from 'swiper/react';
import { Autoplay,Pagination,Navigation } from 'swiper/modules';
//import Header from '../components/header';
import ReactQuill from 'react-quill';
import "react-quill/dist/quill.snow.css";
import 'swiper/swiper-bundle.css';
import '../styles/employer-dashboard.css';
import '../styles/create-course.css';
import '../styles/instructor.css';
import Header from '../components/header';
import DesktopLogout from './desktop-logout';
import hero1 from '../images/designer1.svg';
import hero2 from '../images/designer2.svg';
import hero3 from '../images/designer3.svg';
import logo from '../images/logo192.png';
import apiUrl from '../components/api-url';
//import hero1 from '../styles/hero1.jpg';

const EditEmployeeProfile  = ()=>{
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [gender, setGender] = useState('');
    const [maritalStatus, setMaritalStatus] = useState('');
    const [profilePicture, setProfilePicture] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [previousPicture,setPreviousPicture] = useState('');
    const user = useSelector(state => state.user.user);
    const [employeeProfile,setEmployeeProfile] = useState({});

    
    
   
   
    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(!isLoading);
        
        try {
            const formData = new FormData();
            formData.append('date_of_birth', dateOfBirth);
            formData.append('gender', gender);
            formData.append('marital_status', maritalStatus);
            formData.append('phone_number', phone);
            formData.append('address', address);
            formData.append('image', profilePicture);
    
            // Check if thumbnail is a file (not a base64 string)
           
    
            const response = await axios.put(`${apiUrl}/employee/profile/edit/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Token ${user.auth_token}`, // Include the user ID in the Authorization header
                },
            });
    
            if (response.data.success) {
                setTimeout(() => {
                    setIsLoading(isLoading);
                    navigate('/employee/profile/');
                   
                }, 2000);
                console.log('profile created successfully:');
                // Redirect to the home page or do any other actions
            } else {
                console.error('profile creation failed:', response.data.message);
                // Handle failed course creation, e.g., show error messages to the user
            }
        } catch (error) {
            console.error('An error occurred during profile creation:', error);
            setTimeout(() => {
                setIsLoading(isLoading);
               
            }, 2000);
            // Handle unexpected errors
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
    
        if (file && file.type.startsWith('image/')) {
            //const reader = new FileReader();
            //reader.readAsDataURL(file);
            setProfilePicture(file);
        } else {
            console.error('Invalid file type or no file selected.');
        }
    };
    useEffect(() => {
        // Check if the user is authenticated  !User && User.isInstructor === true 
       
        
    
        // Fetch categories and default subcategories
        const fetchProfileData = async () => {
            try {
              const response = await axios.get(`${apiUrl}/employee/profile/fetch/`,{
                headers: {
                    Authorization: `Token ${user?.auth_token}`,
                },
              });
                if (response.data.success) {
                    setEmployeeProfile(response.data.data.exist);
                    setDateOfBirth(response.data.data.date_of_birth);
                    setGender(response.data.data.gender);
                    setAddress(response.data.data.address);
                    setPhone(response.data.data.phone);
                    setMaritalStatus(response.data.data.marital_status);
                    setPreviousPicture(response.data.data.picture);
                    //setPreviousPicture Redirect to the home page
                   
                } else {
                    setTimeout(() => {
                        setEmployeeProfile(response.data.data.exist);
                        navigate('/instructor/profile/create/'); // Change '/' to the actual path of your home page
                    }, 2000); // 2000 milliseconds (2 seconds) delay
                
                // Handle failed signup, e.g., show error messages to the user
                }
              
            } catch (error) {
                setTimeout(() => {
                    //navigate('/instructor/login/'); // Change '/' to the actual path of your home page
                }, 2000); // 2000 milliseconds (2 seconds) delay
              console.error('Errors:', error);
            }
        };
        fetchProfileData();
    }, [user, navigate]);
    
    
    
   
    

   
    
  

    return(
        <div className ='page-wrapper'>
            <Header/>
            <div className = 'wrapper' >
            <div className='sidebar-container-1'>
                    <div className = 'box1-wrapper'>
                        <div className = 'card organization' >
                            <i class="fa-solid fa-building"></i>
                            <span className = 'title'>{user.first_name} {user.last_name}</span>
                        </div>
                        <Link to='/employee/dashboard/' className = 'card'>
                            <i class="fa-solid fa-users"></i>
                            <span className = 'title'>Organizations</span>
                        </Link>
                        <Link to='/employee/courses/' className = 'card'>
                             <i class="fa-solid fa-chalkboard"></i>
                            <span className = 'title'>Your Courses</span>
                        </Link>
                        
                       
                        <Link to='/employee/profile/' className = 'card'>
                            <i className="fa-solid fa-gear"></i>
                            <span className = 'title'>Settings </span>
                        </Link>
                        <Link className = 'card'>
                            <i class="fa-solid fa-headset"></i>
                            <span className = 'title'>Support</span>
                        </Link>
                    </div>
                    <div className = 'box2-wrapper' >
                    <DesktopLogout />
                    </div>
                </div>
                <div className='container-2'>
                    <div className = "container-2-wrapper">
                        <div className='wrapper-form'>
                        <form className="form-container" onSubmit={handleSubmit}  >
                            <div className='form-header'>
                            <i class="fa-solid fa-chalkboard-user"></i>
                                <span>Edit Profile</span>
                            
                            </div>
                            <div className={`form-group ${dateOfBirth ? 'active' : ''}`}>
                                <div className='previous'>Date of birth:</div>
                                <input type="date" id="date" value={dateOfBirth} onChange = {(event)=>setDateOfBirth(event.target.value)} required />
                               
                            </div>
                           
                            <div className={`form-group ${gender ? 'active' : ''}`}>
                                <select name="gender" value={gender} onChange={(event)=>setGender(event.target.value)} required>
                                    <option value="">Select Gender</option>
                                    <option value="M">Male</option>
                                    <option value="F">Female</option>
                                    <option value="O">Other</option>
                                </select>
                               
                            </div>
                            <div className={`form-group ${maritalStatus ? 'active' : ''}`}>
                                <select name="maritalStatus" value={maritalStatus} onChange={(event)=>setMaritalStatus(event.target.value)} required>
                                    <option value="">Select Marital Status</option>
                                    <option value="S">Single</option>
                                    <option value="M">Married</option>
                                    <option value="D">Divorced</option>
                                    <option value="W">Widowed</option>
                                </select>
                               
                            </div>
                            <div className={`form-group ${phone ? 'active' : ''}`}>
                                <input type="text" id="phone" value={phone} onChange = {(event)=>setPhone(event.target.value)} required />
                                <label htmlFor="phone">phone</label>
                            </div>
                            <div className={`form-group ${address ? 'active' : ''}`}>
                                <input type="text" id="address" value={address} onChange = {(event)=>setAddress(event.target.value)} required />
                                <label htmlFor="address">Address</label>
                            </div>
                        
                            <div className = 'thumbnail-wrapper' >
                                <label htmlFor="profilePicture" className='thumb-label'>Profile picture</label>
                                <div className='previous'>previous:{previousPicture}</div>
                                
                                <input
                                
                                type="file"
                                id="profilePicture"
                                name="profilePicture"
                                onChange={handleFileChange}
                                
                               
                                />
                            </div>
                        

                            <div className='btn-wrapper'>
                                <button type="Create Profile">
                                    Submit
                                    {isLoading ? <div className="loader"></div> : '' }
                                        
                                </button>
                            </div>
                        </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditEmployeeProfile ;