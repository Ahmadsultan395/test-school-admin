import React from 'react';
import Image from 'next/image';
import styles from './styles.module.css';


const DashboardCard = (props: any) => {
    return (
        <div className={styles.card}>
            <Image src={props?.Image} alt='' height={70} width={70}  quality={100} />
            <div className={styles.cardText}>
                <span className={styles.txtTotalStudent}>{props?.cardType ? "Total " + props?.cardType : ""}</span>
                <span className={styles.txtTotalCount}>{props?.count ? props?.count : props?.count}</span>
            </div>
        </div>
    )
}

export default DashboardCard