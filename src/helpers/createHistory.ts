type Item = {
   time: number;
   data: any;
};

/**
 * Creates history object
 *
 * @param { number } length maximum number of stored items
 */
export function createHistory (length: number = 1) {
   let store = Object.create(null);

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
   const get = (
      name: string,
      length: number = 1,
      timeframe: number | undefined
   ) => {
      let history = store[name] || [];
      const now = new Date().getTime();

      if (timeframe) {
         history = history.filter(({ time }: Item) => time + timeframe >= now);
      } else {
         history = history.slice(history.length - length);
      }

      return history.map(({ data }: Item) => data);
   };

   /**
    * Return entire store
    */
   const getAll = () => ({ ...store });

   /**
    * Remove item from history
    * @param name
    */
   const remove = (name: string) => delete store[name];

   /**
    * Clear entire store
    */
   const clear = () => (store = Object.create(null));

   return { add, get, getAll, remove, clear };
}
