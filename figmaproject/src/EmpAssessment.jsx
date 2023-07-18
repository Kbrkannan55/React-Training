import React, { useEffect, useState } from 'react';
import {
  Box,
  TableCell,
  TableRow,
  TableContainer,
  TableBody,
  TablePagination,
  Table,
  TableHead,
  TableSortLabel,
  Tab,
  Pagination
} from '@mui/material';
import './EmpAssessment.css'
import ImportExportTwoToneIcon from '@mui/icons-material/ImportExportTwoTone';
import TabList from '@mui/lab/TabList';
import TabContext from '@mui/lab/TabContext';
import TabPanel from '@mui/lab/TabPanel';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FilterListTwoToneIcon from '@mui/icons-material/FilterListTwoTone';
import { createSvgIcon } from '@mui/material/utils';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import TimerIcon from '@mui/icons-material/Timer';
import BadgeIcon from '@mui/icons-material/Badge';
import QuizIcon from '@mui/icons-material/Quiz';
import Slider, { SliderThumb } from '@mui/material/Slider';
import { styled } from '@mui/material/styles';
// Import react-circular-progressbar module and styles
import {
  CircularProgressbar,
  buildStyles
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
// Animation
import { easeQuadInOut } from "d3-ease";
import AnimatedProgressProvider from "./AnimatedProgressProvider";
import Drawer from '@mui/material/Drawer';
import TextField from '@mui/material/TextField';
import { useTheme } from '@mui/material/styles';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import AvailableAssessment from './AvailableAssessment';



const tablefetch={
  border:'none',textAlign:'center',fontSize:'12px',
  color: '#0C1116',
fontFamily: 'Manrope',
fontSize: '13px',
fontStyle: 'normal',
fontWeight: '400',
lineHeight: 'normal'
}

const tablehead={border:'none',position:'relative',
color: '#0C1116',
fontFamily: 'Manrope',
fontSize: '13px',
fontStyle: 'normal',
fontWeight: '400',
lineHeight: '21px',
width: '172px',
height: '48px'
}

//slider
const PrettoSlider = styled(Slider)({
  color: '#1589CC',
  height: 8,
  '& .MuiSlider-track': {
    border: 'none',
  },
  '& .MuiSlider-thumb': {
    height: 10,
    width: 10,
    backgroundColor: '#fff',
    border: '2px solid currentColor',
    '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
      boxShadow: 'inherit',
    },
    '&:before': {
      display: 'none',
    },
  },
  '& .MuiSlider-valueLabel': {
    lineHeight: 1.2,
    fontSize: 12,
    background: 'unset',
    padding: 0,
    width: 32,
    height: 32,
    borderRadius: '50% 50% 50% 0',
    backgroundColor: '#52af77',
    transformOrigin: 'bottom left',
    transform: 'translate(50%, -100%) rotate(-45deg) scale(0)',
    '&:before': { display: 'none' },
    '&.MuiSlider-valueLabelOpen': {
      transform: 'translate(50%, -100%) rotate(-45deg) scale(1)',
    },
    '& > *': {
      transform: 'rotate(45deg)',
    },
  },
});


