import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchMissions, selectAllMissions, selectMissionReservations, reserveMission, cancelMissionReservation,
} from '../Redux/missions/missionsSLice';
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
      <div className="mission-outer">
        <table className="mission-table">
          <thead className="missions-heading">
            <tr className="column-names">
              <th className="mission-column">Mission</th>
              <th className="mission-column">Description</th>
              <th className="mission-column">Status</th>
            </tr>
          </thead>
          <tbody className="missions-body">
            {missions.map((mission) => (
              <tr className="each-mission" key={mission.mission_id}>
                <td>{mission.mission_name}</td>
                <td>{mission.description}</td>
                <td>
                  {missionReservations[mission.mission_id] ? (
                    <div>
                      <span className="active-member">Active Member</span>
                      <button type="button" className="leave-mission" onClick={() => toggleMissionReservation(mission.mission_id)}>Leave Mission</button>
                    </div>
                  ) : (
                    <div>
                      <span className="not-a-member">Not A Member</span>
                      <button type="button" className="join-mission" onClick={() => toggleMissionReservation(mission.mission_id)}>Join Mission</button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default Missions;
