import { Route, Routes } from 'react-router-dom';
import { Header } from './components/Header';
import { Home } from './pages/Home';
import { ErrorPage } from './pages/Error';
import { Registration } from './pages/Registration';
import { Authorization } from './pages/Authorization';
import { User } from './pages/User';

function App() {

  return (
    <>
      <Header />
      <div className="container">
        <Routes>
          <Route path="/user" element={<User />} />
          <Route path="/" element={<Home />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/authorization" element={<Authorization />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
        <></>
      </div>
    </>
  );
}

export default App;
