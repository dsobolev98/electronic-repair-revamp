module Step {
    export enum StepEnum {
        Category,
        ItemInfo,
        PersonalInfo
    }

    export function GetNextStep(currentStep: StepEnum): StepEnum | null {
        switch(currentStep) {
            case StepEnum.Category:
                return StepEnum.ItemInfo;
            case StepEnum.ItemInfo:
                return StepEnum.PersonalInfo;
            default:
                null;
        }
        return null;
    }

    export function GetPreviousStep(currentStep: StepEnum): StepEnum | null {
        switch(currentStep) {
            case StepEnum.ItemInfo:
                return StepEnum.Category;
            case StepEnum.PersonalInfo:
                return StepEnum.ItemInfo;
            default:
                null;
        }
        return null;
    }
}

export default Step