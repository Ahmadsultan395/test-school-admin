import Image from 'next/image';
import styles from './styles.module.css';
import Icons from '../../../../Theme/Icons';
import Images from '../../../../Theme/Images';

const DefaultCard = () => {
    const staffData = [
        { name: "Vishaka Shekhawat", designation: "3CO-JVY", presence: "Attendence" },
        { name: "Vishaka Shekhawat", designation: "3CO-JVY", presence: "Fees" },
        { name: "Vishaka Shekhawat", designation: "3CO-JVY", presence: "Mischief" },
        { name: "Vishaka Shekhawat", designation: "3CO-JVY", presence: "Fees" },
    ]
    return (
        <div className={styles.staffCard}>
            <div className={styles.calendarRow}>
                <span className={styles.txtCalendar}>Defaulters</span>
                <div className={styles.sortArrow}>
                    <Image src={Icons.SortArrow} width={24} height={24} alt='' quality={100} className={styles.sortArowIcoon} />
                </div>
            </div>
            {
                staffData.map((item, index) => (
                    <div className={styles.staffInfoCard} key={index}>
                        <div className={styles.staffProfileCircle}>
                            <Image src={Images.StaffProfile} alt='' quality={100} />
                        </div>
                        <div className={styles.staffInfo}>
                            <span className={styles.staffName}>{item?.name}</span>
                            <span className={styles.staffDesignation}>{item?.designation}</span>
                            <span className={styles.staffPresence}>{item?.presence}</span>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default DefaultCard