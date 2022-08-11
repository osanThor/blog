import { Route, Routes } from 'react-router-dom';
import LoginPage from './pages/loginPage';
import PostListPage from './pages/postListPage';
import PostPage from './pages/postPage';
import RegisterPage from './pages/registerPage';
import WritePage from './pages/writePage';

function App() {
  return (
    <>
      <Routes>
        <Route element={<PostListPage />} path="/" exact />
        <Route element={<PostListPage />} path="/@:username" exact />
        <Route element={<LoginPage />} path="/login" />
        <Route element={<RegisterPage />} path="/register" />
        <Route element={<WritePage />} path="/write" />
        <Route element={<PostPage />} path="/@:username/:postId" />
      </Routes>
    </>
  );
}

export default App;
