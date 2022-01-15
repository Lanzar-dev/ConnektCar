import { Col, Row, Divider, DatePicker, Checkbox, Modal } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import DefaultLayout from "../components/DefaultLayout";
import Spinner from "../components/Spinner";
import { getAllCars } from "../redux/actions/carsActions";
import moment from "moment";
import { bookCar } from "../redux/actions/bookingActions";
import StripeCheckout from "react-stripe-checkout";
import AOS from "aos";
import "aos/dist/aos.css"; // You can also use <link> for styles
// ..
AOS.init();
const { RangePicker } = DatePicker;

export default function BookingCar() {
  const [car, setCar] = useState({});
  const [from, setFrom] = useState();
  const [to, setTo] = useState();
  const [totalHours, setTotalHours] = useState(0);
  const [driver, setDriver] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const { carId } = useParams();
  const { cars } = useSelector((state) => state.carsReducer);
  const { loading } = useSelector((state) => state.alertsReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    if (cars.length === 0) {
      dispatch(getAllCars());
    } else {
      setCar(cars.find((item) => item._id === carId));
    }
  }, [cars, carId, dispatch]);

  useEffect(() => {
    setTotalAmount(totalHours * car.rentPerHour);
    if (driver) {
      setTotalAmount(totalAmount + 20 * totalHours);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [driver, totalHours]);

  //use function declaration
  function selectTimeSlots(values) {
    setFrom(moment(values[0]).format("MM DD yyy HH:mm"));
    setTo(moment(values[1]).format("MM DD yyy HH:mm"));

    setTotalHours(values[1].diff(values[0], "hours"));
  }

  function onToken(token) {
    const reqObj = {
      token,
      user: JSON.parse(localStorage.getItem("user"))._id,
      car: car._id,
      totalHours,
      totalAmount,
      driverRequire: driver,
      bookedTimeSlots: {
        from,
        to,
      },
    };
    dispatch(bookCar(reqObj));
  }

  return (
    <DefaultLayout>
      {loading && <Spinner />}
      <Row
        justify="center"
        className="d-flex align-items-center"
        style={{ minHeight: "90vh" }}
      >
        <Col lg={10} sm={24} xs={24} className="p-3">
          <img
            src={car.image}
            alt={car.name}
            className="carImg2 bs1 w-100"
            data-aos="flip-left"
            data-aos-duration="1500"
          />
        </Col>
        <Col lg={10} sm={24} xs={24} className="text-right p-2">
          <Divider type="horizontal" dashed>
            Car Info
          </Divider>
          <div style={{ textAlign: "right" }}>
            <p>{car.name}</p>
            <p>${car.rentPerHour} Rent Per Hour</p>
            <p>Fuel Type: {car.fuelType}</p>
            <p>Max Persons: {car.capacity}</p>
          </div>
          <Divider type="horizontal" dashed>
            Select Time Slots
          </Divider>
          <RangePicker
            showTime={{ format: "HH:mm" }}
            format="MM DD yyy HH:mm"
            onChange={selectTimeSlots}
          />

          <div className="mt-2">
            <button className="btn1" onClick={() => setShowModal(true)}>
              See Booked Slots
            </button>
          </div>

          {from && to && (
            <div>
              <p>
                Total Hours: <strong>{totalHours}</strong>{" "}
              </p>
              <p>
                Rent Per Hour: <strong>${car.rentPerHour}</strong>
              </p>
              <Checkbox
                onChange={(e) => {
                  if (e.target.checked) {
                    setDriver(true);
                  } else {
                    setDriver(false);
                  }
                }}
              >
                Driver Required
              </Checkbox>

              <h3>Total Amount: {totalAmount}</h3>

              <StripeCheckout
                shippingAddress
                token={onToken}
                amount={totalAmount * 100}
                stripeKey="pk_test_51KC9YQBS7LJA2qtBhs6AD5nADAo5QFpiCVSk1j9W3Ji8kmL92Oqtby9agpzgrrmhTs4yfKGCbCfxqjewCrfpbRKP00mZqIZV1M"
              >
                <button className="btn1">Book Now</button>
              </StripeCheckout>
            </div>
          )}
        </Col>
        {car.name && (
          <Modal
            visible={showModal}
            closable={false}
            footer={false}
            title="Booked Time Slots"
          >
            <div className="p-2">
              {car.bookedTimeSlots.map((slot, index) => {
                return (
                  <button key={index} className="btn1 mt-2">
                    {slot.from} - {slot.to}
                  </button>
                );
              })}
            </div>

            <div className="text-right mt-5">
              <button className="btn1" onClick={() => setShowModal(false)}>
                CLOSE
              </button>
            </div>
          </Modal>
        )}
      </Row>
    </DefaultLayout>
  );
}
