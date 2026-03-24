import { Recipe } from '../services/recipe.service';

export const MOCK_RECIPES: Recipe[] = [
  {
    id: '1',
    name: 'Truffle Risotto',
    description: 'Creamy Italian risotto with earthy truffle and parmesan',
    imageUrl: 'https://picsum.photos/id/30/400/300',
    cuisineType: 'Italian',
    prepTime: 15,
    cookTime: 25,
    difficulty: 'medium',
    mood: 'romantic',
    ingredients: [
      '2 cups Arborio rice',
      '4 cups vegetable broth',
      '1 shallot, finely chopped',
      '2 cloves garlic, minced',
      '1/2 cup white wine',
      '1/2 cup grated parmesan',
      '2 tbsp truffle oil',
      '2 tbsp butter',
      'Salt and pepper to taste'
    ],
    instructions: [
      'Heat broth in a saucepan and keep warm.',
      'Sauté shallot and garlic in butter until soft.',
      'Add rice and toast for 2 minutes.',
      'Add wine and stir until absorbed.',
      'Add broth one ladle at a time, stirring constantly.',
      'Continue until rice is creamy and al dente.',
      'Stir in parmesan and truffle oil.',
      'Season with salt and pepper.'
    ],
    musicPairing: {
      songTitle: 'Clair de Lune',
      artist: 'Claude Debussy',
      genre: 'Classical',
      mood: 'romantic',
      musicUrl: '',
      embedUrl: '',
      scienceExplanation: 'The gentle, flowing melody of Debussy enhances the creamy texture and earthy notes of truffle.'
    },
    scienceFacts: [
      {
        id: '1',
        title: 'Umami Enhancement',
        factText: 'Truffles contain compounds that activate umami receptors, which are amplified by classical music frequencies.',
        category: 'Flavor Science'
      },
      {
        id: '2',
        title: 'Aroma Perception',
        factText: 'The earthy aroma of truffle is perceived more intensely when listening to lower frequency sounds.',
        category: 'Psychoacoustics'
      }
    ]
  },
  {
    id: '2',
    name: 'Spicy Ramen',
    description: 'Rich broth with perfect spice balance and tender noodles',
    imageUrl: 'https://picsum.photos/id/29/400/300',
    cuisineType: 'Japanese',
    prepTime: 20,
    cookTime: 120,
    difficulty: 'hard',
    mood: 'energetic',
    ingredients: [
      '4 cups chicken broth',
      '2 packs ramen noodles',
      '2 tbsp soy sauce',
      '1 tbsp miso paste',
      '1 tbsp chili oil',
      '2 soft-boiled eggs',
      'Green onions, sliced',
      'Nori sheets',
      'Pork belly, sliced'
    ],
    instructions: [
      'Simmer broth with soy sauce, miso, and chili oil for 2 hours.',
      'Cook ramen noodles according to package.',
      'Assemble bowls with noodles, broth, and toppings.',
      'Garnish with green onions and nori.',
      'Top with soft-boiled eggs.'
    ],
    musicPairing: {
      songTitle: 'Thunderstruck',
      artist: 'AC/DC',
      genre: 'Rock',
      mood: 'energetic',
      musicUrl: '',
      embedUrl: '',
      scienceExplanation: 'High-energy rock music enhances the perception of spiciness and increases eating tempo.'
    },
    scienceFacts: [
      {
        id: '1',
        title: 'Spice Perception',
        factText: 'Fast tempo music increases heart rate, making spicy foods feel more intense.',
        category: 'Psychoacoustics'
      },
      {
        id: '2',
        title: 'Umami Boost',
        factText: 'The glutamate in miso creates umami that pairs with the energy of rock music.',
        category: 'Flavor Science'
      }
    ]
  },
  {
    id: '3',
    name: 'Dark Chocolate Mousse',
    description: 'Decadent dessert with deep cocoa notes and silky texture',
    imageUrl: 'https://picsum.photos/id/106/400/300',
    cuisineType: 'French',
    prepTime: 20,
    cookTime: 120,
    difficulty: 'medium',
    mood: 'relaxing',
    ingredients: [
      '200g dark chocolate (70% cocoa)',
      '3 eggs, separated',
      '2 tbsp sugar',
      '1 cup heavy cream',
      '1 tsp vanilla extract',
      'Pinch of salt'
    ],
    instructions: [
      'Melt chocolate in a double boiler.',
      'Beat egg yolks with sugar until pale.',
      'Fold melted chocolate into yolk mixture.',
      'Whip cream with vanilla to soft peaks.',
      'Fold whipped cream into chocolate mixture.',
      'Whip egg whites with salt to stiff peaks.',
      'Fold into chocolate mixture gently.',
      'Chill for at least 2 hours before serving.'
    ],
    musicPairing: {
      songTitle: 'Nocturne in E-flat major',
      artist: 'Frédéric Chopin',
      genre: 'Classical',
      mood: 'relaxing',
      musicUrl: '',
      embedUrl: '',
      scienceExplanation: 'The slow, contemplative melody of Chopin complements the rich, deep notes of dark chocolate.'
    },
    scienceFacts: [
      {
        id: '1',
        title: 'Theobromine Effect',
        factText: 'Dark chocolate contains theobromine, which creates a calming effect enhanced by slow classical music.',
        category: 'Food Chemistry'
      },
      {
        id: '2',
        title: 'Bitterness Perception',
        factText: 'Low-frequency sounds can make bitter flavors like dark chocolate taste more complex.',
        category: 'Psychoacoustics'
      }
    ]
  },
  {
    id: '4',
    name: 'Thai Green Curry',
    description: 'Aromatic coconut curry with fresh vegetables and herbs',
    imageUrl: 'https://picsum.photos/id/127/400/300',
    cuisineType: 'Thai',
    prepTime: 15,
    cookTime: 25,
    difficulty: 'medium',
    mood: 'adventurous',
    ingredients: [
      '2 tbsp green curry paste',
      '1 can coconut milk',
      '1 chicken breast, sliced',
      '1 red bell pepper',
      '1 zucchini',
      'Thai basil leaves',
      'Fish sauce',
      'Lime juice'
    ],
    instructions: [
      'Fry curry paste in coconut cream until fragrant.',
      'Add remaining coconut milk and bring to simmer.',
      'Add chicken and cook through.',
      'Add vegetables and cook until tender.',
      'Season with fish sauce and lime juice.',
      'Garnish with Thai basil.'
    ],
    musicPairing: {
      songTitle: 'One Night in Bangkok',
      artist: 'Murray Head',
      genre: 'Pop',
      mood: 'adventurous',
      musicUrl: '',
      embedUrl: '',
      scienceExplanation: 'The exotic rhythms enhance the complex flavor profile of Thai spices and herbs.'
    },
    scienceFacts: [
      {
        id: '1',
        title: 'Capsaicin Effect',
        factText: 'The heat from chili activates TRPV1 receptors, creating a tingling sensation that pairs with upbeat tempos.',
        category: 'Flavor Science'
      },
      {
        id: '2',
        title: 'Aroma Complexity',
        factText: 'Thai cuisine uses multiple herbs that create complex aromatics enhanced by unfamiliar musical patterns.',
        category: 'Sensory Science'
      }
    ]
  }
];