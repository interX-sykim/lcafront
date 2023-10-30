import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Home from './pages/Home';
import Page101 from './pages/Page101';
import Page200 from './pages/Page200';
import Page201 from './pages/Page201';
import Page202 from './pages/Page202';
import Page300 from './pages/Page300';
import Page400 from './pages/Page400';
import CompanyRegister from './pages/CompanyRegister';
import Login from './pages/Login';
import MemberRegister from './pages/MemberRegister';
import ProductRegister from './pages/ProductRegister';
import ProcessRegister from './pages/ProcessRegister';
import ProcessUpdate from './pages/ProcessUpdate';

import ResizablePanel from './component/layer/ResizablePanel';


function Root() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<ResizablePanel />}>
                    <Route path="/:id" element={<Home />} />
                    <Route path="/Dashboard" element={<Home />} />
                    <Route path="/Page101" element={<Page101 />} />
                    <Route path="/Page200" element={<Page200 />} />
                    <Route path="/Page201" element={<Page201 />} />
                    <Route path="/Page202" element={<Page202 />} />
                    <Route path="/Page300" element={<Page300 />} />
                    <Route path="/Page400" element={<Page400 />} />
                    <Route path="/CompanyRegister" element={<CompanyRegister />} />
                    <Route path="/Login" element={<Login />} />
                    <Route path="/MemberRegister" element={<MemberRegister />} />
                    <Route path="/ProductRegister" element={<ProductRegister />} />
                    <Route path='/ProcessRegister' element={<ProcessRegister />} />
                    <Route path='/ProcessUpdate' element={<ProcessUpdate />} />
                </Route>
            </Routes>
        </div>);

};


const App = () => {
    return (
        <BrowserRouter basename="/dxai">
            <Root />
        </BrowserRouter>
    );
};

export default App;


