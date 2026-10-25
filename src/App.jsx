
import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'

function Home() {
  const [employees, setEmployees] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((data) => setEmployees(data))
      .catch((error) => console.error('Error:', error))
      .finally(() => setLoading(false))
  }, [])

  return (
    <main className="container">
      <h1>Employee Dashboard</h1>
      <p>View employee details below.</p>

      {loading ? (
        <p>Loading employees...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee.id}>
                <td>{employee.id}</td>
                <td>{employee.name}</td>
                <td>{employee.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </main>
  )
}

function EmployeeForm() {
  const [form, setForm] = useState({
    name: '',
    designation: '',
    location: '',
    salary: '',
  })

  function handleChange(event) {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  function handleSubmit(event) {
    event.preventDefault()
    alert('Employee form submitted successfully!')
  }

  return (
    <main className="container">
      <h1>Employee Form</h1>
      <form className="employee-form" onSubmit={handleSubmit}>
        <label>Name</label>
        <input name="name" value={form.name} onChange={handleChange} required />

        <label>Designation</label>
        <input name="designation" value={form.designation} onChange={handleChange} required />

        <label>Location</label>
        <input name="location" value={form.location} onChange={handleChange} required />

        <label>Salary</label>
        <input name="salary" type="number" min="0" value={form.salary} onChange={handleChange} required />

        <button type="submit">Submit</button>
      </form>
    </main>
  )
}

function App() {
  return (
    <BrowserRouter>
      <nav className="navbar">
        <h2>Employee Dashboard</h2>
        <div>
          <Link to="/">Home</Link>
          <Link to="/employee-form">Employee Form</Link>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/employee-form" element={<EmployeeForm />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
