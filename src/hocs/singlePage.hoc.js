import {useParams} from "react-router-dom";
import {useState, useEffect} from 'react';

import useMarvelService from "../services/MarvelService";
import setContent from '../utils/setContent';
import AppBanner from "../components/appBanner/AppBanner";

const SinglePage = ({BaseComponent, pageType}) => {
    const {id} = useParams();
    const [data, setData] = useState(null);
    const {getComic, getCharacter, clearError, process, setProcess} = useMarvelService();

    useEffect(() => {
        updateData();
    }, [id]);

    const updateData = () => {
        clearError();

        switch (pageType) {
            case "comic":
                getComic(id)
                    .then(onDataLoaded)
                    .then(() => setProcess("confirmed"));
                break;
            case "character":
                getCharacter(id)
                    .then(onDataLoaded)
                    .then(() => setProcess("confirmed"));
        }
    }

    const onDataLoaded = (data) => {
        setData(data);
    }

    return (
        <>
            <AppBanner/>
            {setContent(process, BaseComponent, data)}
        </>
    )
}

export default SinglePage;