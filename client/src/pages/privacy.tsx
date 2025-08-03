import Header from "@/components/header";
import Footer from "@/components/footer";
import { Card, CardContent } from "@/components/ui/card";

export default function Privacy() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 pt-24">
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-black mb-6">
            <span className="gradient-text">Privacy Policy</span>
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto"></div>
        </div>

        <Card className="bg-card/50 backdrop-blur border-primary/20 shadow-lg">
          <CardContent className="p-8 space-y-8">
            <section>
              <p className="text-foreground/80 leading-relaxed">
                ValidatorAI.com ("Validator AI") values its users' privacy. This Privacy Policy ("Policy") will help you understand how we collect and use personal information from those who visit our website or make use of our online facilities and services, and what we will and will not do with the information we collect. Our Policy has been designed and created to ensure those affiliated with ValidatorAI.com of our commitment and realization of our obligation not only to meet, but to exceed, most existing privacy standards.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">Policy Changes</h2>
              <p className="text-foreground/80 leading-relaxed">
                We reserve the right to make changes to this Policy at any given time. If you want to make sure that you are up to date with the latest changes, we advise you to frequently visit this page. If at any point in time ValidatorAI.com decides to make use of any personally identifiable information on file in a manner vastly different from that which was stated when this information was initially collected, the user or users shall be promptly notified by email. Users at that time shall have the option to prevent the use of their information in this different manner.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">Scope of Policy</h2>
              <p className="text-foreground/80 leading-relaxed">
                This Policy applies to ValidatorAI.com, and it governs any and all data collection and usage by us. Through the use of www.validatorai.com, you are therefore consenting to the data collection procedures expressed in this Policy. Please note that this Policy does not govern the collection and use of information by companies that ValidatorAI.com does not control, nor by individuals not employed or managed by us. If you visit a website that we mention or link to, be sure to review its privacy policy before providing the site with information.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">Review of Privacy Policies</h2>
              <p className="text-foreground/80 leading-relaxed">
                It is highly recommended and suggested that you review the privacy policies and statements of any website you choose to use or frequent to better understand the way in which websites garner, make use of, and share the information collected.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">Information We Collect</h2>
              <p className="text-foreground/80 leading-relaxed mb-4">
                It is always up to you whether to disclose personally identifiable information to us. However, if you elect not to do so, we reserve the right not to register you as a user or provide you with any products or services.
              </p>
              <p className="text-foreground/80 leading-relaxed mb-4">
                This website collects various types of information, such as:
              </p>
              <ul className="list-disc list-inside text-foreground/80 space-y-2 ml-4">
                <li>Voluntarily provided information which may include your name, email address, phone number, billing and/or credit card information, which may be used when you purchase products and/or services and to deliver the services you have requested.</li>
                <li>Information automatically collected when visiting our website, which may include cookies, third-party tracking technologies, and server logs.</li>
              </ul>
              <p className="text-foreground/80 leading-relaxed mt-4">
                In addition, ValidatorAI.com may collect non-personal anonymous demographic information, such as age, gender, household income, political affiliation, race, and religion, as well as the type of browser you are using, IP address, or type of operating system, which will assist us in providing and maintaining superior quality service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">Why We Collect Information and For How Long</h2>
              <p className="text-foreground/80 leading-relaxed mb-4">We collect your data for several reasons:</p>
              <ul className="list-disc list-inside text-foreground/80 space-y-2 ml-4">
                <li>To better understand your needs and provide you with the services you have requested;</li>
                <li>To facilitate AI startup mentor calls, which require us to collect and store phone numbers;</li>
                <li>To send follow-up emails containing key takeaways and next steps from AI startup mentor calls;</li>
                <li>To fulfill our legitimate interest in improving our services and products;</li>
                <li>To send you promotional emails containing information we think you may like when we have your consent to do so;</li>
                <li>To contact you to fill out surveys or participate in other types of market research, when we have your consent to do so;</li>
                <li>To customize our website according to your online behavior and personal preferences.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">Use of Information Collected</h2>
              <p className="text-foreground/80 leading-relaxed mb-4">
                ValidatorAI.com does not now, nor will it in the future, sell, rent, or lease any of its customer lists and/or names to third parties.
              </p>
              <p className="text-foreground/80 leading-relaxed mb-4">
                ValidatorAI.com may collect and use personal information to assist in the operation of our website and to ensure delivery of the services you need and request.
              </p>
              <p className="text-foreground/80 leading-relaxed">
                ValidatorAI.com may also contact you with regards to completing surveys and/or research questionnaires related to your opinion of current or potential future services that may be offered.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">AI Mentor Calls and Follow-up Emails</h2>
              <ul className="list-disc list-inside text-foreground/80 space-y-2 ml-4">
                <li>If you use our AI startup mentor service, we collect your phone number to facilitate the call. We do not share your phone number with anyone.</li>
                <li>After the call, you will receive an AI-generated email summarizing key discussion points and next steps.</li>
                <li>This follow-up email may include recommendations for trusted resources to help move your ideas forward. Some of these recommendations are from paid partners, but your email address is not shared with them.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">Security</h2>
              <p className="text-foreground/80 leading-relaxed">
                ValidatorAI.com takes precautions to protect your information. When you submit sensitive information via the website, your information is protected both online and offline. We use encryption, secure servers, and industry best practices to safeguard personal data.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">Acceptance of Terms</h2>
              <p className="text-foreground/80 leading-relaxed">
                By using this website, you are accepting the terms and conditions stipulated in this Privacy Policy Agreement. If you are not in agreement with our terms and conditions, then you should refrain from further use of our site.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">How to Contact Us</h2>
              <p className="text-foreground/80 leading-relaxed mb-4">
                If you have any questions or concerns regarding the Privacy Policy Agreement related to our website, please feel free to contact us at:
              </p>
              <div className="bg-background/50 p-4 rounded-lg border border-primary/20">
                <p className="text-foreground/80"><strong>Email:</strong> info@napkin.com</p>
                <p className="text-foreground/80 mt-2"><strong>Mailing Address:</strong></p>
                <p className="text-foreground/80">
                  ValidatorAI.com<br />
                  Irvine, California 92618
                </p>
              </div>
            </section>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  );
}