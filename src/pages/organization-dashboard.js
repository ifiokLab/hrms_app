import React, { useState,useEffect } from 'react';
//import { Link,useNavigate } from 'react-router-dom';
import { Link,useNavigate,useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import apiUrl from '../components/api-url';
import '../styles/organization-dashboard.css';
import 'swiper/swiper-bundle.css';
import '../styles/snackbar.css';
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
    const [organizationTimeSheet,setOrganizationTimeSheet] = useState([]);
    const [payrollData, setPayrollData] = useState([]);
    const [totalSalary,setTotalSalary] = useState(0);
    const [payrollHistory,setPayrollHistory] = useState([]);
    const [requestList,setRequestList] = useState([]);
    const [requestModal,setRequestModal] = useState(false);
    const [employeesTimesheet,setEmployeesTimesheet] = useState([]);
    const [employeesTimesheetModal,setEmployeesTimesheetModal] = useState(0);
    const [paymentSchedule,setPaymentSchedule] = useState('');
    const [scheduleModal,setScheduleModal] = useState('');
    const [scheduleType,setScheduleType] = useState('');
    const [invoiceList,setInvoiceList] = useState([]);
    const [paidModal,setPaidModal] = useState(0);
    const [showSnackbar, setShowSnackbar] = useState(false);
    const [snackbarStatus, setsnackbarStatus] = useState('');


    const togglePaidModal = (index)=>{
        setPaidModal((prevOpenSection) => (prevOpenSection === index ? null : index));
    }
    const toggleScheduleModal = ()=>{
        setScheduleModal(!scheduleModal);
    }
    const toggleTimeSheetModal = ()=>{
        setTimesheetModal(!timesheetModal);
    };
    const toggleEmployeesTimesheetModal = (index) => {
        setEmployeesTimesheetModal((prevOpenSection) => (prevOpenSection === index ? null : index));
    };
    const handleTimeSheet = async (event) => {
        event.preventDefault();
        setIsLoading(!isLoading);
        setsnackbarStatus('fail');
        setShowSnackbar(true);
        
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
    const handleRequest = async (requestStatus,requestId) => {
        
        setShowSnackbar(false);
        
        
        try {
            const formData = new FormData();
            formData.append('status', requestStatus);
            formData.append('requestId',requestId );
            const response = await axios.post(`${apiUrl}/requests-status/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Token ${user.auth_token}`, // Include the user ID in the Authorization header
                },
            });
    
            if (response.data.success) {
                setTimeout(() => {
                   console.log('success');
                   fetchOrganizationRequest();
                    //navigate('/');
                   
                }, 2000);
                setsnackbarStatus('success');
                 setShowSnackbar(true);
                //console.log('org created successfully:', response.data.course);
                // Redirect to the home page or do any other actions
            } else {
                console.log('an error occurred');
                setsnackbarStatus('fail');
                setShowSnackbar(true);
                //setErrorMessage('An unknown error occured.');
                //console.error('Course creation failed:', response.data.message);
                // Handle failed course creation, e.g., show error messages to the user
            }
        } catch (error) {
            console.error('An error occurred:', error);
            
            // Handle unexpected errors
        }
    };

    const handlePaid = async (status,Id) => {
        
        
        try {
            const formData = new FormData();
            formData.append('status', status);
            formData.append('Id',Id );
            const response = await axios.post(`${apiUrl}/pay-status/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Token ${user.auth_token}`, // Include the user ID in the Authorization header
                },
            });
    
            if (response.data.success) {
                setTimeout(() => {
                   console.log('success');
                   fetchInvoiceList();
                   fetchPayrollHistory();
                    //navigate('/');
                   
                }, 2000);
                //console.log('org created successfully:', response.data.course);
                // Redirect to the home page or do any other actions
            } else {
                console.log('an error occurred');
                //setErrorMessage('An unknown error occured.');
                //console.error('Course creation failed:', response.data.message);
                // Handle failed course creation, e.g., show error messages to the user
            }
        } catch (error) {
            console.error('An error occurred:', error);
            
            // Handle unexpected errors
        }
    };

    const handleEmployeeTimesheet = async (status,timesheetId) => {
        setShowSnackbar(false);
        
        
        try {
            const formData = new FormData();
            formData.append('status', status);
            formData.append('timesheetId',timesheetId );
            const response = await axios.post(`${apiUrl}/employees-timesheet-status/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Token ${user.auth_token}`, // Include the user ID in the Authorization header
                },
            });
    
            if (response.data.success) {
                setTimeout(() => {
                   console.log('success');
                   fetchEmployeesTimeSheet();
                   
                   //fetchOrganizationRequest();
                    //navigate('/');
                   
                }, 2000);
                setsnackbarStatus('success');
                setShowSnackbar(true);
                //console.log('org created successfully:', response.data.course);
                // Redirect to the home page or do any other actions
            } else {
                setsnackbarStatus('fail');
                setShowSnackbar(true);
                console.log('an error occurred');
                //setErrorMessage('An unknown error occured.');
                //console.error('Course creation failed:', response.data.message);
                // Handle failed course creation, e.g., show error messages to the user
            }
        } catch (error) {
            console.error('An error occurred:', error);
            
            // Handle unexpected errors
        }
    };
    const handlePaymentSchedule = async (event) => {
        event.preventDefault();
        setErrorMessage('');
        setIsLoading(!isLoading);
        setShowSnackbar(false);
        try {
            const formData = new FormData();
            formData.append('organizationId',Id );
            formData.append('payment_schedule',scheduleType );

            const response = await axios.post(`${apiUrl}/set-payment-schedule/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Token ${user.auth_token}`, // Include the user ID in the Authorization header
                },
            });
            fetchEmployeesTimeSheet();
    
            if (response.data.success) {
                
                setTimeout(() => {
                   console.log('success');
                   fetchPaymentSchedule();
                   setIsLoading(isLoading);
                   setScheduleModal(!scheduleModal);
                   //fetchOrganizationRequest();
                    //navigate('/');
                   
                }, 2000);
                setsnackbarStatus('success');
                 setShowSnackbar(true);
                
                //console.log('org created successfully:', response.data.course);
                // Redirect to the home page or do any other actions
            } else {
                setsnackbarStatus('fail');
                 setShowSnackbar(true);
                setIsLoading(isLoading);
                console.log('an error occurred');
                setErrorMessage('An error occurred.');
                
            }
        } catch (error) {
            console.error('An error occurred:', error);
            setIsLoading(!isLoading);
            
            // Handle unexpected errors
        }
    };
    const toggleSlider = (index) => {
        setOpenSlideSections((prevOpenSection) => (prevOpenSection === index ? null : index));
    };
    const toggleStatusModal = (index) => {
        setStatusModal((prevOpenSection) => (prevOpenSection === index ? null : index));
    };
    const toggleRequestModal = (index) => {
        setRequestModal((prevOpenSection) => (prevOpenSection === index ? null : index));
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
        setShowSnackbar(false);
        
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
                setsnackbarStatus('success');
                setShowSnackbar(true);
                //console.log('org created successfully:', response.data.course);
                // Redirect to the home page or do any other actions
            } else {
                setsnackbarStatus('fail');
                setShowSnackbar(true);
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
    const fetchPaymentSchedule = async () => {
        try {
          const response = await axios.get(`${apiUrl}/check-payment-schedule/${Id}/`);
          
          setPaymentSchedule(response.data.schedule);
        } catch (error) {
          console.error('Error', error.message);
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
    const fetchEmployeesTimeSheet = async () => {
        try {
            
            const response = await axios.get(`${apiUrl}/employees-timesheet/${Id}/`,{
                headers: {
                    'Authorization': `Token ${user.auth_token}`, // Include the user ID in the Authorization header
                },
            });
          
          //console.log(response.data);
          setEmployeesTimesheet(response.data);
        } catch (error) {
          console.error('Error offboarding list:', error.message);
        }
    };
    const fetchOrganizationTimeSheet = async () => {
        try {
            
            const response = await axios.get(`${apiUrl}/organization/time-sheet/${Id}/list/`,{
                headers: {
                    'Authorization': `Token ${user.auth_token}`, // Include the user ID in the Authorization header
                },
            });
          
          console.log('$$$$$$$$$:',response.data.timesheets);
          setOrganizationTimeSheet(response.data.timesheets);
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
  
    const fetchPayrollHistory = async () => {
        try {
          const response = await axios.get(`${apiUrl}/payroll-history/${Id}/`);
          //console.log(response.data);
          setPayrollHistory(response.data.all_payroll);
        } catch (error) {
          console.error('Error offboarding list:', error.message);
        }
    };
    const fetchInvoiceList = async () => {
        try {
          const response = await axios.get(`${apiUrl}/invoice-list/${Id}/`);
          //console.log(response.data);
          setInvoiceList(response.data.all_invoice);
        } catch (error) {
          console.error('Error offboarding list:', error.message);
        }
    };

    const fetchOrganizationRequest = async () => {
        try {
          const response = await axios.get(`${apiUrl}/organization/requests/${Id}/`);
          console.log(response.data);
          setRequestList(response.data.all_requests);
        } catch (error) {
          console.error('Error fetching organization:', error.message);
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
        fetchOrganizationTimeSheet();
        fetchPayrollHistory();
        fetchOrganizationRequest();
        fetchEmployeesTimeSheet();
        fetchPaymentSchedule();
        fetchInvoiceList();
       
        
        
        
    }, [Id,user,navigate]);

    const handleHourlyRateChange = async (employeeId, hourlyRate) => {
        try {
          const response = await axios.post(`${apiUrl}/calculate_salary/${employeeId}/`, {
            hourly_rate: hourlyRate,
          });
      
          // Assuming the response includes calculated salary, update the state or display it as needed
          const updatedOrganizationTimeSheet = organizationTimeSheet.map(employee => {
            if (employee.employeeId === employeeId) {
              return { ...employee, salary: response.data.salary };
            }
            return employee;
          });
          const updatedPayRoll = organizationTimeSheet.map(employee => {
            if (employee.employeeId === employeeId) {
              return { ...employee, salary: response.data.salary,hourly_rate:response.data.hourly_rate };
            }
            return employee;
          });
      
          setOrganizationTimeSheet(updatedOrganizationTimeSheet);
          setPayrollData(updatedPayRoll);
      
          // Calculate total salary based on the updated organizationTimeSheet
          const total = updatedOrganizationTimeSheet.reduce((acc, employee) => {
           
            return acc + employee.salary;
          }, 0);
      
          setTotalSalary(total);
        } catch (error) {
          console.error('Failed to calculate salary:', error);
        }
      };
      const handleSubmitPayroll = async () => {
         setIsLoading(!isLoading);
         setShowSnackbar(false)
        try {
          // Assuming you have an API endpoint for submitting payroll
          const response = await axios.post(`${apiUrl}/api/submit-payroll/${Id}/`, 
          { payroll_data: payrollData, total_amount: totalSalary }
          );
          console.log(response.data);
          setTimeout(() => {

            setIsLoading(isLoading);
            toggleSlider(8);
            fetchPayrollHistory();
           
           
        }, 2000);
        setsnackbarStatus('success');
        setShowSnackbar(true);
          
          // Handle success, reset or navigate to another page, etc.
        } catch (error) {
          console.error('Failed to submit payroll:', error);
          setIsLoading(isLoading);
          setsnackbarStatus('fail');
          setShowSnackbar(false);
          // Handle error
        }
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
                       <div className='organization-header'>
                        <div className='box1'>
                            <div className='box1-logo'>
                                <img src={`${organization.logo}`} alt = {organization.name}/>
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
                            <div className={`tabs ${openSlideSections === 7 ? 'active' :''}`} onClick={() => toggleSlider(7)}>Payroll</div>
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
                        {openSlideSections === 2 && (
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
                                    {employeesTimesheet.map((employee) => (
                                    <tr key={employee.id}>
                                       
                                        <td>{employee.date}</td>
                                        <td>{employee.user}</td>
                                        <td>{employee.organization}</td>
                                        <td>{employee.task_name}</td>
                                        <td className='table-description'>{employee.activity_description}</td>
                                       
                                        <td>{employee.hours_worked}</td>
                                        <td className={`status ${employeesTimesheetModal === 0 ? 'show' :''}`} onClick={() => toggleEmployeesTimesheetModal(employee.id)} >
                                            <span>{employee.status}</span>
                                            <i class="fa-solid fa-ellipsis-vertical"></i>
                                            {employeesTimesheetModal === employee.id && (
                                                <div className = 'status-modal'>
                                                   
                                                    {employee.status === 'Approved' && (
                                                        <div className='card' onClick={()=>handleEmployeeTimesheet('Rejected',employee.id)}>Reject</div>
                                                    )}
                                                   
                                                   
                                                    
                                                    {(employee.status === 'Pending' || employee.status === 'Rejected' || employee.status === 'Under Review') && (
                                                        <div className='card' onClick={()=>handleEmployeeTimesheet('Approved',employee.id)}>Approve</div> 
                                                    )}
                                                   
                                                   
                                                   
                                                </div>
                                            )}
                                            
                                            
                                        </td>
                                    
                                    </tr>
                                    ))}
                                </tbody>
                            </table>
                         </div>
                       )}
                       {openSlideSections === 3 && (
                         <div className='organization-body'>
                            <div className='body-title'>Employee Requests</div>
                            <table>
                                <thead>
                                    <tr>
                                    <th>Employee</th>
                                    <th>Organization</th>
                                    <th>Request type</th>
                                    <th>Start Date</th>
                                    <th>End Date</th>
                                    <th>Status</th>
                                    {/* Add more columns as needed */}
                                    </tr>
                                </thead>
                                <tbody>
                                    {requestList.map((employee) => (
                                    <tr key={employee.id}>
                                        <td>{employee.user}</td>
                                        <td>#{employee.organization}</td>
                                        <td>{employee.request_type}</td>
                                        <td>{employee.start_date}</td>
                                        <td>{employee.end_date}</td>
                                        
                                        {/* Add more columns as needed */}
                                        <td className={`status ${requestModal === 0 ? 'show' :''}`} onClick={() => toggleRequestModal(employee.id)} >
                                            <span>{employee.status}</span>
                                            <i class="fa-solid fa-ellipsis-vertical"></i>
                                            {requestModal === employee.id && (
                                                <div className = 'status-modal'>
                                                   
                                                    {employee.status === 'Approved' && (
                                                        <div className='card' onClick={()=>handleRequest('Rejected',employee.id)}>Reject</div>
                                                    )}
                                                   
                                                    {employee.status !== 'Under Review' && (
                                                        <div className='card' onClick={()=>handleRequest('Under Review',employee.id)}>Under Review</div> 
                                                    )}
                                                     {employee.status !== 'Rejected' && (
                                                        <div className='card' onClick={()=>handleRequest('Rejected',employee.id)}>Reject</div> 
                                                    )}
                                                    {(employee.status === 'Pending' || employee.status === 'Rejected' || employee.status === 'Under Review') && (
                                                        <div className='card' onClick={()=>handleRequest('Approved',employee.id)}>Approve</div> 
                                                    )}
                                                   
                                                   
                                                   
                                                </div>
                                            )}
                                            
                                            
                                        </td>
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
                       {openSlideSections === 7 && (
                            <div className='organization-body'>
                                <div className='body-title-wrapper'>
                                    <div className='schedule-title'>
                                        <span>Payment Schedule:{paymentSchedule}</span>
                                        <i onClick={ toggleScheduleModal } class="fa-solid fa-pen-to-square"></i>
                                    </div>
                                   <div className='invoice-wrapper'>
                                        <div className={`tabs ${openSlideSections === 8 ? 'active' :''}`} onClick={() => toggleSlider(8)}>Payroll history</div>
                                        <div className={`tabs ${openSlideSections === 9 ? 'active' :''}`} onClick={() => toggleSlider(9)}>Total invoice</div>
                                   </div>
                                </div>
                            
                            <table>
                              <thead>
                                <tr>
                                  <th>Employee name</th>
                                  <th>Department</th>
                                  <th>Rate/hr</th>
                                  <th>hours worked</th>
                                  <th>total salary</th>
                                </tr>
                              </thead>
                              <tbody>
                                {organizationTimeSheet.map((employee) => (
                                  <tr key={employee.id}>
                                    <td>{employee.user}</td>
                                    <td>{employee.department}</td>
                                    <td>
                                      <input
                                        type='number'
                                        placeholder=' e.g $20.2/hr'
                                        onChange={(e) => handleHourlyRateChange(employee.employeeId, e.target.value)}
                                      />
                                    </td>
                                    <td>{employee.hours_worked}</td>
                                    <td>
                                     ${employee.salary}
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                            <div className='total-salary'>
                            Total Salary: {totalSalary}
                             {/* calcolate the total salary amount and display it here */}
                            </div>
                            <div className='submit-payroll-wrapper'>
                                {/*the employer should be able to submit the payroll */}
                                <div className = 'btn' onClick={handleSubmitPayroll}>
                                     Submit Payroll
                                     {isLoading ? <div className="loader"></div> : '' }
                                </div>
                            </div>
                          </div>
                       )}
                       {openSlideSections === 8 && (
                        <div className='organization-body'>
                        <div className='body-title'>Payroll list</div>
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
                                    <td className={`status ${paidModal === 0 ? 'show' :''}`} onClick={() => togglePaidModal(employee.payId)} >
                                            <span>{employee.status}</span>
                                            <i class="fa-solid fa-ellipsis-vertical"></i>
                                            {paidModal === employee.payId && (
                                                <div className = 'status-modal'>
                                                     <div className='card' onClick={()=>handlePaid('Paid',employee.payId)}>Paid</div>
                                                     <div className='card' onClick={()=>handlePaid('Pending',employee.payId)}>Pending</div>
                                                     <div className='card' onClick={()=>handlePaid('Cancelled',employee.payId)}>Cancelled</div>
                                                   
                                                   
                                                   
                                                   
                                                   
                                                </div>
                                            )}
                                            
                                            
                                        </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                       
                      </div>
                        )}
                         {openSlideSections === 9 && (
                        <div className='organization-body'>
                        <div className='body-title'>Total invoice</div>
                        <table>
                              <thead>
                                <tr>
                                  <th>Date</th>
                                  <th>Organization</th>
                                  <th>total amount</th>
                                 
                                </tr>
                              </thead>
                              <tbody>
                                {invoiceList.map((employee) => (
                                  <tr key={employee.id}>
                                    <td>{employee.date}</td>
                                   
                                    <td>
                                     {employee.organization}
                                    </td>
                                    <td>
                                     ${employee.salary_amount}
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
                              Submit
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

            <form className={`organization-form ${scheduleModal ? 'show-member' : ''}`} onSubmit ={handlePaymentSchedule}>
                <div className='form-wrapper'>
                    <div className='form-header'>
                        <div className='title'>Set Payment Schedule</div>
                        <div className='icon' onClick={toggleScheduleModal}>
                            <i class="fa-solid fa-circle-xmark"></i>
                        </div>
                    </div>
                    {errorMessage && <div className="error-message">{errorMessage}</div>}
                    <div className='form-body'>
                        
                        <div className={`form-group`}>
                            <select value={scheduleType} onChange={(e) => setScheduleType(e.target.value)} required>
                                <option value="" disabled>Select Payment schedule</option>
                                <option  value='Monthly'>Monthly</option>
                                <option  value='Bi-Weekly'>Bi-Weekly</option>
                                <option  value='Weekly'>Weekly</option>
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

export default OrganizationDashboard;