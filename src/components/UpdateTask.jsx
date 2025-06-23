import { useContext, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import Swal from "sweetalert2";
import { AuthContext } from "../contexts/authContext";
import { ScaleLoader } from "react-spinners";

const UpdateTask = () => {
  const { user, initialLoading, actionLoading } = useContext(AuthContext);
  const { id } = useParams();
  const navigate = useNavigate();

  const [task, setTask] = useState(null);
  const [updating, setUpdating] = useState(false);
  const [notFound, setNotFound] = useState(false); // New state for not found

  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    if (!user?.email) return;

    fetch(`${import.meta.env.VITE_BASE_URL}/my-tasks/${id}?userEmail=${user.email}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Task not found or you don't have permission.");
        }
        return res.json();
      })
      .then((data) => {
        if (!data) {
          setNotFound(true);
        } else {
          setTask(data);
        }
      })
      .catch((err) => {
        setNotFound(true);
        Swal.fire("Error", err.message, "error");
      });
  }, [id, user?.email]); // Removed navigate from deps

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);

    const updatedTask = {
      ...Object.fromEntries(formData.entries()),
      userEmail: user?.email,
      userName: user?.displayName,
      budget: parseFloat(formData.get("budget")),
    };

    try {
      setUpdating(true);
      const res = await fetch(`${import.meta.env.VITE_BASE_URL}/my-tasks/${id}?userEmail=${user.email}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedTask),
      });
      const result = await res.json();

      if (res.ok && (result.success || result.modifiedCount > 0)) {
        Swal.fire({
          icon: "success",
          title: "Task Updated",
          text: "Your task has been successfully updated.",
          timer: 1600,
          showConfirmButton: false,
        });
        navigate("/my-tasks");
      } else {
        throw new Error(result.error || "Failed to update task");
      }
    } catch (error) {
      Swal.fire("Error", error.message, "error");
    } finally {
      setUpdating(false);
    }
  };

  if (initialLoading || actionLoading) {
    return (
      <div className="flex items-center justify-center">
        <ScaleLoader />
      </div>
    );
  }

  if (notFound) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="flex flex-col items-center gap-6">
          <div className="text-center text-2xl text-red-600 font-bold">
            Task not found or you don't have permission to edit this task.
          </div>
          <button
            className="btn btn-outline"
            onClick={() => navigate("/my-tasks")}
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  if (!task) {
    return (
      <div className="flex items-center justify-center py-20">
        <ScaleLoader />
      </div>
    );
  }

  return (
    <div className="py-20 px-4 rounded-2xl flex items-center justify-center bg-base-300">
      <div className="w-full max-w-2xl bg-base-100 shadow-xl rounded-xl p-8 space-y-6">
        <h2 className="text-3xl font-bold text-center mb-6 libre-baskerville">
          Edit this Task
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="label font-medium">Task Title</label>
            <input
              name="title"
              type="text"
              placeholder="Enter task title"
              className="input input-bordered w-full"
              defaultValue={task.title}
              required
            />
          </div>

          <div>
            <label className="label font-medium">Category</label>
            <select
              name="category"
              className="select select-bordered w-full"
              defaultValue={task.category}
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
              defaultValue={task.description}
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
                defaultValue={task.deadline}
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
                defaultValue={task.budget}
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
              disabled={updating}
              className="btn btn-outline w-full"
            >
              {updating ? "Updating Task..." : "Update Task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateTask;
