import { BaseModel } from './../../index.model';

export class RecipeModel extends BaseModel {
    name: string;
    description: string;
    shortDescription: string;
    time: number;
    servings: number;
    ingredients: string;
    ingredientsList: string[];
    directions: string;
    directionsList: string[];
    categories: CategoryModel[];
    url: string;
    createdBy: string;
}
export class CategoryModel extends BaseModel {
    id: number;
    name: string;
}

