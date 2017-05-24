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
    url: string;
    createdBy: string;
}

