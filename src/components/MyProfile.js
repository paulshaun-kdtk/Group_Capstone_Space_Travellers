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
          {reservedMissions.length === 0 ? (
            <div className="each-mission-name">
              No current missions
            </div>
          ) : (
            <div className="mission-names">
              {reservedMissions.map((mission) => (
                <div className="each-mission-name" key={mission.id}>{mission.mission_name}</div>
              ))}
            </div>
          )}
        </div>
        <div className="filtered-rockets">
          <h2>My Rockets</h2>
          {reservedRockets.length === 0 ? (
            <div className="each-rocket-name">
              No rockets reserved
            </div>
          ) : (
            <div className="rocket-names">
              {reservedRockets.map((rocket) => (
                <div className="each-rocket-name" key={rocket.id}>{rocket.name}</div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Profile;
