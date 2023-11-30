import { useState } from "react";
import { useSelector } from "react-redux";
import { getData } from "./Redux/selectors";
import Item from "./components/Item/Item";
import RoleSwitch from "./components/RoleSwitch/RoleSwitch";
import Search from "./components/Search/Search";

import "./App.css";

function App() {
  const [searchValue, setSetsearchValue] = useState("");

  const data = useSelector(getData);

  return (
    <div className="App">
      <main className="App-main">
        <div className="App-main__wrapper">
          <RoleSwitch />
          <div>
            <Search
              handleSearch={setSetsearchValue}
              searchValue={searchValue}
            ></Search>
          </div>

          {searchValue.length === 0 ? (
            <Item item={data} />
          ) : (
            Array.isArray(data) &&
            data.map((el) => <Item key={el.id} item={el} />)
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
