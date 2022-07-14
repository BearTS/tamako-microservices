const request = require('node-superfetch');
const cheerio = require('cheerio');
const { stripIndents } = require('common-tags');
const { decode: decodeHTML } = require('html-entities');
const moment = require('moment');

const anime = async (query) => {
    const seasons = {
        WINTER: 'Winter',
        SPRING: 'Spring',
        SUMMER: 'Summer',
        FALL: 'Fall'
    };
    const statuses = {
        FINISHED: 'Finished',
        RELEASING: 'Releasing',
        NOT_YET_RELEASED: 'Unreleased',
        CANCELLED: 'Cancelled'
    };
    const id = await Animesearch(query);
    if (!id) return null;
    const anime = await fetchAnime(id);
    const personalList = await fetchPersonalList();
    // eslint-disable-next-line no-unused-vars
    const entry = personalList.find(ani => ani.mediaId === id);
    const malScore = await fetchMALScore(anime.idMal);
    const malURL = `https://myanimelist.net/anime/${anime.idMal}`;
    const title =  anime.title.english || anime.title.romaji;
    const thumbnail = anime.coverImage.large || anime.coverImage.medium || null;
    const description = anime.description ? cleanAnilistHTML(anime.description) : 'No description.';
    const status = statuses[anime.status];
    const episodes = anime.episodes || '???';
    const season =  anime.season ? `${seasons[anime.season]} ${anime.startDate.year}` : '???';
    const averageScore =  anime.averageScore ? `${anime.averageScore}%` : '???';
    const mmalScore = malScore ? embedURL(malScore, malURL) : '???';
    const externalLinks = anime.externalLinks.length
        ? anime.externalLinks.map(link => `[${link.site}](${link.url})`).join(', ')
        : 'None';
    const data = {
        title: title,
        url: anime.siteUrl,
        thumbnail: thumbnail,
        description: description,
        status: status,
        episodes: episodes,
        season: season,
        averageScore: averageScore,
        malScore: mmalScore,
        externalLinks: externalLinks
    };

    return data;
};
function cleanAnilistHTML(html, removeLineBreaks = true) {
    let clean = html;
    if (removeLineBreaks) clean = clean.replace(/\r|\n|\f/g, '');
    clean = decodeHTML(clean);
    clean = clean
        .replaceAll('<br>', '\n')
        .replace(/<\/?(i|em)>/g, '*')
        .replace(/<\/?b>/g, '**')
        .replace(/~!|!~/g, '||');
    if (clean.length > 2000) clean = `${clean.substr(0, 1995)}...`;
    const spoilers = (clean.match(/\|\|/g) || []).length;
    if (spoilers !== 0 && (spoilers && (spoilers % 2))) clean += '||';
    return clean;
}
async function Animesearch(query) {
    const searchGraphQL = stripIndents`
	query ($search: String, $type: MediaType, $isAdult: Boolean) {
		anime: Page (perPage: 10) {
			results: media (type: $type, isAdult: $isAdult, search: $search) {
				id
				title {
					english
					romaji
				}
			}
		}
	}
`;
    const { body } = await request
        .post('https://graphql.anilist.co/')
        .send({
            variables: {
                search: query,
                type: 'ANIME'
            },
            query: searchGraphQL
        });
    if (!body.data.anime.results.length) return null;
    return body.data.anime.results[0].id;
}
async function fetchAnime(id) {
    const resultGraphQL = stripIndents`
	query media($id: Int, $type: MediaType) {
		Media(id: $id, type: $type) {
			id
			idMal
			title {
				english
				romaji
			}
			coverImage {
				large
				medium
			}
			startDate { year }
			description(asHtml: false)
			season
			type
			siteUrl
			status
			episodes
			isAdult
			meanScore
			averageScore
			externalLinks {
				url
				site
			}
		}
	}
`;
    const { body } = await request
        .post('https://graphql.anilist.co/')
        .send({
            variables: {
                id,
                type: 'ANIME'
            },
            query: resultGraphQL
        });
    return body.data.Media;
}
async function fetchMALScore(id) {
    try {
        const { text } = await request.get(`https://myanimelist.net/anime/${id}`);
        const $ = cheerio.load(text);
        return $('span[itemprop="ratingValue"]').first().text();
    } catch {
        return null;
    }
}
async function fetchPersonalList() {
    const personalGraphQL = stripIndents`
	query ($name: String, $type: MediaType) {
		MediaListCollection(userName: $name, type: $type) {
			lists {
				entries {
					mediaId
					score(format: POINT_10)
					status
				}
				name
			}
		}
	}
`;
    const { body } = await request
        .post('https://graphql.anilist.co/')
        .send({
            variables: {
                name: process.env.ANILIST_USERNAME,
                type: 'ANIME'
            },
            query: personalGraphQL
        });
    const { lists } = body.data.MediaListCollection;
    let personalList = [];
    for (const list of Object.values(lists)) personalList.push(...list.entries);
    setTimeout(() => { personalList = null; }, 3.6e+6);
    return personalList;
}

