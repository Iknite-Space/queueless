import React, { useEffect, useState} from "react";
import { Link, Routes, Route, useNavigate} from "react-router-dom";
import PropTypes from 'prop-types';

import "./Dashboard.css";

import { useFirebaseUser } from "../../hooks/useFirebaseUser";
import LoadingAnimation from "../../components/loadingAnimation/LoadingAnimation";
import { CreateServiceComponent } from "../../components/CreateServiceComponent/CreateServiceComponent";
import { OrganizationHeader } from "../../components/header/OrganizationHeader";
import { doSignOut } from '../../firebase/auth'
import { formatTime } from "../../utils/format_time";
import { handleFileUpload } from "../../utils/HandleUploadFile";


Sidebar.propTypes = {
  org_name: PropTypes.string.isRequired,
}


function Sidebar({ org_name }) {
  const navigate = useNavigate()
  return (
    <div className="sidebar">
      <h2 className="sidebar-title">{org_name}</h2>
      <nav className="sidebar-nav">
        <Link className="sidebar-link" to="/organization">Home</Link>
        <Link className="sidebar-link" to="/organization/service">Services</Link>
        <Link className="sidebar-link" to="/organization/bookings">Bookings</Link>
        <Link className="sidebar-link" to="/organization/profile">Profile</Link>
        <Link className="sidebar-link" onClick={() => {doSignOut().then(() => navigate('/login'))}} >Logout</Link>
      </nav>
    </div>
  );
}

Dashboard.propTypes = {
  org_name: PropTypes.string.isRequired,
  org_id: PropTypes.string.isRequired,
  showModal: PropTypes.bool.isRequired,
  handleCloseModal: PropTypes.func.isRequired,
  handleCreateService: PropTypes.func.isRequired,
  setShowModal: PropTypes.func.isRequired,
  bookings: PropTypes.func.isRequired,
  numberOfServices: PropTypes.func.isRequired,
}

function Dashboard({ org_name, org_id, showModal, handleCloseModal, handleCreateService, bookings, numberOfServices }) {

  const navigate = useNavigate()

  const handleViewBookings = () => {
    navigate("/organization/bookings")
  }

  return (
    <div className="dashboard">
      <h1 className="dashboard-title">
        {org_name === "" || org_name === undefined
          ? "Welcome, Update your profile to become visible to your clients"
          : `Welcome, ${org_name} admin`}
      </h1>

      <div className="kpi">
      <div className="dashboard-cards">
        <div className="dashboard-card">
          <div className="total-services">{numberOfServices}</div>
          <div>Total Services</div> 
          </div>
        <div className="dashboard-card">
          <div className="total-bookings">{bookings.length}</div>
          <div>Total Bookings</div>
          </div>
      </div>

      <div className="dashboard-actions">
        <div className="div">
        <button className="action-button" onClick={handleCreateService}>
          Add New Service
        </button>
        </div>
        <div className="div">
        <button className="action-button" onClick={handleViewBookings}>View All Bookings</button>
        </div>
      </div>
      </div>

      <div className="upcoming-bookings">
        <h2>Upcoming Bookings</h2>
        {bookings.map((booking) => {
          return(
          <div key={booking.booking_id} className="card-container">
        <h3 className="user-name">{booking.cus_name}</h3>
        <p className="service-name">{booking.service_name}</p>
        <p className="time">Today, {formatTime(booking.start_time.Microseconds)}</p>
        
      </div>
          )
        })}
        
      </div>

      {showModal && (
        <div className="modal-backdrop">
          <div className="modal-content">
            <CreateServiceComponent org_id={org_id} onClose={handleCloseModal} />
          </div>
        </div>
      )}
    </div>
  );
}

Services.propTypes = {
  org_id: PropTypes.string.isRequired,
  showModal: PropTypes.bool.isRequired,
  handleCloseModal: PropTypes.func.isRequired,
  handleCreateService: PropTypes.func.isRequired,
  setShowModal: PropTypes.func.isRequired,
  services: PropTypes.array.isRequired,
}

function Services({ org_id, services, showModal, handleCloseModal, handleCreateService }) {
  // const [isLoading, setIsLoading] = useState(true)
  

  return (
    <div className="services">
      <h2 className="section-title">Services</h2>
      <div className="services-actions">
        <button className="add-button" onClick={handleCreateService}>Add Service</button>
        {/* <input type="text" placeholder="Search services..." className="search" /> */}
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Duration (In minutes)</th>
            {/* <th>Actions</th> */}
          </tr>
        </thead>
        <tbody>
          {services.map((service) => {
            return(
              <tr key={service.service_id}>
            <td>{service.service_name}</td>
            <td>{service.service_description}</td>
            <td>{service.duration}</td>
            {/* <td><button className="edit-button">Edit</button> <button className="delete-button">Delete</button></td> */}
          </tr>
            )
          })}
          
        </tbody>
      </table>

      {showModal && (
        <div className="modal-backdrop">
          <div className="modal-content">
            <CreateServiceComponent org_id={org_id} onClose={handleCloseModal} />
          </div>
        </div>
      )}
    </div>
  );
}

Bookings.propTypes = {
  bookings: PropTypes.string.isRequired,
}

