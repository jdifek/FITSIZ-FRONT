import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api, { type masksType } from '../api/api';
import { useUserContext } from '../../context/AuthContext';

const MaskPage: React.FC = () => {
  const { user } = useUserContext();
  const [masks, setMasks] = useState<masksType[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      api.getMasks().then((data) => setMasks(data));
    }
  }, [user]);

  return (
    <div className="text-center mt-4">
      <h2 className="text-xl font-bold">Мои маски</h2>
      {masks.length > 0 ? (
        <ul className="mt-4 space-y-2">
          {masks.map((mask) => (
            <li key={mask.id}>{mask.name}</li>
          ))}
        </ul>
      ) : (
        <p>Заглушка для раздела "Моя маска"</p>
      )}
      <button
        className="mt-4 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-200"
        onClick={() => navigate('/welcome')}
      >
        Назад
      </button>
    </div>
  );
};

export default MaskPage;