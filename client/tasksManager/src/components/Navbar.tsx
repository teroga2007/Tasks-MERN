
import { Button, Navbar } from "flowbite-react";
import { Link } from "react-router-dom";

export default function NavbarComponent() {
  return (
    <Navbar fluid className="w-full max-h-fit bg-gray-800">
      <Link to={"/"} className="flex gap-4">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#fff" className="bi bi-code-square" viewBox="0 0 16 16">
          <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
          <path d="M6.854 4.646a.5.5 0 0 1 0 .708L4.207 8l2.647 2.646a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 0 1 .708 0m2.292 0a.5.5 0 0 0 0 .708L11.793 8l-2.647 2.646a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708 0" />
        </svg>
        <span className="self-center whitespace-nowrap text-xl font-semibold text-white">Tasks Manager - MERN Stack</span>
      </Link>

      <div className="flex md:order-2">
        <Button> <Link to="/new-task">Create task</Link> </Button>
      </div>
    </Navbar>
  );
}
