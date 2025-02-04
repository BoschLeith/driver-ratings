import { ChangeEvent, FormEvent, useState } from 'react';

import { Race } from '../../../types/Race';
import axiosInstance from '../../../api/axios';

interface RacesTableProps {
  races: Race[];
  error?: string | null;
}

const RacesTable = ({ races, error }: RacesTableProps) => {
  const [editRace, setEditRace] = useState<Race | null>(null);

  const openEditModal = (race: Race) => {
    setEditRace(race);
    (
      document.getElementById('editRaceModal') as HTMLDialogElement
    )?.showModal();
  };

  const closeModal = () => {
    (document.getElementById('editRaceModal') as HTMLDialogElement)?.close();
    setEditRace(null);
  };

  const handleEditChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (editRace) {
      const { name, value } = e.target;
      setEditRace({ ...editRace, [name]: value });
    }
  };

  const handleEditRace = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (editRace) {
      await axiosInstance.put(`/races/${editRace.id}`, editRace);
      closeModal();
    }
  };

  return (
    <div>
      {error && <p className="text-red-500">{error}</p>}
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Date</th>
            <th>Created At</th>
            <th>Updated At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {races.map((race) => (
            <tr key={race.id}>
              <td>{race.id}</td>
              <td>{race.name}</td>
              <td>{new Date(race.date).toDateString()}</td>
              <td>{new Date(race.createdAt).toLocaleString()}</td>
              <td>
                {race.updatedAt
                  ? new Date(race.updatedAt).toLocaleString()
                  : 'N/A'}
              </td>
              <td>
                <button className="btn" onClick={() => openEditModal(race)}>
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Edit Race Modal */}
      <dialog id="editRaceModal" className="modal">
        <div className="modal-box">
          <h3 className="text-lg font-bold">Edit Race</h3>
          {editRace && (
            <form className="" onSubmit={handleEditRace}>
              <input
                type="text"
                name="name"
                value={editRace.name}
                onChange={handleEditChange}
                required
                className="input input-bordered w-full"
              />
              <input
                type="date"
                name="date"
                value={editRace.date}
                onChange={handleEditChange}
                required
                className="input input-bordered w-full"
              />
              <div className="modal-action">
                <button type="submit" className="btn">
                  Save Changes
                </button>
                <button type="button" className="btn" onClick={closeModal}>
                  Close
                </button>
              </div>
            </form>
          )}
        </div>
      </dialog>
    </div>
  );
};

export default RacesTable;
