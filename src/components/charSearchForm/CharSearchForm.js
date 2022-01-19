import {Formik, Form, Field, ErrorMessage} from "formik";
import {useState} from 'react';
import {Link} from "react-router-dom";
import * as Yup from "yup";

import useMarvelService from "../../services/MarvelService";

import "./charSearchForm.scss";

const CharSearchForm = () => {

    const [character, setCharacter] = useState(null);

    const {_apiBase, _apiKey} = useMarvelService();

    const getCharacterByName = async (characterName) => {
            const response = await fetch(`${_apiBase}characters?name=${characterName}&${_apiKey}`);

            const character = await response.json();
            console.log(character);

            if (!character.data.results.length < 1) {
                setCharacter(character.data.results[0]);
            } else {
                setCharacter("error");
            }
    }

    const result = character != "error" && character ? (
            <div className="char__search-wrapper">
                <div className="char__search-success">There is! Visit {character.name} page?</div>
                <Link to={character.name} className="button button__secondary">
                    <div className="inner">To page</div>
                </Link>
            </div>
        ) : null;


    const errorMessage = character === "error" ? (
            <div className="char__search-error">
                The character was not found. Check the name and try again
            </div>
        ) : null;

    return (
        <div className="char__search-form">
            <Formik
                initialValues={{name: ""}}
                validationSchema={Yup.object({
                    name: Yup.string()
                            .required("This field is required")
                })}
                onSubmit={values => {
                        getCharacterByName(values.name);
                }}
            >
                <Form>
                    <label className="char__search-label" htmlFor="charSearch">Or find a character by name:</label>
                    <div className="char__search-wrapper">
                        <Field
                            id="charSearch"
                            name="name"
                            type="text"
                            placeholder="Enter name"
                        />
                        <button
                            type='submit'
                            className="button button__main"
                        >
                            <div className="inner">find</div>
                        </button>
                    </div>
                    <ErrorMessage className="char__search-error" name="name" component="div"/>
                </Form>
            </Formik>
            {result}
            {errorMessage}
        </div>
    )
}

export default CharSearchForm;