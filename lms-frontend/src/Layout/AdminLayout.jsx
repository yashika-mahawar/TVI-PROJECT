import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar";
import "./AdminLayout.css";

const AdminLayout = () => {
  return (
    <div className="admin-layout">
      <aside className="admin-layout__sidebar">
        <Sidebar isAdmin={true} />
      </aside>

      <main className="admin-layout__main">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
