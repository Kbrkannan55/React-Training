import React, { useState, useEffect } from 'react';
import './Settings.css';
import ProfileImg from '../src/assests/Img.png';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';

const Settings = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        department: '',
        dateOfBirth: '',
        gender: '',
        educationLevel: '',
        email: '',
        phoneNumber: '',
        location: '',
        address: '',
        newPassword: '',
        confirmNewPassword: '',
    });
    const [isEditMode, setIsEditMode] = useState(false);
    const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);
    const [changePasswordData, setChangePasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: '',
    });
    const [isPasswordChanged, setIsPasswordChanged] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch('https://localhost:7281/api/AssesmentData/GetUsers');
            const data = await response.json();
            console.log('Fetched data:', data);
            setFormData(data);
            

        } catch (error) {
            console.error('Error Fetching Details:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleDateChange = (date) => {
        setFormData((prevData) => ({ ...prevData, dateOfBirth: date }));
    };

    const handleSaveChanges = async () => {
        try {
            const response = await fetch('https://localhost:7281/api/AssesmentData?id=KB2010', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
                
            });
            console.log("Form Data",formData)
            if (response.ok) {
                console.log('Changes saved successfully');
                setIsPasswordChanged(true);
            } else {
                console.error('Failed to save changes');
            }
        } catch (error) {
            console.error('Error saving changes:', error);
        }
        setIsEditMode(false);
    };

    const handleChangePassword = () => {
        setIsChangePasswordOpen(true);
    };

    const handleCloseChangePassword = () => {
        setIsChangePasswordOpen(false);
    };

    const handlePasswordChange = (e) => {
        const { name, value } = e.target;
        setChangePasswordData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSavePassword = () => {
        // TODO: Implement logic for saving the new password
        console.log('Current Password:', changePasswordData.currentPassword);
        console.log('New Password:', changePasswordData.newPassword);
        console.log('Confirm New Password:', changePasswordData.confirmNewPassword);
        setIsPasswordChanged(true);
        handleCloseChangePassword();
    };

    const handleEditProfile = () => {
        setIsEditMode(true);
    };

    return (
        <>
            <div className="entire-page">
                <div className="top-logo-and-image">
                    <div className="profile-image">
                        <img src={ProfileImg} style={{ marginTop: '110px' }} alt="ProfileImage" />
                    </div>
                </div>
                <div className="top-flex">
                    <div className="top-flex1">
                        <h4>{formData.id} - {formData.firstName} {formData.lastName}</h4>
                        <h5>{formData.designation}</h5>
                    </div>
                    <div className="top-flex2">
                        <Button sx={{ color: 'black', fontFamily: 'manrope', fontSize: '16px', border: '1px solid lightblue' }} className="edit-profile" onClick={handleEditProfile}>Edit Profile</Button>
                    </div>
                </div>
                <div className="total-label">
                    <div className="personal">
                        <h3 style={{ fontWeight: '600' }}>Personal</h3><br />
                        <form>
                            <div className="name-flex">
                                <div className="name-input">
                                    <label>
                                        First Name
                                        <input
                                            type="text"
                                            name="firstName"
                                            value={formData.firstName}
                                            onChange={handleChange}
                                            disabled={true}
                                        />
                                    </label>
                                </div>
                                <div className="name-input">
                                    <label style={{ marginLeft: '10px' }}>
                                        Last Name
                                        <input
                                            type="text"
                                            name="lastName"
                                            value={formData.lastName}
                                            onChange={handleChange}
                                            disabled={true}
                                        />
                                    </label>
                                </div>
                            </div>
                            <br />
                            <label>
                                Department
                                <input
                                    type="text"
                                    name="department"
                                    value={formData.designation}
                                    onChange={handleChange}
                                    disabled={true}
                                />
                            </label>
                            <br />
                            <div className="gender-date-flex">
                                <div className="gender-input">
                                    <label>
                                        Gender
                                        <input
                                            type="text"
                                            name="gender"
                                            value={formData.gender}
                                            onChange={handleChange}
                                            disabled={!isEditMode}
                                        />
                                    </label>
                                </div>
                                <div className="date-input">
                                    <label style={{ marginLeft: '10px' }}>
                                        Date of Birth
                                        <DatePicker
                                            selected={formData.dateOfBirth ? new Date(formData.dateOfBirth) : null}
                                            onChange={handleDateChange}
                                            dateFormat="MM/dd/yyyy"
                                            // showYearDropdown
                                            // scrollableYearDropdown
                                            // yearDropdownItemNumber={100}
                                            placeholderText="Select Date"
                                            disabled={!isEditMode}
                                        />
                                    </label>
                                </div>
                            </div>
                            <br />
                            <label>
                                Education Level
                                <input
                                    type="text"
                                    name="educationLevel"
                                    value={formData.educationLevel}
                                    onChange={handleChange}
                                    disabled={!isEditMode}
                                />
                            </label>
                        </form>
                        <br />
                    </div>
                    <div className="contact-details">
                        <h3 style={{ fontWeight: '600' }}>Contact Details</h3>
                        <form>
                            <label>
                                Email
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    disabled={!isEditMode}
                                />
                            </label>
                            <br />
                            <label>
                                Phone Number
                                <input
                                    type="tel"
                                    name="phoneNumber"
                                    value={formData.phoneNumber}
                                    onChange={handleChange}
                                    disabled={!isEditMode}
                                />
                            </label>
                            <br />
                            <label>
                                Location
                                <input
                                    type="text"
                                    name="location"
                                    value={formData.location}
                                    onChange={handleChange}
                                    disabled={!isEditMode}
                                />
                            </label>
                            <br />
                            <label>
                                Address
                                <input
                                    type="text"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    disabled={!isEditMode}
                                />
                            </label>
                        </form>
                        <br />
                    </div>
                </div>
                <div className="buttons">
                    <button
                        className={`save-changes-btn ${isEditMode ? 'show' : 'hide'}`}
                        onClick={handleSaveChanges} style={{ backgroundColor: '#7BCCED', border: '1px solid grey', fontSize: '16px' }}
                    >
                        Save Changes
                    </button>
                    <span
                        className={`change-password-btn ${isEditMode ? 'show' : 'hide'}`}
                        onClick={handleChangePassword} style={{ paddingLeft: '20px', fontSize: '16px', cursor: 'pointer' }}
                    >
                        Change Password
                    </span>
                </div>
            </div>
            <form>
                <Dialog open={isChangePasswordOpen} onClose={handleCloseChangePassword}>
                    <DialogTitle>Change Password</DialogTitle>
                    <DialogContent>
                        <form>
                            <div>
                                <label>
                                    Current Password
                                    <input
                                        type="password"
                                        name="currentPassword"
                                        value={changePasswordData.currentPassword}
                                        onChange={handlePasswordChange}
                                    />
                                </label>
                            </div>
                            <div>
                                <label>
                                    New Password
                                    <input
                                        type="password"
                                        name="newPassword"
                                        value={changePasswordData.newPassword}
                                        onChange={handlePasswordChange}
                                    />
                                </label>
                            </div>
                            <div>
                                <label>
                                    Confirm New Password
                                    <input
                                        type="password"
                                        name="confirmNewPassword"
                                        value={changePasswordData.confirmNewPassword}
                                        onChange={handlePasswordChange}
                                    />
                                </label>
                            </div>
                        </form>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseChangePassword}>Cancel</Button>
                        <Button onClick={handleSavePassword} autoFocus>
                            Save
                        </Button>
                    </DialogActions>
                </Dialog>
            </form>
            {isPasswordChanged && (
                <Stack>
                    <Alert severity="success" sx={{ marginLeft: '850px', width: '15%' }}>
                        <AlertTitle></AlertTitle>
                        Password changed successfully
                    </Alert>
                </Stack>
            )}
        </>
    );
};

export default Settings;
