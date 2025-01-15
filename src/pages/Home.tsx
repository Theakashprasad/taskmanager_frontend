import AddTask from "../components/AddTask";
import TaskList from "../components/TaskList";
import { useSocket } from "../context/useSocket";
import { useEffect } from "react";
import TaskStatistics from "../components/TaskStatistics";
import { RiLogoutBoxLine } from "react-icons/ri";
import useStore from "../store/user";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Home() {
  const socket = useSocket();
  const router = useNavigate();
  const { setIsAuth } = useStore();
  useEffect(() => {
    if (!socket) return;

    const token = localStorage.getItem("jwt");
    socket.emit("getTasks", token);
    socket.on("error", (res) => {
      console.log("ressss", res);
      toast.error(res || "Verification failed", {
        position: "top-center",
      });
    });
    return () => {
      socket.off("fetchTask");
    };
  }, [socket]);

  const handleLogout = () => {
    setIsAuth(false);
    localStorage.clear();
    router("/login"); // Redirect to login page
  };

  // const dispatch = useDispatch();
  // const { status, error } = useSelector((state) => state.tasks);

  // useEffect(() => {
  //   if (status === 'idle') {
  //     dispatch(fetchTasks());
  //   }
  // }, [status, dispatch]);

  // if (status === 'loading') {
  //   return <div className="flex justify-center items-center h-screen"><LoadingSpinner/></div>;
  // }

  // if (status === 'failed') {
  //   return <div className="text-red-500 text-center p-4">Error: {error}</div>;
  // }

  return (
    <div className="container mx-auto p-4 max-w-7xl">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
        Task Management Dashboard
      </h1>
      <button
        onClick={handleLogout}
        className="text-red-500 hover:text-red-700 text-3xl cursor-pointer"
      >
        <RiLogoutBoxLine />
      </button>{" "}
      <div className="grid grid-cols-1 lg:grid-cols-9 gap-8">
        <div className="lg:col-span-4 space-y-8">
          <div className="bg-white shadow-lg rounded-lg p-6">
            <AddTask />
          </div>
          <div className="bg-white shadow-lg rounded-lg p-6">
            <TaskList />
          </div>
        </div>
        <div className="lg:col-span-5">
          <TaskStatistics />
        </div>
      </div>
    </div>
  );
}

export default Home;
