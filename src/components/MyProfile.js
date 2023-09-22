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

  const reservedRockets = allRocketReservations.filter((rocket) => rocketReservations[rocket.id]);

  const reservedMissions = allMissionReservations.filter((mission) => missionReservations[mission.mission_id]);

  return (
    <div>
      <Header />
      <div className="profile-outer">
        <div className="filtered-missions">
          <h2>My Missions</h2>
          <div className="mission-names">
            <ul className="each-mission-name">
              {reservedMissions.map((mission) => (
                <li key={mission.id}>{mission.mission_name}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="filtered-rockets">
          <h2>My Rockets</h2>
          <div className="rocket-names">
            <ul className="each-rocket-name">
              {reservedRockets.map((rocket) => (
                <li key={rocket.id}>{rocket.name}</li>
              ))}
            </ul>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Profile;
