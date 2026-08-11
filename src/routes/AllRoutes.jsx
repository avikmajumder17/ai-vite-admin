import { Route, Routes } from "react-router-dom";

import Homepage from "../pages/Homepage";



export const AllRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Homepage />} />
        </Routes>
    )
}
