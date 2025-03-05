// import './App.css';
import React, { useState} from 'react'
import { NavBar } from './components/NavBar';
import { News } from './components/News';
import{
  BrowserRouter as Router,
  Route,
  Routes
} from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar';

export const App = () =>{
  const pageSize = 6;
  const apiKey = process.env.REACT_APP_NEWSAPP_API_KEY;

  const [progress, setProgress] = useState(10);
  
    return (
      <Router>
        <div>
        <NavBar/>
        <LoadingBar
        color="#f11946"
        progress={progress}
      />
        <Routes>
          <Route path="/" element={<News setProgress={setProgress} apiKey={apiKey} key="general" pageSize={pageSize} country="us" category="general"/>}></Route>
          <Route path="/business" element={<News setProgress={setProgress} apiKey={apiKey} key="business" pageSize={pageSize} country="us" category="business"/>}></Route>
          <Route path="/entertainment" element={<News setProgress={setProgress} apiKey={apiKey} key="entertainment" pageSize={pageSize} country="us" category="entertainment"/>}></Route>
          <Route path="/general" element={<News setProgress={setProgress} apiKey={apiKey} key="general" pageSize={pageSize} country="us" category="general"/>}></Route>
          <Route path="/health" element={<News setProgress={setProgress} apiKey={apiKey} key="health" pageSize={pageSize} country="us" category="health"/>}></Route>
          <Route path="/science" element={<News setProgress={setProgress} apiKey={apiKey} key="science" pageSize={pageSize} country="us" category="science"/>}></Route>
          <Route path="/sports" element={<News setProgress={setProgress} apiKey={apiKey} key="sports" pageSize={pageSize} country="us" category="sports"/>}></Route>
          <Route path="/technology" element={<News setProgress={setProgress} apiKey={apiKey} key="technology" pageSize={pageSize} country="us" category="technology"/>}></Route>
        </Routes>
      </div>
      </Router>
    )
}
export default App;