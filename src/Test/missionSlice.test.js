import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import {
  reserveMission,
  cancelMissionReservation,
  fetchMissions,
  selectAllMissions,
  selectMissionReservations,
} from '../redux/missions/missionsSlice';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('missionSlice', () => {
  it('should handle reserveMission action', () => {
    const initialState = { missions: [], reservations: {} };
    const store = mockStore(initialState);

    store.dispatch(reserveMission({ missionId: '123' }));

    const actions = store.getActions();
    const expectedAction = {
      type: 'missions/reserveMission',
      payload: { missionId: '123' },
    };

    expect(actions).toEqual([expectedAction]);
  });

  it('should handle cancelMissionReservation action', () => {
    const initialState = { missions: [], reservations: {} };
    const store = mockStore(initialState);

    store.dispatch(cancelMissionReservation({ missionId: '123' }));

    const actions = store.getActions();
    const expectedAction = {
      type: 'missions/cancelMissionReservation',
      payload: { missionId: '123' },
    };

    expect(actions).toEqual([expectedAction]);
  });

  it('should fetch missions with network error', async () => {
    const initialState = { missions: [], reservations: {} };
    const store = mockStore(initialState);

    // Mocking a network error using 'nock'
    nock('https://api.spacexdata.com')
      .get('/v3/missions')
      .reply(500, 'Internal Server Error');

    try {
      await store.dispatch(fetchMissions());
    } catch (error) {
      const actions = store.getActions();

      expect(actions[0].type).toEqual('missions/fetchMissions/pending');
      expect(actions[1].type).toEqual('missions/fetchMissions/rejected');
      expect(actions[1].error.message).toEqual('Network response was not ok');
    }
  });

  it('should select all missions', () => {
    const state = { missions: { missions: [{ id: '1' }, { id: '2' }] } };
    const selectedMissions = selectAllMissions(state);
    expect(selectedMissions).toEqual([{ id: '1' }, { id: '2' }]);
  });

  it('should select mission reservations', () => {
    const state = { missions: { reservations: { 123: true, 456: false } } };
    const missionReservations = selectMissionReservations(state);
    expect(missionReservations).toEqual({ 123: true, 456: false });
  });
});
