
export async function createData<T>(
    endpoint: string,
    data: T
  ): Promise<any> {
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
  
      const result = await response.json();
  
      if (!response.ok) {
        throw new Error(result.error || "Failed to create data");
      }
  
      return result;
    } catch (error) {
      console.error("createData error:", error);
      throw error;
    }
  }
  