import { Route, Routes } from 'react-router-dom'
import './App.css'
import Auth from './Auth/Auth'
import Home from './Pages/Home/Home'
import VotingPreference from './Pages/After Loging In/Vote Preference/VotePreference'
import PositionSessions from './Pages/After Loging In/Position/Position Sessions/PositionSessions'
import PositionSession from './Pages/After Loging In/Position/Position Session/PositionSession';
import DecisionSessions from './Pages/After Loging In/Decision/DecisionSessions/DecisionSessions'
import DecisionSession from './Pages/After Loging In/Decision/DecisionSession/DecisionSession'
import DashHome from './Dashboard/DashHome/DashHome'
import ManageCandidates from './Dashboard/Candidates/ManageCandidate'
import AddCandidates from './Dashboard/Candidates/Add Candidate/AddCandidates'
import ManageDecisions from './Dashboard/Decisions/ManageDecisions'
import AddDecision from './Dashboard/Decisions/Add Decision/AddDecision'
import ViewDecision from './Dashboard/Decisions/View Decision/ViewDecision'
import EditDecision from './Dashboard/Decisions/Edit Decision/EditDecision'
import ManageElection from './Dashboard/Manage Elections/ManageElection'
import ViewElections from './Dashboard/Manage Elections/View Election/ViewElections';
import EditElection from './Dashboard/Manage Elections/Edit Election/EditElection';
import { Toaster } from 'react-hot-toast'
import AddElection from './Dashboard/Manage Elections/Add Election/AddElection';
import UserManagement from './Dashboard/Users/UserManagement';
import AddUser from './Dashboard/Users/Add User/AddUser';
import ViewUser from './Dashboard/Users/View User/ViewUser';
import EditUser from './Dashboard/Users/Edit User/EditUser';
import WbSunnyOutlinedIcon from '@mui/icons-material/DarkMode';
import NightlightOutlinedIcon from '@mui/icons-material/LightMode';
import { useEffect, useState } from 'react'
import { createTheme, ThemeProvider } from '@mui/system'
import ViewCandidates from './Dashboard/Candidates/View Candidate/ViewCandidates';
import EditCandidates from './Dashboard/Candidates/Edit Candidate/EditCandidates'
import SessionReport from './Pages/Report/SessionReport';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import FAQ from './Components/Home/FAQ/FAQ'
import Print from './Pages/Print/Print';
import NotFound from './Pages/Not Found/NotFound'

const theme = createTheme();

function App() {

  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  const toggleTheme = () => {
    setDarkMode(prev => !prev);
  };

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <ThemeProvider theme={theme}>
          <button
            className="theme-toggle position-fixed top-50 start-0 z-3"
            onClick={toggleTheme}
            aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {darkMode ?  <NightlightOutlinedIcon /> : <WbSunnyOutlinedIcon /> }
          </button>
          <Toaster
            position="bottom-right"
            reverseOrder={false}
          />
          <Routes>
            <Route path='/auth' element={<Auth />} />
            <Route path='' element={<Home />} />
            <Route path='/Voting-Preference' element={<VotingPreference />} />

            {/* Positions */}
            <Route path='/Position-Sessions' element={<PositionSessions />} />
            <Route path='/Position-Session/:id' element={<PositionSession />} />

            {/* Decisions */}
            <Route path='/Decision-Sessions' element={<DecisionSessions />} />
            <Route path='/Decision-Session/:id' element={<DecisionSession />} />

            {/* Dashboard */}
            <Route path='/Dashboard' element={<DashHome />} >

              {/* Manage Decisions */}
              <Route path="manage-decisions" element={<ManageDecisions />}>
                <Route path='add-decision' element={<AddDecision />} />
                <Route path='view-decisions' element={<ViewDecision />} />
                <Route path='edit-decision/:id' element={<EditDecision />} />
              </Route>

              {/* Manage Candidates */}
              <Route path="manage-candidates" element={<ManageCandidates />}>
                <Route path='add-candidate' element={<AddCandidates />} />
                <Route path='view-candidates' element={<ViewCandidates />} />
                <Route path='edit-candidate/:id' element={<EditCandidates />} />
              </Route>

              {/* Manage Elections */}
              <Route path="manage-elections" element={<ManageElection />}>
                <Route path='add-election' element={<AddElection />} />
                <Route path='view-elections' element={<ViewElections />} />
                <Route path='edit-election/:id' element={<EditElection />} />
              </Route>

              {/* User Management */}
              <Route path="manage-users" element={<UserManagement />}>
                <Route path='add-user' element={<AddUser />} />
                <Route path='view-users' element={<ViewUser />} />
                <Route path='edit-user/:id' element={<EditUser />} />
              </Route>

              {/* Reports Managment */}
              <Route path="manage-reports" element={<SessionReport />}>
              </Route>

            </Route>

            {/* Sessions Report */}
            <Route path='/Session-Report/:id' element={<SessionReport />} />

            <Route path='/FAQ' element={<FAQ from={true} />} />

            <Route path='/Print' element={<Print />} />

            <Route path='*' element={<NotFound />} />

          </Routes>
        </ThemeProvider>
      </LocalizationProvider>
    </>
  )
}

export default App
