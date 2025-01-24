import Image from 'next/image';
import LineChart from './lineChart';
import styles from './styles.module.css';
import Icons from '../../../../Theme/Icons';

const LineChartCard = () => {
    return (
        <div className={styles.lineChart}>
            <div className={styles.chartRow}>
                <span className={styles.txtEarnings}>Earnings</span>
                <div className={styles.btnFilterRow}>
                    <div className={styles.clockBtn}>
                        <Image src={Icons.ClockIcon} alt="" height={18} width={18} quality={100} />
                    </div>
                    <div className={styles.timtBtn}>
                        <span className={styles.txtFilterSelection}>D</span>
                    </div>
                    <div className={styles.timtBtn}>
                        <span className={styles.txtFilterSelection}>W</span>
                    </div>
                    <div className={styles.selectedBtn}>
                        <span className={styles.txtSelection}>M</span>
                    </div>
                    <div className={styles.timtBtn}>
                        <span className={styles.txtFilterSelection}>Y</span>
                    </div>
                    <div className={styles.arrowRight}>
                        <Image src={Icons.RightThemeIcon} alt='' height={18} width={18} />
                    </div>
                </div>
            </div>
            <div className={styles.chartInfoRow}>
                <div className={styles.earningCounterRow}>
                    <div className={styles.earningDot} />
                    <div className={styles.earningRow}>
                        <span className={styles.txtCollection}>Total Collections</span>
                        <span className={styles.txtCollectionAmount}>$5,50046</span>
                    </div>
                </div>
                <div className={styles.earningCounterRow}>
                    <div className={styles.earningGreenDot} />
                    <div className={styles.earningRow}>
                        <span className={styles.txtCollection}>Fee Collections</span>
                        <span className={styles.txtCollectionAmount}>$5,50046</span>
                    </div>
                </div>
                <div className={styles.earningCounterRow}>
                    <span className={styles.txtDate}>02-11-2023</span>
                    <div className={styles.arrowDownCirlce}>
                        <Image src={Icons.ArrowDownIcon} alt='' height={18} width={18} quality={100} className={styles.arrowDown} />
                    </div>
                </div>
            </div>
            <LineChart />
        </div>
    )
}

export default LineChartCard