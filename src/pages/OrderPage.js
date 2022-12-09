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
  const user = useSelector(selectUser);
  console.log(ticketDetails);
  console.log(user);

  const { id } = useParams();

  useEffect(() => {
    dispatch(fetchDetails(id));
  }, [dispatch, id]);

  const totalPrice = () => {
    if (!ticketDetails) {
      return;
    }
    return parseFloat(quantity * ticketDetails.price);
  };
  console.log(totalPrice());

  return (
    <div style={{ height: "100%" }}>
      {!ticketDetails ? (
        "Loading"
      ) : (
        <div
          className="col-sm-8"
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <div
            className="card card-cascade wider shadow p-3 mb-5 "
            style={{
              backgroundColor: "black",
              display: "flex",
              alignContent: "center",
            }}
          >
            <div className="view view-cascade overlay text-center">
              <img
                className="card-img-top"
                src={ticketDetails.imageUrl}
                alt=""
              />
              <div>
                <div className="mask rgba-white-slight"></div>
              </div>
            </div>

            <div className="desc">
              <div>
                <div className="col">
                  <h4 className="text-muted row1">{ticketDetails.title}</h4>
                  <div className="row2">
                    {" "}
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
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-4">
            <div
              className="card card-cascade card-ecommerce wider shadow p-3 mb-5 "
              style={{ backgroundColor: "black" }}
            >
              <div className="card-body card-body-cascade">
                <div className="card2decs">
                  <div className="quantity">
                    Qty{" "}
                    <span className="float-right text1">
                      <input
                        type="number"
                        value={quantity}
                        min="1"
                        max="10"
                        onChange={(event) => setQuantity(event.target.value)}
                      />
                    </span>
                  </div>
                  <div>
                    <h3>Total: €{totalPrice()}</h3>
                  </div>
                </div>

                <button
                  onClick={() => {
                    if (!user || user) {
                      return dispatch(
                        createTickets(name, email, quantity, user.id, id)
                      );
                    }
                  }}
                >
                  Order Tickets
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export { OrderPage };
