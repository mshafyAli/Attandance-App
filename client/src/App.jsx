import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login  from './Pages/Login';
import Header from './Components/Header';
import Students from './Pages/Students';
import AddStudents from './Pages/AddStudents';


function App() {
  

  return (
    <BrowserRouter>
      {/* Header */}
      <Header  />

      <Routes>
        {/* <Route path="/" element={<Hom />} /> */}
        <Route path="/signin" element={<Login />} />
        <Route path="/students" element={<Students />} />
        <Route path="/addstudents" element={<AddStudents />} />
        {/* <Route path="/about" element={<About />} /> */}
        {/* <Route path="/forgetpassword" element={<ForgetPassword />} />
        <Route path="/signup" element={<Signup />} /> */}
        {/* <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
        </Route> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App
