import configureStore from 'redux-mock-store';
import '@testing-library/jest-dom/extend-expect';
import Missions from '../Missions';
import { reserveMission } from '../../redux/missions/missionsSlice';
import { reserveRocket } from '../../redux/rockets/rocketsSlice';

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
  it('should reserve a rocket', () => {
    const store = mockStore({
      rockets: {
        rockets: [],
        reservations: {},
        status: 'idle',
        error: null,
      },
    });

    store.dispatch(reserveRocket({ rocketId: 1 }));

    const newState = store.getState();
    expect(newState.rockets.reservations[1]).toBe(undefined);
  });
});
