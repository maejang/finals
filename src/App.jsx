import { useState } from "react";
import { Container, Row, Col, Form, Table, Navbar, Button, Card } from "react-bootstrap";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

function App() {
  const [fname, setfname] = useState("");
  const [lname, setlname] = useState("");
  const [course, setCourse] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!fname || !lname || !course || !email || !address) {
      alert("Please fill in all fields.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${address}`);
      const data = await response.json();

      if (data.length === 0) {
        alert("Address not found. Please try a different address.");
        return;
      }

      const result = data[0];
      
      const newStudent = {
        id: Date.now(),
        fname,
        lname,
        course,
        email,
        Address: address,
        latitude: Number(result.lat),
        longitude: Number(result.lon),
      };

      setStudents(prev => [...prev, newStudent]);

      setfname("");
      setlname("");
      setCourse("");
      setEmail("");
      setAddress("");
    } catch (error) {
      console.error(error);
      alert("Something went wong while fetching the location.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (id) => {
    setStudents(students.filter(student => student.id !== id));
  };

  return (
    <div className="bg-[#fff5f7] min-h-screen text-[#ff4d6d]">
      <Navbar className="bg-white border-b border-[#ffc2d1] px-4 py-3 shadow-sm">
        <Container fluid className="max-w-7xl mx-auto flex-column flex-sm-row justify-between align-items-center gap-3">
          <Navbar.Brand className="m-0">
            <h1 className="text-xl font-extrabold text-[#ff4d6d] tracking-wide m-0">
              STUDENT LOCATION SYSTEM
            </h1>
            <p className="text-xs text-[#ff7096] mt-0.5 mb-0 font-normal">
              Register students and view their locations on the map
            </p>
          </Navbar.Brand>
          <Navbar.Text className="bg-[#ffe6ed] text-[#ff4d6d] px-4 py-2 rounded-xl border border-[#ffc2d1] text-xs font-bold m-0">
            Total Student: <span className="text-sm font-black ml-1 text-[#ff4d6d]">{students.length}</span>
          </Navbar.Text>
        </Container>
      </Navbar>

      <section className="bg-[#ffe6ed] border-b border-[#ffc2d1] py-8 text-center px-4">
        <div className="inline-block bg-[#ff4d6d] text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider mb-3 shadow-sm">
          Maeden Navarro || INF232
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-[#ff4d6d] uppercase tracking-tight m-0">
          Student Locations
        </h2>
      </section>

      <Container fluid className="max-w-7xl mx-auto px-4 py-8">
        <Row className="g-4 items-start">
          
          <Col lg={5}>
            <Card className="bg-white rounded-3xl border border-[#ffb3c6]/60 shadow-lg shadow-pink-100 overflow-hidden">
              <Card.Header className="bg-[#fff0f5] border-b border-[#ffe6ed] px-6 py-4">
                <h3 className="text-sm font-bold text-[#ff4d6d] uppercase tracking-wider m-0">
                  Student Registration
                </h3>
              </Card.Header>
              
              <Card.Body className="p-6">
                <Form onSubmit={handleSubmit} className="space-y-4">
                  <Row className="g-3">
                    <Col sm={6}>
                      <Form.Group>
                        <Form.Label className="block text-xs font-bold text-[#ff4d6d] uppercase mb-1">
                          Firstname
                        </Form.Label>
                        <Form.Control 
                          type="text" 
                          placeholder="Enter Firstname" 
                          value={fname} 
                          onChange={(e) => setfname(e.target.value)} 
                          className="w-full bg-white border border-[#ffb3c6] text-[#ff4d6d] placeholder:text-[#ffb3c6] text-sm rounded-xl p-3 focus:bg-white focus:border-[#ff8fab] focus:shadow-none transition"
                        />
                      </Form.Group>
                    </Col>

                    <Col sm={6}>
                      <Form.Group>
                        <Form.Label className="block text-xs font-bold text-[#ff4d6d] uppercase mb-1">
                          Lastname
                        </Form.Label>
                        <Form.Control 
                          type="text" 
                          placeholder="Enter Lastname" 
                          value={lname} 
                          onChange={(e) => setlname(e.target.value)} 
                          className="w-full bg-white border border-[#ffb3c6] text-[#ff4d6d] placeholder:text-[#ffb3c6] text-sm rounded-xl p-3 focus:bg-white focus:border-[#ff8fab] focus:shadow-none transition"
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Form.Group>
                    <Form.Label className="block text-xs font-bold text-[#ff4d6d] uppercase mb-1">
                      Course
                    </Form.Label>
                    <Form.Select 
                      value={course} 
                      onChange={(e) => setCourse(e.target.value)}
                      className="w-full bg-white border border-[#ffb3c6] text-[#ff4d6d] text-sm rounded-xl p-3 focus:bg-white focus:border-[#ff8fab] focus:shadow-none transition"
                    >
                      <option value="">Select Course</option>
                      <option value="BSCS">BSChem</option>
                      <option value="BSIT">BSCS</option>
                      <option value="BSIS">BSIT</option>
                      <option value="BSCpE">BSBA</option>
                      <option value="BSIS">BSCE</option>
                    </Form.Select>
                  </Form.Group>

                  <Form.Group>
                    <Form.Label className="block text-xs font-bold text-[#ff4d6d] uppercase mb-1">
                      Email
                    </Form.Label>
                    <Form.Control 
                      type="email" 
                      placeholder="student@email.com" 
                      value={email} 
                      onChange={(e) => setEmail(e.target.value)} 
                      className="w-full bg-white border border-[#ffb3c6] text-[#ff4d6d] placeholder:text-[#ffb3c6] text-sm rounded-xl p-3 focus:bg-white focus:border-[#ff8fab] focus:shadow-none transition"
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label className="block text-xs font-bold text-[#ff4d6d] uppercase mb-1">
                      Address
                    </Form.Label>
                    <Form.Control 
                      as="textarea" 
                      rows={3} 
                      placeholder="Example: Pasay City, Philippines" 
                      value={address} 
                      onChange={(e) => setAddress(e.target.value)} 
                      className="w-full bg-white border border-[#ffb3c6] text-[#ff4d6d] placeholder:text-[#ffb3c6] text-sm rounded-xl p-3 focus:bg-white focus:border-[#ff8fab] focus:shadow-none transition resize-none"
                    />
                  </Form.Group>

                  <Button 
                    type="submit" 
                    disabled={loading}
                    className="w-full bg-[#ff8fab] border-0 hover:bg-[#ff7096] text-white py-3.5 rounded-xl font-bold uppercase text-xs tracking-wider shadow-md shadow-pink-200 transition active:scale-[0.99] disabled:opacity-50 mt-2"
                  >
                    {loading ? "Transmitting..." : "Initialize Registration"}
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>

          <Col lg={7}>
            <Card className="bg-white rounded-3xl border border-[#ffb3c6]/60 shadow-lg shadow-pink-100 overflow-hidden">
              <Card.Header className="bg-[#fff0f5] border-b border-[#ffe6ed] px-6 py-4">
                <h3 className="text-sm font-bold text-[#ff4d6d] uppercase tracking-wider m-0">
                  Student Location
                </h3>
                <p className="text-xs text-[#ff7096] mt-0.5 mb-0 font-normal">
                  Interactive Student Location Map
                </p>
              </Card.Header>

              <Card.Body className="p-4">
                <div className="h-[520px] rounded-2xl overflow-hidden border-2 border-[#ffc2d1]">
                  <MapContainer center={[14.5995, 121.033]} zoom={11} style={{ height: "100%", width: "100%" }}>
                    <TileLayer
                      attribution='&copy; OpenStreetMap contributors'
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    
                    {students.map((student) => (
                      <Marker key={student.id} position={[student.latitude, student.longitude]}>
                        <Popup>
                          <div className="text-[#ff4d6d] p-1">
                            <h6 className="font-bold text-xs uppercase text-[#ff4d6d] mb-0.5">
                              {student.fname} {student.lname}
                            </h6>
                            <p className="text-[11px] font-extrabold text-[#ff8fab] uppercase mb-2 tracking-wider">
                              {student.course}
                            </p>
                            <p className="text-xs mb-1 text-[#ff4d6d]"><strong>Email:</strong> {student.email}</p>
                            <p className="text-xs mb-1 text-[#ff4d6d]"><strong>Address:</strong> {student.Address}</p>
                            <p className="text-xs mb-0 text-[#ff4d6d]"><strong>Coordinates:</strong> {student.latitude.toFixed(4)}, {student.longitude.toFixed(4)}</p>
                          </div>
                        </Popup>
                      </Marker>
                    ))}
                  </MapContainer>
                </div>
              </Card.Body>
            </Card>
          </Col>

        </Row>

        <Row className="mt-8">
          <Col>
            <Card className="bg-white rounded-3xl border border-[#ffb3c6]/60 shadow-lg shadow-pink-100 overflow-hidden">
              <Card.Header className="bg-[#fff0f5] border-b border-[#ffe6ed] px-6 py-4">
                <h3 className="text-sm font-bold text-[#ff4d6d] uppercase tracking-wider m-0">
                  Registered Student
                </h3>
              </Card.Header>

              <Card.Body className="p-0">
                <Table hover responsive className="m-0 text-left align-middle border-0">
                  <thead>
                    <tr className="bg-[#ffe6ed] border-b border-[#ffc2d1] text-[12px] font-bold text-[#ff4d6d] uppercase tracking-wider">
                      <th className="py-3.5 px-6 border-0 text-[#ff4d6d] bg-[#ffe6ed]">#</th>
                      <th className="py-3.5 px-4 border-0 text-[#ff4d6d] bg-[#ffe6ed]">Student</th>
                      <th className="py-3.5 px-4 text-center border-0 text-[#ff4d6d] bg-[#ffe6ed]">Course</th>
                      <th className="py-3.5 px-4 text-center border-0 text-[#ff4d6d] bg-[#ffe6ed]">Email</th>
                      <th className="py-3.5 px-4 text-center border-0 text-[#ff4d6d] bg-[#ffe6ed]">Address</th>
                      <th className="py-3.5 px-4 text-center border-0 text-[#ff4d6d] bg-[#ffe6ed]">Coordinates</th>
                      <th className="py-3.5 px-6 text-center border-0 text-[#ff4d6d] bg-[#ffe6ed]">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#ffe6ed] text-xs">
                    {students.length === 0 ? (
                      <tr>
                        <td colSpan="7" className="text-center py-10 font-bold uppercase text-[#ff7096] tracking-wider border-0 bg-white">
                          No Personnel Found in Database
                        </td>
                      </tr>
                    ) : (
                      students.map((student, index) => (
                        <tr key={student.id} className="hover:bg-[#fff0f5]/50 transition">
                          <td className="py-4 px-6 font-bold text-[#ff4d6d] border-0 bg-white">{index + 1}</td>
                          <td className="py-4 px-4 font-bold text-[#ff4d6d] uppercase border-0 bg-white">
                            {student.fname} {student.lname}
                          </td>
                          <td className="py-4 px-4 text-center border-0 bg-white">
                            <span className="bg-[#ff8fab] text-white text-[11px] font-bold px-2.5 py-1 rounded-md uppercase border-0">
                              {student.course}
                            </span>
                          </td>
                          <td className="py-4 px-4 text-center text-[#ff7096] border-0 bg-white">{student.email}</td>
                          <td className="py-4 px-4 text-center text-[#ff7096] border-0 bg-white">{student.Address}</td>
                          <td className="py-4 px-4 text-center font-mono text-[11px] text-[#ff7096] border-0 bg-white">
                            <div>LAT: {student.latitude.toFixed(5)}</div>
                            <div>LNG: {student.longitude.toFixed(5)}</div>
                          </td>
                          <td className="py-4 px-6 text-center border-0 bg-white">
                            <Button 
                              type="button"
                              onClick={() => handleDelete(student.id)}
                              className="bg-[#fff0f5] border border-[#ff8fab] text-[#ff7096] hover:bg-[#ff8fab] hover:text-white px-3 py-1.5 rounded-lg text-[11px] font-bold uppercase transition shadow-none"
                            >
                              Delete
                            </Button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;