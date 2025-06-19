import { FaClock, FaDollarSign } from "react-icons/fa";
import { MdCategory } from "react-icons/md";
import { Link } from "react-router";

const FeaturedTasks = ({ featuredTasks }) => {
  return (
    <section>
      <h2 className="text-3xl font-bold text-center mb-8 libre-baskerville">
        Featured Tasks
      </h2>
      {featuredTasks.length === 0 ? (
        <p className="text-center text-gray-500 text-2xl my-16">No tasks found.</p>
      
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredTasks.map((task) => (
            <article
              key={task._id}
              className="card bg-base-200 shadow-2xl hover:shadow-xl transition-shadow duration-300 rounded-xl"
            >
              <div className="card-body flex flex-col">
                <h3 className="card-title mb-2">{task.title}</h3>
                <p className="text-sm flex-grow">
                  {task.description.length > 150
                    ? task.description.slice(0, 150) + "..."
                    : task.description}
                </p>

                <div className="mt-4 space-y-2 text-sm">
                  <p className="flex items-center gap-2">
                    <MdCategory /> <strong>Category:</strong> {task.category}
                  </p>
                  <p className="flex items-center gap-2">
                    <FaClock /> <strong>Deadline:</strong>{" "}
                    {formatDate(task.deadline)}
                  </p>
                  <p className="flex items-center gap-2">
                    <FaDollarSign /> <strong>Budget:</strong> $
                    {task.budget.toLocaleString()}
                  </p>
                </div>

                <div className="mt-6 card-actions justify-end">
                  <Link
                    to={`/tasks/${task._id}`}
                    className="btn btn-outline btn-sm"
                    aria-label={`See details of task: ${task.title}`}
                  >
                    See Details
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
};

function formatDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default FeaturedTasks;
