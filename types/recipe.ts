export interface Nutrition {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

export interface Recipe {
  id: number;
  slug: string;
  title: string;
  image: string;
  description: string;
  ingredients: string[];
  steps: string[];
  prepTime: number;
  cookTime: number;
  nutrition: Nutrition;
  tags: string[];
}