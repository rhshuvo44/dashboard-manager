import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import Input from "../../component/Input";
import SectionTitle from "../../component/SectionTitle";
import BackendApiUrl from "../../api/BackendApiUrl";

const EmpoleeAdd = () => {
  const { register, handleSubmit, reset } = useForm();
  const onSubmit = (employeeInfo) => {
    // ==============Backend API ==================
    BackendApiUrl.post("/posts", employeeInfo).then((data) => {
      if (data) {
        toast.success("Your New Employee Added");
        reset();
      } else {
        toast.error("Faild to add Your Employee");
      }
    });
  };
  return (
    <div className="card shadow-xl mt-10">
      <div className="card-body">
        <SectionTitle>Employee Add For Project</SectionTitle>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            placeholder="Employee Name"
            className="input input-bordered w-full bg-transparent my-2"
            {...register("name")}
          />
          <input
            type="email"
            placeholder="Employee Email"
            className="input input-bordered w-full bg-transparent my-2"
            {...register("email")}
          />
          <input
            type="text"
            placeholder="Employee Id"
            className="input input-bordered w-full bg-transparent my-2"
            {...register("employeeId")}
          />
          <select
            {...register("project")}
            className="select select-bordered w-full bg-transparent select-xl my-2"
          >
            <option disabled selected value="project Select">
              Project Select
            </option>
            <option value="project 1">project 1</option>
            <option value="project 2">project 2</option>
          </select>
          <select
            {...register("role")}
            className="select select-bordered w-full bg-transparent select-xl my-2"
          >
            <option disabled selected value="employess role">
              Employess role
            </option>
            <option value="enginner">Enginner</option>
            <option value="manager">Manager</option>
          </select>
          <Input
            type="submit"
            className="btn btn-primary capitalize"
            value="Employee Add"
          />
        </form>
      </div>
    </div>
  );
};

export default EmpoleeAdd;
