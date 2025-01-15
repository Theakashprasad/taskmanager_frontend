import { useState } from "react";
import { useSocket } from "../context/useSocket";

const AddTask = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  // const dispatch = useDispatch();
  const socket = useSocket();

  // const handleSubmit = (e: any) => {
  //   e.preventDefault();
  //   if (title.trim()) {
  //     // dispatch(addTask({ title, description }))
  //     // .unwrap()
  //     // .then(() => {
  //     //   setTitle('');
  //     //   setDescription('');
  //     //   toast.success('Task added successfully!');
  //     // })
  //     // .catch((error: any) => {
  //     //   toast.error('Failed to add task!', error);
  //     // });

  //   }
  // };

  function addTask(e: any) {
    e.preventDefault();

    console.log(title);

    if (!title.trim()) return;
    const userTask = {
      title: title,
      isCompleted: false,
      description: description,
    };

    if (socket) {
      const token = localStorage.getItem("jwt");
      console.log("sadfsdf", token);

      socket.emit("addTask", { userTask, token });
      setDescription("");
      setTitle("");
    }
  }

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4 text-black">Add New Task</h2>
      <form onSubmit={addTask} className="space-y-4">
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full rounded-md bg-gray-200 text-black border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            required
          />
        </div>
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full rounded-md bg-gray-200 text-black border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            required
          ></textarea>
        </div>
        <button
          type="submit"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Add Task
        </button>
      </form>
    </div>
  );
};

export default AddTask;
