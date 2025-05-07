export async function deleteData<T>(endpoint: string, data?: T): Promise<any> {
    try {
      const response = await fetch(endpoint, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
  
      const result = await response.json();
  
      if (!response.ok) {
        throw new Error(result.error || "Failed to delete data");
      }
  
      return result;
    } catch (error) {
      console.error("delete data error:", error);
      throw error;
    }
  }
  