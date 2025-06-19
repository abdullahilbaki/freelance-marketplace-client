const Terms = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 libre-baskerville">Terms & Conditions</h1>

      <p className="mb-4">
        Welcome to Freelance Marketplace. By accessing or using our platform, you agree to be bound by these Terms and Conditions. If you do not agree with any part of the terms, please do not use our services.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">1. Use of the Platform</h2>
      <p className="mb-4">
        Freelance Marketplace connects clients with freelancers. You agree to use this platform responsibly and only for lawful purposes. Misuse may result in account suspension.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">2. Account Responsibility</h2>
      <p className="mb-4">
        You are responsible for maintaining the confidentiality of your account and password. You agree to accept responsibility for all activities under your account.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">3. Payments</h2>
      <p className="mb-4">
        Payments between clients and freelancers are handled through our integrated payment gateway. We are not liable for any disputes arising outside our platform.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">4. Prohibited Conduct</h2>
      <ul className="list-disc pl-6 mb-4">
        <li>Impersonating another user or entity</li>
        <li>Posting illegal or fraudulent tasks</li>
        <li>Using offensive or abusive language</li>
        <li>Bypassing platform safeguards</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">5. Termination</h2>
      <p className="mb-4">
        We reserve the right to suspend or terminate your account if you violate these terms. Any remaining funds may be withheld depending on the severity of the violation.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">6. Changes to Terms</h2>
      <p className="mb-4">
        We may update these Terms & Conditions periodically. Continued use of the platform after changes implies your acceptance of the new terms.
      </p>

      <p className="mt-6 text-sm text-gray-500">
        Last updated: {new Date().toLocaleDateString()}
      </p>
    </div>
  );
};

export default Terms;
