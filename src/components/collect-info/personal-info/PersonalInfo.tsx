import styles from './personal-info.module.css'
import Navigation from '../navigation/Navigation'

export default function PersonalInfo() {
  return (
    <div>
        <div className={styles.container}>
            <h1>Tell Us More About Your Yourself</h1>
            <div className={styles.form}>
                <div className={styles["form-item"]}>
                    <label htmlFor="first-name" className={styles["form-label"]}>First Name</label>
                    <input id="first-name" type="text" className={styles["form-text-input"]} required></input>
                </div>
                <div className={styles["form-item"]}>
                    <label htmlFor="last-name" className={styles["form-label"]}>Last Name</label>
                    <input id="last-name" type="text" className={styles["form-text-input"]} required></input>
                </div>
                <br></br>
                <div className={styles["form-item"]}>
                    <label htmlFor="address-line" className={styles["form-label"]}>Address</label>
                    <input id="address-line" type="text" className={styles["form-text-input"]} required></input>
                </div>
                <div className={styles["form-item"]}>
                    <label htmlFor="city" className={styles["form-label"]}>City</label>
                    <input id="city" type="text" className={styles["form-text-input"]} required></input>
                </div>
                <div className={styles["form-item"]}>
                    <label htmlFor="state" className={styles["form-label"]}>State</label>
                    <input id="state" type="text" className={styles["form-text-input"]} required />
                </div>
                <div className={styles["form-item"]}>
                    <label htmlFor="zipcode" className={styles["form-label"]}>Zipcode</label>
                    <input id="zipcode" type="text" className={styles["form-text-input"]} required />
                </div>
            </div>
        </div>
        <Navigation/>
    </div>
  )
}