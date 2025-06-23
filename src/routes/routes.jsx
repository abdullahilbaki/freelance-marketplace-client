import { createBrowserRouter } from "react-router";
import HomeLayout from "../layouts/HomeLayout";
import Terms from "../components/Terms";
import Home from "../components/Home";
import NotFound from "../components/NotFound";
import Login from "../components/Login";
import Register from "../components/Register";
import AddTask from "../components/AddTask";
import BrowseTasks from "../components/BrowseTasks";
import Loading from "../components/Loading";
import TaskDetails from "../components/TaskDetails";
import MyPostedTasks from "../components/MyPostedTasks";
import UpdateTask from "../components/UpdateTask";
import PrivateRoute from "../components/PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    Component: HomeLayout,
    children: [
      {
        index: true,
        Component: Home,
        loader: () => fetch(`${import.meta.env.VITE_API_BASE_URL}/featured-tasks`),
        hydrateFallbackElement: <Loading />,
        errorElement: <NotFound />,
      },
      {
        path: "tasks",
        Component: BrowseTasks,
        loader: () => fetch(`${import.meta.env.VITE_API_BASE_URL}/tasks`),
        hydrateFallbackElement: <Loading />,
        errorElement: <NotFound />,
      },
      {
        path: "tasks/:id",
        element: (
          <PrivateRoute>
            <TaskDetails />
          </PrivateRoute>
        ),
        loader: async ({ params }) => {
          const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/tasks/${params.id}`);
          if (!res.ok) {
            throw new Response("Task Not Found", { status: 404 });
          }
          return res.json();
        },
        errorElement: <NotFound />,
        hydrateFallbackElement: <Loading />,
      },
      {
        path: "update-task/:id",
        element: (
          <PrivateRoute>
            <UpdateTask />
          </PrivateRoute>
        ),
        errorElement: <NotFound />,
        hydrateFallbackElement: <Loading />,
      },
      {
        path: "add-task",
        element: (
          <PrivateRoute>
            <AddTask />
          </PrivateRoute>
        ),
        errorElement: <NotFound />,
        hydrateFallbackElement: <Loading />,
      },
      {
        path: "my-tasks",
        element: (
          <PrivateRoute>
            <MyPostedTasks />
          </PrivateRoute>
        ),
        errorElement: <NotFound />,
        hydrateFallbackElement: <Loading />,
      },
      {
        path: "login",
        Component: Login,
      },
      {
        path: "signup",
        Component: Register,
      },
      {
        path: "terms",
        Component: Terms,
      },
    ],
  },
  {
    path: "*",
    Component: NotFound,
  },
]);

export default router;