const book = async (query) => {
    const { body } = await request
        .get('https://www.googleapis.com/books/v1/volumes')
        .query({
            apiKey: process.env.GOOGLE_KEY,
            q: query,
            maxResults: 1,
            printType: 'books'
        });
    if (!body.items) return null;
    const data = body.items[0].volumeInfo;
    return data;
};

const company = async (query) => {
    const data = await fetchCompany(query);
    if (!data) return null;
    return data;

};
async function fetchCompany(query) {
    const bear = ['bearjs', 'Bearts', 'b3ar', 'tamakotech', 'Tamako Tech', 'Tamako'];

    if (bear.includes(query.toLowerCase())) {
        return {
            name: 'tamako',
            logo: 'https://raw.githubusercontent.com/Tamako-Tech/Tamako-Docs/main/static/img/logo.png'
        };
    }
    const { body } = await request
        .get('https://autocomplete.clearbit.com/v1/companies/suggest')
        .query({ query })
        .set({ Authorization: `Bearer ${process.env.CLEARBIT_KEY}` });
    if (!body.length) return null;
    return body[0];
}

const country = async (query) => { 
    const { body } = await request.get(`https://restcountries.eu/rest/v2/name/${encodeURIComponent(query)}`);
    const data = body.find(country => {
        const search = query.toLowerCase();
        return country.name.toLowerCase() === search
					|| country.altSpellings.some(alt => alt.toLowerCase() === search)
					|| country.alpha2Code.toLowerCase() === search
					|| country.alpha3Code.toLowerCase() === search
					|| country.nativeName.toLowerCase() === search;
    }) || body[0];
    const thumbnail = `https://www.countryflags.io/${data.alpha2Code}/flat/64.png`;
    const population = formatNumber(data.population);
    const capital = data.capital;
    const currency = data.currencies[0].symbol;
    const location = data.subregion || data.region;
    const demonym = data.demonym || 'none';
    const nativeName = data.nativeName;
    const area = formatNumber(data.area);
    const languages = data.languages.map(language => language.name).join('/');
    const embed = {
        title: data.name,
        thumbnail: thumbnail,
        population: population,
        capital: capital,
        currency: currency,
        location: location,
        demonym: demonym,
        nativeName: nativeName,
        area: area,
        languages: languages
    };
    return embed;
};

const define = async (word) => {
    const { body } = await request
        .get(`https://www.dictionaryapi.com/api/v3/references/collegiate/json/${word}`)
        .query({ key: process.env.WEBSTER_KEY });
    if (!body.length) return null;
    const data = body[0];
    if (typeof data === 'string') return `Could not find any results. Did you mean **${data}**?`;
    return stripIndents`
    **${data.meta.stems[0]}** (${data.fl})
    ${data.shortdef.map((definition, i) => `(${i + 1}) ${definition}`).join('\n')}
`;
};

const github = async (author, repository) => {
    const { body } = await request
        .get(`https://api.github.com/repos/${author}/${repository}`)
        .set({ Authorization: `token ${process.env.GITHUB_ACCESS_TOKEN}` });
    const fullName = body.full_name;
    const url = body.html_url;
    const description = body.description ? shorten(body.description) : 'No description parameter provided.';
    const avatar = body.owner.avatar_url;
    const stars = formatNumber(body.stargazers_count);
    const forks = formatNumber(body.forks);
    const issues = formatNumber(body.open_issues);
    const language = body.language || '???';
    const creation = moment.utc(body.created_at).format('MM/DD/YYYY h:mm A');
    const mondified = moment.utc(body.updated_at).format('MM/DD/YYYY h:mm A');
    const embed = {
        title: fullName,
        url: url,
        description: description,
        thumbnail: avatar,
        stars: stars,
        forks: forks,
        issues: issues,
        language: language,
        creation: creation,
        modified: mondified
    };
    return embed;
};

const npm = async (pkg) => {
    pkg = encodeURIComponent(pkg.replaceAll(' ', '-'));
    const { body } = await request.get(`https://registry.npmjs.com/${pkg}`);
    if (body.time.unpublished) return 'This package no longer exists.';
    const version = body.versions[body['dist-tags'].latest];
    const maintainers = trimArray(body.maintainers.map(user => user.name));
    const dependencies = version.dependencies ? trimArray(Object.keys(version.dependencies)) : null;
    const title = body.name;
    const url = `https://www.npmjs.com/package/${pkg}`;
    const ver = body['dist-tags'].latest;
    const license = body.license;
    const author = body.author ? body.author.name : '???';
    const created_at = moment.utc(body.time.created).format('MM/DD/YYYY h:mm A');
    const modified_at = moment.utc(body.time.modified).format('MM/DD/YYYY h:mm A');
    const mainFile = version.main || 'index.js';
    const dep = dependencies && dependencies.length ? dependencies.join(', ') : 'None';
    const maintainer = maintainers.join(', ');
    const embed = {
        title: title,
        url: url,
        version: ver,
        license: license,
        author: author,
        created_at: created_at,
        modified_at: modified_at,
        mainFile: mainFile,
        dependencies: dep,
        maintainers: maintainer
    };
    return embed;

};

