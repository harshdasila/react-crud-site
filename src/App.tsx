import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import ListUsers from "./pages/ListUsers";
import PrivateRoutes from "./utils/PrivateRoute";
import UserData from "./pages/UserData";
import { EditUser } from "./pages/EditUser";
import { Toaster } from "sonner";
import { AddUser } from "./pages/AddUser";
import EmailTemplates from "./pages/EmailTemplates";
import { EditEmailTemplate } from "./pages/EditEmailTemplate";
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from "recoil";

function App() {
  return (
    <>
      <RecoilRoot>
        <BrowserRouter>
          <Toaster richColors position="top-right" />
          <Routes>
            <Route path="/" element={<Navigate to={"/signin"} />}></Route>
            <Route path="/signin" element={<Signin />}></Route>
            <Route path="/signup" element={<Signup />}>
              {" "}
            </Route>
            <Route element={<PrivateRoutes />}>
              <Route path="/list-user" element={<ListUsers />}>
                {" "}
              </Route>
              <Route path="/user-details/:id" element={<UserData />}></Route>
              <Route path="/edit/:id" element={<EditUser />}></Route>
              <Route path="/add-user" element={<AddUser />}></Route>
              <Route
                path="/email-templates"
                element={<EmailTemplates />}
              ></Route>
              <Route
                path="/email-templates/edit"
                element={<EditEmailTemplate />}
              ></Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </RecoilRoot>
    </>
  );
}

export default App;
