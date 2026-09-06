export const Login = () => {
    return (
        <div className="container-fluid min-vh-100 d-flex justify-content-center align-items-center bg-light">
            <div className="card shadow border-0" style={{ width: "400px" }}>
                <div className="card-body p-4">

                    <div className="text-center mb-4">
                        <h2 className="fw-bold">Admin Panel</h2>
                        <p className="text-muted">
                            Sign in to access the dashboard
                        </p>
                    </div>

                    <form>

                        <div className="mb-3">
                            <label className="form-label fw-semibold">
                                Email Address
                            </label>

                            <input
                                type="email"
                                className="form-control"
                                placeholder="Enter your email"
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label fw-semibold">
                                Password
                            </label>

                            <input
                                type="password"
                                className="form-control"
                                placeholder="Enter your password"
                            />
                        </div>

                        <div className="d-flex justify-content-between align-items-center mb-4">

                            <div className="form-check">
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="rememberMe"
                                />

                                <label
                                    className="form-check-label"
                                    htmlFor="rememberMe"
                                >
                                    Remember me
                                </label>
                            </div>

                            <a href="/" className="text-decoration-none">
                                Forgot Password?
                            </a>

                        </div>

                        <button
                            type="submit"
                            className="btn btn-dark w-100"
                        >
                            Login
                        </button>

                    </form>

                </div>
            </div>
        </div>
    )
}