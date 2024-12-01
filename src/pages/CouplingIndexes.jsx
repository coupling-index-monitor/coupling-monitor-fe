import React, { useState } from "react";
import { Graph } from "react-d3-graph";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";

const ToggleSection = ({ title, severity, children }) => {
    const [isOpen, setIsOpen] = useState(false);

    const getSeverityStyle = (level) => {
        switch (level) {
            case "High":
                return "bg-red-500 text-white";
            case "Medium":
                return "bg-yellow-500 text-white";
            case "Low":
                return "bg-green-500 text-white";
            default:
                return "bg-gray-300 text-gray-700";
        }
    };

    return (
        <div className="bg-white border rounded shadow-md mb-4">
            <button
                className={`w-full text-left px-6 py-4 flex justify-between items-center text-lg font-semibold ${
                    isOpen ? "bg-gray-300" : "bg-gray-200"
                } hover:bg-gray-300`}
                onClick={() => setIsOpen(!isOpen)}
            >
                <span>{isOpen ? `Hide ${title}` : `Show ${title}`}</span>
                <span className="flex items-center space-x-2">
                    <span
                        className={`px-2 py-1 text-xs font-bold rounded ${getSeverityStyle(
                            severity
                        )}`}
                    >
                        {severity}
                    </span>
                    <span>{isOpen ? "▲" : "▼"}</span>
                </span>
            </button>
            {isOpen && <div className="p-6 bg-gray-50">{children}</div>}
        </div>
    );
};

const ExcessiveDependencyTable = ({ data }) => (
    <>
        <p className="text-sm text-gray-600">
            Excessive dependency indicates services that rely on a large number of other services, making them fragile and hard to maintain.
        </p>
        <div className="overflow-x-auto">
            <table className="w-full table-auto border-collapse border border-gray-300 mt-4 text-sm">
                <thead>
                <tr className="bg-gray-200 text-left">
                    <th className="border border-gray-300 px-4 py-2">Service</th>
                    <th className="border border-gray-300 px-4 py-2">Dependencies</th>
                </tr>
                </thead>
                <tbody>
                {data.map((item, index) => (
                    <tr key={index} className="hover:bg-gray-100">
                        <td className="border border-gray-300 px-4 py-2">{item.service}</td>
                        <td className="border border-gray-300 px-4 py-2">{item.count}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
        <ul className="list-disc list-inside mt-4 space-y-2">
            <li>Identify critical dependencies and evaluate if they can be reduced.</li>
            <li>Introduce service abstractions or APIs to consolidate dependencies.</li>
            <li>Regularly review service dependencies to avoid unnecessary complexity.</li>
        </ul>
    </>
);


const CouplingIndexes = () => {

    const excessiveDependencyData = [
        { service: "Service-A", count: 10 },
        { service: "Service-C", count: 9 },
    ];

    return (
        <div className="p-6 space-y-6">
            <h1 className="text-2xl font-bold">Coupling Indexes</h1>
            <p>Run an analysis to measure the coupling of your microservices</p>
            <button className="bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600 mb-6">
                Run Detection
            </button>
            
            <ToggleSection title="Coupling Between Microservices (CBM)" severity="Low">
                <ExcessiveDependencyTable data={excessiveDependencyData} />
            </ToggleSection>
            
            <ToggleSection title="Weighted Coupling Between Microservices (WCBM)" severity="Low">
                <ExcessiveDependencyTable data={excessiveDependencyData} />
            </ToggleSection>
            
            <ToggleSection title="Absolute Coupling Between Microservices (ACBM)" severity="Low">
                <ExcessiveDependencyTable data={excessiveDependencyData} />
            </ToggleSection>
        </div>
    );
};

export default CouplingIndexes;
