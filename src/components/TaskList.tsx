import { useEffect, useState } from "react";
import { Trash2, Check, Pencil } from "lucide-react";
import { useSocket } from "../context/useSocket";
import { ITask } from "../Types/User";
import { useTask } from "../context/useTask";
import { toast } from "react-toastify";

const TaskList = () => {
  //   const tasks = useSelector((state) => state.tasks.items);
  const [tasks, setTasks] = useState<ITask[] | null>();
  console.log(tasks);
  const { setAllTasks } = useTask(); // Access task and setTask from context
  setAllTasks(tasks || null);
  //   const dispatch = useDispatch();
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [token, setToken] = useState<string | null>();
  const socket = useSocket();

  useEffect(() => {
    if (!socket) return;

    const token = localStorage.getItem("jwt");
    setToken(token);
    socket.emit("getTasks", token);

    socket.on("fetchTask", (tasks) => {
      setTasks(tasks);
    });

    return () => {
      socket.off("fetchTask");
    };
  }, [socket, setToken]);

  useEffect(() => {
    if (!socket) return;

    socket.on("taskAdded", (res) => {

      // toast.success("Task Added")
      // setNewTask("")
      setTasks((tasks) => [res, ...(tasks || [])]);
    });

    socket.on("taskDeleted", (res) => {
      // setTasks(
      //   tasks?.filter((task) =>
      //     task._id !== res
      //   )
      // );
      setTasks((tasks) => tasks?.filter((task) => task._id !== res));

      // toast.success("Task Added")
      // setNewTask("")
      // setTasks((tasks) => [res, ...(tasks || [])]);
    });

    socket.on("taskUpdated", (res) => {
      setTasks(
        (prevTasks) =>
          prevTasks?.map((task) =>
            task._id === res.id
              ? { ...task, isCompleted: !task.isCompleted }
              : task
          ) || []
      );
      if (res.success) {
        // toast.success("Marked Complete")
      } else {
        // toast.error("Marked Incomplete")
      }
    });

    socket.on("taskEdited", (res) => {
      console.log('taskEdited',res);
     
    setTasks((prevTasks) =>
      prevTasks?.map((task) =>
        task._id === res.editingTask._id ? { ...task, title: res.userTask.title, description : res.userTask.description } : task
      )
    );
      if (res.success) {
        toast.success("Task Updated")
      } else {
        toast.error("Task Had Error")
      }
    });

    return () => {
      socket.off("taskAdded");
      socket.off("taskUpdated");
      socket.off("taskEdited");
    };
  }, [socket]);

  

  const handleDeleteClick = (taskId: string) => {
    const token = localStorage.getItem("jwt");

    // setTasks(tasks.filter((task) => task._id !== taskId));
    if (!socket) return;
    socket.emit("deleteTask", taskId, token);
    // toast.success("Deleted")
  };

  const handleCompletedChange = (task: any) => {
    if (!socket) return;
    const userId = task._id;
    socket.emit("isCompleted", { token, userId });
  };

  const handleEditClick = (task: any) => {
    setEditingId(task._id);
    setEditTitle(task.title);
    setEditDescription(task.description);
  };

  function handleSave(editingTask: any) {
    if (!editTitle) {
      console.error("No title provided");
      return;
    }

    // setTasks((prevTasks) =>
    //   prevTasks?.map((task) =>
    //     task._id === editingTask._id ? { ...task, title: editTitle } : task
    //   )
    // );
 
  const userTask = {
      title:editTitle,
      description:editDescription,
  
  }
    try {
      const token = localStorage.getItem("jwt");
      if (token) {
        if (!socket) return;
        socket.emit("handleTaskEdit", {
          editingTask,
          userTask,
          token,
        });
      }
    } catch (error) {
      console.error("Error saving task", error);
      toast.error("An error occurred while updating the task");
    }

    setEditingId(null);
    setEditTitle("");
    setEditDescription("");
  }

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4">Task List</h2>
      <ul className="space-y-2">
        {tasks?.length ? (
          tasks.map((task: ITask) => (
            <li
              key={task._id}
              className="bg-white shadow rounded-lg p-4 hover:bg-gray-100"
            >
              {editingId === task._id ? (
                <div>
                  <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    className="w-full mb-2 p-2 border rounded bg-gray-200 text-black"
                  />
                  <textarea
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                    className="w-full mb-2 p-2 border rounded bg-gray-200 text-black"
                  />
                  <button
                    onClick={() => handleSave(task)}
                    className="bg-green-500 text-white px-2 py-1 rounded-md mr-2"
                  >
                    <Check size={16} />
                  </button>
                  <button
                    onClick={() => setEditingId(null)}
                    className="bg-gray-500 text-white px-2 py-1 rounded-md"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={task.isCompleted}
                      onChange={() => handleCompletedChange(task)}
                      className="mr-2"
                    />
                    <h3
                      className={`font-medium ${
                        task.isCompleted ? "line-through text-gray-500" : ""
                      }`}
                    >
                      {task.title}
                    </h3>
                  </div>
                  <p
                    className={`text-gray-600 ${
                      task.isCompleted ? "line-through" : ""
                    }`}
                  >
                    {task.description}
                  </p>

                  <span
                    className={`inline-block px-2 py-1 rounded-full text-sm ${
                      task.isCompleted
                        ? "bg-green-200 text-green-800"
                        : "bg-yellow-200 text-yellow-800"
                    }`}
                  >
                    {task.isCompleted ? "Completed" : "Pending"}
                  </span>
                  {!task.isCompleted && (
                    <button
                      onClick={() => handleEditClick(task)}
                      className="bg-blue-500 text-white px-2 py-1 rounded-md ml-2"
                    >
                      <Pencil size={16} />
                    </button>
                  )}
                  <button
                    onClick={() => handleDeleteClick(task?._id)}
                    className="bg-red-500 text-white px-2 py-1 rounded-md ml-2"
                  >
                    <Trash2 size={16} />
                  </button>
                </>
              )}
            </li>
          ))
        ) : (
          <p className="text-gray-500">No tasks found.</p>
        )}
      </ul>
    </div>
  );
};

export default TaskList;
