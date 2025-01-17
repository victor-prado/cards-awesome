import axios from "axios";

export async function fetchRss() {
    try {
        const url = 'http://localhost:8002/items';
        const res = await axios.get(url);
        // console.log('res', res)
        return res.data
    } catch (error) {
        console.log('Error  fetching or parsing RSS feed: ', error);
    }
    return []
}