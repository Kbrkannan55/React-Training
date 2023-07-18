import React, { useEffect, useState } from 'react';
import './AvailableAssessment.css';
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import Avatar1 from './assests/avatar1.png';
import Avatar2 from './assests/avatar2.png';
import Avatar3 from './assests/avatar3.png';
import Avatar4 from './assests/avatar4.png';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { TablePagination, Pagination } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';

const AvailableAssessment = () => {
  const [departments, setDepartments] = useState([]);
  const [skills, setSkills] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [topics, setTopics] = useState([]);
  const [assessment, setAssessment] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(8);
  const [selectedItems, setselectedItems] = useState({
    deptid: 0,
    skillid: 0,
    topicid: [0],
  });
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [selectedSkill, setSelectedSkill] = useState('');

  // Fetch data and update state
  useEffect(() => {
    fetchDepartments();
    fetchSkills();
    fetchAssessment();
  }, []);

  // Fetch departments and update state
  const fetchDepartments = async () => {
    try {
      const response = await fetch('https://localhost:7281/api/AssesmentData/AllDepartments');
      const data = await response.json();
      setDepartments(data);
      console.log("New Data", departments)
    } catch (error) {
      console.error('Error fetching departments:', error);
    }
  };

  // Fetch skills and update state
  const fetchSkills = async () => {
    try {
      const response = await fetch('https://localhost:7281/api/AssesmentData/GetSkills');
      const data = await response.json();
      setSkills(data);
    } catch (error) {
      console.error('Error fetching skills:', error);
    }
  };

  // Fetch assessment and update state
  const fetchAssessment = async () => {
    try {
      const response = await fetch('https://localhost:7281/api/AssesmentData/AllAssessments?rolename=Employee');
      const data = await response.json();
      setAssessment(data);
    } catch (error) {
      console.error('Error fetching assessment:', error);
    }
  };

  // Handle department selection
  const handleDepartmentChange = (event) => {
    const departmentId = event.target.value;
    setSelectedDepartment(departmentId);
    fetchTopicsByDepartment(departmentId);
    setselectedItems({ ...selectedItems, deptid: departmentId });
  };

  // Fetch topics based on department selection
  const fetchTopicsByDepartment = async (departmentId) => {
    try {
      const response = await fetch(`https://localhost:7281/api/AssesmentData/GetTopicsByDepartment?id=${departmentId}`);
      const data = await response.json();
      setTopics(data);
    } catch (error) {
      console.error('Error fetching topics:', error);
    }
  };

  // Handle topic selection
  const handleTopicChange = (event) => {
    const { value } = event.target;
    setSelectedTopics(value);
    setselectedItems({ ...selectedItems, topicid: value });
  };

  // Handle skill selection
  const handleSkillChange = (event) => {
    const skillId = event.target.value;
    setSelectedSkill(skillId);
    setselectedItems({ ...selectedItems, skillid: skillId });
  };

  // Handle sorting and fetching sorted assessment
  const handlePostRequest = async () => {
    try {
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(selectedItems),
      };
      console.log("Dep ",departments)
      const response = await fetch('https://localhost:7281/api/AssesmentData/GetSelectedItems', requestOptions);

      if (response.ok) {
        const data = await response.json();

        // Apply sorting based on selected department, skill, and topics
        const sortedAssessment = data.sort((a, b) => {
          if (selectedDepartment !== '' && a.deptid !== b.deptid) {
            return a.deptid - b.deptid;
          }
          if (selectedSkill !== '' && a.skillid !== b.skillid) {
            return a.skillid - b.skillid;
          }
          if (selectedTopics.length > 0) {
            const topicA = a.topicid?.find((topicId) => selectedTopics.includes(topicId));
            const topicB = b.topicid?.find((topicId) => selectedTopics.includes(topicId));

            if (topicA !== undefined && topicB !== undefined) {
              return topicA - topicB;
            }
          }
          return 0;
        });

        setAssessment(sortedAssessment);
        setPage(0);
      } else {
        console.error('Error:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };



  // Handle page change
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Handle rows per page change
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset the page to the first page after changing rows per page
  };

  return (
    <>
      <div className="Available-Assessment">
        <div className="select-tags">
          {/* Available Departments */}
          <div className="select1">
            <FormControl sx={{ m: 1, width: 300 }}>
              <InputLabel id="demo-multiple-name-label">Select Department</InputLabel>
              <Select
                labelId="demo-multiple-name-label"
                label="Select Department"
                value={selectedDepartment}
                onChange={handleDepartmentChange}
              >
                {departments.map((department) => (
                  <MenuItem key={department.id} value={department.id}>
                    {department.departmentName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          {/* Available Topics */}
          <div className="select1">
            <FormControl sx={{ m: 1, width: 300 }}>
              <InputLabel id="demo-multiple-checkbox-label">Select Topics</InputLabel>
              <Select
                labelId="demo-multiple-checkbox-label"
                id="demo-multiple-checkbox"
                multiple
                value={selectedTopics}
                label="Select Topics"
                onChange={handleTopicChange}
                renderValue={(selected) =>
                  selected.map((value) => {
                    const topic = topics.find((topic) => topic.id === value);
                    return topic ? topic.topicName : '';
                  }).join(', ')
                }
              >
                {topics.map((topic) => (
                  <MenuItem key={topic.id} value={topic.id}>
                    <Checkbox checked={selectedTopics.includes(topic.id)} />
                    {topic.topicName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          {/* Skills */}
          <div className="select1">
            <FormControl sx={{ m: 1, width: 300 }}>
              <InputLabel id="demo-multiple-name-label">Select Skills</InputLabel>
              <Select
                labelId="demo-multiple-name-label"
                label="Select Skills"
                value={selectedSkill}
                onChange={handleSkillChange}
              >
                {skills.map((skill) => (
                  <MenuItem key={skill.id} value={skill.id}>
                    {skill.skillLevel}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        </div>
        <div className="sorts">
          <div className="sort">
            <button
              className="sort-button"
              style={{ border: '1px solid white', width: '110px', borderRadius: '3px' }}
              onClick={handlePostRequest}
            >
              Sort by <UnfoldMoreIcon />
            </button>
          </div>
        </div>
      </div>
      <h4 style={{ fontFamily: 'manrope', margin: '30px 25px', fontWeight: '700' }}>List Of Assessments</h4>
      <div className="List-Of-Assessments">
        <div className="container" style={{maxWidth:'1480px',marginLeft:'30px'}}>
          <div className="row">
            {assessment.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((ass, index) => (
              <div className="col-md-6 col-lg-3 mb-4 px-4" key={index}>
                <div className="card" style={{ border: '1px solid #48B8E6', borderRadius: '7px', width: '320px' }}>
                  <div className="card-body">
                    <h5 className="card-title" style={{ fontWeight: 'bold' }}>
                      {ass.assessmentID}
                    </h5>
                    <h6 className="card-subtitle mb-2 text-muted">{ass.department}</h6>
                    <div className="skill-and-topic">
                      <span className="badge" style={{ border: '1px solid grey', color: 'black', borderRadius: '10px' }}>
                        {ass.skllLevel}
                      </span>
                      &nbsp;&nbsp;&nbsp;
                      <span className="badge" style={{ border: '1px solid grey', color: 'black', borderRadius: '10px' }}>
                        Topics: {ass.topicID.join(' & ')}
                      </span>
                    </div>
                    <p className="card-text" style={{ width: '150px' }}>
                      {ass.topicName.join(', ')}
                    </p>
                    <div className="avatar-and-button" style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ width: '180px' }}>
                        <AvatarGroup total={7}>
                          <Avatar alt="Remy Sharp" src={Avatar2} />
                          <Avatar alt="Travis Howard" src={Avatar1} />
                          <Avatar alt="Cindy Baker" src={Avatar3} />
                          <Avatar alt="Agnes Walker" src={Avatar4} />
                        </AvatarGroup>
                      </span>
                      <span
                        style={{
                          border: '1px solid #48B8E6',
                          borderRadius: '15px',
                          marginTop: '15px',
                          marginBottom: '7px',
                          color: '#1CAAE2',
                          cursor: 'pointer',
                        }}
                      >
                        Assign to <ArrowForwardIcon />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="ending">
          <div className="pagination-container">
            <TablePagination
              component="div"
              count={assessment.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPageOptions={[8, 14, 20]}
              onChangeRowsPerPage={handleChangeRowsPerPage}
              labelRowsPerPage="Rows per page"
              labelDisplayedRows={() => ''}
              backIconButtonProps={{ style: { display: 'none' } }}
              nextIconButtonProps={{ style: { display: 'none' } }}
              sx={{
                width: '200px',
              }}
            />

            <Pagination
              count={Math.ceil(assessment.length / rowsPerPage)}
              page={page + 1}
              onChange={(event, newPage) => handleChangePage(event, newPage - 1)}
              backIconButtonProps={{ style: { display: 'none' } }}
              nextIconButtonProps={{ style: { display: 'none' } }}
              sx={{
                marginTop: '-35px',
                marginLeft: '700px',
              }}
            />
          </div>
          <div className="flex-prop1">
            <div className="margin" style={{ paddingRight: '50px', marginTop: '15px' }}>
              Go to page ----
            </div>
            <div style={{ marginTop: '-19px', marginRight: '20px' }}>
              <TablePagination
                rowsPerPageOptions={[8, 14, 24]}
                component="div"
                count={assessment.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                labelRowsPerPage={null}
                labelDisplayedRows={() => ''}
                backIconButtonProps={{ style: { display: 'none' } }}
                nextIconButtonProps={{ style: { display: 'block' } }}
                SelectProps={{ style: { display: 'none' } }}
                sx={{
                  '& .MuiTablePagination-toolbar.MuiToolbar-root.MuiToolbar-gutters.MuiToolbar-regular': {
                    paddingLeft: 0,
                  },
                  '& .MuiTablepagination': {
                    marginLeft: 0,
                  },
                  '& .MuiTablePagination-actions': {
                    marginTop: '20px',
                  },
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AvailableAssessment;
