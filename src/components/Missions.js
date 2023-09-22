import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchMissions,
  selectAllMissions,
  selectMissionReservations,
  reserveMission,
  cancelMissionReservation,
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
              <th className="mission-column">Action</th>
            </tr>
          </thead>
          <tbody className="missions-body">
            {missions.map((mission) => (
              <tr className="each-mission" key={mission.mission_id}>
                <td>{mission.mission_name}</td>
                <td>{mission.description}</td>
                <td>
                  <span className={missionReservations[mission.mission_id] ? 'active-member' : 'not-a-member'}>
                    {missionReservations[mission.mission_id] ? 'Active Member' : 'NOT A MEMBER'}
                  </span>
                </td>
                <td>
                  <button
                    className={missionReservations[mission.mission_id] ? 'leave-mission' : 'join-mission'}
                    type="button"
                    onClick={() => toggleMissionReservation(mission.mission_id)}
                  >
                    {missionReservations[mission.mission_id] ? 'Leave Mission' : 'Join Mission'}
                  </button>
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
