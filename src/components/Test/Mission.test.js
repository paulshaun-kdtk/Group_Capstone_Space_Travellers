import configureStore from 'redux-mock-store';
import '@testing-library/jest-dom/extend-expect';
import Missions from '../Missions';
import { reserveMission } from '../../redux/missions/missionsSlice';

const mockStore = configureStore([]);

describe('Missions Component', () => {
  it('should reserve a mission', () => {
    const store = mockStore({
      missions: {
        missions: [],
        reservations: {},
        status: 'idle',
        error: null,
      },
    });

    store.dispatch(reserveMission({ rocketId: 1 }));

    const newState = store.getState();
    expect(newState.missions.reservations[1]).toBe(undefined);
  });
});
