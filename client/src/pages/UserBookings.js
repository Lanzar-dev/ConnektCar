import { Col, Row } from "antd";
import moment from "moment";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DefaultLayout from "../components/DefaultLayout";
import Spinner from "../components/Spinner";
import { getAllBookings } from "../redux/actions/bookingActions";

export default function UserBookings() {
  const dispatch = useDispatch();
  const { bookings } = useSelector((state) => state.bookingsReducer);
  const { loading } = useSelector((state) => state.alertsReducer);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    dispatch(getAllBookings());
  }, []);

  return (
    <DefaultLayout>
      {loading && <Spinner />}

      <h3 className="text-center mt-2">My Bookings</h3>
      <Row justify="center" gutter={16}>
        <Col lg={16} sm={24}>
          {bookings
            .filter((item) => item.user === user._id)
            .map((booking) => {
              console.log(booking);
              return (
                <Row
                  key={booking._id}
                  gutter={16}
                  className="bs1 mt-3 text-left"
                >
                  <Col lg={6} sm={24}>
                    <p>
                      <strong>{booking.car.name}</strong>
                    </p>
                    <p>
                      Total Hours: <strong>{booking.totalHours}</strong>
                    </p>
                    <p>
                      Rent Per Hour: <strong>${booking.car.rentPerHour}</strong>
                    </p>
                    <p>
                      Total amount: <strong>${booking.totalAmount}</strong>
                    </p>
                  </Col>
                  <Col lg={12} sm={24}>
                    <p>
                      Transaction Id: <strong>{booking.transactionId}</strong>
                    </p>
                    <p>
                      From:{" "}
                      <strong>
                        {moment(booking.bookedTimeSlots.from).format(
                          "MMM DD yyyy HH:mm"
                        )}
                      </strong>
                    </p>
                    <p>
                      To:{" "}
                      <strong>
                        {moment(booking.bookedTimeSlots.to).format(
                          "MMM DD yyyy HH:mm"
                        )}
                      </strong>
                    </p>
                    <p>
                      Date of booking:{" "}
                      <strong>
                        {moment(booking.createdAt).format("MMM DD yyyy")}
                      </strong>
                    </p>
                  </Col>
                  <Col lg={6} sm={24} className="text-right">
                    <img
                      style={{ borderRadius: 5 }}
                      src={booking.car.image}
                      alt={booking.car.name}
                      height="140"
                      className="p-2"
                    />
                  </Col>
                </Row>
              );
            })}
        </Col>
      </Row>
    </DefaultLayout>
  );
}
