import React from "react";
import { Fade } from "react-awesome-reveal";

const FAQSection = () => {
  return (
    <div className="bg-base-300 rounded-2xl">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-10 libre-baskerville">
          Frequently Asked Questions
        </h2>

        <Fade cascade damping={0.1}>
          <div className="space-y-4">
            {/* 1 */}
            <div className="collapse collapse-arrow bg-base-200">
              <input type="checkbox" />
              <div className="collapse-title text-xl font-medium">
                How do I post a task?
              </div>
              <div className="collapse-content">
                <p>
                  After logging in, simply click on the "Add Task" button in the
                  navigation bar. You’ll be taken to a form where you can enter
                  the task title, description, category, deadline, and budget.
                  Your name and email will be auto-filled from your profile.
                </p>
                <p className="mt-2">
                  Once submitted, your task will be visible on the "Browse
                  Tasks" page for freelancers to bid on.
                </p>
              </div>
            </div>

            {/* 2 */}
            <div className="collapse collapse-arrow bg-base-200">
              <input type="checkbox" />
              <div className="collapse-title text-xl font-medium">
                Is there any cost to use this platform?
              </div>
              <div className="collapse-content">
                <p>
                  No, the platform is completely free to use. You can post
                  tasks, browse listings, and bid on tasks without paying any
                  fee. In the future, we may introduce premium features or
                  verified accounts, but basic usage will always remain free.
                </p>
              </div>
            </div>

            {/* 3 */}
            <div className="collapse collapse-arrow bg-base-200">
              <input type="checkbox" />
              <div className="collapse-title text-xl font-medium">
                What happens after I submit a bid?
              </div>
              <div className="collapse-content">
                <p>
                  Your bid is stored in the database and linked to the task. The
                  task poster will see your bid count and may review your
                  profile, task history, and credentials before deciding to
                  contact or hire you. There is currently no in-app messaging,
                  so make sure your bid includes clear details.
                </p>
              </div>
            </div>

            {/* 4 */}
            <div className="collapse collapse-arrow bg-base-200">
              <input type="checkbox" />
              <div className="collapse-title text-xl font-medium">
                Can I update or delete my posted task?
              </div>
              <div className="collapse-content">
                <p>
                  Yes. Navigate to the "My Posted Tasks" page. Each task you
                  have posted will have "Update" and "Delete" buttons. You can
                  edit any of the details, except your name and email. Deleting
                  a task will prompt a confirmation to prevent accidental
                  deletion.
                </p>
              </div>
            </div>

            {/* 5 */}
            <div className="collapse collapse-arrow bg-base-200">
              <input type="checkbox" />
              <div className="collapse-title text-xl font-medium">
                Why do I need to log in to access some pages?
              </div>
              <div className="collapse-content">
                <p>
                  To protect your personal data and ensure only authenticated
                  users can add or manage tasks, certain routes (e.g., Add Task,
                  My Posted Tasks, Task Details) are private. This also helps
                  prevent spam or malicious submissions.
                </p>
              </div>
            </div>

            {/* 6 */}
            <div className="collapse collapse-arrow bg-base-200">
              <input type="checkbox" />
              <div className="collapse-title text-xl font-medium">
                Is my personal data secure?
              </div>
              <div className="collapse-content">
                <p>
                  Yes. We use Firebase Authentication for secure login and
                  registration. Your credentials are never stored directly on
                  our servers. Also, sensitive backend configurations (like
                  database URLs or API keys) are stored in `.env` files to
                  prevent exposure.
                </p>
                <p className="mt-2">
                  We do not share your email or photoURL with third parties, and
                  all task data is protected by access control.
                </p>
              </div>
            </div>

            {/* 7 */}
            <div className="collapse collapse-arrow bg-base-200">
              <input type="checkbox" />
              <div className="collapse-title text-xl font-medium">
                Can I use a social login like Google?
              </div>
              <div className="collapse-content">
                <p>
                  Absolutely! Both login and registration pages allow you to
                  sign in using your Google account. It simplifies the process
                  by auto-filling your name, email, and profile photo, saving
                  you time.
                </p>
              </div>
            </div>

            {/* 8 */}
            <div className="collapse collapse-arrow bg-base-200">
              <input type="checkbox" />
              <div className="collapse-title text-xl font-medium">
                How can I see who bid on my task?
              </div>
              <div className="collapse-content">
                <p>
                  On the "My Posted Tasks" page, each task has a "Bids" button.
                  Clicking it will show the number of bids received. This helps
                  you track engagement and choose the best freelancer for the
                  job.
                </p>
              </div>
            </div>
          </div>
        </Fade>
      </div>
    </div>
  );
};

export default FAQSection;
