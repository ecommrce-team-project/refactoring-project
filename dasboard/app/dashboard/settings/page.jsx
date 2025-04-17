'use client';

import { useState } from 'react';

export default function Settings() {
  const [userSettings, setUserSettings] = useState({
    name: 'Admin User',
    email: 'admin@example.com',
    password: '',
  });

  const [notificationSettings, setNotificationSettings] = useState({
    email: true,
    push: true,
    orderUpdates: true,
  });

  const handleSettingChange = (e) => {
    const { name, value } = e.target;
    setUserSettings((prev) => ({ ...prev, [name]: value }));
  };

  const toggleNotificationSetting = (setting) => {
    setNotificationSettings((prev) => ({ ...prev, [setting]: !prev[setting] }));
  };

  const handleSaveSettings = async () => {
    try {
      alert('Settings updated successfully!');
    } catch (error) {
      console.error('Error updating settings:', error);
      alert('Failed to update settings. Please try again.');
    }
  };

  return (
    <div className="section-content">
      <h1 className="dashboard-title">Settings</h1>
      <div className="section-card">
        <div className="section-header">
          <h5>User Settings</h5>
        </div>
        <div className="section-body">
          <form className="form-grid">
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                name="name"
                value={userSettings.name}
                onChange={handleSettingChange}
                placeholder="Enter your name"
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={userSettings.email}
                onChange={handleSettingChange}
                placeholder="Enter your email"
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={userSettings.password}
                onChange={handleSettingChange}
                placeholder="Enter new password"
              />
            </div>
            <div className="form-actions">
              <button type="button" className="btn-submit" onClick={handleSaveSettings}>
                Save Settings
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="section-card">
        <div className="section-header">
          <h5>Notification Settings</h5>
        </div>
        <div className="section-body">
          <div className="notification-settings">
            <label>
              <input
                type="checkbox"
                checked={notificationSettings.email}
                onChange={() => toggleNotificationSetting('email')}
              />
              Email Notifications
            </label>
            <label>
              <input
                type="checkbox"
                checked={notificationSettings.push}
                onChange={() => toggleNotificationSetting('push')}
              />
              Push Notifications
            </label>
            <label>
              <input
                type="checkbox"
                checked={notificationSettings.orderUpdates}
                onChange={() => toggleNotificationSetting('orderUpdates')}
              />
              Order Updates
            </label>
          </div>
          <div className="form-actions">
            <button type="button" className="btn-submit" onClick={handleSaveSettings}>
              Save Notification Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}