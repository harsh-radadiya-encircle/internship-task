import React, { useEffect, useState } from "react";

const UserCards = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedUser, setSelectedUser] = useState(null);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await fetch(
                "https://jsonplaceholder.typicode.com/users"
            );

            const data = await response.json();

            setUsers(data);
        } catch (error) {
            console.log("Error:", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex justify-center items-center bg-gray-100">
                <h1 className="text-3xl font-bold text-blue-600">
                    Loading Users...
                </h1>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 py-10 px-5">

            <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">
                👥 User Directory
            </h1>

            <div className="max-w-7xl mx-auto grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

                {users.map((user) => (
                    <div
                        key={user.id}
                        className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl hover:-translate-y-2 transition duration-300"
                    >
                        <div className="flex items-center gap-4 mb-4">

                            <div className="w-14 h-14 rounded-full bg-blue-500 text-white flex items-center justify-center text-xl font-bold">
                                {user.name.charAt(0)}
                            </div>

                            <div>
                                <h2 className="text-xl font-bold text-gray-800">
                                    {user.name}
                                </h2>

                                <p className="text-gray-500 text-sm">
                                    @{user.username}
                                </p>
                            </div>
                        </div>

                        <div className="space-y-2 text-gray-600">

                            <p>
                                📧 <span className="font-medium">{user.email}</span>
                            </p>

                            <p>
                                📞 <span className="font-medium">{user.phone}</span>
                            </p>

                            <p>
                                🌐 <span className="font-medium">{user.website}</span>
                            </p>

                            <p>
                                🏢{" "}
                                <span className="font-medium">
                                    {user.company.name}
                                </span>
                            </p>

                            <p>
                                📍{" "}
                                <span className="font-medium">
                                    {user.address.city}
                                </span>
                            </p>
                        </div>

                        <button
                            onClick={() => setSelectedUser(user)}
                            className="w-full mt-5 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                        >
                            View Profile
                        </button>
                    </div>
                ))}

            </div>

                
{
  selectedUser && (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center p-4">
      <div className="bg-white rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">

        <div className="flex justify-between items-center mb-5">
          <h2 className="text-2xl font-bold">
            User Profile
          </h2>

          <button
            onClick={() => setSelectedUser(null)}
            className="bg-red-500 text-white px-3 py-1 rounded"
          >
            X
          </button>
        </div>

        <div className="space-y-3">

          <p>
            <strong>ID:</strong> {selectedUser.id}
          </p>

          <p>
            <strong>Name:</strong> {selectedUser.name}
          </p>

          <p>
            <strong>Username:</strong> {selectedUser.username}
          </p>

          <p>
            <strong>Email:</strong> {selectedUser.email}
          </p>

          <p>
            <strong>Phone:</strong> {selectedUser.phone}
          </p>

          <p>
            <strong>Website:</strong> {selectedUser.website}
          </p>

          <hr />

          <h3 className="font-bold text-lg">
            Address
          </h3>

          <p>
            <strong>Street:</strong> {selectedUser.address.street}
          </p>

          <p>
            <strong>Suite:</strong> {selectedUser.address.suite}
          </p>

          <p>
            <strong>City:</strong> {selectedUser.address.city}
          </p>

          <p>
            <strong>Zip Code:</strong> {selectedUser.address.zipcode}
          </p>

          <p>
            <strong>Latitude:</strong> {selectedUser.address.geo.lat}
          </p>

          <p>
            <strong>Longitude:</strong> {selectedUser.address.geo.lng}
          </p>

          <hr />

          <h3 className="font-bold text-lg">
            Company
          </h3>

          <p>
            <strong>Name:</strong> {selectedUser.company.name}
          </p>

          <p>
            <strong>Catch Phrase:</strong>{" "}
            {selectedUser.company.catchPhrase}
          </p>

          <p>
            <strong>Business:</strong>{" "}
            {selectedUser.company.bs}
          </p>

        </div>
      </div>
    </div>
  )
}

        </div>
    );
};

export default UserCards;

