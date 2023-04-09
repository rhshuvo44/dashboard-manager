import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import BackendApiUrl from "../api/BackendApiUrl";
import InputSelect from "../component/InputSelect";
import SectionTitle from "../component/SectionTitle";
import { toast } from "react-hot-toast";
import Loading from "../layout/Loading";

const Payment = () => {
  const count = 50;
  const [page, setPage] = useState(0);
  const size = 10;
  const pages = Math.ceil(count / size);
  const {
    data: payments,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["payments"],
    queryFn: async () => await BackendApiUrl.get(`/users`),
  });
  if (isLoading) {
    return <Loading />;
  }
  const paymentStatus = (id) => {
    // ============ BACKEND Put API ==============
    BackendApiUrl.put(`/payment/${id}`).then((data) => {
      if (data) {
        refetch();
        toast.success("Successfully update Payment Status");
      }
    });
  };
  return (
    <div className="py-10">
      <SectionTitle>All Payments</SectionTitle>
      <div className="overflow-x-auto">
        <table className="table w-full">
          {/* head */}
          <thead>
            <tr>
              <th>No</th>
              <th>Name</th>
              <th>Project Name</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {payments.data.map((payment) => (
              <tr key={payment.id}>
                <td>{payment.id}</td>
                <td>{payment.name}</td>
                <td>{payment.username}</td>
                <td>500</td>
                <td>
                  <InputSelect
                    onChange={() => paymentStatus(payment.id)}
                    className="select select-bordered bg-transparent select-xs"
                  >
                    <option disabled selected value="padding">
                      Padding
                    </option>
                    <option value="approved">Approved</option>
                    <option value="success">Success</option>
                  </InputSelect>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center mt-5">
        <div className="btn-group ">
          {[...Array(pages).keys()].map((number) => (
            <button
              onClick={() => setPage(number)}
              className={`btn ${page === number && "btn-active"}`}
            >
              {number + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Payment;
