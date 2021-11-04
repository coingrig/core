import { getAllCoins, getCoins } from '../dist';

describe('market', () => {

  it('can_get_all_coins', async () => {
    let coins = await getAllCoins();
    expect(Object.entries(coins).length).toBe(10);
  });

  it('can_get_some_coins', async () => {
    let coins = await getCoins(['bitcoin', 'ethereum']);
    expect(Object.entries(coins).length).toBe(2);
  });


});

