import { useState } from "react";
import { useLoaderData } from "react-router";
import Swal from "sweetalert2";

const TaskDetails = () => {
  const task = useLoaderData();
  const {
    _id,
    title,
    category,
    description,
    deadline,
    budget,
    userName,
    userEmail,
    bidsCount = 0,
  } = task;

  const [bids, setBids] = useState(bidsCount);
  const [isBidding, setIsBidding] = useState(false);

  const handleBid = async () => {
    if (isBidding) return;

    setIsBidding(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/tasks/bid/${_id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
      });

      const result = await res.json();
      if (result.modifiedCount > 0 || result.acknowledged) {
        setBids((prev) => prev + 1);
        Swal.fire({
          icon: "success",
          title: "Bid Placed",
          text: "You have successfully bid on this task.",
          timer: 1500,
          showConfirmButton: false,
        });
      } else {
        throw new Error("Your bid could not be recorded.");
      }
    } catch (err) {
      Swal.fire("Error", err.message, "error");
    } finally {
      setIsBidding(false);
    }
  };

  return (
    <section>
      <div className="bg-base-200 shadow-2xl rounded-xl p-8">
        <h1 className="text-4xl font-bold text-center mb-12 libre-baskerville">
          {title}
        </h1>

        {/* Meta Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-base-content text-[1rem]">
          <p>
            <strong>📁 Category:</strong> {category}
          </p>
          <p>
            <strong>📅 Deadline:</strong>{" "}
            {new Date(deadline).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
          <p>
            <strong>💰 Budget:</strong> ${budget}
          </p>
          <p>
            <strong>👤 Posted By:</strong> {userName} ({userEmail})
          </p>
          <p className="md:col-span-2 text-lg font-semibold text-info">
            You bid for {bids} {bids < 2 ? "opportunity" : "opportunities"}
          </p>
        </div>

        {/* Description */}
        <div className="mt-10">
          <h2 className="text-2xl font-semibold mb-4">📝 Task Description</h2>
          <div className="bg-base-200 border border-base-300 rounded-lg p-6 leading-relaxed text-base whitespace-pre-wrap">
            {description}
          </div>
        </div>

        {/* Bid Button */}
        <div className="mt-10 text-center">
          <button
            onClick={handleBid}
            className="btn btn-outline px-8"
            disabled={isBidding}
          >
            {isBidding ? "Placing Bid..." : "Place a Bid"}
          </button>
        </div>
      </div>
    </section>
  );
};

export default TaskDetails;
