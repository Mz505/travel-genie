import { Routes, Route } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import FlightSearchPage from "./pages/flights/FlightSearchPage";
import FlightStatusPage from "./pages/flights/FlightStatusPage";
import AIAssistantPage from "./pages/assistant/AIAssistantPage";
import MyTripsPage from "./pages/trips/MyTripsPage";
import DestinationsPage from "./pages/destinations/DestinationsPage";
import TravelInfoPage from "./pages/info/TravelInfoPage";
import CustomerSupportPage from "./pages/support/CustomerSupportPage";

import ProtectedRoute from "./components/routes/ProtectedRoute";
import DashboardLayout from "./components/dashboard/DashboardLayout";

import Dashboard from "./pages/dashboard/Dashboard";
import Trips from "./pages/dashboard/Trips";
import TripDetails from "./pages/dashboard/TripDetails";
import EditTrip from "./pages/dashboard/EditTrip";
import CreateTrip from "./pages/dashboard/CreateTrip";
import Budget from "./pages/dashboard/Budget";
import Recommendations from "./pages/dashboard/Recommendations";
import Memory from "./pages/dashboard/Memory";
import Profile from "./pages/dashboard/Profile";
import Settings from "./pages/dashboard/Settings";
import KamAirAnalytics from "./pages/dashboard/KamAirAnalytics";

function App() {
  return (
    <Routes>
      {/* Public Airline Platform Pages */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      <Route path="/flights" element={<FlightSearchPage />} />
      <Route path="/flight-status" element={<FlightStatusPage />} />
      <Route path="/assistant" element={<AIAssistantPage />} />
      <Route path="/my-trip" element={<MyTripsPage />} />
      <Route path="/destinations" element={<DestinationsPage />} />
      <Route path="/travel-info" element={<TravelInfoPage />} />
      <Route path="/support" element={<CustomerSupportPage />} />

      {/* Backward Compatibility Routes */}
      <Route path="/kam-air" element={<DestinationsPage />} />

      {/* Protected Passenger Dashboard Hub */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />

        {/* Trips & Bookings */}
        <Route path="trips" element={<Trips />} />
        <Route path="trips/create" element={<CreateTrip />} />
        <Route path="trips/:id/edit" element={<EditTrip />} />
        <Route path="trips/:id" element={<TripDetails />} />

        {/* Embedded Airline Tools */}
        <Route path="flights" element={<FlightSearchPage />} />
        <Route path="flight-status" element={<FlightStatusPage />} />
        <Route path="assistant" element={<AIAssistantPage />} />
        <Route path="my-trip" element={<MyTripsPage />} />

        {/* Staff & Executive Portal */}
        <Route path="kam-air-analytics" element={<KamAirAnalytics />} />

        {/* Passenger Tools */}
        <Route path="budget" element={<Budget />} />
        <Route path="recommendations" element={<Recommendations />} />
        <Route path="memory" element={<Memory />} />
        <Route path="profile" element={<Profile />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}

export default App;