const steam = async (query) => {
    const id = await Steamsearch(query);
    if (!id) return 'Could not find any results.';
    const data = await fetchGame(id);
    const current = data.price_overview ? `$${data.price_overview.final / 100}` : 'Free';
    const original = data.price_overview ? `$${data.price_overview.initial / 100}` : 'Free';
    const price = current === original ? current : `~~${original}~~ ${current}`;
    const platforms = [];
    if (data.platforms) {
        if (data.platforms.windows) platforms.push('Windows');
        if (data.platforms.mac) platforms.push('Mac');
        if (data.platforms.linux) platforms.push('Linux');
    }
    const title = data.name;
    const url = `https://store.steampowered.com/app/${data.steam_appid}/`;
    const thumbnail = data.header_image;
    const metascore = data.metacritic ? data.metacritic.score : '???';
    const platform = platforms.join(', ');
    const release = data.release_date ? moment.utc(data.release_date).format('MM/DD/YYYY') : '???';
    const dlcCount = data.dlc ? formatNumber(data.dlc.length) : 0;
    const dev = data.developers ? data.developers.join(', ') : '???';
    const pub = data.publishers ? data.publishers.join(', ') : '???';
    const embed = {
        title: title,
        url: url,
        thumbnail: thumbnail,
        metascore: metascore,
        platform: platform,
        release: release,
        dlcCount: dlcCount,
        dev: dev,
        pub: pub,
        price: price
    };
    return embed;
};
async function Steamsearch(query) {
    const { body } = await request
        .get('https://store.steampowered.com/api/storesearch')
        .query({
            cc: 'us',
            l: 'en',
            term: query
        });
    if (!body.items.length) return null;
    return body.items[0].id;
}
async function fetchGame(id) {
    const { body } = await request
        .get('https://store.steampowered.com/api/appdetails')
        .query({ appids: id });
    return body[id.toString()].data;
}

const knowYourMeme = async (query) => { 
    const location = await kymsearch(query);
    if (!location) return 'Could not find any results.';
    const data = fetchMeme(location);
    const description = shorten(data.description) || 'No description parameter provided.';
    const embed = {
        description: description,
        title: data.name,
        url: data.url,
        thumbnail: data.thumbnail
    };
    return embed;
};
async function kymsearch(query) {
    const { text } = await request
        .get('https://knowyourmeme.com/search')
        .query({ q: query });
    const $ = cheerio.load(text);
    const location = $('.entry-grid-body').find('tr td a').first().attr('href');
    if (!location) return null;
    return location;
}
async function fetchMeme(location) {
    const { text } = await request.get(`https://knowyourmeme.com${location}`);
    const $ = cheerio.load(text);
    const thumbnail = $('a[class="photo left wide"]').first().attr('href')
        || $('a[class="photo left "]').first().attr('href')
        || null;
    return {
        name: $('h1').first().text().trim(),
        url: `https://knowyourmeme.com${location}`,
        description: getMemeDescription($),
        thumbnail
    };
}
function getMemeDescription($) {
    const children = $('.bodycopy').first().children();
    let foundAbout = false;
    for (let i = 0; i < children.length; i++) {
        const text = children.eq(i).text();
        if (foundAbout) {
            if (text) return text;
        } else if (text === 'About') {
            foundAbout = true;
        }
    }
    return null;
}

function trimArray(arr, maxLen = 10) {
    if (arr.length > maxLen) {
        const len = arr.length - maxLen;
        arr = arr.slice(0, maxLen);
        arr.push(`${len} more...`);
    }
    return arr;
}

function embedURL(title, uri, display) {
    return `[${title}](${uri.replaceAll(')', '%29')}${display ? ` "${display}"` : ''})`;
}

function formatNumber(number, minimumFractionDigits = 0) {
    return Number.parseFloat(number).toLocaleString(undefined, {
        minimumFractionDigits,
        maximumFractionDigits: 2
    });
}

function shorten(text, maxLen = 2000) {
    return text.length > maxLen ? `${text.substr(0, maxLen - 3)}...` : text;
}

module.exports = {
    anime,
    book,
    company,
    country,
    define,
    github,
    npm,
    steam,
    knowYourMeme
};