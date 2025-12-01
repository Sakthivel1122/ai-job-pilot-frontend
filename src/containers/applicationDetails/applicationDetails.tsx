import React, { useMemo } from "react";
import styles from "./applicationDetails.module.scss";
import { TJobApplicationDetails } from "@/types/apiResponseTypes";
import StatusTag from "../../components/statusTag/statusTag";
import { getApplicationStatusText } from "@/utils/sharedFunctions";

interface IApplicationDetailsProps {
  data: TJobApplicationDetails;
}

const ApplicationDetails: React.FC<IApplicationDetailsProps> = ({ data }) => {
  const applicationStatusText = useMemo(() => {
    return getApplicationStatusText(data.status);
  }, [data]);
  return (
    <div className={styles.ApplicationDetails}>
      <h2 className={styles.ApplicationDetails_title}>Application Details</h2>
      <div className={styles.ApplicationDetails_details_wrapper}>
        {data?.status && (
          <div className={styles.ApplicationDetails_detail}>
            <p className={styles.ApplicationDetails_label_text}>Status</p>
            <StatusTag text={applicationStatusText} type="grey" />
          </div>
        )}
        {(data?.salary_min || data?.salary_max) && (
          <div className={styles.ApplicationDetails_detail}>
            <p className={styles.ApplicationDetails_label_text}>Salary</p>
            <p className={styles.ApplicationDetails_detail_text}>
              {data?.salary_min && data?.salary_max
                ? `${data?.salary_min}LPA - ${data?.salary_max}LPA`
                : `${data?.salary_min || data?.salary_max}LPA`}
            </p>
          </div>
        )}
        {data?.location && (
          <div className={styles.ApplicationDetails_detail}>
            <p className={styles.ApplicationDetails_label_text}>Status</p>
            <p className={styles.ApplicationDetails_detail_text}>
              {data?.location}
            </p>
          </div>
        )}
        {data?.created_at && (
          <div className={styles.ApplicationDetails_detail}>
            <p className={styles.ApplicationDetails_label_text}>Applied Date</p>
            <p className={styles.ApplicationDetails_detail_text}>
              {data?.created_at}
            </p>
          </div>
        )}
      </div>
      {data?.notes && (
        <div>
          <p className={styles.ApplicationDetails_label_text}>Notes</p>
          <p className={styles.ApplicationDetails_notes}>{data?.notes}</p>
        </div>
      )}
    </div>
  );
};

export default ApplicationDetails;
