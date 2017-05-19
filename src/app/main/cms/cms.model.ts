import { BaseModel } from './../../index.model';

export class RecipeModel extends BaseModel {
    title: string;
    servings: number;
    description: string;
    url: string;
    ingredients: string[];
}

