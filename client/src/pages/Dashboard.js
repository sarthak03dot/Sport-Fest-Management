import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Nav, Button } from "react-bootstrap";

const Dashboard = () => {
    const navigate = useNavigate();
    const userRole = localStorage.getItem("role");
    const isAuthenticated = localStorage.getItem("token");

    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/login"); // Redirect to login if not logged in
        }
    }, [isAuthenticated, navigate]);

    // 🔥 Logout Function
    const handleLogout = () => {
        localStorage.removeItem("token"); // Remove token
        localStorage.removeItem("role"); // Remove role
        navigate("/login"); // Redirect to login
    };

    return (
        <div className="d-flex">
            {/* Sidebar */}
            <div className="bg-dark text-white p-3 min-vh-100" style={{ width: "250px" }}>
                <h4 className="text-center">Dashboard</h4>
                <Nav className="flex-column">
                    <Nav.Link href="/dashboard" className="text-white">🏠 Home</Nav.Link>
                    <Nav.Link href="/events" className="text-white">🎯 Events</Nav.Link>
                    <Nav.Link href="/matches" className="text-white">🏆 Matches</Nav.Link>
                    <Nav.Link href="/leaderboard" className="text-white">📊 Leaderboard</Nav.Link>

                    {/* Admin-Only Links */}
                    {userRole === "admin" && (
                        <>
                            <Nav.Link href="/admin" className="text-white">⚙️ Admin Panel</Nav.Link>
                            <Nav.Link href="/admin/events" className="text-white">📅 Manage Events</Nav.Link>
                            <Nav.Link href="/admin/teams" className="text-white">🏅 Manage Teams</Nav.Link>
                            <Nav.Link href="/admin/results" className="text-white">📊 Results</Nav.Link>
                        </>
                    )}

                    {/* Player-Only Links */}
                    {userRole === "player" && (
                        <>
                            <Nav.Link href="/player/dashboard" className="text-white">🎮 My Profile</Nav.Link>
                            <Nav.Link href="/player/join-game" className="text-white">➕ Join Game</Nav.Link>
                        </>
                    )}

                    {/* 🚀 Logout Button */}
                    <Button variant="danger" className="mt-3" onClick={handleLogout}>🚪 Logout</Button>
                </Nav>
            </div>

            {/* Main Content */}
            <Container fluid className="p-4">
                <h2>Welcome to Sports Fest Dashboard</h2>

                {/* Common Stats for Everyone */}
                <Row className="mt-4">
                    <Col md={4}>
                        <Card className="shadow-sm">
                            <Card.Body>
                                <h5>Total Teams</h5>
                                <h3>10</h3>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col md={4}>
                        <Card className="shadow-sm">
                            <Card.Body>
                                <h5>Registered Players</h5>
                                <h3>50</h3>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col md={4}>
                        <Card className="shadow-sm">
                            <Card.Body>
                                <h5>Ongoing Matches</h5>
                                <h3>3</h3>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                {/* Upcoming Matches & Recent Results (Visible to All) */}
                <Row className="mt-4">
                    <Col md={6}>
                        <Card className="shadow-sm">
                            <Card.Body>
                                <h5>Upcoming Matches</h5>
                                <ul>
                                    <li>🏀 Basketball Finals - 3 PM</li>
                                    <li>⚽ Football Semifinals - 5 PM</li>
                                    <li>🏏 Cricket Match - 7 PM</li>
                                </ul>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col md={6}>
                        <Card className="shadow-sm">
                            <Card.Body>
                                <h5>Recent Results</h5>
                                <ul>
                                    <li>🏆 Basketball: Team A won</li>
                                    <li>⚽ Football: Team B won</li>
                                    <li>🏏 Cricket: Team C won</li>
                                </ul>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                {/* Admin-Only Section */}
                {userRole === "admin" && (
                    <Row className="mt-4">
                        <Col md={12}>
                            <Card className="shadow-sm bg-warning">
                                <Card.Body>
                                    <h5>Admin Controls</h5>
                                    <p>Manage teams, events, and update results.</p>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                )}

                {/* Player-Only Section */}
                {userRole === "player" && (
                    <Row className="mt-4">
                        <Col md={12}>
                            <Card className="shadow-sm bg-info">
                                <Card.Body>
                                    <h5>Player Options</h5>
                                    <p>Join new matches and track your performance.</p>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                )}
            </Container>
        </div>
    );
};

export default Dashboard;
