import React from "react";
import { useNavigate } from "react-router-dom";
// import api from "../api/api";
// import { useUserContext } from "../../context/AuthContext";

const CatalogPage: React.FC = () => {
  // const { user } = useUserContext();
  // const [catalog, setCatalog] = useState<{ id: string; name: string }[]>([]);
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (user) {
  //     api.getCatalog().then((data) => setCatalog(data));
  //   }
  // }, [user]);

  return (
    <div className="text-center mt-4">
      <h2 className="text-xl font-bold">Каталог</h2>
      {/* {catalog.length > 0 ? (
        <ul className="mt-4 space-y-2">
          {catalog.map((item) => (
            <li key={item.id}>{item.name}</li>
          ))}
        </ul>
      ) : (
        <p>Заглушка для раздела "Каталог"</p>
      )} */}
      <button
        className="mt-4 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-200"
        onClick={() => navigate("/welcome")}
      >
        Назад
      </button>
    </div>
  );
};

export default CatalogPage;
