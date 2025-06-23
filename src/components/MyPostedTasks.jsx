import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import { AuthContext } from "../contexts/authContext";
import { ScaleLoader } from "react-spinners";
import { MdDelete } from "react-icons/md";
import { FaBullhorn, FaEdit } from "react-icons/fa";

function formatDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

const MyPostedTasks = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;

    const fetchMyTasks = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/my-tasks?userEmail=${user.email}`
        );
        const data = await res.json();
        setTasks(data);
      } catch (err) {
        console.error("Failed to fetch tasks:", err);
        Swal.fire("Error", "Failed to load your tasks", "error");
      } finally {
        setLoading(false);
      }
    };

    fetchMyTasks();
  }, [user]);

  const handleDelete = async (taskId) => {
    const confirmed = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#e53e3e",
      cancelButtonColor: "#3182ce",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirmed.isConfirmed) {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/my-tasks/${taskId}`, {
          method: "DELETE",
        });
        const result = await res.json();
        if (result.success) {
          setTasks(tasks.filter((task) => task._id !== taskId));
          Swal.fire("Deleted!", "Your task has been deleted.", "success");
        } else {
          throw new Error("Failed to delete");
        }
      } catch (err) {
        Swal.fire("Error", err.message, "error");
      }
    }
  };

  if (user && loading) {
    return (
      <div className="flex justify-center items-center py-28">
        <ScaleLoader height={40} />
      </div>
    );
  }

  if (!user) {
    return (
      <p className="text-center py-20 text-lg text-gray-500">
        Please log in to see your tasks.
      </p>
    );
  }

  if (tasks.length === 0) {
    return (
      <p className="text-center py-20 text-2xl font-semibold text-gray-500">
        You have not posted any tasks yet. Start by adding a new task!
        <br />
        <button
          onClick={() => navigate("/add-task")}
          className="btn btn-outline mt-8"
          title="Add Task"
          aria-label="Add Task"
        >
          Add Task
        </button>
      </p>
    );
  }

  return (
    <section className="container mx-auto">
      <h2 className="text-4xl font-bold text-center mb-12 libre-baskerville">
        My Posted Tasks
      </h2>

      {/* Mobile Layout (Cards) */}
      <div className="space-y-4 lg:hidden">
        {tasks.map(({ _id, title, category, deadline, budget, bidsCount }) => (
          <div
            key={_id}
            className="rounded-xl p-4 shadow-sm space-y-2 bg-base-300"
          >
            <p className="text-lg font-semibold">{title}</p>
            <p className="text-sm text-gray-700">
              <strong>Category:</strong> {category}
            </p>
            <p className="text-sm text-gray-700">
              <strong>Deadline:</strong> {formatDate(deadline)}
            </p>
            <p className="text-sm text-gray-700">
              <strong>Budget:</strong> ${budget.toLocaleString()}
            </p>
            <div className="flex gap-2 justify-end pt-2">
              <button
                onClick={() => navigate(`/update-task/${_id}`)}
                title="Edit"
                className="hover:cursor-pointer flex items-center gap-1 px-3 py-1 text-xs bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              >
                <FaEdit /> Edit
              </button>
              <button
                onClick={() => handleDelete(_id)}
                title="Delete"
                className="hover:cursor-pointer flex items-center gap-1 px-3 py-1 text-xs bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                <MdDelete /> Delete
              </button>

              <div
                className="tooltip"
                data-tip={`Bids: ${bidsCount ? bidsCount : 0}`}
              >
                <button
                  title="Bids"
                  className="hover:cursor-pointer flex items-center gap-1 px-3 py-1 text-xs bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
                >
                  <FaBullhorn /> Bids
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop/Table Layout */}
      <div className="overflow-x-auto rounded-lg shadow-md border border-gray-200 hidden lg:block">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wide">
                Title
              </th>
              <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wide">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wide">
                Deadline
              </th>
              <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wide">
                Budget
              </th>
              <th className="px-6 py-3 text-center text-xs font-bold uppercase tracking-wide">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {tasks.map(({ _id, title, category, deadline, budget, bidsCount }) => (
              <tr
                key={_id}
              >
                <td className="px-6 py-4 whitespace-nowrap font-semibold text-sm max-w-xs truncate">
                  {title}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {category}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {formatDate(deadline)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  ${budget.toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center space-x-2">
                  <button
                    onClick={() => navigate(`/update-task/${_id}`)}
                    title="Edit"
                    className="hover:cursor-pointer inline-flex items-center space-x-1 rounded-md px-3 py-1 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold"
                  >
                    <FaEdit />
                    <span className="hidden sm:inline">Edit</span>
                  </button>
                  <button
                    onClick={() => handleDelete(_id)}
                    title="Delete"
                    className="hover:cursor-pointer inline-flex items-center space-x-1 rounded-md px-3 py-1 bg-red-600 hover:bg-red-700 text-white text-xs font-semibold"
                  >
                    <MdDelete />
                    <span className="hidden sm:inline">Delete</span>
                  </button>

                  <div
                    className="tooltip"
                    data-tip={`Bids: ${bidsCount ? bidsCount : 0}`}
                  >
                    <button
                      title="Bids"
                      className="hover:cursor-pointer inline-flex items-center space-x-1 rounded-md px-3 py-1 bg-yellow-500 hover:bg-yellow-600 text-white text-xs font-semibold"
                    >
                      <FaBullhorn />
                      <span className="hidden sm:inline">Bids</span>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default MyPostedTasks;
