export interface IBaseDialogService<TModel> {
        /**
         * Method shows appropriate Dialog with Add/Edit/Translate action for specific object.
         * @param {any} evt Target event
         * @param {string} Dialog action prefix ("add", "edit" or "translate") - It is necessary for correct template
         * @param {TModel} current Current object that has to be modified
         * If current object hasn't been passed, "Add" dialog will be shown.
         * @returns {ng.IPromis<TModel>} Returns promise with object with typeof TModel
         */
        show: (evt: any, templatePrefix: string, current?: TModel) => ng.IPromise<TModel>;
    }