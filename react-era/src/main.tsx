import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import TunnelList from "./pages/TunnelList";

// importa los demás esquemas
import TrackList from "./pages/TrackList";

import SectionOfLineList from "./pages/SectionOfLineList";

import ContactLineList from "./pages/ContactLineList";

import Sandbox from "./pages/Sandbox";


import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/tunnels" element={<TunnelList />} />


      <Route path="/tracks" element={<TrackList />} />


      <Route path="/SectionOfLine" element={<SectionOfLineList />} />


      <Route path="/contact-lines" element={<ContactLineList />} />

      <Route path="/Sandbox" element={<Sandbox />} />

    </Routes>
  </BrowserRouter>
);
