import { ItemInfo, ItemInfoConfig } from "@/types/ItemInfo";
import { PersonalInfo, PersonalInfoConfig } from "@/types/PersonalInfo";
import Step from "./steps";
import { store } from "@/redux/store";
import { addErrorDetail, addErrorItem } from "@/redux/slices/validationSlice";


export function IsModelValid(
    model: ItemInfo | PersonalInfo,
    modelConfig: ItemInfoConfig | PersonalInfoConfig,
    step: Step.StepEnum
): boolean {
    let isValid: boolean = true;

    Object.entries(model).forEach(([key, value]) => {
        if (modelConfig[key].displayOnStep === step && modelConfig[key].isEditable) {
            let regex: string = modelConfig[key]?.validationRegex ?? '';
            let valueNullButRequried = ((value == null || value == undefined) && modelConfig[key]?.validationRegex != undefined);
            
            if (valueNullButRequried || !value.match(regex)) {
                isValid = false;
                store.dispatch(addErrorItem(key));
                
                if(modelConfig[key]?.validationMessage != undefined) 
                    store.dispatch(addErrorDetail(modelConfig[key]?.validationMessage ?? ''));
            }
        }
    });

    return isValid;
}