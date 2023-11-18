

export async function fetchProducts() {
  try {
    const response = await fetch('http://localhost:5000/products/all');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}
