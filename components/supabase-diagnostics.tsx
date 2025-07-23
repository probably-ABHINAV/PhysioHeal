import React, { useEffect, useState } from "react";

type StatusType = "pass" | "fail" | "warning" | "running" | "unknown";

interface StatusBadgeProps {
  status: StatusType;
}

function StatusBadge({ status }: StatusBadgeProps) {
  let colorClass = "";
  let label = status;

  switch (status) {
    case "pass":
      colorClass = "bg-green-500 text-white";
      label = "pass";
      break;
    case "fail":
      colorClass = "bg-red-500 text-white";
      label = "fail";
      break;
    case "warning":
      colorClass = "bg-yellow-500 text-black";
      label = "warning";
      break;
    case "running":
      colorClass = "bg-blue-500 text-white";
      label = "running";
      break;
    case "unknown":
    default:
      colorClass = "bg-gray-400 text-white";
      label = "unknown";
      break;
  }

  return (
    <span className={`px-2 py-1 text-xs font-semibold rounded ${colorClass}`}>
      {label.charAt(0).toUpperCase() + label.slice(1)}
    </span>
  );
}

export default function SupabaseDiagnostics() {
  const [status, setStatus] = useState<StatusType>("running");

  // Simulate overall status retrieval
  const getOverallStatus = (): StatusType => {
    // Replace this with real logic
    return status;
  };

  useEffect(() => {
    // Example: after some checks, set final status
    const timer = setTimeout(() => {
      setStatus("unknown"); // Example: final status
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="p-4 border rounded-md bg-white shadow">
      <div className="flex items-center space-x-3">
        <span className="text-lg font-medium">Overall Status:</span>
        <StatusBadge status={getOverallStatus()} />
      </div>
      <span className="text-sm text-muted-foreground">
        Last run: {new Date().toLocaleString()}
      </span>
    </div>
  );
}
