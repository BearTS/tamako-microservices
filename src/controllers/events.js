const request = require('node-superfetch');
const { stripIndents } = require('common-tags');
const moment = require('moment-timezone');

const animeAiring = async () => {
    const airingGraphQL = stripIndents`
	query AiringSchedule($greater: Int, $lower: Int) {
		anime: Page {
			results: airingSchedules(airingAt_greater: $greater, airingAt_lesser: $lower) {
				airingAt
				media {
					id
					title {
						english
						romaji
					}
				}
			}
		}
	}
`;

    const { body } = await request
        .post('https://graphql.anilist.co/')
        .send({
            variables: {
                greater: Number.parseInt(today(9).getTime() / 1000, 10),
                lower: Number.parseInt(tomorrow(9).getTime() / 1000, 10)
            },
            query: airingGraphQL
        });
    if (!body.data.anime.results.length) return null;
    const anime = body.data.anime.results;
    const mapped = anime.sort((a, b) => a.airingAt - b.airingAt).map(ani => {
        const title = ani.media.title.english || ani.media.title.romaji;
        const airingAt = moment(ani.airingAt * 1000).tz('Asia/Tokyo').format('h:mm A');
        return `• ${title} (@${airingAt} JST)`;
    });
    return mapped.join('\n');
};

const apod = async () => {
    const { body } = await request
        .get('https://api.nasa.gov/planetary/apod')
        .query({ api_key: process.env.GOV_KEY });
    return body;
};


function tomorrow(timeZone) {
    const ftoday = today(timeZone);
    ftoday.setDate(ftoday.getDate() + 1);
    return ftoday;
}

function today(timeZone) {
    const now = new Date();
    now.setHours(0);
    now.setMinutes(0);
    now.setSeconds(0);
    now.setMilliseconds(0);
    if (timeZone) now.setUTCHours(now.getUTCHours() + timeZone);
    return now;
}


module.exports = {
    animeAiring,
    apod
};