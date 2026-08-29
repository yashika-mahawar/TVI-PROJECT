import { useEffect, useState } from "react";
import API from "../services/api";

const useAdminStats = () => {
  const [data, setData] = useState({
    students: 0,
    courses: 0,
    videos: 0,
    enrollments: 0,
    recentEnrollments: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reloadIndex, setReloadIndex] = useState(0);

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);

      const [dashboardResult, enrollmentsResult] = await Promise.allSettled([
        API.get("/admin/dashboard"),
        API.get("/admin/recent-enrollments"),
      ]);

      if (dashboardResult.status === "fulfilled") {
        const stats = dashboardResult.value.data;
        setData((prev) => ({
          ...prev,
          students: stats.students ?? 0,
          courses: stats.courses ?? 0,
          videos: stats.videos ?? 0,
          enrollments: stats.enrollments ?? 0,
        }));
      } else {
        console.error("useAdminStats dashboard error:", dashboardResult.reason);
        setError(dashboardResult.reason);
      }

      if (enrollmentsResult.status === "fulfilled") {
        setData((prev) => ({
          ...prev,
          recentEnrollments: enrollmentsResult.value.data.enrollments ?? [],
        }));
      } else {
        console.error("useAdminStats enrollments error:", enrollmentsResult.reason);
        setError(enrollmentsResult.reason);
      }

      setLoading(false);
    };

    fetchStats();
  }, [reloadIndex]);

  const refetch = () => setReloadIndex((index) => index + 1);

  return { ...data, loading, error, refetch };
};

export default useAdminStats;
