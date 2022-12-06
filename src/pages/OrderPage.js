import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchDetails, createTickets } from "../store/events/thunks";
import { selectDetails } from "../store/events/selectors";
import { selectUser } from "../store/user/selectors";

const OrderPage = () => {
  const [quantity, setQuantity] = useState(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  // make a selector that select the profile of the user

  const dispatch = useDispatch();

  const ticketDetails = useSelector(selectDetails);
  const userId = useSelector(selectUser);
  console.log(ticketDetails);
  console.log(userId);

  const { id } = useParams();

  useEffect(() => {
    dispatch(fetchDetails(id));
  }, [dispatch, id]);

  const totalPrice = () => {
    if (!ticketDetails) {
      return;
    }
    return parseInt(quantity * ticketDetails.price);
  };
  console.log(totalPrice());

  return (
    <div>
      <div>
        <p>
          {!ticketDetails ? (
            "Loading"
          ) : (
            <div>
              <p>{`${ticketDetails.title} €${ticketDetails.price}`}</p>
            </div>
          )}
        </p>

        <p>
          <input
            type="number"
            value={quantity}
            min="1"
            max="10"
            onChange={(event) => setQuantity(event.target.value)}
          />
        </p>
      </div>
      <p>
        <input
          type="text"
          value={name}
          placeholder="Full Name"
          onChange={(event) => setName(event.target.value)}
        />
      </p>
      <p>
        <input
          type="text"
          value={email}
          placeholder="Email"
          onChange={(event) => setEmail(event.target.value)}
        />
      </p>

      <div>
        <h3>Total: €{totalPrice()}</h3>
      </div>

      <button
        onClick={() => {
          if (!userId || userId) {
            return dispatch(createTickets(name, email, quantity, userId, id));
          }
        }}
      >
        Order Tickets
      </button>
    </div>
  );
};

export { OrderPage };
