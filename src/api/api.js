import axios from "axios";

export async function fetchRss() {
    try {
        const url = 'http://localhost:8002/rss';
        const res = await axios.get(url);
        // console.log('res', res)
        return res.data.items
    } catch (error) {
        console.log('Error  fetching or parsing RSS feed: ', error);
    }
    return []
}

export async function fetchCollection() {
    try {
        const url = 'http://localhost:8002/cards';
        const res = await axios.get(url);
        // console.log('cards', res.data)
        return res.data
    } catch (error) {
        console.log('Error  fetching or parsing cards: ', error);
    }
    return []
}

export async function fetchMostValuable(total) {
    try {
        const cards = await fetchCollection()
        const mostValuable = cards.toSorted((a, b) => {
            return b.prices.usd - a.prices.usd
        }).slice(0, total)
        // console.log('expensives: ', mostValuable.map(c => c.prices.usd))
        return mostValuable
    } catch (error) {
        console.log('Error  fetching or parsing valuable cards: ', error);
    }
    return []
}

export async function fetchCard(cardId) {
    try {
        const cards = await fetchCollection()
        const card = cards.find(c => c.id === cardId)
        console.log('card ', card)
        return card
    } catch (error) {
        console.log('Error  fetching or parsing card: ', error);
    }
    return null
}