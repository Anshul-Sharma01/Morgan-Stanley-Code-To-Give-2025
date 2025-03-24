import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "../components/layout/Layout";
import Dashboard from "../pages/Dashboard";
import Students from "../pages/Students";
import Teachers from "../pages/Teachers";
import StudentRegister from "../pages/StudentRegister";
import StudentLogin from "../pages/StudentLogin";
import AddTeacherForm from "../components/form/AddTeacherForm";
import AddStudentForm from "../components/form/AddStudentForm";
import Team from "../pages/Team";
import EmployeeDashboard from "../pages/EmployeeDashboard";
import AddEducatorForm from "../components/form/AddEducatorForm";
import EditStudent from "../components/student/EditStudent";
import StudentProfile from "../components/student/StudentProfile";
import AdminLogin from "../pages/AdminLogin";
import EmployeeRegister from "../pages/EmplooyeeRegister";
import EmployeeLogin from "../pages/EmployeeLogin";
import LandingPage from "../pages/LandingPage"
import EmployeeProfile from "../pages/EmployeeProfile"
import AdminProfile from "../pages/AdminProfile"

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/student/register" element={<StudentRegister/>}/>
        <Route path="/student/login" element={<StudentLogin/>}/>
          
        <Route path="/landing" element={<LandingPage/>}/> 
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="students" element={<Students />} />
          <Route path="/students/add" element={<AddStudentForm />} />
          {/* <Route path="/students/edit" element={<EditStudent />} /> */}
          <Route path="students/:studentId" element={<StudentProfile />} />
          <Route path="students/:studentId/edit" element={<StudentProfile />} />

          <Route path="teachers" element={<Teachers />} />
          <Route path="/teachers/add" element={<AddEducatorForm />} />
          {/* <Route path="/teachers/add" element={<AddTeacherForm />} /> */}
          <Route path="/aboutTeam" element={<Team />} />
          <Route path="/login/admin" element={<AdminLogin />} />
          <Route path="/register/employee" element={<EmployeeRegister />} />
          <Route path="/login/employee" element={<EmployeeLogin />} />
          <Route path="/employee/dashboard" element={<EmployeeDashboard />} />
          <Route path="/employee/profile" element={<EmployeeProfile />} />
          <Route path="/admin/profile" element={<AdminProfile />} />
        </Route>
      </Routes>
    </Router>
    
  );
}

export default App;