import React, { useState,useEffect } from 'react';
//import { Link,useNavigate } from 'react-router-dom';
import { Link,useNavigate,useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import apiUrl from '../components/api-url';
import '../styles/organization-dashboard.css';
import 'swiper/swiper-bundle.css';
import '../styles/employer-dashboard.css';
import Header from '../components/header';

//import hero1 from '../styles/hero1.jpg';

const OrganizationDashboard = ()=>{
    const user = useSelector((state) => state.user.user);
    const { Id } = useParams();
    const [organization,setOrganization] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [employees,setEmployees] = useState([]);
    const [employeeName,setEmployeeName] = useState('');
    const navigate = useNavigate();
    const [openSlideSections, setOpenSlideSections] = useState(0);
    const [StatusModal, setStatusModal] = useState(0);
    const [memberModal,setMemberModal] = useState(false);
    const [department, setDepartment] = useState('');
    const [departments,setDepartments] = useState([]);
    const [employeeId,setEmployeeId] = useState('');
    const [date,setDate] = useState('');
    const [reason,setReason] = useState('');
    const [actionType,setActionType] = useState('');
    const [offboardingList,setOffboardingList] = useState([]);
    const [onboardingList,setOnboardingList] = useState([]);
    const [removeEmployeeModal,setRemoveEmployeeModal] = useState(false);
    const [timesheetModal,setTimesheetModal] = useState(false);

    const [taskName,setTaskName] = useState('');
    const [activityDescription,setActivityDescription] = useState('');
    const [endingDate,setEndingDate] = useState('');
    const [hoursWorked,setHoursWorked] = useState('');
    const [timeSheet,setTimeSheet] = useState([]);

    
    const toggleTimeSheetModal = ()=>{
        setTimesheetModal(!timesheetModal);
    };
    const handleTimeSheet = async (event) => {
        event.preventDefault();
        setIsLoading(!isLoading);
        
        try {
            const formData = new FormData();
            formData.append('end_date', endingDate);
            formData.append('task_name', taskName);
            formData.append('hours_worked', hoursWorked );
            formData.append('activity_description',activityDescription );
            formData.append('organization',Id );
            const response = await axios.post(`${apiUrl}/create-time-sheet/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Token ${user.auth_token}`, // Include the user ID in the Authorization header
                },
            });
    
            if (response.data.success) {
                setTimeout(() => {
                    setIsLoading(isLoading);
                    
                    setEndingDate('');
                    setTaskName('');
                    setHoursWorked('');
                    setActivityDescription('');
                    setTimesheetModal(!timesheetModal);
             
                    //navigate('/');
                   
                }, 2000);
                //console.log('org created successfully:', response.data.course);
                // Redirect to the home page or do any other actions
            } else {
                setErrorMessage('An unknown error occured.');
                //console.error('Course creation failed:', response.data.message);
                // Handle failed course creation, e.g., show error messages to the user
            }
        } catch (error) {
            console.error('An error occurred during course creation:', error);
            setTimeout(() => {
                setIsLoading(isLoading);
                setErrorMessage('An error occurred');
               
            }, 2000);
            // Handle unexpected errors
        }
    };
    const toggleSlider = (index) => {
        setOpenSlideSections((prevOpenSection) => (prevOpenSection === index ? null : index));
    };
    const toggleStatusModal = (index) => {
        setStatusModal((prevOpenSection) => (prevOpenSection === index ? null : index));
    };
    const toggleRemoveEmployeeModal = (Id,name,action)=>{
        setActionType(action);
        setEmployeeId(Id);
        setEmployeeName(name);
        setErrorMessage('');
        setRemoveEmployeeModal(!removeEmployeeModal);
    };
    const closeRemoveEmployeeModal = ()=>{
        setActionType('');
        setEmployeeId('');
        setEmployeeName('');
        setRemoveEmployeeModal(!removeEmployeeModal);
    };
    const toggleMemberModal = (Id,name)=>{
        setEmployeeId(Id);
        setEmployeeName(name);
        setMemberModal(!memberModal);
    };
    const closeMemberModal = ()=>{
        setEmployeeId('');
        setEmployeeName('');
        setMemberModal(!memberModal);
    };
    const handleDepartmentChange = async (event) => {
        event.preventDefault();
        setIsLoading(!isLoading);
        
        try {
            const formData = new FormData();
            formData.append('department', department);
            const response = await axios.put(`${apiUrl}/membership-department/${employeeId}/change/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Token ${user.auth_token}`, // Include the user ID in the Authorization header
                },
            });
    
            if (response.data.success) {
                setTimeout(() => {
                    setIsLoading(isLoading);
                    setDepartment('');
                    setEmployeeName('');
                    setEmployeeId('');
                    setMemberModal(!memberModal);
                    fetchEmployees();
                    //navigate('/');
                   
                }, 2000);
                //console.log('org created successfully:', response.data.course);
                // Redirect to the home page or do any other actions
            } else {
                setErrorMessage('An unknown error occured.');
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
    const handleEmployeeRemove = async (event) => {
        event.preventDefault();
        setIsLoading(!isLoading);
        
        try {
            const formData = new FormData();
            formData.append('date', date);
            formData.append('reason', reason);
            formData.append('status', actionType);
            const response = await axios.post(`${apiUrl}/membership-department/${employeeId}/remove/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Token ${user.auth_token}`, // Include the user ID in the Authorization header
                },
            });
    
            if (response.data.success) {
                setTimeout(() => {
                    setIsLoading(isLoading);
                    
                    setEmployeeName('');
                    setReason('');
                    setDate('');
                    setEmployeeId('');
                    setRemoveEmployeeModal(!removeEmployeeModal);
                    fetchEmployees();
                    fetchOffboardingList();
                    //navigate('/');
                   
                }, 2000);
                //console.log('org created successfully:', response.data.course);
                // Redirect to the home page or do any other actions
            } else {
                setErrorMessage('An unknown error occured.');
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
    const fetchEmployees = async () => {
        try {
          const response = await axios.get(`${apiUrl}/employees/list/${Id}/`);
          console.log(response.data);
          setEmployees(response.data);
        } catch (error) {
          console.error('Error fetching organization:', error.message);
        }
    };
    const fetchOffboardingList = async () => {
        try {
          const response = await axios.get(`${apiUrl}/off-boarding-list/${Id}/`);
          console.log(response.data);
          setOffboardingList(response.data);
        } catch (error) {
          console.error('Error offboarding list:', error.message);
        }
    };
    const fetchTimeSheet = async () => {
        try {
            
            const response = await axios.get(`${apiUrl}/time-sheet/${Id}/list/`,{
                headers: {
                    'Authorization': `Token ${user.auth_token}`, // Include the user ID in the Authorization header
                },
            });
          
          //console.log(response.data);
          setTimeSheet(response.data);
        } catch (error) {
          console.error('Error offboarding list:', error.message);
        }
    };
    const fetchOnboardingList = async () => {
        try {
          const response = await axios.get(`${apiUrl}/on-boarding-list/${Id}/`);
          //console.log(response.data);
          setOnboardingList(response.data);
        } catch (error) {
          console.error('Error offboarding list:', error.message);
        }
    };

    useEffect(() => {

       
        if (user=== null || user?.isEmployer === false ) {
            // Redirect to the login page
            navigate('/');
            return; // Stop further execution of useEffect
        };
        const fetchOrganization = async () => {
            try {
              const response = await axios.get(`${apiUrl}/organization/${Id}/`);
              console.log(response.data);
              setOrganization(response.data);
            } catch (error) {
              console.error('Error fetching organization:', error.message);
            }
        };
        
       
        const fetchDepartments = async () => {
            try {
              const response = await axios.get(`${apiUrl}/departments/list/`);
              setDepartments(response.data);
            } catch (error) {
              console.error('Error fetching departments:', error.message);
            }
        };
      
        fetchDepartments();
        fetchOnboardingList();
        fetchOffboardingList();
        fetchEmployees();
        fetchOrganization();
        fetchTimeSheet();
        
    }, [Id,user,navigate]);
   
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
                       <div className='organization-header'>
                        <div className='box1'>
                            <div className='box1-logo'>
                                <img src={`${apiUrl}${organization.logo}`} alt = {organization.name}/>
                                <div className='org-name'>{organization.name}</div>
                            </div>
                        </div>
                        <div className='box2'>
                            <div className={`tabs ${openSlideSections === 0 ? 'active' :''}`} onClick={() => toggleSlider(0)}>Employees</div>
                            <div className={`tabs ${openSlideSections === 1 ? 'active' :''}`} onClick={() => toggleSlider(1)}>My TimeSheet</div>
                            <div className={`tabs ${openSlideSections === 2 ? 'active' :''}`} onClick={() => toggleSlider(2)}>Employee TimeSheet</div>
                            <div className={`tabs ${openSlideSections === 3 ? 'active' :''}`} onClick={() => toggleSlider(3)}>Requests</div>
                            <div className={`tabs ${openSlideSections === 4 ? 'active' :''}`} onClick={() => toggleSlider(4)}>Onboarding</div>
                            <div className={`tabs ${openSlideSections === 5 ? 'active' :''}`} onClick={() => toggleSlider(5)}>Offboarding</div>
                            <div className={`tabs ${openSlideSections === 6 ? 'active' :''}`} onClick={() => toggleSlider(6)}>Performance</div>
                        </div>
                       </div>
                       {openSlideSections === 0 && (
                         <div className='organization-body'>
                            <div className='body-title'>Employee List</div>
                            <table>
                                <thead>
                                    <tr>
                                    <th>ID</th>
                                    <th>First name</th>
                                    <th>Last name</th>
                                    <th>Department</th>
                                    <th>Status</th>
                                    {/* Add more columns as needed */}
                                    </tr>
                                </thead>
                                <tbody>
                                    {employees.map((employee) => (
                                    <tr key={employee.id}>
                                        <td>#{employee.organization}{employee.id}</td>
                                        <td>{employee.first_name}</td>
                                        <td>{employee.last_name}</td>
                                        <td>{employee.department}</td>
                                        <td className={`status ${StatusModal === 0 ? 'show' :''}`} onClick={() => toggleStatusModal(employee.id)} >
                                            <span>{employee.status}</span>
                                            <i class="fa-solid fa-ellipsis-vertical"></i>
                                            {StatusModal === employee.id && (
                                                <div className = 'status-modal'>
                                                    {employee.status === 'Inactive' && (
                                                        <div className='card' onClick={()=>toggleRemoveEmployeeModal(employee.id,employee.first_name,'Active')}>Reinstate Employee</div>
                                                        
                                                    )}
                                                    {employee.status === 'Suspended' && (
                                                        <div className='card' onClick={()=>toggleRemoveEmployeeModal(employee.id,employee.first_name,'Active')}>Reinstate Employee</div>
                                                        
                                                    )}
                                                    <div className='card' onClick={()=>toggleMemberModal(employee.id,employee.first_name)}>Change Department</div>
                                                    <div className='card' onClick={()=>toggleRemoveEmployeeModal(employee.id,employee.first_name,'Inactive')}>Remove employee</div>
                                                    <div className='card' onClick={()=>toggleRemoveEmployeeModal(employee.id,employee.first_name,'Suspended')}>Suspend</div>
                                                   
                                                </div>
                                            )}
                                            
                                        </td>
                                        {/* Add more columns as needed */}
                                    </tr>
                                    ))}
                                </tbody>
                            </table>
                         </div>
                       )}
                       {openSlideSections === 1 && (
                        <div className='organization-body'>
                            <div className = 'timesheet'>
                                <div className='body-title'>My TimeSheet</div>
                                <div className='time-btn' onClick={toggleTimeSheetModal}>
                                    Create TimeSheet
                                </div>
                            </div>
                            <table>
                                <thead>
                                    <tr>
                                    <th>ID</th>
                                    <th>Date</th>
                                    <th>Name</th>
                                    <th>Organization</th>
                                    <th>Task name</th>
                                    <th>Description</th>
                                    <th>Hours worked</th>
                                    {/* Add more columns as needed */}
                                    </tr>
                                </thead>
                                <tbody>
                                    {timeSheet.map((employee) => (
                                    <tr key={employee.id}>
                                        <td>#{employee.organization}{employee.id}</td>
                                        <td>{employee.date}</td>
                                        <td>{employee.user}</td>
                                        <td>{employee.organization}</td>
                                        <td>{employee.task_name}</td>
                                        <td>{employee.activity_description}</td>
                                       
                                        <td>{employee.hours_worked}</td>
                                    
                                    </tr>
                                    ))}
                                </tbody>
                            </table>
                         </div>
                       )}
                        {openSlideSections === 4 && (
                         <div className='organization-body'>
                            <div className='body-title'>Employee List</div>
                            <table>
                                <thead>
                                    <tr>
                                    <th>ID</th>
                                    <th>invited_by</th>
                                    <th>invited_user</th>
                                    
                                    <th>Department</th>
                                    <th>Status</th>
                                    {/* Add more columns as needed */}
                                    </tr>
                                </thead>
                                <tbody>
                                    {onboardingList.map((employee) => (
                                    <tr key={employee.id}>
                                        <td>#{employee.organization}{employee.id}</td>
                                        <td>{employee.invited_by}</td>
                                        <td>{employee.invited_user}</td>
                                        <td>{employee.department}</td>
                                        <td className={`status}`} onClick={() => toggleStatusModal(employee.id)} >
                                            <span>{employee.status}</span>
                                           
                                            
                                        </td>
                                        {/* Add more columns as needed */}
                                    </tr>
                                    ))}
                                </tbody>
                            </table>
                         </div>
                       )}
                       {openSlideSections === 5 && (
                         <div className='organization-body'>
                            <div className='body-title'>Employee List</div>
                            <table>
                                <thead>
                                    <tr>
                                    <th>ID</th>
                                    <th>First name</th>
                                    <th>Last name</th>
                                    <th>Department</th>
                                    <th>Status</th>
                                    {/* Add more columns as needed */}
                                    </tr>
                                </thead>
                                <tbody>
                                    {offboardingList.map((employee) => (
                                    <tr key={employee.id}>
                                        <td>#{employee.organization}{employee.id}</td>
                                        <td>{employee.first_name}</td>
                                        <td>{employee.last_name}</td>
                                        <td>{employee.department}</td>
                                        <td className={`status ${StatusModal === 0 ? 'show' :''}`} onClick={() => toggleStatusModal(employee.id)} >
                                            <span>{employee.status}</span>
                                            <i class="fa-solid fa-ellipsis-vertical"></i>
                                            {StatusModal === employee.id && (
                                                <div className = 'status-modal'>
                                                    {employee.status === 'Inactive' && (
                                                        <div className='card' onClick={()=>toggleRemoveEmployeeModal(employee.id,employee.first_name,'Active')}>Reinstate Employee</div>
                                                        
                                                    )}
                                                   
                                                </div>
                                            )}
                                            
                                        </td>
                                        {/* Add more columns as needed */}
                                    </tr>
                                    ))}
                                </tbody>
                            </table>
                         </div>
                       )}
                      
                    </div>
                </div>
            </div>

            <form className={`organization-form ${memberModal ? 'show-member' : ''}`} onSubmit ={handleDepartmentChange}>
                <div className='form-wrapper'>
                    <div className='form-header'>
                        <div className='title'>Employee deparment</div>
                        <div className='icon' onClick={closeMemberModal}>
                            <i class="fa-solid fa-circle-xmark"></i>
                        </div>
                    </div>
                    {errorMessage && <div className="error-message">{errorMessage}</div>}
                    <div className='form-body'>
                        <div className={`form-group`}>
                           <p>Are you sure you want to change {employeeName}'s department?</p>
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
                                submit
                                {isLoading ? <div className="loader"></div> : '' }
                                    
                            </button>
                        </div>
                    </div>
                </div>
            </form>
            <form className={`organization-form ${removeEmployeeModal ? 'remove-member' : ''}`} onSubmit = {handleEmployeeRemove } >
                <div className='form-wrapper'>
                    <div className='form-header'>
                        <div className='title'>Employee deparment</div>
                        <div className='icon' onClick={closeRemoveEmployeeModal}>
                            <i class="fa-solid fa-circle-xmark"></i>
                        </div>
                    </div>
                    {errorMessage && <div className="error-message">{errorMessage}</div>}
                    <div className='form-body'>
                        <div className={`form-group`}>
                           {actionType === 'Inactive' &&(
                            <p>Are you sure you want to remove {employeeName}'s from your team?</p>
                           )}
                            {actionType === 'Active' &&(
                             <p>Are you sure you want to reinstate {employeeName} to your team?</p>
                           )}
                           {actionType === 'Suspended' &&(
                            <p>Are you sure you want to suspend {employeeName}?</p>
                           )}
                        </div>
                        <div className={`form-group ${reason ? 'active' : ''}`}>
                            <textarea id="reason" value={reason} onChange = {(event)=>setReason(event.target.value)} required></textarea>
                          
                            <label htmlFor="reason">Reason</label>
                        </div>
                        <div className={`form-group ${date ? 'active' : ''}`}>
                            <div className='date'>Start date:</div>
                            <input type='date' value={date} onChange = {(event)=>setDate(event.target.value)} required />
                          
                        </div>
                        
                        

                        <div className='btn-wrapper'>
                            <button type="submit">
                                Remove
                                {isLoading ? <div className="loader"></div> : '' }
                                    
                            </button>
                        </div>
                    </div>
                </div>
            </form>
            <form className={`organization-form ${timesheetModal ? 'timesheet-modal' : ''}`} onSubmit = {handleTimeSheet} >
                <div className='form-wrapper'>
                    <div className='form-header'>
                        <div className='title'>Create timesheet</div>
                        <div className='icon' onClick={toggleTimeSheetModal}>
                            <i class="fa-solid fa-circle-xmark"></i>
                        </div>
                    </div>
                    {errorMessage && <div className="error-message">{errorMessage}</div>}
                    <div className='form-body'>
                        <div className={`form-group ${taskName ? 'active' : ''}`}>
                            <input id='task-name' type='text' value={taskName} onChange = {(event)=>setTaskName(event.target.value)} required />
                            <label htmlFor="task-name">Task name</label>
                        </div>
                        <div className={`form-group ${ activityDescription ? 'active' : ''}`}>
                            <textarea id="activity-description" value={activityDescription} onChange = {(event)=>setActivityDescription(event.target.value)} required></textarea>
                          
                            <label htmlFor="activity-description">Activity description</label>
                        </div>
                        <div className={`form-group ${hoursWorked ? 'active' : ''}`}>
                            <input id='hours-worked'  type='number' value={hoursWorked} onChange = {(event)=>setHoursWorked(event.target.value)} required />
                            <label htmlFor="hours-worked">hours worked</label>
                        </div>
                        <div className={`form-group ${endingDate ? 'active' : ''}`}>
                            <div className='date'>Date:</div>
                            <input id='ending-date'  type='datetime-local' value={endingDate} onChange = {(event)=>setEndingDate(event.target.value)} required />
                           
                        </div>
                        
                        

                        <div className='btn-wrapper'>
                            <button type="submit">
                                Create
                                {isLoading ? <div className="loader"></div> : '' }
                                    
                            </button>
                        </div>
                    </div>
                </div>
            </form>
            
        </div>
    );
};

export default OrganizationDashboard;