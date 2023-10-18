import { useEffect, useState } from "react";
import "./index.css";

const Users = () => {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetch(
          `https://jsonplaceholder.typicode.com/users`
        );
        const users = await result.json();
        setUserData(users);
      } catch (error) {
        console.log(error);
        setUserData([]);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <div className="card-container">
        {userData.map((user) => {
          return (
            <div className="card">
              <h2>{user?.name}</h2>
              <p>Company: {user?.company?.name}</p>
              <p>
                Address: {`${user?.address?.street} - ${user?.address?.city}`}
              </p>
              <p>Phone: {user?.phone}</p>
            </div>
          );
        })}
      </div>
    </>
  );
};
export default Users;
