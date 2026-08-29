import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar";
import Header from "../components/Header/Header";
import "./StudentLayout.css";

const StudentLayout = () => {
  return (
    <div className="student-layout">
      <aside className="student-layout__sidebar">
        <Sidebar isAdmin={false} />
      </aside>

      <div className="student-layout__content">
        <Header />
        <main className="student-layout__main">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default StudentLayout;
