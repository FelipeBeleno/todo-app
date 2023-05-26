
import { Provider } from 'react-redux';
import { store } from './context/store';
import ContentApp from './components/ContentApp';

function App() {


  return (
    <Provider store={store}>
      <ContentApp/>
    </Provider>
  );
}

export default App;
