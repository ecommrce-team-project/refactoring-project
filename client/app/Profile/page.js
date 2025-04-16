'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from '../Context/AuthContext';
import axios from 'axios';
import styles from './Profile.module.css';
import { useRouter } from 'next/navigation';

const CLOUDINARY_UPLOAD_PRESET = 'DARNAAA';
const CLOUDINARY_CLOUD_NAME = 'dc3rbhdae';

export default function ProfilePage() {
  const router = useRouter();
  const { user, setUser, fetchUser } = useAuth();
  const [loading, setLoading] = useState(false); // Add loading state
  const [formData, setFormData] = useState({
    username: user?.username || '',
    email: user?.email || '',
    role: user?.role || 'customer',
    pfp: user?.pfp || null,
  });
  const [error, setError] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  useEffect(() => {
    fetchUser(); // Fetch fresh user data when component mounts
  }, []);

  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username || '',
        email: user.email || '',
        role: user.role || 'customer',
        pfp: user.pfp || user.profilePicture,
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        // 5MB limit
        setError('File size too large. Please choose an image under 5MB.');
        return;
      }
      setFormData({ ...formData, pfp: file });
      setError(null);
    }
  };

  const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
          onUploadProgress: (progressEvent) => {
            const progress = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setUploadProgress(progress);
          },
        }
      );
      return response.data.secure_url;
    } catch (error) {
      console.error('Error uploading to Cloudinary:', error);
      throw new Error('Failed to upload image');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let profilePicture = user.pfp;

      if (formData.pfp instanceof File) {
        profilePicture = await uploadToCloudinary(formData.pfp);
      }

      const updatedData = {
        username: formData.username,
        email: formData.email,
        role: formData.role,
        pfp: profilePicture,
      };

      const response = await axios.put(
        `http://localhost:3000/api/users/${user.id}`,
        updatedData,
        {
          withCredentials: true
        }
      );

      await fetchUser(); // Fetch fresh user data after update
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Error updating profile');
    }
  };

  if (loading) {
    return (
      <div className={styles.centerContainer}>
        <div className={styles.loadingMessage}>Loading...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className={styles.centerContainer}>
        <div className={styles.errorCard}>
          <h2>Access Denied</h2>
          <p>Please login to view your profile</p>
          <button 
            onClick={() => router.push('/')}
            className={styles.backButton}
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`${styles.profilePage} bg-light min-vh-100`}>
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            <div className={`${styles.card} shadow-lg border-0`}>
              <div className="card-body p-5">
                <div className="text-center mb-4">
                  {user?.profilePicture || user?.pfp ? (
                    <img
                      src={user?.profilePicture || user?.pfp}
                      alt="Profile"
                      className={styles.profilePicture}
                    />
                  ) : (
                    <div className={styles.profilePicturePlaceholder}>
                      {user?.username?.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <h2 className={`fw-bold ${styles.textDark}`}>Update Profile</h2>
                </div>

                {error && (
                  <div className={`${styles.error} alert alert-danger`} role="alert">
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit} className={styles.form}>
                  <div className="mb-4">
                    <label
                      htmlFor="username"
                      className={`${styles.formLabel} fw-semibold ${styles.textDark}`}
                    >
                      Username
                    </label>
                    <input
                      type="text"
                      id="username"
                      name="username"
                      className={`${styles.formControl} form-control form-control-lg`}
                      value={formData.username}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="email"
                      className={`${styles.formLabel} fw-semibold ${styles.textDark}`}
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className={`${styles.formControl} form-control form-control-lg`}
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {user?.role === 'admin' && (
                    <div className="mb-4">
                      <label
                        htmlFor="role"
                        className={`${styles.formLabel} fw-semibold ${styles.textDark}`}
                      >
                        Role
                      </label>
                      <select
                        id="role"
                        name="role"
                        className={`${styles.formSelect} form-select form-select-lg`}
                        value={formData.role}
                        onChange={handleChange}
                      >
                        <option value="customer">Customer</option>
                        <option value="admin">Admin</option>
                      </select>
                    </div>
                  )}

                  <div className="mb-4">
                    <label
                      htmlFor="pfp"
                      className={`${styles.formLabel} fw-semibold ${styles.textDark}`}
                    >
                      Profile Picture
                    </label>
                    <input
                      type="file"
                      id="pfp"
                      name="pfp"
                      className={`${styles.formControl} form-control form-control-lg`}
                      onChange={handleFileChange}
                      accept="image/*"
                    />
                    <small className={`${styles.textMuted} d-block mt-1`}>
                      Maximum file size: 5MB. Recommended size: 200x200 pixels
                    </small>
                  </div>

                  {uploadProgress > 0 && uploadProgress < 100 && (
                    <div className="mb-4">
                      <div className="progress">
                        <div
                          className="progress-bar bg-warning"
                          role="progressbar"
                          style={{ width: `${uploadProgress}%` }}
                          aria-valuenow={uploadProgress}
                          aria-valuemin="0"
                          aria-valuemax="100"
                        >
                          {uploadProgress}%
                        </div>
                      </div>
                    </div>
                  )}

                  <button
                    type="submit"
                    className={`${styles.btnWarning} btn btn-warning btn-lg w-100 fw-bold ${styles.textDark}`}
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span
                          className="spinner-border spinner-border-sm me-2"
                          role="status"
                          aria-hidden="true"
                        ></span>
                        {uploadProgress > 0 ? 'Uploading...' : 'Updating...'}
                      </>
                    ) : (
                      'Update Profile'
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}