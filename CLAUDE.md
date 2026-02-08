# General overview

This app is a recipe management app. It's the primary way in which you manage your recipe collection and plan the meals you make throughout the week.

This is how the typical user will use the app:

On Sunday, the user is planning the meals for the upcoming week. They are not interested in planning for the whole week, but instead trying to get a general outline of which groceries to buy so it's possible to make three meals in the course of the next four days, with one day being either reheating leftovers, a simple sandwich or oatmeal day, or takeaway every now and then.

The backbone is a collection of recipes from various websites and books. The recipes from the books are scanned and using OCR and AI capabilities, they are added to the recipe collection with a reference back to where they came from. As for the recipes from websites, they also link back to where they came from.

The user can write in at any point in time that they need some help coming up with e.g. "an italian-inspired weeknight meal, and in the panty there's carrot, some leftover grilled chicken, mayo, basil, tomato, cucumber, yogurt, mint, and other pantry stables". Based on that information, you will be able to come up with a healthy meal for four people - two adults and two pre-teen kids.

The implementation plan is like so:

- The app should be built on React, but adhere strictly to the HTML spec for accessible websites and have no janky animations that makes it feel completely out of place
- The styling must be done using Tailwind CSS
- The app must be built with as simple a database as possible - possibly even JSON. This is TBD, as I need your guidance
- Basic app skeleton implementation with placeholders for "View all recipes", "Add new recipe manually", "Edit recipe"
- The recipes must be stored following the schema.org definition for recipes for easy indexing by search engines and compatibility
- Later, it must be possible to upload a photo of a page from a book with a recipe, and have an AI convert it into the appropriate recipe format, including changing all measurements from imperial to metric as needed (e.g. "1 tbsp" should not be converted, but 1 "fl.oz" should)
- Even later, it should be possible to converse with the app and find out what should be the meal plan for the coming days and add all missing ingredients to a grocery shopping list