import { BrowserRouter, Route, Routes } from "react-router-dom";
import EditSequencePage from "./page/EditSequencePage";
import SignupPage from "./page/SignupPage";
import LoginPage from "./page/LoginPage";
import NavBar from "./components/NavBar";
import ListPage from "./page/ListPage";
import EditListPage from "./page/EditListPage";
import { ENDPOINTS } from "./config/constant";
import LinearProgressIndicator from "./components/LinearProgressIndicator";
import { AuthRoute, ProtectedRoute } from "./components/Route";
import SequencePage from "./page/SequencePage";
import { DateTimePickerForm } from "./components/shadcn/DateTimePickerForm";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path={ENDPOINTS.LOGIN} element={<AuthRoute />}>
            <Route index element={<LoginPage />} />
          </Route>
          <Route path={ENDPOINTS.SIGNUP} element={<AuthRoute />}>
            <Route index element={<SignupPage />} />
          </Route>

          <Route path={ENDPOINTS.HOME} element={<ProtectedRoute />}>
            <Route element={<NavBar />}>
              <Route index element={<SequencePage />} />
              <Route path={ENDPOINTS.TAB_SEQUENCE} element={<SequencePage />} />
              <Route path={ENDPOINTS.TAB_LIST} element={<ListPage />} />
              <Route path={`${ENDPOINTS.EDIT_SEQUENCE}/:sequenceId`} element={<EditSequencePage />} />
              <Route path={`${ENDPOINTS.EDIT_LIST}/:listId`} element={<EditListPage />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
      <LinearProgressIndicator />
    </>
  );

}

export default App;
