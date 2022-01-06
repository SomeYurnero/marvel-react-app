class MarvelService {
    _apiBase = "https://gateway.marvel.com:443/v1/public/";
    _apiKey = "apikey=a5aa21fb00687e162c5d43bb64481a67";
    _baseOffset = 210;

    getResource = async (url) => {
        let res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }

        return await res.json();
    }

    getAllCharacters = async (offset = this._baseOffset) => {
        const res = await this.getResource(`${this._apiBase}characters?limit=9&offset=${offset}&${this._apiKey}`);
        return res.data.results.map(this._transformCharacter);
    }

    getCharacter = async (id) => {
        const res = await this.getResource(`${this._apiBase}characters/${id}?${this._apiKey}`);
        return this._transformCharacter(res.data.results[0]);
    }

    _transformCharacter = (char) => {
        const charDescription = () => {
            if (!char.description) {
                return "There is no description for this character.";
            } else if (char.description.length > 200) {
                return char.description.slice(0, 201) + "...";
            } else {
                return char.description;
            };
        }

        return {
            id: char.id,
            name: char.name,
            description: charDescription(),
            thumbnail: char.thumbnail.path + "." + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comics: char.comics.items
        }
    }
}

export default MarvelService;