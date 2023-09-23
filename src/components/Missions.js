import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchMissions, selectAllMissions, selectMissionReservations, reserveMission, cancelMissionReservation,
} from '../redux/missions/missionsSlice';
import Header from './navigation/Header';

function Missions() {
  const dispatch = useDispatch();
  const missions = useSelector(selectAllMissions);
  const missionReservations = useSelector(selectMissionReservations);

  useEffect(() => {
    dispatch(fetchMissions());
  }, [dispatch]);

  const toggleMissionReservation = (missionId) => {
    if (missionReservations[missionId]) {
      dispatch(cancelMissionReservation({ missionId }));
    } else {
      dispatch(reserveMission({ missionId }));
    }
  };

  return (
    <div>
      <Header />
      {missions.map((mission) => (
        <div key={mission.mission_id}>
          <h2>{mission.mission_name}</h2>
          <p>{mission.description}</p>
          {missionReservations[mission.mission_id] ? (
            <div>
              <span>Active Member</span>
              <button type="button" onClick={() => toggleMissionReservation(mission.mission_id)}>Cancel Reservation</button>
            </div>
          ) : (
            <div>
              <span>Not A Member</span>
              <button type="button" onClick={() => toggleMissionReservation(mission.mission_id)}>Make A Reservation</button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default Missions;
