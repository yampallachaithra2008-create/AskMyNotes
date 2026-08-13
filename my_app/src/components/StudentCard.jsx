/*function StudentCard({name,course,year,skill}) {
    return(
        <div className="Student-Card">
            <h2>Student profile</h2>
            <p>Name: {name}</p>
            <p>Course: {course}</p>
            <p>Year: {year}</p>
            <p>Skill: {skill}</p>
        </div>
    );
}
export default StudentCard;
*/
function StudentCard({ students }) {
  return (
    <div className="Student-Card">
      {students.map((student, index) => (
        <div
          key={index}
          style={{
            border: "2px solid red",
            padding: "10px",
            width: "200px",
            margin: "10px auto",
            borderRadius: "2px",
          }}
        >
          <h2>{student.name}</h2>
          <p>Course: {student.course}</p>
          <p>Year: {student.year}</p>
          <p>Skill: {student.skill}</p>
        </div>
      ))}
    </div>
  );
}

export default StudentCard;