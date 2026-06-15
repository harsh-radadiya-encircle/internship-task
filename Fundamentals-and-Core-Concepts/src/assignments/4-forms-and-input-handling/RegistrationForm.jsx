import React, { useState } from "react";

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    gender: "",
    skills: [],
  });

  const [submittedData, setSubmittedData] = useState(null);

  // Handle Input Change
const handleChange = (e)=> {
    const {name , value} = e.target;

    setFormData({
        ...formData,
        [name]:value,
    })
}

  // Handle Skills Checkbox
  const handleSkillChange = (e) => {
    const { value, checked } = e.target;

    if (checked) {
      setFormData({
        ...formData,
        skills: [...formData.skills, value],
      });
    } else {
      setFormData({
        ...formData,
        skills: formData.skills.filter(
          (skill) => skill !== value
        ),
      });
    }
  };

  // Form Submit
  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.gender
    ) {
      alert("Please fill all fields");
      return;
    }

    if (formData.password.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }

    setSubmittedData(formData);

    setFormData({
      name: "",
      email: "",
      password: "",
      gender: "",
      skills: [],
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-5">
      <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-md">

        <h1 className="text-3xl font-bold text-center mb-6">
          Registration Form
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Name */}
          <input
            type="text"
            name="name"
            placeholder="Enter Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          />

          {/* Email */}
          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          />

          {/* Password */}
          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          />

          {/* Gender */}
          <div>
            <h3 className="font-semibold mb-2">
              Gender
            </h3>

            <label className="mr-4">
              <input
                type="radio"
                name="gender"
                value="Male"
                checked={formData.gender === "Male"}
                onChange={handleChange}
              />
              <span className="ml-1">Male</span>
            </label>

            <label>
              <input
                type="radio"
                name="gender"
                value="Female"
                checked={formData.gender === "Female"}
                onChange={handleChange}
              />
              <span className="ml-1">Female</span>
            </label>
          </div>

          {/* Skills */}
          <div>
            <h3 className="font-semibold mb-2">
              Skills
            </h3>

            <label className="block">
              <input
                type="checkbox"
                value="HTML"
                checked={formData.skills.includes("HTML")}
                onChange={handleSkillChange}
              />
              <span className="ml-2">HTML</span>
            </label>

            <label className="block">
              <input
                type="checkbox"
                value="CSS"
                checked={formData.skills.includes("CSS")}
                onChange={handleSkillChange}
              />
              <span className="ml-2">CSS</span>
            </label>

            <label className="block">
              <input
                type="checkbox"
                value="JavaScript"
                checked={formData.skills.includes("JavaScript")}
                onChange={handleSkillChange}
              />
              <span className="ml-2">JavaScript</span>
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
          >
            Register
          </button>

        </form>

        {/* Display Submitted Data */}

        {submittedData && (
          <div className="mt-6 border-t pt-4">

            <h2 className="text-xl font-bold mb-3">
              Submitted Data
            </h2>

            <p>
              <strong>Name:</strong> {submittedData.name}
            </p>

            <p>
              <strong>Email:</strong> {submittedData.email}
            </p>

            <p>
              <strong>Password:</strong> {submittedData.password}
            </p>

            <p>
              <strong>Gender:</strong> {submittedData.gender}
            </p>

            <p>
              <strong>Skills:</strong>{" "}
              {submittedData.skills.join(", ")}
            </p>

          </div>
        )}
      </div>
    </div>
  );
};

export default RegistrationForm;