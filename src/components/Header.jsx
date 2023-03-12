import React, { useState } from "react";
import { useDispatch } from "react-redux";
import DoubleTick from "../images/double-tick.png";
import Notes from "../images/notes.png";
import { added, allCompleted, clearcompleted } from "../redux/todos/actions";

const Header = () => {
  const [todo, setTodo] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const handleCompleteAll = () => {
    dispatch(allCompleted());
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setTodo(value);
    if (value.trim() !== "" && error !== "") {
      setError("");
    } else if (value.trim() === "" && error === "") {
      setError("Please enter your todo!");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (todo === "") {
      setError("Please enter your todo!");
      return false;
    } else {
      dispatch(added(todo));
      setTodo("");
      setError("");
    }
  };
  return (
    <div>
      <form
        className="flex items-center bg-gray-100 px-4 py-4 rounded-md"
        onSubmit={handleSubmit}
      >
        <img src={Notes} className="w-6 h-6" alt="Add todo" />
        <input
          type="text"
          placeholder="Type your todo"
          className="w-full text-lg px-4 py-1 border-none outline-none bg-gray-100 text-gray-500"
          onChange={handleChange}
          value={todo}
        />
        <button
          type="submit"
          className="appearance-none w-8 h-8 bg-[url('./images/plus.png')] bg-no-repeat bg-contain"
        ></button>
      </form>
      <p className="text-red-500 font-bold">{error}</p>

      <ul className="flex justify-between my-4 text-xs text-gray-500">
        <li className="flex space-x-1 cursor-pointer">
          <img className="w-4 h-4" src={DoubleTick} alt="Complete" />
          <span onClick={handleCompleteAll}>Complete All Tasks</span>
        </li>
        <li
          className="cursor-pointer"
          onClick={() => dispatch(clearcompleted())}
        >
          Clear completed
        </li>
      </ul>
    </div>
  );
};

export default Header;
