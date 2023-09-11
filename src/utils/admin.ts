import { HTMLAttributes } from "@/app/admin/[id]/attributes";
import { InquiryDataInterface, PartType } from "@/models/InquiryData";
import { ItemInfo } from "@/types/ItemInfo";

export function mapItemFormDataToItemData(
    data: FormData,
    inquiry: InquiryDataInterface
): Array<ItemInfo> {
    //We will add a limit of 8 parts later
    const numberOfItems = inquiry.ItemData.length
    inquiry.ItemData.forEach((item, itemIndex) => {
        for(let partIndex = 0; partIndex < 8; partIndex++) {
            const partName: string = data.get(itemIndex + HTMLAttributes.PartName + partIndex)?.toString() ?? ''
            const partPrice: string = data.get(itemIndex + HTMLAttributes.PartPrice + partIndex)?.toString() ?? ''
            // When partName will be available to edit, then add it here too.. 
            // But think of names where once entered, and then removed corner case..
            if (partName && partPrice) {  
                //Logic to add part if not available.
                if (partIndex in inquiry.ItemData[itemIndex].Part) {
                    inquiry.ItemData[itemIndex].Part[partIndex].Name = partName
                    inquiry.ItemData[itemIndex].Part[partIndex].Price = Number(partPrice)
                }
                else {
                    inquiry.ItemData[itemIndex].Part.push({
                        Name: partName,
                        Price: Number(partPrice)
                    } as PartType)
                }
            }
            else { break } //If there is no added part, then we break
        }

        const laborHours = Number(data.get(itemIndex + HTMLAttributes.LaborHours))
        const laborPrice = Number(data.get(itemIndex + HTMLAttributes.LaborPrice))
        inquiry.ItemData[itemIndex].Labor.Hours = laborHours
        inquiry.ItemData[itemIndex].Labor.Price = laborPrice
    })

    return inquiry.ItemData
}