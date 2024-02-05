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
import '../styles/snackbar.css';

//import hero1 from '../styles/hero1.jpg';

const EmployeeOrganizationDashboard = ()=>{
    const user = useSelector((state) => state.user.user);
    const { Id } = useParams();
    const [organization,setOrganization] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
   
    const navigate = useNavigate();
    const [openSlideSections, setOpenSlideSections] = useState(0);
    
    const [timesheetModal,setTimesheetModal] = useState(false);

    const [taskName,setTaskName] = useState('');
    const [activityDescription,setActivityDescription] = useState('');
    const [endingDate,setEndingDate] = useState('');
    const [hoursWorked,setHoursWorked] = useState('');
    const [timeSheet,setTimeSheet] = useState([]);
    const [requestModal,setRequestModal] = useState(false);
    const [requestType, setRequestType] = useState('Vacation');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [reason, setReason] = useState('');
    const [requestList, setRequestList] = useState([]);
    const [showSnackbar, setShowSnackbar] = useState(false);
    const [snackbarStatus, setsnackbarStatus] = useState('');
    const [payrollHistory,setPayrollHistory] = useState([]);

    
    const toggleTimeSheetModal = ()=>{
        setTimesheetModal(!timesheetModal);
        setErrorMessage('');
    };
    const toggleRequestModal = ()=>{
        setErrorMessage('');
        setRequestModal(!requestModal);
    };
    const handleTimeSheet = async (event) => {
        event.preventDefault();
        setIsLoading(!isLoading);
        setShowSnackbar(false);
       
        
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
                    fetchTimeSheet();
             
                    //navigate('/');
                   
                }, 2000);
                setShowSnackbar(true);
                setsnackbarStatus('success');
                //console.log('org created successfully:', response.data.course);
                // Redirect to the home page or do any other actions
            } else {
                setShowSnackbar(true);
                setsnackbarStatus('fail');
                setErrorMessage(response.data.message);
                setIsLoading(isLoading);
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
    const fetchPayrollHistory = async () => {
        try {
            const response = await axios.get(`${apiUrl}/employee-payroll-history/${Id}/`,{
                headers: {
                    'Authorization': `Token ${user.auth_token}`, // Include the user ID in the Authorization header
                },
            });
         
          //console.log(response.data);
          setPayrollHistory(response.data.all_payroll);
        } catch (error) {
          console.error('Error offboarding list:', error.message);
        }
    };
    const handleRequest = async (event) => {
        event.preventDefault();
        setIsLoading(!isLoading);
        setShowSnackbar(false);
        
        try {
            const formData = new FormData();
            formData.append('end_date', endDate);
            formData.append('start_date', startDate);
            formData.append('reason', reason);
            formData.append('request_type',requestType);
            formData.append('organization',Id );
            const response = await axios.post(`${apiUrl}/request/create/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Token ${user.auth_token}`, // Include the user ID in the Authorization header
                },
            });
    
            if (response.data.success) {
                setTimeout(() => {
                    setIsLoading(isLoading);
                    
                    setEndDate('');
                    setStartDate('');
                    setReason('');
                    setRequestType('');
                    setRequestModal(!requestModal);
                    fetchRequest();
                   
                    //fetchTimeSheet();
                   
                }, 2000);
                setShowSnackbar(true);
                setsnackbarStatus('success');
                //console.log('org created successfully:', response.data.course);
                // Redirect to the home page or do any other actions
            } else {
                setShowSnackbar(false);
                setsnackbarStatus('fail');
                setErrorMessage(response.data.message);
                setIsLoading(isLoading);
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
    const fetchRequest = async () => {
        try {
            
            const response = await axios.get(`${apiUrl}/request/list/`,{
                headers: {
                    'Authorization': `Token ${user.auth_token}`, // Include the user ID in the Authorization header
                },
            });
          
          //console.log(response.data);
          setRequestList(response.data.all_requests);
        } catch (error) {
          console.error('Error fetching request:', error.message);
        }
    };
   

    useEffect(() => {

       
        if (user=== null || user?.isEmployer === true ) {
            // Redirect to the login page
            navigate('/');
            return; // Stop further execution of useEffect
        };
        const fetchOrganization = async () => {
            try {
              const response = await axios.get(`${apiUrl}/organization/${Id}/`);
             
              setOrganization(response.data);
            } catch (error) {
              console.error('Error fetching organization:', error.message);
            }
        };
        
       
       
      
       
        fetchOrganization();
        fetchRequest();
        fetchTimeSheet();
        fetchPayrollHistory();
        
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
                            <div className={`tabs ${openSlideSections === 0 ? 'active' :''}`} onClick={() => toggleSlider(0)}>TimeSheet</div>
                            <div className={`tabs ${openSlideSections === 1 ? 'active' :''}`} onClick={() => toggleSlider(1)}>Requests</div>
                            <div className={`tabs ${openSlideSections === 2 ? 'active' :''}`} onClick={() => toggleSlider(2)}>Notifications</div>
                            <div className={`tabs ${openSlideSections === 3 ? 'active' :''}`} onClick={() => toggleSlider(3)}>Payroll History</div>
                            <div className={`tabs ${openSlideSections === 4 ? 'active' :''}`} onClick={() => toggleSlider(4)}>Courses</div>
                           
                        </div>
                       </div>
                       {openSlideSections === 0 && (
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
                                    <th>Status</th>
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
                                        <td className='table-description'>{employee.activity_description}</td>
                                       
                                        <td>{employee.hours_worked}</td>
                                        <td>{employee.status}</td>
                                    
                                    </tr>
                                    ))}
                                </tbody>
                            </table>
                         </div>
                       )}
                        {openSlideSections === 1 && (
                        <div className='organization-body'>
                            <div className = 'timesheet'>
                                <div className='body-title'>My Requests</div>
                                <div className='time-btn' onClick={toggleRequestModal}>
                                    Create Request
                                </div>
                            </div>
                            <table>
                                <thead>
                                    <tr>
                                    <th>ID</th>
                                    <th>Start date</th>
                                    <th>End date</th>
                                    <th>Organization</th>
                                    <th>Request type</th>
                                   
                                    <th>Status</th>
                                    {/* Add more columns as needed */}
                                    </tr>
                                </thead>
                                <tbody>
                                    {requestList.map((employee) => (
                                    <tr key={employee.id}>
                                        <td>#{employee.organization}{employee.id}</td>
                                        <td>{employee.start_date}</td>
                                        <td>{employee.end_date}</td>
                                        <td>{employee.organization}</td>
                                        <td>{employee.request_type}</td>
                                        <td>{employee.status}</td>
                                    
                                    </tr>
                                    ))}
                                </tbody>
                            </table>
                         </div>
                       )}
                        {openSlideSections === 3 && (
                        <div className='organization-body'>
                        <div className='body-title'>Payroll History</div>
                        <table>
                              <thead>
                                <tr>
                                  <th>Date</th>
                                  <th>Employee</th>
                                  <th>Organization</th>
                                  <th>Hourly rate</th>
                                  <th>salary</th>
                                  <th>Status</th>
                                 
                                </tr>
                              </thead>
                              <tbody>
                                {payrollHistory.map((employee) => (
                                  <tr key={employee.id}>
                                    <td>{employee.date}</td>
                                    <td>{employee.user}</td>
                                    <td>
                                     {employee.organization}
                                    </td>
                                    <td>${employee.hourly_rate}/hr</td>
                                    <td>
                                     ${employee.salary_amount}
                                    </td>
                                    <td className={`status`} >
                                            <span>{employee.status}</span>
                                            
                                            
                                            
                                        </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                       
                      </div>
                        )}
                       
                      
                      
                      
                    </div>
                </div>
            </div>

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
            <form className={`organization-form ${requestModal ? 'timesheet-modal' : ''}`} onSubmit = {handleRequest} >
            <div className='form-wrapper'>
                <div className='form-header'>
                    <div className='title'>Create request</div>
                    <div className='icon' onClick={toggleRequestModal}>
                        <i class="fa-solid fa-circle-xmark"></i>
                    </div>
                </div>
                {errorMessage && <div className="error-message">{errorMessage}</div>}
                <div className='form-body'>
                    <div className={`form-group ${requestType ? 'active' : ''}`}>
                        <select
                            id="requestType"
                            value={requestType}
                            onChange={(e) => setRequestType(e.target.value)}
                            >
                            {/* Add options for request types */}
                            <option value="Vacation">Vacation</option>
                            <option value="Sick Leave">Sick Leave</option>
                            <option value="Work from Home">Work from Home</option>
                            <option value="Business Travel">Business Travel</option>
                            <option value="Training">Training</option>
                            <option value="Maternity Leave">Maternity Leave</option>
                            <option value="Paternity Leave">Paternity Leave</option>
                            <option value="Unpaid Leave">Unpaid Leave</option>
                            <option value="Remote Work">Remote Work</option>
                            <option value="Conference Attendance">Conference Attendance</option>
                            <option value="Family Emergency">Family Emergency</option>
                            <option value="Personal Development">Personal Development</option>
                            <option value="Community Service">Community Service</option>
                            <option value="Study Leave">Study Leave</option>
                            <option value="Flex Time">Flex Time</option>
                            <option value="Sabbatical">Sabbatical</option>
                            <option value="Resignation">Resignation</option>
                            <option value="Other">Other</option>
                            {/* Add other request types as needed */}
                        </select>
                        <label htmlFor="requestType">Request</label>
                    </div>
                    <div className={`form-group ${ reason ? 'active' : ''}`}>
                        <textarea id="reason" value={reason}  onChange={(e) => setReason(e.target.value)} required></textarea>
                      
                        <label htmlFor="reason">Reason</label>
                    </div>
                   
                    <div className={`form-group ${startDate ? 'active' : ''}`}>
                        <div className='date'>start date:</div>
                        <input id='start-date'  type='date' value={startDate} onChange = {(event)=>setStartDate(event.target.value)} required />
                       
                    </div>
                    <div className={`form-group ${endDate ? 'active' : ''}`}>
                        <div className='date'>End date:</div>
                        <input id='end-date'  type='date' value={endDate} onChange = {(event)=>setEndDate(event.target.value)} required />
                       
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

export default EmployeeOrganizationDashboard;