import React, { useEffect, useState} from "react";
import { Link, Routes, Route, useNavigate} from "react-router-dom";
import PropTypes from 'prop-types';

import "./Dashboard.css";

import { useFirebaseUser } from "../../hooks/useFirebaseUser";
import LoadingAnimation from "../../components/loadingAnimation/LoadingAnimation";
import { CreateServiceComponent } from "../../components/CreateServiceComponent/CreateServiceComponent";
import { OrganizationHeader } from "../../components/header/OrganizationHeader";
import { doSignOut } from '../../firebase/auth'


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
}

function Dashboard({ org_name, org_id }) {
  const [showModal, setShowModal] = useState(false);

  const handleCreateService = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="dashboard">
      <h1 className="dashboard-title">
        {org_name === "" || org_name === undefined
          ? "Welcome, Update your profile to become visible to your clients"
          : `Welcome, ${org_name} admin`}
      </h1>

      <div className="cards">
        <div className="card">Total Services: 5</div>
        <div className="card">Todays Bookings: 3</div>
        <div className="card">Pending Requests: 2</div>
      </div>

      <div className="actions">
        <button className="action-button" onClick={handleCreateService}>
          Add New Service
        </button>
        <button className="action-button">View All Bookings</button>
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
  // org_name: PropTypes.string.isRequired,
  org_id: PropTypes.string.isRequired,
}

function Services({ org_id }) {
  // const [isLoading, setIsLoading] = useState(true)
  const [services, setServices] = useState(null)

  useEffect(() => {
  const fetchData = async () => {
    try {
      const res = await fetch(`https://api.queueless.xyz/api/v1/organizations/${org_id}/services`, {
        // headers: {
        //   Authorization: `Bearer ${idToken}`,
        // },
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      setServices(data.services[0]);
      console.log(data.services[0])
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally{
      // setIsLoading(false)
    }
  };

  fetchData();
}, [org_id]);

  return (
    <div className="services">
      <h2 className="section-title">Services</h2>
      <div className="services-actions">
        <button className="add-button">Add Service</button>
        <input type="text" placeholder="Search services..." className="search" />
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Duration (In minutes)</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{services?.service_name}</td>
            <td>{services?.service_description}</td>
            <td>{services?.duration}</td>
            <td><button className="edit-button">Edit</button> <button className="delete-button">Delete</button></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

function Bookings() {
  return (
    <div className="bookings">
      <h2 className="section-title">Bookings</h2>
      <input type="text" placeholder="Filter by date/service..." className="search" />
      <table className="table">
        <thead>
          <tr>
            <th>Client</th>
            <th>Time</th>
            <th>Service</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Jane Doe</td>
            <td>10:00 AM</td>
            <td>Consulting</td>
            <td>Confirmed</td>
          </tr>
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

    const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // const requestBody = {
    //   service_name: formData.service_name,
    //   service_description: formData.service_description,
    //   duration: duration,
    
    // };

    try {
      const res = await fetch(
        "https://api.queueless.xyz/api/v1/organization/update/profile",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (res.ok) {
        alert("organization info updated successfully!");
        
      } else {
        alert("Failed to update organization information.");
        console.log(JSON.stringify(formData))
      }
    } catch (error) {
      console.error("Error:", error);
      console.log(JSON.stringify(formData))
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
        <input name="end_time" className="form-input" type="text" placeholder="e.g. 17:00:00" onChange={handleChange} value={formData.end_time} required/>

        <label className="form-label">Location</label>
        <input name="location" className="form-input" type="text" onChange={handleChange} value={formData.location}  />

        <label className="form-label">Organization Email</label>
        <input name="email" className="form-input std-email" type="email" value={formData.email} readOnly/>

        {/* <label className="form-label">Upload Logo</label>
        <input className="form-input" type="file" /> */}

        <button type="submit" className="submit-button">Save Changes</button>
      </form>
    </div>
  );
}

export default function OrganizationDashboard() {

  const {user, idToken, loading } = useFirebaseUser();
  const [userData, setUserData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

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
          <Route path="/" element={<Dashboard org_name={userData?.name} org_id={userData?.organization_id} />} />
          <Route path="service" element={<Services org_id={userData?.organization_id} />} />
          <Route path="bookings" element={<Bookings />} />
          <Route path="profile" element={<Profile org={userData} />} />
        </Routes>
      </div>
      </div>
    </div>
  );
}
