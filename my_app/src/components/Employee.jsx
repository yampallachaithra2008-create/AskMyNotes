function Employee(props) {
  return (
    <div
      style={{
        border: "2px solid red",
        padding: "10px",
        width: "300px",
        margin: "10px auto",
      }}
    >
      <h2>{props.name}</h2>
      <p>Employee ID: {props.employeeId}</p>
      <p>Department: {props.department}</p>
      <p>Designation: {props.designation}</p>
      <p>Salary: {props.salary}</p>
    </div>
  );
}

export default Employee;