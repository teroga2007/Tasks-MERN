import { Routes, Route } from 'react-router-dom';

import NavbarComponent from "./components/Navbar";
import FooterComponent from "./components/Footer";
import TasksTable from "./components/TasksTable";
import NewTask from './pages/NewTask';
import { Toaster } from 'react-hot-toast';
import TaskDetail from './pages/TaskDetail';

export default function App() {
  return <div className="flex flex-wrap gap-2 bg-gray-900">
    <NavbarComponent />
    <div className='min-h-screen w-full flex justify-center p-4'>
      <Routes>
        <Route path="/" element={<TasksTable />} />
        <Route path="/new-task" element={<NewTask />} />
        <Route path="/tasks/:id" element={<TaskDetail />} />
      </Routes>
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          duration: 3000,
          style: {
            background: "#333",
            color: "#fff",
          },
        }}
      />
    </div>
    <FooterComponent />
  </div>
}
