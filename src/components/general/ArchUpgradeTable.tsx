// "use client";
// import { useInfo } from "@/_hooks/useInfo";
// import { GiCheckMark } from "react-icons/gi";
// import ArchSpinner from "./ArchSpinner";

// const ArchUpgradeTable = () => {
//   const { upgradeMutation } = useInfo();

//   const handlePay = async (price: number) => {
//     upgradeMutation.mutate(price);
//     window.scrollTo(0, 0);
//   };
//   const tabledata = [
//     {
//       type: "PRICING",
//       row1: "20,000 NGN",
//       row2: "75,000 NGN",
//       row3: "150,000 NGN",
//     },
//     {
//       type: "Plan Duration",
//       row1: "1 Month",
//       row2: "6 Months",
//       row3: "1 year/12 Months",
//     },
//     {
//       type: "No of projects Downloadable",
//       row1: "3 nos",
//       row2: "10 nos",
//       row3: "18 nos",
//     },
//     {
//       type: "10% Commission on your submitted Premium Projects",
//       row1: "-",
//       row2: "-",
//       row3: <GiCheckMark color="green" />,
//     },
//     {
//       type: "Message Other Users",
//       row1: <GiCheckMark color="green" />,
//       row2: <GiCheckMark color="green" />,
//       row3: <GiCheckMark color="green" />,
//     },
//     {
//       type: "Portfolio Counts per Month",
//       row1: "2 / Month",
//       row2: "6 / Month",
//       row3: "10 / Month",
//     },

//     {
//       type: "Comics Counts per Week",
//       row1: "2 / Week",
//       row2: "4 / Week",
//       row3: "5 / Month",
//     },
//   ];

//   return (
//     <>
//       {!upgradeMutation.isPending ? (
//         <div className="pay_table">
//           <div className="pay_tabledesc">
//             <h1>PREMIUM PROJECT DOWNLOAD PLANS</h1>
//             <p>
//               Subscribe to any of the premium plans below to have free access to
//               download premium projects
//             </p>
//           </div>

//           <div className="pay_tablecontainer">
//             <table>
//               <thead>
//                 <tr className="pay_tableheaders">
//                   <th className="pay_tablehead">OFFERS</th>
//                   <th className="pay_tablehead">SILVER</th>
//                   <th className="pay_tablehead">GOLD</th>
//                   <th className="pay_tablehead">PLATINUM</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {tabledata.map((data) => {
//                   if (data.type === "Comics Counts per Week") {
//                     return (
//                       <tr className="pay_tablecomic" key={data.type}>
//                         <td className="pay_comichead">
//                           <p>{data.type}</p>
//                         </td>
//                         <td className="pay_comicdata">
//                           <div className="pay_comicbtn">
//                             <span>{data.row1}</span>
//                             <button
//                               onClick={() => handlePay(20000)}
//                               disabled={upgradeMutation.isPending}
//                             >
//                               Get Started
//                             </button>
//                           </div>
//                         </td>
//                         <td className="pay_comicdata">
//                           <div className="pay_comicbtn">
//                             <span>{data.row2}</span>
//                             <button
//                               onClick={() => handlePay(75000)}
//                               disabled={upgradeMutation.isPending}
//                             >
//                               Get Started
//                             </button>
//                           </div>
//                         </td>
//                         <td className="pay_comicdata">
//                           <div className="pay_comicbtn">
//                             <span>{data.row3}</span>
//                             <button
//                               onClick={() => handlePay(150000)}
//                               disabled={upgradeMutation.isPending}
//                             >
//                               Get Started
//                             </button>
//                           </div>
//                         </td>
//                       </tr>
//                     );
//                   } else {
//                     return (
//                       <tr className="pay_tableothers" key={data.type}>
//                         <td className="pay_tabledatahead">{data.type}</td>
//                         <td className="pay_tabledata">{data.row1}</td>
//                         <td className="pay_tabledata">{data.row2}</td>
//                         <td className="pay_tabledata">{data.row3}</td>
//                       </tr>
//                     );
//                   }
//                 })}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       ) : (
//         <div className="pay_tablespinner">
//           <ArchSpinner />
//           <p>Initializing payment.....</p>
//         </div>
//       )}
//     </>
//   );
// };

