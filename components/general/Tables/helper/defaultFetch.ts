import { authFetch } from "@/hooks/auth-fetch";

/**
 * Fetch function to retrieve all records from a custom API.
 *
 * @param {Object} params - The parameters for fetching data.
 * @param {number} [params.skip=0] - The starting index for pagination.
 * @param {number} params.limit - The number of records to retrieve.
 * @param {Object} params.filters - Filters applied to the request.
 * @param {string} params.textFilter - Text-based filter for searching.
 * @param {Object} params.params - Additional parameters for filtering.
 * @param {string} params.api_url - The API endpoint to fetch data from.
 *
 * @returns {Promise<Object|undefined>} Returns a list of objects if successful,
 *          or an error message if there is a failure.
 */
export async function getDataCustomeHandle({
  page = 0,
  size,
  filters,
  textFilter,
  params,
  api_url,
}: any) {
  try {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        page,
        size,
        filters,
        textFilter,
        params,
      }),
    };

    const resp = await authFetch(api_url, options);

    // Redirect if unauthorized
    if (resp.status === 401) {
      window.location.href = "forbidden";
    }

    // Handle server errors
    if (resp.status === 500) {
      return new Error("Server Error fetching: daily orders");
    }

    // Handle client errors (bad request)
    if (resp.status === 400) {
      return new Error("No records found for this search");
    }

    const data = await resp.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch data:", error);
    return undefined;
  }
}
