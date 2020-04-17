import React from 'react';
import {Route, Switch} from "react-router-dom";
import {Container} from "reactstrap";
import Toolbar from "./components/UI/Toolbar/Toolbar";
import {ToastContainer} from "react-toastify";
import MainPage from "./containers /MainPage/MainPage";
import Login from "./containers /Login/Login";
import CocktailBuilder from "./containers /CocktailBuilder /CocktailBuilder";
import MyCocktails from "./containers /MyCocktails/MyCocktails";
import AdminOffice from "./containers /AdminOffice/AdminOffice";

const App = () => {
    return (
        <>
            <ToastContainer autoClose={2000}/>
            <header>
                <Toolbar/>
            </header>
            <Container className='mt-5'>
                <Switch>
                    <Route path='/' exact component={MainPage}/>
                    <Route path='/login' exact component={Login}/>
                    <Route path='/cocktailBuilder' exact component={CocktailBuilder}/>
                    <Route path='/myCocktails' exact component={MyCocktails}/>
                    <Route path='/admin_office' exact component={AdminOffice}/>
                    <Route render={()=> <h1>Not Found</h1>}/>
                </Switch>
            </Container>
        </>
    );
};

export default App;