function Bookings( { bookings } ) {
  
  return (
    <div className="bookings">
      <h2 className="section-title">Bookings</h2>
      {/* <input type="text" placeholder="Filter by date/service..." className="search" /> */}
      <table className="table">
        <thead>
          <tr>
            <th>Client</th>
            <th>Day/Time</th>
            <th>Service</th>
            <th>Client Contact</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => {
            const startTime = formatTime(booking.start_time.Microseconds)
            return(
          <tr key={booking.booking_id}>
            <td>{booking.cus_name}</td>
            <td>{`${booking.booking_date}, ${startTime}`}</td>
            <td>{booking.service_name}</td>
            <td>{booking.phone_number}</td>
          </tr>)
          })}
        </tbody>
      </table>
    </div>
  );
}
Profile.propTypes = {
  org: PropTypes.object.isRequired,
}
function Profile({ org }) {
  const [formData, setFormData] = useState({
      name: org?.name,
      location: org?.location,
      start_time: "",
      end_time: "",
      email: org?.email
    });

  const [selectedImage, setSelectedImage] = useState()

    const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const imageUrl = await handleFileUpload(selectedImage)
    console.log(imageUrl)

    const requestBody = {
      ...formData,
      image_url: imageUrl
    }

    try {
      const res = await fetch(
        "http://localhost:8085/api/v1/organization/update/profile",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        }
      );

      if (res.ok) {
        alert("organization info updated successfully!");
        console.log(JSON.stringify(requestBody))
        
      } else {
        alert("Failed to update organization information.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="profile">
      <h2 className="section-title">Update Profile</h2>
      <form className="profile-form" onSubmit={handleSubmit}>
        <label className="form-label">Organization Name</label>
        <input name="name" className="form-input" type="text" onChange={handleChange} value={formData.name} required/>

        <label className="form-label">Start time</label>
        <input name="start_time" className="form-input" type="text" placeholder="e.g. 08:00:00" onChange={handleChange} value={formData.start_time} required/>

        <label className="form-label">End time</label>
        <input name="end_time" className="form-input"  placeholder="e.g. 17:00:00" onChange={handleChange} value={formData.end_time} required/>

        <label className="form-label">Location</label>
        <input name="location" className="form-input" type="text" onChange={handleChange} value={formData.location}  />

        <label className="form-label">Organization Email</label>
        <input name="email" className="form-input std-email" type="email" value={formData.email} readOnly/>

        <label className="form-label">Upload Logo</label>
        <input name="logo" className="form-input" type="file" onChange={(event) => {
          setSelectedImage(event.target.files[0])
        }} />

        <button type="submit" className="update-profile-button">Save Changes</button>
      </form>
    </div>
  );
}

export default function OrganizationDashboard() {

  const [showModal, setShowModal] = useState(false);

  const handleCreateService = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const {user, idToken, loading } = useFirebaseUser();
  const [userData, setUserData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [bookings, setBookings] = useState([])
  const [services, setServices] = useState([])

  //fetch organization data
  useEffect(() => {
  if (!user || !idToken) return;

  const fetchData = async () => {
    try {
      const res = await fetch("https://api.queueless.xyz/api/v1/organization/data", {
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      setUserData(data.organizationData);
      console.log(data.organizationData)
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally{
      setIsLoading(false)
    }
  };

  fetchData();
}, [user, idToken]);

useEffect(() => {
    // if (!userData?.org_id) return;  
  const fetchData = async () => {
    try {
      const res = await fetch("https://api.queueless.xyz/api/v1/organization/bookings");

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      setBookings(data.bookings);
      console.log(data.bookings)
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally{
      // setIsLoading(false)
    }
  };

  fetchData();
}, [userData?.organization_id]);

  useEffect(() => {
  const fetchData = async () => {
    try {
      const res = await fetch(`https://api.queueless.xyz/api/v1/organizations/${userData?.organization_id}/services`);

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      setServices(data.services);
      console.log(data.services)
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally{
      // setIsLoading(false)
    }
  };

  fetchData();
}, [userData?.organization_id]);

  if (loading) return <LoadingAnimation />;

  if (!user) {
    return <p>You are not logged in.</p>; // Or redirect to login
  }

  if (isLoading) {
    return <LoadingAnimation />
  }


  return (
    <div className="content">
      <div className=""> <OrganizationHeader orgName={userData?.name} /> </div>
    <div className="container">
      
      <Sidebar org_name={userData?.name} />
      <div className="main">
        <Routes>
          <Route path="/" element={<Dashboard bookings={bookings} numberOfServices={services?.length} org_name={userData?.name} org_id={userData?.organization_id} showModal={showModal} setShowModal={setShowModal} handleCreateService={handleCreateService} handleCloseModal={handleCloseModal} />} />
          <Route path="service" element={<Services services={services} org_id={userData?.organization_id} showModal={showModal} setShowModal={setShowModal} handleCreateService={handleCreateService} handleCloseModal={handleCloseModal} />} />
          <Route path="bookings" element={<Bookings bookings={bookings} />} />
          <Route path="profile" element={<Profile org={userData} />} />
        </Routes>
      </div>
      </div>
    </div>
  );
}
