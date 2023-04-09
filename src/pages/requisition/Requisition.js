import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import BackendApiUrl from "../../api/BackendApiUrl";
import SectionTitle from "../../component/SectionTitle";
import Loading from "../../layout/Loading";

const Requisition = () => {
  const count = 50;
  const size = 10;
  const [page, setPage] = useState(0);
  const { data: requisitons, isLoading } = useQuery({
    queryKey: ["requisiton"],
    queryFn: async () => await BackendApiUrl.get("/users"),
  });
  if (isLoading) {
    return <Loading />;
  }

  const pages = Math.ceil(count / size);
  return (
    <div className="py-10">
      <SectionTitle>All Requsitions</SectionTitle>
      <div className="overflow-x-auto">
        <table className="table w-full">
          {/* head */}
          <thead>
            <tr>
              <th>No</th>
              <th>Prjoject Name</th>
              <th>Title</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {requisitons.data.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.phone}</td>
                <td>
                  <Link
                    to={`/requisitonDetails/${user.id}`}
                    className="btn btn-xs btn-info"
                  >
                    Details
                  </Link>
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

export default Requisition;
