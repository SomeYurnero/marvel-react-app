import {Formik, Form, Field, ErrorMessage} from "formik";
import {useState} from 'react';
import {Link} from "react-router-dom";
import * as Yup from "yup";

import useMarvelService from "../../services/MarvelService";

import "./charSearchForm.scss";

const CharSearchForm = () => {

    const [character, setCharacter] = useState(null);
    const [characterNameSearching, setCharacterNameSearching] = useState(false);
    const [previousName, setPreviousName] = useState(null);

    const {_apiBase, _apiKey} = useMarvelService();

    const getCharacterByName = async (characterName) => {
            setCharacterNameSearching(true);
            const response = await fetch(`${_apiBase}characters?name=${characterName}&${_apiKey}`);
            const character = await response.json();
            setCharacterNameSearching(false);
            if (!character.data.results.length < 1) {
                setCharacter(character.data.results[0]);
            } else {
                setCharacter("error");
            }
    }

    const result = character != "error" && character ? (
            <div className="char__search-wrapper">
                <div className="char__search-success">There is! Visit {character.name} page?</div>
                <Link to={`character/${character.id}`} className="button button__secondary">
                    <div className="inner">To page</div>
                </Link>
            </div>
        ) : character === "error" ? (
            <div className="char__search-error">
                The character was not found. Check the name and try again
            </div>
        ) : null;

    return (
        <div className="char__search-form">
            <Formik
                initialValues={{name: ""}}
                validationSchema={Yup.object({
                    name: Yup.string().required("This field is required")
                })}
                onSubmit={values => {
                        if (previousName != values.name) {
                            getCharacterByName(values.name);
                            setPreviousName(values.name);
                        }
                }}
            >
                {({handleChange}) => (
                    <Form>
                        <label className="char__search-label" htmlFor="charSearch">Or find a character by name:</label>
                        <div className="char__search-wrapper">
                            <Field
                                id="charSearch"
                                name="name"
                                type="text"
                                placeholder="Enter name"
                                onChange={(event) => {
                                    handleChange(event);
                                    setCharacter(null);
                                }}
                            />
                            <button
                                disabled={characterNameSearching}
                                type='submit'
                                className="button button__main"
                            >
                                <div className="inner">find</div>
                            </button>
                        </div>
                        <ErrorMessage className="char__search-error" name="name" component="div"/>
                    </Form>
                )}
            </Formik>
            {result}
        </div>
    )
}

export default CharSearchForm;