import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import {
  reserveRocket,
  cancelReservation,
  fetchRockets,
  selectAllRockets,
  selectReservations,
} from '../redux/rockets/rocketsSlice';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('rocketSlice', () => {
  it('should handle reserveRocket action', () => {
    const initialState = { rockets: [], reservations: {} };
    const store = mockStore(initialState);

    store.dispatch(reserveRocket({ rocketId: '123' }));

    const actions = store.getActions();
    const expectedAction = {
      type: 'rockets/reserveRocket',
      payload: { rocketId: '123' },
    };

    expect(actions).toEqual([expectedAction]);
  });

  it('should handle cancelReservation action', () => {
    const initialState = { rockets: [], reservations: {} };
    const store = mockStore(initialState);

    store.dispatch(cancelReservation({ rocketId: '123' }));

    const actions = store.getActions();
    const expectedAction = {
      type: 'rockets/cancelReservation',
      payload: { rocketId: '123' },
    };

    expect(actions).toEqual([expectedAction]);
  });

  it('should fetch rockets with network error', async () => {
    const initialState = { rockets: [], reservations: {} };
    const store = mockStore(initialState);

    // Mocking a network error using 'nock'
    nock('https://api.spacexdata.com')
      .get('/v4/rockets')
      .reply(500, 'Internal Server Error');

    try {
      await store.dispatch(fetchRockets());
    } catch (error) {
      const actions = store.getActions();

      expect(actions[0].type).toEqual('rockets/fetchRockets/pending');
      expect(actions[1].type).toEqual('rockets/fetchRockets/rejected');
      expect(actions[1].error.message).toEqual('Network error please check your network');
    }
  });

  // Add more tests for your selectors if needed
  it('should select all rockets', () => {
    const state = { rockets: { rockets: [{ id: '1' }, { id: '2' }] } };
    const selectedRockets = selectAllRockets(state);
    expect(selectedRockets).toEqual([{ id: '1' }, { id: '2' }]);
  });

  it('should select reservations', () => {
    const state = { rockets: { reservations: { 123: true, 456: false } } };
    const reservations = selectReservations(state);
    expect(reservations).toEqual({ 123: true, 456: false });
  });
});
