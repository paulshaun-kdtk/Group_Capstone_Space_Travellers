import React from 'react';
import { useSelector } from 'react-redux';
import {
  selectAllRockets as selectAllRocketReservations,
  selectReservations as selectRocketReservations,
} from '../Redux/rockets/rocketsSlice';
import {
  selectAllMissions as selectAllMissionReservations,
  selectMissionReservations,
} from '../Redux/missions/missionsSLice';
import Header from './navigation/Header';

const Profile = () => {
  const rocketReservations = useSelector(selectRocketReservations);
  const missionReservations = useSelector(selectMissionReservations);
  const allRocketReservations = useSelector(selectAllRocketReservations);
  const allMissionReservations = useSelector(selectAllMissionReservations);

  // Combine and filter the rockets and missions based on reservation status
  const reservedRockets = allRocketReservations.filter((rocket) => rocketReservations[rocket.id]);

  const reservedMissions = allMissionReservations.filter((mission) => missionReservations[mission.mission_id]);

  return (
    <div>
      <Header />
      <h2>Reserved Rockets:</h2>
      <ul>
        {reservedRockets.map((rocket) => (
          <li key={rocket.id}>{rocket.name}</li>
        ))}
      </ul>

      <h2>Reserved Missions:</h2>
      <ul>
        {reservedMissions.map((mission) => (
          <li key={mission.id}>{mission.mission_name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Profile;