// export default ArchUpgradeTable;

"use client";
import { useInfo } from "@/_hooks/useInfo";
import { GiCheckMark } from "react-icons/gi";
import { FiX, FiCheck, FiStar } from "react-icons/fi";
import ArchSpinner from "./ArchSpinner";

const ArchUpgradeTable = () => {
  const { upgradeMutation } = useInfo();

  const handlePay = async (price: number) => {
    upgradeMutation.mutate(price);
    window.scrollTo(0, 0);
  };

  const tabledata = [
    {
      type: "PRICING",
      row1: "20,000 NGN",
      row2: "75,000 NGN",
      row3: "150,000 NGN",
    },
    {
      type: "Plan Duration",
      row1: "1 Month",
      row2: "6 Months",
      row3: "1 year/12 Months",
    },
    {
      type: "No of projects Downloadable",
      row1: "3 nos",
      row2: "10 nos",
      row3: "18 nos",
    },
    {
      type: "10% Commission on your submitted Premium Projects",
      row1: "-",
      row2: "-",
      row3: <GiCheckMark color="green" />,
    },
    {
      type: "Message Other Users",
      row1: <GiCheckMark color="green" />,
      row2: <GiCheckMark color="green" />,
      row3: <GiCheckMark color="green" />,
    },
    {
      type: "Portfolio Counts per Month",
      row1: "2 / Month",
      row2: "6 / Month",
      row3: "10 / Month",
    },
    {
      type: "Comics Counts per Week",
      row1: "2 / Week",
      row2: "4 / Week",
      row3: "5 / Month",
    },
  ];

  const mobileFeatures = [
    {
      label: "Projects Downloadable",
      silver: "3 projects",
      gold: "10 projects",
      platinum: "18 projects",
    },
    {
      label: "Plan Duration",
      silver: "1 Month",
      gold: "6 Months",
      platinum: "12 Months",
    },
    {
      label: "Message Other Users",
      silver: true,
      gold: true,
      platinum: true,
    },
    {
      label: "Portfolio Counts",
      silver: "2 / Month",
      gold: "6 / Month",
      platinum: "10 / Month",
    },
    {
      label: "Comics Counts",
      silver: "2 / Week",
      gold: "4 / Week",
      platinum: "5 / Month",
    },
    {
      label: "Commission on Premium Projects",
      silver: false,
      gold: false,
      platinum: true,
    },
  ];

  const renderFeatureValue = (value: any) => {
    if (value === true) {
      return <FiCheck className="feature_value check" />;
    }
    if (value === false) {
      return <FiX className="feature_value unavailable" />;
    }
    return <span className="feature_value">{value}</span>;
  };

  return (
    <>
      {!upgradeMutation.isPending ? (
        <div className="pay_table">
          <div className="pay_tabledesc">
            <h1>PREMIUM PROJECT DOWNLOAD PLANS</h1>
            <p>
              Subscribe to any of the premium plans below to have free access to
              download premium projects
            </p>
          </div>

          {/* Desktop Table */}
          <div className="pay_tablecontainer">
            <table>
              <thead>
                <tr className="pay_tableheaders">
                  <th className="pay_tablehead">OFFERS</th>
                  <th className="pay_tablehead">SILVER</th>
                  <th className="pay_tablehead">GOLD</th>
                  <th className="pay_tablehead">PLATINUM</th>
                </tr>
              </thead>
              <tbody>
                {tabledata.map((data) => {
                  if (data.type === "Comics Counts per Week") {
                    return (
                      <tr className="pay_tablecomic" key={data.type}>
                        <td className="pay_comichead">
                          <p>{data.type}</p>
                        </td>
                        <td className="pay_comicdata">
                          <div className="pay_comicbtn">
                            <span>{data.row1}</span>
                            <button
                              onClick={() => handlePay(20000)}
                              disabled={upgradeMutation.isPending}
                            >
                              Get Started
                            </button>
                          </div>
                        </td>
                        <td className="pay_comicdata">
                          <div className="pay_comicbtn">
                            <span>{data.row2}</span>
                            <button
                              onClick={() => handlePay(75000)}
                              disabled={upgradeMutation.isPending}
                            >
                              Get Started
                            </button>
                          </div>
                        </td>
                        <td className="pay_comicdata">
                          <div className="pay_comicbtn">
                            <span>{data.row3}</span>
                            <button
                              onClick={() => handlePay(150000)}
                              disabled={upgradeMutation.isPending}
                            >
                              Get Started
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  } else {
                    return (
                      <tr className="pay_tableothers" key={data.type}>
                        <td className="pay_tabledatahead">{data.type}</td>
                        <td className="pay_tabledata">{data.row1}</td>
                        <td className="pay_tabledata">{data.row2}</td>
                        <td className="pay_tabledata">{data.row3}</td>
                      </tr>
                    );
                  }
                })}
              </tbody>
            </table>
          </div>

          {/* Mobile Card Layout */}
          <div className="mobile_plans_container">
            {/* Silver Plan */}
            <div className="mobile_plan_card">
              <div className="mobile_plan_header">
                <div className="mobile_plan_title">SILVER</div>
                <div className="mobile_plan_price">₦20,000</div>
                <div className="mobile_plan_duration">1 Month</div>
              </div>
              <div className="mobile_plan_features">
                {mobileFeatures.map((feature, index) => (
                  <div key={index} className="mobile_feature_item">
                    <div className="feature_content">
                      <div className="feature_label">{feature.label}</div>
                      {renderFeatureValue(feature.silver)}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mobile_plan_action">
                <button
                  className="mobile_plan_button"
                  onClick={() => handlePay(20000)}
                  disabled={upgradeMutation.isPending}
                >
                  Get Started
                </button>
              </div>
            </div>

            {/* Gold Plan */}
            <div className="mobile_plan_card featured">
              <div className="mobile_plan_header gold">
                <div className="mobile_popular_badge">
                  <FiStar size={14} style={{ marginRight: "4px" }} />
                  POPULAR
                </div>
                <div className="mobile_plan_title">GOLD</div>
                <div className="mobile_plan_price">₦75,000</div>
                <div className="mobile_plan_duration">6 Months</div>
              </div>
              <div className="mobile_plan_features">
                {mobileFeatures.map((feature, index) => (
                  <div key={index} className="mobile_feature_item">
                    <div className="feature_content">
                      <div className="feature_label">{feature.label}</div>
                      {renderFeatureValue(feature.gold)}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mobile_plan_action">
                <button
                  className="mobile_plan_button gold"
                  onClick={() => handlePay(75000)}
                  disabled={upgradeMutation.isPending}
                >
                  Get Started
                </button>
              </div>
            </div>

            {/* Platinum Plan */}
            <div className="mobile_plan_card">
              <div className="mobile_plan_header platinum">
                <div className="mobile_plan_title">PLATINUM</div>
                <div className="mobile_plan_price">₦150,000</div>
                <div className="mobile_plan_duration">12 Months</div>
              </div>
              <div className="mobile_plan_features">
                {mobileFeatures.map((feature, index) => (
                  <div key={index} className="mobile_feature_item">
                    <div className="feature_content">
                      <div className="feature_label">{feature.label}</div>
                      {renderFeatureValue(feature.platinum)}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mobile_plan_action">
                <button
                  className="mobile_plan_button platinum"
                  onClick={() => handlePay(150000)}
                  disabled={upgradeMutation.isPending}
                >
                  Get Started
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="pay_tablespinner">
          <ArchSpinner />
          <p>Initializing payment.....</p>
        </div>
      )}
    </>
  );
};

export default ArchUpgradeTable;
