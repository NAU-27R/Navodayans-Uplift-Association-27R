import React from "react";
import "./style.scss";
const RefundPolicy = () => {
  let date = new Date();
  date = date.toDateString();
  return (
    <div class="policy_container">
        <h1>Refund Policy</h1>
        <p><strong>Effective Date:</strong> [10 June 2024]</p>

        <section className="section">
            <h2>1. Introduction</h2>
            <p>Navodayans Uplift Association 27R (“we”, “our”, “us”) strives to provide high-quality web development services. This Refund Policy outlines the terms and conditions under which clients (“you”, “your”) may request a refund for our services.</p>
        </section>

        <section className="section">
            <h2>2. General Terms</h2>
            <ul>
                <li>This Refund Policy applies to all web development services provided by Navodayans Uplift Association 27R.</li>
                <li>By engaging our services, you agree to the terms of this Refund Policy.</li>
            </ul>
        </section>

        <section className="section">
            <h2>3. Refund Eligibility</h2>
            <p>Refunds are available under the following circumstances:</p>
            <ul>
                <li><strong>Project Cancellation:</strong> If the project is canceled by you before any work has commenced, a full refund will be issued.</li>
                <li><strong>Non-Delivery:</strong> If we fail to deliver the project or any agreed milestone within the specified timeline, you may request a refund for the undelivered portion of the project.</li>
                <li><strong>Non-Compliance:</strong> If the delivered work does not meet the specifications or requirements outlined in the project agreement, and we are unable to rectify the issue within a reasonable period, you may request a refund for the non-compliant portion of the project.</li>
                <li><strong>Service Deficiency:</strong> If there are persistent issues with the quality of the service that are not rectified after repeated attempts, you may request a refund.</li>
            </ul>
        </section>

        <section className="section">
            <h2>4. Refund Process</h2>
            <p>To request a refund, please follow these steps:</p>
            <ol>
                <li><strong>Submit a Request:</strong> Send a written refund request to our customer service team at [insert email] within 14 days of the issue arising, detailing the reasons for your request.</li>
                <li><strong>Review Process:</strong> Our team will review your request and may require additional information or clarification.</li>
                <li><strong>Resolution:</strong> We will aim to resolve your request within 14 days of receipt. If approved, the refund will be processed through the original payment method.</li>
            </ol>
        </section>

        <section className="section">
            <h2>5. Non-Refundable Circumstances</h2>
            <p>Refunds will not be issued in the following cases:</p>
            <ul>
                <li><strong>Change of Mind:</strong> Refunds are not available if you simply change your mind after the project has commenced.</li>
                <li><strong>Partial Work:</strong> If you are satisfied with and have accepted part of the work, a refund will only be considered for the incomplete or unsatisfactory portion.</li>
                <li><strong>Force Majeure:</strong> No refunds will be issued for delays or issues arising from circumstances beyond our control, such as natural disasters, strikes, or other unforeseen events.</li>
            </ul>
        </section>

        <section className="section">
            <h2>6. Payment Disputes</h2>
            <p>If you dispute any payment made to us, you agree to notify us within 14 days of the payment. We will review the dispute and work towards an amicable resolution.</p>
        </section>

        <section className="section">
            <h2>7. Modifications to the Refund Policy</h2>
            <p>Navodayans Uplift Association 27R reserves the right to modify this Refund Policy at any time. Any changes will be posted on our website and will become effective immediately upon posting.</p>
        </section>

        <section className="section">
            <h2>8. Contact Information</h2>
            <p>For any questions or concerns regarding this Refund Policy, please contact us at:</p>
            <ul>
                <li><strong>Email:</strong> jnvr27charityfund@gmail.com</li>
                <li><strong>Address:</strong> Raipur Chhattisgarh, India</li>
            </ul>
        </section>

        <p><strong>Navodayans Uplift Association 27R</strong> is committed to providing exceptional web development services and ensuring customer satisfaction. We value your business and will do our utmost to address any issues promptly and fairly.</p>
    </div>
  );
};

export default RefundPolicy;
