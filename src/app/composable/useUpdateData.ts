export async function updateData<T>(endpoint: string, data?: T): Promise<any> {
    try {
      const response = await fetch(endpoint, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
  
      const result = await response.json();
  
      if (!response.ok) {
        throw new Error(result.error || "Failed to update data");
      }
  
      return result;
    } catch (error) {
      console.error("update data error:", error);
      throw error;
    }
  }
  