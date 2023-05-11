import Result from './components/Result';
import Upload from './components/Upload';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route exact path="/" element={<Upload/>} />
          <Route exact path="/result" element={<Result/>} />
        </Routes>
      </Router>
    </div>
  )
}


export default App;