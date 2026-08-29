import React, { useState } from "react";
import WelcomeCard from "../Dashboard/WelcomeCard/WelcomeCard";
import AdminHeader from "../../components/AdminHeader/AdminHeader";
import useAdminStats from "../../hooks/useAdminStats";
import StatsCards from "./DashboardWidgets/StatsCards/StatsCards";
import QuickActions from "./DashboardWidgets/QuickActions/QuickActions";
import AnalyticsChart from "./DashboardWidgets/AnalyticsChart/AnalyticsChart";
import RecentEnrollments from "./DashboardWidgets/RecentEnrollments/RecentEnrollments";
import AdminActivity from "./DashboardWidgets/AdminActivity/AdminActivity";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const { students, courses, videos, enrollments, recentEnrollments, error } = useAdminStats();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredEnrollments = recentEnrollments.filter((item) => {
    const search = searchTerm.toLowerCase();

    return (
      item.users?.full_name?.toLowerCase().includes(search) ||
      item.courses?.title?.toLowerCase().includes(search) ||
      item.status?.toLowerCase().includes(search)
    );
  });

  return (
    <div className="admin-dashboard">
      <AdminHeader
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        placeholder="Search students or courses..."
      />

      <section className="admin-dashboard-section">
        <WelcomeCard isAdmin={true} />
      </section>

      {error && (
        <div className="admin-dashboard-error-banner">
          Couldn't load some dashboard data. Please refresh or try again shortly.
        </div>
      )}

      <section className="admin-dashboard-section">
        <StatsCards students={students} courses={courses} videos={videos} enrollments={enrollments} />
      </section>

      <section className="admin-dashboard-section">
        <QuickActions />
      </section>

      <div className="admin-dashboard-split-grid">
        <AnalyticsChart students={students} courses={courses} videos={videos} enrollments={enrollments} />
        <AdminActivity />
      </div>

      <section className="admin-dashboard-section">
        <RecentEnrollments enrollments={filteredEnrollments} />
      </section>
    </div>
  );
};

export default AdminDashboard;