const EmpAssessment = () => {

  const [employee, setEmployee] = useState([]);
  const [history,setHistory]=useState(
    {
      "empCode": "",
      "name": "",
      "assessmentId": "",
      "department": "",
      "designation": "",
      "skill": "",
      "numberOfQuestion": 0,
      "userEmail": "",
      "numberOfTopics": 0,
      "creatingOn": "",
      "completedOn": "",
      "score": 0,
      "correctAnswer": 0,
      "wrongAnswer": 0,
      "skippedAnswer": 0,
      "points": 0
    }
  );
  const [progressValue, setProgressValue] = useState(0);
  const [latestProgressValue, setLatestProgressValue] = useState(0); // Add new state variable
  const [getAllDept,setNewDept]=useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [orderBy, setOrderBy] = useState('');
  const [order, setOrder] = useState('asc');
  const [value, setValue] = React.useState('1');//Tab
  const [isFilterVisible, setIsFilterVisible] = useState(true);//hide filter


  const empFetch = () => {
    fetch("https://localhost:7281/HistoryTable/HistoryDetails?roleName=Employee", {
      method: "GET"
    })
      .then(async (data) => {
        const myData = await data.json();
        console.log(myData);
        setEmployee(myData);
        console.log(employee);
      });
  };

  //fetch all the values in a table
  useEffect(() => {
    empFetch();
},[employee]);

  //history


  const fetchData = (userAssessmentId) => {
    fetch(`https://localhost:7281/TestHistory/History?UserAssessmentId=${userAssessmentId}`, {
      method: "GET"
    })
      .then(async (data) => {
        const myData = await data.json();
        console.log(myData);
        if (typeof myData === "object" && myData !== null) {
          setHistory(myData);
          setLatestProgressValue(myData.score); // Store the latest progress value
        } else {
          console.error("Invalid data format for history");
        }
        console.log(history);
      });
  };



  const fetchDepartment=()=>{
    fetch(`https://localhost:7281/HistoryTable/GetAllDepartment`, {
      method: "GET"
    })
      .then(async (data) => {
        const myData = await data.json();
        console.log(myData);
        setNewDept(myData)
        console.log(getAllDept);
      });
  }

  useEffect(() => {
    fetchData(history.userAssessmentId); // Fetch data when history.userAssessmentId changes
  }, [history.userAssessmentId]);

  useEffect(() => {
    setProgressValue(latestProgressValue); // Update progressValue with the latest value
  }, [latestProgressValue]);

  useEffect(() => {
    fetchDepartment();
  }, []);
 

    //convert to date format
    const formatDate = (dateString) => {
      const options = {  month: 'short',day: '2-digit', year: 'numeric' };
      return new Date(dateString).toLocaleDateString('en-US', options);
    };

  const formatDate2 = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString();
  
    return `${day}-${month}-${year}`;
  };


  const handleSortClick = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrderBy(property);
    setOrder(isAsc ? 'desc' : 'asc');
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const getComparator = (order, orderBy) => {
    return (a, b) => {
      const valueA = a[orderBy] || '';
      const valueB = b[orderBy] || '';
      if (order === 'asc') {
        return valueA.localeCompare(valueB);
      } else {
        return valueB.localeCompare(valueA);
      }
    };
  };

  const stableSort = (array, comparator) => {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  };

  //Display the table in sorted manner
  const sortedRows = stableSort(employee, getComparator(order, orderBy));
  //For no of rows equal to pagination part
  const slicedRows = sortedRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  //Tab Change


  const handleChange = (event, newValue) => {
    setValue(newValue);
      // Additional logic for handleTabChange
  if (newValue === '2') {
    setIsFilterVisible(false);
  } else {
    setIsFilterVisible(true);
  }
  };

  //select 
  const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};


  //plus icon
  const PlusIcon = createSvgIcon(
    // credit: plus icon from https://heroicons.com/
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 35 35"
      strokeWidth={2.0}
      stroke="currentColor"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
    </svg>,
    'Plus',
  );
  
  //test-result modal
  const [open, setOpen] = React.useState(false);
  const handleOpen = (userAssessmentId) => () => {
    console.log('Open modal for userAssessmentId:', userAssessmentId);
    fetchData(userAssessmentId);
    // Handle modal opening logic here
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  //Accessories-Box Model
  const [open2, setOpen2] = React.useState(false);
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });

  const handleOpen2 = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const position = { 
      top: rect.bottom ,
      left: rect.right 
    };
    setModalPosition(position);
    setOpen2(true);
  };
  
  const handleClose2 = () => {
    setOpen2(false);
  };

  //EditButton
  const [anchor, setAnchor] = React.useState('right');
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setIsDrawerOpen(open);
    setOpen2(false);
    fetchDepartment();
  };
 
  //select button for department
  const theme = useTheme();
  const [departmentName, setdepartmentName] = React.useState([]);

  const departmentChange = (event) => {
    const {
      target: { value },
    } = event;
    setdepartmentName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };




  return (
    <div className='alignment'>
          <TabContext value={value}>
          <div>
            <div className='flexproperty'>
              <div>
              <Box sx={{ borderBottom: 0 }}>
                <TabList onChange={handleChange}
                  TabIndicatorProps={{
                    style: {
                      backgroundColor: '#1589CC', // Set the desired background color for the indicator
                      height: '4px', // Set the desired height of the indicator
                      borderRadius:'10px'
                    },
                  }}
                >
                  <Tab label="Assessment List" value="1"
                  aria-label="styled tabs example"
                      sx={{
                        textTransform: 'none',
                        fontSize:'18px',
                        fontWeight:'400',
                        fontFamily:'system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serif',
                        
                        '&.Mui-selected': {
                          color: '#0C1116',
                          fontSize:'18px',
                          fontWeight:'500',
                          fontFamily:'system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serif'
                        }
                        //borderBottom: '5px solid #1A9CE0', // Set the desired border style
                      }} 
                  />
                  <Tab label="Available Assessment" value="2"
                      sx={{
                        textTransform: 'none',
                        fontSize:'18px',
                        fontWeight:'400',
                        fontFamily:'system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serif',
                        
                        '&.Mui-selected': {
                          color: '#0C1116',
                          fontSize:'18px',
                          fontWeight:'500',
                          fontFamily:'system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serif'
                        }
                        //borderBottom: '5px solid #1A9CE0', // Set the desired border style
                      }} 
                  />
                </TabList>
              </Box>
              </div>
              <div className='flexpropertys'>
                {isFilterVisible && (
                  <div className='filterbox'>
                    <span>
                      <FilterListTwoToneIcon />
                    </span>
                  </div>
                )}
                <div className='create-assess'><span className='plus'> <PlusIcon  /></span>Create Assessment</div>
            </div>
          </div>

          </div>

          <TabPanel value="1">
            <TableContainer>
              <Table sx={{ border: '1px solid #ccc' }}>
                <TableHead sx={{backgroundColor: '#DFF3FB'}}>
                  <TableRow >
                    <TableCell align="center"  sx={tablehead}>
                      <TableSortLabel
                        active={orderBy === 'name'}
                        direction={orderBy === 'name' ? order : 'asc'}
                        onClick={() => handleSortClick('name')}
                        IconComponent={ImportExportTwoToneIcon}
                        sx={{
                          '& .MuiTableSortLabel-icon': {
                            opacity: 1,
                            color: 'blue',
                            marginLeft:'15px',// Set the desired color
                          },
                        }}
                      >
                        Employee Name & ID
                      </TableSortLabel>
                      <div className='right-border'></div>
                    </TableCell>

                    <TableCell align="center"  sx={tablehead}>
                      <TableSortLabel
                        active={orderBy === 'department'}
                        direction={orderBy === 'department' ? order : 'asc'}
                        onClick={() => handleSortClick('department')}
                        IconComponent={ImportExportTwoToneIcon}
                        sx={{
                          '& .MuiTableSortLabel-icon': {
                            opacity: 1,
                            color: 'blue',
                            marginLeft:'15px' // Set the desired color
                          },
                        }}
                      >
                        Department
                      </TableSortLabel>
                      <div className='right-border'></div>
                    </TableCell>

                    <TableCell align="center"  sx={tablehead}>
                      <TableSortLabel
                        active={orderBy === 'skills'}
                        direction={orderBy === 'skills' ? order : 'asc'}
                        onClick={() => handleSortClick('skills')}
                        IconComponent={ImportExportTwoToneIcon}
                        sx={{
                          '& .MuiTableSortLabel-icon': {
                            opacity: 1,
                            color: 'blue',
                            marginLeft:'15px' // Set the desired color
                          },

                        }}
                      >
                        Level
                      </TableSortLabel>
                      <div className='right-border'></div>
                    </TableCell>

                    <TableCell align="center"  sx={tablehead}>
                      <TableSortLabel
                        active={orderBy === 'assessmentId'}
                        direction={orderBy === 'assessmentId' ? order : 'asc'}
                        onClick={() => handleSortClick('assessmentId')}
                        IconComponent={ImportExportTwoToneIcon}
                        sx={{
                          '& .MuiTableSortLabel-icon': {
                            opacity: 1,
                            color: 'blue', // Set the desired color
                            marginLeft:'15px'
                          },
                        }}
                      >
                        Assessment ID
                      </TableSortLabel>
                      <div className='right-border'></div>
                    </TableCell>

                    <TableCell align="center"  sx={tablehead}>
                      No. of Topics
                      <div className='right-border'></div>
                    </TableCell>

                    <TableCell align="center"   sx={tablehead}>
                      <TableSortLabel
                        active={orderBy === 'status'}
                        direction={orderBy === 'status' ? order : 'asc'}
                        onClick={() => handleSortClick('status')}
                        IconComponent={ImportExportTwoToneIcon}
                        sx={{
                          '& .MuiTableSortLabel-icon': {
                            opacity: 1,
                            color: 'blue', // Set the desired color
                            marginLeft:'15px'
                          },
                        }}
                      >
                        Status
                      </TableSortLabel>
                      <div className='right-border'></div>
                    </TableCell>

                    <TableCell align="center"  sx={tablehead}>
                      <TableSortLabel
                        active={orderBy === 'dateOfCompletion'}
                        direction={orderBy === 'dateOfCompletion' ? order : 'asc'}
                        onClick={() => handleSortClick('dateOfCompletion')}
                        IconComponent={ImportExportTwoToneIcon}
                        sx={{
                          '& .MuiTableSortLabel-icon': {
                            opacity: 1,
                            color: 'blue', // Set the desired color
                            marginLeft:'15px'
                          },
                        }}
                      >
                        Completion Date
                      </TableSortLabel>
                      <div className='right-border'></div>
                    </TableCell>

                    <TableCell align="center"   sx={tablehead}>
                      Results
                      <div className='right-border'></div>
                    </TableCell>

                    <TableCell align="center"  sx={tablehead}>
                      Actions
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {slicedRows.map((row) => (
                    <TableRow key={row.userAssessmentId}>
                      <TableCell  sx={{border:'none',fontSize:'12px'}}>
                        <div className='flex-prop'>
                          {/* <div className='imageDiv'><img src={require(`../assets/${row.name}.jpg`)} className='image'></img></div> */}
                          <div>
                            <div className='EmpName'>{row.name}</div>
                            <div className='float viewResult'>{row.empId}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell  sx={tablefetch}>{row.department}</TableCell>
                      <TableCell  sx={tablefetch}>{row.skills}</TableCell>
                      <TableCell  sx={tablefetch}>{row.assessmentId}</TableCell>
                      <TableCell sx={tablefetch}>{row.numberOfTopic}</TableCell>
                      <TableCell  sx={tablefetch}>
                                       <Typography sx={{backgroundColor:
                                                          row.status === 'Completed' ? '#D6F3E9' : '#fde1e1',
                                                          width:'fit-content',
                                                          padding:'5px 5px',
                                                          borderRadius:'4px',
                                                          fontSize:'12px',
                                                          fontWeight:'600',
                                                          fontFamily: 'Manrope',
                                                          fontStyle: 'normal',
                                                          lineHeight: 'normal',
                                                          color:
                                                          row.status === 'Completed' ? '#039855' : '#bb251a'
                                                      }}>{row.status}</Typography> </TableCell>
                      <TableCell sx={tablefetch}>
                        {row.status === 'Completed' ? formatDate(row.dateOfCompletion) : '-'}
                      </TableCell>
                      <TableCell sx={tablefetch} className='viewResult'>
                        {row.status === 'Completed' ? (
                          <p className='result' onClick={handleOpen(row.userAssessmentId)}>VIEW RESULT</p>
                        ) : (
                          <p className='result disabled'>VIEW RESULT</p>
                        )}
                      </TableCell>
                      <TableCell  sx={{border:'none',textAlign:'center'}}>
                        <MoreVertIcon sx={{cursor:'pointer'}} onClick={(event) => handleOpen2(event)}/>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <div className='flex-propt'>
                <div>
                  <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  component="div"
                  count={employee.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  labelDisplayedRows={() => ''} // Hide the displayed rows information
                  backIconButtonProps={{ style: { display: 'none' } }} // Hide the back button
                  nextIconButtonProps={{ style: { display: 'none' } }} // Hide the next button
                
                  sx={{
                    marginTop:5,
                    '& .MuiToolbar-root.MuiTablePagination-toolbar':{
                      width:'180px'
                    }
                  }}
                />
                </div>
                <div>
                  <Pagination
                  count={Math.ceil(employee.length / rowsPerPage)}
                  page={page + 1}
                  onChange={(event, newPage) => handleChangePage(event, newPage - 1)}
                  
                  backIconButtonProps={{ style: { display: 'none' } }} // Hide the back button
                  nextIconButtonProps={{ style: { display: 'none' } }} // Hide the next button

                  sx={{
                    marginTop:6
                  }}
                />
                </div>
                <div className='flex-prop1'>
                  <div className='margin'>Go to page ----</div>
                  <div>
                    <TablePagination
                      rowsPerPageOptions={[5, 10, 25]}
                      component="div"
                      count={employee.length}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      onPageChange={handleChangePage}
                      labelRowsPerPage={null} // Hide the "Rows per page" label
                      labelDisplayedRows={() => ''} // Hide the displayed rows information
                      backIconButtonProps={{ style: { display: 'none' } }} // Hide the back button
                      nextIconButtonProps={{ style: { display: 'block' } }} // Show the next button
                      SelectProps={{ style: { display: 'none' } }} // Hide the select dropdown
                      sx={{ 
                        '& .MuiTablePagination-toolbar.MuiToolbar-root.MuiToolbar-gutters.MuiToolbar-regular':
                        {
                          paddingLeft:0
                        },
                        '& .MuiTablepagination':
                        {
                          marginLeft:0
                        },
                        marginTop:5
                      }}

                    />
                  </div>
                </div>
              </div>

              
            </TableContainer>
          </TabPanel>
          <TabPanel value='2'>
        <AvailableAssessment/>
    </TabPanel>
        </TabContext>
      {/* Result Modal */}
      <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      >
        <div className='resultbox resultcolor'>
              <div>
              <div className='flexing'>
                <div className='fontsize'>Assessment Result</div>
                <div onClick={handleClose} className='cancel paddnone'><CancelIcon/></div>
              </div>
              <div className='line'></div> 
              <div className='flex-propt2'>
                <div className='width'>
                  <div className='flex'>
                    <div><BadgeIcon style={{ color: '#1589CC' }}/></div>
                    <div className='moveright'>
                      <div className='head'>Employee Details</div>
                      <div className='name'>{history.name}</div>
                      <table>
                          <tr>
                            <td className='heading'>Emp Code</td>
                            <td className='response'>{history.empCode}</td>
                          </tr>
                          <tr>
                            <td className='heading'>Email Address</td>
                            <td className='response'>{history.userEmail}</td>
                          </tr>
                          <tr>
                            <td className='heading'>Department</td>
                            <td className='response'>{history.department}</td>
                          </tr>
                          <tr>
                            <td className='heading'>Designation</td>
                            <td className='response'>{history.designation}</td>
                          </tr>
                        </table>
                        </div>
                  </div>           
                </div>
  
                <div className='width'>
                  <div className='flex'>
                    <div><QuizIcon  style={{ color: '#1589CC' }}/></div>
                    <div className='moveright'>
                      <div className='head'>Assessment Details</div>
                      <div className='name'>{history.assessmentId}</div>
                      <div>
                        <table>
                          <tr>
                            <td className='heading'>Level</td>
                            <td className='response'>{history.skill}</td>
                          </tr>
                          <tr>
                            <td className='heading'>No of Topics</td>
                            <td className='response'>{history.numberOfTopics}</td>
                          </tr>
                          <tr>
                            <td className='heading'>No of Questions</td>
                            <td className='response'>{history.numberOfQuestion}</td>
                          </tr>
                          <tr>
                            <td className='heading'>Created On</td>
                            <td className='response'>{formatDate2(history.creatingOn)}</td>
                          </tr>
                        </table>
                      </div>
                    </div>
                  </div>    
                </div>
              </div>
              <br></br>
              <div className='white'>
                <br></br>
                <div className='flex-prop'>
                  <div className="rectangle">
                    <div className='resultname'>Result</div>
                    <div className='flex'>
                      <div><CheckBoxIcon style={{ color: '#039855' }}/></div>
                      <div className='margleft'>
                        <div className='passed'>Assessment Passed</div>
                        <div className='answer'>Correct Answer</div>
                        <div className='margbot answer'><span className='score'>{history.correctAnswer}</span>/{history.numberOfQuestion}</div>
                        <div className='answer'>Wrong Answer</div>
                        <div className='margbot answer'><span className='score'>{history.wrongAnswer}</span>/{history.numberOfQuestion}</div>
                        <div className='answer'>Skipped Answer</div>
                        <div className='answer'><span className='score'>{history.skippedAnswer}</span>/{history.numberOfQuestion}</div>
                      </div>
                      <div className='mark'>
                        <Example>
                          <AnimatedProgressProvider
                            valueStart={0}
                            valueEnd={progressValue}
                            duration={2.5}
                            easingFunction={easeQuadInOut}      
                                   no-repeat
                          >
                            {value => {
                              const roundedValue = Math.round(value);
                              return (
                                <CircularProgressbar
                                  value={value}
                                  text={`${roundedValue}%`}
                                  strokeWidth={6}
                                  text2={history.points}
                                  styles={buildStyles({ pathTransition: "", 
                                  textColor: '#039855',
                                  trailColor: '#d6d6d6',
                                  pathColor: "#039855",


                                })}
                                />
                              );
                            }}
                          </AnimatedProgressProvider>
                        </Example>

                      </div>
                    </div>
                    <div className='position'>
                      <div className='flex2'>
                        {/* <div className='percent'><span className='bigpresent'>{history.score}</span>%</div>
                        <div className='points'>60 Points</div> */}
                      </div>
                    </div>
                  </div>
                  <div className="rectangle marg">
                    <div className='resultname'>Timer</div>
                    <div className='flex'>
                        <div><TimerIcon  style={{ color: '#1589CC' }}/></div>
                        <div className='margleft'>
                          <div className='timer'>Total Time</div>
                          <div className='start'>00:00:12 &nbsp;&nbsp;&nbsp; /  &nbsp;&nbsp;&nbsp;<span className='end'>00:27:21</span></div>
                          <div className='margboth'>
                            <PrettoSlider
                              valueLabelDisplay="none"
                              aria-label="pretto slider"
                              defaultValue={5}
                              sx={{
                                width:'300px',
                                '@media (max-width: 1024px)': {
                                  width: '200px', // Adjust width for screens up to 1024px
                                  marginBottom:'0px'
                                },
                                '@media (max-width: 820px)': {
                                  width: '200px', // Adjust width for screens up to 820px
                                },
                                '@media (max-width: 420px)': {
                                  width: '100%', // Adjust width for screens up to 420px
                                }
                              }}
                            />
                          </div>
                          <div>
                            <table>
                              <tr>
                                <td className='answer'>Start Time</td>
                                <td className='time'>05:35pm</td>
                                <td className='answer'>Questions</td>
                                <td className='time'>01</td>
                              </tr>
                              <tr>
                                <td className='answer margboth'>End Time</td>
                                <td className='time margboth' >06:02pm</td>
                                <td className='answer margboth'>Date of Completion</td>
                                <td className='time margboth'>{formatDate2(history.completedOn)}</td>
                              </tr>
                            </table>
                          </div>
                        </div>
                    </div>
                  </div>
                </div>
              </div>    
              
            </div>
        </div>
      </Modal>

      {/* Accessories Modal */}
      <Modal
      open={open2}
      onClose={handleClose2}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      style={{
        position: 'absolute',
        top: modalPosition.top,
        right: modalPosition.left,
      }}
      >
        <div className='accessoriesBox'>
          <div className='flexbox'>
              <div className='comman' onClick={toggleDrawer("right", true)}>Edit</div>
              <div className='comman'>Delete</div>
              <div className='comman'>Accessed to</div>
          </div>
        </div>
      </Modal>

      {/* Edit Button */}

      <div>
        <Drawer
          anchor="right" // Set the anchor to "right" for the drawer to appear from the right side
          open={isDrawerOpen}
          onClose={toggleDrawer(false)}
        >
          <div className='EditSidebar'>
              <div className='createFlex'>
                <div className='create'>Create Employee Assessment</div>
                <div onClick={toggleDrawer(false)} className='cursor'>
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                    <path d="M16 2C19.713 2 23.274 3.475 25.8995 6.1005C28.525 8.72601 30 12.287 30 16C30 19.713 28.525 23.274 25.8995 25.8995C23.274 28.525 19.713 30 16 30C12.287 30 8.72601 28.525 6.1005 25.8995C3.475 23.274 2 19.713 2 16C2 12.287 3.475 8.72601 6.1005 6.1005C8.72601 3.475 12.287 2 16 2ZM16 14.302L12.748 11.05C12.5228 10.8248 12.2174 10.6983 11.899 10.6983C11.5806 10.6983 11.2752 10.8248 11.05 11.05C10.8248 11.2752 10.6983 11.5806 10.6983 11.899C10.6983 12.2174 10.8248 12.5228 11.05 12.748L14.302 16L11.05 19.252C10.9385 19.3635 10.8501 19.4959 10.7897 19.6415C10.7294 19.7872 10.6983 19.9433 10.6983 20.101C10.6983 20.2587 10.7294 20.4148 10.7897 20.5605C10.8501 20.7061 10.9385 20.8385 11.05 20.95C11.1615 21.0615 11.2939 21.1499 11.4395 21.2103C11.5852 21.2706 11.7413 21.3017 11.899 21.3017C12.0567 21.3017 12.2128 21.2706 12.3585 21.2103C12.5041 21.1499 12.6365 21.0615 12.748 20.95L16 17.698L19.252 20.95C19.3635 21.0615 19.4959 21.1499 19.6415 21.2103C19.7872 21.2706 19.9433 21.3017 20.101 21.3017C20.2587 21.3017 20.4148 21.2706 20.5605 21.2103C20.7061 21.1499 20.8385 21.0615 20.95 20.95C21.0615 20.8385 21.1499 20.7061 21.2103 20.5605C21.2706 20.4148 21.3017 20.2587 21.3017 20.101C21.3017 19.9433 21.2706 19.7872 21.2103 19.6415C21.1499 19.4959 21.0615 19.3635 20.95 19.252L17.698 16L20.95 12.748C21.0615 12.6365 21.1499 12.5041 21.2103 12.3585C21.2706 12.2128 21.3017 12.0567 21.3017 11.899C21.3017 11.7413 21.2706 11.5852 21.2103 11.4395C21.1499 11.2939 21.0615 11.1615 20.95 11.05C20.8385 10.9385 20.7061 10.8501 20.5605 10.7897C20.4148 10.7294 20.2587 10.6983 20.101 10.6983C19.9433 10.6983 19.7872 10.7294 19.6415 10.7897C19.4959 10.8501 19.3635 10.9385 19.252 11.05L16 14.302Z" fill="#242D35"/>
                  </svg>
                </div>
              </div>
              <div>
                <TextField
                  helperText="Please enter the title of assessment that help you to manage"
                  id="demo-helper-text-aligned"
                  label="Enter Assessment ID"

                  sx={{margin:'0px 40px 40px 40px',
                        width:'654px',
                        height:'22px'
                      }}
                />
              </div>
              <div>
                <FormControl sx={{ m: 1, width: 300 }}>
                  <InputLabel id="demo-multiple-name-label"
                  sx={{margin:'40px 40px 40px 30px',
                  width:'654px',
                  height:'56px'
                }}
                  >
                    Department</InputLabel>
                    <Select
                      labelId="demo-multiple-name-label"
                      id="demo-multiple-name"
                      multiple
                      value={departmentName}
                      onChange={departmentChange}
                      label="Department"
                      MenuProps={MenuProps}
                      sx={{margin:'40px 50px 40px 30px',
                      width:'654px',
                      height:'56px'
                    }}
                    >
                      {getAllDept.map((name) => (
                        <MenuItem
                          key={name}
                          value={name}
                          style={getStyles(name, departmentName, theme)}
                          sx={{
                                width:'654px',
                                height:'22px'
                              }}
                        >
                          {name.departmentName}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
              </div>
          </div>
        </Drawer>
      </div>

  </div>
);
};

export default EmpAssessment;


function Example(props) {
  return (
    <div style={{ marginBottom: 80 }}>
      <div style={{ marginLeft: '20px', display: "flex" }}>
        <div className='circularBar' style={{  }}>{props.children}</div>
        {/* <div style={{ width: "70%" }}>
          <p>{props.description}</p>
        </div> */}
      </div>
    </div>
  );
}



function getStyles(getAllDept, departmentName, theme) {
  return {
    fontWeight:
    departmentName.indexOf(getAllDept) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}