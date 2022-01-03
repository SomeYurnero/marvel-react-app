import {Component} from "react";

import MarvelService from "../../services/MarvelService";

import './charList.scss';

class CharList extends Component {

    state = {
        charList: []
    }

    marvelService = new MarvelService();

    componentDidMount() {
        this.updateCharList();
    }

    componentDidUpdate() {
    }

    componentWillUnmount() {
    }

    updateCharList = () => {
        this.marvelService
            .getAllCharacters()
            .then(this.onCharsLoaded)
    }

    onCharsLoaded = (chars) => {
        const charList = chars.map(item => {
            const {name, thumbnail} = item;

            let imgNotFound = {};
            if (thumbnail === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg") {
                imgNotFound = {objectFit: 'contain'};
            }

            return (
                <li
                    key={name}
                    className="char__item">
                    <img style={imgNotFound} src={thumbnail} alt={name}/>
                    <div className="char__name">{name}</div>
                </li>
            )
        });

        this.setState({
            charList
        })
    }

    render() {

        return (
            <div className="char__list">
                <ul className="char__grid">
                    {this.state.charList}
                </ul>
                <button className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

export default CharList;