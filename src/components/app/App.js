import {lazy, Suspense} from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";

import AppHeader from "../appHeader/AppHeader";
import Spinner from "../spinner/Spinner";

const Page404 = lazy(() => import("../pages/404"));
const MainPage = lazy(() => import("../pages/MainPage"));
const ComicsPage = lazy(() => import("../pages/ComicsPage"));
const SingleCharPage = lazy(() => import("../pages/SingleCharPage"));
const SingleComicPage = lazy(() => import("../pages/SingleComicPage"));
const SinglePage = lazy(() => import("../../hocs/singlePage.hoc"));

const App = () => {

    return (
        <BrowserRouter>
            <div className="app">
                <AppHeader/>
                <main>
                    <Suspense fallback={<Spinner/>}>
                        <Routes>
                            <Route path="/" element={<MainPage/>}/>
                            <Route path="character/:id" element={<SinglePage BaseComponent={SingleCharPage} pageType="character"/>}/>
                            <Route path="comics" element={<ComicsPage/>}/>
                            <Route path="comics/:id" element={<SinglePage BaseComponent={SingleComicPage} pageType="comic"/>}/>
                            <Route path="*" element={<Page404/>}/>
                        </Routes>
                    </Suspense>
                </main>
            </div>
        </BrowserRouter>
    )
}

export default App;