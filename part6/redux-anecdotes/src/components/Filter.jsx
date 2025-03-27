import { useDispatch } from "react-redux";
import { changeFilter } from "../reducers/filterReducer";

const Filter = () => {
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const value = e.target.value;
    dispatch(changeFilter(value));
  }

  return (
    <div>
      <input type="text" onChange={handleChange}/>
    </div>
  );
}

export default Filter;