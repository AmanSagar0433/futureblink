import { Tabs, TabsList, TabsTrigger } from "../components/shadcn/Tabs";
import { Outlet, useNavigate } from 'react-router-dom';
import { ENDPOINTS } from "../config/constant";
import { Button } from "./shadcn/Button"
import useLogin from "../hooks/useLogin";

const NavBar = () => {
  const navigate = useNavigate();
  const { logout } = useLogin()

  const handleLogout = () => {
    logout()
  }

  return (
    <div className="size-full absolute">
      <div className="size-full p-5">
        <div className="size-full">
          <div className="flex size-full flex-col">
            <div className="w-full flex flex-row justify-between">
              <p className="text-muted-foreground font-bold text-2xl">Future Blink</p>
              <Button onClick={handleLogout}>Logout</Button>
            </div>
            <br />
            <Tabs defaultValue="sequence" className="w-full flex-1 min-h-0">
              <div className="size-full flex flex-col">
                <TabsList className="grid grid-cols-2 w-80 mb-3">
                  <TabsTrigger value="sequence" onClick={() => navigate(ENDPOINTS.TAB_SEQUENCE)}>
                    Sequence
                  </TabsTrigger>
                  <TabsTrigger value="list" onClick={() => navigate(ENDPOINTS.TAB_LIST)}>
                    List
                  </TabsTrigger>
                </TabsList>
                <Outlet />
              </div>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
