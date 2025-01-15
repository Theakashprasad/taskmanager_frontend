// import  { useEffect, useState } from "react";
// import axios from "axios";
// import { io } from "socket.io-client";

// const socket = io("http://localhost:3000");

// interface Task {
//   _id: string;
//   task: string;
// }
// interface user {
//   id: string;
// }

// function App() {
//   const [tasks, setTasks] = useState<Task[]>([]);
//   const [newTask, setNewTask] = useState("");
//   const [usersDatas, setUsersDatas] = useState<user | null>();
// // console.log('detailsof', tasks);

//   useEffect(() => {
//     let initialUserState = null;
//     const storedUserDetail =
//       typeof window !== "undefined" ? localStorage.getItem("userDetail") : null;
//     if (storedUserDetail) {
//       initialUserState = storedUserDetail ? JSON.parse(storedUserDetail) : null;
//       setUsersDatas(initialUserState);
//       a(initialUserState.id)
//     }
//   }, [setUsersDatas]);

//   async function a(initialUserState: any) {
//       console.log('asfasd', initialUserState);

//       const tasks =  await axios.get(`http://localhost:3000/api/task/${initialUserState}`);
//       console.log('sdsdsd',tasks.data);
//     setTasks(tasks.data)
//   }

//   useEffect(() => {
//     // Listen for the message from the server

//     socket.on("connect", () => {
//         console.log('fun fun', usersDatas?.id);

//         socket.emit('user_connected', usersDatas?.id);

//       socket.on("message", (data) => {
//         console.log("data", data);
//       });

//       socket.on('taskAdded', (task) => {
//         console.log('asdfasdtasdfasdfasdfsad',task);

//         setTasks((prevTasks) => [...prevTasks, task]);
//       });

//     });

//     // Clean up when the component unmounts
//     return () => {
//       socket.off("message");
//     };
//   }, [usersDatas]);

//   const addTask = () => {

//     if (newTask.trim()) {
//       axios
//         .post("http://localhost:3000/api/tasks", {
//           task: newTask,
//           userId: usersDatas?.id,
//         })
//         .then(() => {
//           setNewTask("");
//           a(usersDatas?.id)
//         });
//     }
//   };

//   // const deleteTask = (id) => {
//   //     axios.delete(`http://localhost:3000/tasks/${id}`);
//   // };

//   return (
//     <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
//       <h1>Task Manager</h1>
//       <div>
//         <input
//           type="text"
//           value={newTask}
//           onChange={(e) => setNewTask(e.target.value)}
//           placeholder="Add a new task"
//         />
//         <button onClick={addTask}>Add Task</button>
//       </div>
//       <ul>
//         {tasks.map((task) => (
//           <li key={task._id}>
//             {task.task}{" "}
//             {/* <button onClick={() => deleteTask(task._id)}>Delete</button> */}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default App;
