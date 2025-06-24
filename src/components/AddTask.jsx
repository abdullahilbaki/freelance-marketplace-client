import { useContext, useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import { AuthContext } from "../contexts/authContext";

const AddTask = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("Must be used within an AuthProvider");
  }

  const { user, getIdToken } = context;
  const today = new Date().toISOString().split("T")[0];
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const newTask = {
      ...Object.fromEntries(formData.entries()),
      userEmail: user?.email,
      userName: user?.displayName,
    };

    try {
      setLoading(true);
      const token = await getIdToken();
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/tasks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newTask),
      });
      const result = await res.json();

      if (result.insertedId || result.success) {
        Swal.fire({
          icon: "success",
          title: "Task Posted",
          text: "Your task has been successfully added.",
          timer: 1600,
          showConfirmButton: false,
        });
        form.reset();
        navigate("/my-tasks");
      } else {
        throw new Error("Server error: Task not saved");
      }
    } catch (err) {
      Swal.fire("Error", err.message, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-20 px-4 rounded-2xl flex items-center justify-center bg-base-300">
      <div className="w-full max-w-2xl bg-base-100 shadow-xl rounded-xl p-8 space-y-6">
        <h2 className="text-3xl font-bold text-center mb-6 libre-baskerville">
          Add a New Task
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="label font-medium">Task Title</label>
            <input
              name="title"
              type="text"
              placeholder="Enter task title"
              className="input input-bordered w-full"
              required
            />
          </div>

          <div>
            <label className="label font-medium">Category</label>
            <select
              name="category"
              className="select select-bordered w-full"
              required
            >
              <option value="">Choose a category</option>
              <option>Web Development</option>
              <option>Mobile App Development</option>
              <option>UI/UX Design</option>
              <option>Graphic Design</option>
              <option>Content Writing</option>
              <option>Technical Writing</option>
              <option>Marketing</option>
              <option>SEO</option>
              <option>Social Media Management</option>
              <option>Video Editing</option>
              <option>Translation</option>
              <option>Voice Over</option>
              <option>Data Entry</option>
              <option>Virtual Assistant</option>
              <option>Customer Support</option>
              <option>Business Strategy</option>
              <option>Legal Consulting</option>
              <option>Finance & Accounting</option>
              <option>eCommerce Management</option>
              <option>Game Development</option>
              <option>Cybersecurity</option>
              <option>Machine Learning</option>
              <option>AI & Automation</option>
            </select>
          </div>

          <div>
            <label className="label font-medium">Description</label>
            <textarea
              name="description"
              placeholder="Briefly describe what needs to be done"
              className="textarea textarea-bordered w-full h-28"
              required
            ></textarea>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label className="label font-medium">Deadline</label>
              <input
                name="deadline"
                type="date"
                min={today}
                className="input input-bordered w-full"
                required
              />
            </div>
            <div className="flex-1">
              <label className="label font-medium">Budget ($)</label>
              <input
                name="budget"
                type="number"
                min="1"
                placeholder="e.g. 100"
                className="input input-bordered w-full"
                required
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label className="label font-medium">Your Name</label>
              <input
                type="text"
                defaultValue={user?.displayName}
                readOnly
                className="input input-bordered w-full bg-gray-100"
              />
            </div>
            <div className="flex-1">
              <label className="label font-medium">Your Email</label>
              <input
                type="email"
                defaultValue={user?.email}
                readOnly
                className="input input-bordered w-full bg-gray-100"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="btn btn-outline w-full"
            >
              {loading ? "Posting Task..." : "Add Task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTask;
