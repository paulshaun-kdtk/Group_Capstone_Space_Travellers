import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchRockets, selectAllRockets, selectReservations, reserveRocket, cancelReservation,
} from '../redux/rockets/rocketsSlice';
import Header from './navigation/Header';

function RocketList() {
  const dispatch = useDispatch();
  const rockets = useSelector(selectAllRockets);
  const reservations = useSelector(selectReservations);

  useEffect(() => {
    dispatch(fetchRockets());
  }, [dispatch]);

  const toggleReservation = (rocketId) => {
    if (reservations[rocketId]) {
      dispatch(cancelReservation({ rocketId }));
    } else {
      dispatch(reserveRocket({ rocketId }));
    }
  };

  return (
    <div>
      <Header />
      {rockets.map((rocket) => (
        <div key={rocket.id}>
          {rocket.flickr_images.length > 0 && (
            <img
              key={rocket.flickr_images[0]}
              src={rocket.flickr_images[0]}
              alt={`Rocket ${rocket.name} 0`}
            />
          )}
          <h2>{rocket.name}</h2>
          <p>{rocket.description}</p>
          {reservations[rocket.id] ? (
            <button type="button" onClick={() => toggleReservation(rocket.id)}>Cancel Reservation</button>
          ) : (
            <button type="button" onClick={() => toggleReservation(rocket.id)}>Reserve Rocket</button>
          )}
        </div>
      ))}
    </div>
  );
}

export default RocketList;
