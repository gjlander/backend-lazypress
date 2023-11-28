import algoliasearch from "algoliasearch";

// Connect and authenticate with your Algolia app
const algClient = algoliasearch(
    process.env.ALG_APP_ID,
    process.env.ALG_ADMIN_API_KEY
);

const recipePagesIndex = algClient.initIndex("recipe_pages");
const recipesIndex = algClient.initIndex("recipes");

export { recipesIndex, recipePagesIndex };
// Create a new index and add a record
// const index = algClient.initIndex("test_index");
// const record = { objectID: 1, name: "test_record" };
// index.saveObject(record).wait();

// Search the index and print the results
// index
//     .search("test_record")
//     .then(({ hits }) => console.log(hits[0]))
//     .catch((err) => console.error(err));
