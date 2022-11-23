import { Link } from "react-router-dom";

//import logo from "../../public/AGGIO.png";
export const Homepage = () => {
  return (
    <div>
      <div>
        <img />
        <p>
          The benefit of creating the life you want is there at your fingertips.
          The only action needed is to grab it & never let go the world is
          yours.
        </p>
      </div>
      <div>
        <img
          src="https://www.genardmethod.com/hubfs/123RF_Photos_GG/108985130_M%20--%20123RF%20--%2011.14.19.jpg"
          alt="picture of someone speaking on stage"
        />
        <p>
          Aggio Worldwide is a platform where world renowned speakers can post
          an event that they will be hosting with their team in order to grab
          listeners. The speakers events are designed to create shift in your
          quality of life for the duration of the course. The freedom to be at
          ease and the power to be effective in the areas that matter most to
          you—the quality of your relationships, the self-assurance with which
          you live your life, your personal productivity, your awareness of the
          difference you make, and your enjoyment of life—are directly a result
          of these shifts.
        </p>
        <Link to="/about">
          <button>Learn More</button>
        </Link>
      </div>
    </div>
  );
};
