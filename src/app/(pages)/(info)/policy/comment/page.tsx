const Comment = () => {
  return (
    <div className="policy_wrapper">
      <div className="policy_container">
        <div className="policy_details">
          <h1 className="policy_version">Version 1.0, valid from 2024</h1>
          <h1 className="policy_header">Comment Policy</h1>
          <p className="policy_info">
            At ArchCache, we invite and value comments on our articles, news,
            and other content. We hold the belief that an active, constructive
            community enriches the quality and relevance of our platform. To
            cultivate a respectful, engaging, and informative environment, we
            have instituted the following Comment Policy. By posting a comment
            on our site, you acknowledge and agree to abide by this policy..
          </p>
        </div>
        <div className="policy_details">
          <h1 className="policy_header">1.    Respectful Interaction</h1>
          <p className="policy_info">
            We prioritize maintaining a respectful and thoughtful dialogue.
            Users must ensure that their comments are polite, respectful, and
            constructive. Disagreements, while natural, should be articulated
            courteously. Personal attacks, harassment, and abusive language are
            strictly prohibited.
          </p>
        </div>
        <div className="policy_details">
          <h1 className="policy_header">2.   Relevance</h1>
          <p className="policy_info">
            Comments must remain relevant to the subject matter of the post.
            Off-topic comments may be removed to preserve the focus and value of
            the discussion.
          </p>
        </div>
        <div className="policy_details">
          <h1 className="policy_header">3.    No Spam or Self-Promotion</h1>
          <p className="policy_info">
            Comments of a promotional nature or containing spam will be removed.
            This encompasses comments that advertise products or services,
            include affiliate links, or are not relevant to the discussion.
          </p>
        </div>

        <div className="policy_details">
          <h1 className="policy_header">4.    Prohibited Content</h1>
          <p className="policy_info">
            The following types of content are strictly prohibited and will be
            removed:
          </p>

          <ul>
            <li>
              Hate speech, discriminatory remarks, or any form of bigotry.
            </li>
            <li>Threatening, violent, or abusive language.</li>
            <li>
              Inappropriate or offensive content, including adult material.
            </li>
            <li>Content that is illegal or promotes illegal activities.</li>
            <li>False, misleading, or deceptive information.. </li>
          </ul>
        </div>

        <div className="policy_details">
          <h1 className="policy_header">5.    Privacy</h1>
          <p className="policy_info">
            Do not disclose personal information, whether it is your own or
            someone {"else's"}, in the comments. This includes, but is not
            limited to, addresses, phone numbers, email addresses, and any other
            sensitive information.
          </p>
        </div>
        <div className="policy_details">
          <h1 className="policy_header">6.    Language</h1>
          <p className="policy_info">
            Comments must be written in English to ensure they can be understood
            by our community and moderators. Comments in other languages may be
            removed.
          </p>
        </div>
        <div className="policy_details">
          <h1 className="policy_header">7.   Moderation</h1>
          <p className="policy_info">
            We retain the right to moderate all comments. This includes the
            ability to edit or remove comments that contravene this policy.
            Repeated violations may lead to the commenter being barred from
            further participation.
          </p>
        </div>
        <div className="policy_details">
          <h1 className="policy_header">8. Copyright and Legal Compliance</h1>
          <p className="policy_info">
            Ensure that your comments do not violate any intellectual property
            rights or other laws. By posting a comment, you represent that you
            have the right to share any content you include and that doing so
            does not violate any laws or the rights of others.
          </p>
        </div>
        <div className="policy_details">
          <h1 className="policy_header">9. Reporting Violations</h1>
          <p className="policy_info">
            If you come across a comment that you believe breaches this Comment
            Policy, kindly report it to our moderation team at
            policy@archcache.com. We will promptly review the reported comment
            and undertake suitable action.
          </p>
        </div>
        <div className="policy_details">
          <h1 className="policy_header">10. Changes to This Policy</h1>
          <p className="policy_info">
            We reserve the right to update this Comment Policy periodically. Any
            changes will be posted on this page, and your continued use of our
            commenting feature signifies your acceptance of the updated policy.
          </p>
        </div>

        <div className="policy_details">
          <h1 className="policy_header">11. Contact Us</h1>
          <p className="policy_info">
            If you have any questions or concerns about this Comment Policy,
            please contact us:
          </p>
          <div className="policy_address">
            <p>ArchCache Ltd</p>
            <p>16/18 Omerelu Street, GRA</p>
            <p>Port-Harcourt, Nigeria</p>
            <p>Phone: +2348138580315</p>
            <p>Email: policy@archcache.com</p>
          </div>
          <p className="policy_info">
            Thank you for participating in our community. We appreciate your
            contributions and look forward to your insightful comments!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Comment;
