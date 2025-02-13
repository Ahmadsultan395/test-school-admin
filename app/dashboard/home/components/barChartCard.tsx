import Image from 'next/image';
import BarChart from './barChat';
import Icons from '../../../../Theme/Icons';
import styles from './styles.module.css';

const BarChartCard = () => {
    return (
        <div className={styles.barChart}>
            <div className={styles.chartRow}>
                <span className={styles.txtExpenses}>Expenses</span>
                <div className={styles.moreIconCircle}>
                    <Image src={Icons.MoreIcon} alt="" height={24} width={24} quality={100} className={styles.moreIcon} />
                </div>
            </div>
            <div className={styles.barChartRow}>
                <div className={styles.barChartRowInfo}>
                    <span className={styles.txtMonthYear}>Jan 2023</span>
                    <span className={styles.txtMonthAmount}>$1,5000</span>
                    <div className={styles.lightGreenProgress} />
                </div>
                <div className={styles.barChartRowInfo}>
                    <span className={styles.txtMonthYear}>Feb 2023</span>
                    <span className={styles.txtMonthAmount}>$1,0000</span>
                    <div className={styles.lightBlueProgress} />
                </div>
                <div className={styles.barChartRowInfo}>
                    <span className={styles.txtMonthYear}>Mar 2023</span>
                    <span className={styles.txtMonthAmount}>$8,000</span>
                    <div className={styles.lightOragneProgress} />
                </div>
            </div>
            <div style={{ height: 250 }}>
                <BarChart />
            </div>
        </div>
    )
}

export default BarChartCard