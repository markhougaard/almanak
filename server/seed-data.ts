export interface SeedRecipe {
  id: string;
  name: string;
  description: string;
  ingredients: string[];
  instructions: { "@type": "HowToStep"; position: number; text: string }[];
  image?: string;
  recipeYield?: string;
  prepTime?: string;
  cookTime?: string;
  totalTime?: string;
  category?: string;
  cuisine?: string;
  author?: string;
  url?: string;
  createdAt: string;
  updatedAt: string;
}

export const seedRecipes: SeedRecipe[] = [
  {
    id: "seed-spaghetti-aglio-e-olio",
    createdAt: "2025-01-15T12:00:00Z",
    updatedAt: "2025-01-15T12:00:00Z",
    name: "Spaghetti Aglio e Olio",
    description:
      "A classic Roman pasta dish with garlic, chilli flakes, and olive oil. Ready in under 20 minutes and deeply satisfying.",
    recipeYield: "4 servings",
    prepTime: "PT5M",
    cookTime: "PT12M",
    totalTime: "PT17M",
    category: "Dinner",
    cuisine: "Italian",
    author: "Traditional",
    ingredients: [
      "400 g spaghetti",
      "6 cloves garlic, thinly sliced",
      "80 ml extra-virgin olive oil",
      "1 tsp red chilli flakes",
      "Small bunch flat-leaf parsley, roughly chopped",
      "Salt to taste",
      "30 g Pecorino Romano, finely grated (optional)",
    ],
    instructions: [
      {
        "@type": "HowToStep",
        position: 1,
        text: "Bring a large pot of well-salted water to a rolling boil. Cook the spaghetti according to package directions until al dente. Reserve 250 ml of the pasta cooking water before draining.",
      },
      {
        "@type": "HowToStep",
        position: 2,
        text: "While the pasta cooks, heat the olive oil in a large frying pan over medium-low heat. Add the sliced garlic and chilli flakes. Cook gently for 2\u20133 minutes, stirring frequently, until the garlic is pale gold but not browned.",
      },
      {
        "@type": "HowToStep",
        position: 3,
        text: "Add the drained spaghetti to the frying pan along with about 80 ml of the reserved pasta water. Toss vigorously over medium heat for 1\u20132 minutes until the oil and water emulsify into a light sauce that clings to the pasta. Add more pasta water if needed.",
      },
      {
        "@type": "HowToStep",
        position: 4,
        text: "Remove from heat, toss through the chopped parsley, and serve immediately. Top with grated Pecorino if desired.",
      },
    ],
  },
  {
    id: "seed-chicken-tikka-masala",
    createdAt: "2025-01-15T12:00:00Z",
    updatedAt: "2025-01-15T12:00:00Z",
    name: "Chicken Tikka Masala",
    description:
      "Tender marinated chicken pieces in a creamy, spiced tomato sauce. A family-friendly classic that pairs perfectly with basmati rice and naan.",
    recipeYield: "4 servings",
    prepTime: "PT20M",
    cookTime: "PT35M",
    totalTime: "PT55M",
    category: "Dinner",
    cuisine: "Indian",
    author: "Traditional",
    ingredients: [
      "600 g boneless chicken thighs, cut into 3 cm pieces",
      "150 g plain yogurt",
      "1 tbsp lemon juice",
      "2 tsp ground cumin",
      "2 tsp paprika",
      "1 tsp garam masala",
      "1 tsp ground turmeric",
      "1 tsp salt",
      "2 tbsp vegetable oil",
      "1 large onion, finely diced",
      "3 cloves garlic, minced",
      "1 tbsp fresh ginger, grated",
      "400 g tinned chopped tomatoes",
      "200 ml double cream",
      "1 tsp sugar",
      "Fresh coriander for garnish",
    ],
    instructions: [
      {
        "@type": "HowToStep",
        position: 1,
        text: "In a bowl, combine the yogurt, lemon juice, cumin, paprika, half the garam masala, turmeric, and salt. Add the chicken pieces and stir to coat. Cover and refrigerate for at least 30 minutes, or up to overnight.",
      },
      {
        "@type": "HowToStep",
        position: 2,
        text: "Heat 1 tbsp of oil in a large frying pan over high heat. Cook the marinated chicken pieces in batches for 3\u20134 minutes, turning once, until charred in spots. They do not need to be cooked through. Set aside.",
      },
      {
        "@type": "HowToStep",
        position: 3,
        text: "In the same pan, reduce heat to medium and add the remaining oil. Cook the onion for 5 minutes until softened. Add the garlic and ginger, cook for 1 minute until fragrant.",
      },
      {
        "@type": "HowToStep",
        position: 4,
        text: "Add the tinned tomatoes and sugar. Simmer for 10 minutes, stirring occasionally, until the sauce thickens slightly.",
      },
      {
        "@type": "HowToStep",
        position: 5,
        text: "Stir in the double cream and the remaining garam masala. Return the chicken to the sauce and simmer gently for 10 minutes until the chicken is cooked through. Garnish with fresh coriander and serve with basmati rice.",
      },
    ],
  },
  {
    id: "seed-black-bean-tacos",
    createdAt: "2025-01-15T12:00:00Z",
    updatedAt: "2025-01-15T12:00:00Z",
    name: "Crispy Black Bean Tacos",
    description:
      "Quick vegetarian tacos with seasoned black beans, pickled red onion, and a lime crema. Perfect for a weeknight dinner.",
    recipeYield: "4 servings (8 tacos)",
    prepTime: "PT15M",
    cookTime: "PT10M",
    totalTime: "PT25M",
    category: "Dinner",
    cuisine: "Mexican",
    author: "Traditional",
    ingredients: [
      "2 tins (400 g each) black beans, drained and rinsed",
      "1 tbsp olive oil",
      "1 tsp ground cumin",
      "1 tsp smoked paprika",
      "0.5 tsp chilli powder",
      "Salt and pepper to taste",
      "8 small corn or flour tortillas",
      "1 small red onion, thinly sliced",
      "60 ml red wine vinegar",
      "1 tsp sugar",
      "150 g sour cream",
      "Juice of 1 lime",
      "1 ripe avocado, sliced",
      "Fresh coriander leaves",
      "80 g crumbled feta cheese",
    ],
    instructions: [
      {
        "@type": "HowToStep",
        position: 1,
        text: "Combine the sliced red onion, red wine vinegar, sugar, and a pinch of salt in a small bowl. Set aside to quick-pickle while you prepare the rest (at least 10 minutes).",
      },
      {
        "@type": "HowToStep",
        position: 2,
        text: "Heat the olive oil in a frying pan over medium-high heat. Add the drained black beans, cumin, smoked paprika, and chilli powder. Cook for 5 minutes, lightly mashing some of the beans with a fork to create a mix of whole and mashed. Season with salt and pepper.",
      },
      {
        "@type": "HowToStep",
        position: 3,
        text: "Mix the sour cream with the lime juice and a pinch of salt to make the lime crema.",
      },
      {
        "@type": "HowToStep",
        position: 4,
        text: "Warm the tortillas in a dry frying pan for about 30 seconds per side. Fill each tortilla with the black bean mixture, drained pickled onions, avocado slices, a drizzle of lime crema, feta, and fresh coriander.",
      },
    ],
  },
];
