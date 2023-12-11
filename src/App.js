import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import Contract from './pages/Contract';
import CompanyRegister from './pages/CompanyRegister';
import Login from './pages/Login';
import MemberRegister from './pages/MemberRegister';
import ProductRegister from './pages/ProductRegister';
import ProcessRegister from './pages/ProcessRegister';
import ResizablePanel from './component/layer/ResizablePanel';
import Flow from './processFlow/ProcessFlow';


function Root() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<ResizablePanel />}>
                    <Route path="/" element={<Login />} />
                    <Route path="/:id" element={<Home />} />
                    <Route path="/ProductDetail/:productId" element={<ProductDetail />} />
                    <Route path="/Contract" element={<Contract />} />
                    <Route path="/CompanyRegister" element={<CompanyRegister />} />
                    <Route path="/Login" element={<Login />} />
                    <Route path="/MemberRegister" element={<MemberRegister />} />
                    <Route path="/ProductRegister" element={<ProductRegister />} />
                    <Route path="/ProcessRegister" element={<ProcessRegister />} />
                    <Route path='/ProcessFlow' element={<Flow/>}/>
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


