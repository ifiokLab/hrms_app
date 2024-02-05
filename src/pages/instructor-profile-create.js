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
import hero1 from '../images/designer1.svg';
import hero2 from '../images/designer2.svg';
import hero3 from '../images/designer3.svg';
import logo from '../images/logo192.png';
import apiUrl from '../components/api-url';
//import hero1 from '../styles/hero1.jpg';

const CreateInstructorProfile = ()=>{
    const user = useSelector((state) => state.user.user);
    const [title, setTitle] = useState('');
    const [biography, setBiography] = useState('');
    const [website, setWebsite] = useState('');
    const [profilePicture, setProfilePicture] = useState('');
    const [phone, setPhone] = useState('');
    const navigate = useNavigate();
    const [employeeProfile,setEmployeeProfile] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(!isLoading);
        
        try {
            const formData = new FormData();
            formData.append('title', title);
            formData.append('biography', biography);
            formData.append('website', website);
            formData.append('picture', profilePicture);
            formData.append('phone', phone);
    
            // Check if thumbnail is a file (not a base64 string)
           
    
            const response = await axios.post(`${apiUrl}/instructor/profile/create/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Token ${user.auth_token}`, // Include the user ID in the Authorization header
                },
            });
    
            if (response.data.success) {
                setTimeout(() => {
                    setIsLoading(isLoading);
                    navigate('/instructor/profile/');
                   
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
    
    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };
   
    const handleWebsiteChange = (event) => {
        setWebsite(event.target.value);
    };
    
    const handlePhoneChange = (event) => {
        setPhone(event.target.value);
    };

   
    

    useEffect(() => {
        // Check if the user is authenticated  !User && User.isInstructor === true 
       
        if (user=== null ) {
            // Redirect to the login page
            //navigate('/login');
            return; // Stop further execution of useEffect
        };
      
    
        // Fetch categories and default subcategories
       
        
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
                        <Link to='/instructor/dashboard/' className = 'card'>
                            <i class="fa-solid fa-chalkboard"></i>
                            <span className = 'title'>Your Courses</span>
                        </Link>
                       
                        
                       
                        <Link to={`${employeeProfile.exist ? '/instructor/profile/' : '/instructor/profile/create'}`} className = 'card'>
                            <i className="fa-solid fa-gear"></i>
                            <span className = 'title'>Settings </span>
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
                        <div className='wrapper-form'>
                        <form className="form-container" onSubmit={handleSubmit}  >
                            <div className='form-header'>
                            <i class="fa-solid fa-chalkboard-user"></i>
                                <span>Create Profile</span>
                            
                            </div>
                            <div className={`form-group ${title ? 'active' : ''}`}>
                                <input type="text" id="title" value={title} onChange = {handleTitleChange} required />
                                <label htmlFor="title">Title</label>
                            </div>
                            <div className={`form-group ${biography ? 'active' : ''}`}>
                            
                                <ReactQuill
                                id='biography'
                                value={biography}
                                
                                onChange={(value) => setBiography(value)}
                                placeholder="Biography"
                                required
                                />
                                
                            </div>
                            <div className={`form-group ${website ? 'active' : ''}`}>
                                <input type="text" id="website" value={website} onChange = {handleWebsiteChange} placeholder ='optional' />
                                <label htmlFor="website">Website</label>
                            </div>
                            <div className={`form-group ${phone ? 'active' : ''}`}>
                                <input type="text" id="phone" value={phone} onChange = {handlePhoneChange} required />
                                <label htmlFor="title">phone</label>
                            </div>
                        
                            <div className = 'thumbnail-wrapper' >
                                <label htmlFor="profilePicture" className='thumb-label'>Profile picture</label>
                                <input
                                type="file"
                                id="profilePicture"
                                name="profilePicture"
                                onChange={handleFileChange}
                                required
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

export default CreateInstructorProfile;