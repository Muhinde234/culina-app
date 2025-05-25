import { GetStaticProps, GetStaticPaths } from 'next';
import Link from 'next/link';
import { useUser } from "@clerk/nextjs";
import { Recipe } from '../../types/recipe';
import recipesData from '../../data/recipes.json';

interface RecipeDetailProps {
  recipe: Recipe;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = recipesData.map(recipe => ({
    params: { slug: recipe.slug },
  }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<RecipeDetailProps> = async ({ params }) => {
  const recipe = recipesData.find(r => r.slug === params?.slug);

  if (!recipe) {
    return { notFound: true };
  }

  return {
    props: {
      recipe,
    },
  };
};

export default function RecipeDetail({ recipe }: RecipeDetailProps) {
  const { user, isSignedIn, isLoaded } = useUser();

  return (
    <div className="min-h-screen bg-[#F8F5F2]">
      <div className="relative h-64 md:h-80 bg-[#213D34]">
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-white text-center px-4">
            {recipe.title}
          </h1>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <div className="max-w-4xl mx-auto">
         

          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6 border-b border-[#D4A762]/20">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-[#2C3E50]/80">
                    Prep: {recipe.prepTime} min
                  </span>
                  <span className="text-sm font-medium text-[#2C3E50]/80">
                    Cook: {recipe.cookTime} min
                  </span>
                  <span className="text-sm font-medium text-[#2C3E50]/80">
                    Total: {recipe.prepTime + recipe.cookTime} min
                  </span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {recipe.tags.map(tag => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-[#D4A762]/20 text-[#D4A762] text-xs rounded-full capitalize"
                    >
                      {tag.replace('-', ' ')}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-6 border-b border-[#D4A762]/20">
              <p className="text-[#2C3E50]/90">{recipe.description}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
              <div>
                <h2 className="text-2xl font-serif font-semibold text-[#213D34] mb-4">Ingredients</h2>
                <ul className="space-y-2">
                  {recipe.ingredients.map((ingredient, index) => (
                    <li key={index} className="flex items-start">
                      <span className="inline-block w-5 h-5 mt-1 mr-2 border border-[#D4A762] rounded-full flex-shrink-0"></span>
                      <span className="text-[#2C3E50]/90">{ingredient}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-serif font-semibold text-[#213D34] mb-4">Instructions</h2>
                <ol className="space-y-4">
                  {recipe.steps.map((step, index) => (
                    <li key={index} className="flex">
                      <span className=" w-8 h-8 bg-[#D4A762] text-white rounded-full flex-shrink-0 flex items-center justify-center mr-3 font-medium">
                        {index + 1}
                      </span>
                      <span className="text-[#2C3E50]/90">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            <div className="p-6 bg-[#F8F5F2]">
              <h2 className="text-2xl font-serif font-semibold text-[#213D34] mb-4">Nutrition Facts</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded-lg shadow-sm text-center">
                  <div className="text-sm text-[#2C3E50]/60 mb-1">Calories</div>
                  <div className="text-xl font-medium text-[#213D34]">{recipe.nutrition.calories}</div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm text-center">
                  <div className="text-sm text-[#2C3E50]/60 mb-1">Protein</div>
                  <div className="text-xl font-medium text-[#213D34]">{recipe.nutrition.protein}g</div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm text-center">
                  <div className="text-sm text-[#2C3E50]/60 mb-1">Carbs</div>
                  <div className="text-xl font-medium text-[#213D34]">{recipe.nutrition.carbs}g</div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm text-center">
                  <div className="text-sm text-[#2C3E50]/60 mb-1">Fat</div>
                  <div className="text-xl font-medium text-[#213D34]">{recipe.nutrition.fat}g</div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/"
              className="inline-flex items-center px-6 py-2 border border-[#D4A762] text-[#D4A762] rounded-full hover:bg-[#D4A762]/10 transition"
            >
              ← Back to all recipes
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
