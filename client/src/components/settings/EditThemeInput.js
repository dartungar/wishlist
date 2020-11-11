import React, { useState, useEffect } from "react";

const EditThemeInput = () => {
  const [theme, setTheme] = useState();

  // set 'theme' state based on cookies
  // or browser/system theme
  useEffect(() => {
    console.log("cookies: ", document.cookie);
    const themeCookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith("theme"));
    const userTheme = themeCookie ? themeCookie.split("=")[1] : null;

    if (userTheme === "lightTheme") {
      setTheme("lightTheme");
    } else if (userTheme === "darkTheme") {
      setTheme("darkTheme");
    } else {
      if (
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
      ) {
        setTheme("darkTheme");
      } else setTheme("lightTheme");
    }
  }, []);

  // set 'theme' cookie according to chosen theme
  // reload window to apply changes
  // (changes apply on page load, see ../../App.js component)
  const handleChange = (e) => {
    setTheme(e.target.value);
    document.cookie = `theme=${e.target.value}`;
    window.location.reload();
  };

  return (
    <div>
      <h4>Тема</h4>
      <input
        id="lightThemeInput"
        type="radio"
        checked={theme === "lightTheme"}
        value={"lightTheme"}
        onChange={handleChange}
      />{" "}
      <label htmlFor="lightThemeInput">🌞 Светлая</label>
      <br />
      <input
        id="darkThemeInput"
        type="radio"
        checked={theme === "darkTheme"}
        value={"darkTheme"}
        onChange={handleChange}
      />{" "}
      <label htmlFor="darkThemeInput">🌘 Тёмная</label>
    </div>
  );
};

export default EditThemeInput;
