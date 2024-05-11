export async function fetchDummyData(): Promise<any[]> {
  // Dummy data array
  const dummyUsers = [
    { id: 1, name: "Alice", email: "alice@example.com" },
    { id: 2, name: "Bob", email: "bob@example.com" },
    { id: 3, name: "Carol", email: "carol@example.com" }
  ];

  // Return a new promise that resolves with the dummy data after a delay
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(dummyUsers);
    }, 1000);  // Simulates a 1-second network delay
  });
}
