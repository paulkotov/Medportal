import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import Header from './components/Header';
import FilterPanel from './components/FilterPanel';
import DoctorsPanel from './components/DoctorsPanel';
import Schedule from './components/Schedule';
// import '../src/style.css';
import reducer from './redux/reducers';

const store = createStore(reducer);

const App: React.SFC = () => {
    return (
        <div className='main' style={{ width: 2000+'px', backgroundColor: '#fff' }}>
            <Header/>
            <FilterPanel/>
            <DoctorsPanel/>
            <Schedule/>
        </div>
    );
};

ReactDOM.render(
        <Provider store={store}>
            <App/>
        </Provider>, 
        document.getElementById('root'));