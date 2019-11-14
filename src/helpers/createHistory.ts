/**
 * Creates history object
 * 
 * @param { number } length maximum number of stored items
 */
export function createHistory(length: number) {
	const store = {};

	/**
    * If item history doesn't exist, create it
    * Add payload to the item history
    * Remove spare payloads from the item history
    * 
    * @param { string } name
    * @param { any } data
    */
	const add = (name: string, data: any) => {
		let history = store[name];
		if (!history) history = store[name] = [];

		const time = new Date().getTime();
		history.push({ time, data });

		if (history.length > length) history.shift();
	};

	/**
    * If item history doesn't exist, set it to empty array
    * Filter items older than timeframe
    * Return data list
    * 
    * @param { string } name 
    * @param { number } timeframe 
    */
	const get = (name, timeframe) => {
		let history = store[name] || [];
		const now = new Date().getTime();

		if (timeframe) {
			history = history.filter(({ time }) => time + timeframe >= now);
		}

		return history.map(({ data }) => data);
	};

	return { add, get };
}
