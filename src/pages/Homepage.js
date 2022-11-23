import { Link, matchRoutes } from "react-router-dom";
import logo from "../AGGIO.png";
import "./style.css";
import { useEffect } from "react";
import { fetchEvents } from "../store/events/thunks";
import { useDispatch, useSelector } from "react-redux";
import { selectEvent } from "../store/events/selectors";

export const Homepage = () => {
  const dispatch = useDispatch();
  const events = useSelector(selectEvent);
  console.log(events);

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  return (
    <div>
      <br />
      <div className="top-home">
        <div>
          <img className="image-home" src={logo} alt="logo" />
        </div>
        <div>
          <p className="font-top">
            The benefit of creating the life you want <br />
            is there at your fingertips. The only action <br />
            needed is to grab it and never let go. <br />
            <br />
            THE WORLD IS YOURS!
          </p>
        </div>
      </div>
      <br />
      <br />
      <div className="middle-home">
        <div>
          <img
            className="image-home"
            src="https://www.genardmethod.com/hubfs/123RF_Photos_GG/108985130_M%20--%20123RF%20--%2011.14.19.jpg"
            alt="picture of someone speaking on stage"
          />
        </div>
        <div>
          <p>
            Aggio Worldwide is a platform where world renowned speakers can post
            an event that they will be hosting with their team in order to grab
            listeners. The speakers events are designed to create shift in your
            quality of life for the duration of the course. The freedom to be at
            ease and the power to be effective in the areas that matter most to
            you—the quality of your relationships, the self-assurance with which
            you live your life, your personal productivity, your awareness of
            the difference you make, and your enjoyment of life—are directly a
            result of these shifts.
          </p>

          <Link to="/about">
            <button>Learn More</button>
          </Link>
        </div>
      </div>
      <div>
        <p>Events</p>
        <Link to="/details/:id">
          <div>
            {!events
              ? "Loading..."
              : events.map((e) => (
                  <div className="event-home" key={e.id}>
                    <img src={e.imageUrl} alt="Mr. T" />
                    <p>{e.title}</p>
                    <p>{e.rating}</p>
                    <p>€ {e.price}</p>
                    <p>{e.description}</p>
                  </div>
                ))}
          </div>
        </Link>
      </div>
      <Link to="/events">
        <button>More Events</button>
      </Link>
    </div>
  );
};
