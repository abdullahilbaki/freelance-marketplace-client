import React, { useState, useMemo } from "react";
import { Link, useLoaderData } from "react-router";
import { FaClock, FaDollarSign } from "react-icons/fa";
import { MdCategory } from "react-icons/md";

function formatDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

const BrowseTasks = () => {
  const tasks = useLoaderData();

  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [sortByDeadline, setSortByDeadline] = useState(true);

  // Unique categories for filter dropdown
  const categories = useMemo(() => {
    const cats = new Set(tasks.map((t) => t.category));
    return Array.from(cats).sort();
  }, [tasks]);

  // Filtered & sorted tasks
  const filteredTasks = useMemo(() => {
    let filtered = tasks;

    if (categoryFilter) {
      filtered = filtered.filter((t) => t.category === categoryFilter);
    }
    if (search) {
      const s = search.toLowerCase();
      filtered = filtered.filter(
        (t) =>
          t.title.toLowerCase().includes(s) ||
          t.description.toLowerCase().includes(s)
      );
    }
    if (sortByDeadline) {
      filtered = filtered
        .slice()
        .sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
    }

    return filtered;
  }, [tasks, categoryFilter, search, sortByDeadline]);

  return (
    <div>
      <h2 className="text-4xl font-bold text-center mb-12 libre-baskerville">
        Browse Tasks
      </h2>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-8">
        <input
          type="search"
          placeholder="Search tasks..."
          className="input input-bordered max-w-xs"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          aria-label="Search tasks"
        />
        <select
          className="select select-bordered max-w-xs"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          aria-label="Filter by category"
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <label className="flex items-center gap-2 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={sortByDeadline}
            onChange={() => setSortByDeadline((v) => !v)}
            className="checkbox checkbox-neutral"
          />
          <span className="text-sm">Sort by Deadline</span>
        </label>
      </div>

      {/* No results */}
      {filteredTasks.length === 0 ? (
        <p className="text-center text-gray-500 text-2xl my-10">
          No tasks found.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTasks.map((task) => (
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
    </div>
  );
};

export default BrowseTasks;
