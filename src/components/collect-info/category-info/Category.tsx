import styles from './category.module.css'
import CategoryInfo from './data.json'

import Step from '@/utils/steps'

import { store } from '@/redux/store';
import { setStep } from '@/redux/slices/stepSlice';
import { setCategory } from '@/redux/slices/infoSlice';

export default function Category({
    itemUId
  }:{
    itemUId: string
  }) {

  function categoryClicked(event:any) {
    let categorySelected: any = {
      key: itemUId,
      category: event.target.value
    }

    console.log(categorySelected.category)
    store.dispatch(setCategory(categorySelected));
    
    let nextStep = Step.GetNextStep(Step.StepEnum.Category);
    if (nextStep){
      store.dispatch(setStep(nextStep));
    }
  }

  const data = CategoryInfo.Category;
  
  let categories = data.map((item) => 
    <button 
      className={styles.button} 
      key={item.id} 
      onClick={(event:any) => categoryClicked(event)}
      value={item.Name}
    >
      {item.Name}
    </button>
  );

  return (
    <div className={styles.container}>
      <h1>What type of device do you have?</h1>
       {categories}
    </div>
  )
}
