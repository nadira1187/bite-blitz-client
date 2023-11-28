import  { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../../../provider/AuthProvider';
import { Link } from 'react-router-dom';

const MyProfile = () => {
  const [users, setUsers] = useState(null);
  const {user}=useContext(AuthContext)
  const verified = location.state?.verified || false;

  useEffect(() => {
    // Assuming authState contains the user's email
    const userEmail = user?.email;

    // Fetch user data based on the authenticated user's email
    axios.get(`http://localhost:5000/user/${userEmail}`)
      .then(response => {
        setUsers(response.data.user);
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });
  }, []);

    return (
        <div>
      <div >
      {users && (
        <div className="card  lg:card-side bg-base-100 shadow-xl p-4 m-3" >
          <figure> <img src={users.photo} alt="User" /></figure>   
          <div className='card-body text-blue-900'>
          <h2 className="card-title">Users Name: {users.name}</h2>
          <p className='text-xl font-medium'>Users Email: {users.email}</p>
          </div>
          {/* Add your logic based on the actual subscription status */}
          {verified ? (
            <p>Status:Verified</p>
          ) : (
            <div className='card-actions justify-end p-4'>
                 <button className='btn btn-primary bg-blue-900 text-white normal-case' >
             <Link to='/dashboard/payment'>$10 </Link> 
            </button>
            </div>
           
          )}
        </div>
      )}
    </div>
        </div>
    );
};

export default MyProfile;