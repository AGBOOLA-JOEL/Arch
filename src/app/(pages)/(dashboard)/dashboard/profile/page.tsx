import { CiEdit } from "react-icons/ci";
const Profile = () => {
  return (
    <div className="dash_profile">
      <div className="dash_profavatar">
        <div className="dash_profimg">
          {/* <Image src="" width={0} height={0} alt="feed image" sizes="100vw" /> */}
        </div>

        <p>change picture</p>
      </div>

      <ul className="dash_profmap">
        {[
          { name: "Username", value: "apiData?.username" },
          { name: "Email", value: "apiData?.username" },
          { name: "Institution/Firm", value: "apiData?.username" },
          { name: "Status", value: "apiData?.username" },
        ].map(({ name, value }) => (
          <li key={name} className="dash_profdata">
            <div>
              <p className="dash_profinput">
                <span>{name}:</span>
                {/* <span>{value}</span> */}
                <input type="text" />
              </p>
              <button className="dash_profedit">
                <CiEdit />
                <span> edit</span>
              </button>
            </div>
          </li>
        ))}

        <li className="dash_profdata">
          <div>
            <p>
              <span>Account type:</span>
              <span>basic</span>
            </p>
          </div>
        </li>
      </ul>

      <button className="dash_profchange">Edit Profile</button>
    </div>
  );
};

export default Profile;
