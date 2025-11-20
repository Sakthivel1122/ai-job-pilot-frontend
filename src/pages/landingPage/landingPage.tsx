import React from "react";
import styles from "./landingPage.module.scss";
import Button from "@/components/button/button";
import StatusTag from "@/components/statusTag/statusTag";
import SimpleApplicationInfoCard from "@/components/simpleApplicationInfoCard/simpleApplicationInfoCard";
import { applicationCardList, featureCardList } from "@/constants/landingPage";
import FeatureInfoCard from "@/components/featureInfoCard/featureInfoCard";

const LandingPage = () => {
  return (
    <>
      <main className={styles.LandingPage}>
        <div className={styles.LandingPage_banner_container}>
          <p className={styles.LandingPage_tag_text}>
            🚀 AI-Powered Job Search Assistant
          </p>
          <h1 className={styles.LandingPage_big_title_text}>
            Heading Text to display here
          </h1>
          <p className={styles.LandingPage_description_text}>
            Track applications, optimize your resume with AI feedback, and never
            miss an opportunity. JobPilot.AI makes job hunting smarter and more
            organized.
          </p>
          <div className={styles.LandingPage_banner_btn_wrapper}>
            <Button variant="primary" content="Get Started" />
            <Button variant="secondary" content="Watch Demo" />
          </div>
        </div>
        <div className={styles.LandingPage_hovering_card_container}>
          <div className={styles.LandingPage_hovering_card_header}>
            <p className={styles.LandingPage_hovering_card_title}>
              Application
            </p>
            <div className={styles.LandingPage_hovering_card_tag_wrapper}>
              <StatusTag text="12 Applied" type="grey" />
              <StatusTag text="3 Interviews" type="default" />
              <StatusTag text="1 Offer" type="selected" />
            </div>
          </div>
          <div className={styles.LandingPage_hovering_card_wrapper}>
            {applicationCardList &&
              applicationCardList.map((data) => (
                <SimpleApplicationInfoCard
                  key={data?.id}
                  title={data?.title}
                  description={data?.description}
                  tagText={data?.tagText}
                  tagType={data?.tagType}
                />
              ))}
          </div>
        </div>

        <div className={styles.LandingPage_feature_container}>
          <h1 className={styles.LandingPage_feature_title}>
            Everything You Need to Land Your Next Role
          </h1>
          <p className={styles.LandingPage_feature_description}>
            From application tracking to AI-powered resume optimization, we've
            got every aspect of your job search covered.
          </p>
          <div className={styles.LandingPage_feature_list_wrapper}>
            {featureCardList &&
              featureCardList.map((data) => (
                <FeatureInfoCard
                  key={data.id}
                  Icon={data.Icon}
                  title={data.title}
                  description={data.description}
                  iconColor={data.iconColor}
                />
              ))}
          </div>
        </div>
      </main>
    </>
  );
};

export default LandingPage;
