import './styles.css'
import { Provider } from 'react-redux';
import Navbar from "./components/Navbar"
import store from './app/store';
import Posts from "./features/posts/Posts"

export default function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Navbar />
        <Posts />
      </div>
    </Provider>
  );
}