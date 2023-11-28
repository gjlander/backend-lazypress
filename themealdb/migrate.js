import fs from "fs/promises";
// const letters =["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "r", "s", "t", "v", "w", "y"]
try {
    // letters.forEach((letter)=> {})
    const data = await fetch(
        "https://themealdb.com/api/json/v1/1/search.php?f=y"
    );
    //this is where the URL with our access tokens was, but we don't need to run this function again
    const parsedData = await data.json();

    // console.log(parsedData.meals[0]);

    const formattedData = parsedData.meals.map((meal) => {
        const ingArray = [];
        const amounts = [];
        Object.entries(meal).forEach(([key, value]) => {
            if (key.startsWith("strIngredient") && value) {
                ingArray.push(value);
            }
        });
        Object.entries(meal).forEach(([key, value]) => {
            if (key.startsWith("strMeasure") && value) {
                amounts.push(value);
            }
        });
        const stepsArray = meal.strInstructions.split("\r\n");
        let tagsArray;
        meal.strTags && (tagsArray = meal.strTags.split(","));

        const ingWAmounts = ingArray.map((ing, i) => ({
            ing: ing,
            amount: amounts[i],
        }));
        // console.log("ingArray", ingArray);
        // console.log(stepsArray);
        // console.log("with amounts", ingWAmounts);
        const usableObj = {
            title: meal.strMeal,
            category: meal.strCategory,
            region: meal.strArea,
            ingList: ingWAmounts,
            steps: stepsArray,
            imgUrl: meal.strMealThumb,
            videoUrl: meal.strYoutube,
            tags: tagsArray || ["Misc"],
        };
        return usableObj;
    });
    // console.log(formattedData);

    // parsedData.meals.forEach((meal) => {
    //     console.log(meal);
    // });
    await fs.writeFile("yMeals.json", JSON.stringify(formattedData), "utf8");
    console.log("json file added");
} catch (err) {
    console.log(err.message);
}
