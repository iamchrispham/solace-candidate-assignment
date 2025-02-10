import { useEffect, useState } from "react";
import { Advocate } from "../types/advocates";

export function useGetAdvocates(searchTerm?: string) {
  const [advocates, setAdvocates] = useState<Advocate[]>([]);

  useEffect(() => {
    const query = searchTerm
      ? `?searchTerm=${encodeURIComponent(searchTerm)}`
      : "";
    fetch(`/api/advocates${query}`)
      .then((response) => response.json())
      .then((jsonResponse) => {
        setAdvocates(jsonResponse.data || []);
      })
      .catch((err) => {
        console.error("Failed to fetch advocates:", err);
      });
  }, [searchTerm]);

  return { advocates };
}
