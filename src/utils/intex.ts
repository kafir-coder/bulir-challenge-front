export const fixTinaResults = <T>(data: T): T => {
  try {
    const serializedData = JSON.stringify(data);
    return JSON.parse(serializedData) as T;
  } catch (error) {
    console.error("Error in serializing/deserializing data:", error);
    throw new Error("Handling data failed");
  }
};

export const formatDate = (dateString: string) => {
  if(!dateString) {
    return ""
  }

  return (new Date(dateString)).toLocaleDateString() 
}