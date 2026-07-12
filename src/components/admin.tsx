
import "../style/admin.css";

function AdminPage() {
  const surveys = [
    {
      id: 1,
      title: "Customer Satisfaction Survey",
      category: "Customer Feedback",
      responses: 120,
    },
    {
      id: 2,
      title: "College Event Poll",
      category: "Education",
      responses: 85,
    },
    {
      id: 3,
      title: "Favorite Programming Language",
      category: "Technology",
      responses: 240,
    },
  ];

  return (
    <div className="admin-container">
      <h1>Admin Panel</h1>

      <div className="cards">
        <div className="card">
          <h2>10</h2>
          <p>Total Surveys</p>
        </div>

        <div className="card">
          <h2>350</h2>
          <p>Total Responses</p>
        </div>

        <div className="card">
          <h2>50</h2>
          <p>Registered Users</p>
        </div>
      </div>

      <h2 className="table-title">Survey Management</h2>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Survey</th>
            <th>Category</th>
            <th>Responses</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {surveys.map((survey) => (
            <tr key={survey.id}>
              <td>{survey.id}</td>
              <td>{survey.title}</td>
              <td>{survey.category}</td>
              <td>{survey.responses}</td>
              <td>
                <button className="edit">Edit</button>
                <button className="delete">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminPage;