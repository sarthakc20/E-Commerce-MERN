import React, { useState } from "react";
import "./Shipping.css";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../layout/MetaData";
import { MdLocationPin } from "react-icons/md";
import { AiFillHome } from "react-icons/ai";
import { MdLocationCity } from "react-icons/md";
import { MdPublic } from "react-icons/md";
import { BiSolidPhone } from "react-icons/bi";
import { MdOutlineTransferWithinAStation } from "react-icons/md";
import { Country, State } from "country-state-city";
import { useAlert } from "react-alert";
import CheckoutSteps from "../Cart/CheckoutSteps";
import { saveShippingInfo } from "../../actions/cartAction";
import { useNavigate } from "react-router-dom";
import Loader from "../layout/Loader/Loader";

const Shipping = () => {

  const dispatch = useDispatch();

  const alert = useAlert();

  const navigate = useNavigate();

  const { isAuthenticated, loading } = useSelector((state) => state.user);

  const { shippingInfo } = useSelector((state) => state.cart);

  const [address, setAddress] = useState(shippingInfo.address);
  const [city, setCity] = useState(shippingInfo.city);
  const [state, setState] = useState(shippingInfo.state);
  const [country, setCountry] = useState(shippingInfo.country);
  const [pinCode, setPinCode] = useState(shippingInfo.pinCode);
  const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo);

  const shippingSubmit = (e) => {
    e.preventDefault();

    if (phoneNo.length < 10 || phoneNo.length > 10) {
      alert.error("Phone Number should be 10 digits Long");
      return;
    }

    dispatch(
      saveShippingInfo({ address, city, state, country, pinCode, phoneNo })
    );

    navigate("/order/confirm");
  };

  return (
    <>
      <MetaData title="Shipping Details" />

      {loading || !isAuthenticated ? (
        <Loader />
      ) : (
        <>
          <CheckoutSteps activeStep={0} />

          <div className="shippingContainer">
            <div className="shippingBox">
              <h2 className="shippingHeading">Shipping Details</h2>

              <form
                className="shippingForm"
                encType="multipart/form-data"
                onSubmit={shippingSubmit}
              >
                <div>
                  <AiFillHome />
                  <input
                    type="text"
                    placeholder="Address"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>

                <div>
                  <MdLocationCity />
                  <input
                    type="text"
                    placeholder="City"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                </div>

                <div>
                  <MdLocationPin />
                  <input
                    type="number"
                    placeholder="Pin Code"
                    required
                    value={pinCode}
                    onChange={(e) => setPinCode(e.target.value)}
                  />
                </div>

                <div>
                  <BiSolidPhone />
                  <input
                    type="number"
                    placeholder="Phone Number"
                    required
                    value={phoneNo}
                    onChange={(e) => setPhoneNo(e.target.value)}
                    size="10"
                  />
                </div>

                <div>
                  <MdPublic />

                  <select
                    required
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                  >
                    <option value="">Country</option>
                    {Country &&
                      Country.getAllCountries().map((item) => (
                        <option key={item.isoCode} value={item.isoCode}>
                          {item.name}
                        </option>
                      ))}
                  </select>
                </div>

                {country && (
                  <div>
                    <MdOutlineTransferWithinAStation />

                    <select
                      required
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                    >
                      <option value="">State</option>
                      {State &&
                        State.getStatesOfCountry(country).map((item) => (
                          <option key={item.isoCode} value={item.isoCode}>
                            {item.name}
                          </option>
                        ))}
                    </select>
                  </div>
                )}

                <input
                  type="submit"
                  value="Continue"
                  className="shippingBtn"
                  disabled={state ? false : true}
                />
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Shipping;
