import configureStore from 'redux-mock-store';
import '@testing-library/jest-dom/extend-expect';
import RocketList from '../Rockets';
import Profile from '../MyProfile';
import { reserveRocket } from '../../redux/rockets/rocketsSlice';

const mockStore = configureStore([]);

describe('RocketList Component', () => {
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
