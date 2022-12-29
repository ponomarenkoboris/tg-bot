import { useEffect } from 'react';
import { Header } from './components/Header/Header';
import useTelegram from './hooks/useTelegram'
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom'
import { ProductList } from './components/ProductList/ProductList'
import { Form } from './components/Form/Form'
import './App.css';

const router = createBrowserRouter([
    {
        path: '/',
        element: <ProductList />
    },
    {
        path: 'form',
        element: <Form />
    },
    {
        path: '*',
        element: <Navigate to='/'/>
    }
])

function App() {
    const { tg } = useTelegram()

    useEffect(() => { tg.ready() }, [])

    return (
        <div className="App">
            <Header />
            <RouterProvider router={router}/>
        </div>
    );
}

export default App;
