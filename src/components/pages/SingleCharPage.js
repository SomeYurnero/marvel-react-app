import {useParams} from "react-router-dom";
import {useState, useEffect} from 'react';

import useMarvelService from "../../services/MarvelService";
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import AppBanner from "../appBanner/AppBanner";

import "./singleCharPage.scss";

const SingleCharPage = () => {
    const {characterName} = useParams();
    const [character, setCharacter] = useState(null);
    const {loading, error, getCharacterByName, clearError} = useMarvelService();

    console.log(characterName);
    console.log(character);

    useEffect(() => {
        updateChar()
    }, [characterName])

    const updateChar = () => {
        clearError();
        getCharacterByName(characterName)
            .then(onCharLoaded)
    }

    const onCharLoaded = (character) => {
        setCharacter(character);
    }

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error || !character) ? <View character={character}/> : null;

    return (
        <>
            <AppBanner/>
            {errorMessage}
            {spinner}
            {content}
        </>
    )
}

const View = ({character}) => {
    const {thumbnail, name, description} = character;

    return (
        <div className="single-comic">
            <img src={thumbnail} alt={name} className="single-comic__char-img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{name}</h2>
                <p className="single-comic__descr">{description}</p>
            </div>
        </div>
    )
}

export default SingleCharPage;