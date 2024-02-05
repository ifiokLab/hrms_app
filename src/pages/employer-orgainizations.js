import React, { useState, useEffect, useRef } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import apiUrl from '../components/api-url';
import { Swiper, SwiperSlide, } from 'swiper/react';
import { Autoplay,Pagination,Navigation } from 'swiper/modules';
//import Header from '../components/header';
import 'swiper/swiper-bundle.css';
import '../styles/employer-dashboard.css';
import '../styles/organizations.css';
import '../styles/snackbar.css';
import Header from '../components/header';
import hero1 from '../images/designer1.svg';
import hero2 from '../images/designer2.svg';
import hero3 from '../images/designer3.svg';
import logo from '../images/logo192.png';
//import hero1 from '../styles/hero1.jpg';

const EmployerOrganizations = ()=>{
    const user = useSelector((state) => state.user.user);
    const fileInputRef = useRef(null);
    const [name,setName] = useState('');
    const [previousLogo,setPreviousLogo] = useState('');
    const [overview,setOverview] = useState('');
    const [logo,setLogo] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [orgModal,setOrgModal] = useState(false);
    const [organizations,setOrganizations] = useState([]);
    const [actionType,setactionType] = useState('');
    const navigate = useNavigate();
    const [openModalIndex, setOpenModalIndex] = useState(null);
    const [deleteModal, setdeleteModal] = useState(false);
    const [editId,setEditId] = useState('');
    const [deleteId,setDeleteId] = useState('');
    const [deleteName,setDeleteName] = useState('');
    const [memberModal,setMemberModal] = useState(false);

    const [email,setEmail] = useState('');
    const [departments,setDepartments] = useState([]);
    const [department, setDepartment] = useState('');
    const [organizationId,setOrganizationId] = useState('');
    const [showSnackbar, setShowSnackbar] = useState(false);
    const [snackbarStatus, setsnackbarStatus] = useState('');
    const [payrollHistory,setPayrollHistory] = useState([]);

    const handleEllipsisClick = (event,index) => {
        event.preventDefault();
        setOpenModalIndex(openModalIndex === index ? null : index);
    };

    const toggleMemberModal = (event,id)=>{
        event.preventDefault();
        setOrganizationId(id);
        console.log(id);
        setMemberModal(!memberModal);
    };
    const toggleDeleteModal = async (event,id)=>{
        event.preventDefault();
        setdeleteModal(!deleteModal);
        console.log(id);
        setDeleteId(id);
       
        try {
            const response = await axios.get(`${apiUrl}/organization/${id}/edit/`, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Token ${user.auth_token}`, // Include the user ID in the Authorization header
                },
            });
            console.log(response.data);
            setDeleteName(response.data.name);
           
        } catch (error) {
            console.error('Error fetching user courses:', error);
            //setLoading(false);
        }
    };
   
    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(!isLoading);
       
        setShowSnackbar(false);
        
        try {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('overview', overview);
            formData.append('logo', logo);
            //console.log('formData :',apiUrl,formData );
    
            // Check if thumbnail is a file (not a base64 string)
           
    
            const response = await axios.post(`${apiUrl}/organization/create/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Token ${user.auth_token}`, // Include the user ID in the Authorization header
                },
            });
    
            if (response.data.success) {
                setTimeout(() => {
                    setIsLoading(isLoading);
                    setName('');
                    setLogo('');
                    setOverview('');
                    setOrgModal(!orgModal);
                    fetchOrganizations();
                    setShowSnackbar(!showSnackbar);
                    //navigate('/');
                   
                }, 5000);
                setsnackbarStatus('success');
                setShowSnackbar(true);
               
                console.log('org created successfully:', response.data.course);
                // Redirect to the home page or do any other actions
            } else {
                setsnackbarStatus('fail');
                setShowSnackbar(true);
                setErrorMessage('response.data.message');
                //console.error('Course creation failed:', response.data.message);
                // Handle failed course creation, e.g., show error messages to the user
            }
        } catch (error) {
            console.error('An error occurred during course creation:', error);
            setTimeout(() => {
                setIsLoading(isLoading);
                setErrorMessage('response.data.message');
               
            }, 2000);
            // Handle unexpected errors
        }
    };
    const handleEditSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(!isLoading);
        setShowSnackbar(false);
        
        try {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('overview', overview);
            formData.append('logo', logo);
            //console.log('formData :',apiUrl,formData );
    
            // Check if thumbnail is a file (not a base64 string)
           
    
            const response = await axios.put(`${apiUrl}/organization/${editId}/edit/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Token ${user.auth_token}`, // Include the user ID in the Authorization header
                },
            });
    
            if (response.data.success) {
                setTimeout(() => {
                    setIsLoading(isLoading);
                    setName('');
                    setLogo('');
                    if (fileInputRef.current) {
                        fileInputRef.current.value = '';
                    }
                    setOverview('');
                    setOrgModal(!orgModal);
                    fetchOrganizations();
                   
                    //navigate('/');
                   
                }, 1000);
                setsnackbarStatus('success');
                setShowSnackbar(true);
                console.log('org created successfully:', response.data.course);
                // Redirect to the home page or do any other actions
            } else {
                setsnackbarStatus('fail');
                setShowSnackbar(!showSnackbar);
                setErrorMessage(response.data.message);
                //console.error('Course creation failed:', response.data.message);
                // Handle failed course creation, e.g., show error messages to the user
            }
        } catch (error) {
            console.error('An error occurred during course creation:', error);
            setTimeout(() => {
                setIsLoading(isLoading);
                setErrorMessage('response.data.message');
               
            }, 2000);
            // Handle unexpected errors
        }
    };
    const handleInviteSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(!isLoading);
        setShowSnackbar(false);
        
        try {
            const formData = new FormData();
            formData.append('invited_user', email);
            formData.append('organization', organizationId);
            formData.append('department', department);
            //console.log('formData :',apiUrl,formData );
    
            // Check if thumbnail is a file (not a base64 string)
           
    
            const response = await axios.post(`${apiUrl}/invitation/create/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Token ${user.auth_token}`, // Include the user ID in the Authorization header
                },
            });
    
            if (response.data.success) {
                setTimeout(() => {
                    setIsLoading(isLoading);
                    setEmail('');
                    setDepartment('');
                    setOrganizationId('')
                    setMemberModal(!memberModal);
                   
                }, 2000);
                console.log('org created successfully:', response.data.course);
                setsnackbarStatus('success');
                setShowSnackbar(true);
                // Redirect to the home page or do any other actions
            } else {
                setsnackbarStatus('fail');
                setShowSnackbar(true);
                setErrorMessage(response.data.message);

                //console.error('Course creation failed:', response.data.message);
                // Handle failed course creation, e.g., show error messages to the user
            }
        } catch (error) {
            console.error('An error occurred during course creation:', error);
            setTimeout(() => {
                setIsLoading(isLoading);
                //setErrorMessage('response.data.message');
               
            }, 2000);
            // Handle unexpected errors
        }
    };
    const handleDelete = async (event) => {
        event.preventDefault();
        setIsLoading(!isLoading);
        setShowSnackbar(false);
        
        try {
            const formData = new FormData();
            formData.append('name', name);
            // Check if thumbnail is a file (not a base64 string)
            const response = await axios.post(`${apiUrl}/organization/${deleteId}/delete/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Token ${user.auth_token}`, // Include the user ID in the Authorization header
                },
            });
    
            if (response.data.success) {
                setTimeout(() => {
                    setIsLoading(isLoading);
                    setdeleteModal(!deleteModal);
                    fetchOrganizations();
                    //navigate('/');
                   
                }, 2000);
                setsnackbarStatus('success');
                setShowSnackbar(true);
                console.log('org created successfully:', response.data.course);
                // Redirect to the home page or do any other actions
            } else {
                setsnackbarStatus('fail');
                setShowSnackbar(true);
                setErrorMessage(response.data.message);
                //console.error('Course creation failed:', response.data.message);
                // Handle failed course creation, e.g., show error messages to the user
            }
        } catch (error) {
            console.error('An error occurred during course creation:', error);
            setTimeout(() => {
                setIsLoading(isLoading);
                setErrorMessage('response.data.message');
               
            }, 2000);
            // Handle unexpected errors
        }
    };

    
    const fetchOrganizations = async () => {
        try {
            const response = await axios.get(`${apiUrl}/organization/list/`, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Token ${user.auth_token}`, // Include the user ID in the Authorization header
                },
            });
            //console.log(response.data.all_courses)
            setOrganizations(response.data.all_organizations);
            //setLoading(false);
        } catch (error) {
            console.error('Error fetching user courses:', error);
            //setLoading(false);
        }
    };
    useEffect(() => {

       
        if (user=== null || user?.isEmployer === false ) {
            // Redirect to the login page
            navigate('/');
            return; // Stop further execution of useEffect
        }
        const fetchDepartments = async () => {
            try {
              const response = await axios.get(`${apiUrl}/departments/list/`);
              setDepartments(response.data);
            } catch (error) {
              console.error('Error fetching departments:', error.message);
            }
        };
      
        fetchDepartments();
        fetchOrganizations();
    }, [user,navigate]);

    const EditOrganization = async (event,id)=>{
        event.preventDefault();
        
        setEditId(id);
        setactionType('Edit organization');
        setOrgModal(!orgModal);
        try {
            const response = await axios.get(`${apiUrl}/organization/${id}/edit/`, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Token ${user.auth_token}`, // Include the user ID in the Authorization header
                },
            });
            console.log(response.data);
            setName(response.data.name);
            setOverview(response.data.overview);
            setPreviousLogo(response.data.logo);
            //setOrganizations(response.data.all_organizations);
            //setLoading(false);
        } catch (error) {
            console.error('Error fetching user courses:', error);
            //setLoading(false);
        }
    };

    const toggleOrgModal = ()=>{
        setName('');
        setOverview('');
        setPreviousLogo('');
        setEditId('');
        setactionType('Create organization');
        setOrgModal(!orgModal);
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
    
        if (file && file.type.startsWith('image/')) {
            //const reader = new FileReader();
            //reader.readAsDataURL(file);
            setLogo(file);
        } else {
            setErrorMessage('Invalid file type. please select an image file');
            console.error('Invalid file type or no file selected.');
        }
    };
    
    const handleNameChange = (event) => {
        setName(event.target.value);
    };
    const handleOverviewChange = (event) => {
        setOverview(event.target.value);
    };

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
                        <Link to='/employer-dashboard/' className = 'card'>
                            <span className="material-symbols-outlined">
                                apps
                            </span>
                            <span className = 'title'>Apps</span>
                        </Link>
                        <Link to='/organizations/' className = 'card'>
                            <i class="fa-solid fa-users"></i>
                            <span className = 'title'>Organization & users</span>
                        </Link>
                        <Link to='/organization/courses/' className = 'card'>
                             <i class="fa-solid fa-chalkboard"></i>
                            <span className = 'title'>Your Courses</span>
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
                        <div className='employer-organizations'>
                            <div class = 'org'>
                                Your organizations
                            </div>
                            <div className='create-btn' onClick={toggleOrgModal}>create</div>
                        </div>
                        {organizations.length > 0 ? (
                            <div className='apps-container'>
                            {organizations.map((data, index) => (
                                <Link to={`/organization/dashboard/${data.id}/${data.name}/`} className='cards organization-card' key={index}>
                                <div className='icon hrms-icon'>
                                    <img src={`${apiUrl}${data.logo}`} alt={data.name} />
                                </div>
                                <div className='text-wrapper'>
                                    <div className='title-header'>{data.name}</div>
                                    <p>{data.overview}</p>
                                    <div className='employee-count'>
                                        <i class="fa-solid fa-users"></i>
                                        <span>({data.employee_count})</span>
                                   
                                    </div>
                                    
                                    
                                </div>
                                <div className='chevron-card' onClick={(event) => handleEllipsisClick(event,index)}>
                                    <i className="fa-solid fa-ellipsis-vertical"></i>
                                </div>
                                {openModalIndex === index && (
                                    <div className='option-modal'>
                                    {/* Users should be able to click on edit tab to edit the specific organization */}
                                    <div className='option-card' onClick={(event)=>toggleMemberModal(event,data.id)}>Add members</div>
                                    <div className='option-card' onClick={(event)=>EditOrganization(event,data.id)}>Edit</div>
                                    <div className='option-card' onClick={(event)=>toggleDeleteModal(event,data.id)}>Delete</div>
                                    </div>
                                )}
                                </Link>
                            ))}
                            </div>
                        ) : (
                            <h4>You haven't created any organizations yet.</h4>
                        )}
                    </div>
                </div>
            </div>
            <form className={`organization-form ${orgModal ? 'show' : ''}`} onSubmit={actionType ==='Create organization' ? handleSubmit :  handleEditSubmit}>
                <div className='form-wrapper'>
                    <div className='form-header'>
                        <div className='title'>{actionType}</div>
                        <div className='icon' onClick={toggleOrgModal}>
                            <i class="fa-solid fa-circle-xmark"></i>
                        </div>
                    </div>
                    {errorMessage && <div className="error-message">{errorMessage}</div>}
                    <div className='form-body'>
                        <div className={`form-group ${name ? 'active' : ''}`}>
                            <input type="text" id="name" value={name} onChange = {handleNameChange} required />
                            <label htmlFor="email">Name</label>
                        </div>
                        <div className={`form-group ${overview ? 'active' : ''}`}>
                            <textarea id="overview" value={overview} onChange = {handleOverviewChange} required></textarea>
                          
                            <label htmlFor="email">brief overview</label>
                        </div>
                        <div className = 'logo-wrapper' >
                            <label id='logo-label' htmlFor="logo" className='logo-label'>Organization logo</label>
                            {previousLogo ? <div className='previous'>previous logo:{previousLogo}</div> : ''}
                            <input
                            type="file"
                            id="logo"
                            name="logo"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                           
                            required = {actionType ==='Create organization' ? true :false}
                            />
                        </div>

                        <div className='btn-wrapper'>
                            <button type="submit">
                            {actionType ==='Create organization' ? "Create" :"Edit"}
                                {isLoading ? <div className="loader"></div> : '' }
                                    
                            </button>
                        </div>
                    </div>
                </div>
            </form>
            <form className={`delete-modal-container ${deleteModal ? 'show' : ''}`} onSubmit={handleDelete}>
                <div className='delete-modal-wrapper'>
                    <div className='title'>Are you sure you want to delete:{deleteName}?</div>
                    <div className = 'btn-wrapper-x'>
                        <div className='cancel-btn' onClick={()=>setdeleteModal(!deleteModal)}>Cancel</div>
                        <button type='submit'>Delete</button>
                    </div>
                </div>
            </form>

            <form className={`organization-form ${memberModal ? 'show-member' : ''}`} onSubmit ={handleInviteSubmit}>
                <div className='form-wrapper'>
                    <div className='form-header'>
                        <div className='title'>Add employee</div>
                        <div className='icon' onClick={toggleMemberModal}>
                            <i class="fa-solid fa-circle-xmark"></i>
                        </div>
                    </div>
                    {errorMessage && <div className="error-message">{errorMessage}</div>}
                    <div className='form-body'>
                        <div className={`form-group ${email ? 'active' : ''}`}>
                            <input type="email" id="email" value={email} onChange = {(e)=>setEmail(e.target.value)} required />
                            <label htmlFor="email">Email</label>
                        </div>
                        <div className={`form-group`}>
                            <select value={department} onChange={(e) => setDepartment(e.target.value)} required>
                                <option value="" disabled>Select Department</option>
                                {departments.map(dep => (
                                    <option key={dep.id} value={dep.id}>{dep.title}</option>
                                ))}
                            </select>
                        </div>
                        

                        <div className='btn-wrapper'>
                            <button type="submit">
                                send invite
                                {isLoading ? <div className="loader"></div> : '' }
                                    
                            </button>
                        </div>
                    </div>
                </div>
            </form>
            {showSnackbar && (
                <div className={` ${snackbarStatus==='success' ? 'snackbar-success' :'snackbar-danger'} `}>
                    {snackbarStatus === 'success' ? (
                        <>
                            <i class="fa-solid fa-circle-check"></i>
                            success!
                        </>
                    ):
                    (
                        <>
                            <i class="fa-solid fa-triangle-exclamation"></i>
                            fail!
                        </>
                    )
                }
                    
                </div>
            )}
        </div>
    );
};

export default EmployerOrganizations;