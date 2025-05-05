import React, { useState } from "react";
import Button from "../Components/ui/Button";

const StaffManagement = () => {
  const [staffMembers, setStaffMembers] = useState([
    { id: 1, name: "Admin User", email: "admin@example.com", role: "Administrator", status: "Active" },
    { id: 2, name: "John Doe", email: "john@example.com", role: "Manager", status: "Active" },
    { id: 3, name: "Jane Smith", email: "jane@example.com", role: "Support", status: "Inactive" },
  ]);

  const [showNewStaffForm, setShowNewStaffForm] = useState(false);
  const [newStaff, setNewStaff] = useState({
    name: "",
    email: "",
    role: "Support",
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewStaff(prev => ({ ...prev, [name]: value }));
  };

  const handleAddStaff = (e) => {
    e.preventDefault();

    // Simple validation
    if (!newStaff.name || !newStaff.email || !newStaff.password) {
      toast({
        title: "Error",
        description: "Please fill all required fields",
        variant: "destructive",
      });
      return;
    }

    if (newStaff.password !== newStaff.confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive",
      });
      return;
    }

    // Add new staff member (in a real app, you would send this to a backend)
    const newStaffMember = {
      id: staffMembers.length + 1,
      name: newStaff.name,
      email: newStaff.email,
      role: newStaff.role,
      status: "Active",
    };

    setStaffMembers([...staffMembers, newStaffMember]);
    setShowNewStaffForm(false);
    setNewStaff({
      name: "",
      email: "",
      role: "Support",
      password: "",
      confirmPassword: "",
    });

    toast({
      title: "Success",
      description: "New staff member added successfully",
    });
  };

  const toggleStatus = (id) => {
    setStaffMembers(staffMembers.map(staff =>
      staff.id === id
        ? { ...staff, status: staff.status === "Active" ? "Inactive" : "Active" }
        : staff
    ));

    toast({
      title: "Status Updated",
      description: "Staff member status has been updated",
    });
  };

  return (
    <div className="staff-management-container">
      <div className="section-header">
        <h2>Staff Management</h2>
        <Button onClick={() => setShowNewStaffForm(!showNewStaffForm)}>
          {showNewStaffForm ? "Cancel" : "Add New Admin"}
        </Button>
      </div>

      {showNewStaffForm && (
        <div className="add-staff-form">
          <h3>Create New Admin Account</h3>
          <form onSubmit={handleAddStaff}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <Input
                  id="name"
                  name="name"
                  value={newStaff.name}
                  onChange={handleInputChange}
                  placeholder="Enter full name"
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={newStaff.email}
                  onChange={handleInputChange}
                  placeholder="Enter email address"
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="role">Role</label>
                <select
                  id="role"
                  name="role"
                  value={newStaff.role}
                  onChange={handleInputChange}
                  className="role-select"
                >
                  <option value="Administrator">Administrator</option>
                  <option value="Manager">Manager</option>
                  <option value="Support">Support</option>
                </select>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={newStaff.password}
                  onChange={handleInputChange}
                  placeholder="Enter password"
                />
              </div>
              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={newStaff.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="Confirm password"
                />
              </div>
            </div>
            <Button type="submit">Create Admin Account</Button>
          </form>
        </div>
      )}

      <div className="staff-list">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {staffMembers.map((staff) => (
              <tr key={staff.id}>
                <td>{staff.id}</td>
                <td>{staff.name}</td>
                <td>{staff.email}</td>
                <td>{staff.role}</td>
                <td>
                  <span className={`status-badge ${staff.status.toLowerCase()}`}>
                    {staff.status}
                  </span>
                </td>
                <td>
                  <div className="action-buttons">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => toggleStatus(staff.id)}
                    >
                      {staff.status === "Active" ? "Deactivate" : "Activate"}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                    >
                      Edit
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StaffManagement;
