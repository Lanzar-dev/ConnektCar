import { Col, Row, Divider, DatePicker, Checkbox } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import DefaultLayout from "../components/DefaultLayout";
import Spinner from "../components/Spinner";
import { getAllCars } from "../redux/actions/carsActions";
import moment from "moment";
import { bookCar } from "../redux/actions/bookingActions";
const { RangePicker } = DatePicker;

export default function BookingCar() {
  const [car, setCar] = useState({});
  const [from, setFrom] = useState();
  const [to, setTo] = useState();
  const [totalHours, setTotalHours] = useState(0);
  const [driver, setDriver] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);

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
  }, [driver, totalHours]);

  //use function declaration
  function selectTimeSlots(values) {
    setFrom(moment(values[0]).format("MM DD yyy HH:mm"));
    setTo(moment(values[1]).format("MM DD yyy HH:mm"));
    setTotalHours(values[1].diff(values[0], "hours"));
  }

  const bookNow = () => {
    const reqObj = {
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
  };

  return (
    <DefaultLayout>
      {loading && <Spinner />}
      <Row
        justify="center"
        className="d-flex align-items-center"
        style={{ minHeight: "90vh" }}
      >
        <Col lg={10} sm={24} xs={24}>
          <img src={car.image} alt={car.name} className="carImg2 bs1" />
        </Col>
        <Col lg={10} sm={24} xs={24} className="text-right">
          <Divider>Car Info</Divider>
          <div>
            <p>{car.name}</p>
            <p>${car.rentPerHour} Rent Per Hour</p>
            <p>Fuel Type: {car.fuelType}</p>
            <p>Max Persons: {car.capacity}</p>
          </div>
          <Divider>Select Time Slots</Divider>
          <RangePicker
            showTime={{ format: "HH:mm" }}
            format="MM DD yyy HH:mm"
            onChange={selectTimeSlots}
          />

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
            <button className="btn1" onClick={bookNow}>
              Book Now
            </button>
          </div>
        </Col>
      </Row>
    </DefaultLayout>
  );
}
