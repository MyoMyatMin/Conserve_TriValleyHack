// if (surveyTime === "morning") {
//   console.log(totalCarbonFootprint);
//   try {
//     const apiUrl = process.env.EXPO_PUBLIC_API_URL;
//     const res = await fetch(`${apiUrl}/api/transportation/morning/create`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ data: totalCarbonFootprint }),
//     });

//     if (!res.ok) {
//       throw new Error(`Error: ${res.status} ${res.statusText}`);
//     }
//     setShowResult(true);
//   } catch (error) {
//     console.log("Request failed:", error.message);
//     Alert.alert("Error", `Request failed: ${error.message}`);
//   }
// } else if (surveyTime === "afternoon") {
//   console.log(surveyTime, totalCarbonFootprint);
//   try {
//     const apiUrl = process.env.EXPO_PUBLIC_API_URL;
//     console.log(apiUrl);
//     const res = await fetch(`${apiUrl}/api/transportation/noon/create`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ data: totalCarbonFootprint }),
//     });

//     if (!res.ok) {
//       throw new Error(`Error: ${res.status} ${res.statusText}`);
//     }

//     const result = await res.json();
//     setShowResult(true);
//   } catch (error) {
//     console.log("Request failed:", error.message);
//     Alert.alert("Error", `Request failed: ${error.message}`);
//   }
// } else {
//   console.log(totalCarbonFootprint);
//   try {
//     const apiUrl = process.env.EXPO_PUBLIC_API_URL;
//     const res = await fetch(`${apiUrl}/api/transportation/evening/create`, {
//       method: "POST",

//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ data: totalCarbonFootprint }),
//     });

//     if (!res.ok) {
//       throw new Error(`Error: ${res.status} ${res.statusText}`);
//     }

//     setShowResult(true);
//   } catch (error) {
//     console.log("Request failed:", error.message);
//     Alert.alert("Error", `Request failed: ${error.message}`);
//   }
// }
