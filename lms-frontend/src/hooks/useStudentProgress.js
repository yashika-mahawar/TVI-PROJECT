import { useEffect, useState } from "react";
import API from "../services/api";

const useStudentProgress = () => {
  const [data, setData] = useState({
    courses: [],
    enrolledCourses: 0,
    completedCourses: 0,
    inProgress: 0,
    overallProgress: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reloadIndex, setReloadIndex] = useState(0);

  useEffect(() => {
    const fetchProgress = async () => {
      const user = JSON.parse(localStorage.getItem("user"));

      if (!user?.id) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await API.get(`/progress/user/${user.id}`);
        const result = response.data;

        setData({
          courses: result.courses ?? [],
          enrolledCourses: result.enrolledCourses ?? 0,
          completedCourses: result.completedCourses ?? 0,
          inProgress: result.inProgress ?? 0,
          overallProgress: result.overallProgress ?? 0,
        });
        setError(null);
      } catch (err) {
        console.error("useStudentProgress error:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProgress();
  }, [reloadIndex]);

  const refetch = () => setReloadIndex((index) => index + 1);

  return { ...data, loading, error, refetch };
};

export default useStudentProgress;
