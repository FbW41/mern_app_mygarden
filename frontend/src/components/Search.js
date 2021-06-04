import React, { useState } from "react";
import axios from "axios";

function Search() {
  const [email, setEmail] = useState("");
  const changeHandler = (e) => {
    console.log(e.target.value);

    setEmail(e.target.value);
  };
  const submitSearch = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/search", { email })
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => console.log(error));
  };
  return (
    <div>
      <form onSubmit={submitSearch}>
        <input type="text" onChange={changeHandler} />
        {/* <select type="text" id="category" name="category" placeholder="product category">
<% for (let category of categories){ %> 

    <option value="<%=category%>"  <%= category ===product.category?"selected":" " %> > <%=category%> </option>
<% } %> 
</select> */}

        <select name="" id=""></select>
        <button type="submit">Search</button>
      </form>
    </div>
  );
}

export default Search;
