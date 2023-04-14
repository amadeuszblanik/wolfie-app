import React, { useEffect, useState } from "react";
import { BmeBox, BmeButton, BmeModal, BmeText } from "bme-ui";
import { FormattedMessage, useIntl } from "react-intl";
import { cookie } from "../../utils";

const Component: React.FC = () => {
  const intl = useIntl();

  const [cookieConsent, setCookieConsent] = useState(true);
  // @TODO - Uncomment when analytics and crashlytics will be integrated
  // const [analytics, setAnalytics] = useState(false);
  // const [crashlytics, setCrashlytics] = useState(false);

  useEffect(() => {
    setCookieConsent(cookie.get("cookieConsent") === "true");
  }, []);

  const handleSave = () => {
    setCookieConsent(true);
    cookie.set("cookieConsent", "true", { expires: new Date("2100") });
  };

  if (cookieConsent) {
    return <></>;
  }

  return (
    <BmeModal title={intl.formatMessage({ id: "cookie_consent.title" })} onClose={handleSave}>
      <BmeBox direction="column">
        <BmeBox direction="column" alignX="center" margin="no|no|sm">
          <BmeText variant="Headline" align="center">
            <FormattedMessage id="cookie_consent.description" />
          </BmeText>
        </BmeBox>
        {/* @TODO - Uncomment when analytics and crashlytics will be integrated */}
        {/* <BmeFormController */}
        {/*   name="analytics" */}
        {/*   label={intl.formatMessage({ id: "cookie_consent.analytics" })} */}
        {/*   labelPosition="right" */}
        {/* > */}
        {/*   <BmeCheckbox */}
        {/*     name="analytics" */}
        {/*     checked={analytics} */}
        {/*     onChange={() => { */}
        {/*       setAnalytics(!analytics); */}
        {/*     }} */}
        {/*   /> */}
        {/* </BmeFormController> */}
        {/* <BmeFormController */}
        {/*   name="crashlytics" */}
        {/*   label={intl.formatMessage({ id: "cookie_consent.crashlytics" })} */}
        {/*   labelPosition="right" */}
        {/* > */}
        {/*   <BmeCheckbox */}
        {/*     name="crashlytics" */}
        {/*     checked={crashlytics} */}
        {/*     onChange={() => { */}
        {/*       setCrashlytics(!crashlytics); */}
        {/*     }} */}
        {/*   /> */}
        {/* </BmeFormController> */}
        <BmeButton width="100%" onClick={handleSave}>
          <FormattedMessage id="cookie_consent.save" />
        </BmeButton>
      </BmeBox>
    </BmeModal>
  );
};

export default Component;
