import React, { use, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthProvider';
import Navbar from './Navbar';

const MOCK_USER = {
    displayName: "User",
    email: "guest@example.com",
    photoURL: "https://placehold.co/100x100/A8A29E/ffffff?text=G",
    uid: "guest-12345"
};


const mockUpdateProfile = (user, updates) => {
    return new Promise((resolve) => {
        console.log("Mock updateProfile called with:", updates);
        setTimeout(resolve, 500); 
    });
};


const Profile = () => {
    const {user} = use(AuthContext);

    const [userr, setUserr] = useState(MOCK_USER); 

    const loading = false; 

    const [isEditing, setIsEditing] = useState(false);
    const [nameInput, setNameInput] = useState('');
    const [imageInput, setImageInput] = useState('');
    const [updateMessage, setUpdateMessage] = useState({ type: '', text: '' }); 

    useEffect(() => {
        if (user) {
            setNameInput(user.displayName || '');
            setImageInput(user.photoURL || '');
        }
    }, [user]); 

    if (loading) {
        return <div className="flex justify-center items-center h-screen"><span className="loading loading-spinner loading-xl text-orange-400"></span></div>;
    }
    
    if (!user) {
        return (
            <div className="max-w-md mx-auto my-20 p-8 bg-red-100 border-l-4 border-red-500 text-red-700 rounded-lg shadow-lg">
                <p className="text-xl font-semibold">Please Log In to See Your Profile</p>
            </div>
        );
    }

    const handleProfileUpdate = async (e) => {
        e.preventDefault();
        setUpdateMessage({ type: '', text: '' }); 
        
        const newName = nameInput.trim();
        const newPhoto = imageInput.trim();
        
        if (!newName) {
            setUpdateMessage({ type: 'error', text: 'The name field cannot be left empty.' });
            return;
        }

        try {
            
            await mockUpdateProfile(user, {
                displayName: newName,
                photoURL: newPhoto
            });

           
            setUserr(prevUser => ({
                ...prevUser,
                displayName: newName,
                photoURL: newPhoto
            }));

            setUpdateMessage({ type: 'success', text: 'Your Profile Update Successfully' });
            setIsEditing(false); 
            
        } catch (error) {
           
            setUpdateMessage({ type: 'error', text: `Update Failed: ${error.message}` });
        }
    };
  
    const handleCancel = () => {
       
        setNameInput(user.displayName || '');
        setImageInput(user.photoURL || '');
        setUpdateMessage({ type: '', text: '' });
        setIsEditing(false);
    }


    return (
        <div>
            
            <div>
                <Navbar></Navbar>
            </div>
            
            <div className='w-full max-w-lg mx-auto mt-10 p-8 bg-white border rounded-2xl shadow-2xl space-y-5'>
                <h1 className='text-3xl text-center font-bold text-gray-800 mb-6'>My Profile</h1>
                
               
                {updateMessage.text && (
                    <div className={`p-3 rounded-lg text-sm font-medium ${
                        updateMessage.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>
                        {updateMessage.text}
                    </div>
                )}

                <div className="flex flex-col items-center space-y-4">
                    <img 
                        className='w-24 h-24 rounded-full object-cover border-4 border-orange-400 shadow-lg' 
                        src={user.photoURL || 'https://placehold.co/100x100/A8A29E/ffffff?text=User'} 
                        alt="Profile" 
                        onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/100x100/A8A29E/ffffff?text=U"; }}
                    />
                    <p className='text-xl font-semibold text-gray-900'>{user.displayName || 'No name here'}</p>
                    <p className='text-gray-600'>Email: {user.email}</p>
                    <p>Last Login: </p>
                </div>

                {!isEditing ? (
                    
                    <div className="pt-4">
                        <button 
                            className='btn w-full bg-orange-500 text-white py-3 rounded-lg font-bold hover:bg-orange-600 transition duration-300' 
                            onClick={() => {
                                setIsEditing(true);
                                setUpdateMessage({ type: '', text: '' });
                            }}
                        >
                            Update Profile
                        </button>
                    </div>
                ) : (
                    
                    <form onSubmit={handleProfileUpdate} className="update-form space-y-4 p-4 border rounded-lg bg-gray-50">
                        <h3 className='text-lg font-bold text-gray-700'>Change Your Information</h3>
                        
                      
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Name:</label>
                            <input
                                type="text"
                                value={nameInput}
                                onChange={(e) => setNameInput(e.target.value)}
                                placeholder="New name"
                                className="w-full p-2 border rounded-md focus:ring-orange-400 focus:border-orange-400"
                            />
                        </div>
                        
                     
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Photo URL:</label>
                            <input
                                type="url"
                                value={imageInput}
                                onChange={(e) => setImageInput(e.target.value)}
                                placeholder="Image URL"
                                className="w-full p-2 border rounded-md focus:ring-orange-400 focus:border-orange-400"
                            />
                        </div>

                        <div className='flex justify-end space-x-3 pt-2'>
                            {/* ******* */}
                            <button 
                                type="submit" 
                                className='px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 font-semibold'
                            >
                                Save
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};

export default Profile;