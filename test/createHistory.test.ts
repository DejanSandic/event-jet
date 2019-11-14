import { createHistory } from '../src/helpers/createHistory';

test('Calling createHistory() function should create new history instance.', () => {
   const history = createHistory();
   expect(history).toHaveProperty('add');
   expect(history).toHaveProperty('get');
   expect(history).toHaveProperty('getAll');
   expect(history).toHaveProperty('remove');
   expect(history).toHaveProperty('clear');
});
