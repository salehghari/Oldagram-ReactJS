import { useState, useEffect } from "react";

export default function Navbar() {
  const [boxShadow, setBoxShadow] = useState("");


  useEffect(() => {
    window.addEventListener('scroll', boxShadowNavbar);

    return () => {
      window.removeEventListener('scroll', boxShadowNavbar);
    };
  }, []);

  const boxShadowNavbar = () => {
    if (window !== undefined) {
      const windowHeight = window.scrollY;
      windowHeight > 60 ? setBoxShadow("navbar-box-shadow") : setBoxShadow("");
    }
  };
  return (
    <nav className={`${boxShadow}`}>
      <img className="oldagram-logo" src="images/oldagram-logo.svg" alt="Oldagram Logo" />
      <img className="profile-picture user-profile-picture" src="images/my-pp.jpg" alt="Your Profile Picture" draggable={false} />
    </nav>
  )
}
